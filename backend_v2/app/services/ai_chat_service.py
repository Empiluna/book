"""
模块五 · 智能问答助手增强版服务层。

流程：意图识别 → 业务边界/权限控制 → 多源上下文检索 → 本地模板或 LLM 生成 → 可解释追踪 → 对话保存。
该版本即使不配置 LLM_API_KEY，也能完成可演示的自然语言荐书、图书问答、个人阅读问答和后台帮助。
"""

from __future__ import annotations

import json
import re
from datetime import datetime
from typing import Optional

from sqlalchemy import desc, or_
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.book import Author, Book, Publisher, Tag
from app.models.chat import ChatContextTrace, ChatFeedback, ChatHistory
from app.models.user import Bookmark, ReadingHistory, ReadingProgress, User, UserRating
from app.services import user_service

settings = get_settings()
_llm_client = None

SUPPORTED_INTENTS = {
    "function_qa",
    "book_rec",
    "book_qa",
    "personal_qa",
    "admin_help",
    "kg_assist",
    "out_of_scope",
}

OUT_OF_SCOPE_REPLY = (
    "抱歉，我是荐书系统的智能助手，只能回答系统功能、图书资源、推荐结果、阅读行为、后台管理和知识图谱辅助相关问题。"
    "你可以这样问：推荐几本人工智能入门书、我收藏了哪些书、如何添加图书、从简介中提取标签。"
)

SYSTEM_PROMPT = """
你是“基于知识图谱的个性化荐书系统”的智能问答助手。
回答必须限定在系统业务范围内：功能问答、自然语言荐书、图书知识问答、个人阅读数据问答、管理员后台帮助、知识图谱辅助抽取。
回答应基于【系统上下文】，不要编造不存在的图书、作者、评分或用户数据。
涉及荐书时，输出书名、作者/标签、推荐理由；涉及操作指引时，输出清晰步骤。
""".strip()

FUNCTION_DOCS = {
    "收藏": "进入图书详情页，点击“加入书架”，选择书架后保存；可在书架页移动或移除图书。",
    "书架": "底部 Tab 的“书架”入口可查看默认书架和自定义书架，支持创建、移动、删除收藏记录。",
    "阅读进度": "在线试读过程中保存页码和百分比；再次进入图书详情可继续阅读。",
    "试读": "图书详情页点击“试读”；未登录默认3页，登录后默认10页或第一章，以较少者为准。",
    "购书": "图书详情页点击“购买实体书”，系统展示京东、当当、淘宝等渠道及价格，选择后跳转第三方平台。",
    "评论": "图书详情页评论区可发表书评和1-5星评分；评论支持简单 Markdown，其他用户可点赞。",
    "推荐": "首页展示个性化推荐流；已登录用户基于知识图谱、协同过滤、热门、新书四类策略融合推荐。",
    "个人中心": "点击头像进入个人中心，可查看阅读统计、阅读记录、我的书架、我的评论和修改密码。",
}

ADMIN_DOCS = {
    "添加图书": "后台 → 图书管理 → 添加图书，填写书名、作者、ISBN、出版社、简介、标签、封面等字段后保存。",
    "批量导入": "后台 → 图书管理 → 批量导入，上传 JSON 种子文件；导入后检查 MySQL 与 Neo4j 是否同步。",
    "配置购书链接": "后台 → 购书链接配置，选择图书，填写平台、URL 和价格后保存。",
    "评论管理": "后台 → 评论管理，可按图书/用户/时间/评分筛选评论，支持删除违规评论和置顶优质评论。",
    "用户管理": "后台 → 用户管理，可搜索用户并执行禁用/启用操作；管理员不能查看明文密码。",
    "知识图谱管理": "后台 → 知识图谱管理，可新增实体、创建关系、执行 Cypher 查询和查看节点-边可视化。",
    "数据统计": "后台 → 数据统计，查看图书总数、用户数、活跃用户、热门图书排行和类别分布。",
}

