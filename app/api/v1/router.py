from fastapi import APIRouter
from app.api.v1.endpoints import admin, ai_chat, books, ecosystem, graph, recommend, user

api_router = APIRouter()
api_router.include_router(books.router)
api_router.include_router(user.router)
api_router.include_router(graph.router)
api_router.include_router(recommend.router)
api_router.include_router(ecosystem.router)
api_router.include_router(ai_chat.router)
api_router.include_router(admin.router)
