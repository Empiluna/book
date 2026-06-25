"""模块五 · 智能问答助手数据模型。"""

from sqlalchemy import Column, DateTime, Enum, Float, ForeignKey, Index, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class ChatHistory(Base):
    """用户与智能助手的对话历史。"""

    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(Enum("user", "assistant", name="chat_role_enum"), nullable=False)
    content = Column(Text, nullable=False)
    intent_type = Column(String(32), nullable=True, index=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)

    user = relationship("User", back_populates="chat_history")

    __table_args__ = (Index("idx_chat_user_time", "user_id", "created_at"),)


class ChatFeedback(Base):
    """用户对智能助手回答的反馈。"""

    __tablename__ = "chat_feedback"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    message_id = Column(Integer, ForeignKey("chat_history.id", ondelete="CASCADE"), nullable=True, index=True)
    score = Column(Integer, nullable=False, default=1)  # 1=有帮助, -1=无帮助
    feedback_text = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)


class ChatContextTrace(Base):
    """智能助手上下文追踪。

    用于展示“意图识别—实体抽取—上下文来源—边界控制”的可解释链路。
    """

    __tablename__ = "chat_context_trace"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    assistant_message_id = Column(Integer, ForeignKey("chat_history.id", ondelete="CASCADE"), nullable=True, index=True)
    intent_type = Column(String(32), nullable=True, index=True)
    confidence = Column(Float, default=0.0)
    entities_json = Column(Text, nullable=True)
    context_sources_json = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)
