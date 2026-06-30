# 基于知识图谱的个性化荐书系统 · 完整实现增强版

本项目按照《需求说明书 v1.0》《概要设计文档 v1.0》《详细设计文档 v1.0》重新整合实现，覆盖四大核心业务模块，并在此基础上加入高级 H5 演示界面、uni-app 多端正式工程、智能问答、推荐权重动态配置、可视化知识图谱和后台管理接口。

## 1. 已实现模块

### 模块一：用户画像模块
- 用户注册、用户名/邮箱登录、JWT 认证、bcrypt 密码哈希（安装依赖后使用 passlib[bcrypt]）。
- 阅读历史、搜索日志、收藏/书架、评分、评论、试读进度、阅读统计。
- 标签偏好、作者偏好、类别偏好、高分图书列表、近期阅读记录自动生成。
- 多端阅读进度同步接口。

### 模块二：知识图谱模块
- Book / Author / Tag / Publisher / Series 五类实体。
- AUTHORED_BY、TAGGED_AS、PUBLISHED_BY、BELONGS_TO_SERIES、SIMILAR_TO 等关系。
- Neo4j Driver 接入：配置 `NEO4J_URI` 后使用 Cypher 查询；配置 `NEO4J_URI` 后使用 Neo4j Driver 与 Cypher 查询；可通过 `REQUIRE_NEO4J=true` 开启严格模式，未连接 Neo4j 时拒绝降级。
- 图谱路径推理：同作者、同标签、同系列、同出版社、多跳路径。
- 管理员图谱初始化、同步、实体/关系创建、Cypher 查询控制台、子图可视化数据。

### 模块三：个性化推荐模块
- ItemCF：基于 `user_ratings` 构建用户-图书评分矩阵，计算图书相似度；评分稀疏时用内容特征相似度补充。
- 知识图谱推荐：调用模块二图谱路径推理结果。
- 热门推荐：综合浏览量、试读量、收藏量、评论量、评分、购书跳转计算。
- 新书推荐：基于 `is_new`、评分和热度排序。
- 混合推荐：KG 40% + CF 40% + Hot 10% + New 10%，管理员可动态配置。
- 推荐解释：返回可读的推荐理由和路径信息。
- 曝光、点击、不感兴趣反馈记录。

### 模块四：阅读生态模块
- 在线试读：未登录 3 页、登录 10 页；已集成 `/static/reader.html` 阅读器，支持 PDF.js、EPUB.js、文本分页、翻页、缩放、目录导航、夜间模式和进度保存。
- 阅读进度保存：页码、百分比、阅读时长、设备来源。
- 书评社区：Markdown 文本评论、1-5 星评分、点赞/取消点赞、置顶、删除。
- 购书链接：多平台链接、价格、最低价展示、跳转统计；支持增删改查。
- 书架管理：想读/在读/已读 + 自定义书架，移动、删除、重命名、移除图书。

### 智能问答助手
- 作为四大核心模块之上的 AI 辅助交互层，不作为第五核心模块。
- 支持功能问答、自然语言荐书、图书知识问答、个人阅读问答、管理员帮助、知识图谱辅助。
- 支持 OpenAI 兼容 API 进行意图识别和上下文增强生成；可通过 `REQUIRE_LLM=true` 开启严格模式，未配置模型时拒绝降级。
- 支持边界控制、权限判断和对话历史。

## 2. 前端实现

### 高级 H5 演示版
入口：`http://localhost:8000/`

功能包括：首页推荐流、搜索发现、图书详情、知识图谱可视化、书架、个人画像、阅读趋势图、AI 问答助手、管理后台入口。视觉风格采用玻璃拟态、渐变背景、图书卡片、标签云和图谱力导向布局。

### uni-app 多端工程
目录：`frontend-uni/`

包含首页、搜索、书架、AI 问答、个人中心、图书详情、PDF/EPUB阅读器、登录、注册和后台页面，并接入 Pinia、网络请求封装、页面栈和 WebView 阅读器。管理端页面已从 JSON 展示增强为表格、表单和操作按钮，可执行用户状态切换、图书新增/编辑/删除、评论置顶/删除、图谱同步/Cypher查询、权重配置等操作。可用 HBuilderX 或 uni-app 工具链编译 H5 / Android / iOS / 微信小程序。

## 3. 运行方式

```bash
cd book_integrated_full_project_complete
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

打开：

- 前端演示：`http://localhost:8000/`
- Swagger API：`http://localhost:8000/docs`
- 健康检查：`http://localhost:8000/health`

演示账号：

- 普通用户：`demo / demo123`
- 管理员：`admin / admin123`

## 4. Docker 基础设施

```bash
docker compose up -d
```

包括 MySQL、Neo4j、Redis、ElasticSearch。默认情况下项目可用 SQLite + 内存缓存 + SQL fallback 直接演示；配置 `.env` 后可切换至完整基础设施。

