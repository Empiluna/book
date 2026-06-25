"""个性化推荐服务：KG/CF/热门/新书的轻量可运行实现。"""

from __future__ import annotations

from collections import defaultdict

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.book import Book, Tag
from app.models.user import Bookmark, ReadingHistory, User, UserRating
from app.schemas.recommend import RecommendationItem, RecommendationResponse
from app.services import book_service, user_service

settings = get_settings()


def home_recommend(db: Session, user: User | None, limit: int | None = None) -> RecommendationResponse:
    limit = limit or settings.RECOMMEND_TOP_N
    if user is None:
        return RecommendationResponse(scene="home", items=_cold_start_items(db, limit), fallback_used=True)

    try:
        profile = user_service.build_user_profile(db, user.id)
        seen = _seen_book_ids(db, user.id)
        score_map: dict[int, dict] = defaultdict(lambda: {"score": 0.0, "sources": [], "reason": ""})

        # KG 推荐：从高分书和收藏书的同作者/同标签关系扩展。
        seed_ids = list(profile.get("high_rated_book_ids", []))[:10]
        seed_ids += [b.book_id for b in db.query(Bookmark).filter(Bookmark.user_id == user.id).limit(10).all()]
        for book_id in set(seed_ids):
            for path in book_service.graph_paths(db, book_id, limit=20):
                if path.book.id in seen:
                    continue
                _add_score(score_map, path.book.id, path.score * settings.RECOMMEND_KG_WEIGHT, "KG", path.reason)

        # CF 轻量模拟：同标签/同作者相似度，代替离线余弦矩阵。
        cf_books = _cf_like_books(db, seed_ids, seen, limit=30)
        for rank, book in enumerate(cf_books):
            _add_score(score_map, book.id, (1.0 / (rank + 1)) * settings.RECOMMEND_CF_WEIGHT, "CF", "与你高分/收藏图书相似")

        # 热门/新书兜底。
        for rank, book in enumerate(_hot_books(db, limit=20)):
            if book.id not in seen:
                _add_score(score_map, book.id, (1.0 / (rank + 1)) * settings.RECOMMEND_HOT_WEIGHT, "HOT", "近期热门图书")
        for rank, book in enumerate(_new_books(db, limit=20)):
            if book.id not in seen:
                _add_score(score_map, book.id, (1.0 / (rank + 1)) * settings.RECOMMEND_NEW_WEIGHT, "NEW", "新书上架")

        items = _items_from_score_map(db, score_map, limit)
        if not items:
            return RecommendationResponse(scene="home", user_id=user.id, items=_cold_start_items(db, limit), fallback_used=True)
        return RecommendationResponse(scene="home", user_id=user.id, items=items, fallback_used=False)
    except Exception:
        return RecommendationResponse(scene="home", user_id=user.id, items=_cold_start_items(db, limit), fallback_used=True)


def hot_recommend(db: Session, limit: int = 20) -> RecommendationResponse:
    return RecommendationResponse(scene="hot", items=[_recommend_item(b, 1.0, "HOT", "近期热门图书") for b in _hot_books(db, limit)])


def new_recommend(db: Session, limit: int = 20) -> RecommendationResponse:
    return RecommendationResponse(scene="new", items=[_recommend_item(b, 1.0, "NEW", "新书上架") for b in _new_books(db, limit)])


def similar_books(db: Session, book_id: int, limit: int = 10) -> RecommendationResponse:
    paths = book_service.graph_paths(db, book_id, limit=limit)
    items = []
    for p in paths:
        book = book_service.get_book(db, p.book.id)
        items.append(_recommend_item(book, p.score, p.relation_type, p.reason))
    return RecommendationResponse(scene="similar", items=items)


def guess_you_like(db: Session, user: User, limit: int = 10) -> RecommendationResponse:
    response = home_recommend(db, user, limit)
    response.scene = "guess-you-like"
    return response


def _seen_book_ids(db: Session, user_id: int) -> set[int]:
    ids = set()
    ids.update([r.book_id for r in db.query(UserRating).filter(UserRating.user_id == user_id).all()])
    ids.update([b.book_id for b in db.query(Bookmark).filter(Bookmark.user_id == user_id).all()])
    ids.update([h.book_id for h in db.query(ReadingHistory).filter(ReadingHistory.user_id == user_id).all()])
    return ids


def _cf_like_books(db: Session, seed_ids: list[int], seen: set[int], limit: int = 30) -> list[Book]:
    if not seed_ids:
        return []
    seed_books = db.query(Book).filter(Book.id.in_(seed_ids)).all()
    tag_ids = {t.id for b in seed_books for t in b.tags}
    author_ids = {a.id for b in seed_books for a in b.authors}
    query = db.query(Book).filter(Book.is_deleted.is_(False), ~Book.id.in_(seen | set(seed_ids)))
    if tag_ids:
        query = query.join(Book.tags).filter(Tag.id.in_(tag_ids))
    books = query.order_by(desc(Book.avg_rating), desc(Book.hot_score)).limit(limit).all()
    if books:
        return books
    return db.query(Book).filter(Book.is_deleted.is_(False), ~Book.id.in_(seen)).order_by(desc(Book.hot_score)).limit(limit).all()


def _hot_books(db: Session, limit: int = 20) -> list[Book]:
    return db.query(Book).filter(Book.is_deleted.is_(False)).order_by(desc(Book.hot_score), desc(Book.avg_rating)).limit(limit).all()


def _new_books(db: Session, limit: int = 20) -> list[Book]:
    rows = db.query(Book).filter(Book.is_deleted.is_(False), Book.is_new.is_(True)).order_by(desc(Book.created_at)).limit(limit).all()
    if rows:
        return rows
    return db.query(Book).filter(Book.is_deleted.is_(False)).order_by(desc(Book.created_at)).limit(limit).all()


def _cold_start_items(db: Session, limit: int) -> list[RecommendationItem]:
    books = _hot_books(db, limit=max(limit // 2, 1)) + _new_books(db, limit=max(limit // 2, 1))
    seen = set()
    items = []
    for book in books:
        if book.id in seen:
            continue
        seen.add(book.id)
        source = "NEW" if book.is_new else "HOT"
        reason = "新书上架" if book.is_new else "近期热门图书"
        items.append(_recommend_item(book, 1.0, source, reason))
        if len(items) >= limit:
            break
    return items


def _add_score(score_map: dict, book_id: int, score: float, source: str, reason: str) -> None:
    score_map[book_id]["score"] += float(score)
    score_map[book_id]["sources"].append(source)
    if not score_map[book_id]["reason"]:
        score_map[book_id]["reason"] = reason


def _items_from_score_map(db: Session, score_map: dict[int, dict], limit: int) -> list[RecommendationItem]:
    sorted_ids = sorted(score_map.keys(), key=lambda bid: score_map[bid]["score"], reverse=True)[:limit]
    books = {b.id: b for b in db.query(Book).filter(Book.id.in_(sorted_ids)).all()}
    result = []
    for bid in sorted_ids:
        book = books.get(bid)
        if not book:
            continue
        data = score_map[bid]
        result.append(_recommend_item(book, round(data["score"], 4), "+".join(sorted(set(data["sources"]))), data["reason"]))
    return result


def _recommend_item(book: Book, score: float, source: str, reason: str) -> RecommendationItem:
    return RecommendationItem(book=book_service.to_book_simple(book), final_score=round(float(score), 4), source=source, reason=reason)
