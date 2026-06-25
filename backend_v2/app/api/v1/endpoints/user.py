"""模块一 · 用户画像 API。"""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_current_user_optional
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import (
    BehaviorEventCreate,
    BehaviorEventResponse,
    BookmarkCreate,
    BookmarkMoveRequest,
    BookmarkResponse,
    BookFeedbackCreate,
    BookFeedbackResponse,
    DashboardResponse,
    PasswordChangeRequest,
    ProfileAdvancedResponse,
    ProfileRebuildResponse,
    RatingCreate,
    RatingResponse,
    ReadingHistoryCreate,
    ReadingHistoryResponse,
    ReadingProgressResponse,
    ReadingProgressUpdate,
    ReadingSessionCreate,
    ReadingSessionResponse,
    SearchLogCreate,
    SearchLogResponse,
    ShelfResponse,
    TokenResponse,
    UserLogin,
    UserMeResponse,
    UserPreferenceResponse,
    UserPreferenceUpdate,
    UserProfile,
    UserProfileUpdate,
    UserRegister,
)
from app.services import user_service

router = APIRouter()


# =====================================================================
# 认证
# =====================================================================


@router.post("/register", response_model=TokenResponse, summary="用户注册")
def register(req: UserRegister, db: Session = Depends(get_db)):
    """注册新用户，注册成功后直接返回 JWT。"""
    user = user_service.register_user(db, req.username, req.email, req.password)
    token = user_service.authenticate_user(db, req.username, req.password)
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        username=user.username,
        is_admin=user.is_admin,
    )


@router.post("/login", response_model=TokenResponse, summary="用户登录")
def login(req: UserLogin, db: Session = Depends(get_db)):
    """用户名/邮箱 + 密码登录。"""
    token = user_service.authenticate_user(db, req.username, req.password)
    if not token:
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    user = user_service.get_user_by_account(db, req.username)
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        username=user.username,
        is_admin=user.is_admin,
    )


