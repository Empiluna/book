"""推荐接口响应模型。"""

from pydantic import BaseModel, Field

from app.schemas.book import BookSimple


class RecommendationItem(BaseModel):
    book: BookSimple
    final_score: float
    source: str
    reason: str


class RecommendationResponse(BaseModel):
    scene: str
    user_id: int | None = None
    items: list[RecommendationItem] = Field(default_factory=list)
    fallback_used: bool = False
