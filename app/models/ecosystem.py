"""
──────────────────────────────────────────────────────
【模块四 · 阅读生态】相关数据模型
  负责成员: D
  表: book_comments, bookshelves (bookmarks已在user.py)
──────────────────────────────────────────────────────
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class BookComment(Base):
    """【模块四】书评"""
    __tablename__ = "book_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    likes_count = Column(Integer, default=0)
    is_pinned = Column(Boolean, default=False)  # 管理员置顶
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="comments")
    book = relationship("Book", back_populates="comments")
    likes = relationship("CommentLike", back_populates="comment")


class CommentLike(Base):
    """【模块四】评论点赞"""
    __tablename__ = "comment_likes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    comment_id = Column(Integer, ForeignKey("book_comments.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    comment = relationship("BookComment", back_populates="likes")
