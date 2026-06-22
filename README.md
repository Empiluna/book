# 基于知识图谱的个性化荐书系统

## 项目简介

面向数字化阅读场景，构建用户阅读画像与书籍知识图谱，通过协同过滤与知识图谱推理实现精准的个性化图书推荐。

## 团队分工

| 成员 | 模块 | 核心内容 | 后端代码 | 前端代码 |
|------|------|---------|---------|---------|
| **A** | 模块一：用户画像 | 阅读行为采集、兴趣建模、进度同步 | `app/models/user.py` `app/services/user_service.py` `app/api/v1/endpoints/user.py` | `js/auth.js` `js/pages/login.js` `js/pages/profile.js` |
| **B** | 模块二：知识图谱 | Neo4j实体关系、路径推理、可视化 | `app/models/book.py` `app/services/graph_service.py` `app/api/v1/endpoints/graph.py` | `js/pages/admin.js`(图谱) `js/pages/detail.js`(图谱) |
| **C** | 模块三：个性化推荐 | ItemCF、图谱推理、混合策略、推荐解释 | `app/services/recommend_service.py` `app/api/v1/endpoints/recommend.py` | `js/pages/home.js` `js/pages/detail.js`(相似推荐) |
| **D** | 模块四：阅读生态 | 试读、书评、购书链接、书架管理 | `app/models/ecosystem.py` `app/services/ecosystem_service.py` `app/api/v1/endpoints/ecosystem.py` | `js/components/comment.js` `js/pages/detail.js`(试读/购书/评论) `js/pages/admin.js`(购书链接) |
| **ALL** | 共用基础设施 | 配置、数据库、路由、安全 | `app/core/` `app/main.py` `app/api/deps.py` | `css/style.css` `js/api.js` `js/router.js` `js/components/navbar.js` `js/components/book-card.js` `js/components/toast.js` |

## 技术栈

| 组件 | 技术 | 版本 |
|------|------|------|
| 后端框架 | FastAPI | 0.115 |
| 前端 | 原生 HTML/CSS/JS | — |
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

### 3. 初始化数据库

```bash
# MySQL 表会自动创建（应用启动时）
# Neo4j 约束和图谱种子数据：
docker exec -it bookrec_neo4j cypher-shell -u neo4j -p password123 -f /var/lib/neo4j/import/init.cypher

# 可选: 填充 MySQL 种子数据
python scripts/seed_data.py
```

### 4. 启动应用

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. 访问

- **Swagger API 文档**: http://localhost:8000/docs
- **ReDoc 文档**: http://localhost:8000/redoc
- **健康检查**: http://localhost:8000/health

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
├── frontend/                    # 🌐 Web 前端 (纯 HTML/CSS/JS)
│   ├── index.html               # 入口 (Hash 路由)
│   ├── css/style.css            # 全局样式
│   ├── js/
│   │   ├── api.js               # API 封装 (四大模块)
│   │   ├── auth.js              # 认证管理
│   │   ├── router.js            # 路由
│   │   ├── pages/               # 页面逻辑
│   │   └── components/          # 组件
│   └── README.md
├── frontend-uni/                # 📱 uni-app 客户端 (一套代码 → Android/iOS/小程序)
│   ├── manifest.json            # App 配置
│   ├── pages.json               # 路由 + Tab 栏
│   ├── pages/                   # 6个页面 (.vue)
│   ├── components/              # 可复用组件
│   ├── api/index.js             # API 封装
│   └── README.md
├── docs/                        # 📚 详细文档
│   ├── ARCHITECTURE.md          # 系统架构
│   ├── API_CONTRACTS.md         # 模块间接口契约
│   ├── MODULE_1_用户画像模块.md
│   ├── MODULE_2_知识图谱模块.md
│   ├── MODULE_3_个性化推荐模块.md
│   ├── MODULE_4_阅读生态模块.md
│   └── DEVELOPMENT_GUIDE.md     # 开发指南
├── scripts/
│   ├── init_db.sql              # MySQL DDL
│   ├── init_neo4j.cypher        # Neo4j 初始化
│   └── seed_data.py             # 种子数据
├── docker-compose.yml           # 基础设施编排
├── requirements.txt
└── .gitignore
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
