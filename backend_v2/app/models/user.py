"""
模块一 · 用户画像相关数据模型。

覆盖功能：
1. 用户注册/登录基础数据；
2. 阅读历史、搜索日志、书架收藏、阅读进度、用户评分；
3. 为推荐模块和智能助手提供用户画像数据来源。
"""

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class User(Base):
    """用户表。"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(64), unique=True, nullable=False, index=True)
    email = Column(String(128), unique=True, nullable=False, index=True)
    hashed_password = Column(String(256), nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    reading_history = relationship("ReadingHistory", back_populates="user")
    bookmarks = relationship("Bookmark", back_populates="user")
    reading_progress = relationship("ReadingProgress", back_populates="user")
    ratings = relationship("UserRating", back_populates="user")
    comments = relationship("BookComment", back_populates="user")
    chat_history = relationship("ChatHistory", back_populates="user")


class ReadingHistory(Base):
    """阅读历史/阅读状态记录。"""

    __tablename__ = "reading_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    status = Column(String(20), nullable=False, default="read")
    read_at = Column(DateTime, server_default=func.now(), index=True)

    user = relationship("User", back_populates="reading_history")
    book = relationship("Book")

    __table_args__ = (Index("idx_history_user_time", "user_id", "read_at"),)


class SearchLog(Base):
    """搜索关键词日志。未登录搜索时 user_id 可为空。"""

    __tablename__ = "search_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    keyword = Column(String(256), nullable=False)
    created_at = Column(DateTime, server_default=func.now(), index=True)

    __table_args__ = (Index("idx_search_user_time", "user_id", "created_at"),)


class Bookmark(Base):
    """书架收藏记录。shelf_name 表示用户自定义书架名称。"""

    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    shelf_name = Column(String(64), default="默认书架", index=True)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="bookmarks")
    book = relationship("Book")

    __table_args__ = (
        Index("idx_bookmark_user_shelf", "user_id", "shelf_name"),
        Index("idx_bookmark_user_book", "user_id", "book_id"),
    )


class ReadingProgress(Base):
    """多端阅读进度同步记录。"""

    __tablename__ = "reading_progress"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    progress_percent = Column(Float, default=0.0)
    current_page = Column(Integer, default=0)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="reading_progress")
    book = relationship("Book")

    __table_args__ = (Index("idx_progress_user_book", "user_id", "book_id", unique=True),)


class UserRating(Base):
    """用户评分。一个用户对一本书只保留一条最新评分。"""

    __tablename__ = "user_ratings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    rating = Column(Float, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="ratings")
    book = relationship("Book")

    __table_args__ = (Index("idx_rating_user_book", "user_id", "book_id", unique=True),)


class UserBehaviorEvent(Base):
    """统一用户行为事件表。

    用于采集曝光、点击、搜索、试读、收藏、评分、评论、购书跳转、负反馈等事件，
    为用户画像、猜你喜欢、智能助手上下文提供更细粒度的数据基础。
    """

    __tablename__ = "user_behavior_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=True, index=True)
    event_type = Column(String(32), nullable=False, index=True)
    keyword = Column(String(256), nullable=True, index=True)
    source = Column(String(64), nullable=True)
    weight = Column(Float, default=1.0)
    session_id = Column(String(128), nullable=True, index=True)
    metadata_json = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)

    user = relationship("User")
    book = relationship("Book")

    __table_args__ = (
        Index("idx_behavior_user_type_time", "user_id", "event_type", "created_at"),
        Index("idx_behavior_book_type_time", "book_id", "event_type", "created_at"),
    )


class ReadingSession(Base):
    """阅读会话表，用于记录阅读时长、页码变化和设备来源。"""

    __tablename__ = "reading_sessions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    duration_seconds = Column(Integer, default=0)
    start_page = Column(Integer, default=0)
    end_page = Column(Integer, default=0)
    progress_delta = Column(Float, default=0.0)
    device = Column(String(64), nullable=True)
    note = Column(String(256), nullable=True)
    started_at = Column(DateTime, server_default=func.now(), index=True)
    ended_at = Column(DateTime, nullable=True)

    user = relationship("User")
    book = relationship("Book")

    __table_args__ = (Index("idx_session_user_time", "user_id", "started_at"),)


class UserPreferenceOverride(Base):
    """用户手动偏好/屏蔽偏好配置。

    该表与自动画像分离，避免覆盖由行为计算出的画像。
    """

    __tablename__ = "user_preference_overrides"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True, index=True)
    preferred_tags_json = Column(Text, nullable=True)
    blocked_tags_json = Column(Text, nullable=True)
    preferred_authors_json = Column(Text, nullable=True)
    blocked_authors_json = Column(Text, nullable=True)
    difficulty_level = Column(String(32), nullable=True)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User")


class UserBookFeedback(Base):
    """用户对推荐结果的显式反馈。"""

    __tablename__ = "user_book_feedback"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    feedback_type = Column(String(32), nullable=False, index=True)  # like/dislike/not_interested/block_author/block_tag
    reason = Column(String(256), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)

    user = relationship("User")
    book = relationship("Book")

    __table_args__ = (Index("idx_feedback_user_book", "user_id", "book_id"),)


class UserProfileSnapshot(Base):
    """用户画像快照缓存。

    保存复杂画像计算结果，便于前端仪表盘和智能助手快速读取。
    """

    __tablename__ = "user_profile_snapshots"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    model_version = Column(String(32), default="profile-v2")
    profile_json = Column(Text, nullable=False)
    maturity_score = Column(Float, default=0.0)
    is_current = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)

    user = relationship("User")

    __table_args__ = (Index("idx_profile_snapshot_user_current", "user_id", "is_current"),)
