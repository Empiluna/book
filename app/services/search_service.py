from __future__ import annotations

from typing import Any

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session, selectinload

from app.core.config import get_settings
from app.models import Author, Book, Publisher, SearchLog, Tag, User
from app.utils.search_terms import is_valid_search_keyword
from app.services.embedding_service import EmbeddingService
from app.services.serializers import book_card
from app.utils.categories import category_matches, primary_category

settings = get_settings()

SEMANTIC_MIN_SCORE = 0.20
HYBRID_MIN_SCORE = 0.10
ORIGINAL_CATEGORY = "用户原创"


def _is_public_book(book: Book) -> bool:
    return not book.is_deleted and book.category != ORIGINAL_CATEGORY


def _book_document(book: Book) -> dict[str, Any]:
    return {
        "id": book.id,
        "title": book.title,
        "subtitle": book.subtitle,
        "isbn": book.isbn,
        "category": primary_category(book.category),
        "difficulty": book.difficulty,
        "description": book.description,
        "publisher": book.publisher.name if book.publisher else "",
        "series": book.series.name if book.series else "",
        "authors": [a.name for a in book.authors],
        "tags": [t.name for t in book.tags],
        "avg_rating": book.avg_rating,
        "rating_count": book.rating_count,
        "hot_score": book.hot_score,
        "is_new": book.is_new,
        "created_at": book.created_at.isoformat() if book.created_at else None,
    }


_es_unavailable = False


