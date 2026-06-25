"""
═══════════════════════════════════════════════════════
【模块四 · 阅读生态】服务层
  负责人: D
  职责:
    1. 电子书在线试读
    2. 书评社区 (发评/点赞/置顶)
    3. 实体书购书链接管理
    4. 书架与收藏管理
    5. 阅读统计
═══════════════════════════════════════════════════════
"""
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import Optional

from app.models.ecosystem import BookComment, CommentLike
from app.models.user import Bookmark, User, ReadingHistory, UserRating, ReadingProgress
from app.models.book import Book, Author, Tag
from app.core.config import get_settings

settings = get_settings()


# ═══════════════════════════════════════════════════════
# 试读服务
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
    # 获取当前阅读进度
    current_progress = 0.0
    if user_id:
        progress = db.query(ReadingProgress).filter(
            ReadingProgress.user_id == user_id,
            ReadingProgress.book_id == book_id,
        ).first()
        if progress:
            current_progress = progress.progress_percent or 0.0

    return {
        "book_id": book.id,
        "book_title": book.title,
        "total_pages": book.page_count or 300,
        "allowed_pages": min(allowed_pages, book.page_count or 300),
        "content_url": f"/api/v1/ecosystem/trial/{book_id}/content",
        "current_progress": current_progress,
    }


def get_trial_content(db: Session, book_id: int,
                      user_id: Optional[int] = None) -> dict:
    """获取试读具体内容"""
    book = db.query(Book).get(book_id)
    if not book:
        return None

    # 用图书简介作为试读内容（生产环境可对接PDF.js/EPUB解析）
    description = book.description or f"《{book.title}》的精彩内容即将呈现..."
    authors = [a.name for a in book.authors]
    tags = [t.name for t in book.tags]

    # 截取适合试读长度的内容
    max_len = 2000 if user_id else 600
    content = description[:max_len]
    if len(description) > max_len:
        content += "..."

    return {
        "book_id": book.id,
        "book_title": book.title,
        "authors": authors,
        "tags": tags,
        "content": content,
        "total_pages": book.page_count or 300,
        "publisher": book.publisher.name if book.publisher else None,
    }


# ═══════════════════════════════════════════════════════
# 书评社区
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
        .order_by(desc(BookComment.is_pinned), desc(BookComment.likes_count),
                  desc(BookComment.created_at))
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )


def like_comment(db: Session, user_id: int, comment_id: int) -> bool:
    """点赞评论 (toggle) — 返回当前是否已点赞"""
    existing = db.query(CommentLike).filter(
        CommentLike.user_id == user_id,
        CommentLike.comment_id == comment_id,
    ).first()
    if existing:
        db.delete(existing)
        db.commit()
        _update_comment_likes(db, comment_id)
        return False
    like = CommentLike(user_id=user_id, comment_id=comment_id)
    db.add(like)
    db.commit()
    _update_comment_likes(db, comment_id)
    return True


def _update_comment_likes(db: Session, comment_id: int):
    """更新评论点赞计数"""
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


def delete_comment(db: Session, comment_id: int,
                   user_id: int = None, is_admin: bool = False):
    """删除评论（作者本人或管理员可删）"""
    query = db.query(BookComment).filter(BookComment.id == comment_id)
    if not is_admin and user_id:
        query = query.filter(BookComment.user_id == user_id)
    query.delete()
    db.commit()


# ═══════════════════════════════════════════════════════
# 购书链接
# ═══════════════════════════════════════════════════════

def update_purchase_links(db: Session, book_id: int,
                          url_jd: str = None, url_dd: str = None,
                          url_tb: str = None):
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
    db.refresh(book)
    return book