OUT_OF_SCOPE_KEYWORDS = ["天气", "股票", "彩票", "算命", "政治立场", "色情", "暴力", "黑客", "破解", "代写作业"]


def _get_llm_client():
    global _llm_client
    if _llm_client is not None:
        return _llm_client
    if not getattr(settings, "LLM_API_KEY", ""):
        return None
    try:
        from openai import OpenAI

        kwargs = {"api_key": settings.LLM_API_KEY}
        if getattr(settings, "LLM_BASE_URL", ""):
            kwargs["base_url"] = settings.LLM_BASE_URL
        _llm_client = OpenAI(**kwargs)
        return _llm_client
    except Exception:
        return None


# =====================================================================
# 主流程
# =====================================================================


def process_message(db: Session, user: Optional[User], message: str) -> dict:
    message = (message or "").strip()
    if not message:
        return _make_result("请输入你想咨询的内容。", "out_of_scope", confidence=1.0)

    role = _get_user_role(user)
    intent_info = classify_intent(db, message, role)
    intent = intent_info["intent"] if intent_info.get("intent") in SUPPORTED_INTENTS else "out_of_scope"
    entities = intent_info.get("entities") or extract_entities(db, message)
    confidence = float(intent_info.get("confidence", 0.5))

    permission = _check_permission(intent, user)
    boundary = _check_bounds(message, intent)
    if permission or boundary:
        result = _make_result(permission or boundary or OUT_OF_SCOPE_REPLY, "out_of_scope" if boundary else intent, confidence=confidence, entities=entities)
        _save_dialog_and_trace(db, user, message, result, entities, confidence, [])
        return result

    context_pack = build_context_pack(db, user, intent, message, entities)
    history = _get_history_for_prompt(db, user.id, limit=12) if user else []
    result = generate_answer(message, intent, context_pack, user, history, confidence, entities)
    _save_dialog_and_trace(db, user, message, result, entities, confidence, context_pack["sources"])
    return result


# =====================================================================
# 意图识别
# =====================================================================


def classify_intent(db: Session, message: str, user_role: str = "anonymous") -> dict:
    """可独立调用的意图识别接口；优先 LLM，失败走规则。"""
    client = _get_llm_client()
    if client:
        try:
            prompt = (
                '只输出 JSON：{"intent":"function_qa|book_rec|book_qa|personal_qa|admin_help|kg_assist|out_of_scope",'
                '"entities":["实体"],"confidence":0.0,"reason":"一句话原因"}。\n'
                f"用户角色：{user_role}\n用户消息：{message}"
            )
            response = client.chat.completions.create(
                model=settings.LLM_MODEL,
                messages=[{"role": "system", "content": "你负责荐书系统的意图分类。"}, {"role": "user", "content": prompt}],
                temperature=0.1,
                max_tokens=240,
            )
            text = response.choices[0].message.content.strip()
            if text.startswith("```"):
                text = text.split("\n", 1)[1].rsplit("\n", 1)[0]
            data = json.loads(text)
            if data.get("intent") in SUPPORTED_INTENTS:
                data.setdefault("entities", extract_entities(db, message))
                data.setdefault("confidence", 0.75)
                return data
        except Exception:
            pass
    return _fallback_intent(db, message)


