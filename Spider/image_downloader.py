from __future__ import annotations

import hashlib
from pathlib import Path
from urllib.parse import urlparse

import httpx


def download_image(url: str | None, out_dir: str = "frontend/assets/covers") -> str | None:
    """下载封面图并返回可被前端访问的相对路径。

    若下载失败，返回 None，不中断图书导入流程。
    """
    if not url:
        return None

    path = urlparse(url).path
    ext = Path(path).suffix.lower()
    if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
        ext = ".jpg"

    digest = hashlib.md5(url.encode("utf-8")).hexdigest()[:16]
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    file_path = out / f"{digest}{ext}"

    if file_path.exists():
        return "/" + str(file_path).replace("\\", "/")

    try:
        with httpx.Client(timeout=20, follow_redirects=True) as client:
            resp = client.get(url)
            resp.raise_for_status()
            file_path.write_bytes(resp.content)
        return "/" + str(file_path).replace("\\", "/")
    except Exception:
        return None
