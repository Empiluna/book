# douban_spider.py

import requests

from headers import HEADERS
from login import session

class DoubanSpider:

    @staticmethod
    def get_page(url):

        try:

            response = session.get(
                url,
                headers=HEADERS,
                timeout=10
            )

            response.raise_for_status()

            return response.text

        except Exception as e:

            print(e)

            return None


