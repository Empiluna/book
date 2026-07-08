"""
Import books from book_read_inform into MySQL database.
Usage: python scripts/import_book_read_inform.py
"""
from __future__ import annotations

import json
import os
import re
import shutil
import sys
from pathlib import Path
from datetime import datetime

# Add project root to path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.core.database import SessionLocal
from app.models import Book, Author, Tag, Publisher, Series
from app.utils.tagging import normalize_tags

BOOK_READ_INFORM = ROOT / "book_read_inform"
DATA_BOOK_READ = ROOT / "data" / "book_read"
DATA_BOOK_READ.mkdir(parents=True, exist_ok=True)


def parse_year(year_str: str) -> int | None:
    """Extract year from strings like '2018-8-2', '2018', '2018年'"""
    if not year_str:
        return None
    match = re.search(r"(\d{4})", str(year_str))
    return int(match.group(1)) if match else None


def parse_pages(pages_str: str) -> int:
    """Extract page count from strings like '496', ' 224 '"""
    if not pages_str:
        return 240
    try:
        return int(str(pages_str).strip())
    except ValueError:
        return 240


def parse_score(score_str: str) -> float:
    """Parse score to float"""
    try:
        return float(score_str) if score_str else 0.0
    except ValueError:
        return 0.0


def parse_votes(votes_str: str) -> int:
    """Parse votes to int"""
    try:
        return int(str(votes_str).strip()) if votes_str else 0
    except ValueError:
        return 0


def find_ebook_file(category_dir: Path, title: str) -> tuple[str | None, str | None]:
    """Find epub/pdf/mobi/azw3 file for a book title in the book_read directory.
    Returns (pdf_url, epub_url) relative paths.
    """
    book_read_dir = category_dir / "book_read"
    if not book_read_dir.exists():
        return None, None

    # Normalize title for matching: remove special chars
    clean_title = re.sub(r'[【】《》「」""''：:？?！!（）\(\)\s]', '', title).lower()

    for f in book_read_dir.iterdir():
        if f.is_dir():
            continue
        fname = f.name
        fname_clean = re.sub(r'[【】《》「」""''：:？?！!（）\(\)\s]', '', fname).lower()
        fname_no_ext = Path(fname).stem
        fname_no_ext_clean = re.sub(r'[【】《》「」""''：:？?！!（）\(\)\s]', '', fname_no_ext).lower()

        # Match: filename contains title or title contains filename stem
        if clean_title in fname_no_ext_clean or fname_no_ext_clean in clean_title:
            suffix = f.suffix.lower()
            rel_path = f"/data/book_read/{f.name}"

            if suffix == ".pdf":
                return rel_path, None
            elif suffix == ".epub":
                return None, rel_path
            elif suffix in (".mobi", ".azw3"):
                # These formats aren't directly supported, skip or treat as epub
                return None, None

    return None, None


