# app/services/recommend_integration_service.py
"""
模块三剩余增强功能：外部系统对接层

补齐前一版还没有真正落地的工程化能力：
1. Neo4j / Cypher 知识图谱推荐对接
2. Redis 推荐缓存对接
3. 推荐效果统计、准确率评估、A/B 测试
4. 用户画像服务对接适配

说明：没有安装 redis / neo4j 驱动时，代码会自动降级，不会影响主项目启动。
"""

from __future__ import annotations

import hashlib
import json
import time
from collections import Counter
from dataclasses import asdict, dataclass
from datetime import datetime
from typing import Any

try:
    import redis
except Exception:  # noqa: BLE001
    redis = None

try:
    from neo4j import GraphDatabase
except Exception:  # noqa: BLE001
    GraphDatabase = None


class RecommendCacheService:
    """
    Redis 推荐缓存服务。

    对应需求：推荐首次计算 <3s；缓存命中 <500ms；异常时返回预缓存结果。
    有 Redis 时使用 Redis，没有 Redis 时自动降级为内存缓存。
    """

    def __init__(self, redis_url: str = "redis://localhost:6379/0", prefix: str = "book:recommend", ttl_seconds: int = 300):
        self.redis_url = redis_url
        self.prefix = prefix
        self.ttl_seconds = ttl_seconds
        self.memory_cache: dict[str, dict[str, Any]] = {}
        self.client = None
        if redis is not None:
            try:
                self.client = redis.from_url(redis_url, decode_responses=True)
                self.client.ping()
            except Exception:  # noqa: BLE001
                self.client = None

    def build_key(self, user_id: int | None, scene: str, strategy: str, extra: str = "") -> str:
        raw = f"{user_id}:{scene}:{strategy}:{extra}"
        digest = hashlib.md5(raw.encode("utf-8")).hexdigest()
        return f"{self.prefix}:{digest}"

    def get(self, key: str) -> list[dict[str, Any]] | None:
        if self.client is not None:
            value = self.client.get(key)
            if not value:
                return None
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return None
        cached = self.memory_cache.get(key)
        if not cached:
            return None
        if time.time() - cached["created_at"] > self.ttl_seconds:
            self.memory_cache.pop(key, None)
            return None
        return cached["items"]

    def set(self, key: str, items: list[dict[str, Any]]) -> None:
        if self.client is not None:
            self.client.setex(key, self.ttl_seconds, json.dumps(items, ensure_ascii=False))
            return
        self.memory_cache[key] = {"created_at": time.time(), "items": items}


@dataclass
class GraphRecommendPath:
    source_book_id: int
    source_book_title: str
    target_book_id: int
    target_book_title: str
    path_type: str
    via: str
    weight: float


