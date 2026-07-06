from __future__ import annotations

from pydantic import BaseModel, Field, EmailStr, field_validator


class LoginRequest(BaseModel):
    account: str | None = None
    username_or_email: str | None = None
    password: str
    # user = 普通用户登录；admin = 独立后台管理员登录。
    role: str | None = None

    @field_validator("username_or_email", mode="before")
    @classmethod
    def normalize_legacy(cls, v):
        return v


class RegisterRequest(BaseModel):
    username: str = Field(min_length=2, max_length=64)
    email: EmailStr
    password: str = Field(min_length=6, max_length=64)
    nickname: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in_hours: int = 24
    user: dict


class ProfileUpdateRequest(BaseModel):
    nickname: str | None = Field(default=None, max_length=64)
    avatar_url: str | None = Field(default=None, max_length=512)


class PasswordChangeRequest(BaseModel):
    old_password: str
    new_password: str = Field(min_length=6, max_length=64)


class RatingRequest(BaseModel):
    rating: float = Field(ge=0.5, le=5.0)


class ProgressRequest(BaseModel):
    current_page: int = Field(ge=0)
    progress_percent: float = Field(ge=0, le=100)
    reading_minutes: int = Field(default=0, ge=0)
    last_device: str | None = None


class BookmarkRequest(BaseModel):
    shelf_name: str = Field(default="想读", min_length=1, max_length=64)
    reading_status: str = "want_to_read"


class ShelfCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=64)


class ShelfRenameRequest(BaseModel):
    new_name: str = Field(min_length=1, max_length=64)


class CommentCreate(BaseModel):
    content: str = Field(min_length=1, max_length=2000)
    rating: float | None = Field(default=None, ge=0.5, le=5.0)


class CommentUpdate(BaseModel):
    content: str | None = Field(default=None, min_length=1, max_length=2000)
    rating: float | None = Field(default=None, ge=0.5, le=5.0)


class PurchaseLinkCreate(BaseModel):
    book_id: int
    platform: str = Field(min_length=1, max_length=32)
    url: str = Field(min_length=8, max_length=512)
    price: float | None = Field(default=None, ge=0)
    is_active: bool = True


class PurchaseLinkUpdate(BaseModel):
    platform: str | None = Field(default=None, min_length=1, max_length=32)
    url: str | None = Field(default=None, min_length=8, max_length=512)
    price: float | None = Field(default=None, ge=0)
    is_active: bool | None = None


class LegacyPurchaseLinkUpdate(BaseModel):
    purchase_url_jd: str | None = None
    purchase_price_jd: float | None = None
    purchase_url_dd: str | None = None
    purchase_price_dd: float | None = None
    purchase_url_tb: str | None = None
    purchase_price_tb: float | None = None


class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=256)
    subtitle: str | None = None
    isbn: str | None = None
    authors: list[str] = []
    publisher: str | None = None
    series: str | None = None
    publication_year: int | None = None
    category: str | None = None
    tags: list[str] = []
    difficulty: str | None = "大众"
    description: str | None = None
    trial_text: str | None = None
    cover_url: str | None = None
    ebook_pdf_url: str | None = None
    ebook_epub_url: str | None = None
    page_count: int = 240
    is_new: bool = False


class BookUpdate(BaseModel):
    title: str | None = None
    subtitle: str | None = None
    isbn: str | None = None
    authors: list[str] | None = None
    publisher: str | None = None
    series: str | None = None
    publication_year: int | None = None
    category: str | None = None
    tags: list[str] | None = None
    difficulty: str | None = None
    description: str | None = None
    trial_text: str | None = None
    cover_url: str | None = None
    ebook_pdf_url: str | None = None
    ebook_epub_url: str | None = None
    page_count: int | None = None
    is_new: bool | None = None
    is_deleted: bool | None = None


class GraphEntityCreate(BaseModel):
    entity_type: str = Field(pattern="^(Book|Author|Tag|Publisher|Series|Field|Audience|Difficulty|Keyword|Topic)$")
    entity_id: int
    name: str | None = None
    properties: dict = {}


class GraphRelationCreate(BaseModel):
    source_type: str = Field(pattern="^(Book|Author|Tag|Publisher|Series|Field|Audience|Difficulty|Keyword|Topic)$")
    source_id: int
    relation_type: str = Field(min_length=2, max_length=64)
    target_type: str = Field(pattern="^(Book|Author|Tag|Publisher|Series|Field|Audience|Difficulty|Keyword|Topic)$")
    target_id: int
    weight: float = 1.0


class GraphPathRequest(BaseModel):
    book_id: int
    max_hops: int = Field(default=2, ge=1, le=3)
    top_k: int = Field(default=20, ge=1, le=100)
    path_weights: dict[str, float] | None = None


class RecommendWeightsUpdate(BaseModel):
    kg: float = Field(ge=0, le=1)
    cf: float = Field(ge=0, le=1)
    hot: float = Field(ge=0, le=1)
    new: float = Field(ge=0, le=1)


class FeedbackRequest(BaseModel):
    book_id: int
    event_type: str = Field(pattern="^(exposure|click|trial|bookmark|rating|purchase_click|not_interested|skip)$")
    source: str | None = None


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=20000)


class ManuscriptAssistRequest(BaseModel):
    title: str | None = Field(default=None, max_length=128)
    genre: str | None = Field(default=None, max_length=64)
    manuscript: str = Field(min_length=20, max_length=60000)


class NovelGenerateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=128)
    genre: str = Field(min_length=1, max_length=64)
    requirement: str = Field(min_length=1, max_length=2000)
    word_count: int = Field(default=1200, ge=300, le=12000)
    reference_text: str | None = Field(default=None, max_length=60000)


class ManuscriptSaveRequest(ManuscriptAssistRequest):
    summary: str | None = Field(default=None, max_length=1200)
    tags: list[str] = Field(default_factory=list)
    layout_suggestions: list[str] = Field(default_factory=list)
    save_to_shelf: bool = True


class AdminUserStatusRequest(BaseModel):
    is_active: bool


class AdminUserRoleRequest(BaseModel):
    is_admin: bool


class SystemConfigUpdate(BaseModel):
    key: str
    value: str
    description: str | None = None


class AdminBatchIdsRequest(BaseModel):
    ids: list[int] = Field(min_length=1)


class AdminBatchUserStatusRequest(BaseModel):
    ids: list[int] = Field(min_length=1)
    is_active: bool


class AdminBatchUserRoleRequest(BaseModel):
    ids: list[int] = Field(min_length=1)
    is_admin: bool


class AdminBatchCommentPinRequest(BaseModel):
    ids: list[int] = Field(min_length=1)
    is_pinned: bool
