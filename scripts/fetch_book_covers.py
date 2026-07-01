from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Iterable

import httpx

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.core.database import SessionLocal
from app.models.entities import Book

COVER_DIR = ROOT / "frontend" / "images" / "covers"
OPENLIBRARY_SEARCH = "https://openlibrary.org/search.json"
OPENLIBRARY_ISBN = "https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
OPENLIBRARY_ID = "https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"


def slug(value: str) -> str:
    text = re.sub(r"[^\w\u4e00-\u9fff]+", "-", value.strip().lower(), flags=re.UNICODE)
    return re.sub(r"-+", "-", text).strip("-")[:80] or "book"


def local_cover_path(book: Book) -> Path:
    name = f"{book.id}-{slug(book.title)}.jpg"
    return COVER_DIR / name


def local_cover_url(path: Path) -> str:
    return "/static/images/covers/" + path.name


def looks_like_image(response: httpx.Response) -> bool:
    content_type = response.headers.get("content-type", "")
    return response.status_code == 200 and content_type.startswith("image/") and len(response.content) > 1024


def search_cover_urls(client: httpx.Client, book: Book) -> list[str]:
    urls: list[str] = []
    authors = " ".join(a.name for a in book.authors)
    if book.isbn:
        urls.append(OPENLIBRARY_ISBN.format(isbn=re.sub(r"[^0-9Xx]", "", book.isbn)))
    query = " ".join(x for x in [book.title, authors] if x).strip()
    if not query:
        return urls
    resp = client.get(OPENLIBRARY_SEARCH, params={"q": query, "limit": 5}, timeout=20)
    resp.raise_for_status()
    for doc in resp.json().get("docs", []):
        cover_id = doc.get("cover_i")
        if cover_id:
            urls.append(OPENLIBRARY_ID.format(cover_id=cover_id))
    return list(dict.fromkeys(urls))


def candidate_books(limit: int | None, overwrite: bool) -> Iterable[Book]:
    db = SessionLocal()
    try:
        q = db.query(Book).filter(Book.is_deleted == False).order_by(Book.id)  # noqa: E712
        if not overwrite:
            q = q.filter((Book.cover_url == None) | (Book.cover_url == "") | (Book.cover_url.like("data:%")))  # noqa: E711
        if limit:
            q = q.limit(limit)
        yield from q.all()
    finally:
        db.close()


def fetch_covers(limit: int | None = None, overwrite: bool = False, dry_run: bool = False) -> None:
    COVER_DIR.mkdir(parents=True, exist_ok=True)
    books = list(candidate_books(limit, overwrite))
    if not books:
        print("No books need cover fetching.")
        return
    db = SessionLocal()
    try:
        with httpx.Client(follow_redirects=True, headers={"User-Agent": "book-system-cover-fetcher/1.0"}) as client:
            for book in books:
                attached = db.get(Book, book.id)
                if not attached:
                    continue
                target = local_cover_path(attached)
                if target.exists() and not overwrite:
                    attached.cover_url = local_cover_url(target)
                    print(f"[reuse] {attached.id} {attached.title} -> {attached.cover_url}")
                    continue
                try:
                    urls = search_cover_urls(client, attached)
                    if not urls:
                        print(f"[skip] {attached.id} {attached.title}: no cover found")
                        continue
                    response = None
                    for url in urls:
                        candidate = client.get(url, timeout=30)
                        if looks_like_image(candidate):
                            response = candidate
                            break
                    if response is None:
                        print(f"[skip] {attached.id} {attached.title}: no valid image response")
                        continue
                    if not dry_run:
                        target.write_bytes(response.content)
                        attached.cover_url = local_cover_url(target)
                    print(f"[ok] {attached.id} {attached.title} -> {local_cover_url(target)}")
                except Exception as exc:
                    print(f"[error] {attached.id} {attached.title}: {exc}")
        if not dry_run:
            db.commit()
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch book cover images from Open Library into local static files.")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of books to process.")
    parser.add_argument("--overwrite", action="store_true", help="Replace existing non-generated cover URLs too.")
    parser.add_argument("--dry-run", action="store_true", help="Find covers without writing files or updating DB.")
    args = parser.parse_args()
    fetch_covers(limit=args.limit, overwrite=args.overwrite, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
