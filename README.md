# 基于知识图谱的个性化荐书系统

本项目是一个面向数字阅读场景的个性化荐书系统。系统以用户画像和图书知识图谱为基础，结合协同过滤、知识图谱推理、热门推荐和新书推荐等策略，为用户提供可解释的个性化图书推荐服务。同时，系统提供在线试读、书架管理、书评互动、购书链接、知识图谱可视化、管理员后台和智能问答助手等功能，形成“发现图书—试读—收藏—阅读—评论—购买”的阅读服务闭环。

项目采用前后端分离与 B/S 架构。后端基于 FastAPI 实现 RESTful API，数据层支持 MySQL、Neo4j、Redis 和 ElasticSearch；前端包含 H5 演示界面和 uni-app 多端工程，可用于 Web 端展示和多端扩展。

## 1. 项目功能

### 1.1 用户画像模块

用户画像模块负责用户账号体系、行为采集和兴趣建模，主要功能包括：

- 用户注册、用户名/邮箱登录、JWT 认证和 bcrypt 密码哈希；
- 阅读历史、搜索日志、收藏书架、评分评论、试读进度等行为数据采集；
- 标签偏好、作者偏好、类别偏好、高分图书列表等画像数据生成；
- 阅读进度保存与同步；
- 个人阅读统计，包括阅读时长、阅读状态、评分次数、书架数量等。

### 1.2 知识图谱模块

知识图谱模块负责图书语义关系建模、图谱查询和图谱辅助推荐，主要功能包括：

- 构建 Book、Author、Tag、Publisher、Series 等实体；
- 支持 AUTHORED_BY、TAGGED_AS、PUBLISHED_BY、BELONGS_TO_SERIES、SIMILAR_TO 等关系；
- 基于 Neo4j 和 Cypher 实现图谱实体查询、路径推理和子图查询；
- 支持同作者、同标签、同系列、同出版社和多跳路径推理；
- 为推荐结果生成可解释的图谱路径说明；
- 管理员可进行图谱初始化、实体同步、关系维护和图谱可视化查看。

### 1.3 个性化推荐模块

个性化推荐模块负责生成首页推荐、猜你喜欢、相似图书推荐、热门图书和新书推荐，主要功能包括：

- ItemCF 协同过滤推荐：基于用户评分和行为数据计算图书相似度；
- 知识图谱推荐：根据图书、作者、标签、出版社、系列等关系发现候选图书；
- 热门推荐：根据浏览、试读、收藏、评论、评分、购书跳转等指标计算热度；
- 新书推荐：根据入库时间、新书标记、评分和热度进行排序；
- 混合推荐：默认采用 KG 40% + CF 40% + Hot 10% + New 10% 的融合策略；
- 推荐理由生成：为每本推荐图书返回自然语言解释；
- 用户反馈记录：支持曝光、点击和“不感兴趣”等反馈数据采集。

### 1.4 阅读生态模块

阅读生态模块负责推荐之后的阅读服务闭环，主要功能包括：

- 在线试读：支持 PDF、EPUB 和文本内容预览；
- 阅读器功能：支持翻页、缩放、目录导航、夜间模式和进度保存；
- 书架管理：支持“想读”“在读”“已读”和自定义书架；
- 阅读状态标记：支持图书在不同书架之间移动和移除；
- 书评社区：支持文字评论、1-5 星评分、点赞、取消点赞、置顶和删除；
- 购书链接：支持多平台购书链接、价格展示、最低价提示和跳转统计。

### 1.5 智能问答助手

智能问答助手作为四大核心模块之上的 AI 辅助交互层，不单独作为第五个核心业务模块。主要功能包括：

- 功能问答：回答系统功能位置和使用方法；
- 自然语言荐书：根据用户输入的自然语言需求推荐图书；
- 图书知识问答：查询图书作者、标签、出版社、相似图书等信息；
- 个人阅读问答：查询用户收藏、阅读记录、评分和进度；
- 管理员帮助：辅助管理员了解图书管理、图谱管理、购书链接配置等操作；
- 边界控制：对超出系统业务范围的问题进行拒答或提示重新描述；
- LLM 增强：支持 OpenAI 兼容 API，也支持未配置模型时的降级处理。

## 2. 技术栈

### 2.1 后端技术

