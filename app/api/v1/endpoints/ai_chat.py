from __future__ import annotations

import json
from typing import Any

import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_current_user_optional
from app.core.config import get_settings
from app.core.database import get_db
from app.models import Book, ChatHistory, User
from app.schemas import ChatRequest
from app.services.recommend_service import RecommendService
from app.services.serializers import book_card
from app.services.user_service import build_user_profile, reading_stats

settings = get_settings()
router = APIRouter(prefix="/chat", tags=["扩展 · 智能问答助手"])

INTENTS = ["function_qa", "book_rec", "book_qa", "personal_qa", "admin_help", "kg_assist", "out_of_scope"]
SYSTEM_PROMPT = """
你是“基于知识图谱的个性化荐书系统”的智能问答助手。
只能回答与系统功能、图书资源、推荐结果、阅读行为、知识图谱和后台管理相关的问题。
回答时优先依据提供的业务上下文，不要编造系统中不存在的数据。
如果涉及个人阅读数据，必须确认用户已登录；如果涉及管理员操作，必须确认用户为管理员。
输出中文，语气清晰直接。若上下文含推荐图书，请解释推荐理由。
""".strip()


def _llm_enabled() -> bool:
    return bool(settings.OPENAI_COMPATIBLE_API_BASE and settings.OPENAI_API_KEY)


def _chat_completion(messages: list[dict[str, str]], temperature: float | None = None) -> str:
    if not _llm_enabled():
        if settings.REQUIRE_LLM:
            raise HTTPException(503, "严格模式要求调用LLM，但OPENAI_COMPATIBLE_API_BASE或OPENAI_API_KEY未配置")
        raise RuntimeError("LLM not configured")
    base = settings.OPENAI_COMPATIBLE_API_BASE.rstrip("/")
    if base.endswith("/v1"):
        url = base + "/chat/completions"
    else:
        url = base + "/chat/completions"
    with httpx.Client(timeout=settings.LLM_TIMEOUT_SECONDS) as client:
        resp = client.post(
            url,
            headers={"Authorization": f"Bearer {settings.OPENAI_API_KEY}", "Content-Type": "application/json"},
            json={"model": settings.LLM_MODEL, "temperature": settings.LLM_TEMPERATURE if temperature is None else temperature, "messages": messages},
        )
        if resp.status_code >= 400:
            raise HTTPException(resp.status_code, f"LLM调用失败：{resp.text[:300]}")
        return resp.json()["choices"][0]["message"]["content"]


def classify(message: str, role: str) -> dict:
    if _llm_enabled():
        prompt = (
            "请将用户问题分类为function_qa、book_rec、book_qa、personal_qa、admin_help、kg_assist、out_of_scope之一。"
            "仅返回JSON，例如 {\"intent\":\"book_rec\",\"entities\":[\"人工智能\"],\"confidence\":0.9}。"
            f"当前角色：{role}。"
        )
        try:
            text = _chat_completion([{"role": "system", "content": prompt}, {"role": "user", "content": message}], temperature=0.1)
            return json.loads(text[text.find("{"): text.rfind("}") + 1])
        except Exception:
            if settings.REQUIRE_LLM:
                raise
    msg = message.lower()
    if any(k in message for k in ["推荐", "适合", "入门", "还能看", "好书", "书单"]):
        return {"intent": "book_rec", "entities": [], "confidence": 0.6}
    if any(k in message for k in ["作者", "出版社", "标签", "ISBN", "isbn", "类似", "属于", "哪本"]):
        return {"intent": "book_qa", "entities": [], "confidence": 0.6}
    if any(k in message for k in ["我的", "收藏", "书架", "最近", "读了多久", "画像", "进度", "评分"]):
        return {"intent": "personal_qa", "entities": [], "confidence": 0.6}
    if any(k in message for k in ["添加", "删除", "后台", "管理", "导入", "配置", "禁用", "统计"]):
        return {"intent": "admin_help" if role == "admin" else "function_qa", "entities": [], "confidence": 0.55}
    if any(k in message for k in ["图谱", "关系", "实体", "cypher", "Cypher", "路径"]):
        return {"intent": "kg_assist", "entities": [], "confidence": 0.6}
    if any(k in message for k in ["试读", "购买", "评论", "点赞", "登录", "注册", "功能", "书架"]):
        return {"intent": "function_qa", "entities": [], "confidence": 0.6}
    return {"intent": "out_of_scope", "entities": [], "confidence": 0.5}


