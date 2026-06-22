"""
══════════════════════════════════════════════════════════════
基于知识图谱的个性化荐书系统 — FastAPI 主入口
══════════════════════════════════════════════════════════════

启动方式:
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

访问:
  - API 文档 (Swagger): http://localhost:8000/docs
  - API 文档 (ReDoc):   http://localhost:8000/redoc
  - 健康检查:            http://localhost:8000/health
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.database import engine, Base
from app.api.v1.router import api_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时
    print(f"🚀 {settings.APP_NAME} v{settings.APP_VERSION} 启动中...")
    print(f"📖 API 文档: http://localhost:8000/docs")
    # 创建 MySQL 表（开发环境；生产用 Alembic 迁移）
    Base.metadata.create_all(bind=engine)
    yield
    # 关闭时
    print("👋 服务关闭")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""## 基于知识图谱的个性化荐书系统

### 四大模块
| 模块 | 负责人 | 标签 |
|------|--------|------|
| 用户画像 | 成员 A | `模块一 · 用户画像` |
| 知识图谱 | 成员 B | `模块二 · 知识图谱` |
| 个性化推荐 | 成员 C | `模块三 · 个性化推荐` |
| 阅读生态 | 成员 D | `模块四 · 阅读生态` |

### 技术栈
- **后端框架**: FastAPI
- **关系数据库**: MySQL (SQLAlchemy)
- **图数据库**: Neo4j (Cypher)
- **缓存**: Redis
- **搜索**: ElasticSearch
- **推荐**: scikit-learn + 自研图谱推理
""",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS 配置（开发环境允许所有来源）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册 API 路由
app.include_router(api_router)


@app.get("/", tags=["系统"])
def root():
    """系统根路径"""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["系统"])
def health_check():
    """健康检查"""
    return {"status": "ok", "app": settings.APP_NAME}
