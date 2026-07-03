from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, object_session

from app.api.deps import get_current_user, get_current_user_optional, require_admin
from app.core.config import get_settings
from app.core.database import get_db
from app.models import Book, BookComment, Bookmark, Bookshelf, CommentLike, PurchaseClick, PurchaseLink, RecommendationFeedback, User
from app.schemas import BookmarkRequest, CommentCreate, CommentUpdate, PurchaseLinkCreate, PurchaseLinkUpdate, ShelfCreateRequest, ShelfRenameRequest
from app.services.serializers import book_card, comment_card, purchase_link_card
from app.services.user_service import add_bookmark, move_bookmark, reading_stats, update_book_rating
from app.utils.purchase_channels import build_purchase_channels

settings = get_settings()
router = APIRouter(prefix="/ecosystem", tags=["模块四 · 阅读生态"])


def _trial_payload(book: Book, user: User | None, *, record: bool = True) -> dict:
    if record:
        book.trial_count += 1
        if user:
            db = object_session(book)
            if db:
                db.add(
                    RecommendationFeedback(
                        user_id=user.id,
                        book_id=book.id,
                        event_type="trial",
                        source="trial_reader",
                    )
                )

    text = book.trial_text or book.description or "暂无试读内容。"
    chunks = [text[i:i + 560] for i in range(0, len(text), 560)] or ["暂无试读内容。"]
    allowed_pages = 99999  # unlimited reading

    return {
        "book": book_card(book),
        "logged_in": bool(user),
        "allowed_pages": allowed_pages,
        "content_type": "pdf" if book.ebook_pdf_url else ("epub" if book.ebook_epub_url else "text"),
        "pdf_url": book.ebook_pdf_url,
        "epub_url": book.ebook_epub_url,
        "reader_url": f"/static/reader.html?book_id={book.id}&record=0&v=raf-3&t={book.id}",
        "total_preview_pages": len(chunks),
        "pages": [{"page": i + 1, "content": c} for i, c in enumerate(chunks)],
        "reader_features": [
            "PDF.js预览",
            "EPUB.js预览",
            "翻页",
            "缩放",
            "目录导航",
            "书签",
            "进度保存",
            "夜间模式",
        ],
    }


@router.get("/trial/{book_id}")
def trial(
    book_id: int,
    record: bool = Query(True),
    db: Session = Depends(get_db),
    user: User | None = Depends(get_current_user_optional),
):
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    payload = _trial_payload(book, user, record=record)
    db.commit()
    return payload


@router.get("/trial/{book_id}/content")
def trial_content(book_id: int, page: int = Query(1, ge=1), db: Session = Depends(get_db), user: User | None = Depends(get_current_user_optional)):
    book = db.get(Book, book_id)
    if not book or book.is_deleted:
        raise HTTPException(404, "图书不存在")
    info = _trial_payload(book, user, record=False)
    allowed_pages = info["allowed_pages"]
    if page > allowed_pages:
        raise HTTPException(403, "试读页数超过当前权限")
    pages = info["pages"]
    return pages[page - 1] if page <= len(pages) else {"page": page, "content": "本页暂无内容"}


@router.get("/comments/{book_id}")
def comments(book_id: int, db: Session = Depends(get_db), user: User | None = Depends(get_current_user_optional)):
    rows = db.query(BookComment).filter_by(book_id=book_id, is_deleted=False).order_by(BookComment.is_pinned.desc(), BookComment.likes_count.desc(), BookComment.created_at.desc()).all()
    liked_ids = set()
    my_comment_id = None
    if user:
        liked_ids = {x.comment_id for x in db.query(CommentLike).filter(CommentLike.user_id == user.id, CommentLike.comment_id.in_([c.id for c in rows] or [0])).all()}
        own = next((c for c in rows if c.user_id == user.id), None)
        my_comment_id = own.id if own else None
    ratings = [c.rating for c in rows if c.rating]
    distribution = {str(i): 0 for i in range(1, 6)}
    for rating in ratings:
        distribution[str(int(round(rating)))] += 1
    avg_rating = round(sum(ratings) / len(ratings), 1) if ratings else 0
    return {
        "items": [comment_card(c, liked=c.id in liked_ids) for c in rows],
        "summary": {
            "total": len(rows),
            "avg_rating": avg_rating,
            "rating_count": len(ratings),
            "distribution": distribution,
            "pinned_count": sum(1 for c in rows if c.is_pinned),
            "my_comment_id": my_comment_id,
        },
    }


