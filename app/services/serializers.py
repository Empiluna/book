from __future__ import annotations

from datetime import datetime
from typing import Any
from urllib.parse import quote

from app.models import Book, BookComment, PurchaseLink, User
from app.utils.tagging import book_tag_names, main_tag
from app.utils.purchase_channels import build_purchase_channels


def _cover(title: str, category: str | None = None) -> str:
    palette = {
        "科幻": ("#23395d", "#5c7cfa"),
        "技术": ("#16213e", "#00d4ff"),
        "历史": ("#5f370e", "#e8b86d"),
        "文学": ("#633974", "#f5b7b1"),
        "经济": ("#0b5345", "#82e0aa"),
        "心理": ("#4a235a", "#d2b4de"),
    }
    a, b = palette.get(category or "", ("#1f2937", "#60a5fa"))
    svg = f"""<svg xmlns='http://www.w3.org/2000/svg' width='360' height='520'>
    <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='{a}'/><stop offset='1' stop-color='{b}'/></linearGradient></defs>
    <rect width='360' height='520' rx='26' fill='url(#g)'/>
    <circle cx='286' cy='72' r='72' fill='rgba(255,255,255,.16)'/>
    <circle cx='70' cy='430' r='100' fill='rgba(255,255,255,.12)'/>
    <text x='34' y='190' font-size='38' fill='white' font-family='Microsoft YaHei,Arial' font-weight='700'>{title[:8]}</text>
    <text x='34' y='245' font-size='22' fill='rgba(255,255,255,.84)' font-family='Microsoft YaHei,Arial'>Knowledge Graph Book</text>
    <text x='34' y='458' font-size='20' fill='rgba(255,255,255,.75)' font-family='Arial'>{category or 'Reading'}</text>
    </svg>"""
    return "data:image/svg+xml;charset=utf-8," + quote(svg)


def author_names(book: Book) -> list[str]:
    return [a.name for a in book.authors]


def tag_names(book: Book) -> list[str]:
    return book_tag_names(book)


def purchase_link_card(link: PurchaseLink) -> dict[str, Any]:
    return {
        "id": link.id,
        "book_id": link.book_id,
        "platform": link.platform,
        "url": link.url,
        "price": link.price,
        "is_active": link.is_active,
        "updated_at": link.updated_at.isoformat() if link.updated_at else None,
    }


def book_card(
    book: Book,
    score: float | None = None,
    reason: str | None = None,
    source: str | None = None,
    paths: list | None = None,
    include_description: bool = False,
    include_purchase: bool = False,
    include_trial_text: bool = False,
) -> dict[str, Any]:
    links = [purchase_link_card(x) for x in getattr(book, "purchase_links", []) if x.is_active] if include_purchase else []
    best = min(links, key=lambda x: x["price"] if x.get("price") is not None else 10**9) if links else None
    authors = author_names(book)
    tags = book_tag_names(book)
    category = main_tag(book) or "图书"
    cover_url = book.cover_url or _cover(book.title, category)
    cover_thumb_url = None
    if cover_url and cover_url.startswith("/data/book_read/"):
        name = cover_url.rsplit("/", 1)[-1].rsplit(".", 1)[0]
        cover_thumb_url = f"/data/book_read/thumbs/{name}.jpg"
    data = {
        "id": book.id,
        "book_id": book.id,
        "title": book.title,
        "subtitle": book.subtitle,
        "isbn": book.isbn,
        "authors": authors,
        "author": "、".join(authors) or "未知作者",
        "publisher": book.publisher.name if book.publisher else None,
        "series": book.series.name if book.series else None,
        "publication_year": book.publication_year,
        "category": category,
        "raw_category": book.category,
        "difficulty": book.difficulty,
        "tags": tags,
        "description": book.description if include_description else None,
        "cover_url": cover_url,
        "cover_thumb_url": cover_thumb_url or cover_url,
        "ebook_pdf_url": book.ebook_pdf_url,
        "ebook_epub_url": book.ebook_epub_url,
        "page_count": book.page_count,
        "avg_rating": round(book.avg_rating or 0, 1),
        "rating_count": book.rating_count,
        "view_count": book.view_count,
        "trial_count": book.trial_count,
        "hot_score": round(book.hot_score or 0, 3),
        "is_new": book.is_new,
        "is_deleted": book.is_deleted,
        "score": round(score, 4) if score is not None else None,
        "source": source,
        "reason": reason,
        "paths": paths or [],
    }
    if include_purchase:
        data["purchase_links"] = links
        data["best_purchase"] = best
        data["purchase_channels"] = build_purchase_channels(book.title, " ".join(authors), book.isbn or "")
    if include_trial_text:
        data["trial_text"] = book.trial_text
    return data


def user_card(user: User) -> dict[str, Any]:
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "nickname": user.nickname or user.username,
        "avatar_url": user.avatar_url,
        "is_active": user.is_active,
        "is_admin": user.is_admin,
        "created_at": user.created_at.isoformat() if user.created_at else None,
        "last_login_at": user.last_login_at.isoformat() if user.last_login_at else None,
    }


def comment_card(comment: BookComment, liked: bool | None = None) -> dict[str, Any]:
    username = comment.user.username if comment.user else "匿名用户"
    return {
        "id": comment.id,
        "book_id": comment.book_id,
        "book_title": comment.book.title if comment.book else None,
        "user_id": comment.user_id,
        "username": username,
        "nickname": comment.user.nickname if comment.user and comment.user.nickname else username,
        "content": comment.content,
        "rating": comment.rating,
        "likes_count": comment.likes_count,
        "is_pinned": comment.is_pinned,
        "liked": liked,
        "created_at": comment.created_at.isoformat() if comment.created_at else None,
    }


def dt(value: datetime | None) -> str | None:
    return value.isoformat() if value else None
