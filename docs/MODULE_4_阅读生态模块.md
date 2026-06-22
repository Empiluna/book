# 模块四：阅读生态模块

> **负责人: D** | 标签: `模块四 · 阅读生态`

---

## 你的职责

负责系统的**用户交互生态**，是面向用户的功能集合：

| 子模块 | 文档章节 | 核心功能 |
|--------|---------|---------|
| 电子书在线试读 | 3.4.1 | 试读权限控制、PDF/EPUB预览 |
| 书评社区 | 3.4.3 | 发表评论、点赞、置顶、管理 |
| 实体书购书链接 | 3.4.4 | 多平台比价、一键跳转 |
| 书架与收藏管理 | 3.4.5 | 自定义书架、图书移动、状态标记 |
| 阅读统计 | 3.4.2 | 阅读时长、完成数量、趋势图 |

---

## 你需要完成的文件

```
app/
├── models/ecosystem.py         ← 书评/点赞模型 (已完成)
├── schemas/ecosystem.py        ← Pydantic 模型 (已完成骨架)
├── services/ecosystem_service.py ← ⭐ 业务逻辑 (需要你实现)
└── api/v1/endpoints/ecosystem.py ← ⭐ API 端点 (需要你完善)
```

**已为你准备好的内容**:
- ✅ `models/ecosystem.py` — BookComment + CommentLike 的 SQLAlchemy 模型
- ✅ `schemas/ecosystem.py` — 完整的请求/响应模型
- ✅ `services/ecosystem_service.py` — 所有函数框架 (试读/评论/购书/书架)
- ✅ `api/v1/endpoints/ecosystem.py` — 完整的路由骨架

---

## 核心功能实现清单

### 3.4.1 电子书在线试读

```python
def get_trial_info(db, book_id, user_id=None) -> dict:
    """
    返回该用户对该书的试读权限:
    - user_id=None (未登录): 3页
    - user_id!=None (已登录): 10页
    """
```

**实现要点**:
- 试读内容可以是静态文本/Markdown/PDF → 用 PDF.js 嵌入前端
- 试读进度自动保存 → 复用模块一的 `reading_progress` 表

**API**:
| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/api/v1/ecosystem/trial/{book_id}` | 获取试读权限信息 |
| GET | `/api/v1/ecosystem/trial/{book_id}/content` | 获取试读内容 |

### 3.4.2 书评社区 ⭐

```python
def create_comment(db, user_id, book_id, content) -> BookComment:
    """发表书评"""

def get_book_comments(db, book_id, page, page_size) -> list[BookComment]:
    """获取评论列表 - 置顶优先 → 点赞数排序"""

def like_comment(db, user_id, comment_id) -> bool:
    """点赞/取消点赞 - toggle 模式"""

def pin_comment(db, comment_id, is_pinned=True):
    """管理员置顶"""

def delete_comment(db, comment_id, user_id=None, is_admin=False):
    """删除评论 - 作者本人或管理员"""
```

**API**:
| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/api/v1/ecosystem/comments/{book_id}` | 获取书评列表 |
| POST | `/api/v1/ecosystem/comments` | 发表书评 |
| POST | `/api/v1/ecosystem/comments/like` | 点赞/取消 |
| PUT | `/api/v1/ecosystem/comments/{id}/pin` | 置顶 (管理员) |
| DELETE | `/api/v1/ecosystem/comments/{id}` | 删除 |

### 3.4.3 实体书购书链接

```python
def update_purchase_links(db, book_id, url_jd=None, url_dd=None, url_tb=None):
    """管理员配置购书链接 - 存入 books 表的 purchase_url_* 字段"""

def get_purchase_links(db, book_id) -> list[dict]:
    """返回 [{platform: "京东", url: "https://..."}, ...]"""
```

### 3.4.4 书架与收藏管理

```python
def get_user_bookshelves(db, user_id) -> list[dict]:
    """返回 [{name: "想读", book_count: 12}, ...]"""

def move_book_to_shelf(db, user_id, book_id, new_shelf):
    """移动图书到另一个书架"""
```

书架默认分类建议：`想读` | `在读` | `已读` | `经典必读`

**API**:
| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/api/v1/ecosystem/shelves` | 获取书架列表 |
| GET | `/api/v1/ecosystem/shelves/{name}` | 获取书架中图书 |
| PUT | `/api/v1/ecosystem/shelves/move` | 移动图书 |

### 3.4.5 阅读统计

```python
def get_reading_stats(db, user_id) -> dict:
    """返回阅读统计数据 → 用于个人主页展示"""
```

---

## 你依赖谁？

- **模块一 (A)** — 用户认证 (`get_current_user` / `get_current_user_optional`)
- **模块二 (B)** — 图书详情中的图谱关系展示（可选，后期联调）

## 谁依赖你？

- **前端** — 你的 API 是用户直接接触的功能
- 你是系统的"门面"，功能完整性直接决定用户体验

---

## 开发建议

1. **你的模块独立性最高** — 大部分功能只需要用户认证，不依赖图谱和推荐引擎
2. **优先完成书架+评论** — 这是用户最直接感知的功能
3. **试读功能做减法** — 先用纯文本/Markdown 实现试读，PDF 渲染后期再加
4. **购书链接** — 只需存 URL 字段 + 前端跳转，不要过度设计比价爬虫
5. **前端同学友好** — 你作为后端，优先确保 API 返回格式与 `schemas/ecosystem.py` 一致，前端对接无阻
