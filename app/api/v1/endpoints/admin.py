from __future__ import annotations

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.core.cache import cache
from app.core.database import get_db
from app.models import Book, BookComment, Bookmark, ChatHistory, PurchaseClick, ReadingHistory, SearchLog, SystemConfig, User, UserRating
from app.schemas import AdminUserStatusRequest, SystemConfigUpdate
from app.services.serializers import book_card, user_card

router = APIRouter(prefix="/admin", tags=["管理员后台"])


@router.get("/dashboard")
def dashboard(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    books = db.query(Book).filter(Book.is_deleted == False).count()  # noqa: E712
    users = db.query(User).count()
    comments = db.query(BookComment).filter(BookComment.is_deleted == False).count()  # noqa: E712
    purchases = db.query(PurchaseClick).count()
    ratings = db.query(UserRating).count()
    bookmarks = db.query(Bookmark).count()
    searches = db.query(SearchLog).count()
    chats = db.query(ChatHistory).count()
    hot = db.query(Book).filter(Book.is_deleted == False).order_by((Book.hot_score + Book.view_count * 0.1).desc()).limit(10).all()  # noqa: E712
    categories = {}
    rating_distribution = {"0-2": 0, "2-3": 0, "3-4": 0, "4-5": 0}
    difficulty_distribution = {}
    books_rows = db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
    for b in books_rows:
        categories[b.category or "未分类"] = categories.get(b.category or "未分类", 0) + 1
        difficulty_distribution[b.difficulty or "未设置"] = difficulty_distribution.get(b.difficulty or "未设置", 0) + 1
        score = b.avg_rating or 0
        if score < 2:
            rating_distribution["0-2"] += 1
        elif score < 3:
            rating_distribution["2-3"] += 1
        elif score < 4:
            rating_distribution["3-4"] += 1
        else:
            rating_distribution["4-5"] += 1

    today = datetime.utcnow().date()
    activity = []
    for offset in range(6, -1, -1):
        day = today - timedelta(days=offset)
        start = datetime.combine(day, datetime.min.time())
        end = start + timedelta(days=1)
        activity.append({
            "date": day.strftime("%m-%d"),
            "users": db.query(User).filter(User.created_at >= start, User.created_at < end).count(),
            "comments": db.query(BookComment).filter(BookComment.created_at >= start, BookComment.created_at < end, BookComment.is_deleted == False).count(),  # noqa: E712
            "ratings": db.query(UserRating).filter(UserRating.created_at >= start, UserRating.created_at < end).count(),
            "searches": db.query(SearchLog).filter(SearchLog.created_at >= start, SearchLog.created_at < end).count(),
            "reads": db.query(ReadingHistory).filter(ReadingHistory.read_at >= start, ReadingHistory.read_at < end).count(),
        })

    user_status = {
        "active": db.query(User).filter(User.is_active == True).count(),  # noqa: E712
        "disabled": db.query(User).filter(User.is_active == False).count(),  # noqa: E712
        "admins": db.query(User).filter(User.is_admin == True).count(),  # noqa: E712
        "members": db.query(User).filter(User.is_admin == False).count(),  # noqa: E712
    }
    top_keywords = {}
    for row in db.query(SearchLog).order_by(SearchLog.created_at.desc()).limit(200).all():
        top_keywords[row.keyword] = top_keywords.get(row.keyword, 0) + 1
    return {
        "cards": {
            "books": books,
            "users": users,
            "comments": comments,
            "ratings": ratings,
            "bookmarks": bookmarks,
            "searches": searches,
            "chat_messages": chats,
            "purchase_clicks": purchases,
        },
        "hot_books": [book_card(b) for b in hot],
        "category_distribution": categories,
        "difficulty_distribution": difficulty_distribution,
        "rating_distribution": rating_distribution,
        "user_status": user_status,
        "activity": activity,
        "top_keywords": [{"keyword": k, "count": v} for k, v in sorted(top_keywords.items(), key=lambda x: x[1], reverse=True)[:10]],
        "cache": cache.status(),
    }


@router.get("/users")
def users(q: str | None = None, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    rows = db.query(User).all()
    if q:
        rows = [u for u in rows if q in u.username or q in u.email]
    return {"items": [user_card(u) for u in rows], "total": len(rows)}


@router.put("/users/{user_id}/status")
def user_status(user_id: int, data: AdminUserStatusRequest, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        return {"message": "用户不存在"}
    user.is_active = data.is_active
    db.commit()
    return {"message": "用户状态已更新", "user": user_card(user)}


@router.get("/users/export-csv")
def export_users(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    rows = ["id,username,email,is_active,is_admin,created_at"]
    for u in db.query(User).all():
        rows.append(f"{u.id},{u.username},{u.email},{u.is_active},{u.is_admin},{u.created_at.isoformat()}")
    return {"filename": "users.csv", "content": "\n".join(rows)}


@router.get("/configs")
def configs(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return {"items": [{"key": c.key, "value": c.value, "description": c.description} for c in db.query(SystemConfig).all()]}


@router.put("/configs")
def update_config(data: SystemConfigUpdate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    row = db.get(SystemConfig, data.key)
    if not row:
        row = SystemConfig(key=data.key, value=data.value, description=data.description)
        db.add(row)
    else:
        row.value = data.value
        row.description = data.description or row.description
    db.commit()
    return {"message": "系统配置已更新", "key": data.key, "value": data.value}
