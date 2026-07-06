from __future__ import annotations

import hashlib
import math
import re
from collections import Counter
from typing import Iterable

from app.models import Book


class EmbeddingService:
    """Lightweight local semantic vector service.

    The service deliberately keeps zero heavy model dependencies so the project remains easy to
    run in classroom/demo environments. It combines Chinese n-gram hashing vectors, domain synonym
    expansion, weighted book fields, and rule-based intent boosts. The public methods can later be
    replaced by BGE/text2vec/FAISS without changing SearchService.
    """

    VECTOR_DIM = 512

    # Words that often appear in natural language search but do not describe the book itself.
    STOPWORDS: set[str] = {
        "我想", "想看", "想读", "找本", "找一", "一本", "一部", "有没有", "推荐", "书籍", "图书",
        "适合", "可以", "比较", "有没有", "什么", "哪些", "关于", "相关", "方面", "类型", "一点",
        "入手", "看看", "阅读", "读物", "内容", "系统", "帮我", "给我", "最好", "现在", "最近",
    }

    # Domain expansion makes natural language queries such as “适合大学生入门人工智能的书” match
    # books tagged with AI, Python, machine learning, deep learning, etc. Keep this dictionary local
    # and transparent so the search feature can be demonstrated without external embedding services.
    SYNONYMS: dict[str, list[str]] = {
        "人工智能": ["ai", "机器学习", "深度学习", "神经网络", "算法", "数据挖掘", "python", "大模型", "自然语言处理", "计算机"],
        "ai": ["人工智能", "机器学习", "深度学习", "神经网络", "大模型", "算法"],
        "大模型": ["人工智能", "ai", "机器学习", "深度学习", "自然语言处理", "chatgpt", "生成式人工智能"],
        "机器学习": ["人工智能", "ai", "深度学习", "算法", "数据挖掘", "神经网络"],
        "编程": ["程序设计", "python", "代码", "开发", "计算机", "软件", "算法"],
        "python": ["编程", "程序设计", "代码", "数据分析", "机器学习", "人工智能"],
        "入门": ["基础", "初学", "零基础", "导论", "实践", "通识", "大众", "教材"],
        "大学生": ["学生", "教材", "基础", "入门", "通识", "青年", "学习方法", "成长"],
        "零基础": ["入门", "基础", "初学", "导论", "通识"],
        "进阶": ["深入", "高级", "专业", "系统", "原理", "实践"],
        "科幻": ["未来", "宇宙", "三体", "银河", "机器人", "时间", "太空", "幻想", "外星", "星际"],
        "宇宙": ["科幻", "太空", "星际", "天文", "银河", "未来", "三体"],
        "未来": ["科幻", "科技", "人工智能", "文明", "趋势", "社会", "三体"],
        "历史": ["中国史", "世界史", "文明", "人物", "传记", "通史", "朝代", "人文", "考古"],
        "中国历史": ["中国史", "历史", "朝代", "通史", "明朝", "秦汉", "唐宋", "人物"],
        "世界历史": ["世界史", "全球史", "文明", "人类简史", "历史"],
        "文学": ["小说", "名著", "经典", "现实主义", "散文", "故事", "叙事", "文学现实"],
        "小说": ["文学", "故事", "叙事", "长篇", "名著", "虚构", "人物"],
        "名著": ["经典", "文学", "小说", "世界文学", "中国文学"],
        "现实主义": ["文学", "小说", "社会", "人生", "苦难", "平凡", "活着"],
        "心理": ["心理学", "认知", "情绪", "行为", "压力", "自我", "成长", "治愈", "关系"],
        "压力": ["心理", "情绪", "治愈", "放松", "焦虑", "自我成长", "疗愈"],
        "焦虑": ["心理", "情绪", "压力", "治愈", "自我", "认知"],
        "治愈": ["心理", "情绪", "散文", "温暖", "生活", "成长", "疗愈"],
        "人生": ["哲学", "生命", "意义", "成长", "价值", "思考", "生活"],
        "人生意义": ["哲学", "存在主义", "生命", "价值", "思考", "成长"],
        "哲学": ["思想", "人生", "意义", "存在主义", "伦理", "智慧", "思辨"],
        "经济": ["金融", "商业", "市场", "投资", "宏观经济", "管理", "经济学"],
        "金融": ["经济", "投资", "市场", "商业", "理财", "货币"],
        "管理": ["领导力", "组织", "商业", "企业", "沟通", "战略", "团队"],
        "写作": ["文学", "表达", "创作", "小说", "散文", "叙事", "文字"],
        "沟通": ["表达", "社交", "关系", "管理", "心理", "谈判"],
        "社会": ["社会学", "人类", "制度", "群体", "心理", "历史", "现实"],
        "女性": ["性别", "女性主义", "成长", "社会", "文学"],
        "儿童": ["童书", "少儿", "成长", "教育", "绘本", "儿童文学"],
        "教育": ["学习", "学生", "成长", "教学", "学校", "家庭教育"],
        "医学": ["健康", "疾病", "生命", "身体", "医生", "科普"],
    }

    DOMAIN_RULES: list[dict[str, list[str] | str | float]] = [
        {
            "name": "人工智能与编程",
            "query": ["人工智能", "ai", "大模型", "机器学习", "深度学习", "算法", "编程", "python", "计算机", "数据"],
            "book": ["人工智能", "ai", "机器学习", "深度学习", "算法", "python", "计算机", "数据", "神经网络", "程序设计", "代码"],
            "boost": 0.20,
        },
        {
            "name": "科幻与未来想象",
            "query": ["科幻", "宇宙", "未来", "太空", "星际", "机器人", "三体", "幻想"],
            "book": ["科幻", "宇宙", "未来", "太空", "星际", "机器人", "三体", "银河", "外星", "时间"],
            "boost": 0.18,
        },
        {
            "name": "历史人文",
            "query": ["历史", "中国史", "世界史", "文明", "传记", "朝代", "人文"],
            "book": ["历史", "中国史", "世界史", "文明", "传记", "朝代", "通史", "明朝", "人文", "考古"],
            "boost": 0.18,
        },
        {
            "name": "文学小说",
            "query": ["文学", "小说", "名著", "故事", "散文", "现实主义", "经典"],
            "book": ["文学", "小说", "名著", "故事", "散文", "现实主义", "经典", "长篇", "叙事"],
            "boost": 0.17,
        },
        {
            "name": "心理与自我成长",
            "query": ["心理", "压力", "焦虑", "情绪", "治愈", "成长", "自我", "关系"],
            "book": ["心理", "心理学", "压力", "焦虑", "情绪", "治愈", "成长", "自我", "认知", "行为", "关系"],
            "boost": 0.17,
        },
        {
            "name": "哲学与人生思考",
            "query": ["哲学", "人生", "意义", "生命", "价值", "思考", "存在主义"],
            "book": ["哲学", "人生", "意义", "生命", "价值", "思考", "存在主义", "思想", "智慧"],
            "boost": 0.16,
        },
        {
            "name": "经济金融与管理",
            "query": ["经济", "金融", "商业", "投资", "管理", "企业", "领导力", "市场"],
            "book": ["经济", "经济学", "金融", "商业", "投资", "管理", "企业", "领导力", "市场", "战略"],
            "boost": 0.16,
        },
    ]

    @classmethod
    def book_text(cls, book: Book) -> str:
        """Build a weighted search document from a book.

        Title, tags, authors and category are repeated because they are stronger semantic signals than
        long descriptions. This improves queries like “大学生入门人工智能” or “宇宙未来科幻”.
        """
        title = book.title or ""
        subtitle = book.subtitle or ""
        category = book.category or ""
        difficulty = book.difficulty or ""
        description = book.description or ""
        publisher = book.publisher.name if book.publisher else ""
        series = book.series.name if book.series else ""
        authors = " ".join(a.name for a in book.authors)
        tags = " ".join(t.name for t in book.tags)
        weighted_parts = [
            title, title, title, title,
            subtitle, subtitle,
            category, category, category,
            difficulty, difficulty,
            tags, tags, tags, tags,
            authors, authors, authors,
            series, series,
            publisher,
            description,
        ]
        return " ".join(x for x in weighted_parts if x)

    @classmethod
    def _expand_synonyms(cls, text: str, tokens: list[str]) -> list[str]:
        expanded = list(tokens)
        lower_text = text.lower()
        upper_text = text.upper()
        for key, values in cls.SYNONYMS.items():
            key_lower = key.lower()
            if key_lower in lower_text or key.upper() in upper_text:
                expanded.extend(v.lower() for v in values)
        return expanded

    @classmethod
    def tokenize(cls, text: str) -> list[str]:
        text = (text or "").lower()
        tokens: list[str] = []
        # English / number words.
        tokens.extend(re.findall(r"[a-z0-9]{2,}", text))
        # Chinese terms: keep 2-4 gram fragments to approximate semantic overlap without jieba.
        chinese_blocks = re.findall(r"[\u4e00-\u9fa5]+", text)
        for block in chinese_blocks:
            if len(block) <= 8:
                tokens.append(block)
            # Preserve meaningful longer phrases when the user types compact queries.
            if len(block) >= 5:
                tokens.extend(block[i:i + 5] for i in range(0, max(len(block) - 5 + 1, 0)))
            for n in (2, 3, 4):
                for i in range(0, max(len(block) - n + 1, 0)):
                    tokens.append(block[i:i + n])
        tokens = [t for t in tokens if t and t not in cls.STOPWORDS]
        expanded = cls._expand_synonyms(text, tokens)
        return [t for t in expanded if t and t not in cls.STOPWORDS]

    @classmethod
    def query_is_natural_language(cls, query: str) -> bool:
        text = query or ""
        markers = ["适合", "推荐", "想看", "想读", "有没有", "入门", "零基础", "关于", "了解", "怎么", "可以", "大学生", "初学"]
        return len(text) >= 8 or any(m in text for m in markers)

    @classmethod
    def vectorize(cls, text: str) -> list[float]:
        vec = [0.0] * cls.VECTOR_DIM
        counts = Counter(cls.tokenize(text))
        if not counts:
            return vec
        for token, count in counts.items():
            digest = hashlib.md5(token.encode("utf-8")).hexdigest()
            idx = int(digest[:8], 16) % cls.VECTOR_DIM
            sign = 1.0 if int(digest[8:10], 16) % 2 == 0 else -1.0
            # log scaling avoids long descriptions dominating title/tag matches.
            length_weight = 1.0 + min(len(token), 8) / 12
            vec[idx] += sign * (1.0 + math.log(count)) * length_weight
        norm = math.sqrt(sum(v * v for v in vec)) or 1.0
        return [v / norm for v in vec]

    @staticmethod
    def cosine(a: Iterable[float], b: Iterable[float]) -> float:
        value = sum(x * y for x, y in zip(a, b))
        return max(0.0, min(1.0, value))

    @classmethod
    def _book_lower_text(cls, book: Book) -> str:
        return cls.book_text(book).lower()

    @classmethod
    def _domain_boost(cls, query: str, book: Book) -> tuple[float, list[str]]:
        q_text = query.lower()
        q_tokens = set(cls.tokenize(query))
        b_text = cls._book_lower_text(book)
        b_tokens = set(cls.tokenize(b_text))
        matched_domains: list[str] = []
        boost = 0.0
        for rule in cls.DOMAIN_RULES:
            q_terms = [str(x).lower() for x in rule["query"]]  # type: ignore[index]
            b_terms = [str(x).lower() for x in rule["book"]]  # type: ignore[index]
            q_hit = any(t in q_text or t in q_tokens for t in q_terms)
            if not q_hit:
                continue
            b_hit_count = sum(1 for t in b_terms if t in b_text or t in b_tokens)
            if b_hit_count:
                matched_domains.append(str(rule["name"]))
                rule_boost = float(rule.get("boost", 0.12)) if isinstance(rule, dict) else 0.12
                boost += min(rule_boost, 0.08 + b_hit_count * 0.025)
        return min(boost, 0.32), matched_domains

    @classmethod
    def _difficulty_boost(cls, query: str, book: Book) -> float:
        q = query or ""
        difficulty = book.difficulty or ""
        text = cls._book_lower_text(book)
        boost = 0.0
        if any(x in q for x in ["入门", "零基础", "初学", "大学生", "新手", "基础"]):
            if difficulty in {"入门", "大众"} or any(x in text for x in ["入门", "基础", "导论", "通识", "初学"]):
                boost += 0.14
        if any(x in q for x in ["进阶", "深入", "专业", "研究生", "高级", "系统学习"]):
            if difficulty in {"进阶", "专业"} or any(x in text for x in ["进阶", "深入", "原理", "专业", "系统"]):
                boost += 0.10
        return boost

    @classmethod
    def _exact_phrase_boost(cls, query: str, book: Book) -> float:
        q = (query or "").strip().lower()
        if not q:
            return 0.0
        title = (book.title or "").lower()
        subtitle = (book.subtitle or "").lower()
        tags = [t.name.lower() for t in book.tags]
        authors = [a.name.lower() for a in book.authors]
        boost = 0.0
        if q and q in title:
            boost += 0.24
        if q and q in subtitle:
            boost += 0.16
        if any(q in t for t in tags):
            boost += 0.18
        if any(q in a for a in authors):
            boost += 0.16
        return boost

    @classmethod
    def semantic_score(cls, query: str, book: Book) -> float:
        q_vec = cls.vectorize(query)
        b_vec = cls.vectorize(cls.book_text(book))
        score = cls.cosine(q_vec, b_vec)
        domain_boost, _ = cls._domain_boost(query, book)
        score += domain_boost
        score += cls._difficulty_boost(query, book)
        score += cls._exact_phrase_boost(query, book)
        return round(min(score, 1.0), 4)

    @classmethod
    def explain_match(cls, query: str, book: Book) -> str:
        _, domains = cls._domain_boost(query, book)
        parts: list[str] = []
        if domains:
            parts.append("语义主题：" + "、".join(domains[:2]))
        if cls._difficulty_boost(query, book) > 0:
            parts.append("适配入门/进阶需求")
        if cls._exact_phrase_boost(query, book) > 0:
            parts.append("命中书名、作者或标签")
        if not parts:
            parts.append("根据标题、简介、作者、分类和标签的语义相似度匹配")
        return "；".join(parts) + "。"

    @classmethod
    def rank_books(
        cls,
        query: str,
        books: list[Book],
        limit: int = 50,
        min_score: float | None = None,
    ) -> list[tuple[Book, float]]:
        if min_score is None:
            tokens = cls.tokenize(query)
            min_score = 0.14 if cls.query_is_natural_language(query) or len(tokens) >= 8 else 0.09

        rows = [(book, cls.semantic_score(query, book)) for book in books]
        rows = [(book, score) for book, score in rows if score >= min_score]
        rows.sort(key=lambda x: x[1], reverse=True)
        return rows[:limit]
