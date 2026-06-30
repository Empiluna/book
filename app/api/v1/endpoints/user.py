from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import ReadingHistory, SearchLog, User
from app.schemas import (
    BookmarkRequest,
    LoginRequest,
    PasswordChangeRequest,
    ProfileUpdateRequest,
    ProgressRequest,
    RatingRequest,
    RegisterRequest,
)
from app.services.serializers import book_card, user_card
from app.services.user_service import (
    add_bookmark,
    authenticate_user,
    build_user_profile,
    change_password,
    rate_book,
    reading_stats,
    record_reading_history,
    register_user,
    update_profile,
    update_reading_progress,
)

router = APIRouter(prefix="/user", tags=["模块一 · 用户画像"])


@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    return {"message": "注册成功", "user": register_user(db, data.username, data.email, data.password, data.nickname)}


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    account = data.account or data.username_or_email
    return authenticate_user(db, account or "", data.password)


@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return user_card(user)


@router.put("/me")
def update_me(data: ProfileUpdateRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return {"message": "个人资料已更新", "user": update_profile(db, user, data.nickname, data.avatar_url)}


@router.put("/password")
def update_password(data: PasswordChangeRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    change_password(db, user, data.old_password, data.new_password)
    return {"message": "密码已修改"}


@router.get("/profile")
def profile(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return build_user_profile(db, user)


@router.post("/profile/rebuild")
def rebuild_profile(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return {"message": "画像已根据最新行为实时重建", "profile": build_user_profile(db, user)}


@router.post("/history/{book_id}")
def history(book_id: int, status: str = Query("read"), source: str | None = None, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return record_reading_history(db, user, book_id, status, source)


@router.get("/history")
def my_history(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.query(ReadingHistory).filter_by(user_id=user.id).order_by(ReadingHistory.read_at.desc()).limit(80).all()
    items = []
    seen = set()
    for h in rows:
        if h.book_id in seen or not h.book:
            continue
        seen.add(h.book_id)
        items.append({
            "id": h.id,
            "status": h.status,
            "source": h.source,
            "read_at": h.read_at.isoformat(),
            "book": book_card(h.book),
        })
    events = [{"id": h.id, "book_id": h.book_id, "status": h.status, "source": h.source, "read_at": h.read_at.isoformat()} for h in rows[:30]]
    return {"items": items, "events": events, "total": len(items)}


@router.post("/rating/{book_id}")
def rating(book_id: int, data: RatingRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return rate_book(db, user, book_id, data.rating)


@router.post("/progress/{book_id}")
def progress(book_id: int, data: ProgressRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return update_reading_progress(db, user, book_id, data.current_page, data.progress_percent, data.reading_minutes, data.last_device)


@router.get("/progress")
def progress_list(user: User = Depends(get_current_user)):
    return {"items": [{"book": book_card(p.book), "current_page": p.current_page, "progress_percent": p.progress_percent, "reading_minutes": p.reading_minutes, "updated_at": p.updated_at.isoformat()} for p in user.progresses]}


@router.post("/bookmark/{book_id}")
def bookmark(book_id: int, data: BookmarkRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return add_bookmark(db, user, book_id, data.shelf_name, data.reading_status)


@router.get("/bookmarks")
def bookmarks(user: User = Depends(get_current_user)):
    return {"items": [{"id": b.id, "shelf_name": b.shelf_name, "reading_status": b.reading_status, "created_at": b.created_at.isoformat(), "book": book_card(b.book)} for b in user.bookmarks]}


@router.get("/comments")
def my_comments(user: User = Depends(get_current_user)):
    return {"items": [{"id": c.id, "book": book_card(c.book), "content": c.content, "rating": c.rating, "likes_count": c.likes_count, "created_at": c.created_at.isoformat()} for c in user.comments if not c.is_deleted]}


@router.get("/search-history")
def search_history(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.query(SearchLog).filter_by(user_id=user.id).order_by(SearchLog.created_at.desc()).limit(30).all()
    return {"items": [{"keyword": x.keyword, "result_count": x.result_count, "created_at": x.created_at.isoformat()} for x in rows]}


@router.get("/stats")
def stats(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return reading_stats(db, user)
