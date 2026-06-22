"""
数据库连接管理
- MySQL: SQLAlchemy (同步用于 Alembic，异步用于 FastAPI)
- Neo4j: 官方 Python driver
- Redis: redis-py
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from neo4j import GraphDatabase
from app.core.config import get_settings

settings = get_settings()

# ═══════════════════════════════════════════
# MySQL
# ═══════════════════════════════════════════
engine = create_engine(
    settings.DATABASE_URL,
    pool_size=20,
    max_overflow=40,
    pool_pre_ping=True,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI 依赖注入：获取 MySQL 会话"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ═══════════════════════════════════════════
# Neo4j
# ═══════════════════════════════════════════
_neo4j_driver = None


def get_neo4j_driver():
    """获取 Neo4j driver（单例）"""
    global _neo4j_driver
    if _neo4j_driver is None:
        _neo4j_driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD),
        )
    return _neo4j_driver


def get_neo4j_session():
    """FastAPI 依赖注入：获取 Neo4j 会话"""
    driver = get_neo4j_driver()
    with driver.session() as session:
        yield session


# ═══════════════════════════════════════════
# Redis
# ═══════════════════════════════════════════
import redis as _redis

_redis_client = None


def get_redis():
    """获取 Redis 客户端（单例）"""
    global _redis_client
    if _redis_client is None:
        _redis_client = _redis.Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            decode_responses=True,
        )
    return _redis_client
