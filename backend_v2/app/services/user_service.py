"""
模块一 · 用户画像服务层。

实现需求说明书中的：
1. 用户注册/登录；
2. 阅读行为采集：阅读历史、搜索记录、收藏、评分；
3. 用户兴趣建模：标签偏好、作者偏好、类别偏好、高分图书；
4. 阅读进度同步与阅读统计。
"""

from __future__ import annotations

import json
import math
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from typing import Optional

from fastapi import HTTPException
from sqlalchemy import desc, func, or_
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models.book import Author, Book, Tag
from app.models.user import (
    Bookmark,
    ReadingHistory,
    ReadingProgress,
    ReadingSession,
    SearchLog,
    User,
    UserBehaviorEvent,
    UserBookFeedback,
    UserPreferenceOverride,
    UserProfileSnapshot,
    UserRating,
)

VALID_READING_STATUS = {"read", "reading", "want_to_read"}
DEFAULT_SHELVES = ["想读", "在读", "已读", "默认书架"]
MAX_SHELVES_PER_USER = 20


# =====================================================================
# 用户认证
# =====================================================================


def get_user_by_account(db: Session, account: str) -> Optional[User]:
    """按用户名或邮箱查询用户。"""
    return db.query(User).filter(or_(User.username == account, User.email == account)).first()