- Python 3.10+
- FastAPI
- SQLAlchemy
- Pydantic
- JWT
- passlib / bcrypt
- scikit-learn
- Neo4j Driver
- Redis
- ElasticSearch
- Uvicorn

### 2.2 前端技术

- HTML / CSS / JavaScript H5 演示界面
- uni-app
- Vue 3
- Pinia
- Axios
- PDF.js
- EPUB.js
- ECharts / 图谱可视化组件

### 2.3 数据存储与中间件

- MySQL：存储用户、图书、评论、评分、书架、阅读进度等结构化数据；
- Neo4j：存储图书、作者、标签、出版社、系列等实体及其图谱关系；
- Redis：缓存推荐结果、ItemCF 相似度矩阵、热门推荐和系统配置；
- ElasticSearch：实现图书中文全文检索和多字段搜索；
- SQLite：用于本地临时演示或轻量测试场景。

## 3. 项目结构

```text
book/
├── app/                         # FastAPI 后端主程序
│   ├── api/                     # API 路由层
│   ├── core/                    # 配置、数据库、安全认证等基础模块
│   ├── models/                  # SQLAlchemy 数据模型
│   ├── schemas/                 # Pydantic 请求/响应模型
│   ├── services/                # 业务逻辑层
│   └── main.py                  # FastAPI 应用入口
├── frontend/                    # H5 演示前端
│   ├── index.html               # 用户端首页
│   ├── login.html               # 登录页面
│   ├── admin.html               # 管理端页面
│   ├── reader.html              # 阅读器页面
│   ├── css/
│   └── js/
├── frontend-uni/                # uni-app 多端工程
├── Spider/                      # 图书元数据离线采集脚本
├── scripts/                     # 数据导入、索引重建等脚本
├── data/                        # 图书数据与导入文件
├── docs/                        # 项目补充文档
├── tests/                       # 测试用例
├── docker-compose.yml           # MySQL、Neo4j、Redis、ElasticSearch 编排
├── requirements.txt             # Python 依赖
├── .env.example                 # 默认环境变量示例
├── .env.strict.example          # 严格模式环境变量示例
├── run.ps1                      # Windows 一键启动脚本
└── README.md
```

## 4. 快速启动

### 4.1 Windows 一键启动方式

如果只想快速本地演示，可以使用 SQLite：

```powershell
.\run.ps1 -UseSqlite
```

如果希望同时启动 MySQL、Neo4j、Redis 和 ElasticSearch 等基础设施：

```powershell
.\run.ps1 -WithInfra
```

如果 8000 端口已被占用，可以指定其他端口：

```powershell
.\run.ps1 -Port 8001
```

启动成功后访问：

```text
用户端首页：http://localhost:8000/
管理端页面：http://localhost:8000/admin
Swagger API：http://localhost:8000/docs
健康检查：http://localhost:8000/health
```

### 4.2 手动启动方式

克隆项目并进入目录：

```bash
git clone https://github.com/Empiluna/book.git
cd book
```

创建虚拟环境：

```bash
python -m venv .venv
```

激活虚拟环境：

```bash
# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

安装依赖：

```bash
pip install -r requirements.txt
```

复制环境变量文件：

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

启动基础设施：

```bash
docker compose up -d
```

启动后端服务：

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

访问地址：

```text
用户端首页：http://localhost:8000/
管理端页面：http://localhost:8000/admin
Swagger API：http://localhost:8000/docs
ReDoc API：http://localhost:8000/redoc
健康检查：http://localhost:8000/health
```

## 5. 环境变量说明

默认配置文件为 `.env.example`，主要配置如下：

```env
PROJECT_NAME=基于知识图谱的个性化荐书系统
SECRET_KEY=change-me-in-production

DATABASE_URL=mysql+pymysql://root:root123456@localhost:3306/book_system?charset=utf8mb4
SEED_ON_STARTUP=true
CORS_ORIGINS=*

NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password123
REQUIRE_NEO4J=false

REDIS_URL=redis://localhost:6379/0

ELASTICSEARCH_URL=http://localhost:9200
SEARCH_INDEX_NAME=books
REQUIRE_ELASTICSEARCH=false

OPENAI_COMPATIBLE_API_BASE=
OPENAI_API_KEY=
LLM_MODEL=gpt-4o-mini
LLM_TEMPERATURE=0.1
LLM_TIMEOUT_SECONDS=20
REQUIRE_LLM=false

