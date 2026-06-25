"""阅读生态模块模型：评论、点赞、购书点击、试读记录。"""

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Index, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class BookComment(Base):
    __tablename__ = "book_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id", ondelete="CASCADE"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    rating = Column(Float, nullable=True)
    likes_count = Column(Integer, default=0)
    is_pinned = Column(Boolean, default=False, index=True)
    is_deleted = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="comments")
    book = relationship("Book")


class CommentLike(Base):
    __tablename__ = "comment_likes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    comment_id = Column(Integer, ForeignKey("book_comments.id", ondelete="CASCADE"), nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())

    comment = relationship("BookComment")

    __table_args__ = (Index("idx_like_user_comment", "user_id", "comment_id", unique=True),)


class PurchaseClick(Base):
    __tablename__ = "purchase_clicks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    channel = Column(String(32), nullable=False)
    clicked_at = Column(DateTime, server_default=func.now(), index=True)


class TrialReadLog(Base):
    __tablename__ = "trial_read_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    allowed_pages = Column(Integer, nullable=False)
    started_at = Column(DateTime, server_default=func.now(), index=True)
