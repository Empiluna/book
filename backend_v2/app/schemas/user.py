"""模块一 · 用户画像 Pydantic 请求/响应模型。"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=64, examples=["reader123"])
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)


class UserLogin(BaseModel):
    """username 可以传用户名，也可以传邮箱。"""

    username: str = Field(..., min_length=1, max_length=128)
    password: str = Field(..., min_length=1, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    username: str
    is_admin: bool = False


class UserMeResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    is_admin: bool
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class PasswordChangeRequest(BaseModel):
    old_password: str = Field(..., min_length=1, max_length=128)
    new_password: str = Field(..., min_length=6, max_length=128)


class UserProfile(BaseModel):
    """用户画像响应。推荐模块可直接消费。"""

    user_id: int
    username: str
    tag_preferences: dict[str, float] = Field(default_factory=dict)
    category_preferences: dict[str, float] = Field(default_factory=dict)
    favorite_authors: list[str] = Field(default_factory=list)
    favorite_author_ids: list[int] = Field(default_factory=list)
    favorite_tags: list[str] = Field(default_factory=list)
    favorite_tag_ids: list[int] = Field(default_factory=list)
    high_rated_book_ids: list[int] = Field(default_factory=list)
    avg_rating: float = 0.0
    books_read: int = 0
    books_reading: int = 0
    books_want_to_read: int = 0


class UserProfileUpdate(BaseModel):
    """保留给手动偏好配置；当前画像主要由系统行为自动计算。"""

    favorite_authors: Optional[list[str]] = None
    favorite_categories: Optional[list[str]] = None


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


class SearchLogResponse(BaseModel):
    id: int
    keyword: str
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class BookmarkCreate(BaseModel):
    book_id: int
    shelf_name: str = Field(default="默认书架", min_length=1, max_length=64)


class BookmarkMoveRequest(BaseModel):
    shelf_name: str = Field(..., min_length=1, max_length=64)


class BookmarkResponse(BaseModel):
    id: int
    book_id: int
    book_title: Optional[str] = None
    shelf_name: str
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ShelfResponse(BaseModel):
    shelf_name: str
    book_count: int


class ReadingProgressUpdate(BaseModel):
    book_id: int
    progress_percent: float = Field(ge=0.0, le=100.0)
    current_page: int = Field(default=0, ge=0)


class ReadingProgressResponse(BaseModel):
    book_id: int
    book_title: Optional[str] = None
    progress_percent: float
    current_page: int
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class RatingCreate(BaseModel):
    book_id: int
    rating: float = Field(ge=0.5, le=5.0)


class RatingResponse(BaseModel):
    id: int
    book_id: int
    book_title: Optional[str] = None
    rating: float
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


# =====================================================================
# 高级用户画像 / 行为分析 / 阅读驾驶舱
# =====================================================================

class BehaviorEventCreate(BaseModel):
    book_id: Optional[int] = None
    event_type: str = Field(..., min_length=2, max_length=32, examples=["book_click"])
    keyword: Optional[str] = Field(None, max_length=256)
    source: Optional[str] = Field(None, max_length=64, examples=["home_recommend"])
    weight: float = Field(default=1.0, ge=-10.0, le=10.0)
    session_id: Optional[str] = Field(None, max_length=128)
    metadata: dict = Field(default_factory=dict)


class BehaviorEventResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    book_id: Optional[int] = None
    event_type: str
    keyword: Optional[str] = None
    source: Optional[str] = None
    weight: float
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ReadingSessionCreate(BaseModel):
    book_id: int
    duration_seconds: int = Field(default=0, ge=0, le=86400)
    start_page: int = Field(default=0, ge=0)
    end_page: int = Field(default=0, ge=0)
    progress_delta: float = Field(default=0.0, ge=0.0, le=100.0)
    device: Optional[str] = Field(None, max_length=64)
    note: Optional[str] = Field(None, max_length=256)


class ReadingSessionResponse(BaseModel):
    id: int
    book_id: int
    book_title: Optional[str] = None
    duration_seconds: int
    start_page: int
    end_page: int
    progress_delta: float
    device: Optional[str] = None
    started_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class UserPreferenceUpdate(BaseModel):
    preferred_tags: list[str] = Field(default_factory=list)
    blocked_tags: list[str] = Field(default_factory=list)
    preferred_authors: list[str] = Field(default_factory=list)
    blocked_authors: list[str] = Field(default_factory=list)
    difficulty_level: Optional[str] = Field(None, max_length=32, examples=["入门"])


class UserPreferenceResponse(BaseModel):
    user_id: int
    preferred_tags: list[str] = Field(default_factory=list)
    blocked_tags: list[str] = Field(default_factory=list)
    preferred_authors: list[str] = Field(default_factory=list)
    blocked_authors: list[str] = Field(default_factory=list)
    difficulty_level: Optional[str] = None
    updated_at: Optional[datetime] = None


class BookFeedbackCreate(BaseModel):
    book_id: int
    feedback_type: str = Field(..., pattern="^(like|dislike|not_interested|block_author|block_tag)$")
    reason: Optional[str] = Field(None, max_length=256)


class BookFeedbackResponse(BaseModel):
    id: int
    book_id: int
    feedback_type: str
    reason: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ProfileInsight(BaseModel):
    title: str
    description: str
    level: str = "info"


class ProfileAdvancedResponse(BaseModel):
    user_id: int
    username: str
    profile_version: str = "profile-v2"
    maturity_score: float
    cold_start: bool
    tag_preferences: dict[str, float] = Field(default_factory=dict)
    category_preferences: dict[str, float] = Field(default_factory=dict)
    short_term_tags: dict[str, float] = Field(default_factory=dict)
    long_term_tags: dict[str, float] = Field(default_factory=dict)
    favorite_authors: list[str] = Field(default_factory=list)
    high_rated_book_ids: list[int] = Field(default_factory=list)
    blocked_book_ids: list[int] = Field(default_factory=list)
    radar: dict[str, float] = Field(default_factory=dict)
    reading_heatmap: list[dict] = Field(default_factory=list)
    recent_events: list[dict] = Field(default_factory=list)
    insights: list[ProfileInsight] = Field(default_factory=list)
    updated_at: datetime


class DashboardResponse(BaseModel):
    user: dict
    metrics: dict
    profile: ProfileAdvancedResponse
    shelves: list[ShelfResponse]
    recent_history: list[ReadingHistoryResponse]
    progress: list[ReadingProgressResponse]
    timeline: list[dict]
    suggestions: list[str] = Field(default_factory=list)


class ProfileRebuildResponse(BaseModel):
    status: str = "ok"
    user_id: int
    snapshot_id: int
    maturity_score: float
    message: str
