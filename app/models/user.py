"""
──────────────────────────────────────────────────────
【模块一 · 用户画像】相关数据模型
  负责成员: A
  表: users, reading_history, search_logs, bookmarks,
      reading_progress, user_ratings
──────────────────────────────────────────────────────
"""
from sqlalchemy import (
    Column, Integer, String, Float, Text, DateTime,
    ForeignKey, Boolean, Index
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    """用户表"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(64), unique=True, nullable=False, index=True)
    email = Column(String(128), unique=True, nullable=False)
    hashed_password = Column(String(256), nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # ── 关联 ──
    reading_history = relationship("ReadingHistory", back_populates="user")
    bookmarks = relationship("Bookmark", back_populates="user")
    reading_progress = relationship("ReadingProgress", back_populates="user")
    ratings = relationship("UserRating", back_populates="user")
    comments = relationship("BookComment", back_populates="user")
    chat_history = relationship("ChatHistory", back_populates="user")


class ReadingHistory(Base):
    """【模块一】阅读行为 - 历史阅读记录"""
    __tablename__ = "reading_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    status = Column(String(20), nullable=False, default="read")  # read / reading / want_to_read
    read_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="reading_history")
    book = relationship("Book")


class SearchLog(Base):
    """【模块一】阅读行为 - 搜索记录"""
    __tablename__ = "search_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    keyword = Column(String(256), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    __table_args__ = (
        Index("idx_search_user_time", "user_id", "created_at"),
    )


class Bookmark(Base):
    """【模块一】收藏偏好 - 书架收藏"""
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    shelf_name = Column(String(64), default="默认书架")  # 自定义书架名称
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="bookmarks")
    book = relationship("Book")

    __table_args__ = (
        Index("idx_bookmark_user_shelf", "user_id", "shelf_name"),
    )


class ReadingProgress(Base):
    """【模块一/四】阅读进度同步"""
    __tablename__ = "reading_progress"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    progress_percent = Column(Float, default=0.0)   # 0.0 ~ 100.0
    current_page = Column(Integer, default=0)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="reading_progress")
    book = relationship("Book")

    __table_args__ = (
        Index("idx_progress_user_book", "user_id", "book_id", unique=True),
    )


class UserRating(Base):
    """【模块一】用户评分"""
    __tablename__ = "user_ratings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    rating = Column(Float, nullable=False)  # 0.5 ~ 5.0
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="ratings")
    book = relationship("Book")

    __table_args__ = (
        Index("idx_rating_user_book", "user_id", "book_id", unique=True),
    )
