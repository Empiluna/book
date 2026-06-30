from __future__ import annotations

import argparse

from Spider.douban_spider import DoubanBookCrawler
from Spider.save_json import save_books_json


def main() -> None:
    parser = argparse.ArgumentParser(description="离线采集图书元数据并保存为 data/books.json")
    parser.add_argument("--tags", nargs="+", default=["科幻", "编程", "历史", "文学"], help="豆瓣标签")
    parser.add_argument("--pages", type=int, default=1, help="每个标签采集页数")
    parser.add_argument("--limit", type=int, default=80, help="最多采集图书数量")
    parser.add_argument("--delay", type=float, default=1.5, help="请求间隔秒数")
    parser.add_argument("--output", default="data/books.json", help="输出 JSON 文件")
    parser.add_argument("--no-cover", action="store_true", help="不下载封面")
    args = parser.parse_args()

    crawler = DoubanBookCrawler(delay=args.delay, download_covers=not args.no_cover)
    books = crawler.crawl(args.tags, pages=args.pages, limit=args.limit)
    out = save_books_json(books, args.output)
    print(f"采集完成：{len(books)} 本，已保存到 {out}")


if __name__ == "__main__":
    main()
