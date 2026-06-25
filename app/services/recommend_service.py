# app/services/recommend_service.py
"""
模块三：个性化推荐服务层 V2

在原有 ItemCF、KG、混合推荐基础上，按新版需求说明书增加：
1. 分页 / 无限下拉 / 下拉刷新
2. 不感兴趣负反馈
3. 曝光、点击、行为回传
4. 推荐缓存 + 异常降级热门推荐
5. 近 30 天综合热门指标
6. 个性化新书排序
7. 猜你喜欢近期兴趣增强
8. 混合推荐权重可配置
9. 智能问答助手自然语言荐书接口
"""

from __future__ import annotations

import json
import math
import time
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any


class RecommendService:
    HYBRID_WEIGHTS: dict[str, float] = {"kg": 0.4, "cf": 0.4, "hot": 0.1, "new": 0.1}

    KG_PATH_WEIGHTS = {
        "same_author": 1.0,
        "same_series": 0.9,
        "similar_book": 0.8,
        "same_tag": 0.7,
        "same_category": 0.6,
        "same_publisher": 0.4,
    }

    ITEM_SIMILARITY_FILE = Path("data/item_similarity.json")
    CACHE_TTL_SECONDS = 300

    RECOMMEND_CACHE: dict[str, dict[str, Any]] = {}
    NEGATIVE_FEEDBACK: dict[int, dict[int, str]] = defaultdict(dict)
    BEHAVIOR_LOGS: list[dict[str, Any]] = []
    EXPOSURE_LOGS: list[dict[str, Any]] = []
    CLICK_LOGS: list[dict[str, Any]] = []

    BOOKS: list[dict[str, Any]] = [
        {
            "id": 1, "title": "三体", "author": "刘慈欣", "publisher": "重庆出版社",
            "tags": ["科幻", "宇宙", "中国科幻"], "category": "科幻", "series": "三体系列",
            "avg_rating": 9.3, "rating_count": 20000, "hot_score": 9800,
            "is_new": False, "created_at": "2024-01-10",
            "metrics_30d": {"view_count": 3800, "trial_count": 900, "favorite_count": 780, "comment_count": 260, "like_count": 1100, "purchase_click_count": 180},
        },
        {
            "id": 2, "title": "球状闪电", "author": "刘慈欣", "publisher": "四川科学技术出版社",
            "tags": ["科幻", "物理", "中国科幻"], "category": "科幻", "series": None,
            "avg_rating": 8.7, "rating_count": 12000, "hot_score": 7600,
            "is_new": False, "created_at": "2024-01-12",
            "metrics_30d": {"view_count": 2400, "trial_count": 580, "favorite_count": 430, "comment_count": 140, "like_count": 520, "purchase_click_count": 100},
        },
        {
            "id": 3, "title": "流浪地球", "author": "刘慈欣", "publisher": "中国华侨出版社",
            "tags": ["科幻", "宇宙", "短篇小说"], "category": "科幻", "series": None,
            "avg_rating": 8.5, "rating_count": 15000, "hot_score": 8300,
            "is_new": True, "created_at": "2024-02-01",
            "metrics_30d": {"view_count": 3000, "trial_count": 720, "favorite_count": 610, "comment_count": 210, "like_count": 760, "purchase_click_count": 130},
        },
        {
            "id": 4, "title": "银河帝国：基地", "author": "阿西莫夫", "publisher": "江苏文艺出版社",
            "tags": ["科幻", "银河", "经典"], "category": "科幻", "series": "银河帝国系列",
            "avg_rating": 9.0, "rating_count": 18000, "hot_score": 8700,
            "is_new": False, "created_at": "2024-03-01",
            "metrics_30d": {"view_count": 3100, "trial_count": 650, "favorite_count": 690, "comment_count": 230, "like_count": 880, "purchase_click_count": 150},
        },
        {
            "id": 5, "title": "深度学习入门", "author": "斋藤康毅", "publisher": "人民邮电出版社",
            "tags": ["人工智能", "Python", "深度学习"], "category": "编程", "series": None,
            "avg_rating": 8.8, "rating_count": 9000, "hot_score": 6900,
            "is_new": False, "created_at": "2024-04-01",
            "metrics_30d": {"view_count": 2600, "trial_count": 800, "favorite_count": 620, "comment_count": 150, "like_count": 730, "purchase_click_count": 210},
        },
        {
            "id": 6, "title": "机器学习", "author": "周志华", "publisher": "清华大学出版社",
            "tags": ["人工智能", "机器学习", "算法"], "category": "编程", "series": None,
            "avg_rating": 9.1, "rating_count": 16000, "hot_score": 8000,
            "is_new": False, "created_at": "2024-04-05",
            "metrics_30d": {"view_count": 3200, "trial_count": 850, "favorite_count": 720, "comment_count": 240, "like_count": 900, "purchase_click_count": 230},
        },
        {
            "id": 7, "title": "Python 编程：从入门到实践", "author": "Eric Matthes", "publisher": "人民邮电出版社",
            "tags": ["Python", "编程", "入门"], "category": "编程", "series": None,
            "avg_rating": 8.9, "rating_count": 14000, "hot_score": 7400,
            "is_new": True, "created_at": "2024-05-10",
            "metrics_30d": {"view_count": 2900, "trial_count": 920, "favorite_count": 700, "comment_count": 170, "like_count": 820, "purchase_click_count": 250},
        },
        {
            "id": 8, "title": "Python 深度学习", "author": "弗朗索瓦·肖莱", "publisher": "人民邮电出版社",
            "tags": ["人工智能", "Python", "深度学习"], "category": "编程", "series": None,
            "avg_rating": 8.9, "rating_count": 10000, "hot_score": 7900,
            "is_new": True, "created_at": "2024-06-21",
            "metrics_30d": {"view_count": 2700, "trial_count": 880, "favorite_count": 660, "comment_count": 190, "like_count": 810, "purchase_click_count": 240},
        },
        {
            "id": 9, "title": "明朝那些事儿", "author": "当年明月", "publisher": "中国海关出版社",
            "tags": ["历史", "明朝", "通俗历史"], "category": "历史", "series": None,
            "avg_rating": 9.2, "rating_count": 30000, "hot_score": 9000,
            "is_new": False, "created_at": "2024-06-01",
            "metrics_30d": {"view_count": 3500, "trial_count": 760, "favorite_count": 820, "comment_count": 300, "like_count": 980, "purchase_click_count": 170},
        },
        {
            "id": 10, "title": "万历十五年", "author": "黄仁宇", "publisher": "生活·读书·新知三联书店",
            "tags": ["历史", "明朝", "经典"], "category": "历史", "series": None,
            "avg_rating": 8.9, "rating_count": 25000, "hot_score": 8100,
            "is_new": False, "created_at": "2024-06-03",
            "metrics_30d": {"view_count": 2800, "trial_count": 620, "favorite_count": 650, "comment_count": 260, "like_count": 790, "purchase_click_count": 140},
        },
    ]

    USER_BEHAVIORS: list[dict[str, Any]] = [
        {"user_id": 1, "book_id": 1, "type": "rating", "score": 5.0, "created_at": "2026-06-21T10:00:00"},
        {"user_id": 1, "book_id": 2, "type": "collect", "score": 4.0, "created_at": "2026-06-22T10:00:00"},
        {"user_id": 1, "book_id": 4, "type": "rating", "score": 4.5, "created_at": "2026-06-23T10:00:00"},
        {"user_id": 1, "book_id": None, "type": "search", "score": 1.0, "keyword": "科幻", "created_at": "2026-06-24T10:00:00"},
        {"user_id": 2, "book_id": 5, "type": "rating", "score": 5.0, "created_at": "2026-06-22T09:00:00"},
        {"user_id": 2, "book_id": 6, "type": "rating", "score": 4.5, "created_at": "2026-06-23T09:00:00"},
        {"user_id": 2, "book_id": 7, "type": "collect", "score": 4.0, "created_at": "2026-06-24T09:00:00"},
        {"user_id": 2, "book_id": None, "type": "search", "score": 1.0, "keyword": "人工智能", "created_at": "2026-06-24T09:30:00"},
        {"user_id": 3, "book_id": 9, "type": "rating", "score": 5.0, "created_at": "2026-06-20T14:00:00"},
        {"user_id": 3, "book_id": 10, "type": "collect", "score": 4.0, "created_at": "2026-06-22T14:00:00"},
        # 协同行为
        {"user_id": 4, "book_id": 1, "type": "rating", "score": 5.0, "created_at": "2026-06-21T08:00:00"},
        {"user_id": 4, "book_id": 3, "type": "rating", "score": 4.5, "created_at": "2026-06-22T08:00:00"},
        {"user_id": 5, "book_id": 5, "type": "rating", "score": 5.0, "created_at": "2026-06-21T16:00:00"},
        {"user_id": 5, "book_id": 8, "type": "rating", "score": 4.5, "created_at": "2026-06-22T16:00:00"},
    ]

    SIMILAR_BOOK_EDGES = {1: [3, 4], 3: [1, 4], 5: [8, 6], 6: [5, 8], 9: [10], 10: [9]}

    def list_books(self) -> list[dict[str, Any]]:
        return self.BOOKS

    def list_behaviors(self) -> list[dict[str, Any]]:
        return self.USER_BEHAVIORS + self.BEHAVIOR_LOGS

    def get_book(self, book_id: int) -> dict[str, Any] | None:
        return next((book for book in self.BOOKS if int(book["id"]) == int(book_id)), None)

    @staticmethod
    def _parse_dt(value: str | None) -> datetime:
        if not value:
            return datetime.now()
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            return datetime.now()

    def get_user_behaviors(self, user_id: int) -> list[dict[str, Any]]:
        return [b for b in self.list_behaviors() if int(b.get("user_id", 0)) == int(user_id)]

    def get_recent_behaviors(self, user_id: int, days: int = 7) -> list[dict[str, Any]]:
        deadline = datetime.now() - timedelta(days=days)
        return [b for b in self.get_user_behaviors(user_id) if self._parse_dt(b.get("created_at")) >= deadline]

    def get_negative_feedback_book_ids(self, user_id: int) -> set[int]:
        return set(self.NEGATIVE_FEEDBACK.get(int(user_id), {}).keys())

    def get_user_interacted_book_ids(self, user_id: int) -> set[int]:
        ids = set()
        for behavior in self.get_user_behaviors(user_id):
            book_id = behavior.get("book_id")
            if book_id is not None and behavior.get("type") != "search":
                ids.add(int(book_id))
        return ids | self.get_negative_feedback_book_ids(user_id)

    def get_user_liked_books(self, user_id: int) -> list[dict[str, Any]]:
        liked = []
        behavior_score_map = {"rating": 1.0, "collect": 4.0, "trial": 3.0, "comment": 4.0, "click": 1.5, "view": 1.0}
        for behavior in self.get_user_behaviors(user_id):
            book_id = behavior.get("book_id")
            if book_id is None:
                continue
            behavior_type = behavior.get("type") or behavior.get("behavior_type")
            score = float(behavior.get("score", behavior_score_map.get(behavior_type, 1.0)))
            if behavior_type == "rating" and score < 4.0:
                continue
            if behavior_type not in behavior_score_map:
                continue
            book = self.get_book(int(book_id))
            if book:
                interest_score = score if behavior_type == "rating" else behavior_score_map[behavior_type]
                liked.append({"book": book, "interest_score": float(interest_score), "behavior_type": behavior_type})
        return liked

    def build_user_recommend_profile(self, user_id: int) -> dict[str, Any]:
        tag_counter, author_counter, category_counter, keyword_counter = Counter(), Counter(), Counter(), Counter()
        liked_book_ids = []
        for behavior in self.get_user_behaviors(user_id):
            behavior_type = behavior.get("type") or behavior.get("behavior_type")
            if behavior_type == "search" and behavior.get("keyword"):
                keyword_counter[str(behavior["keyword"])] += 2
                continue
            book_id = behavior.get("book_id")
            if book_id is None:
                continue
            book = self.get_book(int(book_id))
            if not book:
                continue
            weight = max(float(behavior.get("score", 1.0)), 1.0)
            liked_book_ids.append(int(book_id))
            tag_counter.update({tag: weight for tag in book.get("tags", [])})
            author_counter[book.get("author", "")] += weight
            category_counter[book.get("category", "")] += weight

        def norm(counter: Counter[str]) -> dict[str, float]:
            if not counter:
                return {}
            m = max(counter.values())
            return {k: round(v / m, 4) for k, v in counter.items() if k and m > 0}

        return {
            "user_id": user_id,
            "tag_weights": norm(tag_counter),
            "author_weights": norm(author_counter),
            "category_weights": norm(category_counter),
            "recent_keywords": [k for k, _ in keyword_counter.most_common(10)],
            "liked_book_ids": list(dict.fromkeys(liked_book_ids)),
            "negative_book_ids": list(self.get_negative_feedback_book_ids(user_id)),
        }

    @staticmethod
    def normalize(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
        if not items:
            return []
        max_score = max(float(item.get("score", 0.0)) for item in items)
        if max_score <= 0:
            return items
        return [{**item, "score": round(float(item.get("score", 0.0)) / max_score, 6)} for item in items]

    @staticmethod
    def sort_limit(items: list[dict[str, Any]], top_n: int) -> list[dict[str, Any]]:
        return sorted(items, key=lambda item: float(item.get("score", 0.0)), reverse=True)[:top_n]

    @staticmethod
    def paginate_items(items: list[dict[str, Any]], page: int, page_size: int) -> tuple[list[dict[str, Any]], dict[str, Any]]:
        total = len(items)
        start, end = (page - 1) * page_size, page * page_size
        return items[start:end], {"page": page, "page_size": page_size, "total": total, "has_more": end < total}

    @staticmethod
    def deduplicate_paths(paths: list[str]) -> list[str]:
        return list(dict.fromkeys(paths))

    def _cache_key(self, user_id: int, strategy: str, scene: str) -> str:
        return f"{scene}:{strategy}:user:{user_id}"

    def get_cached_recommendations(self, user_id: int, strategy: str, scene: str) -> list[dict[str, Any]] | None:
        cached = self.RECOMMEND_CACHE.get(self._cache_key(user_id, strategy, scene))
        if not cached:
            return None
        if time.time() - cached.get("created_at", 0) > self.CACHE_TTL_SECONDS:
            return None
        return cached.get("items", [])

    def set_cached_recommendations(self, user_id: int, strategy: str, scene: str, items: list[dict[str, Any]]) -> None:
        self.RECOMMEND_CACHE[self._cache_key(user_id, strategy, scene)] = {"created_at": time.time(), "items": items}

    def safe_recommend_home(self, user_id: int, strategy: str = "hybrid", top_n: int = 100, refresh: bool = False):
        start = time.perf_counter()
        meta = {"cache_hit": False, "fallback": False, "fallback_reason": None, "strategy": strategy, "refresh": refresh, "cost_ms": 0.0}
        if not refresh:
            cached = self.get_cached_recommendations(user_id, strategy, "home")
            if cached is not None:
                meta["cache_hit"] = True
                meta["cost_ms"] = round((time.perf_counter() - start) * 1000, 2)
                return cached[:top_n], meta
        try:
            items = self.recommend_home(user_id=user_id, strategy=strategy, top_n=top_n)
            self.set_cached_recommendations(user_id, strategy, "home", items)
            meta["cost_ms"] = round((time.perf_counter() - start) * 1000, 2)
            return items, meta
        except Exception as exc:
            cached = self.get_cached_recommendations(user_id, strategy, "home")
            if cached is not None:
                meta.update({"cache_hit": True, "fallback": True, "fallback_reason": f"推荐异常，返回缓存：{exc}"})
                meta["cost_ms"] = round((time.perf_counter() - start) * 1000, 2)
                return cached[:top_n], meta
            meta.update({"fallback": True, "fallback_reason": f"推荐异常，降级热门推荐：{exc}"})
            items = self.recommend_hot(top_n=top_n)
            meta["cost_ms"] = round((time.perf_counter() - start) * 1000, 2)
            return items, meta

    def get_weights(self) -> dict[str, float]:
        return dict(self.HYBRID_WEIGHTS)

    def update_weights(self, weights: dict[str, float]) -> dict[str, float]:
        total = sum(max(float(v), 0.0) for v in weights.values())
        if total <= 0:
            self.HYBRID_WEIGHTS = {"kg": 0.4, "cf": 0.4, "hot": 0.1, "new": 0.1}
        else:
            self.HYBRID_WEIGHTS = {k: round(max(float(weights.get(k, 0.0)), 0.0) / total, 6) for k in ["kg", "cf", "hot", "new"]}
        return self.get_weights()

    # ItemCF
    def build_user_book_matrix(self) -> dict[int, dict[int, float]]:
        matrix = defaultdict(dict)
        for behavior in self.list_behaviors():
            book_id = behavior.get("book_id")
            if book_id is None:
                continue
            if behavior.get("type") in {"not_interested", "search", "exposure"}:
                continue
            matrix[int(behavior["user_id"])][int(book_id)] = float(behavior.get("score", 1.0))
        return dict(matrix)

    def build_item_vectors(self) -> dict[int, dict[int, float]]:
        item_vectors = defaultdict(dict)
        for user_id, book_scores in self.build_user_book_matrix().items():
            for book_id, score in book_scores.items():
                item_vectors[int(book_id)][int(user_id)] = float(score)
        return dict(item_vectors)

    @staticmethod
    def cosine_similarity(vec1: dict[int, float], vec2: dict[int, float]) -> float:
        common_users = set(vec1.keys()) & set(vec2.keys())
        if not common_users:
            return 0.0
        dot = sum(vec1[u] * vec2[u] for u in common_users)
        norm1 = math.sqrt(sum(v * v for v in vec1.values()))
        norm2 = math.sqrt(sum(v * v for v in vec2.values()))
        return 0.0 if norm1 == 0 or norm2 == 0 else dot / (norm1 * norm2)

    def calculate_item_similarity_matrix(self) -> dict[int, dict[int, float]]:
        vectors = self.build_item_vectors()
        book_ids = [int(book["id"]) for book in self.BOOKS]
        matrix = {}
        for book_id in book_ids:
            matrix[book_id] = {}
            for other_id in book_ids:
                if book_id == other_id:
                    continue
                sim = self.cosine_similarity(vectors.get(book_id, {}), vectors.get(other_id, {}))
                if sim > 0:
                    matrix[book_id][other_id] = round(sim, 6)
        return matrix

    def precompute_item_similarity(self) -> dict[str, Any]:
        matrix = self.calculate_item_similarity_matrix()
        self.ITEM_SIMILARITY_FILE.parent.mkdir(parents=True, exist_ok=True)
        payload = {"generated_at": datetime.now().isoformat(), "matrix": {str(k): {str(kk): vv for kk, vv in v.items()} for k, v in matrix.items()}}
        self.ITEM_SIMILARITY_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"message": "ItemCF 图书相似度矩阵预计算完成", "saved_to": str(self.ITEM_SIMILARITY_FILE), "item_count": len(matrix), "pair_count": sum(len(v) for v in matrix.values())}

    def load_precomputed_item_similarity(self) -> dict[int, dict[int, float]]:
        if not self.ITEM_SIMILARITY_FILE.exists():
            return self.calculate_item_similarity_matrix()
        try:
            payload = json.loads(self.ITEM_SIMILARITY_FILE.read_text(encoding="utf-8"))
            return {int(k): {int(kk): float(vv) for kk, vv in v.items()} for k, v in payload.get("matrix", {}).items()}
        except Exception:
            return self.calculate_item_similarity_matrix()

    def get_item_similar_books(self, book_id: int, top_n: int = 10) -> list[dict[str, Any]]:
        source = self.get_book(book_id)
        if not source:
            return []
        items = []
        for target_id, score in self.load_precomputed_item_similarity().get(int(book_id), {}).items():
            target = self.get_book(target_id)
            if target:
                items.append({"book": target, "score": score, "source": "cf", "reason_type": "cf", "reason": self.generate_reason("cf", source, target), "reason_paths": [f"ItemCF: 《{source['title']}》 与 《{target['title']}》评分向量相似度={round(score,4)}"]})
        return self.sort_limit(self.normalize(items), top_n)

    def recommend_cf(self, user_id: int, top_n: int = 10) -> list[dict[str, Any]]:
        liked = self.get_user_liked_books(user_id)
        interacted = self.get_user_interacted_book_ids(user_id)
        if not liked:
            return self.recommend_hot(top_n)
        matrix = self.load_precomputed_item_similarity()
        scores, paths, sources = defaultdict(float), defaultdict(list), {}
        for item in liked:
            source = item["book"]
            for target_id, sim in matrix.get(int(source["id"]), {}).items():
                if target_id in interacted:
                    continue
                target = self.get_book(target_id)
                if not target:
                    continue
                scores[target_id] += float(item["interest_score"]) * sim
                sources.setdefault(target_id, source)
                paths[target_id].append(f"ItemCF: 你喜欢的《{source['title']}》 与 《{target['title']}》相似度={round(sim,4)}")
        items = []
        for book_id, score in scores.items():
            target = self.get_book(book_id)
            if target:
                items.append({"book": target, "score": score, "source": "cf", "reason_type": "cf", "reason": self.generate_reason("cf", sources[book_id], target), "reason_paths": self.deduplicate_paths(paths[book_id])})
        return self.sort_limit(self.normalize(items), top_n)

    # KG
    def _collect_kg_paths(self, source: dict[str, Any], target: dict[str, Any]) -> list[dict[str, Any]]:
        paths = []
        if source["author"] == target["author"]:
            paths.append({"type": "same_author", "via": source["author"], "weight": self.KG_PATH_WEIGHTS["same_author"]})
        for tag in sorted(set(source.get("tags", [])) & set(target.get("tags", []))):
            paths.append({"type": "same_tag", "via": tag, "weight": self.KG_PATH_WEIGHTS["same_tag"]})
        if source.get("category") and source.get("category") == target.get("category"):
            paths.append({"type": "same_category", "via": source["category"], "weight": self.KG_PATH_WEIGHTS["same_category"]})
        if source["publisher"] == target["publisher"]:
            paths.append({"type": "same_publisher", "via": source["publisher"], "weight": self.KG_PATH_WEIGHTS["same_publisher"]})
        if source.get("series") and source.get("series") == target.get("series"):
            paths.append({"type": "same_series", "via": source["series"], "weight": self.KG_PATH_WEIGHTS["same_series"]})
        if int(target["id"]) in self.SIMILAR_BOOK_EDGES.get(int(source["id"]), []):
            paths.append({"type": "similar_book", "via": "相似书籍关系", "weight": self.KG_PATH_WEIGHTS["similar_book"]})
        return paths

    @staticmethod
    def _best_kg_reason_type(paths: list[dict[str, Any]]) -> str:
        priority = {"same_author": 1, "same_series": 2, "similar_book": 3, "same_tag": 4, "same_category": 5, "same_publisher": 6}
        return min(paths, key=lambda p: priority.get(p["type"], 99))["type"]

    def recommend_kg(self, user_id: int, top_n: int = 10) -> list[dict[str, Any]]:
        liked = self.get_user_liked_books(user_id)
        interacted = self.get_user_interacted_book_ids(user_id)
        if not liked:
            return self.recommend_hot(top_n)
        scores, all_paths, sources = defaultdict(float), defaultdict(list), {}
        for item in liked:
            source = item["book"]
            for target in self.BOOKS:
                target_id = int(target["id"])
                if target_id == int(source["id"]) or target_id in interacted:
                    continue
                paths = self._collect_kg_paths(source, target)
                if not paths:
                    continue
                score = float(item["interest_score"]) * sum(p["weight"] for p in paths) * (1 + 0.1 * (len(paths)-1))
                scores[target_id] += score
                sources.setdefault(target_id, source)
                for p in paths:
                    all_paths[target_id].append({**p, "source_title": source["title"], "target_title": target["title"]})
        items = []
        for book_id, score in scores.items():
            target = self.get_book(book_id)
            if not target:
                continue
            reason_type = self._best_kg_reason_type(all_paths[book_id])
            items.append({"book": target, "score": score, "source": "kg", "reason_type": reason_type, "reason": self.generate_reason(reason_type, sources[book_id], target, all_paths[book_id]), "reason_paths": self.deduplicate_paths([self.path_to_text(p["source_title"], p["target_title"], p["type"], p["via"]) for p in all_paths[book_id]])})
        return self.sort_limit(self.normalize(items), top_n)

    # recent guess
    def build_recent_interest_profile(self, user_id: int, days: int = 7) -> dict[str, Any]:
        counters = {"tags": Counter(), "authors": Counter(), "categories": Counter(), "keywords": Counter()}
        type_weight = {"search": 1.5, "trial": 1.4, "collect": 1.3, "rating": 1.2, "click": 1.0, "view": 0.8}
        for b in self.get_recent_behaviors(user_id, days):
            t = b.get("type") or b.get("behavior_type")
            w = type_weight.get(t, 1.0)
            if t == "search" and b.get("keyword"):
                counters["keywords"][b["keyword"]] += w
                continue
            book = self.get_book(b.get("book_id")) if b.get("book_id") is not None else None
            if book:
                counters["authors"][book["author"]] += w
                counters["categories"][book["category"]] += w
                for tag in book.get("tags", []):
                    counters["tags"][tag] += w
        return {k: dict(v) for k, v in counters.items()}

    def recommend_recent_interest(self, user_id: int, top_n: int = 10) -> list[dict[str, Any]]:
        profile = self.build_recent_interest_profile(user_id)
        interacted = self.get_user_interacted_book_ids(user_id)
        items = []
        for book in self.BOOKS:
            if int(book["id"]) in interacted:
                continue
            score, reason_paths = 0.0, []
            for tag in book.get("tags", []):
                if tag in profile["tags"]:
                    score += profile["tags"][tag] * 0.7
                    reason_paths.append(f"近期兴趣: 最近关注过“{tag}”")
            if book["author"] in profile["authors"]:
                score += profile["authors"][book["author"]] * 1.0
                reason_paths.append(f"近期兴趣: 最近关注过作者 {book['author']}")
            if book["category"] in profile["categories"]:
                score += profile["categories"][book["category"]] * 0.6
                reason_paths.append(f"近期兴趣: 最近关注过“{book['category']}”类别")
            for keyword, weight in profile["keywords"].items():
                if keyword in book["title"] or keyword in book["author"] or keyword in book["category"] or any(keyword in tag for tag in book["tags"]):
                    score += weight * 0.8
                    reason_paths.append(f"近期搜索: 最近搜索过“{keyword}”")
            if score > 0:
                items.append({"book": book, "score": score, "source": "hybrid", "reason_type": "recent_interest", "reason": f"根据你最近的阅读、搜索和收藏行为，为你推荐《{book['title']}》", "reason_paths": self.deduplicate_paths(reason_paths)})
        return self.sort_limit(self.normalize(items), top_n) if items else self.recommend_hybrid(user_id, top_n)

    # hot new hybrid scenes
    @staticmethod
    def _norm_metric(value: float, max_value: float) -> float:
        return 0.0 if max_value <= 0 else value / max_value

    def calculate_hot_score(self, book: dict[str, Any], max_metrics: dict[str, float]):
        m = book.get("metrics_30d", {})
        score = (
            0.25 * self._norm_metric(float(m.get("view_count", 0)), max_metrics["view_count"]) +
            0.15 * self._norm_metric(float(m.get("trial_count", 0)), max_metrics["trial_count"]) +
            0.15 * self._norm_metric(float(m.get("favorite_count", 0)), max_metrics["favorite_count"]) +
            0.20 * (float(book.get("avg_rating", 0.0)) / 10.0) +
            0.10 * self._norm_metric(float(m.get("comment_count", 0)), max_metrics["comment_count"]) +
            0.05 * self._norm_metric(float(m.get("like_count", 0)), max_metrics["like_count"]) +
            0.10 * self._norm_metric(float(m.get("purchase_click_count", 0)), max_metrics["purchase_click_count"])
        )
        return score, [f"30天热度: 浏览={m.get('view_count',0)}, 试读={m.get('trial_count',0)}, 收藏={m.get('favorite_count',0)}, 评论={m.get('comment_count',0)}, 点赞={m.get('like_count',0)}, 购书点击={m.get('purchase_click_count',0)}, 评分={book.get('avg_rating',0)}"]

    def recommend_hot(self, top_n: int = 10):
        max_metrics = {}
        for key in ["view_count", "trial_count", "favorite_count", "comment_count", "like_count", "purchase_click_count"]:
            max_metrics[key] = max(float(b.get("metrics_30d", {}).get(key, 0)) for b in self.BOOKS) or 1.0
        items = []
        for book in self.BOOKS:
            score, paths = self.calculate_hot_score(book, max_metrics)
            items.append({"book": book, "score": score, "source": "hot", "reason_type": "hot", "reason": self.generate_reason("hot", target_book=book), "reason_paths": paths})
        return self.sort_limit(self.normalize(items), top_n)

    def calculate_new_book_score(self, book: dict[str, Any], user_profile: dict[str, Any] | None = None):
        m = book.get("metrics_30d", {})
        early = float(m.get("view_count", 0))*0.0001 + float(m.get("trial_count",0))*0.0002 + float(m.get("favorite_count",0))*0.0003
        created_at = self._parse_dt(str(book.get("created_at", "")))
        freshness = 1 / math.log(max((datetime.now()-created_at).days, 1) + 2)
        score = 0.45*(float(book.get("avg_rating",0))/10) + 0.25*early + 0.30*freshness
        paths = [f"新书排序: 入库时间={book.get('created_at')}, 初始评分={book.get('avg_rating')}, 早期互动={round(early,4)}"]
        if user_profile:
            for tag in book.get("tags", []):
                if tag in user_profile.get("tag_weights", {}):
                    score += 0.25 * user_profile["tag_weights"][tag]
                    paths.append(f"个性化新书: 命中标签偏好“{tag}”")
            if book["author"] in user_profile.get("author_weights", {}):
                score += 0.3 * user_profile["author_weights"][book["author"]]
                paths.append(f"个性化新书: 命中作者偏好 {book['author']}")
            if book["category"] in user_profile.get("category_weights", {}):
                score += 0.2 * user_profile["category_weights"][book["category"]]
                paths.append(f"个性化新书: 命中类别偏好“{book['category']}”")
        return score, paths

    def recommend_new(self, user_id: int | None = None, top_n: int = 10):
        profile = self.build_user_recommend_profile(user_id) if user_id else None
        negative = self.get_negative_feedback_book_ids(user_id) if user_id else set()
        items = []
        for book in [b for b in self.BOOKS if b.get("is_new")]:
            if int(book["id"]) in negative:
                continue
            score, paths = self.calculate_new_book_score(book, profile)
            items.append({"book": book, "score": score, "source": "new", "reason_type": "new", "reason": self.generate_reason("new", target_book=book), "reason_paths": paths})
        return self.sort_limit(self.normalize(items), top_n)

    def recommend_hybrid(self, user_id: int, top_n: int = 10):
        sources = {
            "kg": self.recommend_kg(user_id, top_n*2),
            "cf": self.recommend_cf(user_id, top_n*2),
            "hot": self.recommend_hot(top_n*2),
            "new": self.recommend_new(user_id, top_n*2),
        }
        merged = {}
        for source_name, items in sources.items():
            weight = self.HYBRID_WEIGHTS.get(source_name, 0)
            for item in items:
                book_id = int(item["book"]["id"])
                if book_id not in merged:
                    merged[book_id] = {"book": item["book"], "score": 0, "source": "hybrid", "sources": [], "reason": item["reason"], "reason_type": item.get("reason_type", source_name), "reason_paths": []}
                merged[book_id]["score"] += float(item["score"]) * weight
                merged[book_id]["sources"].append(source_name)
                merged[book_id]["reason_paths"].extend(item.get("reason_paths", []))
                if source_name == "kg" or (source_name == "cf" and "kg" not in merged[book_id]["sources"]):
                    merged[book_id]["reason"] = item["reason"]
                    merged[book_id]["reason_type"] = item.get("reason_type", source_name)
        results = list(merged.values())
        for item in results:
            item["score"] = round(float(item["score"]), 6)
            item["reason_paths"] = self.deduplicate_paths(item["reason_paths"])
        return self.sort_limit(results, top_n)

    def recommend_home(self, user_id: int, strategy: str = "hybrid", top_n: int = 10):
        if strategy == "cf":
            return self.recommend_cf(user_id, top_n)
        if strategy == "kg":
            return self.recommend_kg(user_id, top_n)
        if strategy == "hot":
            return self.recommend_hot(top_n)
        if strategy == "new":
            return self.recommend_new(user_id, top_n)
        return self.recommend_hybrid(user_id, top_n)

    def recommend_guess_you_like(self, user_id: int, top_n: int = 10):
        recent = self.recommend_recent_interest(user_id, top_n)
        if len(recent) >= top_n:
            return recent
        hybrid = self.recommend_hybrid(user_id, top_n*2)
        seen = {int(x["book"]["id"]) for x in recent}
        for item in hybrid:
            if int(item["book"]["id"]) not in seen:
                recent.append(item)
                seen.add(int(item["book"]["id"]))
            if len(recent) >= top_n:
                break
        return recent

    def recommend_similar_book(self, book_id: int, top_n: int = 10):
        source = self.get_book(book_id)
        if not source:
            return []
        kg_items = []
        for target in self.BOOKS:
            if int(target["id"]) == int(book_id):
                continue
            paths = self._collect_kg_paths(source, target)
            if paths:
                rtype = self._best_kg_reason_type(paths)
                kg_items.append({"book": target, "score": sum(p["weight"] for p in paths), "source": "kg", "reason_type": rtype, "reason": self.generate_reason(rtype, source, target, paths), "reason_paths": [self.path_to_text(source["title"], target["title"], p["type"], p["via"]) for p in paths]})
        cf_items = self.get_item_similar_books(book_id, top_n*2)
        merged = {}
        for items, weight in [(self.normalize(kg_items), 0.6), (cf_items, 0.4)]:
            for item in items:
                bid = int(item["book"]["id"])
                if bid not in merged:
                    merged[bid] = {**item, "score": 0}
                merged[bid]["score"] += float(item["score"]) * weight
                merged[bid]["reason_paths"] = self.deduplicate_paths(merged[bid].get("reason_paths", []) + item.get("reason_paths", []))
        return self.sort_limit(list(merged.values()), top_n)

    # behavior
    def clear_user_cache(self, user_id: int) -> None:
        for key in [k for k in self.RECOMMEND_CACHE if k.endswith(f"user:{int(user_id)}")]:
            self.RECOMMEND_CACHE.pop(key, None)

    def add_negative_feedback(self, user_id: int, book_id: int, reason: str | None = None):
        self.NEGATIVE_FEEDBACK[int(user_id)][int(book_id)] = reason or "用户不感兴趣"
        self.clear_user_cache(user_id)
        return {"user_id": int(user_id), "book_id": int(book_id), "reason": reason or "用户不感兴趣"}

    def record_behavior(self, user_id: int, behavior_type: str, book_id: int | None = None, score: float = 1.0, keyword: str | None = None, extra: dict[str, str] | None = None):
        record = {"user_id": int(user_id), "book_id": int(book_id) if book_id is not None else None, "type": behavior_type, "score": float(score), "keyword": keyword, "extra": extra or {}, "created_at": datetime.now().isoformat()}
        self.BEHAVIOR_LOGS.append(record)
        if behavior_type == "not_interested" and book_id is not None:
            self.add_negative_feedback(user_id, book_id, (extra or {}).get("reason"))
        self.clear_user_cache(user_id)
        return record

    def record_exposure(self, user_id: int, book_ids: list[int], scene: str = "home", strategy: str = "hybrid"):
        record = {"user_id": int(user_id), "book_ids": [int(x) for x in book_ids], "scene": scene, "strategy": strategy, "created_at": datetime.now().isoformat()}
        self.EXPOSURE_LOGS.append(record)
        return record

    def record_click(self, user_id: int, book_id: int, scene: str = "home", strategy: str = "hybrid"):
        record = {"user_id": int(user_id), "book_id": int(book_id), "scene": scene, "strategy": strategy, "created_at": datetime.now().isoformat()}
        self.CLICK_LOGS.append(record)
        self.record_behavior(user_id, "click", book_id, 1.5, extra={"scene": scene, "strategy": strategy})
        return record

    def recommend_by_natural_query(self, query: str, user_id: int | None = None, top_n: int = 10):
        query = query.strip()
        if not query:
            return self.recommend_hot(top_n)
        for book in self.BOOKS:
            if book["title"] in query:
                return self.recommend_similar_book(int(book["id"]), top_n)
        items = []
        for book in self.BOOKS:
            score, paths = 0.0, []
            if book["author"] in query:
                score += 1.0; paths.append(f"自然语言荐书: 命中作者 {book['author']}")
            if book["category"] in query:
                score += 0.8; paths.append(f"自然语言荐书: 命中类别“{book['category']}”")
            for tag in book["tags"]:
                if tag in query:
                    score += 0.9; paths.append(f"自然语言荐书: 命中标签“{tag}”")
            if "入门" in query and "入门" in book["tags"]:
                score += 0.7; paths.append("自然语言荐书: 命中“入门”需求")
            if score > 0:
                items.append({"book": book, "score": score, "source": "hybrid", "reason_type": "nl", "reason": f"根据你的自然语言需求“{query}”，推荐《{book['title']}》", "reason_paths": paths})
        if items:
            return self.sort_limit(self.normalize(items), top_n)
        return self.recommend_hybrid(user_id, top_n) if user_id else self.recommend_hot(top_n)

    def generate_reason(self, reason_type: str, source_book: dict[str, Any] | None = None, target_book: dict[str, Any] | None = None, paths=None):
        target_title = target_book["title"] if target_book else "这本书"
        if reason_type == "same_author" and source_book and target_book:
            return f"因为你喜欢《{source_book['title']}》，所以推荐同作者{source_book['author']}的《{target_book['title']}》"
        if reason_type == "same_tag" and source_book and target_book:
            tags = "、".join(sorted(set(source_book["tags"]) & set(target_book["tags"])))
            return f"因为你喜欢《{source_book['title']}》，它和《{target_book['title']}》都包含“{tags}”标签"
        if reason_type == "same_category" and source_book and target_book:
            return f"因为你喜欢《{source_book['title']}》，所以推荐同类别“{source_book.get('category')}”的《{target_book['title']}》"
        if reason_type == "same_publisher" and source_book and target_book:
            return f"因为你喜欢《{source_book['title']}》，所以推荐同出版社{source_book['publisher']}的《{target_book['title']}》"
        if reason_type == "same_series" and source_book and target_book:
            return f"因为你喜欢《{source_book['title']}》，所以推荐同系列“{source_book.get('series')}”中的《{target_book['title']}》"
        if reason_type == "similar_book" and source_book and target_book:
            return f"《{target_book['title']}》与《{source_book['title']}》存在相似书籍关系，因此推荐给你"
        if reason_type == "cf" and source_book and target_book:
            return f"根据协同过滤，与你喜欢《{source_book['title']}》的用户行为相似，因此推荐《{target_book['title']}》"
        if reason_type == "hot":
            return f"《{target_title}》近 30 天热度、评分和互动表现较好"
        if reason_type == "new":
            return f"《{target_title}》是最近上架的新书，并结合评分、早期互动和你的兴趣进行推荐"
        return f"根据你的阅读兴趣，为你推荐《{target_title}》"

    @staticmethod
    def path_to_text(source_title: str, target_title: str, path_type: str, via: str) -> str:
        mapping = {
            "same_author": "同作者", "same_tag": "同标签", "same_category": "同类别",
            "same_publisher": "同出版社", "same_series": "同系列", "similar_book": "相似书籍",
        }
        name = mapping.get(path_type, "图谱路径")
        return f"《{source_title}》 --{name}({via})--> 《{target_title}》"

    def get_feature_coverage(self):
        return [
            {"feature": "首页推荐分页/刷新/缓存/降级", "implemented_in": "recommend_service.py -> safe_recommend_home(), paginate_items(); endpoints/recommend.py -> home_recommend()", "api": "GET /api/v1/recommend/home?page=1&page_size=10&refresh=false", "description": "支持无限下拉、下拉刷新、缓存命中、异常热门降级。"},
            {"feature": "负反馈", "implemented_in": "recommend_service.py -> add_negative_feedback(), get_negative_feedback_book_ids()", "api": "POST /api/v1/recommend/feedback/not-interested", "description": "记录不感兴趣图书，后续推荐过滤。"},
            {"feature": "曝光/点击/行为回传", "implemented_in": "recommend_service.py -> record_exposure(), record_click(), record_behavior()", "api": "POST /api/v1/recommend/exposure; /click; /behavior", "description": "回传隐性反馈，清理缓存，动态影响推荐。"},
            {"feature": "猜你喜欢近期兴趣增强", "implemented_in": "recommend_service.py -> build_recent_interest_profile(), recommend_recent_interest(), recommend_guess_you_like()", "api": "GET /api/v1/recommend/guess", "description": "基于近期搜索、试读、收藏、评分、点击生成推荐。"},
            {"feature": "30天热门推荐", "implemented_in": "recommend_service.py -> calculate_hot_score(), recommend_hot()", "api": "GET /api/v1/recommend/hot", "description": "综合浏览、试读、收藏、评分、评论、点赞、购书跳转。"},
            {"feature": "个性化新书推荐", "implemented_in": "recommend_service.py -> calculate_new_book_score(), recommend_new()", "api": "GET /api/v1/recommend/new?user_id=1", "description": "结合入库时间、早期互动和用户画像匹配。"},
            {"feature": "混合推荐权重可配置", "implemented_in": "recommend_service.py -> get_weights(), update_weights()", "api": "GET/PUT /api/v1/recommend/weights", "description": "支持运行时调整 KG/CF/热门/新书权重。"},
            {"feature": "智能问答自然语言荐书", "implemented_in": "recommend_service.py -> recommend_by_natural_query()", "api": "POST /api/v1/recommend/nl", "description": "规则版识别书名、作者、标签、类别并生成推荐。"},
        ]
