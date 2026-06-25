"""模块五 · 智能问答助手 Pydantic 请求/响应模型。"""

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


IntentType = Literal[
    "function_qa",
    "book_rec",
    "book_qa",
    "personal_qa",
    "admin_help",
    "kg_assist",
    "out_of_scope",
]


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    conversation_id: Optional[int] = None


class ChatResponse(BaseModel):
    id: int = 0
    role: str = "assistant"
    content: str
    intent_type: Optional[str] = None
    suggested_questions: list[str] = Field(default_factory=list)
    created_at: datetime
    confidence: float = 0.0
    entities: list[str] = Field(default_factory=list)
    context_cards: list[dict] = Field(default_factory=list)
    cited_books: list[dict] = Field(default_factory=list)
    safety_boundary: str = "business_only"

    model_config = {"from_attributes": True}


class ChatHistoryItem(BaseModel):
    id: int
    role: str
    content: str
    intent_type: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatHistoryResponse(BaseModel):
    user_id: int
    messages: list[ChatHistoryItem]
    total: int


class ChatDeleteResponse(BaseModel):
    message: str
    deleted_count: int


class IntentDetectResponse(BaseModel):
    intent_type: str
    confidence: float
    entities: list[str] = Field(default_factory=list)
    reason: str = ""


class ChatSuggestionResponse(BaseModel):
    role: str
    suggestions: list[str]


class ChatFeedbackCreate(BaseModel):
    message_id: Optional[int] = None
    score: int = Field(..., ge=-1, le=1)
    feedback_text: Optional[str] = Field(None, max_length=500)


class ChatFeedbackResponse(BaseModel):
    id: int
    message: str


class ChatTraceItem(BaseModel):
    id: int
    intent_type: Optional[str] = None
    confidence: float = 0.0
    entities: list[str] = Field(default_factory=list)
    context_sources: list[dict] = Field(default_factory=list)
    created_at: datetime
