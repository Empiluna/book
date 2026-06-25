from fastapi import APIRouter

from app.api.v1.endpoints import recommend
from app.api.v1.endpoints import recommend_extra


api_router = APIRouter()

api_router.include_router(
    recommend.router,
    prefix="/recommend",
    tags=["模块三 · 个性化推荐"],
)

api_router.include_router(
    recommend_extra.router,
    prefix="/recommend-extra",
    tags=["模块三 · 推荐增强功能"],
)