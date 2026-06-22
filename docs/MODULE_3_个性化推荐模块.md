# 模块三：个性化推荐模块

> **负责人: C** | 标签: `模块三 · 个性化推荐`

---

## 你的职责

这是系统的**核心算法模块**，负责融合多源信号生成个性化推荐：

| 子模块 | 文档章节 | 核心功能 |
|--------|---------|---------|
| ItemCF 协同过滤 | 3.3.1 | 图书相似度矩阵、离线预计算 |
| 知识图谱推理推荐 | 3.3.2 | 调用模块二接口，合并多路径结果 |
| 混合推荐策略 | 3.3.3 | 四策略加权融合（可配置权重） |
| 推荐场景分发 | 3.3.4 | 首页/详情页/猜你喜欢/热门/新书 |
| 推荐理由生成 | 3.3.5 | 基于路径类型生成自然语言解释 |

---

## 你需要完成的文件

```
app/
├── schemas/recommend.py        ← Pydantic 模型 + 接口契约 (已完成骨架)
├── services/recommend_service.py ← ⭐ 推荐算法 (需要你实现)
└── api/v1/endpoints/recommend.py ← ⭐ API 端点 (需要你完善)
```

**已为你准备好的内容**:
- ✅ `schemas/recommend.py` — 含接口契约类 `UserProfileForRecommend` 和 `GraphPathsForRecommend`
- ✅ `services/recommend_service.py` — RecommendService 类框架，四种策略方法骨架+混合融合框架
- ✅ `api/v1/endpoints/recommend.py` — 5个推荐场景的路由

---

## 核心功能实现清单

### 3.3.1 ItemCF 协同过滤 ⭐

```python
def recommend_cf(self, top_n=20, exclude_ids=None) -> list[dict]:
    """
    步骤:
    1. 从 MySQL user_ratings 表构建 用户-图书评分矩阵
    2. 计算图书间余弦相似度: cos(A,B) = (A·B)/(|A|·|B|)
    3. 从用户高分图书出发，推荐 Top-N 相似图书
    
    优化:
    - 相似度矩阵离线预计算，存 Redis/文件，定时更新
    - 只计算热门图书的相似度（过滤评分<10的冷门书）
    """
```

**使用 scikit-learn**:
```python
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix

# 构建稀疏评分矩阵
# rows=users, cols=books, values=ratings
matrix = csr_matrix((ratings, (user_indices, book_indices)))
similarity = cosine_similarity(matrix.T)  # 图书间相似度
```

### 3.3.2 知识图谱推理推荐 ⭐

```python
def recommend_kg(self, top_n=20, exclude_ids=None) -> list[dict]:
    """
    对用户每个高分图书 → 调用 POST /api/v1/graph/paths
    → 合并多个源图书的候选结果
    → 按 final_score 排序去重
    """
```

**并行查询优化**: 用户有5本高分书 → 5次图谱查询 → 用 `asyncio.gather` 或线程池并发

### 3.3.3 混合推荐策略 ⭐

```python
def recommend_hybrid(self, top_n=20, weights=None, exclude_ids=None) -> list[dict]:
    """
    四种策略加权融合:
    
    final_score = kg_score × 0.4 + cf_score × 0.4 + hot_score × 0.1 + new_score × 0.1
    
    同一本书可能被多个策略命中 → 分数累加
    """
```

**权重配置** (可运行时通过 API 调整):
```python
class RecommendWeights:
    kg_weight: float = 0.4   # 知识图谱 - 可解释性强
    cf_weight: float = 0.4   # 协同过滤 - 精度高
    hot_weight: float = 0.1  # 热门推荐 - 冷启动
    new_weight: float = 0.1  # 新书推荐 - 时效性
```

### 3.3.4 推荐场景分发

| API | 场景 | 触发条件 |
|-----|------|---------|
| `GET /api/v1/recommend/home` | 首页个性化推荐 | 用户登录后 → 混合推荐；未登录 → 热门 |
| `GET /api/v1/recommend/similar/{book_id}` | 相似图书 (详情页) | 查看某本书时 → 纯图谱推荐 |
| `GET /api/v1/recommend/hot` | 热门推荐 | 全站 hot_score 排名 |
| `GET /api/v1/recommend/home?strategy=hybrid` | 策略切换 | 支持 `hybrid\|kg\|cf\|hot\|new` |

### 3.3.5 推荐理由生成

```python
@staticmethod
def generate_reason(book_title, path_info) -> str:
    """
    根据路径类型生成自然语言解释:
    - author:  "因为你也喜欢{作者名}的作品"
    - tag:     "这本书与{标签名}相关"
    - series:  "这本书属于{系列名}丛书"
    - cf:      "与你读过的高分图书相似"
    - hot:     "近期热门图书"
    - new:     "新书上架"
    """
```

---

## 你的上下游

```
模块一 (A) ──→ 你 ──→ 模块四 (D)
模块二 (B) ──→ 你
```

### 从 A 获取
```
GET /api/v1/user/profile
→ {tag_weights, favorite_author_ids, high_rated_book_ids}
```

### 从 B 获取
```
POST /api/v1/graph/paths {book_id: 101}
→ {candidates: [{book_id, paths, final_score}]}
```

### 提供给 D
```
GET /api/v1/recommend/home
→ {items: [{book, score, reason, reason_type}]}
```

---

## 开发策略 (最重要!)

**A 和 B 的接口没就绪之前，你完全可以独立开发！**

1. 在 `tests/` 下创建 `mock_data.py`:
```python
# 模拟模块一的画像数据
MOCK_USER_PROFILE = {
    "user_id": 1,
    "tag_weights": {"科幻": 0.85, "人工智能": 0.42},
    "favorite_author_ids": [1, 5],
    "high_rated_book_ids": [101, 201],
}

# 模拟模块二的图谱查询结果
MOCK_GRAPH_PATHS = {
    "source_book_id": 101,
    "candidates": [
        {"book_id": 104, "book_title": "流浪地球", "paths": [...], "final_score": 0.9},
    ]
}
```

2. 用 Mock 数据调通全部推荐逻辑
3. A 和 B 接口就绪后，只需替换 URL/函数调用，算法逻辑不用动

---

## 算法评估

建议实现离线评估指标：
- **Precision@N**: 推荐Top-N中用户实际感兴趣的占比
- **Recall@N**: 用户所有感兴趣图书中被推荐出的占比
- **Diversity**: 推荐列表的标签/作者多样性
- **Coverage**: 推荐覆盖的总图书比例
