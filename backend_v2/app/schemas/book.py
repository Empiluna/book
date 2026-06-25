"""图书与图谱查询相关 Pydantic 模型。"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class BookSimple(BaseModel):
    id: int
    title: str
    authors: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    cover_url: Optional[str] = None
    avg_rating: float = 0.0
    hot_score: float = 0.0


class BookDetail(BookSimple):
    subtitle: Optional[str] = None
    isbn: Optional[str] = None
    publisher: Optional[str] = None
    series: Optional[str] = None
    publication_year: Optional[int] = None
    description: Optional[str] = None
    page_count: Optional[int] = None
    rating_count: int = 0
    is_new: bool = False
    purchase_url_jd: Optional[str] = None
    purchase_url_dd: Optional[str] = None
    purchase_url_tb: Optional[str] = None
    created_at: Optional[datetime] = None


class BookCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=256)
    subtitle: Optional[str] = None
    isbn: Optional[str] = None
    authors: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    publisher: Optional[str] = None
    series: Optional[str] = None
    publication_year: Optional[int] = None
    description: Optional[str] = None
    cover_url: Optional[str] = None
    page_count: Optional[int] = None
    is_new: bool = False
    hot_score: float = 0.0


class SearchResponse(BaseModel):
    keyword: str
    total: int
    books: list[BookSimple]


class GraphPathRequest(BaseModel):
    book_id: int
    max_depth: int = Field(default=2, ge=1, le=3)
    limit: int = Field(default=20, ge=1, le=100)


class GraphPathItem(BaseModel):
    book: BookSimple
    relation_type: str
    path: str
    score: float
    reason: str


class GraphRelationsResponse(BaseModel):
    book_id: int
    same_author: list[BookSimple] = Field(default_factory=list)
    same_tag: list[BookSimple] = Field(default_factory=list)
    same_publisher: list[BookSimple] = Field(default_factory=list)
    same_series: list[BookSimple] = Field(default_factory=list)
