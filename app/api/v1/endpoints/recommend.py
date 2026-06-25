# app/api/v1/endpoints/recommend.py

from fastapi import APIRouter, Query

from app.schemas.recommend import (
    BehaviorRecordRequest, BookBrief, ExposureRequest, FeatureCoverageItem,
    FeatureCoverageResponse, FeedbackRequest, ItemSimilarityResponse,
    NaturalLanguageRecommendRequest, PrecomputeResponse, RecommendItem,
    RecommendListResponse, RecommendMeta, RecommendStrategy, RecommendWeights,
    SimpleMessageResponse,
)
from app.services.recommend_service import RecommendService


router = APIRouter()


def build_book_brief(book: dict) -> BookBrief:
    return BookBrief(
        id=int(book["id"]), title=book["title"], author=book["author"],
        publisher=book["publisher"], tags=book.get("tags", []),
        category=book.get("category"), series=book.get("series"),
        avg_rating=float(book.get("avg_rating", 0.0)),
        rating_count=int(book.get("rating_count", 0)),
        hot_score=float(book.get("hot_score", 0.0)),
        is_new=bool(book.get("is_new", False)),
        cover_url=book.get("cover_url"),
    )


def build_recommend_item(item: dict) -> RecommendItem:
    return RecommendItem(
        book=build_book_brief(item["book"]),
        score=round(float(item.get("score", 0.0)), 6),
        source=item.get("source", "hybrid"),
        reason=item.get("reason", "根据你的阅读兴趣推荐"),
        reason_type=item.get("reason_type", item.get("source", "hybrid")),
        reason_paths=item.get("reason_paths", []),
    )


def build_recommend_response(user_id, scene, strategy, items, meta_data=None):
    meta_data = meta_data or {}
    meta = RecommendMeta(
        page=int(meta_data.get("page", 1)),
        page_size=int(meta_data.get("page_size", len(items) if items else 10)),
        total=int(meta_data.get("total", len(items))),
        has_more=bool(meta_data.get("has_more", False)),
        cost_ms=float(meta_data.get("cost_ms", 0.0)),
        cache_hit=bool(meta_data.get("cache_hit", False)),
        fallback=bool(meta_data.get("fallback", False)),
        fallback_reason=meta_data.get("fallback_reason"),
        refresh=bool(meta_data.get("refresh", False)),
        strategy=strategy,
    )
    return RecommendListResponse(
        user_id=user_id, scene=scene, strategy=strategy,
        items=[build_recommend_item(item) for item in items],
        meta=meta,
    )


@router.get("/home", response_model=RecommendListResponse, summary="首页推荐：分页/刷新/缓存/降级")
def home_recommend(
    user_id: int = Query(1),
    strategy: RecommendStrategy = Query("hybrid"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    refresh: bool = Query(False),
):
    service = RecommendService()
    full_items, runtime_meta = service.safe_recommend_home(
        user_id=user_id,
        strategy=strategy,
        top_n=max(page * page_size, page_size) + 20,
        refresh=refresh,
    )
    page_items, page_meta = service.paginate_items(full_items, page, page_size)
    return build_recommend_response(
        user_id, "home", strategy, page_items,
        {**runtime_meta, **page_meta, "refresh": refresh},
    )


@router.get("/guess", response_model=RecommendListResponse, summary="猜你喜欢：近期兴趣增强")
def guess_recommend(user_id: int = Query(1), page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50)):
    service = RecommendService()
    full_items = service.recommend_guess_you_like(user_id, max(page * page_size, page_size) + 20)
    page_items, meta = service.paginate_items(full_items, page, page_size)
    return build_recommend_response(user_id, "guess", "recent_interest+hybrid", page_items, meta)


@router.get("/similar/{book_id}", response_model=RecommendListResponse, summary="详情页相似推荐")
def similar_recommend(book_id: int, page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50)):
    service = RecommendService()
    full_items = service.recommend_similar_book(book_id, max(page * page_size, page_size) + 20)
    page_items, meta = service.paginate_items(full_items, page, page_size)
    return build_recommend_response(None, "similar", "kg+cf", page_items, meta)


@router.get("/hot", response_model=RecommendListResponse, summary="热门推荐：30天综合热度")
def hot_recommend(page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50)):
    service = RecommendService()
    full_items = service.recommend_hot(max(page * page_size, page_size) + 20)
    page_items, meta = service.paginate_items(full_items, page, page_size)
    return build_recommend_response(None, "hot", "hot", page_items, meta)


