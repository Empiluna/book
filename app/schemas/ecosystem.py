"""
【模块四 · 阅读生态】Pydantic 请求/响应模型
  负责成员: D
"""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


# ── 书评 ──
class CommentCreate(BaseModel):
    book_id: int
    content: str = Field(..., min_length=1, max_length=5000)


class CommentResponse(BaseModel):
    id: int
    user_id: int
    username: Optional[str] = None
    book_id: int
    content: str
    likes_count: int = 0
    is_pinned: bool = False
    created_at: datetime

    model_config = {"from_attributes": True}


class CommentLikeAction(BaseModel):
    comment_id: int


# ── 试读 ──
class TrialReadResponse(BaseModel):
    book_id: int
    book_title: str
    total_pages: int
    allowed_pages: int
    content_url: str
    current_progress: float = 0.0


class TrialContentResponse(BaseModel):
    book_id: int
    book_title: str
    authors: list[str] = []
    tags: list[str] = []
    content: str
    total_pages: int
    publisher: Optional[str] = None


# ── 购书链接 ──
class PurchaseLinkUpdate(BaseModel):
    book_id: int
    url_jd: Optional[str] = None
    url_dd: Optional[str] = None
    url_tb: Optional[str] = None


class PurchaseLinkResponse(BaseModel):
    book_id: int
    book_title: str
    prices: list[dict] = []


# ── 书架管理 ──
class ShelfResponse(BaseModel):
    name: str
    book_count: int = 0


class ShelfBookResponse(BaseModel):
    bookmark_id: int
    book_id: int
    book_title: str
    authors: list[str] = []
    tags: list[str] = []
    avg_rating: float = 0.0
    cover_url: str = ""
    shelf_name: str
    added_at: Optional[datetime] = None


class MoveBookRequest(BaseModel):
    book_id: int
    new_shelf: str = Field(..., min_length=1, max_length=64)


class RemoveBookRequest(BaseModel):
    book_id: int
    shelf_name: Optional[str] = None


# ── 阅读统计 ──
class ReadingStats(BaseModel):
    user_id: int
    total_books_read: int = 0
    books_completed: int = 0
    books_reading: int = 0
    books_want_to_read: int = 0
    rating_count: int = 0
    avg_rating_given: float = 0.0
    shelf_count: int = 0
    comment_count: int = 0
    in_progress_count: int = 0
    weekly_reading_minutes: list[int] = []
    top_tags: list[str] = []
