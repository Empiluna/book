"""模块四 · 阅读生态 API。"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_admin_user, get_current_user, get_current_user_optional
from app.core.database import get_db
from app.models.user import User
from app.schemas.ecosystem import (
    CommentCreate,
    CommentResponse,
    LikeResponse,
    PurchaseClickRequest,
    PurchaseLinksResponse,
    TrialResponse,
)
from app.services import ecosystem_service

router = APIRouter()


@router.get("/comments/{book_id}", response_model=list[CommentResponse], summary="查看图书评论")
def list_comments(book_id: int, limit: int = Query(50, ge=1, le=200), db: Session = Depends(get_db)):
    return [_comment_response(c) for c in ecosystem_service.list_comments(db, book_id, limit)]


@router.post("/comments", response_model=CommentResponse, summary="发表评论/评分")
def create_comment(req: CommentCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    row = ecosystem_service.create_comment(db, current_user.id, req.book_id, req.content, req.rating)
    return _comment_response(row)


@router.post("/comments/{comment_id}/like", response_model=LikeResponse, summary="评论点赞/取消点赞")
def like(comment_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    liked, likes_count = ecosystem_service.toggle_like(db, current_user.id, comment_id)
    return LikeResponse(comment_id=comment_id, liked=liked, likes_count=likes_count)


@router.post("/comments/{comment_id}/pin", response_model=CommentResponse, summary="管理员置顶评论")
def pin(comment_id: int, pinned: bool = True, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    return _comment_response(ecosystem_service.pin_comment(db, comment_id, pinned))


@router.delete("/comments/{comment_id}", summary="删除评论")
def delete_comment(comment_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # 演示版：管理员可以删任何评论；普通用户只能删自己的评论。
    comment = db.query(ecosystem_service.BookComment).filter(ecosystem_service.BookComment.id == comment_id).first()
    if comment and (current_user.is_admin or comment.user_id == current_user.id):
        ecosystem_service.delete_comment(db, comment_id)
        return {"status": "ok", "message": "评论已删除"}
    return {"status": "forbidden", "message": "无权删除该评论"}


@router.post("/trial/{book_id}", response_model=TrialResponse, summary="开始在线试读")
def trial(book_id: int, current_user: User | None = Depends(get_current_user_optional), db: Session = Depends(get_db)):
    log = ecosystem_service.start_trial(db, book_id, current_user.id if current_user else None)
    book = db.query(ecosystem_service.Book).filter(ecosystem_service.Book.id == book_id).first()
    return TrialResponse(book_id=book_id, book_title=book.title if book else "未知图书", allowed_pages=log.allowed_pages, message=f"可试读 {log.allowed_pages} 页")


@router.get("/purchase-links/{book_id}", response_model=PurchaseLinksResponse, summary="查看购书链接")
def purchase_links(book_id: int, db: Session = Depends(get_db)):
    links = ecosystem_service.get_purchase_links(db, book_id)
    return PurchaseLinksResponse(book_id=book_id, links=links)


@router.post("/purchase-links/{book_id}/click", summary="记录购书跳转点击")
def purchase_click(book_id: int, req: PurchaseClickRequest, current_user: User | None = Depends(get_current_user_optional), db: Session = Depends(get_db)):
    ecosystem_service.record_purchase_click(db, book_id, req.channel, current_user.id if current_user else None)
    return {"status": "ok", "message": "购书点击已记录"}


def _comment_response(c):
    return CommentResponse(
        id=c.id,
        user_id=c.user_id,
        username=c.user.username if getattr(c, "user", None) else None,
        book_id=c.book_id,
        book_title=c.book.title if getattr(c, "book", None) else None,
        content=c.content,
        rating=c.rating,
        likes_count=c.likes_count or 0,
        is_pinned=bool(c.is_pinned),
        created_at=c.created_at,
    )
