from __future__ import annotations

from typing import Any
from urllib.parse import quote_plus


def build_purchase_channels(title: str | None, author: str | None = "", isbn: str | None = "") -> list[dict[str, Any]]:
    """Build third-party book search links without claiming live price or stock data."""
    parts = [str(x).strip() for x in [title, author] if x and str(x).strip()]
    keyword = " ".join(parts) or str(isbn or "").strip()
    q = quote_plus(keyword)

    return [
        {
            "platform": "京东图书",
            "url": f"https://search.jd.com/Search?keyword={q}",
            "action_text": "前往搜索",
            "note": "实际价格、库存和版本信息请以第三方平台页面为准。",
        },
        {
            "platform": "当当网",
            "url": f"http://search.dangdang.com/?key={q}",
            "action_text": "前往搜索",
            "note": "实际价格、库存和版本信息请以第三方平台页面为准。",
        },
        {
            "platform": "淘宝",
            "url": f"https://s.taobao.com/search?q={q}",
            "action_text": "前往搜索",
            "note": "实际价格、库存和版本信息请以第三方平台页面为准。",
        },
        {
            "platform": "孔夫子旧书网",
            "url": f"https://search.kongfz.com/product_result/?key={q}",
            "action_text": "前往搜索",
            "note": "二手书价格和库存请以第三方平台页面为准。",
        },
    ]
