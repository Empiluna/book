from __future__ import annotations

import time
from typing import Iterable

import httpx

from Spider.image_downloader import download_image
from Spider.parser import BookParser
from Spider.tag_spider import DEFAULT_HEADERS, DoubanTagSpider


class DoubanBookCrawler:
    """豆瓣图书离线采集器：标签页 → 详情页 → 结构化 JSON。"""

    def __init__(self, delay: float = 1.5, timeout: float = 15.0, download_covers: bool = True):
        self.delay = delay
        self.timeout = timeout
        self.download_covers = download_covers
        self.tag_spider = DoubanTagSpider(delay=delay, timeout=timeout)

    def crawl(self, tags: Iterable[str], pages: int = 1, limit: int | None = None) -> list[dict]:
        books: list[dict] = []
        seen: set[str] = set()

        with httpx.Client(headers=DEFAULT_HEADERS, timeout=self.timeout, follow_redirects=True) as client:
            for tag in tags:
                urls = self.tag_spider.fetch_book_urls(tag, pages=pages)
                for url in urls:
                    if url in seen:
                        continue
                    seen.add(url)
                    if limit and len(books) >= limit:
                        return books
                    try:
                        resp = client.get(url)
                        resp.raise_for_status()
                        item = BookParser.parse(resp.text, source_url=url, tags=[tag])
                        if self.download_covers:
                            item["image_path"] = download_image(item.get("image_url"))
                        books.append(item)
                    except Exception as exc:
                        print(f"[skip] {url}: {exc}")
                    time.sleep(self.delay)
        return books
