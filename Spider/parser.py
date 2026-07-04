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
        soup = BeautifulSoup(html, "lxml")
        book = {}

        # 书名
        title = soup.find("span", attrs={"property": "v:itemreviewed"})
        book["title"] = title.text.strip() if title else ""

        # 评分
        score = soup.find("strong", class_="ll rating_num")
        book["score"] = score.text.strip() if score else ""

        # 评价人数
        votes = soup.find("span", attrs={"property": "v:votes"})
        book["votes"] = votes.text.strip() if votes else ""

        # 图书信息
        info = soup.find("div", id="info")
        info_text = ""
        if info:
            info_text = info.get_text("\n")

        def extract(pattern):
            result = re.search(pattern, info_text)
            return result.group(1).strip() if result else ""

        book["publisher"] = extract(r"出版社[:：]\s*(.*)")
        book["publish_year"] = extract(r"出版年[:：]\s*(.*)")
        book["pages"] = extract(r"页数[:：]\s*(.*)")
        book["price"] = extract(r"定价[:：]\s*(.*)")
        book["isbn"] = extract(r"ISBN[:：]\s*(.*)")

        # 内容简介
        intro = ""
        intro_divs = soup.select(".intro")
        if intro_divs:
            intro = max(intro_divs, key=lambda x: len(x.text)).get_text(strip=True)
        book["summary"] = intro

        authors = []
        author_urls = []
        if info:
            author_span = info.find("span", class_="pl", string=lambda s: s and "作者" in s)
            if author_span:
                for a in author_span.parent.find_all("a"):
                    name = a.get_text(strip=True)
                    if not name:
                        continue
                    href = a.get("href", "")
                    if href and re.match(r"^https?://(book\.)?douban\.com/author/\d+", href):
                        author_urls.append(href)
                    elif href.startswith("/author/") and re.match(r"^/author/\d+", href):
                        author_urls.append("https://book.douban.com" + href)
                    else:
                        author_urls.append("")
                    authors.append(name)
                if not authors:
                    full_text = author_span.parent.get_text(" ", strip=True)
                    names = re.split(r"[；;,，、/]", full_text.replace("作者", ""))
                    for n in names:
                        n = n.strip()
                        if n:
                            authors.append(n)
                            author_urls.append("")
        book["authors"] = authors
        book["author_urls"] = author_urls

        # 丛书
        series = None
        if info:
            for span in info.find_all("span", class_="pl"):
                if "丛书" in span.get_text():
                    series_link = span.find_next("a")
                    if series_link:
                        series = series_link.get_text(strip=True)
                    break
        book["series"] = series

        # 封面
        image_url = None
        cover = soup.find("a", class_="nbg")
        if cover:
            img = cover.find("img")
            if img:
                image_url = img.get("src")
        book["_image_download_url"] = image_url

        return book


class AuthorParser:
    """解析豆瓣作者详情页，提取基本信息、作品、简介等"""

    @staticmethod
    def parse(html, url=""):
        soup = BeautifulSoup(html, "lxml")
        info = {}

        # 姓名
        h1 = soup.find("h1")
        info["name"] = h1.text.strip() if h1 else ""

        # 基本信息
        ul = soup.find("ul", class_="subject-property")
        if ul:
            for li in ul.find_all("li"):
                label = li.find("span", class_="label")
                value = li.find("span", class_="value")
                if not label or not value:
                    continue
                key = label.get_text(strip=True).rstrip("：:").strip()
                val = value.get_text(strip=True)
                if key == "性别":
                    info["gender"] = val
                elif key == "出生日期":
                    info["birth_date"] = val
                elif key == "去世日期":
                    info["death_date"] = val
                elif key == "出生地":
                    info["birth_place"] = val
                elif key in ("IMDb编号", "IMDb"):
                    info["imdb_id"] = val

        # 设置默认值
        info.setdefault("gender", "")
        info.setdefault("birth_date", "")
        info.setdefault("death_date", "")
        info.setdefault("birth_place", "")
        info.setdefault("imdb_id", "")

        # ========== 人物简介（brief_intro） ==========
        brief_intro = ""
        intro_section = soup.find("section", class_="subject-intro")
        if intro_section:
            desc_div = intro_section.find("div", class_="desc")
            if desc_div:
                brief_intro = desc_div.get_text("\n", strip=True)
        info["brief_intro"] = brief_intro



        info["url"] = url
        return info