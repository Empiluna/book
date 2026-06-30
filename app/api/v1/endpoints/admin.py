from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.core.cache import cache
from app.core.database import get_db
from app.models import Book, BookComment, PurchaseClick, SystemConfig, User
from app.schemas import AdminUserStatusRequest, SystemConfigUpdate
from app.services.serializers import book_card, user_card

router = APIRouter(prefix="/admin", tags=["管理员后台"])


@router.get("/dashboard")
def dashboard(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    books = db.query(Book).filter(Book.is_deleted == False).count()  # noqa: E712
    users = db.query(User).count()
    comments = db.query(BookComment).filter(BookComment.is_deleted == False).count()  # noqa: E712
    purchases = db.query(PurchaseClick).count()
    hot = db.query(Book).filter(Book.is_deleted == False).order_by((Book.hot_score + Book.view_count * 0.1).desc()).limit(10).all()  # noqa: E712
    categories = {}
    for b in db.query(Book).filter(Book.is_deleted == False).all():  # noqa: E712
        categories[b.category or "未分类"] = categories.get(b.category or "未分类", 0) + 1
    return {
        "cards": {"books": books, "users": users, "comments": comments, "purchase_clicks": purchases},
        "hot_books": [book_card(b) for b in hot],
        "category_distribution": categories,
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
