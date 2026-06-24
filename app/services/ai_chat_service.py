"""
═══════════════════════════════════════════════════════
【模块五 · 智能问答助手】服务层
  负责人: ALL
  职责:
    1. 意图识别 — 用LLM对用户问题分类
    2. 函数路由 — 根据意图调用对应系统数据
    3. LLM调用 — 结合系统上下文生成回答
    4. 边界控制 — 拒绝超出业务范围的问题
    5. 对话管理 — 存储/检索多轮对话历史
═══════════════════════════════════════════════════════
"""
import json
from typing import Optional
from datetime import datetime

from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.core.config import get_settings
from app.models.chat import ChatHistory
from app.models.user import User
from app.models.book import Book, Author, Tag

settings = get_settings()

# ═══════════════════════════════════════
# LLM 客户端 (延迟初始化)
# ═══════════════════════════════════════
_llm_client = None


def _get_llm_client():
    """获取LLM客户端（单例，兼容OpenAI API格式）"""
    global _llm_client
    if _llm_client is None and settings.LLM_API_KEY:
        try:
            from openai import OpenAI
            kwargs = {"api_key": settings.LLM_API_KEY}
            if settings.LLM_BASE_URL:
                kwargs["base_url"] = settings.LLM_BASE_URL
            _llm_client = OpenAI(**kwargs)
        except ImportError:
            pass
    return _llm_client


# ═══════════════════════════════════════
# System Prompt
# ═══════════════════════════════════════
SYSTEM_PROMPT = """你是一个基于知识图谱的个性化荐书系统的智能助手。你的职责是帮助用户解决与图书推荐、系统功能、阅读管理相关的问题。

## 你可以回答的问题类型:
1. **功能问答**: 解答系统功能使用方法（如收藏、书架、试读、购书等）
2. **自然语言荐书**: 根据用户描述的需求推荐图书（如"推荐科幻小说""适合AI入门的书"）
3. **图书知识问答**: 回答图书相关信息（作者、标签、出版社、评分等）
4. **个人阅读问答**: 帮助用户查询自己的阅读记录、收藏、评分等数据
5. **管理员帮助**: 为管理员提供后台操作指引
6. **知识图谱辅助**: 从图书简介中提取候选标签和实体关系

## 你不可以回答的问题:
- 超出系统业务范围的问题（如天气、新闻、编程技术等）
- 缺少数据支撑的猜测性问题
- 涉及不适当内容的问题

如果用户问题超出范围，请礼貌回复: "抱歉，我是荐书助手，只能回答与图书推荐、系统功能、阅读管理相关的问题。请问有什么我可以帮您的？"

## 回复风格:
- 简洁、友好、有引导性
- 如果理解有困难，可以追问澄清
- 在回复末尾可以建议1-2个相关问题
"""

# ═══════════════════════════════════════
# 意图识别 Prompt
# ═══════════════════════════════════════
INTENT_PROMPT = """分析用户消息的意图，返回JSON格式的意图分类结果。

意图类型 (intent):
- "function_qa": 询问系统功能使用方法（如"收藏功能在哪里""怎么购买实体书"）
- "book_rec": 自然语言荐书需求（如"推荐几本科幻小说""适合入门的书"）
- "book_qa": 询问图书具体信息（如"这本书的作者是谁""有哪些科幻标签的书"）
- "personal_qa": 询问个人阅读数据（如"我收藏了哪些书""我读了多久"）
- "admin_help": 管理员操作询问（如"如何添加图书""如何删除评论"）
- "kg_assist": 知识图谱辅助（如从简介提取标签）
- "out_of_scope": 超出荐书系统业务范围

同时提取关键实体 (entities): 书名、作者、标签、操作名称等。

用户角色 (user_role): "anonymous" (未登录), "user" (已登录普通用户), "admin" (管理员)

输出格式: {"intent": "xxx", "entities": [...], "confidence": 0.0-1.0}
只输出JSON，不要其他内容。"""


def _classify_intent(user_message: str, user_role: str = "user") -> dict:
    """用LLM识别用户意图"""
    client = _get_llm_client()
    if not client:
        # 无LLM时使用关键词匹配降级方案
        return _fallback_intent(user_message)

    try:
        response = client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[
                {"role": "system", "content": INTENT_PROMPT},
                {"role": "user",
                 "content": f"用户角色: {user_role}\n用户消息: {user_message}"},
            ],
            temperature=0.1,
            max_tokens=200,
        )
        result = response.choices[0].message.content.strip()
        # 清理可能的markdown代码块标记
        if result.startswith("```"):
            result = result.split("\n", 1)[1].rsplit("\n", 1)[0]
        return json.loads(result)
    except Exception:
        return _fallback_intent(user_message)


