from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from sqlalchemy.orm import Session  # noqa: E402

from app.core.database import Base, SessionLocal, engine  # noqa: E402
from app.models import Author, Book, Publisher, PurchaseLink, Series, Tag  # noqa: E402
from app.services.graph_service import GraphService  # noqa: E402
from app.services.search_service import SearchService  # noqa: E402
from app.services.seed import seed_database  # noqa: E402


def _clean(value: Any) -> str | None:
    if value is None:
        return None
    value = str(value).strip()
    return value or None


def _as_list(value: Any) -> list[str]:
    if not value:
        return []
    if isinstance(value, list):
        return [str(x).strip() for x in value if str(x).strip()]
    return [x.strip() for x in str(value).replace("，", ",").replace("、", ",").split(",") if x.strip()]


def _get_or_create(db: Session, model, name: str):
    name = name.strip()
    row = db.query(model).filter(model.name == name).first()
    if not row:
        row = model(name=name)
        db.add(row)
        db.flush()
    return row


def _safe_float(value: Any) -> float | None:
    if isinstance(value, str):
        value = "".join(ch for ch in value if ch.isdigit() or ch in ".-")
    try:
        return None if value in (None, "") else float(value)
    except Exception:
        return None


def _safe_int(value: Any) -> int | None:
    if isinstance(value, str):
        digits = []
        for ch in value:
            if ch.isdigit():
                digits.append(ch)
            elif digits:
                break
        value = "".join(digits)
    try:
        return None if value in (None, "") else int(float(value))
    except Exception:
        return None


def _normalize_name(value: str) -> str:
    value = (
        value.replace("Ⅰ", "1").replace("Ⅱ", "2").replace("Ⅲ", "3")
        .replace("Ⅳ", "4").replace("Ⅴ", "5")
        .replace("一", "1").replace("二", "2").replace("三", "3")
    )
    return "".join(ch for ch in value.lower() if ch.isalnum() or "\u4e00" <= ch <= "\u9fff")


def _reading_files() -> list[Path]:
    folder = ROOT / "data" / "book_read"
    if not folder.exists():
        return []
    return [p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in {".pdf", ".epub"}]


def _reading_url(title: str, suffixes: set[str]) -> str | None:
    wanted = _normalize_name(title)
    if not wanted:
        return None
    candidates: list[tuple[int, Path]] = []
    for file in _reading_files():
        stem = _normalize_name(file.stem)
        if file.suffix.lower() not in suffixes:
            continue
        score = 0
        if stem == wanted:
            score = 100
        elif stem.startswith(wanted):
            score = 90
        elif wanted.startswith(stem):
            score = 55
        elif wanted in stem or stem in wanted:
            score = 50
        elif "3体3" in wanted and "3题3" in stem:
            score = 90
        if score:
            candidates.append((score - abs(len(stem) - len(wanted)), file))
    if candidates:
        file = sorted(candidates, key=lambda item: item[0], reverse=True)[0][1]
        rel = file.relative_to(ROOT / "data").as_posix()
        return "/data/" + quote(rel, safe="/")
    return None


def normalize_book(raw: dict[str, Any]) -> dict[str, Any]:
    """把 part2/Spider 输出字段映射为 v3 数据库字段。"""
    title = _clean(raw.get("title"))
    if not title:
        raise ValueError("缺少 title")

    return {
        "title": title,
        "subtitle": _clean(raw.get("subtitle")),
        "isbn": _clean(raw.get("isbn")),
        "authors": _as_list(raw.get("authors") or raw.get("author")),
        "publisher": _clean(raw.get("publisher")),
        "series": _clean(raw.get("series")),
        "tags": _as_list(raw.get("tags") or raw.get("tag")),
        "category": _clean(raw.get("category")) or (_as_list(raw.get("tags")) or [None])[0],
        "publication_year": _safe_int(raw.get("publish_year") or raw.get("publication_year")),
        "page_count": _safe_int(raw.get("pages") or raw.get("page_count")) or 240,
        "avg_rating": _safe_float(raw.get("score") or raw.get("avg_rating")) or 0.0,
        "rating_count": _safe_int(raw.get("votes") or raw.get("rating_count")) or 0,
        "description": _clean(raw.get("summary") or raw.get("description")) or "暂无简介",
        "cover_url": _clean(raw.get("image_path") or raw.get("cover_url") or raw.get("image_url")),
        "source_url": _clean(raw.get("source_url")),
        "price": _safe_float(raw.get("price")),
    }