def _fallback_intent(db: Session, message: str) -> dict:
    if any(k in message for k in OUT_OF_SCOPE_KEYWORDS):
        intent, confidence, reason = "out_of_scope", 0.95, "命中越界关键词"
    elif any(k in message for k in ["后台", "管理员", "添加图书", "删除评论", "禁用用户", "配置购书", "批量导入", "数据统计"]):
        intent, confidence, reason = "admin_help", 0.82, "命中后台管理操作词"
    elif any(k in message for k in ["提取标签", "实体关系", "关系建议", "适读人群", "知识图谱辅助", "从简介"]):
        intent, confidence, reason = "kg_assist", 0.84, "命中知识图谱辅助词"
    elif any(k in message for k in ["推荐", "荐书", "适合", "入门", "还能看", "类似", "好书", "想看"]):
        intent, confidence, reason = "book_rec", 0.83, "命中荐书需求词"
    elif any(k in message for k in ["我收藏", "我的", "我最近", "我这个月", "我给", "我读", "我看", "我的评分"]):
        if any(k in message for k in ["怎么", "如何", "在哪", "入口", "使用"]):
            intent, confidence, reason = "function_qa", 0.75, "包含功能使用问法"
        else:
            intent, confidence, reason = "personal_qa", 0.84, "命中个人阅读数据词"
    elif any(k in message for k in ["作者", "出版社", "ISBN", "isbn", "标签", "属于", "评分多少", "谁写的", "有哪些书"]):
        intent, confidence, reason = "book_qa", 0.78, "命中图书知识查询词"
    elif any(k in message for k in ["怎么", "如何", "在哪", "功能", "使用", "购买", "试读", "评论", "收藏", "书架"]):
        intent, confidence, reason = "function_qa", 0.76, "命中系统功能问法"
    else:
        intent, confidence, reason = "out_of_scope", 0.55, "未能匹配系统业务意图"
    return {"intent": intent, "entities": extract_entities(db, message), "confidence": confidence, "reason": reason}


def extract_entities(db: Session, message: str) -> list[str]:
    entities: list[str] = []
    entities.extend([t.strip() for t in re.findall(r"《([^》]+)》", message) if t.strip()])
    candidates = []
    candidates.extend([t.name for t in db.query(Tag).limit(300).all()])
    candidates.extend([a.name for a in db.query(Author).limit(300).all()])
    candidates.extend([b.title for b in db.query(Book).limit(500).all()])
    for name in candidates:
        if name and name in message and name not in entities:
            entities.append(name)
    return entities[:12]


# =====================================================================
# 上下文检索
# =====================================================================


def build_context_pack(db: Session, user: Optional[User], intent: str, message: str, entities: list[str]) -> dict:
    sources: list[dict] = []
    cards: list[dict] = []
    cited_books: list[dict] = []

    if intent == "function_qa":
        text = _build_function_context(message)
        sources.append({"type": "function_doc", "name": "系统功能说明"})
        cards.append({"title": "功能说明", "items": [line for line in text.split("\n") if line.startswith("-")][:6]})
    elif intent == "book_rec":
        text, books = _build_book_rec_context(db, user, message, entities)
        sources.append({"type": "book_db", "name": "图书候选库", "count": len(books)})
        if user:
            sources.append({"type": "user_profile", "name": "用户画像"})
        cited_books = [_book_card(b) for b in books]
        cards.append({"title": "推荐候选", "items": [b["title"] for b in cited_books]})
    elif intent == "book_qa":
        text, books = _build_book_qa_context(db, message, entities)
        sources.append({"type": "book_db", "name": "图书信息库", "count": len(books)})
        cited_books = [_book_card(b) for b in books]
    elif intent == "personal_qa" and user:
        text = _build_personal_context(db, user, message)
        sources.extend([{"type": "user_profile", "name": "用户画像"}, {"type": "reading_data", "name": "书架/进度/评分"}])
        cards.extend(_personal_cards(db, user))
    elif intent == "admin_help" and user and user.is_admin:
        text = _build_admin_context(message)
        sources.append({"type": "admin_doc", "name": "后台操作说明"})
    elif intent == "kg_assist" and user and user.is_admin:
        text = _build_kg_assist_context(db, message)
        sources.append({"type": "kg_assist", "name": "标签/作者/关系候选"})
    else:
        text = "系统没有检索到可用上下文。"

    return {"text": text, "sources": sources, "context_cards": cards, "cited_books": cited_books}