def _fallback_intent(user_message: str) -> dict:
    """关键词匹配降级意图识别（无LLM时使用）"""
    msg = user_message.lower()
    entities = []

    if any(w in msg for w in ["推荐", "介绍", "好看", "适合", "入门"]):
        intent = "book_rec"
    elif any(w in msg for w in ["作者", "出版社", "标签", "isbn"]):
        intent = "book_qa"
    elif any(w in msg for w in ["我", "我的", "收藏", "书架", "历史", "记录", "阅读"]):
        intent = "personal_qa"
    elif any(w in msg for w in ["怎么", "如何", "在哪", "功能", "使用"]):
        intent = "function_qa"
    elif any(w in msg for w in ["添加", "删除", "管理", "后台", "配置"]):
        intent = "admin_help"
    else:
        intent = "book_rec"  # 默认当作荐书请求

    return {"intent": intent, "entities": entities, "confidence": 0.5}


# ═══════════════════════════════════════
# 上下文构建 — 为LLM准备业务数据
# ═══════════════════════════════════════
def _build_context(intent: str, user: Optional[User], db: Session,
                   entities: list[str] = None) -> str:
    """根据意图从数据库检索相关上下文"""
    context_parts = []

    # 功能说明（所有意图都可能需要）
    function_docs = {
        "收藏": "在图书详情页点击'加入书架'按钮，可将图书添加到您的书架。在'我的书架'页面可以管理收藏。",
        "书架": "书架功能位于底部Tab栏'书架'入口，您可以创建自定义书架管理图书，支持'想读/在读/已读'三种默认书架。",
        "试读": "在图书详情页点击'试读'按钮可在线预览图书内容。未登录可试读3页，登录后可试读10页。",
        "购买": "在图书详情页点击'购买实体书'按钮，可查看京东、当当、淘宝等多个渠道的价格并跳转购买。",
        "评论": "在图书详情页评论区可发表评论和星级评分，支持Markdown格式。",
        "进度": "试读时系统自动保存阅读进度，下次进入可从上次位置继续。",
    }

    if intent == "function_qa":
        context_parts.append("## 系统功能说明")
        for name, desc in function_docs.items():
            context_parts.append(f"- **{name}**: {desc}")

    elif intent == "book_rec":
        # 提供热门图书和标签列表作为推荐候选
        context_parts.append("## 当前热门图书 (Top 10)")
        hot_books = (
            db.query(Book)
            .order_by(desc(Book.hot_score))
            .limit(10)
            .all()
        )
        for b in hot_books:
            authors = [a.name for a in b.authors]
            tags = [t.name for t in b.tags]
            context_parts.append(
                f"- 《{b.title}》 | 作者: {', '.join(authors) if authors else '未知'} "
                f"| 标签: {', '.join(tags[:3]) if tags else '无'} "
                f"| 评分: {b.avg_rating:.1f}"
            )

        # 可用标签
        context_parts.append("\n## 可用图书标签")
        all_tags = db.query(Tag).limit(30).all()
        context_parts.append(", ".join(t.name for t in all_tags))

        # 用户画像（如已登录）
        if user:
            context_parts.append(f"\n## 当前用户偏好")
            context_parts.append(f"- 用户ID: {user.id}")
            context_parts.append(f"- 用户名: {user.username}")

    elif intent == "book_qa":
        # 搜索相关图书信息
        search_term = entities[0] if entities else ""
        if search_term:
            books = (
                db.query(Book)
                .filter(
                    (Book.title.contains(search_term)) |
                    (Book.description.contains(search_term))
                )
                .limit(5)
                .all()
            )
            context_parts.append(f"## 与 '{search_term}' 相关的图书")
            for b in books:
                authors = [a.name for a in b.authors]
                context_parts.append(
                    f"- 《{b.title}》 | 作者: {', '.join(authors) if authors else '未知'} "
                    f"| 出版社: {b.publisher.name if b.publisher else '未知'} "
                    f"| 评分: {b.avg_rating:.1f} | 简介: {b.description[:100] if b.description else '无'}"
                )

    elif intent == "personal_qa" and user:
        context_parts.append(f"## 用户 {user.username} 的阅读数据")
        # 阅读历史
        from app.models.user import ReadingHistory, Bookmark, UserRating, ReadingProgress
        history = (
            db.query(ReadingHistory)
            .filter(ReadingHistory.user_id == user.id)
            .order_by(desc(ReadingHistory.read_at))
            .limit(10)
            .all()
        )
        if history:
            context_parts.append("### 最近阅读")
            for h in history:
                book = db.query(Book).filter(Book.id == h.book_id).first()
                context_parts.append(f"- 《{book.title if book else '未知'}》| 状态: {h.status}")

        # 书架
        bookmarks = (
            db.query(Bookmark)
            .filter(Bookmark.user_id == user.id)
            .limit(20)
            .all()
        )
        if bookmarks:
            context_parts.append("### 书架收藏")
            shelf_books = {}
            for bm in bookmarks:
                if bm.shelf_name not in shelf_books:
                    shelf_books[bm.shelf_name] = []
                shelf_books[bm.shelf_name].append(bm.book_id)
            for shelf, book_ids in shelf_books.items():
                context_parts.append(f"- {shelf}: {len(book_ids)}本书")

        # 评分
        ratings = (
            db.query(UserRating)
            .filter(UserRating.user_id == user.id)
            .order_by(desc(UserRating.rating))
            .limit(10)
            .all()
        )
        if ratings:
            context_parts.append("### 高分评分")
            for r in ratings:
                book = db.query(Book).filter(Book.id == r.book_id).first()
                context_parts.append(
                    f"- 《{book.title if book else '未知'}》| 评分: {r.rating}")

    elif intent == "admin_help" and user and user.is_admin:
        admin_docs = {
            "添加图书": "进入管理后台 → 图书管理 → 点击'添加图书'，填写书名、作者、出版社、ISBN、封面URL、简介、标签等信息后保存。也支持通过JSON文件批量导入。",
            "配置购书链接": "进入管理后台 → 购书链接管理 → 选择图书，填写京东/当当/淘宝的购买链接和价格后保存。",
            "删除评论": "进入管理后台 → 评论管理 → 找到违规评论 → 点击'删除'。也可在图书详情页直接删除。",
            "导入知识图谱": "进入管理后台 → 知识图谱 → 点击'初始化约束'创建索引 → 使用导入功能批量导入图书实体和关系。",
            "用户管理": "进入管理后台 → 用户管理 → 可查看所有用户列表，对违规用户进行禁用/启用操作。",
            "评论置顶": "在管理后台评论管理页面或图书详情页，点击评论的'置顶'按钮可将优质评论置顶展示。",
        }
        context_parts.append("## 管理员操作指引")
        for name, desc in admin_docs.items():
            context_parts.append(f"- **{name}**: {desc}")

    elif intent == "kg_assist" and user and user.is_admin:
        # 知识图谱辅助 — 如果有图书简介，提供标签建议模板
        desc_text = entities[0] if entities else ""
        context_parts.append("## 知识图谱辅助")
        context_parts.append("请从以下图书简介中提取候选标签、适读人群和可能的实体关系：")
        context_parts.append(f"```\n{desc_text}\n```")
        context_parts.append("请以JSON格式输出: {\"tags\": [...], \"audience\": \"...\", \"relations\": [...]}")

    return "\n".join(context_parts)


