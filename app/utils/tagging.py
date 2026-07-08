from __future__ import annotations

import re
from typing import Any

_SPLIT_RE = re.compile(r"\s*(?:,|，|、|/|\\|\||;|；|:|：|-|—|–)\s*")

STANDARD_TAGS = {
    "文学", "小说", "名著", "散文", "随笔", "诗歌", "现实主义",
    "科幻", "硬科幻", "宇宙文明", "未来",
    "推理", "悬疑", "犯罪", "反转",
    "历史", "传记", "人文", "社会", "法律",
    "心理", "治愈", "情绪", "自我成长",
    "哲学", "人生", "思辨",
    "青春", "校园", "爱情", "女性成长", "家庭", "亲情",
    "人工智能", "编程", "Python", "计算机", "算法",
    "经济", "金融", "管理", "商业", "职场",
    "教育", "学习方法", "表达", "沟通",
    "科普", "通识", "儿童", "绘本",
    "冒险", "政治",
    "武侠", "艺术", "医学", "健康",
    "入门", "零基础", "进阶", "睡前", "轻松",
}

TAG_ALIASES = {
    "AI": "人工智能",
    "ai": "人工智能",
    "机器学习": "人工智能",
    "深度学习": "人工智能",
    "大模型": "人工智能",
    "程序设计": "编程",
    "计算机科学": "计算机",
    "侦探": "推理",
    "谜案": "推理",
    "烧脑": "推理",
    "案件": "悬疑",
    "世界名著": "名著",
    "经典": "名著",
    "治愈系": "治愈",
    "成长": "自我成长",
    "女性": "女性成长",
    "理财": "金融",
    "经济学": "经济",
    "时间管理": "学习方法",
    "沟通能力": "沟通",
    "表达能力": "表达",
}

NOISE_TAGS = {
    "用户原创", "AI排版", "创作草稿",
    "默认", "未知", "其他", "图书", "推荐",
}