def _build_function_context(message: str) -> str:
    matched = []
    for name, doc in FUNCTION_DOCS.items():
        if name in message or any(w in message for w in ["怎么", "如何", "在哪", "功能"]):
            matched.append(f"- {name}：{doc}")
    if not matched:
        matched = [f"- {name}：{doc}" for name, doc in FUNCTION_DOCS.items()]
    return "系统功能说明：\n" + "\n".join(matched)


def _build_book_rec_context(db: Session, user: Optional[User], message: str, entities: list[str]) -> tuple[str, list[Book]]:
    query = db.query(Book).filter(Book.is_deleted.is_(False))
    filters = []
    for entity in entities + _split_terms(message):
        if not entity:
            continue
        filters.append(Book.title.contains(entity))
        filters.append(Book.description.contains(entity))
        filters.append(Book.tags.any(Tag.name.contains(entity)))
        filters.append(Book.authors.any(Author.name.contains(entity)))
    if filters:
        query = query.filter(or_(*filters))
    books = query.order_by(desc(Book.avg_rating), desc(Book.hot_score)).limit(8).all()
    if not books and user:
        profile = user_service.build_advanced_user_profile(db, user.id, save_snapshot=False)
        tags = list(profile.get("tag_preferences", {}).keys())[:3]
        if tags:
            books = db.query(Book).filter(Book.tags.any(Tag.name.in_(tags)), Book.is_deleted.is_(False)).order_by(desc(Book.avg_rating)).limit(8).all()
    if not books:
        books = db.query(Book).filter(Book.is_deleted.is_(False)).order_by(desc(Book.hot_score), desc(Book.avg_rating)).limit(8).all()
    lines = ["推荐候选图书："] + [_format_book_line(b) for b in books]
    if user:
        p = user_service.build_advanced_user_profile(db, user.id, save_snapshot=False)
        lines.append("\n用户画像摘要：")
        lines.append(f"- 画像成熟度：{p.get('maturity_score')}，主要标签：{'、'.join(list(p.get('tag_preferences', {}).keys())[:5]) or '暂不明显'}")
    return "\n".join(lines), books


def _build_book_qa_context(db: Session, message: str, entities: list[str]) -> tuple[str, list[Book]]:
    filters = []
    for entity in entities + _split_terms(message):
        filters.append(Book.title.contains(entity))
        filters.append(Book.tags.any(Tag.name.contains(entity)))
        filters.append(Book.authors.any(Author.name.contains(entity)))
        filters.append(Book.publisher.has(Publisher.name.contains(entity)))
    books = db.query(Book).filter(Book.is_deleted.is_(False), or_(*filters)).order_by(desc(Book.avg_rating)).limit(10).all() if filters else []
    if not books:
        books = db.query(Book).filter(Book.is_deleted.is_(False)).order_by(desc(Book.hot_score)).limit(5).all()
    return "图书知识检索结果：\n" + "\n".join(_format_book_detail_line(b) for b in books), books


