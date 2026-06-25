"""阅读生态模块请求/响应模型。"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class CommentCreate(BaseModel):
    book_id: int
    content: str = Field(..., min_length=1, max_length=2000)
    rating: Optional[float] = Field(default=None, ge=0.5, le=5.0)


class CommentResponse(BaseModel):
    id: int
    user_id: int
    username: Optional[str] = None
    book_id: int
    book_title: Optional[str] = None
    content: str
    rating: Optional[float] = None
    likes_count: int = 0
    is_pinned: bool = False
    created_at: Optional[datetime] = None


class LikeResponse(BaseModel):
    comment_id: int
    liked: bool
    likes_count: int


class TrialResponse(BaseModel):
    book_id: int
    book_title: str
    allowed_pages: int
    message: str


class PurchaseLink(BaseModel):
    channel: str
    url: str
    price: Optional[float] = None


class PurchaseLinksResponse(BaseModel):
    book_id: int
    links: list[PurchaseLink]


class PurchaseClickRequest(BaseModel):
    channel: str = Field(..., pattern="^(jd|dd|tb|other)$")
