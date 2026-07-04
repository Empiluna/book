from __future__ import annotations


def is_valid_search_keyword(keyword: str | None) -> bool:
    text = (keyword or "").strip()
    if len(text) < 2 or len(text) > 80:
        return False
    if set(text) <= {"?"}:
        return False
    if text.count("?") >= 3 and text.count("?") >= len(text) * 0.5:
        return False
    return any(ch.isalnum() or "\u4e00" <= ch <= "\u9fff" for ch in text)
