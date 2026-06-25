# app/schemas/recommend.py
"""
模块三：个性化推荐模块 Schema V2

新增内容：
- RecommendMeta：返回耗时、缓存命中、是否降级、分页信息
- FeedbackRequest：不感兴趣负反馈
- ExposureRequest：推荐曝光回传
- BehaviorRecordRequest：点击/试读/收藏/评分/搜索等行为回传
- RecommendWeights：混合推荐权重可配置
- NaturalLanguageRecommendRequest：给智能问答助手调用的自然语言荐书接口
"""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


RecommendStrategy = Literal["hybrid", "cf", "kg", "hot", "new"]
RecommendScene = Literal["home", "guess", "similar", "hot", "new", "nl"]
RecommendSource = Literal["hybrid", "cf", "kg", "hot", "new"]
BehaviorType = Literal[
    "exposure", "click", "view", "trial", "collect", "rating",
    "comment", "purchase_click", "not_interested", "search"
]


class BookBrief(BaseModel):
    id: int
    title: str
    author: str
    publisher: str
    tags: list[str] = Field(default_factory=list)
    category: str | None = None
    series: str | None = None
    avg_rating: float = 0.0
    rating_count: int = 0
    hot_score: float = 0.0
    is_new: bool = False
    cover_url: str | None = None


class RecommendItem(BaseModel):
    book: BookBrief
    score: float = Field(..., ge=0.0)
    source: RecommendSource
    reason: str
    reason_type: str = "hybrid"
    reason_paths: list[str] = Field(default_factory=list)


class RecommendMeta(BaseModel):
    page: int = 1
    page_size: int = 10
    total: int = 0
    has_more: bool = False
    cost_ms: float = 0.0
    cache_hit: bool = False
    fallback: bool = False
    fallback_reason: str | None = None
    refresh: bool = False
    strategy: str = "hybrid"


class RecommendListResponse(BaseModel):
    user_id: int | None = None
    scene: RecommendScene
    strategy: str
    items: list[RecommendItem] = Field(default_factory=list)
    meta: RecommendMeta = Field(default_factory=RecommendMeta)
    generated_at: datetime = Field(default_factory=datetime.now)


class RecommendWeights(BaseModel):
    kg: float = Field(default=0.4, ge=0.0)
    cf: float = Field(default=0.4, ge=0.0)
    hot: float = Field(default=0.1, ge=0.0)
    new: float = Field(default=0.1, ge=0.0)

    def normalized(self) -> dict[str, float]:
        total = self.kg + self.cf + self.hot + self.new
        if total <= 0:
            return {"kg": 0.4, "cf": 0.4, "hot": 0.1, "new": 0.1}
        return {
            "kg": self.kg / total,
            "cf": self.cf / total,
            "hot": self.hot / total,
            "new": self.new / total,
        }


class FeedbackRequest(BaseModel):
    user_id: int
    book_id: int
    reason: str | None = None


class BehaviorRecordRequest(BaseModel):
    user_id: int
    behavior_type: BehaviorType
    book_id: int | None = None
    score: float = 1.0
    keyword: str | None = None
    extra: dict[str, str] = Field(default_factory=dict)


class ExposureRequest(BaseModel):
    user_id: int
    book_ids: list[int] = Field(default_factory=list)
    scene: RecommendScene = "home"
    strategy: str = "hybrid"


class NaturalLanguageRecommendRequest(BaseModel):
    user_id: int | None = None
    query: str
    top_n: int = Field(default=10, ge=1, le=50)


class ItemSimilarityResponse(BaseModel):
    book_id: int
    book_title: str
    similar_books: list[RecommendItem] = Field(default_factory=list)


class PrecomputeResponse(BaseModel):
    message: str
    saved_to: str
    item_count: int
    pair_count: int
    generated_at: datetime = Field(default_factory=datetime.now)


class FeatureCoverageItem(BaseModel):
    feature: str
    implemented_in: str
    api: str | None = None
    description: str


class FeatureCoverageResponse(BaseModel):
    module: str = "模块三：个性化推荐模块"
    items: list[FeatureCoverageItem]


class SimpleMessageResponse(BaseModel):
    success: bool = True
    message: str
    data: dict = Field(default_factory=dict)
