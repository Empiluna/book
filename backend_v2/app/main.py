"""基于知识图谱的个性化荐书系统 — 可直接运行后端入口。

启动：
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
访问：
    http://localhost:8000/docs
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 导入全部模型，确保 Base.metadata.create_all 能创建完整表结构。
import app.models  # noqa: F401
from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.database import Base, SessionLocal, engine
from app.services.book_service import seed_demo_data

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_demo_data(db)
    finally:
        db.close()
    print(f"{settings.APP_NAME} {settings.APP_VERSION} started. Swagger: http://localhost:8000/docs")
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
基于知识图谱的个性化荐书系统后端。默认使用 SQLite，可直接启动测试；后续可改接 MySQL、Neo4j、Redis、ElasticSearch。

已包含：用户注册登录、用户画像、阅读历史、搜索日志、书架收藏、评分、阅读进度、图书查询、图谱关联、混合推荐、评论点赞、试读、购书点击、智能问答助手。
""".strip(),
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/", tags=["系统"])
def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["系统"])
def health_check():
    return {"status": "ok", "app": settings.APP_NAME}