@router.get("/me", response_model=UserMeResponse, summary="获取当前登录用户")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/password", summary="修改密码")
def change_password(
    req: PasswordChangeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_service.change_password(db, current_user, req.old_password, req.new_password)
    return {"status": "ok", "message": "密码修改成功"}


# =====================================================================
# 用户画像
# =====================================================================


@router.get("/profile", response_model=UserProfile, summary="获取用户画像")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """推荐模块通过该接口获取用户标签偏好、作者偏好和高分图书。"""
    data = user_service.build_user_profile(db, current_user.id)
    return UserProfile(
        user_id=current_user.id,
        username=current_user.username,
        tag_preferences=data.get("tag_weights", {}),
        category_preferences=data.get("category_weights", {}),
        favorite_authors=data.get("favorite_authors", []),
        favorite_author_ids=data.get("favorite_author_ids", []),
        favorite_tags=data.get("favorite_tags", []),
        favorite_tag_ids=data.get("favorite_tag_ids", []),
        high_rated_book_ids=data.get("high_rated_book_ids", []),
        avg_rating=data.get("avg_rating", 0.0),
        books_read=data.get("books_completed", 0),
        books_reading=data.get("books_reading", 0),
        books_want_to_read=data.get("books_want_to_read", 0),
    )


@router.put("/profile", summary="更新用户画像")
def update_profile(
    req: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
):
    """
    当前项目的画像主要由阅读、收藏、评分、搜索行为自动生成。
    该接口保留给后续手动偏好配置，避免前端调用时报错。
    """
    return {
        "status": "ok",
        "message": "当前版本画像由系统行为自动计算，手动偏好已预留接口。",
        "user_id": current_user.id,
        "manual_preferences": req.model_dump(exclude_none=True),
    }


# =====================================================================
# 阅读行为采集
# =====================================================================


@router.post("/history", response_model=ReadingHistoryResponse, summary="记录阅读历史")
def add_history(
    req: ReadingHistoryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = user_service.record_reading_history(db, current_user.id, req.book_id, req.status)
    return _history_response(item)


@router.get("/history", response_model=list[ReadingHistoryResponse], summary="获取阅读历史")
def get_history(
    limit: int = Query(50, ge=1, le=200),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return [_history_response(h) for h in user_service.get_reading_history(db, current_user.id, limit)]


@router.post("/search-log", response_model=SearchLogResponse, summary="记录搜索关键词")
def add_search_log(
    req: SearchLogCreate,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    user_id = current_user.id if current_user else None
    return user_service.record_search(db, user_id, req.keyword)


@router.get("/search-logs", response_model=list[SearchLogResponse], summary="获取我的搜索记录")
def get_search_logs(
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_service.get_search_logs(db, current_user.id, limit)


# =====================================================================
# 书架收藏
# =====================================================================


@router.post("/bookmark", response_model=BookmarkResponse, summary="添加收藏/加入书架")
def add_bookmark(
    req: BookmarkCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = user_service.add_bookmark(db, current_user.id, req.book_id, req.shelf_name)
    return _bookmark_response(item)


@router.put("/bookmark/{book_id}", response_model=BookmarkResponse, summary="移动图书到指定书架")
def move_bookmark(
    book_id: int,
    req: BookmarkMoveRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = user_service.move_bookmark(db, current_user.id, book_id, req.shelf_name)
    return _bookmark_response(item)


@router.delete("/bookmark/{book_id}", summary="取消收藏")
def remove_bookmark(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    count = user_service.remove_bookmark(db, current_user.id, book_id)
    return {"status": "ok", "deleted": count}


@router.get("/bookmarks", response_model=list[BookmarkResponse], summary="获取收藏列表")
def get_bookmarks(
    shelf_name: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return [_bookmark_response(b) for b in user_service.get_bookmarks(db, current_user.id, shelf_name)]


@router.get("/shelves", response_model=list[ShelfResponse], summary="获取我的书架列表")
def get_shelves(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_service.get_shelves(db, current_user.id)


# =====================================================================
# 评分
# =====================================================================


@router.post("/rating", response_model=RatingResponse, summary="图书评分")
def rate_book(
    req: RatingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = user_service.rate_book(db, current_user.id, req.book_id, req.rating)
    return _rating_response(item)


@router.get("/ratings", response_model=list[RatingResponse], summary="获取我的评分记录")
def get_ratings(
    limit: int = Query(50, ge=1, le=200),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return [_rating_response(r) for r in user_service.get_user_ratings(db, current_user.id, limit)]


# =====================================================================
# 阅读进度同步
# =====================================================================


@router.post("/progress", response_model=ReadingProgressResponse, summary="保存/更新阅读进度")
def update_progress(
    req: ReadingProgressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = user_service.update_reading_progress(
        db,
        current_user.id,
        req.book_id,
        req.progress_percent,
        req.current_page,
    )
    return _progress_response(item)


@router.get("/progress", response_model=list[ReadingProgressResponse], summary="获取全部阅读进度")
def get_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return [_progress_response(p) for p in user_service.get_reading_progress(db, current_user.id)]


@router.get("/progress/{book_id}", response_model=list[ReadingProgressResponse], summary="获取某本书阅读进度")
def get_progress_by_book(
    book_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return [_progress_response(p) for p in user_service.get_reading_progress(db, current_user.id, book_id)]


@router.get("/stats", summary="阅读统计")
def get_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return {"user_id": current_user.id, **user_service.get_reading_stats(db, current_user.id)}




# =====================================================================
# 高级画像驾驶舱 / 行为事件 / 显式反馈
# =====================================================================


@router.post("/behavior", response_model=BehaviorEventResponse, summary="记录统一用户行为事件")
def record_behavior(
    req: BehaviorEventCreate,
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    user_id = current_user.id if current_user else None
    item = user_service.record_behavior_event(
        db=db,
        user_id=user_id,
        event_type=req.event_type,
        book_id=req.book_id,
        keyword=req.keyword,
        source=req.source,
        weight=req.weight,
        session_id=req.session_id,
        metadata=req.metadata,
    )
    return item


@router.post("/reading-session", response_model=ReadingSessionResponse, summary="记录阅读会话")
def create_reading_session(
    req: ReadingSessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = user_service.create_reading_session(
        db=db,
        user_id=current_user.id,
        book_id=req.book_id,
        duration_seconds=req.duration_seconds,
        start_page=req.start_page,
        end_page=req.end_page,
        progress_delta=req.progress_delta,
        device=req.device,
        note=req.note,
    )
    return ReadingSessionResponse(
        id=item.id,
        book_id=item.book_id,
        book_title=item.book.title if getattr(item, "book", None) else None,
        duration_seconds=item.duration_seconds,
        start_page=item.start_page,
        end_page=item.end_page,
        progress_delta=item.progress_delta,
        device=item.device,
        started_at=item.started_at,
    )


@router.get("/profile/advanced", response_model=ProfileAdvancedResponse, summary="获取高级用户画像")
def get_advanced_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_service.build_advanced_user_profile(db, current_user.id, save_snapshot=True)


@router.post("/profile/rebuild", response_model=ProfileRebuildResponse, summary="重建用户画像快照")
def rebuild_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    snapshot = user_service.rebuild_profile_snapshot(db, current_user.id)
    return ProfileRebuildResponse(
        user_id=current_user.id,
        snapshot_id=snapshot.id,
        maturity_score=snapshot.maturity_score,
        message="画像快照已重建，可供推荐模块和智能助手复用。",
    )


@router.get("/dashboard", summary="模块一画像驾驶舱聚合数据")
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    data = user_service.get_user_dashboard(db, current_user.id)
    return {
        "user": data["user"],
        "metrics": data["metrics"],
        "profile": data["profile"],
        "shelves": data["shelves"],
        "recent_history": [_history_response(x).model_dump() for x in data["recent_history"]],
        "progress": [_progress_response(x).model_dump() for x in data["progress"]],
        "timeline": data["timeline"],
        "suggestions": data["suggestions"],
    }


@router.get("/timeline", summary="获取用户行为时间线")
def get_timeline(
    limit: int = Query(50, ge=1, le=200),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_service.get_user_timeline(db, current_user.id, limit=limit)


@router.get("/preferences", response_model=UserPreferenceResponse, summary="获取手动偏好配置")
def get_preferences(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_service.get_user_preferences(db, current_user.id)


@router.put("/preferences", response_model=UserPreferenceResponse, summary="更新手动偏好配置")
def update_preferences(
    req: UserPreferenceUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_service.upsert_user_preferences(
        db,
        current_user.id,
        preferred_tags=req.preferred_tags,
        blocked_tags=req.blocked_tags,
        preferred_authors=req.preferred_authors,
        blocked_authors=req.blocked_authors,
        difficulty_level=req.difficulty_level,
    )
    return user_service.get_user_preferences(db, current_user.id)


@router.post("/feedback", response_model=BookFeedbackResponse, summary="记录推荐显式反馈")
def create_book_feedback(
    req: BookFeedbackCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = user_service.record_book_feedback(db, current_user.id, req.book_id, req.feedback_type, req.reason)
    return item


# =====================================================================
# 响应转换工具
# =====================================================================


def _history_response(item):
    return ReadingHistoryResponse(
        id=item.id,
        book_id=item.book_id,
        book_title=item.book.title if getattr(item, "book", None) else None,
        status=item.status,
        read_at=item.read_at,
    )


def _bookmark_response(item):
    return BookmarkResponse(
        id=item.id,
        book_id=item.book_id,
        book_title=item.book.title if getattr(item, "book", None) else None,
        shelf_name=item.shelf_name,
        created_at=item.created_at,
    )


def _progress_response(item):
    return ReadingProgressResponse(
        book_id=item.book_id,
        book_title=item.book.title if getattr(item, "book", None) else None,
        progress_percent=item.progress_percent,
        current_page=item.current_page,
        updated_at=item.updated_at,
    )


def _rating_response(item):
    return RatingResponse(
        id=item.id,
        book_id=item.book_id,
        book_title=item.book.title if getattr(item, "book", None) else None,
        rating=item.rating,
        created_at=item.created_at,
    )
