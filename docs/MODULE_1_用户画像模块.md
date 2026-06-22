# 模块一：用户画像模块

> **负责人: A** | 标签: `模块一 · 用户画像`

---

## 你的职责

负责整个系统的**用户体系底座**，包括三大子模块：

| 子模块 | 文档章节 | 核心功能 |
|--------|---------|---------|
| 阅读行为采集 | 3.1.1 | 历史记录、搜索日志、收藏偏好、评分采集 |
| 用户兴趣建模 | 3.1.2 | 标签偏好向量、作者偏好、类别偏好、动态更新 |
| 阅读进度同步 | 3.1.3 | 多端同步、自动保存、阅读统计 |

---

## 你需要完成的文件

```
app/
├── models/user.py              ← 数据模型 (已完成骨架)
├── schemas/user.py             ← 请求/响应模型 (已完成骨架)
├── services/user_service.py    ← ⭐ 业务逻辑 (需要你实现)
└── api/v1/endpoints/user.py    ← ⭐ API 端点 (需要你完善)
```

**已为你准备好的内容**:
- ✅ `models/user.py` — 6张表的 SQLAlchemy 模型 (User, ReadingHistory, SearchLog, Bookmark, ReadingProgress, UserRating)
- ✅ `schemas/user.py` — 完整的 Pydantic 请求/响应模型
- ✅ `services/user_service.py` — 函数签名和基础框架
- ✅ `api/v1/endpoints/user.py` — 路由骨架

---

## 核心功能实现清单

### 3.1.1 阅读行为采集

#### 历史阅读记录
```python
# services/user_service.py
def record_reading_history(db, user_id, book_id, status):
    """用户阅读/想读/在读书籍的记录"""
    # status: "read" | "reading" | "want_to_read"
    # TODO: 实现去重逻辑（同一用户同一本书避免重复记录）
```

#### 搜索记录分析
```python
def record_search(db, user_id, keyword):
    """记录搜索关键词 → 用于后续标签偏好计算"""
    # TODO: 对关键词做分词/清洗，关联到标签体系
```

#### 收藏偏好
```python
def add_bookmark(db, user_id, book_id, shelf_name):
    """用户收藏图书到书架 → 分析偏好作者/类别"""
```

#### 评分与评论
```python
def rate_book(db, user_id, book_id, rating):
    """用户评分 (0.5~5.0) → 更新图书均分"""
```

### 3.1.2 用户兴趣建模 ⭐ 核心

这是模块三推荐引擎的**数据来源**，必须按约定格式输出：

```python
def build_user_profile(db, user_id) -> dict:
    """
    返回值格式 (与 UserProfileForRecommend 一致):
    {
        "user_id": 1,
        "tag_weights": {"科幻": 0.85, "历史": 0.15},   # 归一化到 0~1
        "favorite_author_ids": [1, 5],                # 按频次降序
        "favorite_tag_ids": [1, 7],                   # 按频次降序
        "high_rated_book_ids": [101, 203],            # 评分 >= 4.0
    }
    """
```

**实现要点**:
1. 从 `reading_history` + `bookmarks` 统计标签频次 → 归一化为权重
2. 从 `reading_history` 统计作者频次 → 取 top N
3. 从 `user_ratings` 筛选高分 (≥4.0) 的图书
4. 动态更新: 每次新行为触发重新计算（或设置定时更新）

### 3.1.3 阅读进度同步

```python
def update_reading_progress(db, user_id, book_id, percent, page):
    """保存进度 - 支持多端覆盖"""
    # 使用 MySQL 的 ON DUPLICATE KEY UPDATE 或 upsert 逻辑
```

**API 端点**:
| 方法 | 路径 | 功能 |
|------|------|------|
| POST | `/api/v1/user/register` | 注册 |
| POST | `/api/v1/user/login` | 登录 → 返回 JWT |
| GET | `/api/v1/user/profile` | 获取画像 (← 模块三调用) |
| POST | `/api/v1/user/history` | 记录阅读历史 |
| GET | `/api/v1/user/history` | 获取阅读历史 |
| POST | `/api/v1/user/bookmark` | 添加收藏 |
| DELETE | `/api/v1/user/bookmark/{id}` | 取消收藏 |
| POST | `/api/v1/user/rating` | 评分 |
| POST | `/api/v1/user/progress` | 更新阅读进度 |
| GET | `/api/v1/user/progress` | 获取全部进度 |
| GET | `/api/v1/user/stats` | 阅读统计 |

---

## 你依赖谁？

- **不依赖任何人** — 你的模块是系统的数据底座，其他模块依赖你
- 你需要在第1周内把用户注册/登录/JWT认证调通，其他人才能开发需要登录的功能

## 谁依赖你？

- **模块三 (C)** — 通过 `GET /api/v1/user/profile` 获取用户偏好
- **模块四 (D)** — 通过 JWT Token 认证用户身份
- **所有人** — 你的 `deps.py` 中的 `get_current_user()` 是全局依赖

---

## 技术要点

1. **JWT 认证**: 用 `python-jose` 生成 token，过期时间 24h
2. **密码哈希**: 用 `passlib[bcrypt]`，不要存明文
3. **标签偏好归一化**: 确保 `tag_weights` 的值加起来有意义（建议归一化到 0~1，代表该标签在所有用户行为中的占比）
4. **多端同步**: 用 `user_id + book_id` 作为唯一键 upsert
