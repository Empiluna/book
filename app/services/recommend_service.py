from __future__ import annotations

import math
import random
import re
from collections import Counter, defaultdict
from typing import Any

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session, selectinload

from app.core.cache import cache
from app.core.config import get_settings
from app.models import (
    Book,
    Bookmark,
    ReadingHistory,
    ReadingProgress,
    RecommendationFeedback,
    SystemConfig,
    User,
    UserRating,
)
from app.services.graph_service import GraphService
from app.services.serializers import book_card
from app.services.user_service import build_user_profile
from app.utils.tagging import book_tag_names, main_tag

settings = get_settings()
ORIGINAL_CATEGORY = "用户原创"


FEEDBACK_WEIGHTS: dict[str, float] = {
    "exposure": 0.03,
    "click": 0.20,
    "trial": 0.40,
    "bookmark": 0.80,
    "rating": 0.60,
    "purchase_click": 0.70,
    "not_interested": -1.20,
    "skip": -0.30,
}


def get_weights(db: Session) -> dict[str, float]:
    base = {
        "kg": settings.RECOMMEND_KG_WEIGHT,
        "cf": settings.RECOMMEND_CF_WEIGHT,
        "hot": settings.RECOMMEND_HOT_WEIGHT,
        "new": settings.RECOMMEND_NEW_WEIGHT,
    }
    for k in list(base.keys()):
        row = db.get(SystemConfig, f"recommend_weight_{k}")
        if row:
            try:
                base[k] = float(row.value)
            except ValueError:
                pass
    total = sum(base.values()) or 1.0
    return {k: round(v / total, 4) for k, v in base.items()}


def set_weights(db: Session, weights: dict[str, float]) -> dict[str, float]:
    total = sum(weights.values())
    if total <= 0:
        raise HTTPException(400, "权重之和必须大于0")
    normalized = {k: round(v / total, 4) for k, v in weights.items()}
    for k, v in normalized.items():
        row = db.get(SystemConfig, f"recommend_weight_{k}")
        if not row:
            row = SystemConfig(key=f"recommend_weight_{k}", value=str(v), description="混合推荐权重")
            db.add(row)
        else:
            row.value = str(v)
    db.commit()
    cache.delete("itemcf_matrix")
    return normalized


