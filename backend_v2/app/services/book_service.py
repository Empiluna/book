"""图书查询、搜索、图谱关联的本地实现。

正式项目可将 search_books 替换为 ElasticSearch，将 graph_paths 替换为 Neo4j Cypher 查询。
当前版本使用 MySQL/SQLite 关系表模拟知识图谱关系，保证后端可直接运行。
"""

from __future__ import annotations

from typing import Iterable, Optional

from fastapi import HTTPException
from sqlalchemy import desc, or_
from sqlalchemy.orm import Session

from app.models.book import Author, Book, Publisher, Series, Tag
from app.schemas.book import BookCreate, BookSimple, GraphPathItem


def to_book_simple(book: Book) -> BookSimple:
    return BookSimple(
        id=book.id,
        title=book.title,
        authors=[a.name for a in book.authors],
        tags=[t.name for t in book.tags],
        cover_url=book.cover_url,
        avg_rating=float(book.avg_rating or 0.0),
        hot_score=float(book.hot_score or 0.0),
    )


def list_books(db: Session, skip: int = 0, limit: int = 20, tag: Optional[str] = None) -> list[Book]:
    query = db.query(Book).filter(Book.is_deleted.is_(False))
    if tag:
        query = query.join(Book.tags).filter(Tag.name.contains(tag))
    return query.order_by(desc(Book.hot_score), desc(Book.avg_rating), desc(Book.created_at)).offset(skip).limit(limit).all()


def get_book(db: Session, book_id: int) -> Book:
    book = db.query(Book).filter(Book.id == book_id, Book.is_deleted.is_(False)).first()
    if not book:
        raise HTTPException(status_code=404, detail="图书不存在或已下架")
    return book


def search_books(db: Session, keyword: str, limit: int = 20) -> list[Book]:
    keyword = (keyword or "").strip()
    if not keyword:
        raise HTTPException(status_code=400, detail="请输入搜索关键词")
    return (
        db.query(Book)
        .outerjoin(Book.authors)
        .outerjoin(Book.tags)
        .outerjoin(Book.publisher)
        .filter(
            Book.is_deleted.is_(False),
            or_(
                Book.title.contains(keyword),
                Book.description.contains(keyword),
                Author.name.contains(keyword),
                Tag.name.contains(keyword),
                Publisher.name.contains(keyword),
            ),
        )
        .order_by(desc(Book.avg_rating), desc(Book.hot_score))
        .limit(limit)
        .all()
    )


def create_book(db: Session, payload: BookCreate) -> Book:
    if payload.isbn:
        existing = db.query(Book).filter(Book.isbn == payload.isbn).first()
        if existing:
            raise HTTPException(status_code=400, detail="该 ISBN 的图书已存在")

    publisher = _get_or_create(db, Publisher, payload.publisher) if payload.publisher else None
    series = _get_or_create(db, Series, payload.series) if payload.series else None
    book = Book(
        title=payload.title,
        subtitle=payload.subtitle,
        isbn=payload.isbn,
        publisher=publisher,
        series=series,
        publication_year=payload.publication_year,
        description=payload.description,
        cover_url=payload.cover_url,
        page_count=payload.page_count,
        is_new=payload.is_new,
        hot_score=payload.hot_score,
    )
    db.add(book)
    for name in payload.authors:
        book.authors.append(_get_or_create(db, Author, name))
    for name in payload.tags:
        tag = _get_or_create(db, Tag, name)
        book.tags.append(tag)
    db.commit()
    db.refresh(book)
    return book


def soft_delete_book(db: Session, book_id: int) -> None:
    book = get_book(db, book_id)
    book.is_deleted = True
    db.commit()