def _build_personal_context(db: Session, user: User, message: str) -> str:
    lines = [f"用户：{user.username}"]
    profile = user_service.build_advanced_user_profile(db, user.id, save_snapshot=False)
    lines.append(f"画像成熟度：{profile['maturity_score']}；主要兴趣：{'、'.join(list(profile.get('tag_preferences', {}).keys())[:5]) or '暂不明显'}")
    if any(k in message for k in ["收藏", "书架"]):
        rows = db.query(Bookmark).filter(Bookmark.user_id == user.id).order_by(desc(Bookmark.created_at)).limit(20).all()
        lines.append("\n收藏/书架：")
        lines.extend([f"- [{r.shelf_name}] 《{r.book.title if r.book else '未知图书'}》" for r in rows] or ["- 暂无收藏记录"])
    if any(k in message for k in ["最近", "阅读", "记录", "读"]):
        rows = db.query(ReadingHistory).filter(ReadingHistory.user_id == user.id).order_by(desc(ReadingHistory.read_at)).limit(20).all()
        lines.append("\n阅读记录：")
        lines.extend([f"- 《{r.book.title if r.book else '未知图书'}》：{r.status}，{r.read_at}" for r in rows] or ["- 暂无阅读记录"])
    if any(k in message for k in ["进度", "继续阅读", "在读"]):
        rows = db.query(ReadingProgress).filter(ReadingProgress.user_id == user.id).order_by(desc(ReadingProgress.updated_at)).limit(20).all()
        lines.append("\n阅读进度：")
        lines.extend([f"- 《{r.book.title if r.book else '未知图书'}》：{r.progress_percent:.1f}%，第 {r.current_page} 页" for r in rows] or ["- 暂无阅读进度"])
    if any(k in message for k in ["评分", "高分", "打过分"]):
        rows = db.query(UserRating).filter(UserRating.user_id == user.id).order_by(desc(UserRating.rating)).limit(20).all()
        lines.append("\n评分记录：")
        lines.extend([f"- 《{r.book.title if r.book else '未知图书'}》：{r.rating:.1f}星" for r in rows] or ["- 暂无评分记录"])
    if len(lines) <= 2:
        stats = profile.get("stats", {})
        lines.append(f"\n统计：累计阅读 {stats.get('total_reading_minutes', 0)} 分钟，收藏 {stats.get('bookmark_count', 0)} 本，评分 {stats.get('rating_count', 0)} 次。")
    return "\n".join(lines)


def _build_admin_context(message: str) -> str:
    matched = [f"- {name}：{doc}" for name, doc in ADMIN_DOCS.items() if name in message or any(k in message for k in name)]
    if not matched:
        matched = [f"- {name}：{doc}" for name, doc in ADMIN_DOCS.items()]
    return "管理员后台操作说明：\n" + "\n".join(matched)


def _build_kg_assist_context(db: Session, message: str) -> str:
    known_tags = [t.name for t in db.query(Tag).limit(80).all()]
    known_authors = [a.name for a in db.query(Author).limit(50).all()]
    candidate_tags = [t for t in known_tags if t in message][:10]
    return (
        "知识图谱辅助抽取：\n"
        f"- 待分析文本：{message}\n"
        f"- 命中已有标签：{', '.join(candidate_tags) if candidate_tags else '暂无直接命中'}\n"
        f"- 可参考标签库：{', '.join(known_tags[:40])}\n"
        f"- 可参考作者库：{', '.join(known_authors[:20])}\n"
        "- 建议管理员确认后再写入：tags、audience、relations、confidence。"
    )


# =====================================================================
# 回答生成
# =====================================================================


def generate_answer(message: str, intent: str, context_pack: dict, user: Optional[User], history: list[dict], confidence: float, entities: list[str]) -> dict:
    client = _get_llm_client()
    if client:
        try:
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            messages.extend(history[-12:])
            messages.append({"role": "user", "content": f"用户问题：{message}\n\n【系统上下文】\n{context_pack['text']}"})
            response = client.chat.completions.create(model=settings.LLM_MODEL, messages=messages, temperature=settings.LLM_TEMPERATURE, max_tokens=900)
            content = response.choices[0].message.content.strip()
            return _make_result(content, intent, confidence, entities, context_pack)
        except Exception:
            pass
    return _fallback_answer(intent, context_pack, confidence, entities)


def _fallback_answer(intent: str, context_pack: dict, confidence: float, entities: list[str]) -> dict:
    context = context_pack["text"]
    if intent == "function_qa":
        content = "可以按下面的入口操作：\n" + context
    elif intent == "book_rec":
        content = "根据系统当前数据和你的画像，可以先看这些书：\n" + context
    elif intent == "book_qa":
        content = "系统检索到的图书信息如下：\n" + context
    elif intent == "personal_qa":
        content = "你的个人阅读数据如下：\n" + context
    elif intent == "admin_help":
        content = "管理员后台可按以下路径操作：\n" + context
    elif intent == "kg_assist":
        content = "以下是候选抽取建议，写入知识图谱前需要管理员确认：\n" + context
    else:
        content = OUT_OF_SCOPE_REPLY
    return _make_result(content, intent, confidence, entities, context_pack)


