"""密码哈希与 JWT 工具。

优先使用 passlib[bcrypt]；若本机没有安装 passlib，则自动降级到 PBKDF2-SHA256，保证演示环境可运行。
正式提交/部署建议执行：pip install "passlib[bcrypt]"，以满足需求文档中的 bcrypt 存储要求。
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import os
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

import jwt

from app.core.config import get_settings

settings = get_settings()

try:
    from passlib.context import CryptContext

    _pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
except Exception:  # pragma: no cover - fallback for lightweight demo env
    _pwd_context = None


def hash_password(password: str) -> str:
    if _pwd_context is not None:
        return _pwd_context.hash(password)
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 120_000)
    return "pbkdf2_sha256$120000$" + base64.b64encode(salt).decode() + "$" + base64.b64encode(digest).decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if _pwd_context is not None and not hashed_password.startswith("pbkdf2_sha256$"):
        return _pwd_context.verify(plain_password, hashed_password)
    try:
        algorithm, rounds, salt_b64, digest_b64 = hashed_password.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        salt = base64.b64decode(salt_b64)
        expected = base64.b64decode(digest_b64)
        actual = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt, int(rounds))
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False


def create_access_token(data: dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    payload = data.copy()
    payload.update({"exp": expire})
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> Optional[dict[str, Any]]:
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except Exception:
        return None
