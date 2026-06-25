# 模块一与智能问答助手增强版后端说明

本压缩包基于原 `book_backend_runnable.zip` 做增强，仍然可以直接运行，默认使用 SQLite，不强制依赖 MySQL、Neo4j、Redis、ElasticSearch。

## 一、增强重点

### 1. 模块一：用户画像模块增强

新增能力：

- 统一行为事件采集：曝光、点击、详情浏览、搜索、试读、收藏、评分、评论、购书、负反馈等。
- 阅读会话记录：阅读时长、起止页码、进度增量、设备来源。
- 高级用户画像：长期兴趣、短期兴趣、标签偏好、类别偏好、作者偏好、画像成熟度、冷启动判断。
- 画像雷达数据：兴趣清晰度、行为丰富度、阅读稳定性、评分参与度、收藏活跃度、探索多样性。
- 近 30 天阅读热力图。
- 画像洞察 insight：自动生成“画像冷启动”“主要兴趣方向”“阅读时长累计”等提示。
- 手动偏好配置：喜欢/屏蔽标签、喜欢/屏蔽作者、难度偏好。
- 推荐显式反馈：like、dislike、not_interested、block_author、block_tag。
- 画像快照缓存：重建画像后保存到 `user_profile_snapshots` 表。

新增接口：

```text
POST /api/v1/user/behavior
POST /api/v1/user/reading-session
GET  /api/v1/user/profile/advanced
POST /api/v1/user/profile/rebuild
GET  /api/v1/user/dashboard
GET  /api/v1/user/timeline
GET  /api/v1/user/preferences
PUT  /api/v1/user/preferences
POST /api/v1/user/feedback
```

原接口仍保留：

```text
POST /api/v1/user/register
POST /api/v1/user/login
GET  /api/v1/user/me
PUT  /api/v1/user/password
GET  /api/v1/user/profile
POST /api/v1/user/history
GET  /api/v1/user/history
POST /api/v1/user/search-log
GET  /api/v1/user/search-logs
POST /api/v1/user/bookmark
GET  /api/v1/user/bookmarks
GET  /api/v1/user/shelves
POST /api/v1/user/rating
GET  /api/v1/user/ratings
POST /api/v1/user/progress
GET  /api/v1/user/progress
GET  /api/v1/user/stats
```

### 2. 智能问答助手增强

新增能力：

- 更细的意图识别：功能问答、自然语言荐书、图书知识问答、个人阅读问答、管理员帮助、知识图谱辅助、越界问题。
- 实体抽取：支持《书名》、图书标题、作者、标签命中。
- 多源上下文检索：功能说明、图书库、用户画像、书架、阅读进度、评分、管理员文档。
- 回答结果增加可解释字段：confidence、entities、context_cards、cited_books、safety_boundary。
- 问答追踪：保存意图、置信度、实体、上下文来源到 `chat_context_trace`。
- 用户反馈：可对智能助手回答提交有用/无用反馈。
- 未配置 LLM_API_KEY 时仍可用规则和模板正常演示；配置后可走 OpenAI 兼容 API。

新增接口：

```text
POST /api/v1/chat/intent
GET  /api/v1/chat/suggestions
POST /api/v1/chat/feedback
GET  /api/v1/chat/trace
```

原接口仍保留：

```text
POST   /api/v1/chat/send
GET    /api/v1/chat/history
DELETE /api/v1/chat/history
```

## 二、运行方式

```bash
cd book_backend_runnable
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

打开：

```text
http://localhost:8000/docs
```

## 三、重要提醒

如果你之前已经运行过旧版并生成了 `book_backend.db`，建议先删除旧数据库文件再运行增强版：

```bash
rm -f book_backend.db
```

Windows PowerShell：

```powershell
Remove-Item .\book_backend.db -ErrorAction SilentlyContinue
```

原因：SQLite 的 `create_all()` 只会创建不存在的表，不会自动给旧表添加新字段或修改结构。

## 四、建议 Git 提交说明

```bash
git checkout -b module1-ai-backend-advanced
git add app requirements.txt README_模块一和智能助手增强版说明.md
git commit -m "feat: enhance module1 profile and AI assistant backend"
git push origin module1-ai-backend-advanced
```

不要提交：

```text
book_backend.db
__pycache__/
*.pyc
```
