import re
import random
import json
import time

from parser import BookParser, AuthorParser
from config import TAGS, MAX_PAGE, OUTPUT_FILE
from config import REQUEST_INTERVAL_MIN, REQUEST_INTERVAL_MAX
from tag_spider import TagSpider
from douban_spider import DoubanSpider
from image_downloader import ImageDownloader

def main():
    url_tag_map = {}

    print("开始采集标签页...")
    for tag in TAGS:
        urls = TagSpider.get_book_urls(tag, MAX_PAGE)
        for url in urls:
            if url not in url_tag_map:
                url_tag_map[url] = []
            if tag not in url_tag_map[url]:
                url_tag_map[url].append(tag)

    print(f"发现图书：{len(url_tag_map)} 本")

    books = []
    author_cache = {}

    for url, tags in url_tag_map.items():
        if not re.match(r"^https://book\.douban\.com/subject/\d+/?$", url):
            continue

        print(f"采集详情页：{url}")
        html = DoubanSpider.get_page(url)
        if not html:
            continue

        try:
            book = BookParser.parse(html)
            book["tags"] = tags
            book["image_path"] = ImageDownloader.download(
                book.get("_image_download_url"), book["isbn"]
            )
            book.pop("_image_download_url", None)

            if not book["title"]:
                 continue

            # ================= 作者采集 =================
            authors = book.get("authors", [])
            author_urls = book.get("author_urls", [])
            print(f"  《{book['title']}》 共 {len(author_urls)} 位作者，开始获取详细信息...")

            for i, name in enumerate(authors):
                url_auth = author_urls[i] if i < len(author_urls) else ""
                if url_auth and url_auth in author_cache:
                    print(f"    {name} 已缓存，跳过")
                    continue
                if not url_auth:
                    if name not in author_cache:
                        author_cache[name] = {
                            "name": name, "brief_intro": "",
                             "gender": "",
                            "birth_date": "", "death_date": "",
                            "birth_place": "", "imdb_id": "",
                            "url": ""
                        }
                        print(f"    {name} 无有效链接，仅存姓名")
                    continue

                print(f"    正在获取作者信息：{url_auth} ({name})")
                auth_html = DoubanSpider.get_page(url_auth)
                if auth_html:
                    try:
                        auth_data = AuthorParser.parse(auth_html, url=url_auth)
                        author_cache[url_auth] = auth_data
                        print(f"      ✔ {name} 详细信息已获取")
                    except Exception as e:
                        print(f"      ✖ 解析失败：{e}")
                        author_cache[url_auth] = {
                            "name": name, "brief_intro": "",
                            "gender": "",
                            "birth_date": "", "death_date": "",
                            "birth_place": "", "imdb_id": "",
                            "biography": "", "url": url_auth
                        }
                else:
                    print(f"      ✖ 请求失败")
                    author_cache[url_auth] = {
                        "name": name, "brief_intro": "",
                        "gender": "",
                        "birth_date": "", "death_date": "",
                        "birth_place": "", "imdb_id": "",
                        "url": url_auth
                    }
                time.sleep(random.uniform(REQUEST_INTERVAL_MIN, REQUEST_INTERVAL_MAX))
            # ===========================================

            books.append(book)
            print(f"  《{book['title']}》 采集完成")

        except Exception as e:
            print(f"解析图书失败：{e}")

        time.sleep(random.uniform(REQUEST_INTERVAL_MIN, REQUEST_INTERVAL_MAX))

    # 保存图书
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(books, f, ensure_ascii=False, indent=4)

    # 保存作者
    author_list = list(author_cache.values())
    with open("data/Author.json", "w", encoding="utf-8") as f:
        json.dump(author_list, f, ensure_ascii=False, indent=4)
    print(f"\n成功保存 {len(author_list)} 位作者信息到 data/Author.json")

    print(f"成功保存 {len(books)} 本图书")

if __name__ == "__main__":
    main()