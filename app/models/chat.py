"""
═══════════════════════════════════════════════════════
【模块五 · 智能问答助手】数据模型
  负责人: ALL
  职责:
    1. 存储用户与AI助手的对话历史
    2. 支持多轮对话上下文回溯
    3. 记录意图类型用于分析和优化
═══════════════════════════════════════════════════════
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class ChatHistory(Base):
    """对话历史"""
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(Enum("user", "assistant", name="chat_role_enum"), nullable=False,
                  comment="消息角色: user=用户提问, assistant=AI回答")
    content = Column(Text, nullable=False, comment="消息内容")
    intent_type = Column(String(32), comment="意图类型: function_qa/book_rec/book_qa/personal_qa/admin_help/kg_assist")
    created_at = Column(DateTime, server_default=func.now(), comment="消息时间")

    # 关系
    user = relationship("User", back_populates="chat_history")

    def __repr__(self):
        return f"<ChatHistory(id={self.id}, user={self.user_id}, role={self.role}, intent={self.intent_type})>"
