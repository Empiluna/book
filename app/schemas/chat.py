"""
═══════════════════════════════════════════════════════
【模块五 · 智能问答助手】Pydantic 请求/响应模型
  负责人: ALL
═══════════════════════════════════════════════════════
"""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Literal


# ── 意图类型枚举 ──
IntentType = Literal[
    "function_qa",    # 功能问答: "收藏功能在哪里"
    "book_rec",       # 自然语言荐书: "推荐几本科幻小说"
    "book_qa",        # 图书知识问答: "《三体》作者是谁"
    "personal_qa",    # 个人阅读问答: "我收藏了哪些书"
    "admin_help",     # 管理员操作指引: "如何添加图书"
    "kg_assist",      # 知识图谱辅助: 从简介提取标签
    "out_of_scope",   # 超出范围
]


# ── 请求 ──
class ChatRequest(BaseModel):
    """发送聊天消息请求"""
    message: str = Field(..., min_length=1, max_length=2000,
                         description="用户输入的自然语言消息")
    conversation_id: Optional[int] = Field(None,
                                           description="会话ID，用于继续已有对话")


# ── 响应 ──
class ChatResponse(BaseModel):
    """聊天消息响应"""
    id: int = Field(..., description="消息ID")
    role: str = Field("assistant", description="角色: user/assistant")
    content: str = Field(..., description="AI回复内容")
    intent_type: Optional[str] = Field(None, description="识别到的意图类型")
    suggested_questions: Optional[list[str]] = Field(None,
                                                     description="建议追问的问题列表")
    created_at: datetime = Field(..., description="回复时间")

    model_config = {"from_attributes": True}


class ChatHistoryItem(BaseModel):
    """对话历史条目"""
    id: int
    role: str
    content: str
    intent_type: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatHistoryResponse(BaseModel):
    """对话历史响应"""
    user_id: int
    messages: list[ChatHistoryItem]
    total: int


class ChatDeleteResponse(BaseModel):
    """删除对话历史响应"""
    message: str
    deleted_count: int
