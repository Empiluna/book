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
class TrialReadRequest(BaseModel):
    book_id: int

class TrialReadResponse(BaseModel):
    book_id: int
    book_title: str
    total_pages: int
    allowed_pages: int          # 3页（未登录）或 10页（已登录）
    content_url: str            # 试读内容 URL
    current_progress: float     # 现有进度百分比

# ── 购书链接 ──
class PurchaseLinkUpdate(BaseModel):
    """管理员配置购书链接"""
    book_id: int
    url_jd: Optional[str] = None      # 京东
    url_dd: Optional[str] = None      # 当当
    url_tb: Optional[str] = None      # 淘宝

class PurchaseLinkResponse(BaseModel):
    book_id: int
    book_title: str
    prices: list[dict]   # [{"platform": "京东", "url": "...", "price": 39.9}]

# ── 书架管理 ──
class ShelfCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=64)
    description: Optional[str] = None

class ShelfResponse(BaseModel):
    id: int
    name: str
    book_count: int = 0
    created_at: datetime

    model_config = {"from_attributes": True}

# ── 阅读统计 ──
class ReadingStats(BaseModel):
    user_id: int
    total_reading_time_minutes: int = 0
    books_completed: int = 0
    books_reading: int = 0
    weekly_reading_minutes: list[int] = []  # 7天数组
    top_tags: list[str] = []
