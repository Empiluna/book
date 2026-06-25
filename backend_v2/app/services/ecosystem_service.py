"""阅读生态服务：评论、点赞、试读、购书链接。"""

from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import desc, func
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.book import Book
from app.models.ecosystem import BookComment, CommentLike, PurchaseClick, TrialReadLog
from app.models.user import UserRating
from app.services.book_service import get_book

settings = get_settings()


def list_comments(db: Session, book_id: int, limit: int = 50) -> list[BookComment]:
    get_book(db, book_id)
    return (
        db.query(BookComment)
        .filter(BookComment.book_id == book_id, BookComment.is_deleted.is_(False))
        .order_by(desc(BookComment.is_pinned), desc(BookComment.likes_count), desc(BookComment.created_at))
        .limit(limit)
        .all()
    )


def create_comment(db: Session, user_id: int, book_id: int, content: str, rating: float | None = None) -> BookComment:
    get_book(db, book_id)
    row = BookComment(user_id=user_id, book_id=book_id, content=content.strip(), rating=rating)
    db.add(row)
    if rating is not None:
        existing = db.query(UserRating).filter(UserRating.user_id == user_id, UserRating.book_id == book_id).first()
        if existing:
            existing.rating = rating
        else:
            db.add(UserRating(user_id=user_id, book_id=book_id, rating=rating))
    db.commit()
    db.refresh(row)
    _sync_book_rating(db, book_id)
    return row


def toggle_like(db: Session, user_id: int, comment_id: int) -> tuple[bool, int]:
    comment = db.query(BookComment).filter(BookComment.id == comment_id, BookComment.is_deleted.is_(False)).first()
    if not comment:
        raise HTTPException(status_code=404, detail="评论不存在")
    like = db.query(CommentLike).filter(CommentLike.user_id == user_id, CommentLike.comment_id == comment_id).first()
    if like:
        db.delete(like)
        comment.likes_count = max(0, (comment.likes_count or 0) - 1)
        liked = False
    else:
        db.add(CommentLike(user_id=user_id, comment_id=comment_id))
        comment.likes_count = (comment.likes_count or 0) + 1
        liked = True
    db.commit()
    db.refresh(comment)
    return liked, comment.likes_count


def pin_comment(db: Session, comment_id: int, pinned: bool = True) -> BookComment:
    comment = db.query(BookComment).filter(BookComment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="评论不存在")
    comment.is_pinned = pinned
    db.commit()
    db.refresh(comment)
    return comment


def delete_comment(db: Session, comment_id: int) -> None:
    comment = db.query(BookComment).filter(BookComment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="评论不存在")
    comment.is_deleted = True
    db.commit()


def start_trial(db: Session, book_id: int, user_id: int | None) -> TrialReadLog:
    book = get_book(db, book_id)
    allowed = settings.TRIAL_PAGES_LOGGED_IN if user_id else settings.TRIAL_PAGES_ANONYMOUS
    if book.page_count:
        allowed = min(allowed, book.page_count)
    log = TrialReadLog(user_id=user_id, book_id=book_id, allowed_pages=allowed)
    db.add(log)
    db.commit()
    db.refresh(log)
    return log


def get_purchase_links(db: Session, book_id: int) -> list[dict]:
    book = get_book(db, book_id)
    links = []
    if book.purchase_url_jd:
        links.append({"channel": "jd", "url": book.purchase_url_jd})
    if book.purchase_url_dd:
        links.append({"channel": "dd", "url": book.purchase_url_dd})
    if book.purchase_url_tb:
        links.append({"channel": "tb", "url": book.purchase_url_tb})
    return links


def record_purchase_click(db: Session, book_id: int, channel: str, user_id: int | None = None) -> None:
    get_book(db, book_id)
    db.add(PurchaseClick(user_id=user_id, book_id=book_id, channel=channel))
    db.commit()


def _sync_book_rating(db: Session, book_id: int) -> None:
    avg_rating, count = db.query(func.avg(UserRating.rating), func.count(UserRating.id)).filter(UserRating.book_id == book_id).one()
    book = db.query(Book).filter(Book.id == book_id).first()
    if book:
        book.avg_rating = round(float(avg_rating or 0.0), 1)
        book.rating_count = int(count or 0)
        db.commit()