class Neo4jRecommendAdapter:
    """
    Neo4j 知识图谱推荐适配器。

    对应需求：使用 Cypher 从用户高分图书出发，沿作者、标签、出版社、系列、相似书籍关系发现候选推荐图书。
    """

    PATH_WEIGHTS = {
        "same_author": 1.0,
        "same_series": 0.9,
        "similar_book": 0.8,
        "same_tag": 0.7,
        "same_publisher": 0.4,
    }

    def __init__(self, uri: str = "bolt://localhost:7687", username: str = "neo4j", password: str = "password"):
        self.uri = uri
        self.username = username
        self.password = password
        self.driver = None
        if GraphDatabase is not None:
            try:
                self.driver = GraphDatabase.driver(uri, auth=(username, password))
                self.driver.verify_connectivity()
            except Exception:  # noqa: BLE001
                self.driver = None

    def close(self) -> None:
        if self.driver is not None:
            self.driver.close()

    def is_available(self) -> bool:
        return self.driver is not None

    def recommend_from_source_books(self, source_book_ids: list[int], exclude_book_ids: set[int] | None = None, top_n: int = 20) -> list[dict[str, Any]]:
        if not self.is_available():
            return []
        exclude_book_ids = exclude_book_ids or set()
        all_paths: list[GraphRecommendPath] = []
        with self.driver.session() as session:
            for source_book_id in source_book_ids:
                all_paths.extend(self._query_same_author(session, source_book_id))
                all_paths.extend(self._query_same_tag(session, source_book_id))
                all_paths.extend(self._query_same_publisher(session, source_book_id))
                all_paths.extend(self._query_same_series(session, source_book_id))
                all_paths.extend(self._query_similar_book(session, source_book_id))
        merged: dict[int, dict[str, Any]] = {}
        for path in all_paths:
            if path.target_book_id in exclude_book_ids:
                continue
            if path.target_book_id not in merged:
                merged[path.target_book_id] = {
                    "book_id": path.target_book_id,
                    "book_title": path.target_book_title,
                    "score": 0.0,
                    "source": "kg",
                    "reason_type": path.path_type,
                    "reason": f"根据知识图谱路径推荐《{path.target_book_title}》",
                    "reason_paths": [],
                    "paths": [],
                }
            item = merged[path.target_book_id]
            item["score"] += path.weight
            item["paths"].append(asdict(path))
            item["reason_paths"].append(self.path_to_text(path))
        results = list(merged.values())
        for item in results:
            path_count = len(item["paths"])
            item["score"] = round(item["score"] * (1.0 + 0.1 * (path_count - 1)), 6)
            item["reason_paths"] = list(dict.fromkeys(item["reason_paths"]))
        results.sort(key=lambda item: item["score"], reverse=True)
        return results[:top_n]

    def _query_same_author(self, session, source_book_id: int) -> list[GraphRecommendPath]:
        cypher = """
        MATCH (source:Book {id: $source_book_id})-[:WRITTEN_BY]->(a:Author)<-[:WRITTEN_BY]-(target:Book)
        WHERE target.id <> source.id
        RETURN source.id AS source_id, source.title AS source_title,
               target.id AS target_id, target.title AS target_title,
               a.name AS via
        LIMIT 50
        """
        return self._run_path_query(session, cypher, source_book_id, "same_author", self.PATH_WEIGHTS["same_author"])

    def _query_same_tag(self, session, source_book_id: int) -> list[GraphRecommendPath]:
        cypher = """
        MATCH (source:Book {id: $source_book_id})-[:HAS_TAG]->(t:Tag)<-[:HAS_TAG]-(target:Book)
        WHERE target.id <> source.id
        RETURN source.id AS source_id, source.title AS source_title,
               target.id AS target_id, target.title AS target_title,
               t.name AS via
        LIMIT 100
        """
        return self._run_path_query(session, cypher, source_book_id, "same_tag", self.PATH_WEIGHTS["same_tag"])

    def _query_same_publisher(self, session, source_book_id: int) -> list[GraphRecommendPath]:
        cypher = """
        MATCH (source:Book {id: $source_book_id})-[:PUBLISHED_BY]->(p:Publisher)<-[:PUBLISHED_BY]-(target:Book)
        WHERE target.id <> source.id
        RETURN source.id AS source_id, source.title AS source_title,
               target.id AS target_id, target.title AS target_title,
               p.name AS via
        LIMIT 50
        """
        return self._run_path_query(session, cypher, source_book_id, "same_publisher", self.PATH_WEIGHTS["same_publisher"])

    def _query_same_series(self, session, source_book_id: int) -> list[GraphRecommendPath]:
        cypher = """
        MATCH (source:Book {id: $source_book_id})-[:BELONGS_TO_SERIES]->(s:Series)<-[:BELONGS_TO_SERIES]-(target:Book)
        WHERE target.id <> source.id
        RETURN source.id AS source_id, source.title AS source_title,
               target.id AS target_id, target.title AS target_title,
               s.name AS via
        LIMIT 50
        """
        return self._run_path_query(session, cypher, source_book_id, "same_series", self.PATH_WEIGHTS["same_series"])

    def _query_similar_book(self, session, source_book_id: int) -> list[GraphRecommendPath]:
        cypher = """
        MATCH (source:Book {id: $source_book_id})-[:SIMILAR_TO]-(target:Book)
        WHERE target.id <> source.id
        RETURN source.id AS source_id, source.title AS source_title,
               target.id AS target_id, target.title AS target_title,
               '相似书籍关系' AS via
        LIMIT 50
        """
        return self._run_path_query(session, cypher, source_book_id, "similar_book", self.PATH_WEIGHTS["similar_book"])

    def _run_path_query(self, session, cypher: str, source_book_id: int, path_type: str, weight: float) -> list[GraphRecommendPath]:
        rows = session.run(cypher, source_book_id=source_book_id)
        return [
            GraphRecommendPath(
                source_book_id=int(row["source_id"]),
                source_book_title=str(row["source_title"]),
                target_book_id=int(row["target_id"]),
                target_book_title=str(row["target_title"]),
                path_type=path_type,
                via=str(row["via"]),
                weight=weight,
            )
            for row in rows
        ]

    @staticmethod
    def path_to_text(path: GraphRecommendPath) -> str:
        label_map = {"same_author": "同作者", "same_tag": "同标签", "same_publisher": "同出版社", "same_series": "同系列", "similar_book": "相似书籍"}
        return f"《{path.source_book_title}》 --{label_map.get(path.path_type, '图谱路径')}({path.via})--> 《{path.target_book_title}》"