def get_relations(db: Session, book_id: int) -> dict[str, list[Book]]:
    book = get_book(db, book_id)
    same_author = []
    same_tag = []
    same_publisher = []
    same_series = []

    author_ids = [a.id for a in book.authors]
    tag_ids = [t.id for t in book.tags]

    if author_ids:
        same_author = (
            db.query(Book)
            .join(Book.authors)
            .filter(Author.id.in_(author_ids), Book.id != book.id, Book.is_deleted.is_(False))
            .order_by(desc(Book.avg_rating))
            .limit(10)
            .all()
        )
    if tag_ids:
        same_tag = (
            db.query(Book)
            .join(Book.tags)
            .filter(Tag.id.in_(tag_ids), Book.id != book.id, Book.is_deleted.is_(False))
            .order_by(desc(Book.hot_score), desc(Book.avg_rating))
            .limit(10)
            .all()
        )
    if book.publisher_id:
        same_publisher = (
            db.query(Book)
            .filter(Book.publisher_id == book.publisher_id, Book.id != book.id, Book.is_deleted.is_(False))
            .order_by(desc(Book.avg_rating))
            .limit(10)
            .all()
        )
    if book.series_id:
        same_series = (
            db.query(Book)
            .filter(Book.series_id == book.series_id, Book.id != book.id, Book.is_deleted.is_(False))
            .order_by(Book.publication_year.asc().nullslast())
            .limit(10)
            .all()
        )
    return {
        "same_author": _dedupe_books(same_author),
        "same_tag": _dedupe_books(same_tag),
        "same_publisher": _dedupe_books(same_publisher),
        "same_series": _dedupe_books(same_series),
    }


def graph_paths(db: Session, book_id: int, limit: int = 20) -> list[GraphPathItem]:
    book = get_book(db, book_id)
    relations = get_relations(db, book_id)
    items: list[GraphPathItem] = []

    for b in relations["same_author"]:
        author_names = "、".join(a.name for a in book.authors)
        items.append(_path_item(b, "same_author", f"《{book.title}》—作者—{author_names}—作品—《{b.title}》", 1.0, "同作者作品"))
    for b in relations["same_tag"]:
        tag_names = "、".join(t.name for t in set(book.tags).intersection(set(b.tags))) or "相同标签"
        items.append(_path_item(b, "same_tag", f"《{book.title}》—标签—{tag_names}—图书—《{b.title}》", 0.8, "同标签相关"))
    for b in relations["same_series"]:
        series_name = book.series.name if book.series else "同系列"
        items.append(_path_item(b, "same_series", f"《{book.title}》—系列—{series_name}—图书—《{b.title}》", 0.6, "同系列推荐"))
    for b in relations["same_publisher"]:
        publisher_name = book.publisher.name if book.publisher else "同出版社"
        items.append(_path_item(b, "same_publisher", f"《{book.title}》—出版社—{publisher_name}—图书—《{b.title}》", 0.5, "同出版社图书"))

    # 去重，保留最高分路径。
    best: dict[int, GraphPathItem] = {}
    for item in items:
        if item.book.id not in best or item.score > best[item.book.id].score:
            best[item.book.id] = item
    return sorted(best.values(), key=lambda x: x.score, reverse=True)[:limit]


def _path_item(book: Book, relation_type: str, path: str, score: float, reason: str) -> GraphPathItem:
    return GraphPathItem(book=to_book_simple(book), relation_type=relation_type, path=path, score=score, reason=reason)


def _dedupe_books(books: Iterable[Book]) -> list[Book]:
    seen = set()
    result = []
    for book in books:
        if book.id in seen:
            continue
        seen.add(book.id)
        result.append(book)
    return result


def _get_or_create(db: Session, model, name: Optional[str]):
    name = (name or "").strip()
    if not name:
        return None
    obj = db.query(model).filter(model.name == name).first()
    if obj:
        return obj
    obj = model(name=name)
    db.add(obj)
    db.flush()
    return obj


