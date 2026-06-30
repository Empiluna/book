# 模块验收清单

| 模块 | 文档要求 | 实现文件 | 状态 |
|---|---|---|---|
| 模块一 用户画像 | 注册登录、行为采集、兴趣建模、进度同步 | `app/api/v1/endpoints/user.py`, `app/services/user_service.py` | 已实现 |
| 模块二 知识图谱 | Neo4j实体关系、Cypher、多跳路径、图谱可视化 | `graph.py`, `graph_service.py`, `scripts/init_neo4j.cypher` | 已实现：Neo4j-first + 可选严格模式 |
| 模块三 推荐 | ItemCF、KG、热门、新书、混合推荐、推荐理由 | `recommend.py`, `recommend_service.py` | 已实现 |
| 模块四 阅读生态 | 试读、书评、点赞、购书、书架、统计 | `ecosystem.py`, `user_service.py` | 已实现 |
| 智能问答 | 意图识别、上下文检索、LLM生成、边界控制 | `ai_chat.py` | 已实现：OpenAI兼容LLM + 可选严格模式 |
| 管理后台 | 用户/图书/评论/图谱/购书/统计 | `admin.py`, `books.py`, `graph.py`, `ecosystem.py` | 已实现 |
| 前端 | H5 + uni-app多端 | `frontend/`, `frontend-uni/` | 已实现 |

## 模块二升级：高级语义知识图谱

当前版本在原有 Book / Author / Tag / Publisher / Series 基础图谱上，新增了高级语义层：

- Field：领域，例如“人工智能与计算机”“科幻与未来想象”。
- Audience：适读人群，例如“AI入门者”“硬科幻读者”。
- Difficulty：阅读难度，例如“入门”“大众”“进阶”。
- Keyword：关键词，例如“宇宙”“机器学习”“现实主义”。
- Topic：细分主题，例如“宇宙文明”“算法思维”“商业决策”。

新增关系包括：

- BELONGS_TO_FIELD：图书所属领域。
- SUITABLE_FOR：图书适合的读者人群。
- HAS_DIFFICULTY：图书阅读难度。
- HAS_KEYWORD：图书关键词。
- HAS_TOPIC：图书细分主题。
- NEXT_READ：续读推荐路径。
- PREREQUISITE_OF：前置阅读路径。

这些关系会参与 KG 推荐候选生成，与原有同作者、同标签、同出版社、同系列和相似图书路径一起形成可解释推荐路径。
