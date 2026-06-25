"""模块三 · 个性化推荐 API。"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_current_user_optional
from app.core.database import get_db
from app.models.user import User
from app.schemas.recommend import RecommendationResponse
from app.services import recommend_service

router = APIRouter()


@router.get("/home", response_model=RecommendationResponse, summary="首页个性化推荐流")
def home(limit: int = Query(20, ge=1, le=100), current_user: User | None = Depends(get_current_user_optional), db: Session = Depends(get_db)):
    return recommend_service.home_recommend(db, current_user, limit)


@router.get("/hot", response_model=RecommendationResponse, summary="热门推荐")
def hot(limit: int = Query(20, ge=1, le=100), db: Session = Depends(get_db)):
    return recommend_service.hot_recommend(db, limit)


@router.get("/new", response_model=RecommendationResponse, summary="新书推荐")
def new(limit: int = Query(20, ge=1, le=100), db: Session = Depends(get_db)):
    return recommend_service.new_recommend(db, limit)


@router.get("/similar/{book_id}", response_model=RecommendationResponse, summary="详情页相似图书推荐")
def similar(book_id: int, limit: int = Query(10, ge=1, le=50), db: Session = Depends(get_db)):
    return recommend_service.similar_books(db, book_id, limit)


@router.get("/guess-you-like", response_model=RecommendationResponse, summary="猜你喜欢")
def guess_you_like(limit: int = Query(10, ge=1, le=50), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return recommend_service.guess_you_like(db, current_user, limit)
