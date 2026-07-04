from __future__ import annotations

import re


_CATEGORY_SPLIT_RE = re.compile(r"\s*(?:-|/|\\|\||,|;|、|，|；|:|：)\s*")


def primary_category(value: str | None) -> str | None:
    if not value:
        return None
    parts = [part.strip() for part in _CATEGORY_SPLIT_RE.split(str(value)) if part.strip()]
    return parts[0] if parts else None


def category_matches(raw: str | None, category: str | None) -> bool:
    if not category:
        return True
    return primary_category(raw) == primary_category(category)
