# 模块二：知识图谱模块

> **负责人: B** | 标签: `模块二 · 知识图谱`

---

## 你的职责

负责构建和维护**书籍知识图谱**，并为推荐引擎提供路径推理能力：

| 子模块 | 文档章节 | 核心功能 |
|--------|---------|---------|
| 知识图谱构建 | 3.2.1 | 实体导入、关系创建、数据维护 |
| 图谱查询与推理 | 3.2.2 | 多跳路径查询、路径权重计算、候选生成 |
| 图谱可视化 | 3.2.3 | 子图数据接口、统计信息 |

---

## 你需要完成的文件

```
app/
├── models/book.py              ← MySQL 图书相关模型 (已完成骨架)
├── schemas/book.py             ← Pydantic 模型 (已完成骨架)
├── services/graph_service.py   ← ⭐ Neo4j 图操作 (需要你实现)
└── api/v1/endpoints/graph.py   ← ⭐ API 端点 (需要你完善)

scripts/
└── init_neo4j.cypher           ← Neo4j 初始化脚本 (含示例数据)
```

**已为你准备好的内容**:
- ✅ `models/book.py` — Book, Author, Publisher, Tag, Series 的 SQLAlchemy 模型 + 多对多中间表
- ✅ `schemas/book.py` — GraphQueryRequest/Response, GraphPath 等 Pydantic 模型
- ✅ `services/graph_service.py` — GraphService 类 + 五条路径查询的 Cypher 模板
- ✅ `api/v1/endpoints/graph.py` — 图谱查询/管理/可视化路由骨架
- ✅ `scripts/init_neo4j.cypher` — 约束+示例数据（三体、机器学习等）

---

## 知识图谱 Schema

### 实体 (Node Labels)

```
(:Book {book_id, title, isbn, ...})
(:Author {author_id, name, bio, ...})
(:Tag {tag_id, name, category})
(:Publisher {publisher_id, name})
(:Series {series_id, name, description})
```

### 关系 (Relationship Types)

```
(Book)-[:AUTHORED]-(Author)     ← 注意: 用无向关系方便查询
(Book)-[:TAGGED]->(Tag)
(Book)-[:PUBLISHED]->(Publisher)
(Book)-[:SERIES_OF]->(Series)
(Book)-[:SIMILAR]->(Book)       ← 人工标注或算法计算的相似关系
```

### 可视化示意

```
        ┌──────────────┐
        │   刘慈欣     │ ← Author
        └──┬───┬───┬──┘
           │   │   │   AUTHORED
    ┌──────┘   │   └──────┐
    ▼          ▼          ▼
┌───────┐ ┌───────┐ ┌─────────┐
│ 三体  │ │黑暗森林│ │流浪地球  │ ← Book
└──┬────┘ └───┬───┘ └────┬────┘
   │          │          │
   │ TAGGED   │ TAGGED   │ TAGGED
   ▼          ▼          ▼
┌───────────────────────────┐
│          科幻             │ ← Tag
└───────────────────────────┘
```

---

## 核心功能实现清单

### 3.2.1 知识图谱构建

```python
# services/graph_service.py
class GraphService:
    @staticmethod
    def create_book_entity(session, book_id, title, **props):
        """MERGE 图书节点（幂等操作）"""
    
    @staticmethod
    def create_relation(session, source_type, source_id, rel, target_type, target_id):
        """建立两节点间的关系"""
```

**管理员 API**:
| 方法 | 路径 | 功能 |
|------|------|------|
| POST | `/api/v1/graph/entity` | 创建实体 |
| POST | `/api/v1/graph/relation` | 创建关系 |
| POST | `/api/v1/graph/init` | 初始化约束/索引 |

### 3.2.2 图谱查询与推理 ⭐ 核心

这是模块三推荐引擎的**直接依赖**，需要实现五条 Cypher 查询路径：

```python
@staticmethod
def find_paths(session, book_id, max_hops=3, top_k=20, path_weights=None) -> dict:
    """
    从给定图书出发，沿以下路径发现候选：
    1. 同作者路径:  Book → Author → Book     (权重 1.0)
    2. 同标签路径:  Book → Tag → Book         (权重 0.8)
    3. 同系列路径:  Book → Series → Book      (权重 0.6)
    4. 同出版社路径: Book → Publisher → Book   (权重 0.5)
    5. 多跳路径:    Book → Author → Book → Tag → Book (权重 0.7, hops>=2)
    
    返回: {source_book, candidates: [{book_id, title, paths, final_score}]}
    """
```

**实现要点**:
- 用参数化 Cypher 查询，不要拼接字符串（防注入）
- `final_score` = 所有路径权重之和（多路径到达同一本书权重更高）
- 排除源图书自身
- max_hops < 2 时跳过路径5
- 路径权重可通过 API 参数覆盖

**API**:
| 方法 | 路径 | 功能 |
|------|------|------|
| POST | `/api/v1/graph/paths` | **核心接口** — 图谱路径推理 (← 模块三调用) |

### 3.2.3 图谱辅助推荐

```python
@staticmethod
def get_subgraph(session, book_id, depth=2):
    """获取以某图书为中心的子图 → 前端 ECharts/D3.js 可视化"""
```

```python
@staticmethod
def get_stats(session) -> dict:
    """返回 {books: N, authors: N, tags: N, relations: N}"""
```

---

## 你依赖谁？

- **模块一 (A)** — 不直接依赖。但图谱的图书元数据（书名、作者名等）需要与 MySQL 中的 `books`、`authors` 表通过统一 ID 对应

## 谁依赖你？

- **模块三 (C)** — 通过 `POST /api/v1/graph/paths` 获取推理路径
- **模块四 (D)** — 图书详情面可能需要展示图谱关系（如"相关作者""相关标签"）

---

## 开发建议

1. **先本地跑起 Neo4j**: `docker-compose up -d neo4j` → 访问 http://localhost:7474
2. **跑通示例数据**: 执行 `scripts/init_neo4j.cypher` → 在 Neo4j Browser 中可视化验证
3. **逐条实现路径查询**: 先在 Neo4j Browser 中调试 Cypher，确认正确后再写入 `graph_service.py`
4. **测试**: 用 `POST /api/v1/graph/paths {"book_id": 101}` 验证能否返回《流浪地球》作为《三体》的推荐
