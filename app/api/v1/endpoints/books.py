from __future__ import annotations

from datetime import datetime
from pathlib import Path
import re
import shutil
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, Query, Request, UploadFile
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_optional, require_admin
from app.core.database import get_db
from app.models import Author, Book, BookImportBatch, BookImportItem, Publisher, SearchLog, Series, Tag, User
from app.schemas import BookCreate, BookUpdate
from app.services.graph_service import GraphService
from app.services.search_service import SearchService
from app.services.serializers import book_card
from app.utils.tagging import clean_public_tags, normalize_tags

router = APIRouter(prefix="/books", tags=["公共 · 图书搜索与详情"])


ROOT_DIR = Path(__file__).resolve().parents[4]
DATA_DIR = ROOT_DIR / "data"
IMPORT_TMP_DIR = DATA_DIR / "book_uploads" / "import_tmp"
EPUB_DIR = DATA_DIR / "book_uploads" / "epubs"
COVER_DIR = DATA_DIR / "book_uploads" / "covers"
for _dir in (IMPORT_TMP_DIR, EPUB_DIR, COVER_DIR):
    _dir.mkdir(parents=True, exist_ok=True)


def _split_names(value: str | None) -> list[str]:
    return [x.strip() for x in re.split(r"[,，、;；]", value or "") if x.strip()]


def _safe_filename(filename: str) -> str:
    name = Path(filename or "book.epub").name.strip()
    name = re.sub(r'[\\/:*?"<>|]+', "_", name)
    return name or "book.epub"


def _dedupe_path(directory: Path, filename: str) -> Path:
    directory.mkdir(parents=True, exist_ok=True)
    path = directory / filename
    if not path.exists():
        return path
    stem = path.stem
    suffix = path.suffix
    for i in range(1, 9999):
        candidate = directory / f"{stem}_{i}{suffix}"
        if not candidate.exists():
            return candidate
    return directory / f"{stem}_{uuid.uuid4().hex[:8]}{suffix}"


def _import_item_payload(item: BookImportItem) -> dict:
    return {
        "id": item.id,
        "batch_id": item.batch_id,
        "original_filename": item.original_filename,
        "title": item.title,
        "authors_text": item.authors_text,
        "authors": _split_names(item.authors_text),
        "category": item.category,
        "tags_text": item.tags_text,
        "tags": _split_names(item.tags_text),
        "publisher": item.publisher,
        "publication_year": item.publication_year,
        "isbn": item.isbn,
        "page_count": item.page_count,
        "cover_url": item.cover_url,
        "description": item.description,
        "status": item.status,
        "error_message": item.error_message,
        "book_id": item.book_id,
        "final_epub_url": item.final_epub_url,
        "created_at": item.created_at.isoformat() if item.created_at else None,
        "updated_at": item.updated_at.isoformat() if item.updated_at else None,
    }


def _import_batch_payload(batch: BookImportBatch) -> dict:
    items = sorted(batch.items or [], key=lambda x: x.id)
    return {
        "id": batch.id,
        "batch_no": batch.batch_no,
        "status": batch.status,
        "created_at": batch.created_at.isoformat() if batch.created_at else None,
        "updated_at": batch.updated_at.isoformat() if batch.updated_at else None,
        "items": [_import_item_payload(x) for x in items],
    }


def _extract_upload_files(form, keys=("files", "file", "epubs", "epub_files")) -> list[UploadFile]:
    found: list[UploadFile] = []
    for key in keys:
        for value in form.getlist(key):
            if hasattr(value, "filename") and value.filename:
                found.append(value)
    # 兼容特殊表单名：如果前端字段名变化，也尽量把所有 UploadFile 收进来
    if not found:
        for value in form.values():
            if hasattr(value, "filename") and value.filename:
                found.append(value)
    return found


