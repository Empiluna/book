from app.models.user import (
    User, ReadingHistory, SearchLog, Bookmark, ReadingProgress, UserRating,
)
from app.models.book import (
    Book, Author, Publisher, Tag, Series,
)
from app.models.ecosystem import BookComment, CommentLike
from app.models.chat import ChatHistory
from app.core.database import Base, engine

__all__ = [
    # 核心
    "Base", "engine",
    # 用户画像 (模块一)
    "User", "ReadingHistory", "SearchLog", "Bookmark", "ReadingProgress", "UserRating",
    # 图书/知识图谱 (模块二)
    "Book", "Author", "Publisher", "Tag", "Series",
    # 阅读生态 (模块四)
    "BookComment", "CommentLike",
    # 智能问答助手 (模块五)
    "ChatHistory",
]
