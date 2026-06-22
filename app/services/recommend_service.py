"""
═══════════════════════════════════════════════════════
【模块三 · 个性化推荐】服务层
  负责人: C
  职责:
    1. ItemCF 协同过滤推荐
    2. 知识图谱推理推荐
    3. 混合推荐策略融合
    4. 推荐理由生成
    5. 多场景推荐分发
═══════════════════════════════════════════════════════
"""
from typing import Optional
from app.core.config import get_settings
from app.schemas.recommend import (
    UserProfileForRecommend,
    GraphPathsForRecommend,
    RecommendWeights,
)

settings = get_settings()


class RecommendService:
    """
    推荐引擎
    三种策略独立计算 → 加权融合 → 生成推荐列表
    """

    def __init__(self, user_profile: UserProfileForRecommend,
                 graph_paths: Optional[GraphPathsForRecommend] = None):
        self.user_profile = user_profile
        self.graph_paths = graph_paths

    # ═══════════════════════════════════════════════════════
    # 策略1: 协同过滤 ItemCF (3.3.1)
    # ═══════════════════════════════════════════════════════

    def recommend_cf(self, top_n: int = 20, exclude_ids: list[int] = None) -> list[dict]:
        """
        基于物品的协同过滤
        步骤:
          1. 构建用户-图书评分矩阵
          2. 计算图书间余弦相似度
          3. 从用户高分图书出发，推荐相似图书
        """
        exclude = set(exclude_ids or [])
        high_rated = self.user_profile.high_rated_book_ids

        # TODO: 实现完整的 ItemCF
        # - 加载评分矩阵（从MySQL或Redis缓存）
        # - 计算 cosine similarity
        # - 按相似度 × 评分 排序
        return []

    # ═══════════════════════════════════════════════════════
    # 策略2: 知识图谱推理推荐 (3.3.2)
    # ═══════════════════════════════════════════════════════

    def recommend_kg(self, top_n: int = 20, exclude_ids: list[int] = None) -> list[dict]:
        """
        基于知识图谱的推理推荐
        调用模块二的图谱路径查询 → 合并多源路径结果
        """
        if not self.graph_paths:
            return []
        exclude = set(exclude_ids or [])
        candidates = self.graph_paths.candidates
        # 过滤已排除 + 按分数排序
        results = [
            c for c in candidates
            if c["book_id"] not in exclude
        ]
        results.sort(key=lambda x: x.get("final_score", 0), reverse=True)
        return results[:top_n]

    # ═══════════════════════════════════════════════════════
    # 策略3: 热门推荐 (冷启动保底)
    # ═══════════════════════════════════════════════════════

    def recommend_hot(self, top_n: int = 10, exclude_ids: list[int] = None) -> list[dict]:
        """
        基于热度分的推荐
        用于: 新用户冷启动 / 未登录用户 / 补充推荐列表
        """
        # TODO: 从MySQL/Redis查询 hot_score 最高的图书
        return []

    # ═══════════════════════════════════════════════════════
    # 策略4: 新书推荐 (时效性)
    # ═══════════════════════════════════════════════════════

    def recommend_new(self, top_n: int = 10, exclude_ids: list[int] = None) -> list[dict]:
        """
        新上架图书推荐
        """
        # TODO: 查询 is_new=True 的图书，按入库时间排序
        return []

    # ═══════════════════════════════════════════════════════
    # 混合推荐 (3.3.3)
    # ═══════════════════════════════════════════════════════

    def recommend_hybrid(
        self,
        top_n: int = 20,
        weights: Optional[RecommendWeights] = None,
        exclude_ids: list[int] = None,
    ) -> list[dict]:
        """
        混合推荐 - 四种策略加权融合
        """
        w = weights or RecommendWeights()
        exclude = exclude_ids or []

        # 各策略并行计算
        kg_results = self.recommend_kg(top_n, exclude)
        cf_results = self.recommend_cf(top_n, exclude)
        hot_results = self.recommend_hot(max(5, top_n // 2), exclude)
        new_results = self.recommend_new(max(5, top_n // 2), exclude)

        # 加权融合
        merged: dict[int, dict] = {}

        def _merge(source: list[dict], weight: float, strategy: str):
            for item in source:
                bid = item.get("book_id", id(item))
                if bid not in merged:
                    merged[bid] = {
                        "book_id": bid,
                        "book_title": item.get("book_title", ""),
                        "score": 0.0,
                        "reasons": [],
                    }
                merged[bid]["score"] += item.get("score", item.get("final_score", 0.5)) * weight
                if item.get("paths"):
                    merged[bid]["reasons"].extend(
                        [p.get("via", "") for p in item["paths"]]
                    )

        _merge(kg_results, w.kg_weight, "kg")
        _merge(cf_results, w.cf_weight, "cf")
        _merge(hot_results, w.hot_weight, "hot")
        _merge(new_results, w.new_weight, "new")

        # 排序
        results = sorted(merged.values(), key=lambda x: x["score"], reverse=True)
        return results[:top_n]

    # ═══════════════════════════════════════════════════════
    # 推荐理由生成 (3.3.5)
    # ═══════════════════════════════════════════════════════

    @staticmethod
    def generate_reason(book_title: str, path_info: dict) -> str:
        """
        根据图谱路径生成自然语言推荐理由
        """
        templates = {
            "author": f"因为你也喜欢 {path_info.get('via', '同一位作者')} 的作品",
            "tag": f"这本书和 {path_info.get('via', '你感兴趣的标签')} 相关",
            "series": f"这本书与 {path_info.get('via', '同一系列')} 属于同一丛书",
            "publisher": f"由 {path_info.get('via', '同一出版社')} 出版",
            "author_tag": f"基于你的阅读偏好为你推荐",
            "cf": "与你读过的高分图书相似",
            "hot": "近期热门图书",
            "new": "新书上架",
        }
        return templates.get(
            path_info.get("path_type", "cf"),
            f"为你推荐《{book_title}》"
        )
