# 基于知识图谱的个性化荐书系统：可运行后端版

这是一份可直接启动的 FastAPI 后端代码，按 GitHub 仓库中 `app/` 后端结构组织，并根据需求说明书、概要设计文档补齐了模块一和智能问答，同时保留图书查询、图谱关联、推荐、阅读生态的轻量可运行接口，避免启动时报缺失模块。

## 1. 这份代码和数据库是什么关系

数据库不等于“后端代码文件”，但属于后端系统运行所依赖的数据层。后端代码负责定义表结构、连接数据库、读写数据库并对前端提供 API。

本版本默认使用 SQLite：

```bash
book_backend.db
```

第一次启动时会自动建表，并自动写入 8 本演示图书数据。因此不需要先配置 MySQL、Neo4j、Redis，也可以先跑通后端接口。

正式部署时，可在 `.env` 中把 `DATABASE_URL` 改成 MySQL；图谱部分也可以逐步替换为 Neo4j Cypher 查询。

## 2. 启动方式

```bash
cd book_backend_runnable
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

打开：

```text
http://localhost:8000/docs
```

## 3. 快速测试顺序

在 Swagger 里按这个顺序测：

1. `GET /health`
2. `GET /api/v1/graph/books`
3. `POST /api/v1/user/register`
4. 点 Swagger 右上角 Authorize，填入：`Bearer <access_token>`
5. `GET /api/v1/user/profile`
6. `POST /api/v1/user/rating`
7. `POST /api/v1/user/bookmark`
8. `GET /api/v1/recommend/home`
9. `POST /api/v1/chat/send`

也可以在另一个终端运行：

```bash
python scripts/smoke_test.py
```

## 4. 管理员账号

如需测试管理员接口：

```bash
python scripts/create_admin.py admin admin@example.com 123456
```

然后用 `/api/v1/user/login` 登录 admin，拿 token 后测试管理员新增图书、置顶评论、智能助手管理员帮助等接口。

## 5. 已包含的接口模块

- `/api/v1/user/*`：注册、登录、用户画像、阅读历史、搜索日志、书架收藏、评分、阅读进度、阅读统计。
- `/api/v1/chat/*`：智能问答、历史记录、清空历史。
- `/api/v1/graph/*`：图书列表、图书详情、搜索、图谱关联、路径推荐候选。
- `/api/v1/recommend/*`：首页推荐、热门推荐、新书推荐、相似图书、猜你喜欢。
- `/api/v1/ecosystem/*`：评论、点赞、试读、购书链接点击。

## 6. 注意事项

1. 这是“可运行后端版”，不是完整前端项目。后端可以独立运行；前端只是调用接口进行页面展示。
2. 默认 SQLite 适合课程演示和接口验收；正式部署建议换 MySQL，并接入 Neo4j、Redis、ElasticSearch。
3. 智能助手没有配置 `LLM_API_KEY` 时会走本地规则和模板回答；配置 OpenAI 兼容接口后会生成更自然的回答。
4. 密码模块优先使用 `passlib[bcrypt]`；若本机没有安装 passlib，会自动降级为 PBKDF2 以保证演示可运行。正式验收建议安装 `passlib[bcrypt]`。
