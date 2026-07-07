"""Public statistics endpoint — no authentication required."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.entities import Book, BookComment

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/stats")
def public_stats(db: Session = Depends(get_db)):
    """Return public stats for homepage display."""
    books = db.query(Book).filter(Book.is_deleted == False).count()  # noqa: E712
    comments = db.query(BookComment).filter(BookComment.is_deleted == False).count()  # noqa: E712
    return {
        "books": books,
        "comments": comments,
    }
