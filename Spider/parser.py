# parser.py

import re

from bs4 import BeautifulSoup


class BookParser:
    book = {
        "title": None,
        "score": None,
        "votes": None,
        "publisher": None,
        "publish_year": None,
        "pages": None,
        "price": None,
        "isbn": None,
        "summary": None,
        "authors": [],
        "tags": [],
        "series": None,
        "image_path": None
    }

    @staticmethod
    def parse(html):

        soup = BeautifulSoup(
            html,
            "lxml"
        )

        book = {}

        # ======================
        # 书名
        # ======================

        title = soup.find(
            "span",
            attrs={
                "property":
                "v:itemreviewed"
            }
        )

        book["title"] = (
            title.text.strip()
            if title else ""
        )

        # ======================
        # 评分
        # ======================

        score = soup.find(
            "strong",
            class_="ll rating_num"
        )

        book["score"] = (
            score.text.strip()
            if score else ""
        )

        # ======================
        # 评价人数
        # ======================

        votes = soup.find(
            "span",
            attrs={
                "property":
                "v:votes"
            }
        )

        book["votes"] = (
            votes.text.strip()
            if votes else ""
        )

        # ======================
        # 图书信息
        # ======================

        info = soup.find(
            "div",
            id="info"
        )

        info_text = ""

        if info:
            info_text = info.get_text("\n")

        def extract(pattern):

            result = re.search(
                pattern,
                info_text
            )

            if result:
                return result.group(1).strip()

            return ""

        book["publisher"] = extract(
            r"出版社[:：]\s*(.*)"
        )

        book["publish_year"] = extract(
            r"出版年[:：]\s*(.*)"
        )

        book["pages"] = extract(
            r"页数[:：]\s*(.*)"
        )

        book["price"] = extract(
            r"定价[:：]\s*(.*)"
        )

        book["isbn"] = extract(
            r"ISBN[:：]\s*(.*)"
        )

        # ======================
        # 内容简介
        # ======================

        intro = ""

        intro_divs = soup.select(
            ".intro"
        )

        if intro_divs:

            intro = max(
                intro_divs,
                key=lambda x:
                len(x.text)
            ).get_text(
                strip=True
            )

        book["summary"] = intro

        info = soup.find("div", id="info")

        # ======================
        # 丛书
        # ======================

        series = None

        if info:

            for span in info.find_all(
                    "span",
                    class_="pl"
            ):

                text = span.get_text(strip=True)

                if "丛书" in text:

                    series_link = span.find_next("a")

                    if series_link:
                        series = series_link.get_text(
                            strip=True
                        )

                    break

        book["series"] = series
        print(
            "丛书:",
            book["series"]
        )
        authors = []

        if info:

            author_span = info.find(
                "span",
                class_="pl",
                string=lambda x: x and "作者" in x
            )

            if author_span:
                parent = author_span.parent

                authors = [
                    a.get_text(strip=True)
                    for a in parent.find_all("a")
                ]

        book["authors"] = authors

        # ======================
        # 封面图片
        # ======================

        image_url = None

        cover = soup.find(
            "a",
            class_="nbg"
        )

        if cover:

            img = cover.find("img")

            if img:
                image_url = img.get("src")

        book["_image_download_url"] = image_url

        return book