TITLE_TAG_OVERRIDES = {
    "活着": ["文学", "现实主义"],
    "百年孤独": ["文学", "名著"],
    "平凡的世界": ["文学", "现实主义"],
    "三体": ["科幻"],
    "2001：太空漫游": ["科幻", "硬科幻"],
    "鲁滨逊漂流记": ["文学", "名著", "冒险"],
    "汤姆·索亚历险记": ["文学", "名著", "冒险"],
    "汤姆索亚历险记": ["文学", "名著", "冒险"],
    "毛泽东选集": ["政治", "历史"],
    "城南旧事": ["文学", "小说"],
    "红楼梦": ["文学", "名著"],
    "三国演义": ["历史", "文学", "名著"],
    "水浒传": ["文学", "名著"],
    "西游记": ["文学", "名著"],
    "射雕英雄传": ["武侠", "文学"],
    "天龙八部": ["武侠", "文学"],
    "神雕侠侣": ["武侠", "文学"],
    "倚天屠龙记": ["武侠", "文学"],
    "鹿鼎记": ["武侠", "文学"],
    "笑傲江湖": ["武侠", "文学"],
    "碧血剑": ["武侠", "文学"],
    "书剑恩仇录": ["武侠", "文学"],
    "飞狐外传": ["武侠", "文学"],
    "白马啸西风": ["武侠", "文学"],
    "连城诀": ["武侠", "文学"],
    "镖人": ["武侠"],
    "正面管教": ["教育"],
    "敢于放手的养育": ["教育"],
    "我为孩子打突围战": ["教育"],
    "优秀的绵羊": ["教育"],
    "金钱心理学": ["心理", "经济"],
    "集体行动的逻辑": ["经济", "管理"],
    "我的阿勒泰": ["文学", "散文"],
    "阿勒泰的角落": ["文学", "散文"],
    "我与地坛": ["文学", "散文"],
    "撒哈拉的故事": ["文学", "散文"],
    "人间草木": ["文学", "散文"],
    "羊道": ["文学", "散文"],
    "冬牧场": ["文学", "散文"],
    "尸人庄谜案": ["推理", "悬疑"],
    "十角馆事件": ["推理"],
    "钟表馆事件": ["推理"],
    "罗杰疑案": ["推理", "悬疑"],
    "ABC谋杀案": ["推理"],
    "占星术杀人魔法": ["推理"],
    "密室": ["推理", "悬疑"],
    "动物农场": ["文学", "名著"],
    "莎士比亚喜剧集": ["文学", "名著", "爱情"],
    "莎士比亚喜剧悲剧集": ["文学", "名著"],
    "少年维特的烦恼": ["文学", "爱情"],
    "悉达多": ["文学", "哲学"],
    "飘": ["文学", "名著", "女性成长"],
    "德米安": ["文学", "名著"],
    "人性的枷锁": ["文学", "名著"],
    "呼啸山庄": ["文学", "名著", "爱情"],
    "钢铁是怎样炼成的": ["文学", "名著"],
    "绿野仙踪": ["文学", "名著", "冒险"],
    "简爱": ["文学", "名著", "爱情"],
    "包法利夫人": ["文学", "名著"],
    "天堂蒜薹之歌": ["文学", "现实主义"],
    "素食者": ["文学", "名著"],
    "追风筝的人": ["文学", "名著"],
    "蛇结": ["文学", "名著"],
    "你的夏天还好吗": ["文学", "小说"],
    "晚安，布布": ["文学", "小说"],
    "晚安, 布布": ["文学", "小说"],
    "金庸江湖的另一面": ["文学", "武侠"],
    "未来学大会": ["科幻"],
    "少数派报告": ["科幻", "推理"],
    "仿生人会梦见电子羊": ["科幻"],
    "Project Hail Mary": ["科幻"],
    "其主之声": ["科幻"],
    "月球城市": ["科幻"],
    "美丽新世界": ["文学", "名著"],
    "来自新世界": ["科幻"],
    "伊加利亚的女儿们": ["科幻", "文学"],
    "你好，忧愁": ["文学", "名著", "爱情"],
    "你好, 忧愁": ["文学", "名著", "爱情"],
    "恶意": ["推理", "悬疑"],
    "白夜行": ["推理", "悬疑"],
    "猫鱼": ["悬疑", "文学"],
    "犹大之窗": ["推理"],
    "混凝土里的金发女郎": ["推理", "悬疑"],
    "方舟": ["推理", "悬疑"],
    "童年的终结": ["科幻", "名著"],
    "与罗摩相会": ["科幻", "硬科幻"],
    "星海来信": ["科幻", "人工智能"],
}

TAG_RULES: list[tuple[str, list[str]]] = [
    ("科幻", ["科幻", "硬科幻", "宇宙", "太空", "星际", "外星", "机器人", "三体", "银河帝国"]),
    ("硬科幻", ["硬科幻", "物理", "三体", "太空漫游", "技术设定"]),
    ("推理", ["推理", "侦探", "谜案", "凶手", "案件", "解谜", "烧脑"]),
    ("悬疑", ["悬疑", "犯罪", "惊悚", "反转", "真相"]),
    ("文学", ["文学", "小说", "长篇小说", "中篇小说", "短篇小说"]),
    ("名著", ["名著", "经典", "世界文学", "诺贝尔", "文学史"]),
    ("现实主义", ["现实主义", "活着", "平凡的世界", "四世同堂"]),
    ("心理", ["心理", "情绪", "焦虑", "咨询", "认知"]),
    ("治愈", ["治愈", "温暖", "疗愈", "睡前", "轻松"]),
    ("历史", ["历史小说", "历史著作", "中国史", "世界史", "通史", "三国演义", "大明王朝", "两京十五日", "长安的荔枝"]),
    ("传记", ["传记", "自传", "回忆录"]),
    ("人工智能", ["人工智能", "机器学习", "深度学习", "神经网络", "大模型", "AI"]),
    ("编程", ["编程", "程序", "代码", "Python", "Java", "开发"]),
    ("经济", ["经济学", "宏观经济", "金融市场", "投资理财", "商业管理"]),
    ("金融", ["金融", "投资", "股票", "货币", "理财"]),
    ("管理", ["管理", "领导力", "组织", "团队"]),
    ("青春", ["青春小说", "校园小说", "青春文学"]),
    ("爱情", ["爱情", "恋爱", "情感"]),
    ("女性成长", ["女性", "女性成长", "独立"]),
    ("教育", ["教育学", "教学法", "家庭教育", "正面管教", "养育"]),
    ("学习方法", ["学习方法", "自律", "效率管理"]),
    ("表达", ["表达能力", "写作课", "演讲"]),
    ("沟通", ["沟通技巧", "社交", "人际关系"]),
    ("科普", ["科普", "科学普及"]),
    ("儿童", ["儿童文学", "少儿", "童书", "绘本"]),
]

