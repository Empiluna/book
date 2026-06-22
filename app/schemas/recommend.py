"""
【模块三 · 个性化推荐】Pydantic 请求/响应模型
  负责成员: C
"""
from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.book import BookBrief


class RecommendRequest(BaseModel):
    """推荐请求"""
    user_id: int
    strategy: Optional[str] = Field(
        default="hybrid",
        pattern="^(hybrid|kg|cf|hot|new)$"
    )
    top_n: int = Field(default=20, ge=1, le=100)
    exclude_ids: list[int] = []          # 排除已读/已推荐的图书

class RecommendResponse(BaseModel):
    """单条推荐结果"""
    book: BookBrief
    score: float                          # 0.0 ~ 1.0
    reason: str                           # "因为你喜欢《三体》作者刘慈欣的作品"
    reason_type: str                      # author / tag / publisher / cf / hot / new
    reason_paths: list[str] = []          # 图谱推理路径（可解释性）

class RecommendListResponse(BaseModel):
    """推荐列表"""
    user_id: int
    strategy: str
    items: list[RecommendResponse]
    generated_at: str  # ISO timestamp

# ── 推荐策略配置 ──
class RecommendWeights(BaseModel):
    """混合推荐权重 - 可运行时调整"""
    kg_weight: float = Field(default=0.4, ge=0.0, le=1.0)
    cf_weight: float = Field(default=0.4, ge=0.0, le=1.0)
    hot_weight: float = Field(default=0.1, ge=0.0, le=1.0)
    new_weight: float = Field(default=0.1, ge=0.0, le=1.0)

# ── 模块间接口契约 ──
class UserProfileForRecommend(BaseModel):
    """
    【接口契约】模块一 → 模块三
    A 需要提供此格式的用户画像数据
    """
    user_id: int
    tag_weights: dict[str, float]      # {"科幻": 0.9, "历史": 0.2}
    favorite_author_ids: list[int]     # [1, 5, 23]
    favorite_tag_ids: list[int]        # [3, 7, 12]
    high_rated_book_ids: list[int]     # [101, 203, 405] 评分>=4的图书

class GraphPathsForRecommend(BaseModel):
    """
    【接口契约】模块二 → 模块三
    B 需要提供此格式的图谱推理结果
    """
    source_book_id: int
    candidates: list[dict]  # [{"book_id": 1, "paths": [...], "score": 0.85}]