# ═══════════════════════════════════════
# 边界检查 — 确保不回答超范围问题
# ═══════════════════════════════════════
OUT_OF_SCOPE_KEYWORDS = [
    "天气", "新闻", "股票", "编程", "写代码", "翻译", "做数学",
    "写诗", "讲故事", "政治", "宗教", "色情", "暴力"
]

OUT_OF_SCOPE_REPLY = (
    "抱歉，我是荐书助手，只能回答与图书推荐、系统功能、阅读管理相关的问题。"
    "您可以尝试问我：\n"
    "- 📖 推荐某类图书\n"
    "- 🔍 查询某本书的信息\n"
    "- 📚 管理您的书架和阅读记录\n"
    "- ❓ 了解系统功能使用方法"
)


def _check_bounds(user_message: str, intent: str) -> Optional[str]:
    """边界检查：如果超范围返回拒绝回复，否则返回None"""
    # 意图已经是 out_of_scope
    if intent == "out_of_scope":
        return OUT_OF_SCOPE_REPLY
    # 关键词检查
    for kw in OUT_OF_SCOPE_KEYWORDS:
        if kw in user_message:
            return OUT_OF_SCOPE_REPLY
    return None


# ═══════════════════════════════════════
# LLM 生成回答
# ═══════════════════════════════════════
def _generate_answer(user_message: str, intent: str, context: str,
                     user: Optional[User], db: Session,
                     history: list[dict] = None) -> dict:
    """调用LLM生成最终回答"""
    client = _get_llm_client()

    # 构建消息列表
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # 添加历史对话（最近10轮）
    if history:
        for h in history[-20:]:  # 最多20条消息
            messages.append({"role": h["role"], "content": h["content"]})

    # 添加当前上下文
    user_content = f"用户问题: {user_message}\n\n## 系统数据\n{context}"
    messages.append({"role": "user", "content": user_content})

    if client:
        try:
            response = client.chat.completions.create(
                model=settings.LLM_MODEL,
                messages=messages,
                temperature=settings.LLM_TEMPERATURE,
                max_tokens=800,
            )
            answer = response.choices[0].message.content.strip()
            return {
                "content": answer,
                "intent_type": intent,
                "suggested_questions": _generate_suggestions(intent),
            }
        except Exception as e:
            return {
                "content": f"AI服务暂时不可用，请稍后重试。您也可以通过页面菜单使用系统功能。\n(错误: {str(e)})",
                "intent_type": intent,
                "suggested_questions": None,
            }

    # 无LLM时的降级回复
    return _fallback_answer(intent, context)