HIGH_RISK_TAGS = {
    "科幻", "硬科幻", "宇宙文明",
    "推理", "悬疑", "犯罪", "反转",
    "人工智能", "编程", "Python", "计算机", "算法",
    "武侠", "医学", "儿童", "绘本",
}

TAG_EVIDENCE = {tag: keywords for tag, keywords in TAG_RULES}

TOKEN_EVIDENCE_TAGS = {"人工智能", "Python"}


def has_tag_evidence(tag: str, text: str) -> bool:
    if tag not in HIGH_RISK_TAGS:
        return True

    evidence_words = TAG_EVIDENCE.get(tag, [tag])
    lowered = text.lower()
    if tag in TOKEN_EVIDENCE_TAGS:
        return any(re.search(rf"(?<![a-zA-Z0-9]){re.escape(word.lower())}(?![a-zA-Z0-9])", lowered) for word in evidence_words)
    return any(word.lower() in lowered for word in evidence_words)


def dedupe(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        value = str(value or "").strip()
        if value and value not in seen:
            result.append(value)
            seen.add(value)
    return result


def split_terms(value: Any) -> list[str]:
    if not value:
        return []

    raw_items = value if isinstance(value, list) else [value]
    result: list[str] = []

    for item in raw_items:
        text = str(item or "").strip().strip("#")
        if not text:
            continue
        for part in _SPLIT_RE.split(text):
            part = part.strip().strip("#")
            if part:
                result.append(part)

    return dedupe(result)


def clean_tag(value: str | None) -> str | None:
    if not value:
        return None

    tag = str(value).strip().strip("#")
    if not tag or tag in NOISE_TAGS:
        return None

    tag = TAG_ALIASES.get(tag, tag)

    if len(tag) > 16:
        return None

    if tag in STANDARD_TAGS:
        return tag

    for standard in STANDARD_TAGS:
        if standard in tag:
            return standard

    return None


def title_override_tags(title: str) -> list[str]:
    text = str(title or "").replace("·", "").replace(" ", "")
    for key, tags in TITLE_TAG_OVERRIDES.items():
        normalized_key = key.replace("·", "").replace(" ", "")
        if normalized_key and normalized_key in text:
            return tags[:]
    return []


def normalize_tags(raw_tags: Any, raw_category: Any, title: str, description: str, trust_existing: bool = True) -> list[str]:
    overrides = title_override_tags(title)
    if overrides:
        return overrides

    evidence_text = f"{title} {description}"
    tags: list[str] = []

    if trust_existing:
        for raw in split_terms(raw_tags):
            clean = clean_tag(raw)
            if clean and has_tag_evidence(clean, evidence_text):
                tags.append(clean)

        for raw in split_terms(raw_category):
            clean = clean_tag(raw)
            if clean and has_tag_evidence(clean, evidence_text):
                tags.append(clean)

    lower_text = evidence_text.lower()
    for tag, keywords in TAG_RULES:
        for keyword in keywords:
            if keyword.lower() in lower_text:
                tags.append(tag)
                break

    tags = dedupe(tags)
    return tags[:8] if tags else ["通识"]


def book_tag_names(book: Any) -> list[str]:
    return dedupe([
        clean
        for tag in getattr(book, "tags", []) or []
        if (clean := clean_tag(getattr(tag, "name", None)))
    ])


def main_tag(book: Any) -> str | None:
    tags = book_tag_names(book)
    if tags:
        return tags[0]
    return clean_tag(getattr(book, "category", None))


def clean_public_tags(values: Any) -> list[str]:
    return dedupe([
        clean
        for value in split_terms(values)
        if (clean := clean_tag(value))
    ])