def import_category(category_name: str, db) -> int:
    """Import all books from one category folder. Returns count of imported books."""
    category_dir = BOOK_READ_INFORM / category_name
    if not category_dir.exists():
        print(f"  [SKIP] Directory not found: {category_dir}")
        return 0

    books_file = category_dir / "data" / "books.json"
    authors_file = category_dir / "data" / "Author.json"

    if not books_file.exists():
        print(f"  [SKIP] books.json not found in {category_dir}")
        return 0

    # Load data
    with open(books_file, "r", encoding="utf-8") as f:
        books_data = json.load(f)

    authors_data = {}
    if authors_file.exists():
        with open(authors_file, "r", encoding="utf-8") as f:
            authors_list = json.load(f)
        for a in authors_list:
            # Key by URL for matching
            if a.get("url"):
                authors_data[a["url"]] = a
            # Also key by name
            name_key = a.get("name", "").split()[0].strip()
            if name_key:
                authors_data[name_key] = a

    imported = 0
    skipped = 0

    for book_entry in books_data:
        title = book_entry.get("title", "").strip()
        if not title:
            continue

        isbn = (book_entry.get("isbn") or "").strip() or None

        # Check if book already exists (by ISBN or title)
        if isbn:
            existing = db.query(Book).filter(Book.isbn == isbn).first()
            if existing:
                print(f"    [EXISTS] {title} (ISBN: {isbn})")
                skipped += 1
                continue

        existing = db.query(Book).filter(Book.title == title).first()
        if existing:
            print(f"    [EXISTS] {title} (title match)")
            skipped += 1
            continue

        # --- Publisher ---
        publisher_name = (book_entry.get("publisher") or "").strip()
        publisher = None
        if publisher_name:
            publisher = db.query(Publisher).filter(Publisher.name == publisher_name).first()
            if not publisher:
                publisher = Publisher(name=publisher_name)
                db.add(publisher)
                db.flush()

        # --- Series ---
        series_name = (book_entry.get("series") or "").strip()
        series = None
        if series_name:
            series = db.query(Series).filter(Series.name == series_name).first()
            if not series:
                series = Series(name=series_name)
                db.add(series)
                db.flush()

        # --- Find ebook file ---
        pdf_url, epub_url = find_ebook_file(category_dir, title)

        # Copy ebook to data/book_read/ if found
        if pdf_url or epub_url:
            book_read_dir = category_dir / "book_read"
            for f in book_read_dir.iterdir():
                if f.is_dir() or f.name == "desktop.ini":
                    continue
                clean_title = re.sub(r'[【】《》「」""''：:？?！!（）\(\)\s]', '', title).lower()
                fname_no_ext_clean = re.sub(r'[【】《》「」""''：:？?！!（）\(\)\s]', '', f.stem).lower()
                if clean_title in fname_no_ext_clean or fname_no_ext_clean in clean_title:
                    dest = DATA_BOOK_READ / f.name
                    if not dest.exists():
                        shutil.copy2(str(f), str(dest))
                    break

        # --- Cover image ---
        cover_url = None
        image_path = (book_entry.get("image_path") or "").strip()
        if image_path:
            img_file = category_dir / image_path
            if img_file.exists():
                # Copy to data directory
                dest_img = DATA_BOOK_READ / img_file.name
                if not dest_img.exists():
                    shutil.copy2(str(img_file), str(dest_img))
                cover_url = f"/data/book_read/{img_file.name}"

        summary = book_entry.get("summary", "") or ""
        clean_tags = normalize_tags(book_entry.get("tags", []), category_name, title, summary)

        # --- Create Book ---
        book = Book(
            title=title,
            isbn=isbn,
            publisher_id=publisher.id if publisher else None,
            series_id=series.id if series else None,
            publication_year=parse_year(book_entry.get("publish_year", "")),
            category=clean_tags[0] if clean_tags else None,
            description=summary or None,
            page_count=parse_pages(book_entry.get("pages", "")),
            avg_rating=parse_score(book_entry.get("score", "")),
            rating_count=parse_votes(book_entry.get("votes", "")),
            ebook_pdf_url=pdf_url,
            ebook_epub_url=epub_url,
            cover_url=cover_url,
            language="zh-CN",
            is_new=True,
        )
        db.add(book)
        db.flush()

        # --- Authors ---
        author_names = book_entry.get("authors", [])
        author_urls = book_entry.get("author_urls", [])
        for i, author_name in enumerate(author_names):
            author_name = author_name.strip()
            if not author_name:
                continue

            # Get or create author
            author = db.query(Author).filter(Author.name == author_name).first()
            if not author:
                # Try to find bio from Author.json
                bio = None
                if i < len(author_urls) and author_urls[i] in authors_data:
                    bio = authors_data[author_urls[i]].get("brief_intro", "") or None
                elif author_name in authors_data:
                    bio = authors_data[author_name].get("brief_intro", "") or None

                author = Author(name=author_name, bio=bio)
                db.add(author)
                db.flush()

            # Link book-author (avoid duplicates)
            if author not in book.authors:
                book.authors.append(author)

        # --- Tags ---
        for tag_name in clean_tags:
            tag_name = tag_name.strip()
            if not tag_name:
                continue
            tag = db.query(Tag).filter(Tag.name == tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.add(tag)
                db.flush()
            if tag not in book.tags:
                book.tags.append(tag)

        db.flush()
        imported += 1
        status = f"PDF:{bool(pdf_url)} EPUB:{bool(epub_url)}"
        print(f"    [OK] {title} ({status})")

    db.commit()
    print(f"  Done: {imported} imported, {skipped} skipped")
    return imported


def main():
    print("=" * 60)
    print("Importing book_read_inform into MySQL")
    print("=" * 60)

    db = SessionLocal()
    try:
        categories = ["青春-小说", "教育-散文-武侠"]
        total = 0
        for cat in categories:
            print(f"\n[{cat}]")
            count = import_category(cat, db)
            total += count

        print(f"\n{'=' * 60}")
        print(f"Total imported: {total} books")
        print(f"{'=' * 60}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