@router.get("/new", response_model=RecommendListResponse, summary="新书推荐：支持个性化")
def new_recommend(user_id: int | None = Query(None), page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50)):
    service = RecommendService()
    full_items = service.recommend_new(user_id, max(page * page_size, page_size) + 20)
    page_items, meta = service.paginate_items(full_items, page, page_size)
    return build_recommend_response(user_id, "new", "new", page_items, meta)


@router.post("/precompute/itemcf", response_model=PrecomputeResponse, summary="ItemCF 离线预计算")
def precompute_itemcf():
    return PrecomputeResponse(**RecommendService().precompute_item_similarity())


@router.get("/item-similarity/{book_id}", response_model=ItemSimilarityResponse, summary="查看 ItemCF 相似图书")
def item_similarity(book_id: int, top_n: int = Query(10, ge=1, le=50)):
    service = RecommendService()
    book = service.get_book(book_id)
    if book is None:
        return ItemSimilarityResponse(book_id=book_id, book_title="未找到图书", similar_books=[])
    items = service.get_item_similar_books(book_id, top_n)
    return ItemSimilarityResponse(book_id=book_id, book_title=book["title"], similar_books=[build_recommend_item(item) for item in items])


@router.post("/feedback/not-interested", response_model=SimpleMessageResponse, summary="不感兴趣负反馈")
def not_interested_feedback(payload: FeedbackRequest):
    service = RecommendService()
    result = service.add_negative_feedback(payload.user_id, payload.book_id, payload.reason)
    service.record_behavior(payload.user_id, "not_interested", payload.book_id, -1.0, extra={"reason": payload.reason or "用户不感兴趣"})
    return SimpleMessageResponse(message="已记录不感兴趣反馈，后续推荐会过滤该图书", data=result)


@router.post("/exposure", response_model=SimpleMessageResponse, summary="推荐曝光回传")
def record_recommend_exposure(payload: ExposureRequest):
    result = RecommendService().record_exposure(payload.user_id, payload.book_ids, payload.scene, payload.strategy)
    return SimpleMessageResponse(message="推荐曝光已记录", data=result)


@router.post("/click", response_model=SimpleMessageResponse, summary="推荐点击回传")
def record_recommend_click(payload: BehaviorRecordRequest):
    if payload.book_id is None:
        return SimpleMessageResponse(success=False, message="点击记录必须提供 book_id", data={})
    result = RecommendService().record_click(
        payload.user_id,
        payload.book_id,
        payload.extra.get("scene", "home"),
        payload.extra.get("strategy", "hybrid"),
    )
    return SimpleMessageResponse(message="推荐点击已记录，并会影响后续推荐", data=result)


@router.post("/behavior", response_model=SimpleMessageResponse, summary="统一行为回传")
def record_behavior(payload: BehaviorRecordRequest):
    result = RecommendService().record_behavior(
        payload.user_id,
        payload.behavior_type,
        payload.book_id,
        payload.score,
        payload.keyword,
        payload.extra,
    )
    return SimpleMessageResponse(message="用户行为已记录，推荐缓存已更新", data=result)


@router.get("/weights", response_model=SimpleMessageResponse, summary="查看混合推荐权重")
def get_recommend_weights():
    return SimpleMessageResponse(message="当前混合推荐权重", data=RecommendService().get_weights())


@router.put("/weights", response_model=SimpleMessageResponse, summary="更新混合推荐权重")
def update_recommend_weights(payload: RecommendWeights):
    result = RecommendService().update_weights(payload.normalized())
    return SimpleMessageResponse(message="混合推荐权重已更新", data=result)


@router.post("/nl", response_model=RecommendListResponse, summary="自然语言荐书：智能问答助手对接")
def natural_language_recommend(payload: NaturalLanguageRecommendRequest):
    service = RecommendService()
    items = service.recommend_by_natural_query(payload.query, payload.user_id, payload.top_n)
    return build_recommend_response(payload.user_id, "nl", "natural_language", items, {"page": 1, "page_size": payload.top_n, "total": len(items)})


@router.get("/coverage", response_model=FeatureCoverageResponse, summary="查看模块三每个功能点实现位置")
def feature_coverage():
    service = RecommendService()
    return FeatureCoverageResponse(items=[FeatureCoverageItem(**item) for item in service.get_feature_coverage()])


@router.get("/mock/books", summary="调试：查看模拟图书数据")
def mock_books():
    service = RecommendService()
    return {"count": len(service.list_books()), "books": service.list_books()}


@router.get("/mock/behaviors", summary="调试：查看模拟行为数据")
def mock_behaviors():
    service = RecommendService()
    return {"count": len(service.list_behaviors()), "behaviors": service.list_behaviors()}
