"""API v1 总路由。"""

from fastapi import APIRouter

from app.api.v1.endpoints import ai_chat, ecosystem, graph, recommend, user

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(user.router, prefix="/user", tags=["模块一 · 用户画像"])
api_router.include_router(graph.router, prefix="/graph", tags=["模块二 · 知识图谱"])
api_router.include_router(recommend.router, prefix="/recommend", tags=["模块三 · 个性化推荐"])
api_router.include_router(ecosystem.router, prefix="/ecosystem", tags=["模块四 · 阅读生态"])
api_router.include_router(ai_chat.router, prefix="/chat", tags=["智能问答助手"])