def register_user(db: Session, username: str, email: str, password: str) -> User:
    """注册新用户。"""
    existing = db.query(User).filter(or_(User.username == username, User.email == email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="用户名或邮箱已被注册")

    user = User(username=username, email=email, hashed_password=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, account: str, password: str) -> Optional[str]:
    """验证用户并返回 JWT token；account 支持用户名或邮箱。"""
    user = get_user_by_account(db, account)
    if user is None:
        return None
    if not user.is_active:
        raise HTTPException(status_code=403, detail="账号已被禁用，请联系管理员")
    if not verify_password(password, user.hashed_password):
        return None
    return create_access_token({"sub": str(user.id), "username": user.username, "is_admin": user.is_admin})


def change_password(db: Session, user: User, old_password: str, new_password: str) -> None:
    """修改密码，必须校验旧密码。"""
    if not verify_password(old_password, user.hashed_password):
        raise HTTPException(status_code=400, detail="旧密码不正确")
    user.hashed_password = hash_password(new_password)
    db.commit()


# =====================================================================
# 阅读行为采集
# =====================================================================


def record_reading_history(db: Session, user_id: int, book_id: int, status: str = "read") -> ReadingHistory:
    """记录阅读历史。"""
    if status not in VALID_READING_STATUS:
        raise HTTPException(status_code=400, detail="阅读状态只能是 read/reading/want_to_read")
    _ensure_book_exists(db, book_id)

    entry = ReadingHistory(user_id=user_id, book_id=book_id, status=status)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def get_reading_history(db: Session, user_id: int, limit: int = 50) -> list[ReadingHistory]:
    """获取阅读历史。"""
    return (
        db.query(ReadingHistory)
        .filter(ReadingHistory.user_id == user_id)
        .order_by(desc(ReadingHistory.read_at))
        .limit(limit)
        .all()
    )


def record_search(db: Session, user_id: Optional[int], keyword: str) -> SearchLog:
    """记录搜索关键词。"""
    keyword = keyword.strip()
    if not keyword:
        raise HTTPException(status_code=400, detail="搜索关键词不能为空")
    log = SearchLog(user_id=user_id, keyword=keyword[:256])
    db.add(log)
    db.commit()
    db.refresh(log)
    return log


def get_search_logs(db: Session, user_id: int, limit: int = 20) -> list[SearchLog]:
    """获取用户最近搜索记录。"""
    return (
        db.query(SearchLog)
        .filter(SearchLog.user_id == user_id)
        .order_by(desc(SearchLog.created_at))
        .limit(limit)
        .all()
    )


def add_bookmark(db: Session, user_id: int, book_id: int, shelf_name: str = "默认书架") -> Bookmark:
    """添加或移动书架收藏。"""
    _ensure_book_exists(db, book_id)
    shelf_name = _normalize_shelf_name(shelf_name)
    _ensure_shelf_limit(db, user_id, shelf_name)

    existing = (
        db.query(Bookmark)
        .filter(Bookmark.user_id == user_id, Bookmark.book_id == book_id)
        .first()
    )
    if existing:
        existing.shelf_name = shelf_name
        db.commit()
        db.refresh(existing)
        return existing

    bookmark = Bookmark(user_id=user_id, book_id=book_id, shelf_name=shelf_name)
    db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return bookmark


def move_bookmark(db: Session, user_id: int, book_id: int, shelf_name: str) -> Bookmark:
    """将已收藏图书移动到指定书架。"""
    shelf_name = _normalize_shelf_name(shelf_name)
    _ensure_shelf_limit(db, user_id, shelf_name)
    bookmark = (
        db.query(Bookmark)
        .filter(Bookmark.user_id == user_id, Bookmark.book_id == book_id)
        .first()
    )
    if not bookmark:
        raise HTTPException(status_code=404, detail="该图书未收藏")
    bookmark.shelf_name = shelf_name
    db.commit()
    db.refresh(bookmark)
    return bookmark


def remove_bookmark(db: Session, user_id: int, book_id: int) -> int:
    """取消收藏，返回删除数量。"""
    count = (
        db.query(Bookmark)
        .filter(Bookmark.user_id == user_id, Bookmark.book_id == book_id)
        .delete()
    )
    db.commit()
    return count


def get_bookmarks(db: Session, user_id: int, shelf_name: Optional[str] = None) -> list[Bookmark]:
    """获取收藏列表，可按书架过滤。"""
    query = db.query(Bookmark).filter(Bookmark.user_id == user_id)
    if shelf_name:
        query = query.filter(Bookmark.shelf_name == shelf_name)
    return query.order_by(desc(Bookmark.created_at)).all()


def get_shelves(db: Session, user_id: int) -> list[dict]:
    """获取书架及图书数量。"""
    rows = (
        db.query(Bookmark.shelf_name, func.count(Bookmark.id).label("cnt"))
        .filter(Bookmark.user_id == user_id)
        .group_by(Bookmark.shelf_name)
        .all()
    )
    counter = {name: int(cnt) for name, cnt in rows}
    for name in DEFAULT_SHELVES:
        counter.setdefault(name, 0)
    return [{"shelf_name": name, "book_count": count} for name, count in sorted(counter.items())]


def rate_book(db: Session, user_id: int, book_id: int, rating: float) -> UserRating:
    """新增或更新图书评分，并同步图书平均评分。"""
    _ensure_book_exists(db, book_id)
    if rating < 0.5 or rating > 5.0:
        raise HTTPException(status_code=400, detail="评分范围必须是0.5到5.0")

    existing = (
        db.query(UserRating)
        .filter(UserRating.user_id == user_id, UserRating.book_id == book_id)
        .first()
    )
    if existing:
        existing.rating = rating
    else:
        existing = UserRating(user_id=user_id, book_id=book_id, rating=rating)
        db.add(existing)
    db.commit()
    db.refresh(existing)
    _update_book_avg_rating(db, book_id)
    return existing


def get_user_ratings(db: Session, user_id: int, limit: int = 50) -> list[UserRating]:
    """获取用户评分记录。"""
    return (
        db.query(UserRating)
        .filter(UserRating.user_id == user_id)
        .order_by(desc(UserRating.created_at))
        .limit(limit)
        .all()
    )


def _update_book_avg_rating(db: Session, book_id: int) -> None:
    """更新图书平均评分与评分人数。"""
    avg_rating, rating_count = (
        db.query(func.avg(UserRating.rating), func.count(UserRating.id))
        .filter(UserRating.book_id == book_id)
        .one()
    )
    book = db.query(Book).filter(Book.id == book_id).first()
    if book:
        book.avg_rating = round(float(avg_rating or 0.0), 1)
        book.rating_count = int(rating_count or 0)
        db.commit()


# =====================================================================
# 用户兴趣建模
# =====================================================================


def build_user_profile(db: Session, user_id: int) -> dict:
    """
    构建用户画像。

    输出字段兼容推荐模块 UserProfileForRecommend：
    - tag_weights
    - favorite_author_ids
    - favorite_tag_ids
    - high_rated_book_ids
    同时补充自然语言展示用字段。
    """
    tag_score: defaultdict[int, float] = defaultdict(float)
    author_score: defaultdict[int, float] = defaultdict(float)
    category_score: defaultdict[str, float] = defaultdict(float)

    # 1. 阅读历史：已读/在读权重较高，想读权重较低。
    status_weight = {"read": 2.0, "reading": 2.5, "want_to_read": 1.5}
    histories = db.query(ReadingHistory).filter(ReadingHistory.user_id == user_id).all()
    for h in histories:
        _accumulate_book_features(db, h.book_id, status_weight.get(h.status, 1.0), tag_score, author_score, category_score)

    # 2. 书架收藏：代表明确兴趣。
    bookmarks = db.query(Bookmark).filter(Bookmark.user_id == user_id).all()
    for bm in bookmarks:
        _accumulate_book_features(db, bm.book_id, 3.0, tag_score, author_score, category_score)

    # 3. 高分评分：评分越高，权重越高。
    ratings = db.query(UserRating).filter(UserRating.user_id == user_id).all()
    high_rated_book_ids: list[int] = []
    for r in ratings:
        if r.rating >= 4.0:
            high_rated_book_ids.append(r.book_id)
        _accumulate_book_features(db, r.book_id, max(r.rating, 0.5), tag_score, author_score, category_score)

    # 4. 搜索记录：命中标签/作者/书名后作为短期兴趣。
    recent_searches = get_search_logs(db, user_id, limit=30)
    for log in recent_searches:
        _accumulate_search_features(db, log.keyword, tag_score, author_score, category_score)

    tag_weights = _normalize_named_scores(db, tag_score, Tag, "tag")
    category_weights = _normalize_plain_scores(category_score)

    favorite_author_ids = _top_ids(author_score, 20)
    favorite_tag_ids = _top_ids(tag_score, 30)
    favorite_authors = _resolve_names(db, Author, favorite_author_ids)
    favorite_tags = _resolve_names(db, Tag, favorite_tag_ids)

    stats = get_reading_stats(db, user_id)
    avg_rating = db.query(func.avg(UserRating.rating)).filter(UserRating.user_id == user_id).scalar() or 0.0

    return {
        "user_id": user_id,
        "tag_weights": tag_weights,
        "category_weights": category_weights,
        "favorite_author_ids": favorite_author_ids,
        "favorite_authors": favorite_authors,
        "favorite_tag_ids": favorite_tag_ids,
        "favorite_tags": favorite_tags,
        "high_rated_book_ids": high_rated_book_ids,
        "avg_rating": round(float(avg_rating), 1),
        **stats,
    }


def _accumulate_book_features(
    db: Session,
    book_id: int,
    weight: float,
    tag_score: defaultdict[int, float],
    author_score: defaultdict[int, float],
    category_score: defaultdict[str, float],
) -> None:
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        return
    for tag in book.tags:
        tag_score[tag.id] += weight
        if tag.category:
            category_score[tag.category] += weight
    for author in book.authors:
        author_score[author.id] += weight


def _accumulate_search_features(
    db: Session,
    keyword: str,
    tag_score: defaultdict[int, float],
    author_score: defaultdict[int, float],
    category_score: defaultdict[str, float],
) -> None:
    keyword = keyword.strip()
    if not keyword:
        return

    tags = db.query(Tag).filter(Tag.name.contains(keyword)).limit(10).all()
    for tag in tags:
        tag_score[tag.id] += 1.5
        if tag.category:
            category_score[tag.category] += 1.5

    authors = db.query(Author).filter(Author.name.contains(keyword)).limit(10).all()
    for author in authors:
        author_score[author.id] += 1.5

    books = db.query(Book).filter(Book.title.contains(keyword)).limit(10).all()
    for book in books:
        for tag in book.tags:
            tag_score[tag.id] += 1.0
            if tag.category:
                category_score[tag.category] += 1.0
        for author in book.authors:
            author_score[author.id] += 1.0


def _normalize_named_scores(db: Session, score_map: dict[int, float], model, kind: str) -> dict[str, float]:
    total = sum(score_map.values())
    if total <= 0:
        return {}
    ids = list(score_map.keys())
    rows = db.query(model).filter(model.id.in_(ids)).all() if ids else []
    names = {row.id: row.name for row in rows}
    return {
        names[item_id]: round(score / total, 3)
        for item_id, score in sorted(score_map.items(), key=lambda x: x[1], reverse=True)
        if item_id in names
    }


def _normalize_plain_scores(score_map: dict[str, float]) -> dict[str, float]:
    total = sum(score_map.values())
    if total <= 0:
        return {}
    return {k: round(v / total, 3) for k, v in sorted(score_map.items(), key=lambda x: x[1], reverse=True)}


def _top_ids(score_map: dict[int, float], top_n: int) -> list[int]:
    return [item_id for item_id, _ in sorted(score_map.items(), key=lambda x: x[1], reverse=True)[:top_n]]


def _resolve_names(db: Session, model, ids: list[int]) -> list[str]:
    if not ids:
        return []
    rows = db.query(model).filter(model.id.in_(ids)).all()
    name_map = {row.id: row.name for row in rows}
    return [name_map[i] for i in ids if i in name_map]


# =====================================================================
# 阅读进度同步与统计
# =====================================================================


def update_reading_progress(
    db: Session,
    user_id: int,
    book_id: int,
    progress_percent: float,
    current_page: int = 0,
) -> ReadingProgress:
    """更新/创建阅读进度。"""
    _ensure_book_exists(db, book_id)
    progress_percent = max(0.0, min(100.0, progress_percent))
    current_page = max(0, current_page)

    progress = (
        db.query(ReadingProgress)
        .filter(ReadingProgress.user_id == user_id, ReadingProgress.book_id == book_id)
        .first()
    )
    if progress:
        progress.progress_percent = progress_percent
        progress.current_page = current_page
    else:
        progress = ReadingProgress(
            user_id=user_id,
            book_id=book_id,
            progress_percent=progress_percent,
            current_page=current_page,
        )
        db.add(progress)
    db.commit()
    db.refresh(progress)
    return progress


def get_reading_progress(db: Session, user_id: int, book_id: Optional[int] = None) -> list[ReadingProgress]:
    """获取阅读进度。"""
    query = db.query(ReadingProgress).filter(ReadingProgress.user_id == user_id)
    if book_id is not None:
        query = query.filter(ReadingProgress.book_id == book_id)
    return query.order_by(desc(ReadingProgress.updated_at)).all()


def get_reading_stats(db: Session, user_id: int) -> dict:
    """获取阅读统计摘要。"""
    # 取每本书最近一次阅读状态，避免同一本书多次历史记录重复计数。
    histories = (
        db.query(ReadingHistory)
        .filter(ReadingHistory.user_id == user_id)
        .order_by(desc(ReadingHistory.read_at))
        .all()
    )
    latest_status_by_book: dict[int, str] = {}
    for h in histories:
        latest_status_by_book.setdefault(h.book_id, h.status)

    status_counter = Counter(latest_status_by_book.values())
    progress_rows = db.query(ReadingProgress).filter(ReadingProgress.user_id == user_id).all()
    avg_progress = 0.0
    if progress_rows:
        avg_progress = round(sum(p.progress_percent for p in progress_rows) / len(progress_rows), 1)

    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_actions = (
        db.query(ReadingHistory)
        .filter(ReadingHistory.user_id == user_id, ReadingHistory.read_at >= thirty_days_ago)
        .count()
    )

    return {
        "books_completed": int(status_counter.get("read", 0)),
        "books_reading": int(status_counter.get("reading", 0)),
        "books_want_to_read": int(status_counter.get("want_to_read", 0)),
        "unique_books": len(latest_status_by_book),
        "avg_progress_percent": avg_progress,
        "recent_30d_reading_actions": int(recent_actions),
    }


# =====================================================================
# 工具函数
# =====================================================================


def _ensure_book_exists(db: Session, book_id: int) -> Book:
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="图书不存在")
    return book


