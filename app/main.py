from __future__ import annotations

import mimetypes
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.api.v1.router import api_router
from app.core.cache import cache
from app.core.config import get_settings
from app.core.database import Base, engine, SessionLocal
from app.services.seed import seed_database

# Import models so SQLAlchemy can create all tables.
import app.models  # noqa: F401

settings = get_settings()
mimetypes.add_type("application/epub+zip", ".epub")
mimetypes.add_type("application/pdf", ".pdf")
# Edge/Chrome 动态 import .mjs 时必须收到 JavaScript MIME，否则会报 Failed to fetch dynamically imported module。
mimetypes.add_type("text/javascript", ".mjs")
mimetypes.add_type("text/javascript", ".js")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.1.0-complete-five-fixes",
    description="四大模块完整增强版：uni-app多端、ElasticSearch检索、PDF/EPUB阅读器、Neo4j Cypher图谱、OpenAI兼容LLM。",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.CORS_ORIGINS == "*" else settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_static_cache_headers(request, call_next):
    response = await call_next(request)
    path = request.url.path.lower()
    cacheable_exts = (".css", ".js", ".mjs", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".woff2")
    if path.startswith("/data/book_read/") or path.endswith(cacheable_exts):
        response.headers.setdefault("Cache-Control", "public, max-age=604800")
    return response

app.include_router(api_router, prefix=settings.API_V1_PREFIX)

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"
if FRONTEND.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND)), name="static")
DATA_DIR = ROOT / "data"
if DATA_DIR.exists():
    app.mount("/data", StaticFiles(directory=str(DATA_DIR)), name="data")


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if settings.SEED_ON_STARTUP:
            seed_database(db)
        # Production-grade synchronization. Each service has strict mode flags.
        from app.services.graph_service import GraphService
        from app.services.search_service import SearchService
        GraphService(db).sync_from_mysql()
        SearchService(db).bulk_index_books()
    finally:
        db.close()


@app.get("/")
def index():
    index_file = FRONTEND / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return {"message": settings.PROJECT_NAME, "docs": "/docs"}


@app.get("/login")
def login_page():
    login_file = FRONTEND / "login.html"
    headers = {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0"
    }

    if login_file.exists():
        return FileResponse(str(login_file), headers=headers)

    return FileResponse(str(FRONTEND / "index.html"), headers=headers)


@app.get("/admin")
def admin_page():
    admin_file = FRONTEND / "admin.html"
    headers = {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0"
    }

    if admin_file.exists():
        return FileResponse(str(admin_file), headers=headers)

    return FileResponse(str(FRONTEND / "index.html"), headers=headers)


@app.get("/health")
def health():
    db = SessionLocal()
    graph_backend = "unknown"
    search_backend = "unknown"
    try:
        from app.services.graph_service import GraphService
        from app.services.search_service import SearchService
        graph_backend = "neo4j" if GraphService(db).using_neo4j else "sql-fallback"
        search_backend = SearchService(db).backend
    except Exception as exc:
        graph_backend = f"error:{exc}"
    finally:
        db.close()
    return {
        "status": "ok",
        "modules": ["user-profile", "knowledge-graph", "recommendation", "reading-ecosystem", "ai-chat"],
        "external_services": {
            "neo4j": graph_backend,
            "elasticsearch": search_backend,
            "redis": cache.status(),
            "llm_enabled": bool(settings.OPENAI_COMPATIBLE_API_BASE and settings.OPENAI_API_KEY),
            "strict": {"neo4j": settings.REQUIRE_NEO4J, "elasticsearch": settings.REQUIRE_ELASTICSEARCH, "llm": settings.REQUIRE_LLM},
        },
    }
