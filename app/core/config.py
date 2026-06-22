"""
应用配置中心
所有配置通过环境变量或 .env 文件加载，开发环境开箱即用
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # ── 应用基础 ──
    APP_NAME: str = "基于知识图谱的个性化荐书系统"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24小时

    # ── MySQL ──
    MYSQL_HOST: str = "localhost"
    MYSQL_PORT: int = 3306
    MYSQL_USER: str = "bookrec"
    MYSQL_PASSWORD: str = "bookrec123"
    MYSQL_DATABASE: str = "book_recommender"
    DATABASE_URL: str = ""

    # ── Neo4j ──
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password123"

    # ── Redis ──
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    # ── ElasticSearch ──
    ES_HOST: str = "http://localhost:9200"

    # ── 推荐系统参数 ──
    RECOMMEND_KG_WEIGHT: float = 0.4      # 知识图谱推荐权重
    RECOMMEND_CF_WEIGHT: float = 0.4       # 协同过滤权重
    RECOMMEND_HOT_WEIGHT: float = 0.1      # 热门推荐权重
    RECOMMEND_NEW_WEIGHT: float = 0.1      # 新书推荐权重
    RECOMMEND_TOP_N: int = 20              # 默认推荐列表长度
    SIMILARITY_THRESHOLD: float = 0.3      # 相似度阈值

    # ── 试读限制 ──
    TRIAL_PAGES_ANONYMOUS: int = 3         # 未登录试读页数
    TRIAL_PAGES_LOGGED_IN: int = 10        # 登录后试读页数

    model_config = dict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.DATABASE_URL:
            self.DATABASE_URL = (
                f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}"
                f"@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DATABASE}"
            )


@lru_cache()
def get_settings() -> Settings:
    return Settings()
