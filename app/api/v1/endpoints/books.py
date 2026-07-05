from __future__ import annotations

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile
from sqlalchemy import func
from pathlib import Path
from uuid import uuid4
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_optional, require_admin
from app.core.database import get_db
from app.models import Author, Book, Publisher, SearchLog, Series, Tag, User
from app.schemas import BookCreate, BookUpdate
from app.services.graph_service import GraphService
from app.services.search_service import SearchService
from app.services.serializers import book_card

router = APIRouter(prefix="/books", tags=["公共 · 图书搜索与详情"])


def _get_or_create(db: Session, model, name: str):
    row = db.query(model).filter(model.name == name).first()
    if not row:
        row = model(name=name)
        db.add(row)
        db.flush()
    return row


def _apply_book_payload(db: Session, book: Book, payload: BookCreate | BookUpdate) -> Book:
    data = payload.model_dump(exclude_unset=True)
    authors = data.pop("authors", None)
    tags = data.pop("tags", None)
    publisher = data.pop("publisher", None)
    series = data.pop("series", None)
    for k, v in data.items():
        setattr(book, k, v)
    if publisher is not None:
        book.publisher = _get_or_create(db, Publisher, publisher) if publisher else None
    if series is not None:
        book.series = _get_or_create(db, Series, series) if series else None
    if authors is not None:
        book.authors = [_get_or_create(db, Author, name) for name in authors]
    if tags is not None:
        book.tags = [_get_or_create(db, Tag, name) for name in tags]
    db.add(book)
    db.commit()
    db.refresh(book)
    SearchService(db).index_book(book)
    return book


@router.get("/meta/options")
def book_options(db: Session = Depends(get_db)):
    books = db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
    cats = sorted({b.category for b in books if b.category})
    tags = sorted({t.name for b in books for t in b.tags})
    authors = sorted({a.name for b in books for a in b.authors})
    publishers = sorted({b.publisher.name for b in books if b.publisher})
    return {"categories": cats, "tags": tags, "authors": authors, "publishers": publishers}


@router.get("")
def list_books(
    q: str | None = Query(None),
    category: str | None = Query(None),
    tag: str | None = Query(None),
    author: str | None = Query(None),
    sort: str = Query("hot"),
    mode: str = Query("hybrid", pattern="^(hybrid|semantic|keyword)$"),
    page: int = Query(1, ge=1),
    limit: int = Query(24, ge=1, le=200),
    db: Session = Depends(get_db),
    user: User | None = Depends(get_current_user_optional),
):
    return SearchService(db).search(q=q, category=category, tag=tag, author=author, sort=sort, page=page, limit=limit, user=user, mode=mode)




@router.get("/hot-searches")
def hot_searches(limit: int = Query(10, ge=1, le=30), db: Session = Depends(get_db)):
    rows = (
        db.query(SearchLog.keyword, func.count(SearchLog.id).label("count"), func.max(SearchLog.created_at).label("last_at"))
        .filter(SearchLog.keyword != "")
        .group_by(SearchLog.keyword)
        .order_by(func.count(SearchLog.id).desc(), func.max(SearchLog.created_at).desc())
        .limit(limit)
        .all()
    )
    defaults = ["三体", "人工智能", "科幻", "Python", "历史", "机器学习", "文学", "经济"]
    items = [{"keyword": r.keyword, "count": int(r.count or 0), "last_at": r.last_at.isoformat() if r.last_at else None} for r in rows]
    existing = {x["keyword"] for x in items}
    for keyword in defaults:
        if len(items) >= limit:
            break
        if keyword not in existing:
            items.append({"keyword": keyword, "count": 0, "last_at": None})
    return {"items": items}


@router.get("/{book_id}")
def book_detail(book_id: int, db: Session = Depends(get_db)):
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    book.view_count += 1
    book.hot_score = (book.hot_score or 0) + 0.2
    db.commit()
    data = book_card(book)
    data["graph_relations"] = GraphService(db).subgraph(book_id, depth=1)
    return data



ROOT = Path(__file__).resolve().parents[4]
BOOK_UPLOAD_DIR = ROOT / "data" / "book_uploads"
EPUB_UPLOAD_DIR = BOOK_UPLOAD_DIR / "epubs"
COVER_UPLOAD_DIR = BOOK_UPLOAD_DIR / "covers"
ALLOWED_COVER_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def _safe_file_url(directory: Path, filename: str) -> str:
    # StaticFiles already mounts ROOT/data as /data in app.main.
    relative = directory.relative_to(ROOT / "data") / filename
    return "/data/" + "/".join(relative.parts)


