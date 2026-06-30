from __future__ import annotations

import re
from dataclasses import dataclass, asdict
from typing import Any

from bs4 import BeautifulSoup


def _clean(text: str | None) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def _first_number(text: str | None) -> int | None:
    if not text:
        return None
    m = re.search(r"(\d{3,4})", text)
    return int(m.group(1)) if m else None


def _float(text: str | None) -> float | None:
    if not text:
        return None
    m = re.search(r"\d+(?:\.\d+)?", text)
    return float(m.group(0)) if m else None


@dataclass
class RawBook:
    title: str
    subtitle: str | None = None
    authors: list[str] | None = None
    publisher: str | None = None
    series: str | None = None
    tags: list[str] | None = None
    category: str | None = None
    isbn: str | None = None
    publish_year: int | None = None
    pages: int | None = None
    price: float | None = None
    score: float | None = None
    votes: int | None = None
    summary: str | None = None
    image_url: str | None = None
    image_path: str | None = None
    source_url: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["authors"] = self.authors or []
        data["tags"] = self.tags or []
        return data


class BookParser:
    """解析豆瓣图书详情页。

    输出字段兼容 part2 的 books.json，同时后续 import_books.py 会映射到 v3 的 Book/Author/Tag 等表。
    """

    @staticmethod
    def parse(html: str, source_url: str | None = None, tags: list[str] | None = None) -> dict[str, Any]:
        soup = BeautifulSoup(html, "lxml")

        title_el = soup.select_one("h1 span[property='v:itemreviewed']") or soup.select_one("h1")
        title = _clean(title_el.get_text(" ", strip=True) if title_el else "")
        if not title:
            raise ValueError("未解析到图书标题")

        info_text = soup.select_one("#info").get_text("\n", strip=True) if soup.select_one("#info") else ""

        def info_value(label: str) -> str | None:
            # 兼容“出版社:”和“ 出版社:”等格式
            pattern = rf"{re.escape(label)}\s*:\s*(.+)"
            for line in info_text.splitlines():
                line = _clean(line)
                m = re.match(pattern, line)
                if m:
                    return _clean(m.group(1))
            return None

        authors: list[str] = []
        author_links = soup.select("#info a[rel='v:directedBy'], #info a")
        for a in author_links:
            name = _clean(a.get_text())
            href = a.get("href", "")
            if name and ("author" in href or not authors):
                authors.append(name)
        if not authors:
            raw_author = info_value("作者")
            if raw_author:
                authors = [x.strip() for x in re.split(r"[/、,，]", raw_author) if x.strip()]

        publisher = info_value("出版社")
        series = info_value("丛书")
        isbn = info_value("ISBN")

        publish_year = _first_number(info_value("出版年"))
        pages = _first_number(info_value("页数"))
        price = _float(info_value("定价"))

        score = _float(_clean(soup.select_one("strong[property='v:average']").get_text() if soup.select_one("strong[property='v:average']") else None))
        votes = _first_number(_clean(soup.select_one("span[property='v:votes']").get_text() if soup.select_one("span[property='v:votes']") else None))

        summary_el = soup.select_one("#link-report .intro") or soup.select_one("#link-report")
        summary = _clean(summary_el.get_text("\n", strip=True) if summary_el else "")

        img_el = soup.select_one("#mainpic img") or soup.select_one("img[rel='v:photo']")
        image_url = img_el.get("src") if img_el else None

        return RawBook(
            title=title,
            authors=authors,
            publisher=publisher,
            series=series,
            tags=tags or [],
            category=(tags or [None])[0],
            isbn=isbn,
            publish_year=publish_year,
            pages=pages,
            price=price,
            score=score,
            votes=votes,
            summary=summary,
            image_url=image_url,
            source_url=source_url,
        ).to_dict()
