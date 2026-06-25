"""数据库连接管理。

本可运行后端默认使用 SQLite，因此不需要先安装/启动 MySQL、Neo4j、Redis。
保留 Neo4j 和 Redis 的可选连接函数，便于后续替换为正式部署架构。
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import get_settings

settings = get_settings()

connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    echo=False,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


_neo4j_driver = None


def get_neo4j_driver():
    """可选 Neo4j driver。未安装 neo4j 或服务未启动时，调用方应捕获异常并降级。"""
    global _neo4j_driver
    if _neo4j_driver is None:
        from neo4j import GraphDatabase

        _neo4j_driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD),
        )
    return _neo4j_driver


def get_neo4j_session():
    driver = get_neo4j_driver()
    with driver.session() as session:
        yield session


_redis_client = None


def get_redis():
    """可选 Redis 客户端。"""
    global _redis_client
    if _redis_client is None:
        import redis

        _redis_client = redis.Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            decode_responses=True,
        )
    return _redis_client
