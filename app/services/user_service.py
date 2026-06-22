"""
═══════════════════════════════════════════════════════
【模块一 · 用户画像】服务层
  负责人: A
  职责:
    1. 用户注册/登录/认证
    2. 阅读行为采集 (历史记录、搜索、收藏、评分)
    3. 用户兴趣建模 (标签偏好向量、作者/类别偏好)
    4. 阅读进度同步 (多端同步、自动保存)
═══════════════════════════════════════════════════════
"""
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import Optional

from app.models.user import (
    User, ReadingHistory, SearchLog, Bookmark, ReadingProgress, UserRating,
)
from app.models.book import Book, Author, Tag
from app.core.security import hash_password, verify_password, create_access_token


# ═══════════════════════════════════════════════════════
# 用户认证
# ═══════════════════════════════════════════════════════

def register_user(db: Session, username: str, email: str, password: str) -> User:
    """注册新用户"""
    user = User(
        username=username,
        email=email,
        hashed_password=hash_password(password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, username: str, password: str) -> Optional[str]:
    """验证用户，返回 JWT token"""
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return create_access_token({"sub": str(user.id), "username": user.username})


# ═══════════════════════════════════════════════════════
# 阅读行为采集 (3.1.1)
# ═══════════════════════════════════════════════════════

def record_reading_history(db: Session, user_id: int, book_id: int, status: str = "read"):
    """记录阅读历史"""
    entry = ReadingHistory(user_id=user_id, book_id=book_id, status=status)
    db.add(entry)
    db.commit()
    return entry


def get_reading_history(db: Session, user_id: int, limit: int = 50):
    """获取用户阅读历史"""
    return (
        db.query(ReadingHistory)
        .filter(ReadingHistory.user_id == user_id)
        .order_by(desc(ReadingHistory.read_at))
        .limit(limit)
        .all()
    )


def record_search(db: Session, user_id: int, keyword: str):
    """记录搜索关键词"""
    log = SearchLog(user_id=user_id, keyword=keyword)
    db.add(log)
    db.commit()
    return log


def add_bookmark(db: Session, user_id: int, book_id: int, shelf_name: str = "默认书架"):
    """添加收藏"""
    bookmark = Bookmark(user_id=user_id, book_id=book_id, shelf_name=shelf_name)
    db.add(bookmark)
    db.commit()
    return bookmark


def remove_bookmark(db: Session, user_id: int, book_id: int):
    """取消收藏"""
    db.query(Bookmark).filter(
        Bookmark.user_id == user_id,
        Bookmark.book_id == book_id,
    ).delete()
    db.commit()


def rate_book(db: Session, user_id: int, book_id: int, rating: float):
    """评分/更新评分"""
    existing = db.query(UserRating).filter(
        UserRating.user_id == user_id,
        UserRating.book_id == book_id,
    ).first()
    if existing:
        existing.rating = rating
    else:
        existing = UserRating(user_id=user_id, book_id=book_id, rating=rating)
        db.add(existing)
    db.commit()
    # 更新图书均分
    _update_book_avg_rating(db, book_id)
    return existing


def _update_book_avg_rating(db: Session, book_id: int):
    """内部: 更新图书平均评分"""
    result = db.query(func.avg(UserRating.rating)).filter(
        UserRating.book_id == book_id
    ).scalar()
    book = db.query(Book).get(book_id)
    if book:
        book.avg_rating = round(result or 0.0, 1)
        book.rating_count = db.query(UserRating).filter(
            UserRating.book_id == book_id
        ).count()
        db.commit()


# ═══════════════════════════════════════════════════════
# 用户兴趣建模 (3.1.2)
# ═══════════════════════════════════════════════════════

def build_user_profile(db: Session, user_id: int) -> dict:
    """
    构建用户画像 — 【接口契约】给模块三消费
    返回格式与 UserProfileForRecommend 一致
    """
    # 1. 标签偏好向量（从阅读历史和收藏中统计）
    tag_weights = _compute_tag_preferences(db, user_id)
    # 2. 偏好作者
    favorite_author_ids = _compute_favorite_authors(db, user_id, top_n=20)
    # 3. 偏好标签
    favorite_tag_ids = _compute_favorite_tags(db, user_id, top_n=30)
    # 4. 高分图书
    high_rated = _get_high_rated_books(db, user_id, min_rating=4.0)

    return {
        "user_id": user_id,
        "tag_weights": tag_weights,
        "favorite_author_ids": favorite_author_ids,
        "favorite_tag_ids": favorite_tag_ids,
        "high_rated_book_ids": high_rated,
    }


def _compute_tag_preferences(db: Session, user_id: int) -> dict[str, float]:
    """计算用户标签偏好权重"""
    # 从阅读历史统计标签频率
    history_books = (
        db.query(ReadingHistory.book_id)
        .filter(ReadingHistory.user_id == user_id)
        .all()
    )
    tag_counter: dict[str, float] = {}
    total = 0
    for (book_id,) in history_books:
        book = db.query(Book).get(book_id)
        if book:
            for tag in book.tags:
                tag_counter[tag.name] = tag_counter.get(tag.name, 0) + 1
                total += 1
    # 归一化
    if total > 0:
        for k in tag_counter:
            tag_counter[k] = round(tag_counter[k] / total, 3)
    return tag_counter


def _compute_favorite_authors(db: Session, user_id: int, top_n: int = 20) -> list[int]:
    """统计高频作者"""
    results = (
        db.query(Book.author_id, func.count(ReadingHistory.id).label("cnt"))
        .join(ReadingHistory, ReadingHistory.book_id == Book.id)
        .filter(ReadingHistory.user_id == user_id)
        .group_by(Book.author_id)
        .order_by(desc("cnt"))
        .limit(top_n)
        .all()
    )
    return [r[0] for r in results if r[0] is not None]


def _compute_favorite_tags(db: Session, user_id: int, top_n: int = 30) -> list[int]:
    """统计高频标签"""
    # 实现略 - 与标签偏好逻辑类似
    return []


def _get_high_rated_books(db: Session, user_id: int, min_rating: float) -> list[int]:
    """获取用户高分图书列表"""
    results = (
        db.query(UserRating.book_id)
        .filter(
            UserRating.user_id == user_id,
            UserRating.rating >= min_rating,
        )
        .all()
    )
    return [r[0] for r in results]


# ═══════════════════════════════════════════════════════
# 阅读进度同步 (3.1.3)
# ═══════════════════════════════════════════════════════

def update_reading_progress(
    db: Session, user_id: int, book_id: int,
    progress_percent: float, current_page: int = 0,
):
    """更新/创建阅读进度"""
    progress = db.query(ReadingProgress).filter(
        ReadingProgress.user_id == user_id,
        ReadingProgress.book_id == book_id,
    ).first()
    if progress:
        progress.progress_percent = progress_percent
        progress.current_page = current_page
    else:
        progress = ReadingProgress(
            user_id=user_id, book_id=book_id,
            progress_percent=progress_percent, current_page=current_page,
        )
        db.add(progress)
    db.commit()
    return progress


def get_reading_progress(db: Session, user_id: int):
    """获取用户全部阅读进度"""
    return db.query(ReadingProgress).filter(
        ReadingProgress.user_id == user_id
    ).all()


def get_reading_stats(db: Session, user_id: int) -> dict:
    """获取阅读统计数据"""
    total_read = db.query(ReadingHistory).filter(
        ReadingHistory.user_id == user_id,
        ReadingHistory.status == "read",
    ).count()
    currently_reading = db.query(ReadingHistory).filter(
        ReadingHistory.user_id == user_id,
        ReadingHistory.status == "reading",
    ).count()
    return {
        "user_id": user_id,
        "books_completed": total_read,
        "books_reading": currently_reading,
    }
