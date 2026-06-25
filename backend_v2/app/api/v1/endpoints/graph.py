"""模块二 · 知识图谱/图书查询 API。

本可运行版用关系表模拟图谱关联；正式版可替换为 Neo4j Cypher 查询。
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_admin_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.book import (
    BookCreate,
    BookDetail,
    BookSimple,
    GraphPathItem,
    GraphPathRequest,
    GraphRelationsResponse,
    SearchResponse,
)
from app.services import book_service

router = APIRouter()


@router.get("/books", response_model=list[BookSimple], summary="图书列表")
def list_books(skip: int = Query(0, ge=0), limit: int = Query(20, ge=1, le=100), tag: str | None = None, db: Session = Depends(get_db)):
    return [book_service.to_book_simple(b) for b in book_service.list_books(db, skip=skip, limit=limit, tag=tag)]


@router.get("/books/{book_id}", response_model=BookDetail, summary="图书详情")
def get_book(book_id: int, db: Session = Depends(get_db)):
    b = book_service.get_book(db, book_id)
    return BookDetail(
        **book_service.to_book_simple(b).model_dump(),
        subtitle=b.subtitle,
        isbn=b.isbn,
        publisher=b.publisher.name if b.publisher else None,
        series=b.series.name if b.series else None,
        publication_year=b.publication_year,
        description=b.description,
        page_count=b.page_count,
        rating_count=b.rating_count or 0,
        is_new=bool(b.is_new),
        purchase_url_jd=b.purchase_url_jd,
        purchase_url_dd=b.purchase_url_dd,
        purchase_url_tb=b.purchase_url_tb,
        created_at=b.created_at,
    )


@router.get("/search", response_model=SearchResponse, summary="关键词搜索图书")
def search(keyword: str = Query(..., min_length=1), limit: int = Query(20, ge=1, le=100), db: Session = Depends(get_db)):
    books = book_service.search_books(db, keyword, limit)
    return SearchResponse(keyword=keyword, total=len(books), books=[book_service.to_book_simple(b) for b in books])


@router.get("/books/{book_id}/relations", response_model=GraphRelationsResponse, summary="图书知识图谱关联")
def relations(book_id: int, db: Session = Depends(get_db)):
    data = book_service.get_relations(db, book_id)
    return GraphRelationsResponse(
        book_id=book_id,
        same_author=[book_service.to_book_simple(b) for b in data["same_author"]],
        same_tag=[book_service.to_book_simple(b) for b in data["same_tag"]],
        same_publisher=[book_service.to_book_simple(b) for b in data["same_publisher"]],
        same_series=[book_service.to_book_simple(b) for b in data["same_series"]],
    )


@router.post("/paths", response_model=list[GraphPathItem], summary="图谱路径推理推荐候选")
def paths(req: GraphPathRequest, db: Session = Depends(get_db)):
    return book_service.graph_paths(db, req.book_id, limit=req.limit)


@router.post("/books", response_model=BookDetail, summary="管理员新增图书")
def create_book(req: BookCreate, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    b = book_service.create_book(db, req)
    return get_book(b.id, db)


@router.delete("/books/{book_id}", summary="管理员删除图书（软删除）")
def delete_book(book_id: int, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    book_service.soft_delete_book(db, book_id)
    return {"status": "ok", "message": "图书已标记删除"}