def upsert_book(db: Session, item: dict[str, Any]) -> Book:
    data = normalize_book(item)

    book = None
    if data["isbn"]:
        book = db.query(Book).filter(Book.isbn == data["isbn"]).first()
    if not book:
        book = db.query(Book).filter(Book.title == data["title"]).first()
    if not book:
        book = Book(title=data["title"])
        db.add(book)

    book.subtitle = data["subtitle"]
    book.isbn = data["isbn"]
    book.category = data["category"]
    book.publication_year = data["publication_year"]
    book.page_count = data["page_count"]
    book.avg_rating = data["avg_rating"]
    book.rating_count = data["rating_count"]
    book.description = data["description"]
    book.trial_text = data["description"]
    book.cover_url = data["cover_url"]
    book.ebook_pdf_url = _reading_url(data["title"], {".pdf"})
    book.ebook_epub_url = _reading_url(data["title"], {".epub"})
    book.hot_score = (data["avg_rating"] or 0) * 12 + (data["rating_count"] or 0) / 10
    book.is_new = False

    if data["publisher"]:
        book.publisher = _get_or_create(db, Publisher, data["publisher"])
    if data["series"]:
        book.series = _get_or_create(db, Series, data["series"])

    authors = data["authors"] or ["未知作者"]
    book.authors = [_get_or_create(db, Author, name) for name in authors[:6]]

    tags = data["tags"] or ([data["category"]] if data["category"] else [])
    book.tags = [_get_or_create(db, Tag, name) for name in tags[:12]]

    db.flush()

    if data["source_url"] and not any(p.platform == "来源页" for p in book.purchase_links):
        db.add(PurchaseLink(book_id=book.id, platform="来源页", url=data["source_url"], price=data["price"], is_active=True))

    return book


def load_json(path: str) -> list[dict[str, Any]]:
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"未找到文件：{path}")
    data = json.loads(p.read_text(encoding="utf-8"))
    if isinstance(data, dict):
        data = data.get("books", [])
    if not isinstance(data, list):
        raise ValueError("JSON 格式应为图书数组，或包含 books 数组的对象")
    return data


def import_json(path: str, sync_graph: bool = True, reindex: bool = True) -> dict[str, Any]:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        items = load_json(path)
        ok = 0
        errors: list[str] = []
        for i, item in enumerate(items, start=1):
            try:
                upsert_book(db, item)
                ok += 1
            except Exception as exc:
                errors.append(f"第{i}条失败：{exc}")
        db.commit()

        graph_result = None
        search_result = None
        if sync_graph:
            graph_result = GraphService(db).sync_from_mysql()
        if reindex:
            search_result = SearchService(db).bulk_index_books()

        return {"input": path, "total": len(items), "imported": ok, "errors": errors[:20], "graph": graph_result, "search": search_result}
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="统一导入图书资源：seed / books.json / Open Library")
    parser.add_argument("--seed", action="store_true", help="导入内置演示数据")
    parser.add_argument("--input", default="data/books.json", help="导入 JSON 文件")
    parser.add_argument("--openlibrary", help="从 Open Library 搜索关键词并导入")
    parser.add_argument("--limit", type=int, default=30)
    parser.add_argument("--no-sync-graph", action="store_true", help="不同步 Neo4j/SQL 图谱关系")
    parser.add_argument("--no-reindex", action="store_true", help="不重建 ElasticSearch 索引")
    args = parser.parse_args()

    Base.metadata.create_all(bind=engine)

    if args.seed:
        db = SessionLocal()
        try:
            seed_database(db)
            print("内置种子数据导入完成")
        finally:
            db.close()
        return

    if args.openlibrary:
        from scripts.openlibrary_client import search_openlibrary
        books = search_openlibrary(args.openlibrary, limit=args.limit)
        Path("data").mkdir(exist_ok=True)
        Path(args.input).write_text(json.dumps(books, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Open Library 搜索完成：{len(books)} 本，已写入 {args.input}")

    result = import_json(args.input, sync_graph=not args.no_sync_graph, reindex=not args.no_reindex)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