def _commit_import_item(db: Session, item: BookImportItem) -> Book:
    if item.status == "committed" and item.book_id:
        book = db.get(Book, item.book_id)
        if book:
            return book
    if not item.title:
        raise HTTPException(400, "请先填写书名")
    if item.isbn and db.query(Book).filter(Book.isbn == item.isbn).first():
        raise HTTPException(400, f"ISBN 已存在：{item.isbn}")

    source = Path(item.stored_epub_path)
    if not source.exists():
        raise HTTPException(404, "EPUB 临时文件不存在，可能已被移动或删除")

    final_path = _dedupe_path(EPUB_DIR, source.name)
    if source.resolve() != final_path.resolve():
        shutil.copyfile(source, final_path)
    final_url = "/data/book_uploads/epubs/" + final_path.name

    item_tags = normalize_tags(item.tags_text, item.category, item.title, item.description or "")

    book = Book(
        title=item.title.strip(),
        isbn=item.isbn or None,
        category=item_tags[0] if item_tags else None,
        publication_year=item.publication_year,
        page_count=item.page_count or 240,
        cover_url=item.cover_url or None,
        description=item.description or None,
        ebook_epub_url=final_url,
        is_new=True,
        hot_score=0.0,
    )
    if item.publisher:
        book.publisher = _get_or_create(db, Publisher, item.publisher.strip())
    book.authors = [_get_or_create(db, Author, name) for name in _split_names(item.authors_text)]
    book.tags = [_get_or_create(db, Tag, name) for name in item_tags]
    db.add(book)
    db.flush()

    item.book_id = book.id
    item.final_epub_url = final_url
    item.status = "committed"
    item.error_message = None
    db.add(item)
    db.commit()
    db.refresh(book)
    SearchService(db).index_book(book)
    GraphService(db).sync_from_mysql()
    return book


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
        clean_tags = clean_public_tags(tags)
        book.tags = [_get_or_create(db, Tag, name) for name in clean_tags]
        book.category = clean_tags[0] if clean_tags else None
    elif "category" in data:
        clean_tags = normalize_tags(None, book.category, book.title or "", book.description or "")
        book.tags = [_get_or_create(db, Tag, name) for name in clean_tags]
        book.category = clean_tags[0] if clean_tags else None
    db.add(book)
    db.commit()
    db.refresh(book)
    SearchService(db).index_book(book)
    return book


@router.get("/meta/options")
def book_options(db: Session = Depends(get_db)):
    books = (
        db.query(Book)
        .options(selectinload(Book.tags), selectinload(Book.authors), selectinload(Book.publisher))
        .filter(Book.is_deleted == False)
        .all()
    )  # noqa: E712
    tags = sorted({
        tag
        for b in books
        for t in b.tags
        for tag in clean_public_tags(t.name)
    })
    authors = sorted({a.name for b in books for a in b.authors})
    publishers = sorted({b.publisher.name for b in books if b.publisher})
    return {"categories": [], "tags": tags, "authors": authors, "publishers": publishers}


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
    effective_tag = tag or category
    return SearchService(db).search(q=q, category=None, tag=effective_tag, author=author, sort=sort, page=page, limit=limit, user=user, mode=mode)




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
def book_detail(book_id: int, include_graph: bool = Query(False), db: Session = Depends(get_db)):
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    data = book_card(book, include_description=True, include_purchase=True)
    if include_graph:
        data["graph_relations"] = GraphService(db).subgraph(book_id, depth=1)
    return data


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


