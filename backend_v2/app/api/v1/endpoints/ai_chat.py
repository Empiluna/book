"""模块五 · 智能问答助手 API。"""

from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_current_user_optional
from app.core.database import get_db
from app.models.user import User
from app.schemas.chat import (
    ChatDeleteResponse,
    ChatFeedbackCreate,
    ChatFeedbackResponse,
    ChatHistoryItem,
    ChatHistoryResponse,
    ChatRequest,
    ChatResponse,
    ChatSuggestionResponse,
    ChatTraceItem,
    IntentDetectResponse,
)
from app.services import ai_chat_service

router = APIRouter()


@router.post("/send", response_model=ChatResponse, summary="发送消息给智能问答助手")
def send_message(
    request: ChatRequest,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """
    支持：功能问答、自然语言荐书、图书知识问答、个人阅读问答、管理员帮助、知识图谱辅助。
    未配置 LLM_API_KEY 时，自动使用关键词识别和模板回答。
    """
    try:
        result = ai_chat_service.process_message(db=db, user=current_user, message=request.message)
        return ChatResponse(
            id=result.get("id", 0),
            role="assistant",
            content=result["content"],
            intent_type=result.get("intent_type"),
            suggested_questions=result.get("suggested_questions") or [],
            created_at=result.get("created_at") or datetime.utcnow(),
            confidence=result.get("confidence", 0.0),
            entities=result.get("entities") or [],
            context_cards=result.get("context_cards") or [],
            cited_books=result.get("cited_books") or [],
            safety_boundary=result.get("safety_boundary", "business_only"),
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"智能助手处理失败: {exc}") from exc


@router.get("/history", response_model=ChatHistoryResponse, summary="获取对话历史")
def get_history(
    limit: int = Query(50, ge=1, le=200),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    history = ai_chat_service.get_chat_history(db, current_user.id, limit=limit)
    return ChatHistoryResponse(
        user_id=current_user.id,
        messages=[
            ChatHistoryItem(
                id=item.id,
                role=item.role,
                content=item.content,
                intent_type=item.intent_type,
                created_at=item.created_at,
            )
            for item in history
        ],
        total=len(history),
    )


@router.delete("/history", response_model=ChatDeleteResponse, summary="清空对话历史")
def delete_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    count = ai_chat_service.delete_chat_history(db, current_user.id)
    return ChatDeleteResponse(message=f"已清空对话历史，共删除 {count} 条消息", deleted_count=count)


@router.post("/intent", response_model=IntentDetectResponse, summary="仅识别用户消息意图")
def detect_intent(
    request: ChatRequest,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    role = "admin" if current_user and current_user.is_admin else ("user" if current_user else "anonymous")
    info = ai_chat_service.classify_intent(db, request.message, role)
    return IntentDetectResponse(
        intent_type=info.get("intent", "out_of_scope"),
        confidence=info.get("confidence", 0.0),
        entities=info.get("entities") or [],
        reason=info.get("reason", ""),
    )


@router.get("/suggestions", response_model=ChatSuggestionResponse, summary="获取智能助手推荐追问")
def get_suggestions(current_user: Optional[User] = Depends(get_current_user_optional)):
    role = "admin" if current_user and current_user.is_admin else ("user" if current_user else "anonymous")
    return ChatSuggestionResponse(role=role, suggestions=ai_chat_service.get_suggestions(current_user))


@router.post("/feedback", response_model=ChatFeedbackResponse, summary="提交智能助手回答反馈")
def create_feedback(
    req: ChatFeedbackCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    row = ai_chat_service.create_feedback(db, current_user.id, req.message_id, req.score, req.feedback_text)
    return ChatFeedbackResponse(id=row.id, message="反馈已记录")


@router.get("/trace", response_model=list[ChatTraceItem], summary="查看最近问答上下文追踪")
def get_trace(
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    rows = ai_chat_service.get_trace(db, current_user.id, limit=limit)
    result = []
    import json
    for row in rows:
        result.append(ChatTraceItem(
            id=row.id,
            intent_type=row.intent_type,
            confidence=row.confidence or 0.0,
            entities=json.loads(row.entities_json or "[]"),
            context_sources=json.loads(row.context_sources_json or "[]"),
            created_at=row.created_at,
        ))
    return result