DEMO_BOOKS = [
    {
        "title": "三体",
        "authors": ["刘慈欣"],
        "publisher": "重庆出版社",
        "series": "三体系列",
        "tags": ["科幻", "中国文学", "宇宙"],
        "description": "地球文明与三体文明的信息交流、生死搏杀及两个文明在宇宙中的兴衰历程。",
        "avg_rating": 4.8,
        "rating_count": 1200,
        "hot_score": 98,
        "is_new": False,
        "publication_year": 2008,
    },
    {
        "title": "球状闪电",
        "authors": ["刘慈欣"],
        "publisher": "四川科学技术出版社",
        "series": None,
        "tags": ["科幻", "物理", "中国文学"],
        "description": "围绕球状闪电现象展开的科幻故事，兼具科学想象与人物成长。",
        "avg_rating": 4.4,
        "rating_count": 600,
        "hot_score": 80,
        "is_new": False,
        "publication_year": 2005,
    },
    {
        "title": "深度学习入门",
        "authors": ["斋藤康毅"],
        "publisher": "人民邮电出版社",
        "series": None,
        "tags": ["人工智能", "深度学习", "Python", "编程"],
        "description": "从零实现深度学习核心算法，适合初学者理解神经网络基础。",
        "avg_rating": 4.6,
        "rating_count": 850,
        "hot_score": 92,
        "is_new": False,
        "publication_year": 2018,
    },
    {
        "title": "机器学习",
        "authors": ["周志华"],
        "publisher": "清华大学出版社",
        "series": None,
        "tags": ["人工智能", "机器学习", "计算机", "教材"],
        "description": "系统介绍机器学习基本概念、经典算法和理论基础。",
        "avg_rating": 4.7,
        "rating_count": 1500,
        "hot_score": 95,
        "is_new": False,
        "publication_year": 2016,
    },
    {
        "title": "Python编程：从入门到实践",
        "authors": ["埃里克·马瑟斯"],
        "publisher": "人民邮电出版社",
        "series": None,
        "tags": ["Python", "编程", "入门"],
        "description": "面向初学者的 Python 编程实践教程，包含项目实战。",
        "avg_rating": 4.5,
        "rating_count": 990,
        "hot_score": 86,
        "is_new": False,
        "publication_year": 2020,
    },
    {
        "title": "活着",
        "authors": ["余华"],
        "publisher": "作家出版社",
        "series": None,
        "tags": ["文学", "现实主义", "中国文学"],
        "description": "讲述普通人在时代苦难中的生命韧性。",
        "avg_rating": 4.9,
        "rating_count": 2200,
        "hot_score": 99,
        "is_new": False,
        "publication_year": 1993,
    },
    {
        "title": "万历十五年",
        "authors": ["黄仁宇"],
        "publisher": "中华书局",
        "series": None,
        "tags": ["历史", "明史", "通俗历史"],
        "description": "从万历十五年切入，分析明代政治和制度结构。",
        "avg_rating": 4.6,
        "rating_count": 1300,
        "hot_score": 90,
        "is_new": False,
        "publication_year": 1982,
    },
    {
        "title": "人工智能简史",
        "authors": ["尼克"],
        "publisher": "电子工业出版社",
        "series": None,
        "tags": ["人工智能", "科普", "技术史"],
        "description": "介绍人工智能的发展脉络、关键思想和应用趋势。",
        "avg_rating": 4.2,
        "rating_count": 300,
        "hot_score": 72,
        "is_new": True,
        "publication_year": 2024,
    },
]


def seed_demo_data(db: Session) -> int:
    if db.query(Book).count() > 0:
        return 0
    count = 0
    for item in DEMO_BOOKS:
        publisher = _get_or_create(db, Publisher, item.get("publisher")) if item.get("publisher") else None
        series = _get_or_create(db, Series, item.get("series")) if item.get("series") else None
        book = Book(
            title=item["title"],
            publisher=publisher,
            series=series,
            publication_year=item.get("publication_year"),
            description=item.get("description"),
            avg_rating=item.get("avg_rating", 0.0),
            rating_count=item.get("rating_count", 0),
            hot_score=item.get("hot_score", 0.0),
            is_new=item.get("is_new", False),
        )
        db.add(book)
        for author_name in item.get("authors", []):
            book.authors.append(_get_or_create(db, Author, author_name))
        for tag_name in item.get("tags", []):
            category = "技术" if tag_name in {"人工智能", "深度学习", "Python", "编程", "机器学习", "计算机", "教材", "入门"} else "文学社科"
            tag = db.query(Tag).filter(Tag.name == tag_name).first()
            if not tag:
                tag = Tag(name=tag_name, category=category)
                db.add(tag)
                db.flush()
            book.tags.append(tag)
        count += 1
    db.commit()
    return count
