from __future__ import annotations

import math
import re
from collections import Counter, defaultdict
from typing import Any

from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.cache import cache
from app.core.config import get_settings
from app.models import Book, BookComment, Bookmark, PurchaseClick, RecommendationFeedback, SystemConfig, User, UserRating
from app.services.graph_service import GraphService
from app.services.serializers import book_card
from app.services.user_service import build_user_profile

settings = get_settings()


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
        ids = {r.book_id for r in self.db.query(UserRating).filter_by(user_id=user.id).all() if r.rating >= 4.5}
        ids |= {h.book_id for h in user.histories if h.status == "read"}
        ids |= {f.book_id for f in self.db.query(RecommendationFeedback).filter_by(user_id=user.id, event_type="not_interested").all()}
        return ids

    def hot_scores(self, limit: int = 50) -> list[dict]:
        books = self.db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
        rows = []
        for b in books:
            comments = self.db.query(BookComment).filter_by(book_id=b.id, is_deleted=False).count()
            bookmarks = self.db.query(Bookmark).filter_by(book_id=b.id).count()
            purchases = self.db.query(PurchaseClick).filter_by(book_id=b.id).count()
            score = (b.view_count * 0.16 + b.trial_count * 0.20 + bookmarks * 0.35 + comments * 0.45 + purchases * 0.55 + (b.avg_rating or 0) * 1.5 + (b.hot_score or 0))
            rows.append((b, score))
        rows.sort(key=lambda x: x[1], reverse=True)
        return [{"book": b, "score": self._norm(score), "source": "hot", "reason": "这本书在近30天综合热度较高，适合作为冷启动推荐。"} for b, score in rows[:limit]]

    def new_scores(self, limit: int = 50) -> list[dict]:
        rows = []
        for b in self.db.query(Book).filter(Book.is_deleted == False).all():  # noqa: E712
            if b.is_new:
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
            if b and not b.is_deleted:
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
        books = [b.id for b in self.db.query(Book).filter(Book.is_deleted == False).all()]  # noqa: E712
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
        books = self.db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
        features: dict[int, set[str]] = {}
        for b in books:
            f = {f"cat:{b.category}", f"pub:{b.publisher_id}", f"series:{b.series_id}"}
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
            seed_scores[book_id] = 5.0
        elif user:
            for r in self.db.query(UserRating).filter_by(user_id=user.id).all():
                if r.rating >= 3.5:
                    seed_scores[r.book_id] = r.rating
            if not seed_scores:
                for bm in self.db.query(Bookmark).filter_by(user_id=user.id).limit(5).all():
                    seed_scores[bm.book_id] = 4.0
        for seed, rating in seed_scores.items():
            for other, s in sim.get(seed, []):
                if other != seed:
                    candidate[other] += s * rating
        rows = []
        for bid, score in sorted(candidate.items(), key=lambda x: x[1], reverse=True)[:limit]:
            b = self.db.get(Book, bid)
            if b and not b.is_deleted:
                rows.append({"book": b, "score": self._norm(score), "source": "cf", "reason": "基于用户-图书评分矩阵计算的ItemCF相似推荐。"})
        return rows

    def hybrid(self, user: User | None, limit: int = 20, scene: str = "home") -> dict:
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
        ranked = sorted(merged.values(), key=lambda x: x["score"], reverse=True)[:limit]
        items = [book_card(x["book"], score=x["score"], reason=self.generate_reason(x), source="+".join(sorted(set(x["sources"]))), paths=x["paths"]) for x in ranked]
        return {"scene": scene, "weights": weights, "items": items, "total": len(items)}

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
            if b:
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
        book = self.db.get(Book, book_id)
        if not book:
            raise HTTPException(404, "图书不存在")
        self.db.add(RecommendationFeedback(user_id=user.id if user else None, book_id=book_id, event_type=event_type, source=source))
        if event_type == "click":
            book.hot_score += 0.3
        elif event_type == "exposure":
            book.hot_score += 0.03
        self.db.commit()
        return {"message": "反馈已记录", "event_type": event_type}

    def natural_language(self, message: str, user: User | None, limit: int = 8) -> dict:
        tokens = re.findall(r"[\u4e00-\u9fa5A-Za-z0-9]+", message)
        terms = [t for t in tokens if len(t) >= 2]
        query = self.db.query(Book).filter(Book.is_deleted == False)  # noqa: E712
        books = query.all()
        scores = []
        for b in books:
            text = " ".join([b.title, b.description or "", b.category or "", b.difficulty or ""] + [a.name for a in b.authors] + [t.name for t in b.tags]).lower()
            s = 0.0
            for term in terms:
                if term.lower() in text:
                    s += 1.0
            if user:
                profile = build_user_profile(self.db, user)
                for tag, w in profile.get("tag_weights", {}).items():
                    if tag in [x.name for x in b.tags]:
                        s += w * 0.8
            if "入门" in message and b.difficulty in {"入门", "大众"}:
                s += 0.6
            if "历史" in message and b.category == "历史":
                s += 1
            if "科幻" in message and b.category == "科幻":
                s += 1
            if "人工智能" in message and "人工智能" in [t.name for t in b.tags]:
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
