"""
═══════════════════════════════════════════════════════
【模块五 · 智能问答助手】API 端点
  负责人: ALL
  端点:
    POST /api/v1/chat/send     — 发送消息获取AI回复
    GET  /api/v1/chat/history  — 获取对话历史
    DELETE /api/v1/chat/history — 清空对话历史
═══════════════════════════════════════════════════════
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.api.deps import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.chat import (
    ChatRequest, ChatResponse, ChatHistoryResponse,
    ChatHistoryItem, ChatDeleteResponse,
)
from app.services import ai_chat_service

router = APIRouter()


# ═══════════════════════════════════════════════
# 发送消息
# ═══════════════════════════════════════════════
@router.post("/send", response_model=ChatResponse,
             summary="发送消息给智能助手",
             description="""
向智能问答助手发送自然语言消息，获取AI回复。

**支持的意图类型**:
- **功能问答**: "收藏功能在哪里""怎么看我的阅读进度"
- **自然语言荐书**: "推荐几本科幻小说""适合AI入门的书"
- **图书知识问答**: "《三体》的作者是谁""有哪些科幻标签的书"
- **个人阅读问答**: "我收藏了哪些书""我最近读了什么"
- **管理员帮助**: "如何添加图书""如何配置购书链接"
- **知识图谱辅助**: 从图书简介提取候选标签和实体关系

**未登录用户**: 可使用功能问答、图书知识问答和自然语言荐书（无个性化）
**已登录用户**: 额外可使用个人阅读问答
**管理员**: 额外可使用管理员帮助和知识图谱辅助
""")
def send_message(
    request: ChatRequest,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """
    处理用户消息，返回AI生成的自然语言回答。
    自动识别意图、检索系统数据上下文、调用LLM生成回答。
    """
    try:
        result = ai_chat_service.process_message(
            db=db,
            user=current_user,
            message=request.message,
        )
        # 获取最新保存的消息ID
        latest_id = 0
        if current_user:
            history = ai_chat_service.get_chat_history(db, current_user.id, limit=1)
            if history:
                latest_id = history[-1].id

        from datetime import datetime
        return ChatResponse(
            id=latest_id,
            role="assistant",
            content=result["content"],
            intent_type=result.get("intent_type"),
            suggested_questions=result.get("suggested_questions"),
            created_at=datetime.utcnow(),
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"智能助手处理失败: {str(e)}"
        )


# ═══════════════════════════════════════════════
# 获取对话历史
# ═══════════════════════════════════════════════
@router.get("/history", response_model=ChatHistoryResponse,
            summary="获取对话历史",
            description="获取当前用户的对话历史记录（最近50轮）")
def get_history(
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取当前用户的对话历史"""
    history = ai_chat_service.get_chat_history(db, current_user.id, limit=limit)
    messages = [
        ChatHistoryItem(
            id=h.id,
            role=h.role,
            content=h.content,
            intent_type=h.intent_type,
            created_at=h.created_at,
        )
        for h in history
    ]
    return ChatHistoryResponse(
        user_id=current_user.id,
        messages=messages,
        total=len(messages),
    )


# ═══════════════════════════════════════════════
# 清空对话历史
# ═══════════════════════════════════════════════
@router.delete("/history", response_model=ChatDeleteResponse,
               summary="清空对话历史",
               description="删除当前用户的所有对话历史记录")
def delete_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """清空当前用户的对话历史"""
    count = ai_chat_service.delete_chat_history(db, current_user.id)
    return ChatDeleteResponse(
        message=f"已清空对话历史，共删除 {count} 条消息",
        deleted_count=count,
    )