def get_purchase_links(db: Session, book_id: int) -> dict:
    """获取购书链接"""
    book = db.query(Book).get(book_id)
    result = {"book_id": book_id, "book_title": "", "prices": []}
    if not book:
        return result
    prices = []
    if book.purchase_url_jd:
        prices.append({"platform": "京东", "url": book.purchase_url_jd})
    if book.purchase_url_dd:
        prices.append({"platform": "当当", "url": book.purchase_url_dd})
    if book.purchase_url_tb:
        prices.append({"platform": "淘宝", "url": book.purchase_url_tb})
    return {
        "book_id": book_id,
        "book_title": book.title,
        "prices": prices,
    }


# ═══════════════════════════════════════════════════════
# 书架管理
# ═══════════════════════════════════════════════════════

DEFAULT_SHELVES = ["想读", "在读", "已读"]


def _ensure_default_shelves(db: Session, user_id: int):
    """确保用户有默认书架（仅在首次查询时补齐，不强制创建bookmark记录）"""
    pass  # 默认书架由前端/查询时动态补齐


def get_user_bookshelves(db: Session, user_id: int) -> list[dict]:
    """获取用户书架列表（含默认书架）"""
    shelf_counts = (
        db.query(Bookmark.shelf_name, func.count(Bookmark.id).label("cnt"))
        .filter(Bookmark.user_id == user_id)
        .group_by(Bookmark.shelf_name)
        .all()
    )
    count_map = {s[0]: s[1] for s in shelf_counts}

    # 确保三个默认书架始终存在
    shelves = []
    for name in DEFAULT_SHELVES:
        shelves.append({"name": name, "book_count": count_map.get(name, 0)})

    # 追加自定义书架
    for shelf_name, cnt in shelf_counts:
        if shelf_name not in DEFAULT_SHELVES:
            shelves.append({"name": shelf_name, "book_count": cnt})

    return shelves


def get_shelf_books(db: Session, user_id: int, shelf_name: str) -> list[dict]:
    """获取某个书架中的图书列表（含图书详情）"""
    bookmarks = (
        db.query(Bookmark)
        .filter(
            Bookmark.user_id == user_id,
            Bookmark.shelf_name == shelf_name,
        )
        .all()
    )
    books = []
    for bm in bookmarks:
        book = db.query(Book).get(bm.book_id)
        if book:
            books.append({
                "bookmark_id": bm.id,
                "book_id": book.id,
                "book_title": book.title,
                "authors": [a.name for a in book.authors],
                "tags": [t.name for t in book.tags],
                "avg_rating": book.avg_rating or 0.0,
                "cover_url": book.cover_url or "",
                "shelf_name": bm.shelf_name,
                "added_at": bm.created_at,
            })
        else:
            books.append({
                "bookmark_id": bm.id,
                "book_id": bm.book_id,
                "book_title": f"图书#{bm.book_id}",
                "authors": [],
                "tags": [],
                "avg_rating": 0.0,
                "cover_url": "",
                "shelf_name": bm.shelf_name,
                "added_at": bm.created_at,
            })
    return books


def move_book_to_shelf(db: Session, user_id: int, book_id: int,
                       new_shelf: str) -> dict:
    """移动图书到另一个书架"""
    bookmark = db.query(Bookmark).filter(
        Bookmark.user_id == user_id,
        Bookmark.book_id == book_id,
    ).first()
    if not bookmark:
        return None
    bookmark.shelf_name = new_shelf
    db.commit()
    return {
        "book_id": book_id,
        "from_shelf": bookmark.shelf_name,
        "to_shelf": new_shelf,
    }


def remove_book_from_shelf(db: Session, user_id: int, book_id: int,
                           shelf_name: str = None) -> int:
    """从书架移除图书"""
    query = db.query(Bookmark).filter(
        Bookmark.user_id == user_id,
        Bookmark.book_id == book_id,
    )
    if shelf_name:
        query = query.filter(Bookmark.shelf_name == shelf_name)
    count = query.delete()
    db.commit()
    return count


