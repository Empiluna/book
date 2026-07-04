from __future__ import annotations

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_optional, require_admin
from app.core.database import get_db
from app.models import Author, Book, Publisher, SearchLog, Series, Tag, User
from app.schemas import BookCreate, BookUpdate
from app.services.graph_service import GraphService
from app.services.search_service import SearchService
from app.services.serializers import book_card
from app.utils.categories import primary_category
from app.utils.search_terms import is_valid_search_keyword

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
    if "category" in data:
        data["category"] = primary_category(data.get("category"))
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
    cats = sorted({primary_category(b.category) for b in books if primary_category(b.category)})
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
        .limit(limit * 3)
        .all()
    )
    defaults = ["三体", "人工智能", "科幻", "Python", "历史", "机器学习", "文学", "经济"]
    items = [
        {"keyword": r.keyword, "count": int(r.count or 0), "last_at": r.last_at.isoformat() if r.last_at else None}
        for r in rows
        if is_valid_search_keyword(r.keyword)
    ][:limit]
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
