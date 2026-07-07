from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.core.database import Base, SessionLocal, engine  # noqa: E402
from app.models import Book, Tag  # noqa: E402
from app.services.graph_service import GraphService  # noqa: E402
from app.services.search_service import SearchService  # noqa: E402
from app.utils.tagging import normalize_tags  # noqa: E402


def _get_or_create_tag(db, name: str) -> Tag:
    tag = db.query(Tag).filter(Tag.name == name).first()
    if tag:
        return tag
    tag = Tag(name=name)
    db.add(tag)
    db.flush()
    return tag


def normalize_existing_books(
    *,
    dry_run: bool = False,
    clean_orphan_tags: bool = True,
    sync_graph: bool = True,
    reindex: bool = True,
) -> dict[str, Any]:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        books = db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
        changed = 0
        samples: list[dict[str, Any]] = []

        for book in books:
            old_tags = [tag.name for tag in book.tags]
            old_category = book.category
            clean_tags = normalize_tags(old_tags, old_category, book.title or "", book.description or "", trust_existing=False)
            new_category = clean_tags[0] if clean_tags else None

            if old_tags != clean_tags or old_category != new_category:
                changed += 1
                if len(samples) < 20:
                    samples.append({
                        "id": book.id,
                        "title": book.title,
                        "old_category": old_category,
                        "old_tags": old_tags,
                        "new_category": new_category,
                        "new_tags": clean_tags,
                    })

                if not dry_run:
                    book.category = new_category
                    book.tags = [_get_or_create_tag(db, name) for name in clean_tags]

        orphan_tags = 0
        if clean_orphan_tags and not dry_run:
            for tag in db.query(Tag).all():
                if not tag.books:
                    db.delete(tag)
                    orphan_tags += 1

        graph_result = None
        search_result = None
        if not dry_run:
            db.commit()
            if sync_graph:
                graph_result = GraphService(db).sync_from_mysql()
            if reindex:
                search_result = SearchService(db).bulk_index_books()
        else:
            db.rollback()

        return {
            "books": len(books),
            "changed": changed,
            "dry_run": dry_run,
            "orphan_tags_deleted": orphan_tags,
            "samples": samples,
            "graph": graph_result,
            "search": search_result,
        }
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Normalize existing MySQL book category/tags in place.")
    parser.add_argument("--dry-run", action="store_true", help="Only preview changes, do not write to database.")
    parser.add_argument("--keep-orphan-tags", action="store_true", help="Do not delete tags that are no longer attached to books.")
    parser.add_argument("--no-sync-graph", action="store_true", help="Do not rebuild graph relations.")
    parser.add_argument("--no-reindex", action="store_true", help="Do not rebuild search index.")
    args = parser.parse_args()

    result = normalize_existing_books(
        dry_run=args.dry_run,
        clean_orphan_tags=not args.keep_orphan_tags,
        sync_graph=not args.no_sync_graph,
        reindex=not args.no_reindex,
    )
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
