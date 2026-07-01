from __future__ import annotations

import argparse
import re
import sys
import time
from pathlib import Path

import httpx
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.core.database import SessionLocal
from app.models.entities import Book

COVER_DIR = ROOT / "frontend" / "images" / "covers"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    )
}


def slug(value: str) -> str:
    text = re.sub(r"[^\w一-鿿]+", "-", value.strip().lower(), flags=re.UNICODE)
    return re.sub(r"-+", "-", text).strip("-")[:80] or "book"


def local_cover_path(book: Book) -> Path:
    name = f"{book.id}-{slug(book.title)}.jpg"
    return COVER_DIR / name


def local_cover_url(path: Path) -> str:
    return "/static/images/covers/" + path.name


def enlarge_cover_url(url: str) -> str:
    """将豆瓣小图 URL 转换为大图 URL."""
    return re.sub(r"/view/subject/s/public/s(\w+)\.", r"/view/subject/l/public/l\1.", url)


def search_mobile_douban(client: httpx.Client, title: str, author: str) -> str | None:
    """通过移动版豆瓣搜索图书，返回 subject_id."""
    query = f"{title} {author}".strip()
    if not query:
        return None
    try:
        resp = client.get(
            "https://m.douban.com/search",
            params={"query": query, "type": "book"},
            timeout=20,
        )
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.text, "lxml")
        for a in soup.select("a[href]"):
            href = a.get("href", "")
            m = re.search(r"/book/subject/(\d+)/", href)
            if m:
                return m.group(1)
    except Exception:
        pass
    return None


def download_cover_via_selenium(subject_url: str, output_path: Path) -> bool:
    """使用 Selenium 打开豆瓣页面，截取封面元素图片."""
    try:
        from selenium import webdriver
        from selenium.webdriver.common.by import By
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC
    except ImportError:
        return False

    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument(f"user-agent={HEADERS['User-Agent']}")
    options.add_argument("--window-size=800,600")

    driver = None
    try:
        driver = webdriver.Chrome(options=options)
        driver.get(subject_url)

        # 等待封面图片加载
        wait = WebDriverWait(driver, 10)
        img = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "#mainpic img"))
        )
        # 等待图片实际加载完成
        time.sleep(1)

        # 截图封面元素
        png_bytes = img.screenshot_as_png
        if png_bytes and len(png_bytes) > 1024:
            output_path.write_bytes(png_bytes)
            return True
    except Exception as exc:
        print(f"    selenium error: {exc}")
        return False
    finally:
        if driver:
            driver.quit()
    return False


def candidate_books(limit: int | None, overwrite: bool):
    db = SessionLocal()
    try:
        q = db.query(Book).filter(Book.is_deleted == False)  # noqa: E712
        if not overwrite:
            q = q.filter(
                (Book.cover_url == None) | (Book.cover_url == "") | (Book.cover_url.like("data:%"))  # noqa: E711
            )
        if limit:
            q = q.limit(limit)
        yield from q.all()
    finally:
        db.close()


def fetch_douban_covers(
    limit: int | None = None,
    overwrite: bool = False,
    dry_run: bool = False,
    delay: float = 2.0,
    use_selenium: bool = True,
) -> None:
    COVER_DIR.mkdir(parents=True, exist_ok=True)
    books = list(candidate_books(limit, overwrite))
    if not books:
        print("No books need cover fetching.")
        return

    print(f"Found {len(books)} book(s) without covers.\n")

    db = SessionLocal()
    try:
        with httpx.Client(headers=HEADERS, follow_redirects=True, timeout=30) as client:
            for idx, book in enumerate(books, 1):
                attached = db.get(Book, book.id)
                if not attached:
                    continue

                target = local_cover_path(attached)
                if target.exists() and not overwrite:
                    attached.cover_url = local_cover_url(target)
                    print(f"[{idx}/{len(books)}] [reuse] {attached.title} -> {attached.cover_url}")
                    continue

                authors = [a.name for a in attached.authors] if attached.authors else []
                author = authors[0] if authors else ""

                try:
                    subject_id: str | None = None
                    subject_url: str | None = None
                    downloaded = False

                    # 方式1：ISBN 直达
                    if attached.isbn and not attached.isbn.startswith("978-7-000-"):
                        isbn = re.sub(r"[^0-9Xx]", "", attached.isbn)
                        subject_url = f"https://book.douban.com/isbn/{isbn}/"
                        print(f"[{idx}/{len(books)}] [isbn] {attached.title}")

                    # 方式2：移动版搜索
                    if not subject_url:
                        subject_id = search_mobile_douban(client, attached.title, author)
                        if subject_id:
                            subject_url = f"https://book.douban.com/subject/{subject_id}/"
                            print(f"[{idx}/{len(books)}] [search] {attached.title} -> subject/{subject_id}")
                        else:
                            print(f"[{idx}/{len(books)}] [skip] {attached.title}: not found on Douban")
                            continue

                    # 用 Selenium 下载封面
                    if use_selenium and subject_url:
                        if dry_run:
                            print(f"[{idx}/{len(books)}] [dry-run] {attached.title}: would fetch from {subject_url}")
                            continue
                        downloaded = download_cover_via_selenium(subject_url, target)

                    if downloaded:
                        attached.cover_url = local_cover_url(target)
                        print(f"[{idx}/{len(books)}] [ok] {attached.title}")
                    elif not dry_run and not use_selenium:
                        print(f"[{idx}/{len(books)}] [skip] {attached.title}: selenium disabled, use --selenium")

                except Exception as exc:
                    print(f"[{idx}/{len(books)}] [error] {attached.title}: {exc}")

                time.sleep(delay)

        if not dry_run:
            db.commit()
            print("\nDatabase updated.")
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="从豆瓣爬取缺少封面的书籍封面，保存到本地并更新 MySQL."
    )
    parser.add_argument("--limit", type=int, default=None, help="限制处理的书籍数量.")
    parser.add_argument("--overwrite", action="store_true", help="覆盖已有封面.")
    parser.add_argument("--dry-run", action="store_true", help="仅查找不保存.")
    parser.add_argument("--delay", type=float, default=2.0, help="请求间隔秒数 (默认 2).")
    parser.add_argument("--selenium", action="store_true", default=True,
                        help="使用 Selenium 下载图片 (绕过豆瓣 CDN 反爬).")
    parser.add_argument("--no-selenium", action="store_true",
                        help="禁用 Selenium，仅用 httpx (可能被豆瓣封锁).")
    args = parser.parse_args()
    fetch_douban_covers(
        limit=args.limit,
        overwrite=args.overwrite,
        dry_run=args.dry_run,
        delay=args.delay,
        use_selenium=not args.no_selenium,
    )


if __name__ == "__main__":
    main()