# =====================================================================
# 历史、反馈与追踪
# =====================================================================


def save_message(db: Session, user_id: int, role: str, content: str, intent_type: Optional[str] = None) -> ChatHistory:
    row = ChatHistory(user_id=user_id, role=role, content=content, intent_type=intent_type)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def get_chat_history(db: Session, user_id: int, limit: int = 50) -> list[ChatHistory]:
    return db.query(ChatHistory).filter(ChatHistory.user_id == user_id).order_by(desc(ChatHistory.created_at), desc(ChatHistory.id)).limit(limit).all()[::-1]


def delete_chat_history(db: Session, user_id: int) -> int:
    count = db.query(ChatHistory).filter(ChatHistory.user_id == user_id).delete()
    db.commit()
    return int(count)


def create_feedback(db: Session, user_id: int, message_id: Optional[int], score: int, feedback_text: Optional[str]) -> ChatFeedback:
    row = ChatFeedback(user_id=user_id, message_id=message_id, score=int(score), feedback_text=feedback_text)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def get_trace(db: Session, user_id: int, limit: int = 20) -> list[ChatContextTrace]:
    return db.query(ChatContextTrace).filter(ChatContextTrace.user_id == user_id).order_by(desc(ChatContextTrace.created_at)).limit(limit).all()


def _save_dialog_and_trace(db: Session, user: Optional[User], message: str, result: dict, entities: list[str], confidence: float, sources: list[dict]) -> None:
    if not user:
        return
    save_message(db, user.id, "user", message, result.get("intent_type"))
    saved = save_message(db, user.id, "assistant", result.get("content", ""), result.get("intent_type"))
    result["id"] = saved.id
    trace = ChatContextTrace(
        user_id=user.id,
        assistant_message_id=saved.id,
        intent_type=result.get("intent_type"),
        confidence=confidence,
        entities_json=json.dumps(entities, ensure_ascii=False),
        context_sources_json=json.dumps(sources, ensure_ascii=False),
    )
    db.add(trace)
    db.commit()


def _get_history_for_prompt(db: Session, user_id: int, limit: int = 12) -> list[dict]:
    return [{"role": row.role, "content": row.content} for row in get_chat_history(db, user_id, limit=limit)]


# =====================================================================
# 工具函数
# =====================================================================


def _make_result(content: str, intent_type: str, confidence: float = 0.0, entities: Optional[list[str]] = None, context_pack: Optional[dict] = None) -> dict:
    context_pack = context_pack or {"context_cards": [], "cited_books": []}
    return {
        "id": 0,
        "content": content,
        "intent_type": intent_type,
        "suggested_questions": _generate_suggestions(intent_type),
        "created_at": datetime.utcnow(),
        "confidence": round(float(confidence), 3),
        "entities": entities or [],
        "context_cards": context_pack.get("context_cards", []),
        "cited_books": context_pack.get("cited_books", []),
        "safety_boundary": "business_only",
    }


def _generate_suggestions(intent: str) -> list[str]:
    mapping = {
        "function_qa": ["如何收藏图书？", "怎么看我的阅读进度？", "怎么购买实体书？"],
        "book_rec": ["推荐几本人工智能入门书", "我喜欢《三体》，还能看什么？", "有没有适合大学生读的历史书？"],
        "book_qa": ["《三体》的作者是谁？", "有哪些人工智能标签的书？", "有没有和《活着》类似的书？"],
        "personal_qa": ["我收藏了哪些书？", "我最近在读什么？", "我给哪些书打过高分？"],
        "admin_help": ["如何添加图书？", "如何配置购书链接？", "如何删除违规评论？"],
        "kg_assist": ["帮我从这段简介中提取标签", "如何创建图书和作者关系？"],
        "out_of_scope": ["推荐几本科幻小说", "如何使用书架功能？"],
    }
    return mapping.get(intent, ["推荐几本好书", "如何使用书架功能？"])


