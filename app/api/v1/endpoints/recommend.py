from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_optional, require_admin
from app.core.database import get_db
from app.models import User
from app.schemas import FeedbackRequest, RecommendWeightsUpdate
from app.services.recommend_service import RecommendService, get_weights, set_weights
from app.services.serializers import book_card

router = APIRouter(prefix="/recommend", tags=["模块三 · 个性化推荐"])


@router.get("/home")
def home(
    limit: int = Query(20, ge=1, le=50),
    refresh: bool = Query(False),
    db: Session = Depends(get_db),
    user: User | None = Depends(get_current_user_optional),
):
    return RecommendService(db).hybrid(user, limit=limit, scene="home", force_refresh=refresh)


@router.get("/guess-you-like")
def guess_you_like(limit: int = Query(12, ge=1, le=30), db: Session = Depends(get_db), user: User | None = Depends(get_current_user_optional)):
    return RecommendService(db).guess_you_like(user, limit)


@router.get("/similar/{book_id}")
def similar(book_id: int, limit: int = Query(12, ge=1, le=30), db: Session = Depends(get_db)):
    return RecommendService(db).similar(book_id, limit)


@router.get("/hot")
def hot(limit: int = Query(20, ge=1, le=100), refresh: bool = Query(False), db: Session = Depends(get_db)):
    service = RecommendService(db)
    rows = service.hot_scores(max(limit * 5, limit) if refresh else limit)
    if refresh and len(rows) > limit:
        import random
        random.shuffle(rows)
        rows = rows[:limit]
    return {"items": [book_card(r["book"], score=r["score"], reason=r["reason"], source="hot") for r in rows]}


@router.get("/new")
def new(limit: int = Query(20, ge=1, le=100), refresh: bool = Query(False), db: Session = Depends(get_db)):
    service = RecommendService(db)
    rows = service.new_scores(max(limit * 5, limit) if refresh else limit)
    if refresh and len(rows) > limit:
        import random
        random.shuffle(rows)
        rows = rows[:limit]
    return {"items": [book_card(r["book"], score=r["score"], reason=r["reason"], source="new") for r in rows]}


@router.post("/feedback")
def feedback(data: FeedbackRequest, db: Session = Depends(get_db), user: User | None = Depends(get_current_user_optional)):
    return RecommendService(db).feedback(user, data.book_id, data.event_type, data.source)


@router.post("/natural-language")
def natural_language(payload: dict, db: Session = Depends(get_db), user: User | None = Depends(get_current_user_optional)):
    return RecommendService(db).natural_language(payload.get("message", ""), user)


@router.get("/admin/weights")
def weights(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return get_weights(db)


@router.put("/admin/weights")
def update_weights(data: RecommendWeightsUpdate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return {"message": "推荐权重已更新", "weights": set_weights(db, data.model_dump())}


@router.post("/admin/precompute-itemcf")
def precompute(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    service = RecommendService(db)
    matrix = service._rating_matrix_similarity()
    return {"message": "ItemCF相似度矩阵已预计算并缓存", "books": len(matrix)}
