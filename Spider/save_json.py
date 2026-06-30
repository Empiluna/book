from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def save_books_json(books: list[dict[str, Any]], output: str = "data/books.json") -> str:
    out = Path(output)
    out.parent.mkdir(parents=True, exist_ok=True)

    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for book in books:
        key = (book.get("isbn") or book.get("source_url") or book.get("title") or "").strip()
        if not key or key in seen:
            continue
        seen.add(key)
        unique.append(book)

    out.write_text(json.dumps(unique, ensure_ascii=False, indent=2), encoding="utf-8")
    return str(out)
