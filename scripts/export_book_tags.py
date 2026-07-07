from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.core.database import SessionLocal  # noqa: E402
from app.models import Book  # noqa: E402
from app.utils.tagging import book_tag_names, main_tag  # noqa: E402


def book_row(book: Book) -> dict[str, Any]:
    return {
        "id": book.id,
        "title": book.title or "",
        "authors": "、".join(author.name for author in book.authors),
        "category": main_tag(book) or "",
        "tags": "、".join(book_tag_names(book)),
        "publisher": book.publisher.name if book.publisher else "",
        "year": book.publication_year or "",
        "rating": book.avg_rating or 0,
        "is_deleted": bool(book.is_deleted),
        "description": (book.description or "").replace("\r", " ").replace("\n", " "),
    }


def export_book_tags(output: str, include_deleted: bool = False) -> dict[str, Any]:
    db = SessionLocal()
    try:
        query = db.query(Book).order_by(Book.id.asc())
        if not include_deleted:
            query = query.filter(Book.is_deleted == False)  # noqa: E712
        rows = [book_row(book) for book in query.all()]
    finally:
        db.close()

    path = Path(output)
    path.parent.mkdir(parents=True, exist_ok=True)

    if path.suffix.lower() == ".json":
        path.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    else:
        fields = [
            "id", "title", "authors", "category", "tags", "publisher",
            "year", "rating", "is_deleted", "description",
        ]
        with path.open("w", encoding="utf-8-sig", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=fields)
            writer.writeheader()
            writer.writerows(rows)

    return {"output": str(path), "rows": len(rows)}


def main() -> None:
    parser = argparse.ArgumentParser(description="Export current effective book category/tags for manual audit.")
    parser.add_argument("--output", default="exports/book_tags_audit.csv", help="Output .csv or .json path.")
    parser.add_argument("--include-deleted", action="store_true", help="Include soft-deleted books.")
    args = parser.parse_args()

    print(json.dumps(export_book_tags(args.output, args.include_deleted), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