RECOMMEND_KG_WEIGHT=0.40
RECOMMEND_CF_WEIGHT=0.40
RECOMMEND_HOT_WEIGHT=0.10
RECOMMEND_NEW_WEIGHT=0.10

TRIAL_PAGES_ANONYMOUS=3
TRIAL_PAGES_LOGIN=10
MAX_SHELVES_PER_USER=20
```

说明：

- 默认使用 MySQL 作为主业务数据库；
- 如果只做本地演示，可切换为 SQLite；
- `REQUIRE_NEO4J=false` 时，Neo4j 未连接不会阻断系统基础演示；
- `REQUIRE_ELASTICSEARCH=false` 时，ElasticSearch 未连接会使用降级搜索；
- `REQUIRE_LLM=false` 时，未配置 LLM Key 也可以使用关键词规则降级问答；
- 如需严格验收，可使用 `.env.strict.example`，并开启 Neo4j、ElasticSearch 和 LLM 的强制依赖。

## 6. Docker 基础设施

启动全部基础设施：

```bash
docker compose up -d
```

包含服务：

```text
MySQL 8.0          端口：3306
Neo4j 5.23         端口：7474 / 7687
Redis 7            端口：6379
ElasticSearch 8.15 端口：9200
```

只启动 MySQL：

```bash
docker compose up -d mysql
```

查看服务状态：

```bash
docker compose ps
```

查看日志：

```bash
docker compose logs mysql
docker compose logs neo4j
docker compose logs redis
docker compose logs elasticsearch
```

停止服务：

```bash
docker compose down
```

## 7. 严格验收模式

如果需要让系统严格按照文档要求使用 MySQL、Neo4j、ElasticSearch、Redis 和真实 LLM，可以使用严格配置模板：

```bash
cp .env.strict.example .env
```

Windows 下可使用：

```powershell
copy .env.strict.example .env
```

然后在 `.env` 中填写真实的 LLM 配置：

```env
OPENAI_COMPATIBLE_API_BASE=你的 OpenAI 兼容 API 地址
OPENAI_API_KEY=你的 API Key
LLM_MODEL=你的模型名称
```

严格模式通常会启用：

```env
REQUIRE_NEO4J=true
REQUIRE_ELASTICSEARCH=true
REQUIRE_LLM=true
```

此时 Neo4j、ElasticSearch 或 LLM 未连接时，系统会直接报错，不再自动降级。

## 8. 图书数据导入

系统支持三类图书数据来源：

1. 内置演示数据：用于离线演示和快速启动；
2. Spider 离线采集：通过 `Spider/` 采集公开图书元数据并保存为 JSON；
3. Open Library 扩展：通过开放 API 搜索图书元数据。

示例导入流程：

```bash
python -m Spider.main --tags 科幻 编程 历史 文学 --pages 1 --limit 80 --output data/books.json
python scripts/import_books.py --input data/books.json
```

导入脚本会完成字段映射，并写入 MySQL；在配置 Neo4j 和 ElasticSearch 后，可同步图谱并重建搜索索引。

字段映射关系：

| 数据字段 | 系统字段 |
|---|---|
| title | books.title |
| score | books.avg_rating |
| votes | books.rating_count |
| summary | books.description / books.trial_text |
| publish_year | books.publication_year |
| pages | books.page_count |
| image_path / image_url | books.cover_url |
| authors | authors + book_author |
| publisher | publishers |
| tags | tags + book_tag |
| series | series |
| isbn | books.isbn |
| price | purchase_links.price |
| source_url | purchase_links.url |

Open Library 扩展示例：

```bash
python scripts/import_books.py --openlibrary "machine learning" --input data/openlibrary_books.json
```

说明：离线采集仅用于开发阶段准备种子数据，系统运行时不实时依赖第三方网页。

## 9. 主要接口

### 9.1 系统接口

```text
GET  /
GET  /health
GET  /docs
GET  /redoc
```

### 9.2 用户画像接口

```text
POST /api/v1/user/register
POST /api/v1/user/login
GET  /api/v1/user/profile
GET  /api/v1/user/reading-stats
PUT  /api/v1/user/reading-progress
```

### 9.3 图书与搜索接口

```text
GET  /api/v1/books
GET  /api/v1/books/{book_id}
GET  /api/v1/books/search
POST /api/v1/books/admin/reindex-search
```

### 9.4 推荐接口

```text
GET  /api/v1/recommend/home
GET  /api/v1/recommend/similar/{book_id}
GET  /api/v1/recommend/hot
PUT  /api/v1/recommend/admin/weights
```

### 9.5 知识图谱接口

```text
GET  /api/v1/graph/subgraph/{book_id}
POST /api/v1/graph/paths
GET  /api/v1/graph/stats
POST /api/v1/graph/admin/sync
```

### 9.6 阅读生态接口

```text
GET    /api/v1/ecosystem/trial/{book_id}
GET    /api/v1/ecosystem/comments/{book_id}
POST   /api/v1/ecosystem/comments
POST   /api/v1/ecosystem/comments/{comment_id}/like
GET    /api/v1/ecosystem/purchase-links/{book_id}
POST   /api/v1/ecosystem/purchase-links
PUT    /api/v1/ecosystem/purchase-links/{id}
DELETE /api/v1/ecosystem/purchase-links/{id}
```

### 9.7 智能问答接口

```text
POST   /api/v1/chat/message
GET    /api/v1/chat/history
DELETE /api/v1/chat/history
```

### 9.8 管理员接口

```text
GET    /api/v1/admin/stats
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/{user_id}/status
GET    /api/v1/books/admin
POST   /api/v1/books/admin
PUT    /api/v1/books/admin/{book_id}
DELETE /api/v1/books/admin/{book_id}
```

具体接口参数和返回结构以 Swagger 文档为准：

```text
http://localhost:8000/docs
```

## 10. 测试

运行测试：

```bash
PYTHONPATH=. pytest -q
```

Windows PowerShell 可使用：

```powershell
$env:PYTHONPATH="."
pytest -q
```

建议测试范围包括：

- 服务启动和健康检查；
- 用户注册、登录和 JWT 认证；
- 首页推荐接口；
- 图书搜索接口；
- 图书详情接口；
- 阅读进度保存接口；
- 评论发布和点赞接口；
- 管理员图书管理接口；
- 知识图谱子图查询接口；
- 智能问答接口。

## 11. 与设计文档的对应关系

系统与《需求说明书》《概要设计文档》《详细设计文档》的对应关系如下：

| 文档模块 | 代码实现 |
|---|---|
| 用户画像模块 | `app/api/v1/endpoints/user.py`、`app/services/user_service.py` |
| 知识图谱模块 | `app/api/v1/endpoints/graph.py`、`app/services/graph_service.py` |
| 个性化推荐模块 | `app/api/v1/endpoints/recommend.py`、`app/services/recommend_service.py` |
| 阅读生态模块 | `app/api/v1/endpoints/ecosystem.py`、`app/services/ecosystem_service.py` |
| 智能问答助手 | `app/api/v1/endpoints/ai_chat.py`、`app/services/ai_chat_service.py` |
| 管理员后台 | `app/api/v1/endpoints/admin.py`、`app/api/v1/endpoints/books.py` |
| H5 前端 | `frontend/` |
| uni-app 多端工程 | `frontend-uni/` |
| 数据模型 | `app/models/` |
| 数据导入脚本 | `scripts/`、`Spider/` |
| 测试用例 | `tests/` |

## 12. 运行说明与注意事项

1. 本项目默认保留降级能力，便于本地演示和课程验收；
2. 未配置 Neo4j 时，图谱相关功能可能使用 SQL 或空结果降级；
3. 未配置 ElasticSearch 时，搜索功能可能使用数据库查询降级；
4. 未配置 LLM API Key 时，智能问答助手会使用关键词规则或模板化回答降级；
5. 如需展示完整图谱推理、全文搜索和真实智能问答，应启动 Docker 基础设施并配置真实 LLM；
6. 生产部署时必须修改 `SECRET_KEY`，并使用更安全的数据库密码和 HTTPS；
7. 数据库初始化、图谱同步和搜索索引重建建议在管理员后台或脚本中统一执行；
8. 如果端口被占用，可以使用 `.\run.ps1 -Port 8001` 或修改 uvicorn 启动端口。

## 13. 项目定位

本系统定位为一个课程实训与原型验证项目，重点展示知识图谱、用户画像、混合推荐、可解释推荐和阅读生态功能的整合实现。项目既可以作为“基于知识图谱的个性化荐书系统”的演示版本，也可以在后续继续扩展为完整的数字阅读推荐平台。
