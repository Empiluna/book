"""
═══════════════════════════════════════════════════════
【模块一 · 用户画像】API 端点
  负责人: A
  /api/v1/user/...
═══════════════════════════════════════════════════════
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.user import (
    UserRegister, UserLogin, TokenResponse,
    UserProfile, UserProfileUpdate,
    ReadingHistoryCreate, ReadingHistoryResponse,
    BookmarkCreate, BookmarkResponse,
    ReadingProgressUpdate, ReadingProgressResponse,
    RatingCreate,
)
from app.services import user_service

router = APIRouter()


# ═══════════════════════════════════════════════════════
# 认证 - 无需登录
# ═══════════════════════════════════════════════════════

@router.post("/register", response_model=TokenResponse, summary="用户注册")
def register(req: UserRegister, db: Session = Depends(get_db)):
    """注册新用户，返回 JWT token"""
    existing = db.query(User).filter(
        (User.username == req.username) | (User.email == req.email)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="用户名或邮箱已被注册")
    user = user_service.register_user(db, req.username, req.email, req.password)
    token = user_service.authenticate_user(db, req.username, req.password)
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        username=user.username,
    )


@router.post("/login", response_model=TokenResponse, summary="用户登录")
def login(req: UserLogin, db: Session = Depends(get_db)):
    """用户名+密码登录，返回 JWT token"""
    token = user_service.authenticate_user(db, req.username, req.password)
    if not token:
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    user = db.query(User).filter(User.username == req.username).first()
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        username=user.username,
    )


# ═══════════════════════════════════════════════════════
# 用户画像 - 需要登录
# ═══════════════════════════════════════════════════════

@router.get("/profile", response_model=UserProfile, summary="获取用户画像")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    【接口契约】获取用户画像数据
    模块三通过此接口获取偏好向量用于推荐
    """
    profile_data = user_service.build_user_profile(db, current_user.id)
    return UserProfile(
        user_id=current_user.id,
        username=current_user.username,
        tag_preferences=profile_data.get("tag_weights", {}),
        favorite_authors=[],  # TODO: resolve author IDs to names
        favorite_categories=[],
        books_read=user_service.get_reading_stats(db, current_user.id)["books_completed"],
    )


@router.put("/profile", summary="更新用户画像")
def update_profile(
    req: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """手动更新偏好（系统通常自动计算）"""
    # TODO: 实现画像更新
    return {"status": "ok"}


# ═══════════════════════════════════════════════════════
# 阅读行为 (3.1.1)
# ═══════════════════════════════════════════════════════

@router.post("/history", summary="记录阅读历史")
def add_history(
    req: ReadingHistoryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """记录一条阅读历史"""
    user_service.record_reading_history(db, current_user.id, req.book_id, req.status)
    return {"status": "ok"}


@router.get("/history", response_model=list[ReadingHistoryResponse], summary="获取阅读历史")
def get_history(
    limit: int = Query(50, ge=1, le=200),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取当前用户的阅读历史"""
    return user_service.get_reading_history(db, current_user.id, limit)


@router.post("/bookmark", summary="添加收藏")
def add_bookmark(
    req: BookmarkCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """将图书添加到书架"""
    user_service.add_bookmark(db, current_user.id, req.book_id, req.shelf_name)
    return {"status": "ok"}


@router.delete("/bookmark/{book_id}", summary="取消收藏")
def remove_bookmark(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """从书架移除图书"""
    user_service.remove_bookmark(db, current_user.id, book_id)
    return {"status": "ok"}


@router.get("/bookmarks", response_model=list[BookmarkResponse], summary="获取收藏列表")
def get_bookmarks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户全部收藏"""
    # TODO: 实现
    return []


@router.post("/rating", summary="图书评分")
def rate_book(
    req: RatingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """对图书评分 (0.5~5.0)"""
    user_service.rate_book(db, current_user.id, req.book_id, req.rating)
    return {"status": "ok"}


# ═══════════════════════════════════════════════════════
# 阅读进度 (3.1.3)
# ═══════════════════════════════════════════════════════

@router.post("/progress", summary="更新阅读进度")
def update_progress(
    req: ReadingProgressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """保存/更新阅读进度"""
    user_service.update_reading_progress(
        db, current_user.id, req.book_id,
        req.progress_percent, req.current_page,
    )
    return {"status": "ok"}


@router.get("/progress", response_model=list[ReadingProgressResponse], summary="获取全部阅读进度")
def get_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户所有在读书籍的进度"""
    return user_service.get_reading_progress(db, current_user.id)


@router.get("/stats", summary="阅读统计")
def get_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取阅读统计数据"""
    return user_service.get_reading_stats(db, current_user.id)
