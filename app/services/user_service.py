from __future__ import annotations

from collections import Counter, defaultdict
from datetime import datetime, timedelta
from typing import Any

from fastapi import HTTPException
from sqlalchemy import or_, func
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import create_access_token, hash_password, is_email, validate_password_strength, verify_password
from app.models import (
    Book,
    BookComment,
    Bookmark,
    Bookshelf,
    ReadingHistory,
    ReadingProgress,
    ReadingSession,
    RecommendationFeedback,
    SearchLog,
    User,
    UserRating,
)
from app.services.serializers import book_card, user_card

DEFAULT_SHELVES = [("想读", "want_to_read"), ("在读", "reading"), ("已读", "read")]
settings = get_settings()


def normalize_role(role: str | None) -> str:
    role = (role or "user").strip().lower()
    if role in {"admin", "administrator", "manager"}:
        return "admin"
    return "user"


def ensure_default_shelves(db: Session, user_id: int) -> None:
    names = {x.name for x in db.query(Bookshelf).filter_by(user_id=user_id).all()}
    for name, _ in DEFAULT_SHELVES:
        if name not in names:
            db.add(Bookshelf(user_id=user_id, name=name, is_default=True))
    db.commit()


def register_user(
    db: Session,
    username: str,
    email: str,
    password: str,
    nickname: str | None = None,
    role: str = "user",
    admin_code: str | None = None,
) -> dict:
    """注册账号。

    普通用户直接注册；管理员注册需要填写管理员注册码，避免所有人都能创建后台账号。
    默认管理员注册码可在 .env 中通过 ADMIN_REGISTER_CODE 修改。
    """
    validate_password_strength(password)
    role = normalize_role(role)
    is_admin = role == "admin"

    if is_admin and (admin_code or "").strip() != settings.ADMIN_REGISTER_CODE:
        raise HTTPException(403, "管理员注册码错误，不能注册管理员账号")

    if db.query(User).filter(User.username == username).first():
        raise HTTPException(400, "该用户名已被注册，请更换")
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "该邮箱已被注册")

    user = User(
        username=username,
        email=email,
        nickname=nickname or username,
        hashed_password=hash_password(password),
        is_admin=is_admin,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    ensure_default_shelves(db, user.id)
    return user_card(user)


def authenticate_user(db: Session, account: str, password: str, role: str | None = None) -> dict:
    query = User.email == account if is_email(account) else User.username == account
    user = db.query(User).filter(query).first()
    if not user or not verify_password(password, user.hashed_password):
        if user:
            user.failed_login_count += 1
            db.commit()
        raise HTTPException(401, "用户名或密码错误")
    if not user.is_active:
        raise HTTPException(403, "账号已被禁用，请联系管理员")

    # 前端选择了“用户登录/管理员登录”时，后端也进行角色校验，避免入口混用。
    if role:
        role = normalize_role(role)
        if role == "admin" and not user.is_admin:
            raise HTTPException(403, "该账号不是管理员账号，请选择用户登录")
        if role == "user" and user.is_admin:
            raise HTTPException(403, "该账号是管理员账号，请选择管理员登录")

    user.failed_login_count = 0
    user.last_login_at = datetime.utcnow()
    db.commit()
    token = create_access_token(user.id, {"username": user.username, "is_admin": user.is_admin})
    return {"access_token": token, "token_type": "bearer", "expires_in_hours": 24, "user": user_card(user)}


def update_profile(db: Session, user: User, nickname: str | None = None, avatar_url: str | None = None) -> dict:
    if nickname is not None:
        user.nickname = nickname
    if avatar_url is not None:
        user.avatar_url = avatar_url
    db.commit()
    db.refresh(user)
    return user_card(user)


def change_password(db: Session, user: User, old_password: str, new_password: str) -> None:
    validate_password_strength(new_password)
    if not verify_password(old_password, user.hashed_password):
        raise HTTPException(400, "旧密码不正确")
    user.hashed_password = hash_password(new_password)
    db.commit()


def record_search(db: Session, keyword: str, result_count: int, user: User | None = None) -> None:
    if keyword:
        db.add(SearchLog(user_id=user.id if user else None, keyword=keyword, result_count=result_count))
        db.commit()


def record_reading_history(db: Session, user: User, book_id: int, status: str = "read", source: str | None = None) -> dict:
    if status not in {"want_to_read", "reading", "read"}:
        raise HTTPException(400, "阅读状态只能为 want_to_read / reading / read")
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    row = ReadingHistory(user_id=user.id, book_id=book_id, status=status, source=source)
    db.add(row)
    db.commit()
    return {"message": "阅读历史已记录", "book": book_card(book), "status": status}


def update_reading_progress(db: Session, user: User, book_id: int, current_page: int, progress_percent: float, reading_minutes: int = 0, last_device: str | None = None) -> dict:
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    row = db.query(ReadingProgress).filter_by(user_id=user.id, book_id=book_id).first()
    if not row:
        row = ReadingProgress(user_id=user.id, book_id=book_id)
        db.add(row)
    row.current_page = current_page
    row.progress_percent = max(0, min(100, progress_percent))
    row.last_device = last_device

    session_minutes = max(int(reading_minutes or 0), 0)
    if session_minutes > 0:
        db.add(ReadingSession(
            user_id=user.id,
            book_id=book_id,
            minutes=session_minutes,
            progress_percent=row.progress_percent,
            current_page=current_page,
            device=last_device,
            ended_at=datetime.utcnow(),
        ))
        row.reading_minutes = (row.reading_minutes or 0) + session_minutes

    if row.progress_percent >= 95:
        status = "read"
    elif row.progress_percent > 0:
        status = "reading"
    else:
        status = "want_to_read"
    db.add(ReadingHistory(user_id=user.id, book_id=book_id, status=status, source="progress"))
    db.commit()
    return {"book": book_card(book), "current_page": row.current_page, "progress_percent": row.progress_percent, "reading_minutes": row.reading_minutes, "status": status, "session_minutes": session_minutes}


def rate_book(db: Session, user: User, book_id: int, rating: float) -> dict:
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    row = db.query(UserRating).filter_by(user_id=user.id, book_id=book_id).first()
    if row:
        row.rating = rating
    else:
        db.add(UserRating(user_id=user.id, book_id=book_id, rating=rating))
    db.add(ReadingHistory(user_id=user.id, book_id=book_id, status="read", source="rating"))
    db.add(RecommendationFeedback(user_id=user.id, book_id=book_id, event_type="rating", source="user_rating"))
    book.hot_score += 0.25
    db.commit()
    update_book_rating(db, book_id)
    db.refresh(book)
    return {"message": "评分已保存", "book": book_card(book)}


def update_book_rating(db: Session, book_id: int) -> None:
    ratings = [r.rating for r in db.query(UserRating).filter_by(book_id=book_id).all()]
    comments = [c.rating for c in db.query(BookComment).filter_by(book_id=book_id, is_deleted=False).all() if c.rating]
    values = ratings + comments
    book = db.get(Book, book_id)
    if book:
        book.rating_count = len(values)
        book.avg_rating = round(sum(values) / len(values), 2) if values else 0.0
        db.commit()


def add_bookmark(db: Session, user: User, book_id: int, shelf_name: str = "想读", reading_status: str = "want_to_read") -> dict:
    ensure_default_shelves(db, user.id)
    if db.query(Bookshelf).filter_by(user_id=user.id).count() >= 20 and not db.query(Bookshelf).filter_by(user_id=user.id, name=shelf_name).first():
        raise HTTPException(400, "书架数量已达上限")
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    if not db.query(Bookshelf).filter_by(user_id=user.id, name=shelf_name).first():
        db.add(Bookshelf(user_id=user.id, name=shelf_name, is_default=False))
        db.commit()
    row = db.query(Bookmark).filter_by(user_id=user.id, book_id=book_id, shelf_name=shelf_name).first()
    if not row:
        row = Bookmark(user_id=user.id, book_id=book_id, shelf_name=shelf_name, reading_status=reading_status)
        db.add(row)
    else:
        row.reading_status = reading_status
    db.add(ReadingHistory(user_id=user.id, book_id=book_id, status=reading_status, source="bookmark"))
    db.add(RecommendationFeedback(user_id=user.id, book_id=book_id, event_type="bookmark", source="bookshelf"))
    book.hot_score += 0.35
    db.commit()
    return {"message": "已加入书架", "book": book_card(book), "shelf_name": shelf_name}


def move_bookmark(db: Session, user: User, book_id: int, from_shelf: str, to_shelf: str) -> dict:
    row = db.query(Bookmark).filter_by(user_id=user.id, book_id=book_id, shelf_name=from_shelf).first()
    if not row:
        raise HTTPException(404, "书架中没有这本书")
    if not db.query(Bookshelf).filter_by(user_id=user.id, name=to_shelf).first():
        db.add(Bookshelf(user_id=user.id, name=to_shelf))
    row.shelf_name = to_shelf
    db.commit()
    return {"message": "图书已移动", "book_id": book_id, "from": from_shelf, "to": to_shelf}


def build_user_profile(db: Session, user: User) -> dict[str, Any]:
    ratings = db.query(UserRating).filter_by(user_id=user.id).all()
    bookmarks = db.query(Bookmark).filter_by(user_id=user.id).all()
    progresses = db.query(ReadingProgress).filter_by(user_id=user.id).all()
    histories = db.query(ReadingHistory).filter_by(user_id=user.id).order_by(ReadingHistory.read_at.desc()).limit(80).all()
    searches = db.query(SearchLog).filter_by(user_id=user.id).order_by(SearchLog.created_at.desc()).limit(30).all()

    # 同一本书可能同时被“想读/在读/评分/书评/进度”多次触发。画像层按 book_id 合并，
    # 只保留该书的最高行为权重，避免一本书反复放大标签和作者偏好。
    book_weights: dict[int, float] = {}
    book_objects: dict[int, Book] = {}

    def mark(book: Book | None, weight: float) -> None:
        if not book or book.is_deleted:
            return
        book_objects[book.id] = book
        book_weights[book.id] = max(book_weights.get(book.id, 0.0), weight)

    for r in ratings:
        mark(r.book, max(float(r.rating or 0), 0.5))
    for b in bookmarks:
        mark(b.book, 2.0)
    for p in progresses:
        mark(p.book, 1.0 + float(p.progress_percent or 0) / 100)
    for h in histories:
        mark(h.book, 1.0)

    tag_counter: Counter[str] = Counter()
    author_counter: Counter[str] = Counter()
    category_counter: Counter[str] = Counter()
    for book_id, weight in book_weights.items():
        book = book_objects.get(book_id)
        if not book:
            continue
        for tag in book.tags:
            tag_counter[tag.name] += weight
        for author in book.authors:
            author_counter[author.name] += weight
        if book.category:
            category_counter[book.category] += weight

    max_tag = max(tag_counter.values()) if tag_counter else 1
    tag_preferences = [{"name": k, "weight": round(v / max_tag, 3)} for k, v in tag_counter.most_common(12)]
    favorite_authors = [{"name": k, "weight": round(v, 2)} for k, v in author_counter.most_common(8)]
    favorite_categories = [{"name": k, "weight": round(v, 2)} for k, v in category_counter.most_common(8)]
    high_rated_book_ids = list(dict.fromkeys([r.book_id for r in ratings if r.rating >= 4.0]))
    if not high_rated_book_ids:
        high_rated_book_ids = [book_id for book_id, _ in sorted(book_weights.items(), key=lambda x: x[1], reverse=True)[:5]]

    # KG 推荐不再只依赖“最近一本书”，而是从用户整体画像中选取 Top 兴趣种子。
    # 种子来源综合评分、书架、进度和历史行为；同一本书只保留最高行为权重。
    seed_rows = sorted(book_weights.items(), key=lambda x: x[1], reverse=True)[:8]
    interest_seed_book_ids = [book_id for book_id, _ in seed_rows]
    interest_seed_books = []
    for book_id, weight in seed_rows:
        book = book_objects.get(book_id)
        if book:
            card = book_card(book)
            card["seed_score"] = round(weight, 2)
            card["seed_reason"] = "由评分、书架、阅读进度和历史行为综合选出"
            interest_seed_books.append(card)

    recent_books = []
    seen_recent: set[int] = set()
    for h in histories:
        if h.book_id in seen_recent or not h.book:
            continue
        seen_recent.add(h.book_id)
        recent_books.append(book_card(h.book))
        if len(recent_books) >= 10:
            break

    return {
        "user": user_card(user),
        "tag_preferences": tag_preferences,
        "tag_weights": {x["name"]: x["weight"] for x in tag_preferences},
        "favorite_authors": favorite_authors,
        "favorite_categories": favorite_categories,
        "high_rated_book_ids": high_rated_book_ids,
        "interest_seed_book_ids": interest_seed_book_ids,
        "interest_seed_books": interest_seed_books,
        "recent_books": recent_books,
        "search_keywords": [s.keyword for s in searches],
        "unique_behavior_books": len(book_weights),
        "updated_at": datetime.utcnow().isoformat(),
    }

def reading_stats(db: Session, user: User) -> dict[str, Any]:
    progresses = db.query(ReadingProgress).filter_by(user_id=user.id).all()
    histories = db.query(ReadingHistory).filter_by(user_id=user.id).all()
    bookmarks = db.query(Bookmark).filter_by(user_id=user.id).all()
    sessions = db.query(ReadingSession).filter_by(user_id=user.id).all()
    comments_count = db.query(BookComment).filter_by(user_id=user.id, is_deleted=False).count()
    ratings_count = db.query(UserRating).filter_by(user_id=user.id).count()
    completed_set = {p.book_id for p in progresses if p.progress_percent >= 95} | {h.book_id for h in histories if h.status == "read"}
    completed = len(completed_set)
    reading = len({p.book_id for p in progresses if 0 < p.progress_percent < 95} | {b.book_id for b in bookmarks if b.reading_status == "reading"})
    want_to_read = len({b.book_id for b in bookmarks if b.shelf_name == "想读" or b.reading_status == "want_to_read"})

    # 新版本以 reading_sessions 作为阅读时长口径，避免每次保存进度把整本书累计分钟重复计入当天。
    # 若旧库中尚无会话记录，则回退到 reading_progress.reading_minutes，保证历史演示数据仍可显示。
    progress_total = sum(p.reading_minutes or 0 for p in progresses)
    session_total = sum(s.minutes or 0 for s in sessions)
    total_minutes = max(progress_total, session_total)

    shelf_count = len({b.shelf_name for b in bookmarks} | {"想读", "在读", "已读"})
    today = datetime.utcnow().date()
    trend = []
    for i in range(29, -1, -1):
        day = today - timedelta(days=i)
        if sessions:
            minutes = sum(s.minutes or 0 for s in sessions if s.ended_at and s.ended_at.date() == day)
        else:
            minutes = sum(p.reading_minutes or 0 for p in progresses if p.updated_at and p.updated_at.date() == day)
        trend.append({"date": day.isoformat(), "minutes": minutes})
    return {
        "completed_books": completed,
        "reading_books": reading,
        "want_to_read_books": want_to_read,
        "total_reading_minutes": total_minutes,
        "ratings_count": ratings_count,
        "comments_count": comments_count,
        "shelf_count": shelf_count,
        "history_count": len(histories),
        "reading_session_count": len(sessions),
        "trend_30d": trend,
    }