class RecommendService:
    def __init__(self, db: Session):
        self.db = db
        self.graph = GraphService(db)

    def _excluded_book_ids(self, user: User | None) -> set[int]:
        if not user:
            return set()

        ids: set[int] = set()

        ids |= {
            r.book_id
            for r in self.db.query(UserRating).filter_by(user_id=user.id).all()
        }

        ids |= {
            b.book_id
            for b in self.db.query(Bookmark).filter_by(user_id=user.id).all()
        }

        ids |= {
            p.book_id
            for p in self.db.query(ReadingProgress).filter_by(user_id=user.id).all()
        }

        ids |= {
            h.book_id
            for h in self.db.query(ReadingHistory)
            .filter(ReadingHistory.user_id == user.id)
            .filter(ReadingHistory.status.in_(["want_to_read", "reading", "read"]))
            .all()
        }

        ids |= {
            f.book_id
            for f in self.db.query(RecommendationFeedback)
            .filter_by(user_id=user.id, event_type="not_interested")
            .all()
        }

        return ids

    @staticmethod
    def _is_public_book(book: Book | None) -> bool:
        return bool(book and not book.is_deleted and book.category != ORIGINAL_CATEGORY)

    def hot_scores(self, limit: int = 50) -> list[dict]:
        books = (
            self.db.query(Book)
            .options(
                selectinload(Book.authors),
                selectinload(Book.tags),
                selectinload(Book.publisher),
                selectinload(Book.series),
            )
            .filter(Book.is_deleted == False, or_(Book.category.is_(None), Book.category != ORIGINAL_CATEGORY))
            .order_by((Book.hot_score + Book.view_count * 0.1 + Book.trial_count * 0.2 + Book.avg_rating * 1.5).desc())
            .limit(limit)
            .all()
        )  # noqa: E712
        rows = []
        for b in books:
            score = (b.view_count * 0.16 + b.trial_count * 0.20 + (b.avg_rating or 0) * 1.5 + (b.hot_score or 0))
            rows.append((b, score))
        return [{"book": b, "score": self._norm(score), "source": "hot", "reason": "这本书在近30天综合热度较高，适合作为冷启动推荐。"} for b, score in rows[:limit]]

    def new_scores(self, limit: int = 50) -> list[dict]:
        rows = []
        books = (
            self.db.query(Book)
            .options(
                selectinload(Book.authors),
                selectinload(Book.tags),
                selectinload(Book.publisher),
                selectinload(Book.series),
            )
            .filter(Book.is_deleted == False, Book.is_new == True, or_(Book.category.is_(None), Book.category != ORIGINAL_CATEGORY))
            .order_by(Book.created_at.desc())
            .limit(limit)
            .all()
        )  # noqa: E712
        for b in books:
            score = 1.0 + (b.avg_rating or 0) * 0.12 + (b.hot_score or 0) * 0.08
            rows.append((b, score))
        rows.sort(key=lambda x: (x[1], x[0].created_at), reverse=True)
        return [{"book": b, "score": self._norm(score), "source": "new", "reason": "这是近期入库的新书，并且与你的兴趣标签保持一定相关性。"} for b, score in rows[:limit]]

    def kg_scores(self, user: User | None, limit: int = 50) -> list[dict]:
        if not user:
            return []
        profile = build_user_profile(self.db, user)
        scores: dict[int, dict] = {}
        # 使用“用户画像中心 + 多个兴趣种子书”做 KG 推理，不再只围绕最近阅读的一本书。
        seed_ids = profile.get("interest_seed_book_ids") or profile.get("high_rated_book_ids") or []
        for seed_id in seed_ids[:8]:
            try:
                result = self.graph.find_paths(seed_id, max_hops=2, top_k=limit)
            except Exception:
                continue
            for item in result["items"]:
                bid = item["book_id"]
                scores.setdefault(bid, {"score": 0.0, "paths": [], "reason": item.get("reason")})
                scores[bid]["score"] += float(item.get("score") or 0)
                scores[bid]["paths"].extend(item.get("paths") or [])
        rows = []
        for bid, data in sorted(scores.items(), key=lambda x: x[1]["score"], reverse=True)[:limit]:
            b = self.db.get(Book, bid)
            if self._is_public_book(b):
                rows.append({"book": b, "score": self._norm(data["score"]), "source": "kg", "reason": self.graph.path_reason(data["paths"]), "paths": data["paths"]})
        return rows

    def _rating_matrix_similarity(self) -> dict[int, list[tuple[int, float]]]:
        cached = cache.get("itemcf_matrix")
        if cached:
            return {int(k): [(int(i), float(s)) for i, s in v] for k, v in cached.items()}
        ratings = self.db.query(UserRating).all()
        by_book = defaultdict(dict)
        for r in ratings:
            by_book[r.book_id][r.user_id] = r.rating
        books = [b.id for b in self.db.query(Book).filter(Book.is_deleted == False).all() if self._is_public_book(b)]  # noqa: E712
        sim: dict[int, list[tuple[int, float]]] = {bid: [] for bid in books}
        if len(ratings) >= 6 and len(by_book) >= 2:
            for i, a in enumerate(books):
                va = by_book.get(a, {})
                for b in books[i + 1:]:
                    vb = by_book.get(b, {})
                    common = set(va) & set(vb)
                    if not common:
                        continue
                    dot = sum(va[u] * vb[u] for u in common)
                    na = math.sqrt(sum(x * x for x in va.values()))
                    nb = math.sqrt(sum(x * x for x in vb.values()))
                    score = dot / (na * nb) if na and nb else 0.0
                    if score > 0:
                        sim[a].append((b, score)); sim[b].append((a, score))
        # Content-feature fallback supplements sparse classroom data.
        content = self._content_similarity()
        for a, vals in content.items():
            existing = {b for b, _ in sim.get(a, [])}
            for b, s in vals:
                if b not in existing:
                    sim.setdefault(a, []).append((b, s * 0.65))
        sim = {k: sorted(v, key=lambda x: x[1], reverse=True)[:30] for k, v in sim.items()}
        cache.set("itemcf_matrix", {str(k): v for k, v in sim.items()}, ttl=settings.ITEMCF_CACHE_TTL_SECONDS)
        return sim

    def _content_similarity(self) -> dict[int, list[tuple[int, float]]]:
        books = [b for b in self.db.query(Book).filter(Book.is_deleted == False).all() if self._is_public_book(b)]  # noqa: E712
        features: dict[int, set[str]] = {}
        for b in books:
            f = {f"pub:{b.publisher_id}", f"series:{b.series_id}"}
            f |= {f"tag:{t.id}" for t in b.tags}
            f |= {f"author:{a.id}" for a in b.authors}
            features[b.id] = {x for x in f if x and not x.endswith(':None')}
        sim: dict[int, list[tuple[int, float]]] = defaultdict(list)
        for i, a in enumerate(books):
            for b in books[i + 1:]:
                inter = features[a.id] & features[b.id]
                union = features[a.id] | features[b.id]
                if union:
                    s = len(inter) / len(union)
                    if s > 0.05:
                        sim[a.id].append((b.id, s)); sim[b.id].append((a.id, s))
        return sim

    def cf_scores(self, user: User | None, book_id: int | None = None, limit: int = 50) -> list[dict]:
        sim = self._rating_matrix_similarity()
        candidate: defaultdict[int, float] = defaultdict(float)
        seed_scores: dict[int, float] = {}
        if book_id:
            seed_scores[book_id] = 10.0
        elif user:
            for r in self.db.query(UserRating).filter_by(user_id=user.id).all():
                if r.rating >= 7.0:
                    seed_scores[r.book_id] = r.rating
            if not seed_scores:
                for bm in self.db.query(Bookmark).filter_by(user_id=user.id).limit(5).all():
                    seed_scores[bm.book_id] = 8.0
        for seed, rating in seed_scores.items():
            for other, s in sim.get(seed, []):
                if other != seed:
                    candidate[other] += s * rating
        rows = []
        for bid, score in sorted(candidate.items(), key=lambda x: x[1], reverse=True)[:limit]:
            b = self.db.get(Book, bid)
            if self._is_public_book(b):
                rows.append({"book": b, "score": self._norm(score), "source": "cf", "reason": "基于用户-图书评分矩阵计算的ItemCF相似推荐。"})
        return rows


    def _feedback_rows(self, user: User | None) -> list[RecommendationFeedback]:
        if not user:
            return []
        return self.db.query(RecommendationFeedback).filter_by(user_id=user.id).order_by(RecommendationFeedback.created_at.desc()).limit(300).all()

    def _feedback_signal(self, user: User | None) -> dict[str, Any]:
        """Aggregate online feedback into exact-book and similar-feature preference signals."""
        rows = self._feedback_rows(user)
        exact: defaultdict[int, float] = defaultdict(float)
        tag_pref: defaultdict[str, float] = defaultdict(float)
        author_pref: defaultdict[str, float] = defaultdict(float)
        for row in rows:
            weight = FEEDBACK_WEIGHTS.get(row.event_type, 0.0)
            exact[row.book_id] += weight
            book = self.db.get(Book, row.book_id)
            if not book:
                continue
            # Similar books only receive a softened signal. Negative feedback suppresses same-topic books.
            soft = weight * 0.25
            for tag in book_tag_names(book):
                tag_pref[tag] += soft
            for author in book.authors:
                author_pref[author.name] += soft
        return {"exact": exact, "tags": tag_pref, "authors": author_pref}

    def rerank_with_user_feedback(self, rows: list[dict], user: User | None) -> list[dict]:
        """Adjust candidate scores by explicit and implicit online feedback."""
        signal = self._feedback_signal(user)
        if not signal["exact"] and not signal["tags"] and not signal["authors"]:
            for row in rows:
                row.setdefault("rerank", {})["feedback_score"] = 0.0
                row["base_score"] = row.get("score", 0.0)
            return rows
        adjusted = []
        for row in rows:
            book: Book = row["book"]
            base = float(row.get("score") or 0.0)
            score = float(signal["exact"].get(book.id, 0.0))
            score += sum(float(signal["tags"].get(t, 0.0)) for t in book_tag_names(book))
            score += sum(float(signal["authors"].get(a.name, 0.0)) for a in book.authors)
            # Keep feedback strong enough to be visible, but bounded to avoid one click dominating all ranking.
            bounded = max(min(score, 1.2), -1.2)
            row["base_score"] = base
            row["score"] = base + bounded * 0.18
            row.setdefault("rerank", {})["feedback_score"] = round(bounded, 4)
            if bounded <= -1.0:
                row["rerank"]["suppressed_by_feedback"] = True
            adjusted.append(row)
        adjusted.sort(key=lambda x: x["score"], reverse=True)
        return adjusted

    def rerank_with_novelty(self, rows: list[dict], user: User | None) -> list[dict]:
        """Boost new and less over-exposed books, while keeping quality constraints."""
        interacted: set[int] = set()
        if user:
            interacted |= {r.book_id for r in self.db.query(UserRating).filter_by(user_id=user.id).all()}
            interacted |= {b.book_id for b in self.db.query(Bookmark).filter_by(user_id=user.id).all()}
            interacted |= {f.book_id for f in self.db.query(RecommendationFeedback).filter_by(user_id=user.id).all()}
        for row in rows:
            book: Book = row["book"]
            novelty = 0.0
            if book.is_new:
                novelty += 0.08
            if book.id not in interacted:
                novelty += 0.04
            # Lower-hot but reasonably rated books get a small discovery boost.
            if (book.avg_rating or 0) >= 8.0 and (book.hot_score or 0) < 5.0:
                novelty += 0.05
            row["score"] = float(row.get("score") or 0.0) + novelty
            row.setdefault("rerank", {})["novelty_score"] = round(novelty, 4)
        rows.sort(key=lambda x: x["score"], reverse=True)
        return rows

    def rerank_with_diversity(self, rows: list[dict], limit: int) -> list[dict]:
        """Greedy diversity reranking to avoid same author/category dominating the list."""
        selected: list[dict] = []
        remaining = list(rows)
        category_count: Counter[str] = Counter()
        author_count: Counter[str] = Counter()
        while remaining and len(selected) < limit:
            best_idx = 0
            best_value = -10**9
            for idx, row in enumerate(remaining):
                book: Book = row["book"]
                penalty = 0.0
                tag = main_tag(book)
                if tag and category_count[tag] >= 3:
                    penalty += 0.10 * (category_count[tag] - 2)
                for author in book.authors:
                    if author_count[author.name] >= 2:
                        penalty += 0.08 * (author_count[author.name] - 1)
                value = float(row.get("score") or 0.0) - penalty
                if value > best_value:
                    best_idx = idx
                    best_value = value
            chosen = remaining.pop(best_idx)
            book = chosen["book"]
            diversity_penalty = round(float(chosen.get("score") or 0.0) - best_value, 4)
            chosen["score"] = round(best_value, 4)
            chosen.setdefault("rerank", {})["diversity_penalty"] = diversity_penalty
            selected.append(chosen)
            tag = main_tag(book)
            if tag:
                category_count[tag] += 1
            for author in book.authors:
                author_count[author.name] += 1
        return selected

    def fast_home(self, user: User, limit: int = 20, scene: str = "home", force_refresh: bool = False) -> dict:
        """Return login-home recommendations without blocking on KG/profile graph work.

        The full hybrid pipeline is still useful for deeper recommendation pages, but
        the home screen needs cards quickly so covers can start downloading. This
        lightweight pass personalizes hot/new candidates using recent user signals.
        """
        cache_key = f"recommend:fast_home:{user.id}:{limit}"
        cached = None if force_refresh else cache.get(cache_key)
        if cached:
            return cached

        excluded = self._excluded_book_ids(user)
        seed_ids: set[int] = set()
        seed_weights: defaultdict[int, float] = defaultdict(float)

        for r in self.db.query(UserRating).filter_by(user_id=user.id).all():
            if r.rating >= 7.0:
                seed_ids.add(r.book_id)
                seed_weights[r.book_id] = max(seed_weights[r.book_id], float(r.rating or 0) / 10.0)
        for bm in self.db.query(Bookmark).filter_by(user_id=user.id).limit(30).all():
            seed_ids.add(bm.book_id)
            seed_weights[bm.book_id] = max(seed_weights[bm.book_id], 0.8 if bm.reading_status in {"read", "reading"} else 0.45)
        for p in self.db.query(ReadingProgress).filter_by(user_id=user.id).limit(30).all():
            if p.progress_percent and p.progress_percent > 0:
                seed_ids.add(p.book_id)
                seed_weights[p.book_id] = max(seed_weights[p.book_id], 0.5 + min(float(p.progress_percent or 0), 100.0) / 200.0)
        for h in (
            self.db.query(ReadingHistory)
            .filter_by(user_id=user.id)
            .order_by(ReadingHistory.read_at.desc())
            .limit(30)
            .all()
        ):
            seed_ids.add(h.book_id)
            seed_weights[h.book_id] = max(seed_weights[h.book_id], 0.65 if h.status in {"read", "reading"} else 0.35)

        seed_books = []
        if seed_ids:
            seed_books = (
                self.db.query(Book)
                .options(selectinload(Book.authors), selectinload(Book.tags))
                .filter(Book.id.in_(seed_ids), Book.is_deleted == False)
                .all()
            )  # noqa: E712

        tag_pref: Counter[str] = Counter()
        author_pref: Counter[str] = Counter()
        category_pref: Counter[str] = Counter()
        for book in seed_books:
            weight = seed_weights.get(book.id, 0.4)
            for tag in book.tags:
                tag_pref[tag.name] += weight
            for author in book.authors:
                author_pref[author.name] += weight
            category = primary_category(book.category)
            if category:
                category_pref[category] += weight

        candidates: dict[int, dict] = {}
        for row in self.hot_scores(limit=80):
            book = row["book"]
            candidates.setdefault(book.id, {"book": book, "score": 0.0, "sources": [], "reasons": [], "paths": []})
            candidates[book.id]["score"] += float(row["score"]) * 0.64
            candidates[book.id]["sources"].append("hot")
            candidates[book.id]["reasons"].append(row["reason"])
        for row in self.new_scores(limit=80):
            book = row["book"]
            candidates.setdefault(book.id, {"book": book, "score": 0.0, "sources": [], "reasons": [], "paths": []})
            candidates[book.id]["score"] += float(row["score"]) * 0.24
            candidates[book.id]["sources"].append("new")
            candidates[book.id]["reasons"].append(row["reason"])

        rows = []
        for book_id, row in candidates.items():
            if book_id in excluded:
                continue
            book: Book = row["book"]
            affinity = 0.0
            category = primary_category(book.category)
            if category:
                affinity += min(float(category_pref.get(category, 0.0)), 3.0) * 0.045
            affinity += min(sum(float(tag_pref.get(t.name, 0.0)) for t in book.tags), 3.0) * 0.04
            affinity += min(sum(float(author_pref.get(a.name, 0.0)) for a in book.authors), 2.0) * 0.05
            if affinity:
                row["sources"].append("profile")
                row["reasons"].append("根据你的书架、评分和阅读记录做了轻量个性化重排。")
            row["score"] = float(row["score"] or 0.0) + affinity
            if force_refresh:
                row["score"] += random.uniform(-0.035, 0.065)
            rows.append(row)

        if not rows:
            rows = list(candidates.values())

        rows.sort(key=lambda x: x["score"], reverse=True)
        if force_refresh and len(rows) > limit:
            pool = rows[: min(len(rows), max(limit * 6, 72))]
            random.shuffle(pool)
            rows = pool[: max(limit * 3, 30)]
        else:
            rows = rows[: max(limit * 3, 30)]
        rows = self.rerank_with_user_feedback(rows, user)
        rows = self.rerank_with_novelty(rows, user)
        rows = self.rerank_with_diversity(rows, limit=limit)

        items = []
        for x in rows:
            card = book_card(x["book"], score=x["score"], reason=self.generate_reason(x), source="+".join(sorted(set(x["sources"]))), paths=x["paths"])
            card["base_score"] = round(float(x.get("base_score", x.get("score", 0.0))), 4)
            card["rerank"] = x.get("rerank", {})
            items.append(card)

        result = {
            "scene": scene,
            "weights": {"hot": 0.64, "new": 0.24, "profile": 0.12},
            "items": items,
            "total": len(items),
            "rerank_strategy": "fast_home_profile + online_feedback + novelty + diversity",
        }
        if not force_refresh:
            cache.set(cache_key, result, ttl=45)
        return result

    def hybrid(self, user: User | None, limit: int = 20, scene: str = "home", force_refresh: bool = False) -> dict:
        if user and scene == "home":
            return self.fast_home(user, limit=limit, scene=scene, force_refresh=force_refresh)
        weights = get_weights(self.db)
        excluded = self._excluded_book_ids(user)
        sources = {
            "kg": self.kg_scores(user, limit=50),
            "cf": self.cf_scores(user, limit=50),
            "hot": self.hot_scores(limit=50),
            "new": self.new_scores(limit=50),
        }
        if not user:
            sources["kg"] = []
            sources["cf"] = []
        merged: dict[int, dict] = {}
        for src, rows in sources.items():
            for r in rows:
                b = r["book"]
                if b.id in excluded:
                    continue
                item = merged.setdefault(b.id, {"book": b, "score": 0.0, "sources": [], "reasons": [], "paths": []})
                item["score"] += r["score"] * weights[src]
                item["sources"].append(src)
                item["reasons"].append(r["reason"])
                item["paths"].extend(r.get("paths", []))
        if not merged:
            for r in self.hot_scores(limit=limit) + self.new_scores(limit=limit):
                b = r["book"]
                merged.setdefault(b.id, {"book": b, "score": r["score"] * 0.5, "sources": [r["source"]], "reasons": [r["reason"]], "paths": []})
        ranked = sorted(merged.values(), key=lambda x: x["score"], reverse=True)
        if force_refresh and len(ranked) > limit:
            pool = ranked[: min(len(ranked), max(limit * 6, 72))]
            random.shuffle(pool)
            ranked = pool[: max(limit * 3, 30)]
        ranked = self.rerank_with_user_feedback(ranked, user)
        ranked = self.rerank_with_novelty(ranked, user)
        ranked = self.rerank_with_diversity(ranked, limit=limit)
        items = []
        for x in ranked:
            card = book_card(x["book"], score=x["score"], reason=self.generate_reason(x), source="+".join(sorted(set(x["sources"]))), paths=x["paths"])
            card["base_score"] = round(float(x.get("base_score", x.get("score", 0.0))), 4)
            card["rerank"] = x.get("rerank", {})
            items.append(card)
        return {"scene": scene, "weights": weights, "items": items, "total": len(items), "rerank_strategy": "online_feedback + novelty + diversity"}

    def similar(self, book_id: int, limit: int = 12) -> dict:
        book = self.db.get(Book, book_id)
        if not book or book.is_deleted:
            raise HTTPException(404, "图书不存在")
        cf = self.cf_scores(None, book_id=book_id, limit=limit)
        kg = self.graph.find_paths(book_id, max_hops=2, top_k=limit)["items"]
        merged: dict[int, dict] = {}
        for r in cf:
            b = r["book"]
            merged.setdefault(b.id, {"book": b, "score": 0.0, "sources": [], "reasons": [], "paths": []})
            merged[b.id]["score"] += r["score"] * 0.55
            merged[b.id]["sources"].append("cf")
            merged[b.id]["reasons"].append(r["reason"])
        for item in kg:
            b = self.db.get(Book, item["book_id"])
            if self._is_public_book(b):
                merged.setdefault(b.id, {"book": b, "score": 0.0, "sources": [], "reasons": [], "paths": []})
                merged[b.id]["score"] += float(item.get("score") or 0) * 0.45
                merged[b.id]["sources"].append("kg")
                merged[b.id]["reasons"].append(item.get("reason"))
                merged[b.id]["paths"].extend(item.get("paths") or [])
        ranked = sorted(merged.values(), key=lambda x: x["score"], reverse=True)[:limit]
        return {"source_book": book_card(book), "items": [book_card(x["book"], score=x["score"], reason=self.generate_reason(x), source="+".join(x["sources"]), paths=x["paths"]) for x in ranked]}

    def guess_you_like(self, user: User | None, limit: int = 12) -> dict:
        if not user:
            return {"items": [book_card(r["book"], score=r["score"], reason=r["reason"], source="hot") for r in self.hot_scores(limit)]}
        result = self.hybrid(user, limit=limit, scene="guess_you_like")
        result["strategy"] = "近期阅读、搜索、收藏、试读和评分行为实时融合"
        return result

    def feedback(self, user: User | None, book_id: int, event_type: str, source: str | None = None) -> dict:
        if event_type not in FEEDBACK_WEIGHTS:
            raise HTTPException(400, f"不支持的反馈类型：{event_type}")
        book = self.db.get(Book, book_id)
        if not book or book.is_deleted:
            raise HTTPException(404, "图书不存在")
        self.db.add(RecommendationFeedback(user_id=user.id if user else None, book_id=book_id, event_type=event_type, source=source))
        if event_type == "click":
            book.hot_score += 0.20
            book.view_count += 1
        elif event_type == "exposure":
            book.hot_score += 0.03
        elif event_type == "trial":
            book.hot_score += 0.18
            book.trial_count += 1
        elif event_type == "bookmark":
            book.hot_score += 0.35
        elif event_type == "rating":
            book.hot_score += 0.25
        elif event_type == "purchase_click":
            book.hot_score += 0.40
        elif event_type in {"not_interested", "skip"}:
            book.hot_score = max(0.0, (book.hot_score or 0.0) - 0.15)
        self.db.commit()
        return {"message": "反馈已记录", "event_type": event_type, "weight": FEEDBACK_WEIGHTS[event_type]}

    def natural_language(self, message: str, user: User | None, limit: int = 8) -> dict:
        tokens = re.findall(r"[\u4e00-\u9fa5A-Za-z0-9]+", message)
        terms = [t for t in tokens if len(t) >= 2]
        query = self.db.query(Book).filter(Book.is_deleted == False)  # noqa: E712
        books = query.all()
        scores = []
        for b in books:
            if not self._is_public_book(b):
                continue
            tag_names = book_tag_names(b)
            text = " ".join([b.title, b.description or "", b.difficulty or ""] + [a.name for a in b.authors] + tag_names).lower()
            s = 0.0
            for term in terms:
                if term.lower() in text:
                    s += 1.0
            if user:
                profile = build_user_profile(self.db, user)
                for tag, w in profile.get("tag_weights", {}).items():
                    if tag in tag_names:
                        s += w * 0.8
            if "入门" in message and b.difficulty in {"入门", "大众"}:
                s += 0.6
            if "历史" in message and "历史" in tag_names:
                s += 1
            if "科幻" in message and "科幻" in tag_names:
                s += 1
            if "人工智能" in message and "人工智能" in tag_names:
                s += 1.3
            if s > 0:
                scores.append((b, s))
        if not scores:
            hybrid = self.hybrid(user, limit=limit)
            return {"intent": "book_rec", "answer": "我先根据你的画像和全站热度给出一组稳妥推荐。", "books": hybrid["items"], "suggestions": ["推荐几本人工智能入门书", "我喜欢《三体》，还能看什么？"]}
        scores.sort(key=lambda x: x[1], reverse=True)
        items = [book_card(b, score=s, reason="根据你的自然语言需求匹配到主题、作者或标签。", source="nlp") for b, s in scores[:limit]]
        return {"intent": "book_rec", "answer": "已根据你的自然语言需求抽取主题、类别、作者和难度条件，结合用户画像与图书知识图谱生成推荐。", "books": items, "suggestions": ["只看入门难度", "给出推荐理由", "加入我的书架"]}

    @staticmethod
    def generate_reason(item: dict) -> str:
        sources = set(item.get("sources", []))
        reasons = [r for r in item.get("reasons", []) if r]
        if "kg" in sources and item.get("paths"):
            return reasons[0]
        if "cf" in sources:
            return "与你读过或评分较高的图书在用户评分矩阵中相似。"
        if "hot" in sources and "new" in sources:
            return "近期热度较高且属于新书，适合作为探索阅读。"
        return reasons[0] if reasons else "综合你的阅读画像、图谱路径和全站热度生成推荐。"

    @staticmethod
    def _norm(value: float) -> float:
        return round(value / (1.0 + abs(value)), 4) if value > 1 else round(max(value, 0.0), 4)
