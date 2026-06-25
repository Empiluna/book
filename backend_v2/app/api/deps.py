"""API 依赖注入：认证、可选认证、管理员权限。"""

from typing import Optional

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.database import get_db, get_neo4j_session
from app.core.security import decode_access_token
from app.models.user import User

# 必须登录的接口使用此对象，缺少 token 时直接 403/401。
security = HTTPBearer(auto_error=True)
# 可选登录的接口使用此对象，缺少 token 时返回 None。
optional_security = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    """从 JWT token 解析当前用户。"""
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="登录已过期，请重新登录")

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="无效的认证凭证")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="用户不存在")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="账号已被禁用，请联系管理员")
    return user


def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(optional_security),
    db: Session = Depends(get_db),
) -> Optional[User]:
    """可选登录：有合法 token 返回用户；无 token 或 token 无效返回 None。"""
    if credentials is None:
        return None
    try:
        payload = decode_access_token(credentials.credentials)
        if payload is None or payload.get("sub") is None:
            return None
        user = db.query(User).filter(User.id == int(payload["sub"])).first()
        if user is None or not user.is_active:
            return None
        return user
    except Exception:
        return None


def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """管理员权限校验。"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="需要管理员权限")
    return current_user


# 兼容旧代码里直接 Depends(get_neo4j_session) 的写法。
__all__ = [
    "get_current_user",
    "get_current_user_optional",
    "get_admin_user",
    "get_neo4j_session",
]