def delete_shelf(db: Session, user_id: int, shelf_name: str) -> int:
    """删除自定义书架（默认书架不可删除），返回删除的bookmark数"""
    if shelf_name in DEFAULT_SHELVES:
        return -1  # 不可删除默认书架
    count = db.query(Bookmark).filter(
        Bookmark.user_id == user_id,
        Bookmark.shelf_name == shelf_name,
    ).delete()
    db.commit()
    return count


# ═══════════════════════════════════════════════════════
# 阅读统计
# ═══════════════════════════════════════════════════════

def get_reading_stats(db: Session, user_id: int) -> dict:
    """获取用户阅读统计数据"""
    # 阅读记录统计
    total_read = (
        db.query(ReadingHistory)
        .filter(ReadingHistory.user_id == user_id)
        .count()
    )
    books_completed = (
        db.query(ReadingHistory)
        .filter(
            ReadingHistory.user_id == user_id,
            ReadingHistory.status == "read",
        )
        .count()
    )
    books_reading = (
        db.query(ReadingHistory)
        .filter(
            ReadingHistory.user_id == user_id,
            ReadingHistory.status == "reading",
        )
        .count()
    )
    books_want = (
        db.query(ReadingHistory)
        .filter(
            ReadingHistory.user_id == user_id,
            ReadingHistory.status == "want_to_read",
        )
        .count()
    )

    # 评分统计
    rating_count = (
        db.query(UserRating)
        .filter(UserRating.user_id == user_id)
        .count()
    )
    avg_rating_result = (
        db.query(func.avg(UserRating.rating))
        .filter(UserRating.user_id == user_id)
        .scalar()
    )

    # 书架统计
    shelf_count = (
        db.query(Bookmark.shelf_name)
        .filter(Bookmark.user_id == user_id)
        .distinct()
        .count()
    )

    # 评论统计
    comment_count = (
        db.query(BookComment)
        .filter(BookComment.user_id == user_id)
        .count()
    )

    # 阅读进度中的图书数
    in_progress_count = (
        db.query(ReadingProgress)
        .filter(ReadingProgress.user_id == user_id)
        .count()
    )

    # 最近7天阅读趋势（按天统计阅读记录数）
    weekly_minutes = []
    for i in range(6, -1, -1):
        day = datetime.utcnow() - timedelta(days=i)
        day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day.replace(hour=23, minute=59, second=59, microsecond=999999)
        count = (
            db.query(ReadingHistory)
            .filter(
                ReadingHistory.user_id == user_id,
                ReadingHistory.read_at >= day_start,
                ReadingHistory.read_at <= day_end,
            )
            .count()
        )
        weekly_minutes.append(count * 15)  # 假设每次阅读约15分钟

    # 热门标签（从用户阅读/标记的图书中统计）
    top_tags = []
    book_ids = set()
    for h in db.query(ReadingHistory).filter(
        ReadingHistory.user_id == user_id
    ).limit(100).all():
        book_ids.add(h.book_id)
    for bm in db.query(Bookmark).filter(
        Bookmark.user_id == user_id
    ).limit(100).all():
        book_ids.add(bm.book_id)

    if book_ids:
        tag_counts = {}
        for bid in book_ids:
            book = db.query(Book).get(bid)
            if book:
                for tag in book.tags:
                    tag_counts[tag.name] = tag_counts.get(tag.name, 0) + 1
        top_tags = sorted(tag_counts, key=tag_counts.get, reverse=True)[:8]

    return {
        "user_id": user_id,
        "total_books_read": total_read,
        "books_completed": books_completed,
        "books_reading": books_reading,
        "books_want_to_read": books_want,
        "rating_count": rating_count,
        "avg_rating_given": round(avg_rating_result, 1) if avg_rating_result else 0.0,
        "shelf_count": shelf_count,
        "comment_count": comment_count,
        "in_progress_count": in_progress_count,
        "weekly_reading_minutes": weekly_minutes,
        "top_tags": top_tags,
    }
