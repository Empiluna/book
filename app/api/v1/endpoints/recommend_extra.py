# app/api/v1/endpoints/recommend_extra.py
"""
模块三剩余增强功能 API

包括：Neo4j/Cypher 图谱推荐、推荐效果统计、A/B 测试、用户画像适配。
"""

from fastapi import APIRouter, Query
from pydantic import BaseModel, Field

from app.api.v1.endpoints.recommend import build_recommend_item
from app.services.recommend_service import RecommendService
from app.services.recommend_integration_service import (
    Neo4jRecommendAdapter,
    RecommendExperimentService,
    RecommendMetricsService,
    UserProfileAdapter,
    merge_external_kg_items_with_book_info,
)

router = APIRouter()


class GraphRecommendRequest(BaseModel):
    source_book_ids: list[int] = Field(default_factory=list)
    exclude_book_ids: list[int] = Field(default_factory=list)
    top_n: int = 10


class MetricsPrecisionRequest(BaseModel):
    user_id: int
    recommended_book_ids: list[int] = Field(default_factory=list)
    k: int = 10


@router.post('/graph/neo4j', summary='Neo4j/Cypher 图谱推荐测试')
def graph_recommend_from_neo4j(payload: GraphRecommendRequest):
    service = RecommendService()
    adapter = Neo4jRecommendAdapter()
    if not adapter.is_available():
        return {"available": False, "message": "Neo4j 未连接，已跳过真实 Cypher 查询。请检查 neo4j 驱动、地址、账号密码和服务状态。", "items": []}
    kg_items = adapter.recommend_from_source_books(
        source_book_ids=payload.source_book_ids,
        exclude_book_ids=set(payload.exclude_book_ids),
        top_n=payload.top_n,
    )
    enriched = merge_external_kg_items_with_book_info(kg_items, service.list_books())
    adapter.close()
    return {"available": True, "count": len(enriched), "items": [build_recommend_item(item) for item in enriched]}


@router.get('/profile/{user_id}', summary='用户画像适配结果查看')
def user_profile_for_recommend(user_id: int):
    service = RecommendService()
    adapter = UserProfileAdapter()
    return adapter.build_profile_from_behaviors(service.list_books(), service.list_behaviors(), user_id)


@router.get('/experiment/{user_id}', summary='查看用户 A/B 测试分组和推荐权重')
def experiment_group(user_id: int):
    return RecommendExperimentService().get_experiment_info(user_id)


@router.get('/metrics/summary', summary='推荐效果统计汇总')
def metrics_summary():
    service = RecommendService()
    metrics = RecommendMetricsService()
    return metrics.summarize(service.EXPOSURE_LOGS, service.CLICK_LOGS, service.BEHAVIOR_LOGS)


@router.post('/metrics/precision', summary='计算 Precision@K')
def precision_at_k(payload: MetricsPrecisionRequest):
    service = RecommendService()
    metrics = RecommendMetricsService()
    positive_book_ids = metrics.build_positive_book_ids(service.BEHAVIOR_LOGS, payload.user_id)
    score = metrics.precision_at_k(payload.recommended_book_ids, positive_book_ids, payload.k)
    return {"user_id": payload.user_id, "k": payload.k, "precision_at_k": score, "positive_book_ids": sorted(positive_book_ids)}


@router.get('/ab-home', summary='使用 A/B 测试权重生成首页推荐')
def ab_home_recommend(user_id: int = Query(1), top_n: int = Query(10, ge=1, le=50)):
    service = RecommendService()
    experiment_service = RecommendExperimentService()
    info = experiment_service.get_experiment_info(user_id)
    old_weights = service.get_weights()
    service.update_weights(info['weights'])
    items = service.recommend_hybrid(user_id=user_id, top_n=top_n)
    service.update_weights(old_weights)
    return {"experiment": info, "items": [build_recommend_item(item) for item in items]}
