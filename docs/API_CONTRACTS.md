# 模块间接口契约

> **重要**: 这是模块间的数据交换约定。各模块 `services/` 中的函数签名和 `schemas/` 中的 Pydantic 模型即为此契约的代码实现。**修改接口前必须与上下游成员沟通。**

---

## 契约1: 模块一 → 模块三 (用户画像 → 推荐引擎)

### 接口: `GET /api/v1/user/profile`

模块三通过此接口获取用户偏好以生成个性化推荐。

**响应格式**:
```json
{
  "user_id": 1,
  "tag_weights": {
    "科幻": 0.85,
    "人工智能": 0.42,
    "历史": 0.15
  },
  "favorite_author_ids": [1, 5, 23],
  "favorite_tag_ids": [1, 2, 7],
  "high_rated_book_ids": [101, 203, 405]
}
```

**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| `tag_weights` | dict[str, float] | 标签偏好权重，0.0~1.0，从阅读/收藏/搜索历史统计 |
| `favorite_author_ids` | list[int] | 高频阅读作者的 ID，按频次降序 |
| `favorite_tag_ids` | list[int] | 高频标签 ID |
| `high_rated_book_ids` | list[int] | 用户评分 ≥ 4.0 的图书 ID，作为种子 |

**负责人**: A | **消费者**: C

---

## 契约2: 模块二 → 模块三 (知识图谱 → 推荐引擎)

### 接口: `POST /api/v1/graph/paths`

模块三通过此接口获取图谱推理的候选图书。

**请求格式**:
```json
{
  "book_id": 101,
  "max_hops": 3,
  "top_k": 20,
  "author_weight": 1.0,
  "tag_weight": 0.8,
  "publisher_weight": 0.5,
  "series_weight": 0.6
}
```

**响应格式**:
```json
{
  "source_book_id": 101,
  "source_book_title": "三体",
  "candidates": [
    {
      "book_id": 104,
      "book_title": "流浪地球",
      "paths": [
        {
          "path_type": "author",
          "via": "刘慈欣",
          "hop_count": 1,
          "weight": 1.0
        },
        {
          "path_type": "tag",
          "via": "科幻",
          "hop_count": 1,
          "weight": 0.8
        }
      ],
      "final_score": 0.9
    }
  ]
}
```

**路径类型与默认权重**:
| path_type | 含义 | 默认权重 |
|-----------|------|---------|
| `author` | 同作者的其他作品 | 1.0 |
| `tag` | 同标签的其他图书 | 0.8 |
| `series` | 同一丛书系列 | 0.6 |
| `publisher` | 同出版社 | 0.5 |
| `author_tag` | 同作者→同标签（多跳） | 0.7 |

**负责人**: B | **消费者**: C

---

## 契约3: 模块三 → 模块四 (推荐引擎 → 阅读生态/前端)

### 接口: `GET /api/v1/recommend/home`

模块四（前端）通过此接口获取首页推荐列表。

**响应格式**:
```json
{
  "user_id": 1,
  "strategy": "hybrid",
  "items": [
    {
      "book": {
        "id": 104,
        "title": "流浪地球",
        "authors": ["刘慈欣"],
        "cover_url": "https://...",
        "avg_rating": 4.5,
        "tags": ["科幻"]
      },
      "score": 0.92,
      "reason": "因为你也喜欢刘慈欣的作品",
      "reason_type": "author"
    }
  ],
  "generated_at": "2026-06-22T10:30:00"
}
```

**负责人**: C | **消费者**: D（前端展示）

---

## 契约4: 模块一 → 模块四 (用户认证)

### 接口: JWT Token

所有需要登录的 API 请求在 Header 中携带:
```
Authorization: Bearer <jwt_token>
```

Token payload:
```json
{
  "sub": "1",
  "username": "reader123",
  "exp": 1750000000
}
```

**公共依赖**: `app/api/deps.py` 中的 `get_current_user()` 和 `get_current_user_optional()`

---

## 协作纪律

1. **Schemas 即契约** — `app/schemas/*.py` 中的 Pydantic 模型定义了精确的数据格式，修改即视为契约变更
2. **先沟通再改** — 修改以上任何接口前，在群内同步并更新本文档
3. **Mock 开发** — C 在 A、B 接口未完成前，使用 `tests/mock_data.py` 中的假数据开发
4. **接口版本化** — 如必须做破坏性变更，使用 `/api/v2/` 前缀，保留 v1 兼容