def _normalize_shelf_name(shelf_name: str) -> str:
    shelf_name = (shelf_name or "默认书架").strip()
    if not shelf_name:
        shelf_name = "默认书架"
    if len(shelf_name) > 64:
        raise HTTPException(status_code=400, detail="书架名称不能超过64个字符")
    return shelf_name


def _ensure_shelf_limit(db: Session, user_id: int, shelf_name: str) -> None:
    exists = db.query(Bookmark).filter(Bookmark.user_id == user_id, Bookmark.shelf_name == shelf_name).first()
    if exists:
        return
    shelf_count = (
        db.query(Bookmark.shelf_name)
        .filter(Bookmark.user_id == user_id)
        .group_by(Bookmark.shelf_name)
        .count()
    )
    if shelf_count >= MAX_SHELVES_PER_USER:
        raise HTTPException(status_code=400, detail="书架数量已达上限20个")


# =====================================================================
# 高级行为事件采集与画像快照
# =====================================================================

EVENT_DEFAULT_WEIGHTS = {
    "book_exposure": 0.1,
    "book_click": 0.8,
    "book_detail_view": 1.0,
    "search": 1.2,
    "trial_start": 1.3,
    "trial_progress": 1.6,
    "bookmark": 3.0,
    "rating": 3.5,
    "comment": 2.2,
    "purchase_click": 2.8,
    "not_interested": -3.0,
}


