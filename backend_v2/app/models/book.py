"""图书、作者、出版社、标签、系列等核心实体模型。"""

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Table, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


book_author = Table(
    "book_author",
    Base.metadata,
    Column("book_id", Integer, ForeignKey("books.id", ondelete="CASCADE"), primary_key=True),
    Column("author_id", Integer, ForeignKey("authors.id", ondelete="CASCADE"), primary_key=True),
)

book_tag = Table(
    "book_tag",
    Base.metadata,
    Column("book_id", Integer, ForeignKey("books.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)


class Publisher(Base):
    __tablename__ = "publishers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), unique=True, nullable=False, index=True)
    website = Column(String(512), nullable=True)

    books = relationship("Book", back_populates="publisher")


class Series(Base):
    __tablename__ = "series"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)

    books = relationship("Book", back_populates="series")


class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), unique=True, nullable=False, index=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(512), nullable=True)

    books = relationship("Book", secondary=book_author, back_populates="authors")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64), unique=True, nullable=False, index=True)
    category = Column(String(32), nullable=True, index=True)

    books = relationship("Book", secondary=book_tag, back_populates="tags")


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(256), nullable=False, index=True)
    subtitle = Column(String(256), nullable=True)
    isbn = Column(String(20), unique=True, nullable=True, index=True)
    publisher_id = Column(Integer, ForeignKey("publishers.id"), nullable=True)
    series_id = Column(Integer, ForeignKey("series.id"), nullable=True)
    publication_year = Column(Integer, nullable=True)
    description = Column(Text, nullable=True)
    cover_url = Column(String(512), nullable=True)
    page_count = Column(Integer, nullable=True)
    avg_rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    is_new = Column(Boolean, default=False, index=True)
    hot_score = Column(Float, default=0.0, index=True)
    purchase_url_jd = Column(String(512), nullable=True)
    purchase_url_dd = Column(String(512), nullable=True)
    purchase_url_tb = Column(String(512), nullable=True)
    is_deleted = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    publisher = relationship("Publisher", back_populates="books")
    series = relationship("Series", back_populates="books")
    authors = relationship("Author", secondary=book_author, back_populates="books")
    tags = relationship("Tag", secondary=book_tag, back_populates="books")
