# main.py
import re
import random
import json
import time

from config import TAGS
from config import MAX_PAGE
from config import OUTPUT_FILE

from tag_spider import TagSpider
from douban_spider import DoubanSpider
from parser import BookParser
from config import (
    REQUEST_INTERVAL_MIN,
    REQUEST_INTERVAL_MAX
)
from image_downloader import ImageDownloader

def main():
    url_tag_map = {}

    print(
        "开始采集标签页..."
    )

    for tag in TAGS:

        urls = TagSpider.get_book_urls(

            tag,

            MAX_PAGE

        )

        for url in urls:

            if url not in url_tag_map:
                url_tag_map[url] = []

            if tag not in url_tag_map[url]:
                url_tag_map[url].append(tag)

    print(
        f"发现图书：{len(url_tag_map)} 本"
    )

    books = []

    for url, tags in url_tag_map.items():

        if not re.match(
                r"^https://book\.douban\.com/subject/\d+/?$",
                url
        ):
            continue

        print(
            f"采集详情页：{url}"
        )

        html = DoubanSpider.get_page(
            url
        )

        if not html:
            continue

        try:

            book = BookParser.parse(
                html
            )

            book["tags"] = tags

            book["image_path"] = (

                ImageDownloader.download(

                    book.get(
                        "_image_download_url"
                    ),

                    book["isbn"]

                )

            )

            book.pop(
                "_image_download_url",
                None
            )

            if not book["title"]:
                continue

            books.append(
                book
            )
            print(
                book["title"],
                book["tags"]
            )


        except Exception as e:

            print(
                f"解析失败：{e}"
            )

        time.sleep(

            random.uniform(

                REQUEST_INTERVAL_MIN,

                REQUEST_INTERVAL_MAX

            )

        )

    with open(

            OUTPUT_FILE,

            "w",

            encoding="utf-8"


    ) as f:

        json.dump(

            books,

            f,

            ensure_ascii=False,

            indent=4

        )
    with open(
            "test.html",
            "w",
            encoding="utf-8"
    ) as f:

        f.write(html)

    print(
        f"成功保存 {len(url_tag_map)} 本图书"
    )


if __name__ == "__main__":
    main()
