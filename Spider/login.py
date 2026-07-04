# login.py

import requests

session = requests.Session()

cookies = {

    # 填写你自己的Cookie

    "bid": "EApHuNBjuqI",

    "dbcl2": "287494869:axszN6pvM6s",

    "ck": "V9-u",

    "push_noty_num": "0",

    "push_doumail_num": "0"
}

session.cookies.update(cookies)