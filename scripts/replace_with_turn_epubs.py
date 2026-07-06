from __future__ import annotations

import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.core.database import SessionLocal
from app.models.entities import Book


SOURCE_DIR = ROOT / "book_turn_epub" / "book_turn_epub"
TARGET_DIR = ROOT / "data" / "book_read"


# The converted EPUB files in book_turn_epub are better suited for the web
# reader than the older PDF/TXT/MOBI resources. Keep this list explicit so
# short names such as "三体" cannot accidentally match "三体Ⅱ" or "三体Ⅲ".
EPUB_REPLACEMENTS: dict[str, list[int]] = {
    "ABC谋杀案.epub": [204],
    "三体.epub": [1],
    "三体2：黑暗森林.epub": [60],
    "三体Ⅲ.epub": [66],
    "三国演义.epub": [27, 247],
    "人呐_莫言.epub": [109],
    "人间草木 .epub": [148],
    "伊加利亚的女儿们 .epub": [59],
    "光明王.epub": [237],
    "千江有水千江月.epub": [80],
    "卡拉马佐夫兄弟.epub": [31],
    "听见涛声 .epub": [75],
    "四世同堂.epub": [36],
    "夏日幽灵.epub": [73],
    "失去一切的人.epub": [233],
    "射雕英雄传.epub": [159],
    "少年维特的烦恼.epub": [35],
    "平凡的世界.epub": [24],
    "悉达多.epub": [42],
    "我在上东区做家教 .epub": [124],
    "旅行人信札.epub": [132],
    "活着.epub": [10],
    "珍珠.epub": [88],
    "百年孤独.epub": [23],
    "碧血剑.epub": [166],
    "秒速5厘米.epub": [85],
    "简爱.epub": [265],
    "红楼梦.epub": [34],
    "约翰·克利斯朵夫.epub": [267],
    "连城诀.epub": [183],
    "金钱心理学.epub": [129],
    "集体行动的逻辑、.epub": [243],
    "飘.epub": [28],
    "飞狐外传.epub": [168],
}


def target_name(source_name: str) -> str:
    stem = Path(source_name).stem.strip()
    return f"{stem}.epub"


def main() -> None:
    if not SOURCE_DIR.exists():
        raise SystemExit(f"Source directory does not exist: {SOURCE_DIR}")
    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    db = SessionLocal()
    copied: list[str] = []
    updated: list[str] = []
    missing_files: list[str] = []
    missing_books: list[int] = []
    try:
        for source_name, book_ids in EPUB_REPLACEMENTS.items():
            source_path = SOURCE_DIR / source_name
            if not source_path.exists():
                missing_files.append(source_name)
                continue

            dest_name = target_name(source_name)
            dest_path = TARGET_DIR / dest_name
            shutil.copy2(source_path, dest_path)
            copied.append(dest_name)

            epub_url = f"/data/book_read/{dest_name}"
            for book_id in book_ids:
                book = db.get(Book, book_id)
                if not book:
                    missing_books.append(book_id)
                    continue
                book.ebook_epub_url = epub_url
                book.ebook_pdf_url = None
                updated.append(f"{book.id}:{book.title} -> {epub_url}")

        if missing_files or missing_books:
            db.rollback()
            if missing_files:
                print("Missing EPUB files:")
                for name in missing_files:
                    print(f"  - {name}")
            if missing_books:
                print("Missing book IDs:")
                for book_id in missing_books:
                    print(f"  - {book_id}")
            raise SystemExit(1)

        db.commit()
    finally:
        db.close()

    print(f"Copied EPUB files: {len(copied)}")
    print(f"Updated book rows: {len(updated)}")
    for line in updated:
        print(line)


if __name__ == "__main__":
    main()
