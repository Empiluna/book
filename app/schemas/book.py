"""
【模块二 · 知识图谱】Pydantic 请求/响应模型
  负责成员: B
"""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


# ── 图书 ──
class BookDetail(BaseModel):
    id: int
    title: str
    subtitle: Optional[str] = None
    isbn: Optional[str] = None
    authors: list[str] = []
    publisher: Optional[str] = None
    series: Optional[str] = None
    tags: list[str] = []
    publication_year: Optional[int] = None
    description: Optional[str] = None
    cover_url: Optional[str] = None
    page_count: Optional[int] = None
    avg_rating: float = 0.0
    rating_count: int = 0
    hot_score: float = 0.0
    # 购书链接 - 模块四填充
    purchase_url_jd: Optional[str] = None
    purchase_url_dd: Optional[str] = None
    purchase_url_tb: Optional[str] = None

    model_config = {"from_attributes": True}

class BookBrief(BaseModel):
    """推荐列表中的简略信息"""
    id: int
    title: str
    authors: list[str] = []
    cover_url: Optional[str] = None
    avg_rating: float = 0.0
    tags: list[str] = []

    model_config = {"from_attributes": True}

# ── 知识图谱查询 ──
class GraphPathNode(BaseModel):
    """图谱路径中的一个节点"""
    entity_type: str     # Book / Author / Tag / Publisher
    entity_id: int
    entity_name: str

class GraphPath(BaseModel):
    """一条推理路径"""
    nodes: list[GraphPathNode]
    relation_chain: list[str]  # ["作者", "同作者"]
    total_weight: float = 0.0

class GraphQueryRequest(BaseModel):
    """图谱查询请求 - 模块三通过此接口查询"""
    book_id: int
    max_hops: int = Field(default=3, ge=1, le=5)
    top_k: int = Field(default=20, ge=1, le=100)
    # 路径类型权重（可覆盖默认配置）
    author_weight: float = 1.0
    tag_weight: float = 0.8
    publisher_weight: float = 0.5
    series_weight: float = 0.6

class GraphQueryResponse(BaseModel):
    """图谱查询响应 - 返回候选图书及推理路径"""
    source_book_id: int
    source_book_title: str
    candidates: list["GraphCandidate"]

class GraphCandidate(BaseModel):
    book_id: int
    book_title: str
    paths: list[GraphPath]       # 到达该书的推理路径
    final_score: float = 0.0     # 融合后得分

# ── 图谱管理（管理员） ──
class GraphEntityCreate(BaseModel):
    entity_type: str = Field(..., pattern="^(Book|Author|Tag|Publisher|Series)$")
    entity_name: str
    properties: dict = {}

class GraphRelationCreate(BaseModel):
    source_type: str
    source_id: int
    relation: str       # AUTHORED / PUBLISHED / TAGGED / SERIES_OF / SIMILAR
    target_type: str
    target_id: int