def _fallback_answer(intent: str, context: str) -> dict:
    """无LLM时的降级回复方案"""
    replies = {
        "function_qa": f"根据系统功能说明，以下是相关操作指引：\n\n{context}\n\n如需更详细的帮助，请具体说明您想了解的功能。",
        "book_rec": f"以下是当前系统内的热门图书，供您参考：\n\n{context}\n\n您也可以使用搜索功能按类别、标签查找更多图书。",
        "book_qa": f"查询结果如下：\n\n{context}\n\n如需更详细的信息，请点击对应图书进入详情页查看。",
        "personal_qa": f"您的阅读数据如下：\n\n{context}\n\n更多详细信息请在'个人中心'查看。",
        "admin_help": f"管理员操作指引：\n\n{context}\n\n请按上述步骤操作，注意敏感操作需二次验证。",
        "kg_assist": f"知识图谱辅助分析：\n\n{context}\n\n请确认上述建议后手动写入知识图谱。",
    }
    return {
        "content": replies.get(intent, f"关于您的问题，请参考以下信息：\n\n{context}"),
        "intent_type": intent,
        "suggested_questions": _generate_suggestions(intent),
    }


def _generate_suggestions(intent: str) -> list[str]:
    """根据意图生成建议追问问题"""
    suggestions = {
        "function_qa": ["如何收藏图书？", "试读有哪些限制？"],
        "book_rec": ["有哪些热门科幻小说？", "新上架了什么好书？"],
        "book_qa": ["这本书评分多少？", "有哪些同作者的作品？"],
        "personal_qa": ["我最近读了什么？", "我收藏了哪些书？"],
        "admin_help": ["如何导入图书数据？", "如何管理评论？"],
        "kg_assist": [],
        "out_of_scope": ["推荐几本科幻小说", "如何收藏图书？"],
    }
    return suggestions.get(intent, ["推荐几本好书", "如何收藏图书？"])


# ═══════════════════════════════════════
# 公开API — 对话服务
# ═══════════════════════════════════════
def process_message(
    db: Session,
    user: Optional[User],
    message: str,
) -> dict:
    """处理用户消息的主入口

    流程: 意图识别 → 边界检查 → 获取上下文 → LLM生成 → 保存历史
    """
    user_role = "anonymous"
    if user:
        user_role = "admin" if user.is_admin else "user"

    # 1. 意图识别
    intent_info = _classify_intent(message, user_role)
    intent = intent_info.get("intent", "book_rec")
    entities = intent_info.get("entities", [])

    # 2. 边界检查
    out_of_scope_reply = _check_bounds(message, intent)
    if out_of_scope_reply:
        return {
            "content": out_of_scope_reply,
            "intent_type": "out_of_scope",
            "suggested_questions": _generate_suggestions("out_of_scope"),
        }

    # 3. 获取系统上下文
    context = _build_context(intent, user, db, entities)

    # 4. 获取对话历史
    history = []
    if user:
        history_records = get_chat_history(db, user.id, limit=30)
        history = [
            {"role": h.role, "content": h.content}
            for h in history_records
        ]

    # 5. LLM生成回答
    result = _generate_answer(message, intent, context, user, db, history)

    # 6. 保存对话历史
    if user:
        save_message(db, user.id, "user", message, intent)
        save_message(db, user.id, "assistant", result["content"], intent)

    return result


# ═══════════════════════════════════════
# 对话历史管理
# ═══════════════════════════════════════
def save_message(db: Session, user_id: int, role: str,
                 content: str, intent_type: str = None) -> ChatHistory:
    """保存一条对话消息"""
    msg = ChatHistory(
        user_id=user_id,
        role=role,
        content=content,
        intent_type=intent_type,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


def get_chat_history(db: Session, user_id: int,
                     limit: int = 50) -> list[ChatHistory]:
    """获取用户对话历史"""
    return (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .order_by(ChatHistory.created_at)
        .limit(limit)
        .all()
    )


def delete_chat_history(db: Session, user_id: int) -> int:
    """删除用户全部对话历史，返回删除条数"""
    count = (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .delete()
    )
    db.commit()
    return count
