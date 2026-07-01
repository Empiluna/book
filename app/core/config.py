from __future__ import annotations

from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "基于知识图谱的个性化荐书系统"
    API_V1_PREFIX: str = "/api/v1"
    SECRET_KEY: str = "book-system-dev-secret-change-me"
    ACCESS_TOKEN_EXPIRE_HOURS: int = 24
    DATABASE_URL: str = "mysql+pymysql://root:root123456@localhost:3306/book_system?charset=utf8mb4"
    CORS_ORIGINS: str = "*"
    SEED_ON_STARTUP: bool = True

    # Hybrid recommendation weights. Can be changed at runtime via admin API.
    RECOMMEND_KG_WEIGHT: float = 0.40
    RECOMMEND_CF_WEIGHT: float = 0.40
    RECOMMEND_HOT_WEIGHT: float = 0.10
    RECOMMEND_NEW_WEIGHT: float = 0.10
    ITEMCF_CACHE_TTL_SECONDS: int = 21600

    # Optional production-grade integrations. The app has safe fallbacks for local demo.
    NEO4J_URI: str | None = None
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password123"
    REDIS_URL: str | None = None
    ELASTICSEARCH_URL: str | None = None
    SEARCH_INDEX_NAME: str = "books"
    REQUIRE_NEO4J: bool = False
    REQUIRE_ELASTICSEARCH: bool = False
    REQUIRE_LLM: bool = False

    OPENAI_COMPATIBLE_API_BASE: str | None = None
    OPENAI_API_KEY: str | None = None
    LLM_MODEL: str = "gpt-4o-mini"
    LLM_TEMPERATURE: float = 0.1
    LLM_TIMEOUT_SECONDS: int = 15

    TRIAL_PAGES_ANONYMOUS: int = 3
    TRIAL_PAGES_LOGIN: int = 10
    MAX_SHELVES_PER_USER: int = 20

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