def save(db: Session, user: User | None, role: str, content: str, intent: str | None = None) -> None:
    db.add(ChatHistory(user_id=user.id if user else None, role=role, content=content, intent_type=intent))
    db.commit()


def _recent_history(db: Session, user: User | None) -> list[dict[str, str]]:
    rows = db.query(ChatHistory).filter(ChatHistory.user_id == (user.id if user else None)).order_by(ChatHistory.created_at.desc()).limit(30).all()
    return [{"role": "assistant" if r.role == "assistant" else "user", "content": r.content} for r in reversed(rows)]


def _book_context(db: Session, message: str, limit: int = 8) -> list[dict[str, Any]]:
    like = f"%{message[:30]}%"
    rows = db.query(Book).filter(Book.is_deleted == False).filter(or_(Book.title.like(like), Book.description.like(like), Book.category.like(like))).limit(limit).all()  # noqa: E712
    if not rows:
        rows = db.query(Book).filter(Book.is_deleted == False).order_by(Book.hot_score.desc()).limit(limit).all()  # noqa: E712
    return [book_card(b) for b in rows]


def _build_context(db: Session, user: User | None, role: str, intent: str, message: str) -> dict[str, Any]:
    ctx: dict[str, Any] = {"role": role, "intent": intent, "system_features": {
        "普通用户": ["首页推荐", "搜索图书", "图书详情", "PDF/EPUB试读", "书评评分", "书架收藏", "购书渠道", "个人中心", "智能问答"],
        "管理员": ["用户管理", "图书管理", "知识图谱管理", "评论管理", "购书链接配置", "数据统计", "系统设置", "Cypher控制台"],
        "推荐策略": "KG 40% + ItemCF 40% + Hot 10% + New 10%，权重可由管理员配置"
    }}
    books: list[dict[str, Any]] = []
    if intent == "personal_qa" and user:
        ctx["profile"] = build_user_profile(db, user)
        ctx["stats"] = reading_stats(db, user)
        books = ctx["profile"].get("recent_books", [])
    elif intent == "book_rec":
        rec = RecommendService(db).natural_language(message, user)
        ctx["recommendation"] = rec
        books = rec.get("books", [])
    elif intent in {"book_qa", "kg_assist"}:
        books = _book_context(db, message)
        ctx["books"] = books
        ctx["graph_schema"] = {"nodes": ["Book", "Author", "Tag", "Publisher", "Series"], "relations": ["AUTHORED_BY", "TAGGED_AS", "PUBLISHED_BY", "BELONGS_TO_SERIES", "SIMILAR_TO"]}
    elif intent == "admin_help":
        ctx["admin_operations"] = ["POST /api/v1/books/admin", "POST /api/v1/graph/admin/sync", "POST /api/v1/books/admin/reindex-search", "GET /api/v1/admin/dashboard", "POST /api/v1/ecosystem/purchase-links"]
    else:
        books = _book_context(db, message, limit=4)
        ctx["related_books"] = books
    return {"context": ctx, "books": books[:8]}


