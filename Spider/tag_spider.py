from __future__ import annotations

import time
from urllib.parse import quote

import httpx
from bs4 import BeautifulSoup

DEFAULT_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    )
}


class DoubanTagSpider:
    """按豆瓣标签页采集图书详情页链接。

    该爬虫仅用于离线准备种子数据；请控制 pages/delay，遵守目标站点 robots 和访问频率。
    """

    def __init__(self, delay: float = 1.5, timeout: float = 15.0):
        self.delay = delay
        self.timeout = timeout

    def fetch_book_urls(self, tag: str, pages: int = 1, page_size: int = 20) -> list[str]:
        urls: list[str] = []
        with httpx.Client(headers=DEFAULT_HEADERS, timeout=self.timeout, follow_redirects=True) as client:
            for page in range(pages):
                start = page * page_size
                url = f"https://book.douban.com/tag/{quote(tag)}?start={start}&type=T"
                resp = client.get(url)
                resp.raise_for_status()
                soup = BeautifulSoup(resp.text, "lxml")
                for a in soup.select("a[href*='/subject/']"):
                    href = a.get("href", "")
                    if "/subject/" in href and href.startswith("https://book.douban.com/subject/"):
                        urls.append(href.split("?")[0])
                time.sleep(self.delay)
        return sorted(set(urls))
