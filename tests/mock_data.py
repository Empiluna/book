"""
═══════════════════════════════════════════════════════
Mock 数据 — 给模块三(C)独立开发使用

用途:
  在模块一(A)和模块二(B)的接口未完成时，
  C 可以用这些假数据独立开发和测试推荐算法。

使用方法:
  from tests.mock_data import MOCK_USER_PROFILE, MOCK_GRAPH_RESULT
  service = RecommendService(user_profile=MOCK_USER_PROFILE)
═══════════════════════════════════════════════════════
"""

# ── 模拟模块一的画像数据 ──
MOCK_USER_PROFILE = {
    "user_id": 1,
    "tag_weights": {
        "科幻": 0.85,
        "人工智能": 0.42,
        "历史": 0.15,
        "武侠": 0.10,
    },
    "favorite_author_ids": [1, 2, 5],    # 刘慈欣, 周志华, 东野圭吾
    "favorite_tag_ids": [1, 2, 6, 7],
    "high_rated_book_ids": [101, 102, 201],  # 三体, 三体2, 机器学习
}

# ── 模拟模块二的图谱查询结果 ──
MOCK_GRAPH_RESULT_101 = {
    "source_book_id": 101,
    "source_book_title": "三体",
    "candidates": [
        {
            "book_id": 102,
            "book_title": "三体II：黑暗森林",
            "paths": [
                {"path_type": "author", "via": "刘慈欣", "hop_count": 1, "weight": 1.0},
                {"path_type": "series", "via": "三体系列", "hop_count": 1, "weight": 0.6},
                {"path_type": "tag", "via": "科幻", "hop_count": 1, "weight": 0.8},
            ],
            "final_score": 2.4,
        },
        {
            "book_id": 103,
            "book_title": "三体III：死神永生",
            "paths": [
                {"path_type": "author", "via": "刘慈欣", "hop_count": 1, "weight": 1.0},
                {"path_type": "series", "via": "三体系列", "hop_count": 1, "weight": 0.6},
            ],
            "final_score": 1.6,
        },
        {
            "book_id": 104,
            "book_title": "流浪地球",
            "paths": [
                {"path_type": "author", "via": "刘慈欣", "hop_count": 1, "weight": 1.0},
                {"path_type": "tag", "via": "科幻", "hop_count": 1, "weight": 0.8},
                {"path_type": "similar", "via": "三体", "hop_count": 1, "weight": 0.7},
            ],
            "final_score": 2.5,
        },
    ],
}

MOCK_GRAPH_RESULT_201 = {
    "source_book_id": 201,
    "source_book_title": "机器学习",
    "candidates": [
        {
            "book_id": 202,
            "book_title": "深度学习入门",
            "paths": [
                {"path_type": "tag", "via": "人工智能", "hop_count": 1, "weight": 0.8},
                {"path_type": "tag", "via": "机器学习", "hop_count": 1, "weight": 0.8},
                {"path_type": "similar", "via": "机器学习", "hop_count": 1, "weight": 0.7},
            ],
            "final_score": 2.3,
        },
    ],
}

# ── 模拟推荐引擎输入 ──
# 用这些构建 UserProfileForRecommend 和 GraphPathsForRecommend
from app.schemas.recommend import UserProfileForRecommend

MOCK_USER_PROFILE_SCHEMA = UserProfileForRecommend(
    user_id=1,
    tag_weights=MOCK_USER_PROFILE["tag_weights"],
    favorite_author_ids=MOCK_USER_PROFILE["favorite_author_ids"],
    favorite_tag_ids=MOCK_USER_PROFILE["favorite_tag_ids"],
    high_rated_book_ids=MOCK_USER_PROFILE["high_rated_book_ids"],
)
