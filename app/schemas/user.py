"""
【模块一 · 用户画像】Pydantic 请求/响应模型
  负责成员: A
"""
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


# ── 用户认证 ──
class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=64, example="reader123")
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)

class UserLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    username: str

# ── 用户画像 ──
class UserProfile(BaseModel):
    """用户画像 - 模块三推荐引擎通过此接口获取用户偏好"""
    user_id: int
    username: str
    # 核心偏好向量 → 模块三消费
    tag_preferences: dict[str, float] = {}     # {"科幻": 0.8, "历史": 0.3}
    favorite_authors: list[str] = []           # ["刘慈欣", "金庸"]
    favorite_categories: list[str] = []        # ["科幻", "武侠"]
    avg_rating: float = 0.0
    books_read: int = 0

class UserProfileUpdate(BaseModel):
    """更新用户画像（通常由系统自动计算，手动修改为辅）"""
    favorite_authors: Optional[list[str]] = None
    favorite_categories: Optional[list[str]] = None

# ── 阅读行为 ──
class ReadingHistoryCreate(BaseModel):
    book_id: int
    status: str = Field(default="read", pattern="^(read|reading|want_to_read)$")

class ReadingHistoryResponse(BaseModel):
    id: int
    book_id: int
    book_title: Optional[str] = None
    status: str
    read_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

class SearchLogCreate(BaseModel):
    keyword: str = Field(..., min_length=1, max_length=256)

# ── 收藏 ──
class BookmarkCreate(BaseModel):
    book_id: int
    shelf_name: str = "默认书架"

class BookmarkResponse(BaseModel):
    id: int
    book_id: int
    book_title: Optional[str] = None
    shelf_name: str
    created_at: datetime

    model_config = {"from_attributes": True}

# ── 阅读进度 ──
class ReadingProgressUpdate(BaseModel):
    book_id: int
    progress_percent: float = Field(ge=0.0, le=100.0)
    current_page: int = 0

class ReadingProgressResponse(BaseModel):
    book_id: int
    book_title: Optional[str] = None
    progress_percent: float
    current_page: int
    updated_at: datetime

    model_config = {"from_attributes": True}

# ── 评分 ──
class RatingCreate(BaseModel):
    book_id: int
    rating: float = Field(ge=0.5, le=5.0)
