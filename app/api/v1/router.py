"""
API v1 总路由
按四大模块组织端点
"""
from fastapi import APIRouter
from app.api.v1.endpoints import user, graph, recommend, ecosystem

api_router = APIRouter(prefix="/api/v1")

# ── 模块一：用户画像 (成员 A) ──
api_router.include_router(
    user.router,
    prefix="/user",
    tags=["模块一 · 用户画像"]
)

# ── 模块二：知识图谱 (成员 B) ──
api_router.include_router(
    graph.router,
    prefix="/graph",
    tags=["模块二 · 知识图谱"]
)

# ── 模块三：个性化推荐 (成员 C) ──
api_router.include_router(
    recommend.router,
    prefix="/recommend",
    tags=["模块三 · 个性化推荐"]
)

# ── 模块四：阅读生态 (成员 D) ──
api_router.include_router(
    ecosystem.router,
    prefix="/ecosystem",
    tags=["模块四 · 阅读生态"]
)
