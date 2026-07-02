from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import re
import time
from typing import Any

from .config import get_settings

settings = get_settings()

try:  # passlib[bcrypt] is listed in requirements. Fallback keeps tests runnable before install.
    from passlib.context import CryptContext
    _pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
except Exception:  # pragma: no cover - dependency fallback
    _pwd_context = None


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip("=")


def _unb64(data: str) -> bytes:
    return base64.urlsafe_b64decode(data + "=" * (-len(data) % 4))


def hash_password(password: str) -> str:
    """Hash password with PBKDF2 for stable local and classroom demos."""
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 260_000)
    return f"pbkdf2_sha256${_b64(salt)}${_b64(digest)}"


def verify_password(password: str, password_hash: str) -> bool:
    try:
        if password_hash.startswith("$2") and _pwd_context is not None:
            try:
                return _pwd_context.verify(password, password_hash)
            except Exception:
                return False
        algo, salt_b64, digest_b64 = password_hash.split("$", 2)
        if algo != "pbkdf2_sha256":
            return False
        salt = _unb64(salt_b64)
        expected = _unb64(digest_b64)
        actual = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 260_000)
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False


def validate_password_strength(password: str) -> None:
    if len(password) < 6:
        raise ValueError("密码长度至少为6位")


def is_email(account: str) -> bool:
    return bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", account))


def create_access_token(subject: str | int, extra: dict[str, Any] | None = None) -> str:
    now = int(time.time())
    payload: dict[str, Any] = {
        "sub": str(subject),
        "iat": now,
        "exp": now + settings.ACCESS_TOKEN_EXPIRE_HOURS * 3600,
    }
    if extra:
        payload.update(extra)
    header = {"alg": "HS256", "typ": "JWT"}
    signing_input = f"{_b64(json.dumps(header, separators=(',', ':')).encode())}.{_b64(json.dumps(payload, separators=(',', ':')).encode())}"
    signature = hmac.new(settings.SECRET_KEY.encode(), signing_input.encode(), hashlib.sha256).digest()
    return f"{signing_input}.{_b64(signature)}"


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        head_b64, payload_b64, sig_b64 = token.split(".")
        signing_input = f"{head_b64}.{payload_b64}"
        expected = hmac.new(settings.SECRET_KEY.encode(), signing_input.encode(), hashlib.sha256).digest()
        if not hmac.compare_digest(expected, _unb64(sig_b64)):
            return None
        payload = json.loads(_unb64(payload_b64))
        if int(payload.get("exp", 0)) < int(time.time()):
            return None
        return payload
    except Exception:
        return None