@router.post("/comments/{book_id}")
def add_comment(book_id: int, data: CommentCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not db.get(Book, book_id):
        raise HTTPException(404, "图书不存在")
    comment = BookComment(user_id=user.id, book_id=book_id, content=data.content, rating=data.rating)
    db.add(comment)
    db.commit(); db.refresh(comment)
    if data.rating:
        from app.services.user_service import rate_book
        rate_book(db, user, book_id, data.rating)
    update_book_rating(db, book_id)
    return {"message": "评论已发布", "comment": comment_card(comment)}


@router.put("/comments/{comment_id}")
def edit_comment(comment_id: int, data: CommentUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    comment = db.get(BookComment, comment_id)
    if not comment or comment.is_deleted:
        raise HTTPException(404, "评论不存在")
    if comment.user_id != user.id and not user.is_admin:
        raise HTTPException(403, "只能编辑自己的评论")
    if data.content is not None:
        comment.content = data.content
    if data.rating is not None:
        comment.rating = data.rating
        from app.services.user_service import rate_book
        rate_book(db, user, comment.book_id, data.rating)
    db.commit()
    update_book_rating(db, comment.book_id)
    return {"message": "评论已更新", "comment": comment_card(comment)}


@router.delete("/comments/{comment_id}")
def delete_own_comment(comment_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    comment = db.get(BookComment, comment_id)
    if not comment or comment.is_deleted:
        raise HTTPException(404, "评论不存在")
    if comment.user_id != user.id and not user.is_admin:
        raise HTTPException(403, "只能删除自己的评论")
    comment.is_deleted = True
    db.commit(); update_book_rating(db, comment.book_id)
    return {"message": "评论已删除"}


@router.post("/comments/{comment_id}/like")
def like_comment(comment_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    comment = db.get(BookComment, comment_id)
    if not comment or comment.is_deleted:
        raise HTTPException(404, "评论不存在")
    existing = db.query(CommentLike).filter_by(user_id=user.id, comment_id=comment_id).first()
    if existing:
        db.delete(existing); comment.likes_count = max(comment.likes_count - 1, 0); liked = False
    else:
        db.add(CommentLike(user_id=user.id, comment_id=comment_id)); comment.likes_count += 1; liked = True
    db.commit()
    return {"liked": liked, "likes_count": comment.likes_count}


@router.post("/admin/comments/{comment_id}/pin")
def pin_comment(comment_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    comment = db.get(BookComment, comment_id)
    if not comment:
        raise HTTPException(404, "评论不存在")
    comment.is_pinned = not comment.is_pinned
    db.commit()
    return {"message": "置顶状态已切换", "is_pinned": comment.is_pinned}


@router.delete("/admin/comments/{comment_id}")
def delete_comment(comment_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    comment = db.get(BookComment, comment_id)
    if not comment:
        raise HTTPException(404, "评论不存在")
    comment.is_deleted = True
    db.commit(); update_book_rating(db, comment.book_id)
    return {"message": "评论已删除"}


@router.get("/admin/comments")
def admin_comments(book_id: int | None = None, username: str | None = None, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    q = db.query(BookComment).filter(BookComment.is_deleted == False)  # noqa: E712
    if book_id:
        q = q.filter(BookComment.book_id == book_id)
    rows = q.order_by(BookComment.created_at.desc()).all()
    if username:
        rows = [r for r in rows if r.user and username in r.user.username]
    return {"items": [comment_card(c) for c in rows], "total": len(rows)}


@router.get("/purchase-links/{book_id}")
def purchase_links(book_id: int, db: Session = Depends(get_db)):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(404, "图书不存在")
    links = [purchase_link_card(x) for x in book.purchase_links if x.is_active]
    best = min(links, key=lambda x: x["price"] if x.get("price") is not None else 10**9) if links else None
    author = " ".join(a.name for a in book.authors)
    return {
        "book_id": book_id,
        "links": links,
        "best_price": best,
        "purchase_channels": build_purchase_channels(book.title, author, book.isbn or ""),
    }


@router.post("/purchase-click/{book_id}")
def purchase_click(book_id: int, channel: str, price: float | None = None, db: Session = Depends(get_db), user: User | None = Depends(get_current_user_optional)):
    db.add(PurchaseClick(user_id=user.id if user else None, book_id=book_id, channel=channel, price=price))
    book = db.get(Book, book_id)
    if book:
        book.hot_score += 0.5
        db.add(RecommendationFeedback(user_id=user.id if user else None, book_id=book_id, event_type="purchase_click", source=channel))
    db.commit()
    return {"message": "购书跳转已记录"}


@router.post("/purchase-links")
def create_purchase_link(data: PurchaseLinkCreate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    if not db.get(Book, data.book_id):
        raise HTTPException(404, "图书不存在")
    link = PurchaseLink(**data.model_dump())
    db.add(link); db.commit(); db.refresh(link)
    return {"message": "购书链接已新增", "link": purchase_link_card(link)}


@router.put("/purchase-links/{link_id}")
def update_purchase_link(link_id: int, data: PurchaseLinkUpdate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    link = db.get(PurchaseLink, link_id)
    if not link:
        raise HTTPException(404, "购书链接不存在")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(link, k, v)
    db.commit()
    return {"message": "购书链接已更新", "link": purchase_link_card(link)}


@router.delete("/purchase-links/{link_id}")
def delete_purchase_link(link_id: int, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    link = db.get(PurchaseLink, link_id)
    if not link:
        raise HTTPException(404, "购书链接不存在")
    link.is_active = False
    db.commit()
    return {"message": "购书链接已禁用"}


@router.get("/shelves")
def shelves(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.query(Bookmark).filter_by(user_id=user.id).all()
    grouped: dict[str, list] = {}
    for bm in rows:
        grouped.setdefault(bm.shelf_name, []).append({"bookmark_id": bm.id, "reading_status": bm.reading_status, "created_at": bm.created_at.isoformat(), "book": book_card(bm.book)})
    for shelf in db.query(Bookshelf).filter_by(user_id=user.id).all():
        grouped.setdefault(shelf.name, [])
    for name in ["想读", "在读", "已读"]:
        grouped.setdefault(name, [])
    return {"shelves": [{"name": name, "count": len(items), "books": items} for name, items in grouped.items()]}


@router.post("/shelves")
def create_shelf(data: ShelfCreateRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if db.query(Bookshelf).filter_by(user_id=user.id).count() >= settings.MAX_SHELVES_PER_USER:
        raise HTTPException(400, "书架数量已达上限")
    if db.query(Bookshelf).filter_by(user_id=user.id, name=data.name).first():
        raise HTTPException(400, "该书架名称已存在")
    shelf = Bookshelf(user_id=user.id, name=data.name, is_default=False)
    db.add(shelf); db.commit(); db.refresh(shelf)
    return {"message": "书架已创建", "shelf": {"id": shelf.id, "name": shelf.name}}


@router.put("/shelves/{shelf_name}")
def rename_shelf(shelf_name: str, data: ShelfRenameRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    shelf = db.query(Bookshelf).filter_by(user_id=user.id, name=shelf_name).first()
    if not shelf:
        raise HTTPException(404, "书架不存在")
    if shelf.is_default:
        raise HTTPException(400, "默认书架不可重命名")
    for bm in db.query(Bookmark).filter_by(user_id=user.id, shelf_name=shelf_name).all():
        bm.shelf_name = data.new_name
    shelf.name = data.new_name
    db.commit()
    return {"message": "书架已重命名"}


@router.delete("/shelves/{shelf_name}")
def delete_shelf(shelf_name: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    shelf = db.query(Bookshelf).filter_by(user_id=user.id, name=shelf_name).first()
    if not shelf:
        raise HTTPException(404, "书架不存在")
    if shelf.is_default or shelf_name in {"想读", "在读", "已读"}:
        raise HTTPException(400, "默认书架不可删除")
    db.query(Bookmark).filter_by(user_id=user.id, shelf_name=shelf_name).delete()
    db.delete(shelf); db.commit()
    return {"message": "书架已删除"}


@router.post("/shelves/book/{book_id}")
def add_to_shelf(book_id: int, data: BookmarkRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return add_bookmark(db, user, book_id, data.shelf_name, data.reading_status)


@router.put("/shelves/book/{book_id}/move")
def move_book(book_id: int, from_shelf: str, to_shelf: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return move_bookmark(db, user, book_id, from_shelf, to_shelf)


@router.delete("/shelves/book/{book_id}")
def remove_from_shelf(book_id: int, shelf_name: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    row = db.query(Bookmark).filter_by(user_id=user.id, book_id=book_id, shelf_name=shelf_name).first()
    if not row:
        raise HTTPException(404, "书架中没有这本书")
    db.delete(row); db.commit()
    return {"message": "已从书架移除"}


@router.get("/stats")
def ecosystem_stats(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return reading_stats(db, user)
