"""
═══════════════════════════════════════════════════════
【模块四 · 阅读生态】服务层
  负责人: D
  职责:
    1. 电子书在线试读
    2. 书评社区 (发评/点赞/置顶)
    3. 实体书购书链接管理
    4. 书架与收藏管理
═══════════════════════════════════════════════════════
"""
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import Optional

from app.models.ecosystem import BookComment, CommentLike
from app.models.user import Bookmark, User
from app.models.book import Book
from app.core.config import get_settings

settings = get_settings()


# ═══════════════════════════════════════════════════════
# 试读服务 (3.4.1)
# ═══════════════════════════════════════════════════════

def get_trial_info(db: Session, book_id: int, user_id: Optional[int] = None) -> dict:
    """获取试读信息"""
    book = db.query(Book).get(book_id)
    if not book:
        return {}
    allowed_pages = (
        settings.TRIAL_PAGES_LOGGED_IN if user_id
        else settings.TRIAL_PAGES_ANONYMOUS
    )
    return {
        "book_id": book.id,
        "book_title": book.title,
        "total_pages": book.page_count or 300,
        "allowed_pages": min(allowed_pages, book.page_count or 300),
        "content_url": f"/api/v1/ecosystem/trial/{book_id}/content",
    }


# ═══════════════════════════════════════════════════════
# 书评社区 (3.4.3)
# ═══════════════════════════════════════════════════════

def create_comment(db: Session, user_id: int, book_id: int, content: str) -> BookComment:
    """发表书评"""
    comment = BookComment(user_id=user_id, book_id=book_id, content=content)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def get_book_comments(
    db: Session, book_id: int, page: int = 1, page_size: int = 20
) -> list[BookComment]:
    """获取图书评论列表（置顶优先，按点赞数排序）"""
    return (
        db.query(BookComment)
        .filter(BookComment.book_id == book_id)
        .order_by(desc(BookComment.is_pinned), desc(BookComment.likes_count), desc(BookComment.created_at))
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )


def like_comment(db: Session, user_id: int, comment_id: int) -> bool:
    """点赞评论 (toggle)"""
    existing = db.query(CommentLike).filter(
        CommentLike.user_id == user_id,
        CommentLike.comment_id == comment_id,
    ).first()
    if existing:
        db.delete(existing)
        db.commit()
        _update_comment_likes(db, comment_id)
        return False  # 取消点赞
    like = CommentLike(user_id=user_id, comment_id=comment_id)
    db.add(like)
    db.commit()
    _update_comment_likes(db, comment_id)
    return True  # 点赞成功


def _update_comment_likes(db: Session, comment_id: int):
    """内部: 更新评论点赞数"""
    count = db.query(CommentLike).filter(
        CommentLike.comment_id == comment_id
    ).count()
    db.query(BookComment).filter(BookComment.id == comment_id).update(
        {"likes_count": count}
    )
    db.commit()


def pin_comment(db: Session, comment_id: int, is_pinned: bool = True):
    """管理员置顶/取消置顶评论"""
    db.query(BookComment).filter(BookComment.id == comment_id).update(
        {"is_pinned": is_pinned}
    )
    db.commit()


def delete_comment(db: Session, comment_id: int, user_id: int = None, is_admin: bool = False):
    """删除评论（作者本人或管理员可删）"""
    query = db.query(BookComment).filter(BookComment.id == comment_id)
    if not is_admin and user_id:
        query = query.filter(BookComment.user_id == user_id)
    query.delete()
    db.commit()


# ═══════════════════════════════════════════════════════
# 购书链接 (3.4.4)
# ═══════════════════════════════════════════════════════

def update_purchase_links(db: Session, book_id: int,
                          url_jd: str = None, url_dd: str = None, url_tb: str = None):
    """管理员配置购书链接"""
    book = db.query(Book).get(book_id)
    if not book:
        return None
    if url_jd is not None:
        book.purchase_url_jd = url_jd
    if url_dd is not None:
        book.purchase_url_dd = url_dd
    if url_tb is not None:
        book.purchase_url_tb = url_tb
    db.commit()
    return book


def get_purchase_links(db: Session, book_id: int) -> list[dict]:
    """获取购书链接"""
    book = db.query(Book).get(book_id)
    if not book:
        return []
    links = []
    if book.purchase_url_jd:
        links.append({"platform": "京东", "url": book.purchase_url_jd})
    if book.purchase_url_dd:
        links.append({"platform": "当当", "url": book.purchase_url_dd})
    if book.purchase_url_tb:
        links.append({"platform": "淘宝", "url": book.purchase_url_tb})
    return links


# ═══════════════════════════════════════════════════════
# 书架管理 (3.4.5)
# ═══════════════════════════════════════════════════════

def get_user_bookshelves(db: Session, user_id: int) -> list[dict]:
    """获取用户书架列表"""
    shelves = (
        db.query(Bookmark.shelf_name, func.count(Bookmark.id).label("cnt"))
        .filter(Bookmark.user_id == user_id)
        .group_by(Bookmark.shelf_name)
        .all()
    )
    return [
        {"name": s[0], "book_count": s[1]}
        for s in shelves
    ]


def get_shelf_books(db: Session, user_id: int, shelf_name: str) -> list:
    """获取某个书架的图书列表"""
    bookmarks = (
        db.query(Bookmark)
        .filter(
            Bookmark.user_id == user_id,
            Bookmark.shelf_name == shelf_name,
        )
        .all()
    )
    return bookmarks


def move_book_to_shelf(db: Session, user_id: int, book_id: int, new_shelf: str):
    """移动图书到另一个书架"""
    bookmark = db.query(Bookmark).filter(
        Bookmark.user_id == user_id,
        Bookmark.book_id == book_id,
    ).first()
    if bookmark:
        bookmark.shelf_name = new_shelf
        db.commit()
    return bookmark