async def _save_upload(upload: UploadFile, directory: Path, allowed_exts: set[str], prefix: str) -> tuple[str, str]:
    original = upload.filename or "upload"
    ext = Path(original).suffix.lower()
    if ext not in allowed_exts:
        raise HTTPException(400, f"文件格式不支持：{ext or '无扩展名'}")
    directory.mkdir(parents=True, exist_ok=True)
    filename = f"{prefix}_{uuid4().hex[:12]}{ext}"
    target = directory / filename
    content = await upload.read()
    if not content:
        raise HTTPException(400, "上传文件为空")
    target.write_bytes(content)
    return filename, _safe_file_url(directory, filename)


def _split_admin_values(value: str | None) -> list[str]:
    if not value:
        return []
    import re
    return [x.strip() for x in re.split(r"[,，、;；]", value) if x.strip()]


@router.post("/admin/upload-epub")
async def upload_epub_book(
    file: UploadFile = File(...),
    cover: UploadFile | None = File(None),
    title: str | None = Form(None),
    authors: str | None = Form(None),
    category: str | None = Form(None),
    tags: str | None = Form(None),
    publisher: str | None = Form(None),
    publication_year: int | None = Form(None),
    isbn: str | None = Form(None),
    page_count: int | None = Form(240),
    description: str | None = Form(None),
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """管理员上传 EPUB 并直接入库。

    上传成功后会创建 books 记录，并填写 ebook_epub_url。
    前台详情、在线阅读、评分、评论、书架、推荐和搜索都会把它当普通图书使用。
    """
    if isbn and db.query(Book).filter(Book.isbn == isbn).first():
        raise HTTPException(400, "该 ISBN 的图书已存在")

    epub_filename, epub_url = await _save_upload(file, EPUB_UPLOAD_DIR, {".epub"}, "book")
    cover_url = None
    if cover and cover.filename:
        _, cover_url = await _save_upload(cover, COVER_UPLOAD_DIR, ALLOWED_COVER_EXTS, "cover")

    base_title = (title or "").strip() or Path(file.filename or epub_filename).stem
    book = Book(
        title=base_title,
        isbn=(isbn or None),
        category=(category or None),
        publication_year=publication_year,
        description=(description or f"《{base_title}》由管理员上传 EPUB 资源生成。"),
        trial_text=(description or None),
        ebook_epub_url=epub_url,
        cover_url=cover_url,
        page_count=page_count or 240,
        is_new=True,
        hot_score=0.0,
    )
    if publisher:
        book.publisher = _get_or_create(db, Publisher, publisher.strip())
    author_list = _split_admin_values(authors) or ["未知作者"]
    book.authors = [_get_or_create(db, Author, name) for name in author_list]
    book.tags = [_get_or_create(db, Tag, name) for name in _split_admin_values(tags)]

    db.add(book)
    db.commit()
    db.refresh(book)

    SearchService(db).index_book(book)
    GraphService(db).sync_from_mysql()
    return {
        "message": "EPUB 图书上传成功，已入库并同步搜索/图谱",
        "book": book_card(book),
        "epub_url": epub_url,
        "cover_url": cover_url,
    }


@router.post("/admin")
def create_book(data: BookCreate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    if data.isbn and db.query(Book).filter(Book.isbn == data.isbn).first():
        raise HTTPException(400, "该ISBN的图书已存在")
    book = _apply_book_payload(db, Book(), data)
    GraphService(db).sync_from_mysql()
    SearchService(db).index_book(book)
    return {"message": "图书已创建并同步图谱/搜索索引", "book": book_card(book)}


@router.put("/admin/{book_id}")
def update_book(book_id: int, data: BookUpdate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(404, "图书不存在")
    book = _apply_book_payload(db, book, data)
    GraphService(db).sync_from_mysql()
    SearchService(db).index_book(book)
    return {"message": "图书已更新并同步图谱/搜索索引", "book": book_card(book)}


@router.delete("/admin/{book_id}")
def delete_book(book_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(404, "图书不存在")
    book.is_deleted = True
    db.commit()
    SearchService(db).bulk_index_books()
    GraphService(db).sync_from_mysql()
    return {"message": "图书已软删除并刷新索引"}


@router.post("/admin/import-json")
async def import_json(file: UploadFile = File(...), admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    import json
    content = await file.read()
    rows = json.loads(content.decode("utf-8"))
    created = 0
    for row in rows:
        data = BookCreate(**row)
        if data.isbn and db.query(Book).filter_by(isbn=data.isbn).first():
            continue
        _apply_book_payload(db, Book(), data)
        created += 1
    graph = GraphService(db).sync_from_mysql()
    search = SearchService(db).bulk_index_books()
    return {"message": "批量导入完成", "created": created, "graph": graph, "search": search}


@router.get("/admin/export-json")
def export_json(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    books = db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
    return {"items": [book_card(b) for b in books], "total": len(books)}


@router.post("/admin/reindex-search")
def reindex_search(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return SearchService(db).bulk_index_books()
