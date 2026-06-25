"""应用配置中心。

默认使用 SQLite，便于直接运行后端；如需切换 MySQL，可在 .env 中配置 DATABASE_URL。
"""

from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "基于知识图谱的个性化荐书系统"
    APP_VERSION: str = "1.1.0-module1-ai-advanced"
    DEBUG: bool = True

    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    # 直接运行默认使用 SQLite；部署时可改成 MySQL：mysql+pymysql://user:pass@host:3306/db
    DATABASE_URL: str = "sqlite:///./book_backend.db"

    # 可选中间件。演示版不强制依赖 Neo4j/Redis/ES 服务可用。
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password123"
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    ES_HOST: str = "http://localhost:9200"

    # 推荐融合权重
    RECOMMEND_KG_WEIGHT: float = 0.4
    RECOMMEND_CF_WEIGHT: float = 0.4
    RECOMMEND_HOT_WEIGHT: float = 0.1
    RECOMMEND_NEW_WEIGHT: float = 0.1
    RECOMMEND_TOP_N: int = 20

    # LLM：未配置 API KEY 时，智能助手自动走本地规则与模板回答。
    LLM_API_KEY: str = ""
    LLM_MODEL: str = "gpt-4o-mini"
    LLM_BASE_URL: str = ""
    LLM_MAX_HISTORY: int = 50
    LLM_TEMPERATURE: float = 0.4

    TRIAL_PAGES_ANONYMOUS: int = 3
    TRIAL_PAGES_LOGGED_IN: int = 10

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


@lru_cache()
def get_settings() -> Settings:
    return Settings()
