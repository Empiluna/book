from __future__ import annotations

from typing import Any

import httpx


def search_openlibrary(keyword: str, limit: int = 20) -> list[dict[str, Any]]:
    """从 Open Library 搜索图书元数据，返回与 books.json 兼容的字典列表。"""
    url = "https://openlibrary.org/search.json"
    params = {"q": keyword, "limit": limit}
    resp = httpx.get(url, params=params, timeout=20)
    resp.raise_for_status()
    docs = resp.json().get("docs", [])

    books: list[dict[str, Any]] = []
    for doc in docs:
        isbn_list = doc.get("isbn") or []
        cover_id = doc.get("cover_i")
        cover_url = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg" if cover_id else None
        books.append({
            "title": doc.get("title"),
            "subtitle": doc.get("subtitle"),
            "authors": doc.get("author_name") or [],
            "publisher": (doc.get("publisher") or [None])[0],
            "series": (doc.get("series") or [None])[0] if doc.get("series") else None,
            "tags": doc.get("subject")[:8] if doc.get("subject") else [],
            "category": (doc.get("subject") or [None])[0] if doc.get("subject") else None,
            "isbn": isbn_list[0] if isbn_list else None,
            "publish_year": doc.get("first_publish_year"),
            "pages": None,
            "price": None,
            "score": None,
            "votes": None,
            "summary": "Open Library 元数据导入图书，简介可由管理员后续补充。",
            "image_url": cover_url,
            "source_url": f"https://openlibrary.org{doc.get('key')}" if doc.get("key") else None,
        })
    return [b for b in books if b.get("title")]