## 5. 测试

```bash
PYTHONPATH=. pytest -q
```

当前冒烟测试通过：启动、健康检查、首页推荐接口可用。

## 6. 与文档对应关系

- 后端分层：`app/api` 控制层、`app/services` 业务层、`app/models` 数据层。
- 四大模块接口：`/user`、`/graph`、`/recommend`、`/ecosystem`。
- AI 辅助接口：`/chat`。
- 管理员后台接口：`/admin`、`/books/admin`、`/graph/admin`、`/recommend/admin`、`/ecosystem/admin`。
- RESTful API、Pydantic Schema、JWT、SQLAlchemy、Neo4j Driver、Redis Cache、ElasticSearch 多字段检索、索引重建、Neo4j Driver、Redis Cache 均已按设计实现。

## 7. 说明

为了保证老师验收时“开箱可运行”，本项目保留了降级能力：没有 Neo4j/Redis/ElasticSearch/LLM Key 时，系统仍可完整演示核心功能；配置相关服务后，会自动优先使用生产级组件。

## 8. 五项严格实现说明

本版针对此前五个缺口做了工程补齐：

1. `frontend-uni/` 已升级为多端正式工程，包含页面、组件、Pinia、请求封装、阅读器WebView和后台页面。
2. 搜索模块新增 `SearchService`，配置 ElasticSearch 后使用 `multi_match` 多字段检索；索引采用内置 n-gram 中文 analyzer，不依赖 IK 插件；管理员可调用 `/api/v1/books/admin/reindex-search` 重建索引。
3. 在线试读新增 `/static/reader.html`，集成本地 `/static/vendor/pdf.min.mjs` 与 `/static/vendor/epub.min.js`，不依赖 CDN，并提供示例 PDF/EPUB 文件。
4. 知识图谱模块为 Neo4j-first，可执行 Cypher、初始化约束、同步 MySQL 实体、创建实体关系；`REQUIRE_NEO4J=true` 可关闭降级。
5. 智能问答模块支持 OpenAI 兼容 LLM 完整生成链路；`REQUIRE_LLM=true` 可关闭关键词降级。

外部服务属于运行依赖：Neo4j、ElasticSearch、Redis 可通过 `docker compose up -d` 启动；LLM 需要自行配置 OpenAI 兼容 API Key。


## 9. 严格验收模式

如需让系统完全按文档要求强制使用 MySQL、Neo4j、ElasticSearch、Redis 和真实 LLM，请先启动基础设施：

```bash
docker compose up -d
```

然后复制严格配置模板：

```bash
cp .env.strict.example .env
```

并在 `.env` 中填写真实 `OPENAI_COMPATIBLE_API_BASE`、`OPENAI_API_KEY` 和 `LLM_MODEL`。严格模式会启用：

```env
REQUIRE_NEO4J=true
REQUIRE_ELASTICSEARCH=true
REQUIRE_LLM=true
```

此时 Neo4j、ElasticSearch 或 LLM 未连接会直接报错，不再自动降级。

## 10. 图书资源来源：part2 离线采集 + JSON 导入

本版已接入 GitHub `part2` 的图书资源来源思路，不再只依赖内置 `seed.py`。系统支持三类图书资源来源：

1. 内置演示数据：用于离线演示和快速启动；
2. part2 式离线采集：通过 `Spider/` 采集公开图书元数据，保存为 `data/books.json`；
3. Open Library 扩展：通过开放 API 搜索图书元数据。

推荐导入流程为：

```bash
python -m Spider.main --tags 科幻 编程 历史 文学 --pages 1 --limit 80 --output data/books.json
python scripts/import_books.py --input data/books.json
```

导入脚本会完成字段映射，并依次写入 MySQL、同步 Neo4j 图谱、重建 ElasticSearch 索引。字段映射关系如下：

| part2/Spider 字段 | 当前系统字段 |
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


### 高级语义知识图谱说明

v6 版本将知识图谱从基础书目关系升级为“双层图谱”：

1. 基础书目层：Book、Author、Tag、Publisher、Series。
2. 高级语义层：Field、Audience、Difficulty、Keyword、Topic。

同步图谱时，系统会根据图书类别、标签、简介和难度自动生成领域、适读人群、关键词、主题和续读路径关系。推荐模块在 KG 40% 中会同时使用基础路径和高级语义路径，例如：

```text
《深度学习入门》 → 同适读人群：AI入门者 → 《机器学习》
《Python编程：从入门到实践》 → 前置阅读 → 《算法图解》
《三体》 → 主题桥接：宇宙文明 → 《流浪地球》
```

相关接口：

```text
GET  /api/v1/graph/semantic-paths/{book_id}
GET  /api/v1/graph/explain/{source_id}/{target_id}
POST /api/v1/graph/admin/semantic/enrich
```