class UserProfileAdapter:
    """用户画像适配器：模块一完成后可替换为真实画像服务调用。"""

    def build_profile_from_behaviors(self, books: list[dict[str, Any]], behaviors: list[dict[str, Any]], user_id: int) -> dict[str, Any]:
        book_map = {int(book["id"]): book for book in books}
        tag_counter: Counter[str] = Counter()
        author_counter: Counter[str] = Counter()
        category_counter: Counter[str] = Counter()
        keyword_counter: Counter[str] = Counter()
        high_rated_book_ids: list[int] = []
        behavior_weight = {"rating": 1.0, "collect": 1.2, "trial": 0.8, "click": 0.4, "view": 0.2, "comment": 1.0, "search": 0.8}
        for behavior in behaviors:
            if int(behavior.get("user_id", 0)) != int(user_id):
                continue
            behavior_type = behavior.get("type") or behavior.get("behavior_type")
            weight = behavior_weight.get(behavior_type, 0.1)
            if behavior_type == "search":
                keyword = behavior.get("keyword")
                if keyword:
                    keyword_counter[str(keyword)] += weight
                continue
            book_id = behavior.get("book_id")
            if book_id is None:
                continue
            book = book_map.get(int(book_id))
            if not book:
                continue
            score = float(behavior.get("score", 1.0))
            if behavior_type == "rating" and score >= 4:
                high_rated_book_ids.append(int(book_id))
                weight += score / 5.0
            for tag in book.get("tags", []):
                tag_counter[tag] += weight
            if book.get("author"):
                author_counter[book["author"]] += weight
            if book.get("category"):
                category_counter[book["category"]] += weight
        return {
            "user_id": user_id,
            "tag_weights": self._normalize_counter(tag_counter),
            "author_weights": self._normalize_counter(author_counter),
            "category_weights": self._normalize_counter(category_counter),
            "recent_keywords": [item[0] for item in keyword_counter.most_common(10)],
            "high_rated_book_ids": list(dict.fromkeys(high_rated_book_ids)),
        }

    @staticmethod
    def _normalize_counter(counter: Counter[str]) -> dict[str, float]:
        if not counter:
            return {}
        max_value = max(counter.values())
        if max_value <= 0:
            return {}
        return {key: round(value / max_value, 4) for key, value in counter.items()}


class RecommendExperimentService:
    """A/B 测试服务：给不同用户分配不同推荐权重。"""

    EXPERIMENTS = {
        "A": {"kg": 0.4, "cf": 0.4, "hot": 0.1, "new": 0.1},
        "B": {"kg": 0.55, "cf": 0.25, "hot": 0.1, "new": 0.1},
        "C": {"kg": 0.3, "cf": 0.5, "hot": 0.1, "new": 0.1},
    }

    def assign_group(self, user_id: int) -> str:
        groups = sorted(self.EXPERIMENTS.keys())
        index = int(hashlib.md5(str(user_id).encode("utf-8")).hexdigest(), 16) % len(groups)
        return groups[index]

    def get_experiment_info(self, user_id: int) -> dict[str, Any]:
        group = self.assign_group(user_id)
        return {"user_id": user_id, "group": group, "weights": self.EXPERIMENTS[group]}


class RecommendMetricsService:
    """推荐效果统计：曝光、点击、CTR、Precision@K。"""

    def summarize(self, exposure_logs: list[dict[str, Any]], click_logs: list[dict[str, Any]], behavior_logs: list[dict[str, Any]]) -> dict[str, Any]:
        exposure_count = sum(len(log.get("book_ids", [])) for log in exposure_logs)
        click_count = len(click_logs)
        ctr = click_count / exposure_count if exposure_count else 0.0
        behavior_counter = Counter(log.get("type") or log.get("behavior_type") for log in behavior_logs)
        return {
            "exposure_count": exposure_count,
            "click_count": click_count,
            "ctr": round(ctr, 4),
            "collect_count": behavior_counter.get("collect", 0),
            "trial_count": behavior_counter.get("trial", 0),
            "rating_count": behavior_counter.get("rating", 0),
            "comment_count": behavior_counter.get("comment", 0),
            "purchase_click_count": behavior_counter.get("purchase_click", 0),
            "not_interested_count": behavior_counter.get("not_interested", 0),
            "generated_at": datetime.now().isoformat(),
        }

    def precision_at_k(self, recommended_book_ids: list[int], positive_book_ids: set[int], k: int = 10) -> float:
        top_k = recommended_book_ids[:k]
        if not top_k:
            return 0.0
        hit_count = sum(1 for book_id in top_k if book_id in positive_book_ids)
        return round(hit_count / len(top_k), 4)

    def build_positive_book_ids(self, behavior_logs: list[dict[str, Any]], user_id: int) -> set[int]:
        positive = set()
        for log in behavior_logs:
            if int(log.get("user_id", 0)) != int(user_id):
                continue
            behavior_type = log.get("type") or log.get("behavior_type")
            book_id = log.get("book_id")
            if book_id is None:
                continue
            if behavior_type in {"click", "trial", "collect", "comment", "purchase_click"}:
                positive.add(int(book_id))
            if behavior_type == "rating" and float(log.get("score", 0)) >= 4:
                positive.add(int(book_id))
        return positive


def merge_external_kg_items_with_book_info(kg_items: list[dict[str, Any]], books: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Neo4j 返回 book_id，这里补充本地 book 信息，转成推荐接口可用格式。"""
    book_map = {int(book["id"]): book for book in books}
    results = []
    for item in kg_items:
        book_id = int(item["book_id"])
        book = book_map.get(book_id)
        if not book:
            continue
        results.append({
            "book": book,
            "score": float(item.get("score", 0.0)),
            "source": "kg",
            "reason_type": item.get("reason_type", "kg"),
            "reason": item.get("reason", "根据知识图谱路径推荐"),
            "reason_paths": item.get("reason_paths", []),
            "paths": item.get("paths", []),
        })
    return results
