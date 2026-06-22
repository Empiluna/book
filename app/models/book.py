"""
──────────────────────────────────────────────────────
【模块二 · 知识图谱】相关 MySQL 数据模型
  负责成员: B
  表: books, authors, publishers, book_tags, series
  注: 图谱关系本身存在 Neo4j 中，MySQL 存实体属性
──────────────────────────────────────────────────────
"""
from sqlalchemy import (
    Column, Integer, String, Float, Text, DateTime,
    ForeignKey, Boolean, Table
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


# ── 多对多中间表 ──
book_author = Table(
    "book_author", Base.metadata,
    Column("book_id", Integer, ForeignKey("books.id"), primary_key=True),
    Column("author_id", Integer, ForeignKey("authors.id"), primary_key=True),
)

book_tag = Table(
    "book_tag", Base.metadata,
    Column("book_id", Integer, ForeignKey("books.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)


class Book(Base):
    """图书主表"""
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(256), nullable=False, index=True)
    subtitle = Column(String(256))
    isbn = Column(String(20), unique=True)
    publisher_id = Column(Integer, ForeignKey("publishers.id"))
    series_id = Column(Integer, ForeignKey("series.id"))
    series = relationship("Series", backref="books")
    publication_year = Column(Integer)
    description = Column(Text)
    cover_url = Column(String(512))
    page_count = Column(Integer)
    language = Column(String(32), default="zh-CN")
    avg_rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    is_new = Column(Boolean, default=False)          # 是否新书上架
    hot_score = Column(Float, default=0.0)           # 热度分
    purchase_url_jd = Column(String(512))            # 【模块四】京东购买链接
    purchase_url_dd = Column(String(512))            # 【模块四】当当购买链接
    purchase_url_tb = Column(String(512))            # 【模块四】淘宝购买链接
    created_at = Column(DateTime, server_default=func.now())

    # ── 关联 ──
    authors = relationship("Author", secondary=book_author, back_populates="books")
    tags = relationship("Tag", secondary=book_tag, back_populates="books")
    publisher = relationship("Publisher", backref="books")
    comments = relationship("BookComment", back_populates="book")


class Author(Base):
    """作者"""
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False, unique=True, index=True)
    bio = Column(Text)
    avatar_url = Column(String(512))

    books = relationship("Book", secondary=book_author, back_populates="authors")


class Publisher(Base):
    """出版社"""
    __tablename__ = "publishers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False, unique=True)


class Tag(Base):
    """主题标签"""
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64), nullable=False, unique=True, index=True)
    category = Column(String(32))  # 科幻、历史、编程...

    books = relationship("Book", secondary=book_tag, back_populates="tags")


class Series(Base):
    """丛书系列"""
    __tablename__ = "series"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False, unique=True)
    description = Column(Text)
