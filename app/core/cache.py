from __future__ import annotations

import json
from time import time
from typing import Any

from app.core.config import get_settings

settings = get_settings()


class CacheClient:
    """Redis-first cache with in-process fallback."""

    def __init__(self) -> None:
        self._memory: dict[str, tuple[float, Any]] = {}
        self._redis = None
        if settings.REDIS_URL:
            try:
                import redis
                self._redis = redis.from_url(settings.REDIS_URL, decode_responses=True, socket_connect_timeout=1, socket_timeout=1)
                self._redis.ping()
            except Exception:
                self._redis = None

    def get(self, key: str) -> Any | None:
        if self._redis is not None:
            raw = self._redis.get(key)
            return json.loads(raw) if raw else None
        item = self._memory.get(key)
        if not item:
            return None
        expires_at, value = item
        if expires_at and expires_at < time():
            self._memory.pop(key, None)
            return None
        return value

    def set(self, key: str, value: Any, ttl: int | None = None) -> None:
        if self._redis is not None:
            self._redis.set(key, json.dumps(value, ensure_ascii=False), ex=ttl)
            return
        self._memory[key] = (time() + ttl if ttl else 0, value)

    def delete(self, key: str) -> None:
        if self._redis is not None:
            self._redis.delete(key)
        self._memory.pop(key, None)

    def status(self) -> dict[str, Any]:
        return {"backend": "redis" if self._redis is not None else "memory", "available": True}


cache = CacheClient()