def record_behavior_event(
    db: Session,
    user_id: Optional[int],
    event_type: str,
    book_id: Optional[int] = None,
    keyword: Optional[str] = None,
    source: Optional[str] = None,
    weight: Optional[float] = None,
    session_id: Optional[str] = None,
    metadata: Optional[dict] = None,
) -> UserBehaviorEvent:
    """记录统一行为事件。未登录事件也可保存，用于热门统计和后续匿名分析。"""
    event_type = (event_type or "").strip()
    if not event_type:
        raise HTTPException(status_code=400, detail="event_type不能为空")
    if book_id is not None:
        _ensure_book_exists(db, book_id)
    if weight is None:
        weight = EVENT_DEFAULT_WEIGHTS.get(event_type, 1.0)
    row = UserBehaviorEvent(
        user_id=user_id,
        book_id=book_id,
        event_type=event_type[:32],
        keyword=(keyword or None),
        source=(source or None),
        weight=float(weight),
        session_id=(session_id or None),
        metadata_json=json.dumps(metadata or {}, ensure_ascii=False),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def create_reading_session(
    db: Session,
    user_id: int,
    book_id: int,
    duration_seconds: int = 0,
    start_page: int = 0,
    end_page: int = 0,
    progress_delta: float = 0.0,
    device: Optional[str] = None,
    note: Optional[str] = None,
) -> ReadingSession:
    """记录一次阅读会话，并自动更新阅读进度和行为事件。"""
    book = _ensure_book_exists(db, book_id)
    duration_seconds = max(0, int(duration_seconds or 0))
    progress_delta = max(0.0, min(100.0, float(progress_delta or 0.0)))
    row = ReadingSession(
        user_id=user_id,
        book_id=book_id,
        duration_seconds=duration_seconds,
        start_page=max(0, int(start_page or 0)),
        end_page=max(0, int(end_page or 0)),
        progress_delta=progress_delta,
        device=device,
        note=note,
        ended_at=datetime.utcnow(),
    )
    db.add(row)
    db.flush()

    # 进度增量不为空时，叠加到当前进度；否则仅记录会话。
    current = db.query(ReadingProgress).filter(ReadingProgress.user_id == user_id, ReadingProgress.book_id == book_id).first()
    if progress_delta > 0:
        new_percent = min(100.0, float(getattr(current, "progress_percent", 0.0) or 0.0) + progress_delta)
        if current:
            current.progress_percent = new_percent
            current.current_page = max(int(current.current_page or 0), int(end_page or 0))
        else:
            db.add(ReadingProgress(user_id=user_id, book_id=book_id, progress_percent=new_percent, current_page=max(0, int(end_page or 0))))

    db.commit()
    db.refresh(row)
    record_behavior_event(
        db,
        user_id=user_id,
        event_type="trial_progress" if duration_seconds > 0 else "book_detail_view",
        book_id=book_id,
        weight=max(1.0, min(5.0, duration_seconds / 600 if duration_seconds else 1.0)),
        metadata={"duration_seconds": duration_seconds, "book_title": book.title, "progress_delta": progress_delta},
    )
    return row


def upsert_user_preferences(
    db: Session,
    user_id: int,
    preferred_tags: list[str],
    blocked_tags: list[str],
    preferred_authors: list[str],
    blocked_authors: list[str],
    difficulty_level: Optional[str] = None,
) -> UserPreferenceOverride:
    row = db.query(UserPreferenceOverride).filter(UserPreferenceOverride.user_id == user_id).first()
    if not row:
        row = UserPreferenceOverride(user_id=user_id)
        db.add(row)
    row.preferred_tags_json = json.dumps(_clean_text_list(preferred_tags), ensure_ascii=False)
    row.blocked_tags_json = json.dumps(_clean_text_list(blocked_tags), ensure_ascii=False)
    row.preferred_authors_json = json.dumps(_clean_text_list(preferred_authors), ensure_ascii=False)
    row.blocked_authors_json = json.dumps(_clean_text_list(blocked_authors), ensure_ascii=False)
    row.difficulty_level = difficulty_level
    db.commit()
    db.refresh(row)
    return row


def get_user_preferences(db: Session, user_id: int) -> dict:
    row = db.query(UserPreferenceOverride).filter(UserPreferenceOverride.user_id == user_id).first()
    if not row:
        return {
            "user_id": user_id,
            "preferred_tags": [],
            "blocked_tags": [],
            "preferred_authors": [],
            "blocked_authors": [],
            "difficulty_level": None,
            "updated_at": None,
        }
    return {
        "user_id": user_id,
        "preferred_tags": _json_list(row.preferred_tags_json),
        "blocked_tags": _json_list(row.blocked_tags_json),
        "preferred_authors": _json_list(row.preferred_authors_json),
        "blocked_authors": _json_list(row.blocked_authors_json),
        "difficulty_level": row.difficulty_level,
        "updated_at": row.updated_at,
    }


def record_book_feedback(db: Session, user_id: int, book_id: int, feedback_type: str, reason: Optional[str] = None) -> UserBookFeedback:
    _ensure_book_exists(db, book_id)
    if feedback_type not in {"like", "dislike", "not_interested", "block_author", "block_tag"}:
        raise HTTPException(status_code=400, detail="feedback_type不合法")
    row = UserBookFeedback(user_id=user_id, book_id=book_id, feedback_type=feedback_type, reason=reason)
    db.add(row)
    db.commit()
    db.refresh(row)
    record_behavior_event(db, user_id, "not_interested" if feedback_type in {"dislike", "not_interested"} else "book_click", book_id, metadata={"feedback_type": feedback_type, "reason": reason})
    return row


def build_advanced_user_profile(db: Session, user_id: int, save_snapshot: bool = False) -> dict:
    """构建更完整的用户画像，供画像驾驶舱、推荐模块和智能助手共用。"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    base = build_user_profile(db, user_id)
    short_term_tags = _build_short_term_tags(db, user_id)
    long_term_tags = base.get("tag_weights", {})
    events = _recent_behavior_events(db, user_id, 20)
    heatmap = _reading_heatmap(db, user_id, 30)
    stats = get_reading_stats_advanced(db, user_id)
    prefs = get_user_preferences(db, user_id)
    blocked_book_ids = [r.book_id for r in db.query(UserBookFeedback).filter(UserBookFeedback.user_id == user_id, UserBookFeedback.feedback_type.in_(["dislike", "not_interested"])).all()]

    signal_count = _signal_count(db, user_id)
    maturity_score = _profile_maturity_score(signal_count, len(long_term_tags), stats.get("total_reading_minutes", 0), stats.get("rating_count", 0))
    cold_start = signal_count < 3
    radar = _profile_radar(base, stats, signal_count)
    insights = _profile_insights(base, stats, maturity_score, cold_start, prefs)

    profile = {
        "user_id": user_id,
        "username": user.username,
        "profile_version": "profile-v2",
        "maturity_score": maturity_score,
        "cold_start": cold_start,
        "tag_preferences": long_term_tags,
        "category_preferences": base.get("category_weights", {}),
        "short_term_tags": short_term_tags,
        "long_term_tags": long_term_tags,
        "favorite_authors": base.get("favorite_authors", []),
        "favorite_author_ids": base.get("favorite_author_ids", []),
        "favorite_tags": base.get("favorite_tags", []),
        "favorite_tag_ids": base.get("favorite_tag_ids", []),
        "high_rated_book_ids": base.get("high_rated_book_ids", []),
        "blocked_book_ids": blocked_book_ids,
        "manual_preferences": prefs,
        "radar": radar,
        "reading_heatmap": heatmap,
        "recent_events": events,
        "insights": insights,
        "stats": stats,
        "updated_at": datetime.utcnow(),
    }
    if save_snapshot:
        _save_profile_snapshot(db, user_id, profile, maturity_score)
    return profile


def rebuild_profile_snapshot(db: Session, user_id: int) -> UserProfileSnapshot:
    profile = build_advanced_user_profile(db, user_id, save_snapshot=False)
    return _save_profile_snapshot(db, user_id, profile, profile["maturity_score"])


def get_latest_profile_snapshot(db: Session, user_id: int) -> Optional[UserProfileSnapshot]:
    return (
        db.query(UserProfileSnapshot)
        .filter(UserProfileSnapshot.user_id == user_id, UserProfileSnapshot.is_current.is_(True))
        .order_by(desc(UserProfileSnapshot.created_at))
        .first()
    )


def get_reading_stats_advanced(db: Session, user_id: int) -> dict:
    stats = get_reading_stats(db, user_id)
    sessions = db.query(ReadingSession).filter(ReadingSession.user_id == user_id).all()
    total_seconds = sum(int(s.duration_seconds or 0) for s in sessions)
    ratings_count = db.query(UserRating).filter(UserRating.user_id == user_id).count()
    bookmark_count = db.query(Bookmark).filter(Bookmark.user_id == user_id).count()
    search_count = db.query(SearchLog).filter(SearchLog.user_id == user_id).count()
    event_count = db.query(UserBehaviorEvent).filter(UserBehaviorEvent.user_id == user_id).count()
    completed_progress_count = db.query(ReadingProgress).filter(ReadingProgress.user_id == user_id, ReadingProgress.progress_percent >= 99.0).count()
    stats.update({
        "total_reading_seconds": int(total_seconds),
        "total_reading_minutes": round(total_seconds / 60, 1),
        "total_reading_hours": round(total_seconds / 3600, 2),
        "rating_count": int(ratings_count),
        "bookmark_count": int(bookmark_count),
        "search_count": int(search_count),
        "behavior_event_count": int(event_count),
        "completed_progress_count": int(completed_progress_count),
    })
    return stats


def get_user_dashboard(db: Session, user_id: int) -> dict:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    profile = build_advanced_user_profile(db, user_id, save_snapshot=True)
    return {
        "user": {"id": user.id, "username": user.username, "email": user.email, "is_admin": user.is_admin},
        "metrics": profile["stats"],
        "profile": profile,
        "shelves": get_shelves(db, user_id),
        "recent_history": get_reading_history(db, user_id, limit=10),
        "progress": get_reading_progress(db, user_id),
        "timeline": get_user_timeline(db, user_id, limit=30),
        "suggestions": _profile_action_suggestions(profile),
    }


def get_user_timeline(db: Session, user_id: int, limit: int = 50) -> list[dict]:
    rows = db.query(UserBehaviorEvent).filter(UserBehaviorEvent.user_id == user_id).order_by(desc(UserBehaviorEvent.created_at)).limit(limit).all()
    result = []
    for e in rows:
        result.append({
            "id": e.id,
            "type": e.event_type,
            "book_id": e.book_id,
            "book_title": e.book.title if getattr(e, "book", None) else None,
            "keyword": e.keyword,
            "source": e.source,
            "weight": float(e.weight or 0.0),
            "created_at": e.created_at,
        })
    return result


def _save_profile_snapshot(db: Session, user_id: int, profile: dict, maturity_score: float) -> UserProfileSnapshot:
    db.query(UserProfileSnapshot).filter(UserProfileSnapshot.user_id == user_id, UserProfileSnapshot.is_current.is_(True)).update({"is_current": False})
    safe_profile = dict(profile)
    # datetime 转字符串，避免 JSON 序列化失败。
    if isinstance(safe_profile.get("updated_at"), datetime):
        safe_profile["updated_at"] = safe_profile["updated_at"].isoformat()
    row = UserProfileSnapshot(
        user_id=user_id,
        model_version="profile-v2",
        profile_json=json.dumps(safe_profile, ensure_ascii=False, default=str),
        maturity_score=float(maturity_score),
        is_current=True,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def _build_short_term_tags(db: Session, user_id: int) -> dict[str, float]:
    tag_score: defaultdict[int, float] = defaultdict(float)
    author_score: defaultdict[int, float] = defaultdict(float)
    category_score: defaultdict[str, float] = defaultdict(float)
    since = datetime.utcnow() - timedelta(days=14)
    events = db.query(UserBehaviorEvent).filter(UserBehaviorEvent.user_id == user_id, UserBehaviorEvent.created_at >= since).all()
    for e in events:
        if e.book_id:
            _accumulate_book_features(db, e.book_id, max(float(e.weight or 1.0), 0.1), tag_score, author_score, category_score)
        if e.keyword:
            _accumulate_search_features(db, e.keyword, tag_score, author_score, category_score)
    return _normalize_named_scores(db, tag_score, Tag, "tag")


def _recent_behavior_events(db: Session, user_id: int, limit: int) -> list[dict]:
    rows = db.query(UserBehaviorEvent).filter(UserBehaviorEvent.user_id == user_id).order_by(desc(UserBehaviorEvent.created_at)).limit(limit).all()
    return [{
        "id": e.id,
        "event_type": e.event_type,
        "book_id": e.book_id,
        "book_title": e.book.title if getattr(e, "book", None) else None,
        "keyword": e.keyword,
        "source": e.source,
        "weight": float(e.weight or 0.0),
        "created_at": e.created_at.isoformat() if e.created_at else None,
    } for e in rows]


def _reading_heatmap(db: Session, user_id: int, days: int = 30) -> list[dict]:
    start = datetime.utcnow().date() - timedelta(days=days - 1)
    buckets = {str(start + timedelta(days=i)): {"date": str(start + timedelta(days=i)), "minutes": 0.0, "sessions": 0, "events": 0} for i in range(days)}
    sessions = db.query(ReadingSession).filter(ReadingSession.user_id == user_id, ReadingSession.started_at >= datetime.combine(start, datetime.min.time())).all()
    for s in sessions:
        key = str(s.started_at.date()) if s.started_at else str(start)
        if key in buckets:
            buckets[key]["minutes"] += round((s.duration_seconds or 0) / 60, 1)
            buckets[key]["sessions"] += 1
    events = db.query(UserBehaviorEvent).filter(UserBehaviorEvent.user_id == user_id, UserBehaviorEvent.created_at >= datetime.combine(start, datetime.min.time())).all()
    for e in events:
        key = str(e.created_at.date()) if e.created_at else str(start)
        if key in buckets:
            buckets[key]["events"] += 1
    return list(buckets.values())


def _signal_count(db: Session, user_id: int) -> int:
    return int(
        db.query(ReadingHistory).filter(ReadingHistory.user_id == user_id).count()
        + db.query(Bookmark).filter(Bookmark.user_id == user_id).count()
        + db.query(UserRating).filter(UserRating.user_id == user_id).count()
        + db.query(SearchLog).filter(SearchLog.user_id == user_id).count()
        + db.query(ReadingSession).filter(ReadingSession.user_id == user_id).count()
        + db.query(UserBehaviorEvent).filter(UserBehaviorEvent.user_id == user_id).count()
    )


def _profile_maturity_score(signal_count: int, tag_count: int, reading_minutes: float, rating_count: int) -> float:
    raw = min(1.0, signal_count / 20) * 0.45 + min(1.0, tag_count / 8) * 0.25 + min(1.0, reading_minutes / 300) * 0.2 + min(1.0, rating_count / 8) * 0.1
    return round(raw * 100, 1)


def _profile_radar(base: dict, stats: dict, signal_count: int) -> dict[str, float]:
    return {
        "兴趣清晰度": round(min(100, len(base.get("tag_weights", {})) * 12.5), 1),
        "行为丰富度": round(min(100, signal_count * 5), 1),
        "阅读稳定性": round(min(100, stats.get("total_reading_minutes", 0) / 5), 1),
        "评分参与度": round(min(100, stats.get("rating_count", 0) * 12.5), 1),
        "收藏活跃度": round(min(100, stats.get("bookmark_count", 0) * 10), 1),
        "探索多样性": round(min(100, len(base.get("category_weights", {})) * 25), 1),
    }


def _profile_insights(base: dict, stats: dict, maturity_score: float, cold_start: bool, prefs: dict) -> list[dict]:
    insights = []
    if cold_start:
        insights.append({"title": "画像仍处于冷启动", "description": "建议先收藏、评分或试读3本以上图书，系统会更快形成稳定偏好。", "level": "warning"})
    else:
        top_tags = list(base.get("tag_weights", {}).keys())[:3]
        insights.append({"title": "主要兴趣方向", "description": "当前兴趣集中在：" + ("、".join(top_tags) if top_tags else "暂不明显"), "level": "success"})
    if stats.get("total_reading_minutes", 0) > 0:
        insights.append({"title": "阅读时长累计", "description": f"系统已记录约 {stats.get('total_reading_minutes')} 分钟阅读行为，可用于分析阅读稳定性。", "level": "info"})
    if prefs.get("blocked_tags") or prefs.get("blocked_authors"):
        insights.append({"title": "已启用负偏好控制", "description": "推荐会参考你手动屏蔽的标签或作者，减少不感兴趣内容。", "level": "info"})
    if maturity_score >= 70:
        insights.append({"title": "画像成熟度较高", "description": "该用户已有较多行为信号，适合启用个性化推荐和猜你喜欢。", "level": "success"})
    return insights[:6]


def _profile_action_suggestions(profile: dict) -> list[str]:
    if profile.get("cold_start"):
        return ["先给3本读过的图书评分", "把感兴趣图书加入想读书架", "试读一本系统推荐图书"]
    top_tags = list(profile.get("tag_preferences", {}).keys())[:2]
    suggestions = ["查看猜你喜欢", "继续阅读最近在读图书", "给读完的图书补充评分"]
    if top_tags:
        suggestions.insert(0, f"探索更多{top_tags[0]}相关图书")
    return suggestions[:5]


def _json_list(text: Optional[str]) -> list[str]:
    if not text:
        return []
    try:
        data = json.loads(text)
        return [str(x) for x in data if str(x).strip()]
    except Exception:
        return []


def _clean_text_list(values: Optional[list[str]]) -> list[str]:
    return [str(v).strip()[:64] for v in (values or []) if str(v).strip()][:50]