class SearchService:
    """Book search service.

    Supports three modes:
    - keyword: ElasticSearch BM25 first, SQL fallback when ES is unavailable.
    - semantic: local embedding-style vector retrieval.
    - hybrid: keyword retrieval + semantic retrieval + quality score fusion.
    """

    def __init__(self, db: Session):
        self.db = db
        self.index_name = settings.SEARCH_INDEX_NAME
        self.client = None
        self.last_error: str | None = None
        global _es_unavailable
        if _es_unavailable or not settings.ELASTICSEARCH_URL:
            pass
        elif settings.ELASTICSEARCH_URL:
            try:
                from elasticsearch import Elasticsearch
                self.client = Elasticsearch(settings.ELASTICSEARCH_URL, request_timeout=3)
                if not self.client.ping():
                    self.last_error = "ElasticSearch ping failed"
                    self.client = None
                    _es_unavailable = True
            except Exception as exc:  # pragma: no cover - depends on external service
                self.last_error = str(exc)
                self.client = None
                _es_unavailable = True
        if settings.REQUIRE_ELASTICSEARCH and not self.client:
            raise HTTPException(503, f"ElasticSearch 未连接：{self.last_error or '请启动ES并配置ELASTICSEARCH_URL'}")

    @property
    def backend(self) -> str:
        return "elasticsearch" if self.client else "sql-fallback"

    def ensure_index(self) -> dict:
        if not self.client:
            if settings.REQUIRE_ELASTICSEARCH:
                raise HTTPException(503, "ElasticSearch 未连接，无法初始化索引")
            return {"backend": "sql-fallback", "message": "未连接ES，搜索使用SQL降级"}
        mappings = {
            "settings": {
                "analysis": {
                    "tokenizer": {
                        "cn_ngram_tokenizer": {
                            "type": "ngram",
                            "min_gram": 1,
                            "max_gram": 2,
                            "token_chars": ["letter", "digit"]
                        }
                    },
                    "analyzer": {
                        "cn_text": {
                            "type": "custom",
                            "tokenizer": "cn_ngram_tokenizer",
                            "filter": ["lowercase"]
                        },
                        "cn_search": {
                            "type": "custom",
                            "tokenizer": "standard",
                            "filter": ["lowercase"]
                        }
                    }
                }
            },
            "mappings": {
                "properties": {
                    "title": {"type": "text", "analyzer": "cn_text", "search_analyzer": "cn_search", "fields": {"keyword": {"type": "keyword"}}},
                    "subtitle": {"type": "text", "analyzer": "cn_text", "search_analyzer": "cn_search"},
                    "description": {"type": "text", "analyzer": "cn_text", "search_analyzer": "cn_search"},
                    "authors": {"type": "text", "analyzer": "cn_text", "search_analyzer": "cn_search"},
                    "tags": {"type": "text", "analyzer": "cn_text", "search_analyzer": "cn_search"},
                    "publisher": {"type": "text", "analyzer": "cn_text", "search_analyzer": "cn_search"},
                    "series": {"type": "text", "analyzer": "cn_text", "search_analyzer": "cn_search"},
                    "category": {"type": "keyword"},
                    "difficulty": {"type": "keyword"},
                    "isbn": {"type": "keyword"},
                    "avg_rating": {"type": "float"},
                    "hot_score": {"type": "float"},
                    "is_new": {"type": "boolean"},
                }
            },
        }
        if not self.client.indices.exists(index=self.index_name):
            self.client.indices.create(index=self.index_name, **mappings)
        return {"backend": "elasticsearch", "message": "ES索引已就绪", "index": self.index_name}

    def index_book(self, book: Book) -> None:
        if not self.client:
            if settings.REQUIRE_ELASTICSEARCH:
                raise HTTPException(503, "ElasticSearch 未连接，无法写入索引")
            return
        self.ensure_index()
        if book.category == ORIGINAL_CATEGORY:
            try:
                self.client.delete(index=self.index_name, id=book.id)
            except Exception:
                pass
            return
        self.client.index(index=self.index_name, id=book.id, document=_book_document(book))

    def bulk_index_books(self) -> dict:
        books = self.db.query(Book).filter(Book.is_deleted == False, or_(Book.category.is_(None), Book.category != ORIGINAL_CATEGORY)).all()  # noqa: E712
        if not self.client:
            if settings.REQUIRE_ELASTICSEARCH:
                raise HTTPException(503, "ElasticSearch 未连接，无法批量索引")
            return {"backend": "sql-fallback", "indexed": 0, "message": "未连接ES，未写入索引"}
        self.ensure_index()
        for b in books:
            self.client.index(index=self.index_name, id=b.id, document=_book_document(b))
        self.client.indices.refresh(index=self.index_name)
        return {"backend": "elasticsearch", "indexed": len(books), "index": self.index_name}

    def search(
        self,
        q: str | None,
        category: str | None = None,
        tag: str | None = None,
        author: str | None = None,
        sort: str = "hot",
        page: int = 1,
        limit: int = 24,
        user: User | None = None,
        mode: str = "hybrid",
    ) -> dict:
        mode = (mode or "hybrid").lower()
        if mode not in {"hybrid", "semantic", "keyword"}:
            raise HTTPException(400, "mode 只能为 hybrid / semantic / keyword")
        if not q:
            return self._search_sql(q, category, tag, author, sort, page, limit, user)
        if mode == "semantic":
            return self.semantic_search(q, category, tag, author, sort, page, limit, user)
        if mode == "hybrid":
            return self.hybrid_search(q, category, tag, author, sort, page, limit, user)
        if self.client:
            return self._search_es(q, category, tag, author, sort, page, limit, user)
        if settings.REQUIRE_ELASTICSEARCH:
            raise HTTPException(503, "严格模式要求使用 ElasticSearch，但当前未连接")
        return self._search_sql(q, category, tag, author, sort, page, limit, user)

    def semantic_search(self, q: str, category: str | None = None, tag: str | None = None, author: str | None = None, sort: str = "relevance", page: int = 1, limit: int = 24, user: User | None = None) -> dict:
        books = self._candidate_books(category, tag, author)
        ranked = EmbeddingService.rank_books(
            q,
            books,
            limit=max(page * limit, 80),
            min_score=SEMANTIC_MIN_SCORE,
        )
        if sort == "rating":
            ranked.sort(key=lambda x: (x[1], x[0].avg_rating or 0), reverse=True)
        elif sort == "new":
            ranked.sort(key=lambda x: (x[1], x[0].is_new, x[0].created_at), reverse=True)
        total = len(ranked)
        start = (page - 1) * limit
        items = []
        for book, score in ranked[start:start + limit]:
            card = book_card(book, score=score, reason="根据查询语义与图书标题、简介、标签、作者等内容的向量相似度匹配。", source="semantic")
            card["semantic_score"] = score
            items.append(card)
        self._record(q, total, user)
        return {"items": items, "total": total, "page": page, "limit": limit, "search_backend": "semantic-vector", "embedding_backend": "local-hashing-vector"}

    def hybrid_search(self, q: str, category: str | None = None, tag: str | None = None, author: str | None = None, sort: str = "hot", page: int = 1, limit: int = 24, user: User | None = None) -> dict:
        pool_size = max(80, limit * 4)
        keyword_payload = self._search_es(q, category, tag, author, sort="relevance", page=1, limit=pool_size, user=user, record=False) if self.client else self._search_sql(q, category, tag, author, sort="relevance", page=1, limit=pool_size, user=user, record=False)
        semantic_books = self._candidate_books(category, tag, author)
        semantic_ranked = EmbeddingService.rank_books(
            q,
            semantic_books,
            limit=pool_size,
            min_score=SEMANTIC_MIN_SCORE,
        )
        semantic_payload = {
            "items": [
                {
                    **book_card(
                        book,
                        score=score,
                        reason="根据查询语义与图书标题、简介、标签、作者等内容的向量相似度匹配。",
                        source="semantic",
                    ),
                    "semantic_score": score,
                }
                for book, score in semantic_ranked
            ],
            "total": len(semantic_ranked),
            "search_backend": "semantic-vector",
        }

        merged: dict[int, dict[str, Any]] = {}
        max_keyword = max([float(x.get("keyword_score") or 0.0) for x in keyword_payload.get("items", [])] or [1.0]) or 1.0

        def quality_score(card: dict[str, Any]) -> float:
            rating = float(card.get("avg_rating") or 0.0) / 5.0
            hot = float(card.get("hot_score") or 0.0)
            hot_norm = hot / (1.0 + abs(hot)) if hot else 0.0
            new_boost = 0.05 if card.get("is_new") else 0.0
            return min(1.0, rating * 0.65 + hot_norm * 0.30 + new_boost)

        for card in keyword_payload.get("items", []):
            bid = int(card["id"])
            raw = float(card.get("keyword_score") or 0.0)
            row = merged.setdefault(bid, {"card": card, "keyword_norm": 0.0, "semantic_score": 0.0})
            row["keyword_norm"] = max(row["keyword_norm"], raw / max_keyword)

        for card in semantic_payload.get("items", []):
            bid = int(card["id"])
            row = merged.setdefault(bid, {"card": card, "keyword_norm": 0.0, "semantic_score": 0.0})
            row["semantic_score"] = max(row["semantic_score"], float(card.get("semantic_score") or card.get("score") or 0.0))

        ranked = []
        for row in merged.values():
            card = row["card"]
            q_score = quality_score(card)
            final = 0.58 * row["keyword_norm"] + 0.37 * row["semantic_score"] + 0.05 * q_score

            keyword_hit = row["keyword_norm"] > 0
            semantic_hit = row["semantic_score"] >= SEMANTIC_MIN_SCORE
            if not (keyword_hit or semantic_hit):
                continue
            if not keyword_hit and final < HYBRID_MIN_SCORE:
                continue

            card["score"] = round(final, 4)
            card["keyword_score_norm"] = round(row["keyword_norm"], 4)
            card["semantic_score"] = round(row["semantic_score"], 4)
            card["quality_score"] = round(q_score, 4)
            card["source"] = "hybrid"
            card["reason"] = "综合匹配"
            ranked.append(card)
        ranked.sort(key=lambda x: x.get("score") or 0.0, reverse=True)
        total = len(ranked)
        start = (page - 1) * limit
        self._record(q, total, user)
        return {
            "items": ranked[start:start + limit],
            "total": total,
            "page": page,
            "limit": limit,
            "search_backend": "hybrid-bm25-vector",
            "lexical_backend": keyword_payload.get("search_backend"),
            "embedding_backend": "local-hashing-vector",
            "fusion_weights": {"keyword_bm25": 0.58, "semantic_vector": 0.37, "quality": 0.05},
        }

    def _record(self, keyword: str | None, total: int, user: User | None) -> None:
        text = (keyword or "").strip()
        if is_valid_search_keyword(text):
            self.db.add(SearchLog(user_id=user.id if user else None, keyword=text, result_count=total))
            self.db.commit()

    def _search_es(self, q: str, category: str | None, tag: str | None, author: str | None, sort: str, page: int, limit: int, user: User | None, record: bool = True) -> dict:
        self.ensure_index()
        filters = []
        filters.append({"bool": {"must_not": [{"term": {"category": ORIGINAL_CATEGORY}}]}})
        if category:
            filters.append({"term": {"category": primary_category(category)}})
        if tag:
            filters.append({"match": {"tags": tag}})
        if author:
            filters.append({"match": {"authors": author}})
        body: dict[str, Any] = {
            "query": {
                "bool": {
                    "must": [{
                        "multi_match": {
                            "query": q,
                            "fields": ["title^4", "subtitle^2", "authors^3", "tags^3", "publisher^2", "series", "category^2", "description", "isbn^5"],
                            "type": "best_fields",
                            "fuzziness": "AUTO",
                        }
                    }],
                    "filter": filters,
                }
            },
            "from": (page - 1) * limit,
            "size": limit,
        }
        if sort == "rating":
            body["sort"] = [{"avg_rating": "desc"}, {"_score": "desc"}]
        elif sort == "new":
            body["sort"] = [{"is_new": "desc"}, {"_score": "desc"}]
        elif sort == "hot":
            body["sort"] = [{"hot_score": "desc"}, {"_score": "desc"}]
        resp = self.client.search(index=self.index_name, **body)
        hits = resp.get("hits", {})
        hit_rows = hits.get("hits", [])
        ids = [int(h["_id"]) for h in hit_rows]
        scores = {int(h["_id"]): float(h.get("_score") or 0.0) for h in hit_rows}
        books_by_id = {b.id: b for b in self.db.query(Book).filter(Book.id.in_(ids or [0]), or_(Book.category.is_(None), Book.category != ORIGINAL_CATEGORY)).all()}
        items = []
        for i in ids:
            if i in books_by_id:
                card = book_card(books_by_id[i])
                card["keyword_score"] = round(scores.get(i, 0.0), 4)
                items.append(card)
        total = hits.get("total", {}).get("value", len(items)) if isinstance(hits.get("total"), dict) else len(items)
        if record:
            self._record(q, total, user)
        return {"items": items, "total": total, "page": page, "limit": limit, "search_backend": "elasticsearch", "index": self.index_name}

    def _search_sql(self, q: str | None, category: str | None, tag: str | None, author: str | None, sort: str, page: int, limit: int, user: User | None, record: bool = True) -> dict:
        query = (
            self.db.query(Book)
            .options(
                selectinload(Book.authors),
                selectinload(Book.tags),
                selectinload(Book.publisher),
                selectinload(Book.series),
            )
            .filter(Book.is_deleted == False, or_(Book.category.is_(None), Book.category != ORIGINAL_CATEGORY))
        )  # noqa: E712
        if not q and not category and not tag and not author:
            total = query.count()
            if sort == "rating":
                query = query.order_by(Book.avg_rating.desc(), Book.rating_count.desc())
            elif sort == "new":
                query = query.order_by(Book.is_new.desc(), Book.created_at.desc())
            elif sort == "title":
                query = query.order_by(Book.title.asc())
            else:
                query = query.order_by((Book.hot_score + Book.view_count * 0.1 + Book.avg_rating).desc())
            books = query.offset((page - 1) * limit).limit(limit).all()
            return {"items": [book_card(b) for b in books], "total": total, "page": page, "limit": limit, "search_backend": "sql-fallback"}
        if q:
            terms = self._query_terms(q)
            conditions = []

            for term in terms:
                like = f"%{term}%"
                conditions.extend([
                    Book.title.like(like),
                    Book.subtitle.like(like),
                    Book.description.like(like),
                    Book.category.like(like),
                    Book.isbn.like(like),
                    Book.difficulty.like(like),
                    Author.name.like(like),
                    Tag.name.like(like),
                    Publisher.name.like(like),
                ])

            query = (
                query.outerjoin(Book.authors)
                .outerjoin(Book.tags)
                .outerjoin(Book.publisher)
                .filter(or_(*conditions))
                .distinct()
            )
        if category:
            query = query.filter(Book.category.isnot(None))
        books = query.all()
        if category:
            books = [b for b in books if category_matches(b.category, category)]
        if tag:
            books = [b for b in books if tag in [t.name for t in b.tags]]
        if author:
            books = [b for b in books if author in [a.name for a in b.authors]]
        if q:
            scored = [(b, self._local_keyword_score(q, b)) for b in books]
            books = [b for b, _ in scored]
            score_map = {b.id: s for b, s in scored}
        else:
            score_map = {}
        if sort == "rating":
            books.sort(key=lambda b: b.avg_rating, reverse=True)
        elif sort == "new":
            books.sort(key=lambda b: (b.is_new, b.created_at), reverse=True)
        elif sort == "title":
            books.sort(key=lambda b: b.title)
        elif sort == "relevance" and q:
            books.sort(key=lambda b: score_map.get(b.id, 0.0), reverse=True)
        else:
            books.sort(key=lambda b: b.hot_score + b.view_count * 0.1 + b.avg_rating, reverse=True)
        if q and record:
            self._record(q, len(books), user)
        start = (page - 1) * limit
        items = []
        for b in books[start:start + limit]:
            card = book_card(b)
            if q:
                card["keyword_score"] = round(score_map.get(b.id, 0.0), 4)
            items.append(card)
        return {"items": items, "total": len(books), "page": page, "limit": limit, "search_backend": "sql-fallback"}

    def _candidate_books(self, category: str | None = None, tag: str | None = None, author: str | None = None) -> list[Book]:
        query = self.db.query(Book).filter(Book.is_deleted == False, or_(Book.category.is_(None), Book.category != ORIGINAL_CATEGORY))  # noqa: E712
        if category:
            query = query.filter(Book.category.isnot(None))
        books = query.all()
        if category:
            books = [b for b in books if category_matches(b.category, category)]
        if tag:
            books = [b for b in books if tag in [t.name for t in b.tags]]
        if author:
            books = [b for b in books if author in [a.name for a in b.authors]]
        return books

    @staticmethod
    def _query_terms(q: str, max_terms: int = 16) -> list[str]:
        raw = (q or "").strip()
        terms: list[str] = []

        if raw:
            terms.append(raw)

        for token in EmbeddingService.tokenize(raw):
            token = token.strip()
            if len(token) >= 2 and token not in terms:
                terms.append(token)

            if len(terms) >= max_terms:
                break

        return terms or [raw]

    @staticmethod
    def _local_keyword_score(q: str, book: Book) -> float:
        text_parts = [
            book.title or "",
            book.subtitle or "",
            book.description or "",
            book.category or "",
            book.difficulty or "",
            book.publisher.name if book.publisher else "",
            book.series.name if book.series else "",
            " ".join(a.name for a in book.authors),
            " ".join(t.name for t in book.tags),
        ]
        text = " ".join(text_parts).lower()
        tokens = EmbeddingService.tokenize(q)
        score = 0.0
        for token in set(tokens):
            if not token:
                continue
            freq = text.count(token.lower())
            if freq:
                score += min(freq, 5) * (1.0 + min(len(token), 6) / 6)
        # Title/tag/author exact-match boost.
        if q in (book.title or ""):
            score += 8.0
        if any(q in t.name for t in book.tags):
            score += 5.0
        if any(q in a.name for a in book.authors):
            score += 5.0
        return score
