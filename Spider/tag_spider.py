# tag_spider.py

from login import session

from bs4 import BeautifulSoup

from headers import HEADERS

import re

from utils import is_book_url


class TagSpider:

    @staticmethod
    def get_book_urls(tag, max_page):

        urls = set()

        for page in range(max_page):

            start = page * 20

            url = (
                f"https://book.douban.com/tag/"
                f"{tag}?start={start}"
            )

            print(
                f"采集标签页：{url}"
            )

            try:

                html = session.get(
                    url,
                    headers=HEADERS,
                    timeout=10
                ).text

                soup = BeautifulSoup(
                    html,
                    "lxml"
                )

                for a in soup.find_all("a"):

                    href = a.get("href")

                    if not href:
                        continue

                    href = href.split("?")[0]

                    if is_book_url(href):
                        urls.add(href)

                    if re.match(
                            r"^https://book\.douban\.com/subject/\d+/?$",
                            href
                    ):

                        urls.add(href)

                    else:

                        print(
                            f"过滤链接: {href}"
                        )

            except Exception as e:

                print(e)

        return list(urls)
