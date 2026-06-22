"""
═══════════════════════════════════════════════════════
【模块三 · 个性化推荐】API 端点
  负责人: C
  /api/v1/recommend/...
═══════════════════════════════════════════════════════
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db, get_neo4j_session
from app.api.deps import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.recommend import (
    RecommendRequest, RecommendListResponse, RecommendResponse,
    RecommendWeights,
)
from app.schemas.book import GraphQueryRequest
from app.services.recommend_service import RecommendService
from app.services.user_service import build_user_profile
from app.services.graph_service import GraphService

router = APIRouter()


@router.get("/home", response_model=RecommendListResponse, summary="首页个性化推荐")
def home_recommend(
    strategy: str = Query("hybrid", pattern="^(hybrid|kg|cf|hot|new)$"),
    top_n: int = Query(20, ge=1, le=100),
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
    neo4j=Depends(get_neo4j_session),
):
    """
    首页推荐流
    - 已登录: 个性化混合推荐
    - 未登录: 热门推荐 (冷启动)
    """
    if current_user is None:
        # 未登录 → 热门推荐
        service = RecommendService(user_profile=None)
        items = service.recommend_hot(top_n)
        return RecommendListResponse(
            user_id=0, strategy="hot", items=items,
            generated_at="",
        )

    # 已登录 → 混合推荐
    # 1. 从模块一获取用户画像
    profile_data = build_user_profile(db, current_user.id)

    # 2. 从模块二获取图谱路径 (为每个高分图书查询)
    graph_results = []
    for book_id in profile_data.get("high_rated_book_ids", [])[:5]:
        paths = GraphService.find_paths(neo4j, book_id, max_hops=2, top_k=10)
        graph_results.append(paths)

    # 3. 融合推荐
    from app.schemas.recommend import UserProfileForRecommend
    user_profile = UserProfileForRecommend(
        user_id=current_user.id,
        tag_weights=profile_data.get("tag_weights", {}),
        favorite_author_ids=profile_data.get("favorite_author_ids", []),
        favorite_tag_ids=profile_data.get("favorite_tag_ids", []),
        high_rated_book_ids=profile_data.get("high_rated_book_ids", []),
    )

    service = RecommendService(user_profile=user_profile)
    items = service.recommend_hybrid(top_n=top_n)

    # 4. 生成推荐理由
    result_items = []
    for item in items:
        reason_info = item.get("paths", [{}])[0] if item.get("paths") else {"path_type": "cf"}
        reason = RecommendService.generate_reason(
            item.get("book_title", ""), reason_info
        )
        result_items.append(RecommendResponse(
            book={
                "id": item["book_id"],
                "title": item["book_title"],
                "authors": [],
                "cover_url": None,
                "avg_rating": 0.0,
                "tags": [],
            },
            score=item["score"],
            reason=reason,
            reason_type=reason_info.get("path_type", "cf"),
        ))

    from datetime import datetime
    return RecommendListResponse(
        user_id=current_user.id,
        strategy=strategy,
        items=result_items,
        generated_at=datetime.now().isoformat(),
    )


@router.get("/similar/{book_id}", summary="相似图书推荐（详情页）")
def similar_books(
    book_id: int,
    top_n: int = Query(10, ge=1, le=50),
    neo4j=Depends(get_neo4j_session),
):
    """图书详情页下方的"你可能也喜欢"——基于图谱路径"""
    result = GraphService.find_paths(neo4j, book_id, max_hops=2, top_k=top_n)
    candidates = result.get("candidates", [])
    items = []
    for c in candidates:
        items.append({
            "book_id": c["book_id"],
            "book_title": c["book_title"],
            "score": c.get("final_score", 0.0),
            "reason_type": c.get("paths", [{}])[0].get("path_type", "graph") if c.get("paths") else "graph",
        })
    return {"book_id": book_id, "similar_books": items}


@router.get("/hot", summary="热门推荐")
def hot_books(
    top_n: int = Query(20, ge=1, le=100),
):
    """全站热门图书推荐（冷启动/未登录使用）"""
    # TODO: 从 MySQL/Redis 查询 hot_score 最高的图书
    return {"hot_books": []}


@router.put("/weights", summary="调整混合推荐权重（管理员）")
def update_weights(
    weights: RecommendWeights,
    _admin: User = Depends(get_current_user),
):
    """运行时调整推荐策略权重"""
    return {
        "kg_weight": weights.kg_weight,
        "cf_weight": weights.cf_weight,
        "hot_weight": weights.hot_weight,
        "new_weight": weights.new_weight,
    }
