import re

def is_book_url(url):

    if not url:
        return False

    return bool(
        re.match(
            r"^https://book\.douban\.com/subject/\d+/?$",
            url
        )
    )