@router.post("/admin/import-stage")
async def admin_stage_epub_import(
    request: Request,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    form = await request.form()
    epubs = _extract_upload_files(form)
    if not epubs:
        raise HTTPException(400, "请选择一个或多个 EPUB 文件")

    batch_no = datetime.utcnow().strftime("%Y%m%d%H%M%S") + "-" + uuid.uuid4().hex[:6]
    batch = BookImportBatch(batch_no=batch_no, created_by=admin.id, status="staged")
    db.add(batch)
    db.flush()

    staged_dir = IMPORT_TMP_DIR / batch_no
    staged_dir.mkdir(parents=True, exist_ok=True)
    created = 0
    skipped: list[dict] = []

    for file in epubs:
        filename = file.filename or ""
        if not filename.lower().endswith(".epub"):
            skipped.append({"filename": filename, "reason": "不是 EPUB 文件"})
            continue
        safe = _safe_filename(filename)
        dest = _dedupe_path(staged_dir, safe)
        with dest.open("wb") as out:
            shutil.copyfileobj(file.file, out)
        title = Path(filename).stem.strip() or "未命名图书"
        item = BookImportItem(
            batch_id=batch.id,
            original_filename=filename,
            stored_epub_path=str(dest),
            title=title,
            page_count=240,
            status="pending",
        )
        db.add(item)
        created += 1

    if created == 0:
        db.rollback()
        raise HTTPException(400, "没有可入库的 EPUB 文件")

    db.commit()
    db.refresh(batch)
    return {"message": f"已一次性暂存 {created} 本 EPUB", "created": created, "skipped": skipped, "batch": _import_batch_payload(batch)}


@router.get("/admin/import-batches")
def admin_list_import_batches(
    limit: int = Query(10, ge=1, le=50),
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    rows = db.query(BookImportBatch).order_by(BookImportBatch.id.desc()).limit(limit).all()
    return {"items": [_import_batch_payload(x) for x in rows]}


@router.get("/admin/import-batches/{batch_id}")
def admin_get_import_batch(batch_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    batch = db.get(BookImportBatch, batch_id)
    if not batch:
        raise HTTPException(404, "导入批次不存在")
    return _import_batch_payload(batch)


@router.put("/admin/import-items/{item_id}")
async def admin_update_import_item(
    item_id: int,
    request: Request,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    item = db.get(BookImportItem, item_id)
    if not item:
        raise HTTPException(404, "待入库图书不存在")
    if item.status == "committed":
        raise HTTPException(400, "该图书已入库，不能继续修改")

    content_type = request.headers.get("content-type", "")
    data: dict = {}
    cover_file = None
    if "multipart/form-data" in content_type:
        form = await request.form()
        data = {k: form.get(k) for k in form.keys() if k != "cover_file"}
        cover_file = form.get("cover_file")
    else:
        data = await request.json()

    def text_field(key: str):
        value = data.get(key)
        if value is None:
            return None
        value = str(value).strip()
        return value or None

    item.title = text_field("title") or item.title
    item.authors_text = text_field("authors") or text_field("authors_text")
    item.category = text_field("category")
    item.tags_text = text_field("tags") or text_field("tags_text")
    item.publisher = text_field("publisher")
    item.isbn = text_field("isbn")
    item.description = text_field("description")
    item.cover_url = text_field("cover_url") or item.cover_url

    year = text_field("publication_year") or text_field("publish_year")
    item.publication_year = int(year) if year and year.isdigit() else None
    pages = text_field("page_count")
    if pages and pages.isdigit():
        item.page_count = max(1, int(pages))

    if cover_file and hasattr(cover_file, "filename") and cover_file.filename:
        suffix = Path(cover_file.filename).suffix.lower()
        if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
            raise HTTPException(400, "封面只支持 jpg/jpeg/png/webp")
        cover_dest = _dedupe_path(COVER_DIR, _safe_filename(cover_file.filename))
        with cover_dest.open("wb") as out:
            shutil.copyfileobj(cover_file.file, out)
        item.cover_url = "/data/book_uploads/covers/" + cover_dest.name

    item.status = "edited" if item.title else "pending"
    item.error_message = None
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"message": "待入库信息已保存", "item": _import_item_payload(item)}


@router.post("/admin/import-items/{item_id}/commit")
def admin_commit_import_item(item_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    item = db.get(BookImportItem, item_id)
    if not item:
        raise HTTPException(404, "待入库图书不存在")
    try:
        book = _commit_import_item(db, item)
    except HTTPException:
        raise
    except Exception as exc:
        item.status = "failed"
        item.error_message = str(exc)
        db.add(item)
        db.commit()
        raise HTTPException(500, f"入库失败：{exc}")
    db.refresh(item)
    return {"message": "当前图书已正式入库", "item": _import_item_payload(item), "book": book_card(book)}


@router.post("/admin/import-batches/{batch_id}/commit")
def admin_commit_import_batch(batch_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    batch = db.get(BookImportBatch, batch_id)
    if not batch:
        raise HTTPException(404, "导入批次不存在")
    success = 0
    failed = 0
    for item in sorted(batch.items or [], key=lambda x: x.id):
        if item.status == "committed":
            continue
        if not item.title:
            item.status = "failed"
            item.error_message = "缺少书名"
            db.add(item)
            failed += 1
            continue
        try:
            _commit_import_item(db, item)
            success += 1
        except Exception as exc:
            db.rollback()
            fresh = db.get(BookImportItem, item.id)
            if fresh:
                fresh.status = "failed"
                fresh.error_message = str(exc)
                db.add(fresh)
                db.commit()
            failed += 1
    db.refresh(batch)
    return {"message": f"批量入库完成：成功 {success} 本，失败 {failed} 本", "success": success, "failed": failed, "batch": _import_batch_payload(batch)}


@router.delete("/admin/import-items/{item_id}")
def admin_delete_import_item(item_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    item = db.get(BookImportItem, item_id)
    if not item:
        raise HTTPException(404, "待入库图书不存在")
    if item.status == "committed":
        raise HTTPException(400, "已入库图书不能从待入库列表移除")
    path = Path(item.stored_epub_path)
    if path.exists():
        try:
            path.unlink()
        except OSError:
            pass
    db.delete(item)
    db.commit()
    return {"message": "已移除待入库文件"}


@router.get("/admin/export-json")
def export_json(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    books = db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
    return {"items": [book_card(b) for b in books], "total": len(books)}


@router.post("/admin/reindex-search")
def reindex_search(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return SearchService(db).bulk_index_books()
