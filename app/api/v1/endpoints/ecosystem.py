"""
═══════════════════════════════════════════════════════
【模块四 · 阅读生态】API 端点
  负责人: D
  /api/v1/ecosystem/...
═══════════════════════════════════════════════════════
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.api.deps import get_current_user, get_current_user_optional, get_admin_user
from app.models.user import User
from app.schemas.ecosystem import (
    CommentCreate, CommentResponse, CommentLikeAction,
    TrialReadResponse,
    PurchaseLinkUpdate, PurchaseLinkResponse,
    ShelfCreate, ShelfResponse,
    ReadingStats,
)
from app.services import ecosystem_service

router = APIRouter()


# ═══════════════════════════════════════════════════════
# 试读 (3.4.1)
# ═══════════════════════════════════════════════════════

@router.get("/trial/{book_id}", response_model=TrialReadResponse, summary="获取试读信息")
def get_trial(
    book_id: int,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """
    获取图书试读权限和信息
    - 未登录: 可试读3页
    - 已登录: 可试读10页
    """
    info = ecosystem_service.get_trial_info(
        db, book_id,
        user_id=current_user.id if current_user else None,
    )
    if not info:
        raise HTTPException(status_code=404, detail="图书不存在")
    return TrialReadResponse(
        book_id=info["book_id"],
        book_title=info["book_title"],
        total_pages=info["total_pages"],
        allowed_pages=info["allowed_pages"],
        content_url=info["content_url"],
        current_progress=0.0,
    )


@router.get("/trial/{book_id}/content", summary="获取试读内容")
def get_trial_content(
    book_id: int,
    current_user: Optional[User] = Depends(get_current_user_optional),
):
    """
    返回试读页面的具体内容（Markdown/HTML）
    TODO: 对接 PDF.js 或直接返回文本
    """
    return {"book_id": book_id, "content": "试读内容占位"}


# ═══════════════════════════════════════════════════════
# 书评社区 (3.4.3)
# ═══════════════════════════════════════════════════════

@router.get("/comments/{book_id}", response_model=list[CommentResponse], summary="获取书评列表")
def get_comments(
    book_id: int,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """获取某图书的评论列表（置顶优先，按点赞数排序）"""
    return ecosystem_service.get_book_comments(db, book_id, page, page_size)


@router.post("/comments", summary="发表书评")
def create_comment(
    req: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """对图书发表评论"""
    comment = ecosystem_service.create_comment(
        db, current_user.id, req.book_id, req.content,
    )
    return {"status": "ok", "comment_id": comment.id}


@router.post("/comments/like", summary="点赞/取消点赞评论")
def toggle_like(
    req: CommentLikeAction,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """对评论点赞（重复点赞即取消）"""
    liked = ecosystem_service.like_comment(db, current_user.id, req.comment_id)
    return {"status": "ok", "liked": liked}


@router.put("/comments/{comment_id}/pin", summary="置顶评论（管理员）")
def pin_comment(
    comment_id: int,
    is_pinned: bool = Query(True),
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """管理员置顶/取消置顶评论"""
    ecosystem_service.pin_comment(db, comment_id, is_pinned)
    return {"status": "ok"}


@router.delete("/comments/{comment_id}", summary="删除评论")
def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """删除评论（作者本人或管理员）"""
    ecosystem_service.delete_comment(
        db, comment_id,
        user_id=current_user.id,
        is_admin=current_user.is_admin,
    )
    return {"status": "ok"}


# ═══════════════════════════════════════════════════════
# 购书链接 (3.4.4)
# ═══════════════════════════════════════════════════════

@router.get("/purchase/{book_id}", response_model=PurchaseLinkResponse, summary="获取购书链接")
def get_purchase_links(
    book_id: int,
    db: Session = Depends(get_db),
):
    """获取某图书的多平台购书链接"""
    links = ecosystem_service.get_purchase_links(db, book_id)
    return PurchaseLinkResponse(
        book_id=book_id,
        book_title="",
        prices=links,
    )


@router.put("/purchase", summary="配置购书链接（管理员）")
def update_purchase_links(
    req: PurchaseLinkUpdate,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """管理员为图书配置购书链接"""
    ecosystem_service.update_purchase_links(
        db, req.book_id,
        url_jd=req.url_jd, url_dd=req.url_dd, url_tb=req.url_tb,
    )
    return {"status": "ok"}


# ═══════════════════════════════════════════════════════
# 书架管理 (3.4.5)
# ═══════════════════════════════════════════════════════

@router.get("/shelves", response_model=list[ShelfResponse], summary="获取书架列表")
def get_shelves(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户的所有书架"""
    return ecosystem_service.get_user_bookshelves(db, current_user.id)


@router.get("/shelves/{shelf_name}", summary="获取书架中图书")
def get_shelf_books(
    shelf_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取指定书架中的图书列表"""
    return ecosystem_service.get_shelf_books(db, current_user.id, shelf_name)


@router.put("/shelves/move", summary="移动图书到其他书架")
def move_book(
    book_id: int,
    new_shelf: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """将图书移动到另一个书架"""
    ecosystem_service.move_book_to_shelf(db, current_user.id, book_id, new_shelf)
    return {"status": "ok"}


# ═══════════════════════════════════════════════════════
# 阅读统计 (3.4.2)
# ═══════════════════════════════════════════════════════

@router.get("/stats", response_model=ReadingStats, summary="阅读统计")
def get_reading_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户阅读统计数据"""
    # TODO: 实现完整的统计
    return ReadingStats(
        user_id=current_user.id,
        total_reading_time_minutes=0,
        books_completed=0,
        books_reading=0,
    )