def _fallback_answer(intent: str, role: str, ctx: dict[str, Any], books: list[dict[str, Any]]) -> tuple[str, list[str]]:
    if intent == "out_of_scope":
        return "我只能回答与系统功能、图书资源、推荐结果、阅读行为和后台管理相关的问题。请换一种与荐书系统相关的问法。", []
    if intent == "personal_qa":
        if "stats" not in ctx:
            return "个人阅读数据需要登录后查看。你可以使用演示账号 demo / demo123。", ["登录后查看我的阅读画像", "推荐几本适合我的书"]
        stats = ctx["stats"]
        prof = ctx.get("profile", {})
        tags = "、".join([x["name"] for x in prof.get("tag_preferences", [])[:5]])
        return f"你的累计阅读约 {stats['total_reading_minutes']} 分钟，已完成 {stats['completed_books']} 本书；当前偏好标签为：{tags or '暂无明显偏好'}。", ["根据我的画像推荐几本书", "我最近在读什么？"]
    if intent == "book_rec":
        names = "、".join([b["title"] for b in books[:5]])
        return f"根据你的问题和系统推荐策略，建议先看：{names}。这些图书会综合用户画像、知识图谱路径和协同过滤结果排序。", ["为什么推荐这些书？", "加入我的书架"]
    if intent == "book_qa":
        return "我从图书数据库和知识图谱中检索到了相关图书。你可以点击图书进入详情页查看作者、出版社、标签和相似路径。", ["显示这些书的相似推荐", "查看知识图谱关系"]
    if intent == "admin_help" and role == "admin":
        return "管理员可在后台完成用户管理、图书增删改查、知识图谱同步与Cypher查询、购书链接配置、评论管理和数据统计。知识图谱标签/关系建议必须人工确认后再写入。", ["如何导入图书JSON？", "如何同步Neo4j图谱？"]
    if intent == "kg_assist":
        return "知识图谱模块支持Book、Author、Tag、Publisher、Series五类实体和多类语义关系；推荐时会计算同作者、同标签、同系列、同出版社和多跳路径权重。", ["查看某本书的图谱", "如何创建图谱关系？"]
    return "你可以在详情页试读、加入书架、购买实体书和发表评论；管理员可以在后台维护图书、评论、购书链接和知识图谱。", ["怎么购买实体书？", "怎么看我的阅读进度？"]


@router.post("/send")
def send_message(data: ChatRequest, db: Session = Depends(get_db), user: User | None = Depends(get_current_user_optional)):
    role = "admin" if user and user.is_admin else ("user" if user else "anonymous")
    msg = data.message.strip()
    intent_info = classify(msg, role)
    intent = intent_info.get("intent", "out_of_scope")
    if intent == "personal_qa" and not user:
        ctx, books = {}, []
        answer, suggestions = _fallback_answer(intent, role, ctx, books)
    elif intent == "admin_help" and role != "admin":
        ctx, books = {}, []
        answer, suggestions = "后台管理问题需要管理员权限。普通用户可以咨询试读、收藏、购书和评论等功能。", ["怎么购买实体书？", "怎么管理书架？"]
    elif intent == "out_of_scope":
        ctx, books = {}, []
        answer, suggestions = _fallback_answer(intent, role, ctx, books)
    else:
        payload = _build_context(db, user, role, intent, msg)
        ctx, books = payload["context"], payload["books"]
        suggestions: list[str]
        try:
            answer = _chat_completion([
                {"role": "system", "content": SYSTEM_PROMPT},
                *_recent_history(db, user),
                {"role": "user", "content": "业务上下文JSON：" + json.dumps(ctx, ensure_ascii=False, default=str) + "\n用户问题：" + msg},
            ])
            suggestions = ["继续推荐相似图书", "查看我的阅读画像"] if intent in {"book_rec", "book_qa"} else ["打开相关功能", "继续提问"]
        except Exception:
            if settings.REQUIRE_LLM:
                raise
            answer, suggestions = _fallback_answer(intent, role, ctx, books)
    save(db, user, "user", msg, intent)
    save(db, user, "assistant", answer, intent)
    return {"intent": intent, "answer": answer, "books": books, "suggestions": suggestions, "role": role, "llm_enabled": _llm_enabled(), "llm_required": settings.REQUIRE_LLM}


@router.get("/history")
def history(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.query(ChatHistory).filter_by(user_id=user.id).order_by(ChatHistory.created_at.desc()).limit(50).all()
    return {"items": [{"role": r.role, "content": r.content, "intent": r.intent_type, "created_at": r.created_at.isoformat()} for r in reversed(rows)]}


@router.delete("/history")
def clear_history(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.query(ChatHistory).filter_by(user_id=user.id).delete()
    db.commit()
    return {"message": "对话历史已清空"}
