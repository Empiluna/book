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
    TrialReadResponse, TrialContentResponse,
    PurchaseLinkUpdate, PurchaseLinkResponse,
    ShelfResponse, ShelfBookResponse, MoveBookRequest, RemoveBookRequest,
    ReadingStats,
)
from app.services import ecosystem_service

router = APIRouter()


# ═══════════════════════════════════════════════════════
# 试读
# ═══════════════════════════════════════════════════════

@router.get("/trial/{book_id}", response_model=TrialReadResponse,
            summary="获取试读信息")
def get_trial(
    book_id: int,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """获取图书试读权限和信息。未登录可试读3页，已登录可试读10页。"""
    info = ecosystem_service.get_trial_info(
        db, book_id,
        user_id=current_user.id if current_user else None,
    )
    if not info:
        raise HTTPException(status_code=404, detail="图书不存在")
    return TrialReadResponse(**info)


@router.get("/trial/{book_id}/content", response_model=TrialContentResponse,
            summary="获取试读内容")
def get_trial_content(
    book_id: int,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """返回试读页面的具体内容。以图书简介作为试读文本（生产环境可对接PDF.js）。"""
    content = ecosystem_service.get_trial_content(
        db, book_id,
        user_id=current_user.id if current_user else None,
    )
    if not content:
        raise HTTPException(status_code=404, detail="图书不存在")
    return TrialContentResponse(**content)


# ═══════════════════════════════════════════════════════
# 书评社区
# ═══════════════════════════════════════════════════════

@router.get("/comments/{book_id}", response_model=list[CommentResponse],
            summary="获取书评列表")
def get_comments(
    book_id: int,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """获取某图书的评论列表（置顶优先，按点赞数降序排列）。"""
    return ecosystem_service.get_book_comments(db, book_id, page, page_size)


@router.post("/comments", summary="发表书评")
def create_comment(
    req: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """对图书发表评论。"""
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
    """对评论点赞（重复点赞即取消）。"""
    liked = ecosystem_service.like_comment(db, current_user.id, req.comment_id)
    return {"status": "ok", "liked": liked}


@router.put("/comments/{comment_id}/pin", summary="置顶评论（管理员）")
def pin_comment(
    comment_id: int,
    is_pinned: bool = Query(True),
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """管理员置顶/取消置顶评论。"""
    ecosystem_service.pin_comment(db, comment_id, is_pinned)
    return {"status": "ok"}


@router.delete("/comments/{comment_id}", summary="删除评论")
def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """删除评论（作者本人或管理员可删）。"""
    ecosystem_service.delete_comment(
        db, comment_id,
        user_id=current_user.id,
        is_admin=current_user.is_admin,
    )
    return {"status": "ok"}


# ═══════════════════════════════════════════════════════
# 购书链接
# ═══════════════════════════════════════════════════════

@router.get("/purchase/{book_id}", response_model=PurchaseLinkResponse,
            summary="获取购书链接")
def get_purchase_links(
    book_id: int,
    db: Session = Depends(get_db),
):
    """获取某图书的多平台购书链接（京东/当当/淘宝）。"""
    result = ecosystem_service.get_purchase_links(db, book_id)
    return PurchaseLinkResponse(**result)


@router.put("/purchase", summary="配置购书链接（管理员）")
def update_purchase_links(
    req: PurchaseLinkUpdate,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """管理员为图书配置购书链接（京东/当当/淘宝）。"""
    book = ecosystem_service.update_purchase_links(
        db, req.book_id,
        url_jd=req.url_jd, url_dd=req.url_dd, url_tb=req.url_tb,
    )
    if not book:
        raise HTTPException(status_code=404, detail="图书不存在")
    return {"status": "ok", "book_title": book.title}


# ═══════════════════════════════════════════════════════
# 书架管理
# ═══════════════════════════════════════════════════════

@router.get("/shelves", response_model=list[ShelfResponse],
            summary="获取书架列表")
def get_shelves(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户的所有书架（含默认的想读/在读/已读）。"""
    return ecosystem_service.get_user_bookshelves(db, current_user.id)


@router.get("/shelves/{shelf_name}", response_model=list[ShelfBookResponse],
            summary="获取书架中的图书")
def get_shelf_books(
    shelf_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取指定书架中的图书列表（含书名、作者、标签等详情）。"""
    return ecosystem_service.get_shelf_books(db, current_user.id, shelf_name)


@router.put("/shelves/move", summary="移动图书到其他书架")
def move_book(
    req: MoveBookRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """将图书移动到另一个书架。"""
    result = ecosystem_service.move_book_to_shelf(
        db, current_user.id, req.book_id, req.new_shelf,
    )
    if not result:
        raise HTTPException(status_code=404, detail="该书未加入任何书架")
    return {"status": "ok", **result}


@router.delete("/shelves/remove-book", summary="从书架移除图书")
def remove_book(
    req: RemoveBookRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """从书架中移除某本图书（可指定书架名，不指定则从所有书架移除）。"""
    count = ecosystem_service.remove_book_from_shelf(
        db, current_user.id, req.book_id, req.shelf_name,
    )
    return {"status": "ok", "removed_count": count}


@router.delete("/shelves/{shelf_name}", summary="删除自定义书架")
def delete_shelf(
    shelf_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """删除自定义书架（默认书架不可删除）。书架内的图书记录同时删除。"""
    count = ecosystem_service.delete_shelf(db, current_user.id, shelf_name)
    if count == -1:
        raise HTTPException(
            status_code=400,
            detail="默认书架（想读/在读/已读）不可删除",
        )
    return {"status": "ok", "deleted_count": count}


# ═══════════════════════════════════════════════════════
# 阅读统计
# ═══════════════════════════════════════════════════════

@router.get("/stats", response_model=ReadingStats, summary="阅读统计")
def get_reading_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户多维阅读统计数据。"""
    stats = ecosystem_service.get_reading_stats(db, current_user.id)
    return ReadingStats(**stats)