def get_suggestions(user: Optional[User]) -> list[str]:
    if not user:
        return ["推荐几本热门书", "收藏功能在哪里？", "《三体》的作者是谁？"]
    if user.is_admin:
        return ["如何添加图书？", "如何配置购书链接？", "帮我从简介中提取标签"]
    return ["我收藏了哪些书？", "我最近在读什么？", "推荐几本适合我当前兴趣的书"]


def _get_user_role(user: Optional[User]) -> str:
    if not user:
        return "anonymous"
    return "admin" if user.is_admin else "user"


def _check_permission(intent: str, user: Optional[User]) -> Optional[str]:
    if intent == "personal_qa" and not user:
        return "个人阅读数据需要登录后才能查询。请先登录，再询问收藏、阅读记录、进度或评分。"
    if intent in {"admin_help", "kg_assist"} and (not user or not user.is_admin):
        return "该问题属于管理员功能，需要管理员账号登录后才能使用。"
    return None


def _check_bounds(message: str, intent: str) -> Optional[str]:
    if intent == "out_of_scope" or any(k in message for k in OUT_OF_SCOPE_KEYWORDS):
        return OUT_OF_SCOPE_REPLY
    return None


def _format_book_line(book: Book) -> str:
    authors = "、".join(a.name for a in book.authors) or "未知作者"
    tags = "、".join(t.name for t in book.tags[:3]) if book.tags else "暂无标签"
    return f"- 《{book.title}》｜作者：{authors}｜标签：{tags}｜评分：{book.avg_rating:.1f}｜推荐理由：与当前需求、画像或热门偏好匹配"


def _format_book_detail_line(book: Book) -> str:
    authors = "、".join(a.name for a in book.authors) or "未知作者"
    tags = "、".join(t.name for t in book.tags[:5]) if book.tags else "暂无标签"
    publisher = book.publisher.name if getattr(book, "publisher", None) else "未知出版社"
    desc = (book.description or "暂无简介").replace("\n", " ")[:140]
    return f"- 《{book.title}》｜作者：{authors}｜出版社：{publisher}｜标签：{tags}｜评分：{book.avg_rating:.1f}｜简介：{desc}"


def _book_card(book: Book) -> dict:
    return {
        "id": book.id,
        "title": book.title,
        "authors": [a.name for a in book.authors],
        "tags": [t.name for t in book.tags],
        "avg_rating": float(book.avg_rating or 0.0),
        "cover_url": book.cover_url,
    }


def _personal_cards(db: Session, user: User) -> list[dict]:
    profile = user_service.build_advanced_user_profile(db, user.id, save_snapshot=False)
    stats = profile.get("stats", {})
    return [
        {"title": "画像成熟度", "value": profile.get("maturity_score"), "desc": "行为越多，画像越稳定"},
        {"title": "收藏数", "value": stats.get("bookmark_count", 0), "desc": "书架收藏记录"},
        {"title": "评分数", "value": stats.get("rating_count", 0), "desc": "用户评分记录"},
        {"title": "累计阅读分钟", "value": stats.get("total_reading_minutes", 0), "desc": "阅读会话统计"},
    ]


def _split_terms(message: str) -> list[str]:
    text = re.sub(r"[《》？?，,。.!！：:;；、/\\]", " ", message)
    stop = {"推荐", "几本", "适合", "有没有", "哪些", "图书", "入门", "还能看", "类似"}
    return [x.strip() for x in text.split() if len(x.strip()) >= 2 and x.strip() not in stop][:10]
