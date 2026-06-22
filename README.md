# 基于知识图谱的个性化荐书系统

## 项目简介

面向数字化阅读场景，构建用户阅读画像与书籍知识图谱，通过协同过滤与知识图谱推理实现精准的个性化图书推荐。

## 团队分工

| 成员 | 模块 | 核心内容 | 后端代码 | 前端代码 (uni-app) |
|------|------|---------|---------|---------|
| **A** | 模块一：用户画像 | 阅读行为采集、兴趣建模、进度同步 | `app/models/user.py` `app/services/user_service.py` `app/api/v1/endpoints/user.py` | `utils/auth.js` `pages/login/` `pages/profile/` |
| **B** | 模块二：知识图谱 | Neo4j实体关系、路径推理、可视化 | `app/models/book.py` `app/services/graph_service.py` `app/api/v1/endpoints/graph.py` | `pages/admin/`(图谱) `pages/detail/`(图谱) |
| **C** | 模块三：个性化推荐 | ItemCF、图谱推理、混合策略、推荐解释 | `app/services/recommend_service.py` `app/api/v1/endpoints/recommend.py` | `pages/index/` `pages/detail/`(相似推荐) |
| **D** | 模块四：阅读生态 | 试读、书评、购书链接、书架管理 | `app/models/ecosystem.py` `app/services/ecosystem_service.py` `app/api/v1/endpoints/ecosystem.py` | `components/comment-list.vue` `pages/shelf/` `pages/detail/`(试读/购书/评论) `pages/admin/`(购书) |
| **ALL** | 共用基础设施 | 配置、数据库、路由、安全 | `app/core/` `app/main.py` `app/api/deps.py` | `api/index.js` `utils/request.js` `store/index.js` `components/book-card.vue` `manifest.json` `pages.json` |

## 技术栈

| 组件 | 技术 | 版本 |
|------|------|------|
| 后端框架 | FastAPI | 0.115 |
| 前端 | uni-app (Vue 3) | 3.x |
| 关系数据库 | MySQL | 8.0 |
| 图数据库 | Neo4j | 5.23 |
| ORM | SQLAlchemy | 2.0 |
| 缓存 | Redis | 7 |
| 搜索引擎 | ElasticSearch | 8.15 |
| 机器学习 | scikit-learn | 1.5 |

## 快速开始

### 1. 启动基础设施

```bash
docker-compose up -d
```

这将在后台启动 MySQL、Neo4j、Redis、ElasticSearch。

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

### 3. 导入图书数据

```bash
# 48本中文图书 → MySQL + Neo4j
python scripts/import_books.py

# 可选: 从 Open Library 扩展
python scripts/import_books.py --openlibrary
```

### 4. 启动后端

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. 启动前端

```bash
# 开发调试 — 零配置，双击即开
open frontend/index.html

# 或通过 Python 静态服务器
cd frontend && python -m http.server 3000
```

用 [HBuilderX](https://www.dcloud.io/hbuilderx.html) 打开 `frontend-uni/` 可编译为 Android/iOS/小程序。

### 6. 访问

- **H5 前端**: http://localhost:3000
- **Swagger API 文档**: http://localhost:8000/docs
- **Neo4j Browser**: http://localhost:7474 (neo4j / password123)

## 项目结构

```
.
├── app/
│   ├── main.py                  # FastAPI 入口
│   ├── core/
│   │   ├── config.py            # 全局配置
│   │   ├── database.py          # MySQL/Neo4j/Redis 连接
│   │   └── security.py          # JWT + 密码哈希
│   ├── models/                  # SQLAlchemy 数据模型
│   │   ├── user.py              # 用户/行为/收藏/进度 (模块一)
│   │   ├── book.py              # 图书/作者/标签/出版社 (模块二)
│   │   └── ecosystem.py         # 书评/点赞 (模块四)
│   ├── schemas/                 # Pydantic 请求/响应模型
│   │   ├── user.py              # (模块一)
│   │   ├── book.py              # (模块二)
│   │   ├── recommend.py         # (模块三) 含接口契约
│   │   └── ecosystem.py         # (模块四)
│   ├── services/                # 业务逻辑层
│   │   ├── user_service.py      # (模块一)
│   │   ├── graph_service.py     # (模块二)
│   │   ├── recommend_service.py # (模块三)
│   │   └── ecosystem_service.py # (模块四)
│   └── api/
│       ├── deps.py              # 依赖注入 (认证/权限)
│       └── v1/
│           ├── router.py        # 总路由
│           └── endpoints/
│               ├── user.py      # (模块一)
│               ├── graph.py     # (模块二)
│               ├── recommend.py # (模块三)
│               └── ecosystem.py # (模块四)
├── frontend/                     # ⚡ 开发调试用 (纯HTML，双击即开，秒级刷新)
│   ├── index.html
│   ├── css/ js/
│   └── README.md
├── frontend-uni/                # 📱 交付产物 (uni-app → Android/iOS/小程序/H5)
│   ├── manifest.json
│   ├── pages.json
│   ├── pages/ components/
│   └── README.md
├── docs/                        # 📚 详细文档
│   ├── ARCHITECTURE.md
│   ├── API_CONTRACTS.md
│   ├── MODULE_1_用户画像模块.md
│   ├── MODULE_2_知识图谱模块.md
│   ├── MODULE_3_个性化推荐模块.md
│   ├── MODULE_4_阅读生态模块.md
│   └── DEVELOPMENT_GUIDE.md
├── scripts/
│   ├── init_db.sql              # MySQL DDL
│   ├── init_neo4j.cypher        # Neo4j 约束 + 示例数据
│   ├── import_books.py          # 图书导入 (MySQL + Neo4j 双写)
│   └── book_seeds.json          # 48本中文图书种子数据
├── docker-compose.yml
└── requirements.txt
```

## 模块依赖关系

```
模块一 (用户画像) ────→ 模块三 (推荐引擎) ←──── 模块二 (知识图谱)
       │                        │
       └────────→ 模块四 (阅读生态) ←────────┘
```

- **模块一** 为模块三提供用户偏好数据
- **模块二** 为模块三提供图谱推理路径
- **模块四** 依赖模块一的用户认证，是独立业务线

## 文档索引

- 📐 [系统架构](docs/ARCHITECTURE.md)
- 🔗 [API 接口契约](docs/API_CONTRACTS.md)
- 👤 [模块一：用户画像](docs/MODULE_1_用户画像模块.md)
- 🕸️ [模块二：知识图谱](docs/MODULE_2_知识图谱模块.md)
- 🎯 [模块三：个性化推荐](docs/MODULE_3_个性化推荐模块.md)
- 📖 [模块四：阅读生态](docs/MODULE_4_阅读生态模块.md)
- 🛠️ [开发指南](docs/DEVELOPMENT_GUIDE.md)
