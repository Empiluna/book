
from __future__ import annotations

from typing import Any

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models import Author, Book, Publisher, SearchLog, Tag, User
from app.services.serializers import book_card

settings = get_settings()


def _book_document(book: Book) -> dict[str, Any]:
    return {
        "id": book.id,
        "title": book.title,
        "subtitle": book.subtitle,
        "isbn": book.isbn,
        "category": book.category,
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


class SearchService:
    """ElasticSearch-first book search with explicit SQL fallback.

    When REQUIRE_ELASTICSEARCH=true, missing ES connection becomes an error. This lets the project
    run in a strict document-aligned mode for acceptance checks, while still supporting classroom
    local startup when the flag is false.
    """

    def __init__(self, db: Session):
        self.db = db
        self.index_name = settings.SEARCH_INDEX_NAME
        self.client = None
        self.last_error: str | None = None
        if settings.ELASTICSEARCH_URL:
            try:
                from elasticsearch import Elasticsearch
                self.client = Elasticsearch(settings.ELASTICSEARCH_URL)
                if not self.client.ping():
                    self.last_error = "ElasticSearch ping failed"
                    self.client = None
            except Exception as exc:  # pragma: no cover - depends on external service
                self.last_error = str(exc)
                self.client = None
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
                        # Built-in n-gram Chinese analyzer. It avoids external IK plugin dependency while
                        # still supporting Chinese partial matching over title/author/tag/description.
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
        self.client.index(index=self.index_name, id=book.id, document=_book_document(book))

    def bulk_index_books(self) -> dict:
        books = self.db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
        if not self.client:
            if settings.REQUIRE_ELASTICSEARCH:
                raise HTTPException(503, "ElasticSearch 未连接，无法批量索引")
            return {"backend": "sql-fallback", "indexed": 0, "message": "未连接ES，未写入索引"}
        self.ensure_index()
        for b in books:
            self.client.index(index=self.index_name, id=b.id, document=_book_document(b))
        self.client.indices.refresh(index=self.index_name)
        return {"backend": "elasticsearch", "indexed": len(books), "index": self.index_name}

    def search(self, q: str | None, category: str | None = None, tag: str | None = None, author: str | None = None, sort: str = "hot", page: int = 1, limit: int = 24, user: User | None = None) -> dict:
        if q and self.client:
            return self._search_es(q, category, tag, author, sort, page, limit, user)
        if q and settings.REQUIRE_ELASTICSEARCH and not self.client:
            raise HTTPException(503, "严格模式要求使用 ElasticSearch，但当前未连接")
        return self._search_sql(q, category, tag, author, sort, page, limit, user)

    def _record(self, keyword: str | None, total: int, user: User | None) -> None:
        if keyword:
            self.db.add(SearchLog(user_id=user.id if user else None, keyword=keyword, result_count=total))
            self.db.commit()

    def _search_es(self, q: str, category: str | None, tag: str | None, author: str | None, sort: str, page: int, limit: int, user: User | None) -> dict:
        self.ensure_index()
        filters = []
        if category:
            filters.append({"term": {"category": category}})
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
        ids = [int(h["_id"]) for h in hits.get("hits", [])]
        books_by_id = {b.id: b for b in self.db.query(Book).filter(Book.id.in_(ids or [0])).all()}
        items = [book_card(books_by_id[i]) for i in ids if i in books_by_id]
        total = hits.get("total", {}).get("value", len(items)) if isinstance(hits.get("total"), dict) else len(items)
        self._record(q, total, user)
        return {"items": items, "total": total, "page": page, "limit": limit, "search_backend": "elasticsearch", "index": self.index_name}

    def _search_sql(self, q: str | None, category: str | None, tag: str | None, author: str | None, sort: str, page: int, limit: int, user: User | None) -> dict:
        query = self.db.query(Book).filter(Book.is_deleted == False)  # noqa: E712
        if q:
            like = f"%{q}%"
            query = query.outerjoin(Book.authors).outerjoin(Book.tags).outerjoin(Book.publisher).filter(
                or_(Book.title.like(like), Book.subtitle.like(like), Book.description.like(like), Book.category.like(like), Book.isbn.like(like), Book.difficulty.like(like), Author.name.like(like), Tag.name.like(like), Publisher.name.like(like))
            ).distinct()
        if category:
            query = query.filter(Book.category == category)
        books = query.all()
        if tag:
            books = [b for b in books if tag in [t.name for t in b.tags]]
        if author:
            books = [b for b in books if author in [a.name for a in b.authors]]
        if sort == "rating":
            books.sort(key=lambda b: b.avg_rating, reverse=True)
        elif sort == "new":
            books.sort(key=lambda b: (b.is_new, b.created_at), reverse=True)
        elif sort == "title":
            books.sort(key=lambda b: b.title)
        else:
            books.sort(key=lambda b: b.hot_score + b.view_count * 0.1 + b.avg_rating, reverse=True)
        if q:
            self._record(q, len(books), user)
        start = (page - 1) * limit
        return {"items": [book_card(b) for b in books[start:start + limit]], "total": len(books), "page": page, "limit": limit, "search_backend": "sql-fallback"}
