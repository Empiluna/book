from __future__ import annotations

import hashlib
import math
import re
from collections import Counter
from typing import Iterable

from app.models import Book
from app.utils.tagging import book_tag_names, main_tag


class EmbeddingService:
    """Lightweight local semantic vector service.

    The service deliberately keeps zero heavy model dependencies so the project remains easy to
    run in classroom/demo environments. It combines Chinese n-gram hashing vectors, domain synonym
    expansion, weighted book fields, and rule-based intent boosts. The public methods can later be
    replaced by BGE/text2vec/FAISS without changing SearchService.
    """

    VECTOR_DIM = 1024

    # Words that often appear in natural language search but do not describe the book itself.
    STOPWORDS: set[str] = {
        "我想", "想看", "想读", "找本", "找一", "一本", "一部", "有没有", "推荐", "书籍", "图书",
        "适合", "可以", "比较", "什么", "哪些", "关于", "相关", "方面", "类型", "一点",
        "入手", "看看", "阅读", "读物", "内容", "帮我", "给我", "最好", "现在", "最近",
    }

    # Query-side semantic expansion. Kept local and transparent for demo/acceptance scenarios.
    SYNONYMS: dict[str, list[str]] = {
        "人工智能": ["ai", "机器学习", "深度学习", "神经网络", "算法", "数据挖掘", "python", "大模型", "自然语言处理", "计算机", "编程", "科技"],
        "ai": ["人工智能", "机器学习", "深度学习", "神经网络", "大模型", "算法", "自然语言处理"],
        "大模型": ["人工智能", "ai", "机器学习", "深度学习", "自然语言处理", "chatgpt", "生成式人工智能", "llm"],
        "机器学习": ["人工智能", "ai", "深度学习", "算法", "数据挖掘", "神经网络", "统计学习"],
        "深度学习": ["人工智能", "机器学习", "神经网络", "算法", "计算机视觉", "自然语言处理"],
        "编程": ["程序设计", "python", "代码", "开发", "计算机", "软件", "算法", "实践"],
        "python": ["编程", "程序设计", "代码", "数据分析", "机器学习", "人工智能", "爬虫", "自动化"],
        "数据分析": ["数据", "统计", "python", "机器学习", "商业分析", "可视化"],
        "算法": ["计算机", "编程", "数据结构", "程序设计", "机器学习", "逻辑"],
        "入门": ["基础", "初学", "零基础", "导论", "实践", "通识", "大众", "教材", "新手", "启蒙"],
        "零基础": ["入门", "基础", "初学", "导论", "通识", "新手", "启蒙"],
        "初学": ["入门", "基础", "零基础", "新手", "导论", "教材"],
        "大学生": ["学生", "教材", "基础", "入门", "通识", "青年", "学习方法", "成长", "校园", "表达", "职业规划"],
        "学生": ["大学生", "校园", "学习", "教材", "成长", "青年", "基础"],
        "进阶": ["深入", "高级", "专业", "系统", "原理", "实践", "研究", "方法论"],
        "专业": ["进阶", "深入", "研究", "原理", "系统", "理论"],
        "科幻": ["未来", "宇宙", "三体", "银河", "机器人", "时间", "太空", "幻想", "外星", "星际", "文明", "硬科幻", "想象力"],
        "宇宙": ["科幻", "太空", "星际", "天文", "银河", "未来", "三体", "文明"],
        "未来": ["科幻", "科技", "人工智能", "文明", "趋势", "社会", "三体", "想象力"],
        "机器人": ["科幻", "人工智能", "未来", "科技", "机器", "自动化"],
        "历史": ["中国史", "世界史", "文明", "人物", "传记", "通史", "朝代", "人文", "考古", "社会", "制度"],
        "中国历史": ["中国史", "历史", "朝代", "通史", "明朝", "秦汉", "唐宋", "人物", "文明"],
        "世界历史": ["世界史", "全球史", "文明", "人类简史", "历史", "战争", "社会"],
        "人文": ["历史", "哲学", "文学", "社会", "艺术", "文化", "通识"],
        "传记": ["人物", "人生", "历史", "成长", "经历", "名人", "奋斗"],
        "文学": ["小说", "名著", "经典", "现实主义", "散文", "故事", "叙事", "文学现实", "人性", "人生"],
        "小说": ["文学", "故事", "叙事", "长篇", "名著", "虚构", "人物", "情节", "人生"],
        "名著": ["经典", "文学", "小说", "世界文学", "中国文学", "人生", "思想"],
        "经典": ["名著", "文学", "思想", "世界文学", "中国文学", "人性", "人生"],
        "现实主义": ["文学", "小说", "社会", "人生", "苦难", "平凡", "活着", "现实", "底层"],
        "散文": ["生活", "温暖", "治愈", "情感", "日常", "轻松", "文学", "随笔"],
        "随笔": ["散文", "生活", "思考", "日常", "轻松", "人文"],
        "短篇": ["短篇小说", "轻松", "睡前", "故事", "文学", "碎片阅读"],
        "轻松": ["治愈", "温暖", "生活", "散文", "短篇", "幽默", "日常", "睡前", "放松", "随笔"],
        "放松": ["轻松", "治愈", "温暖", "生活", "散文", "幽默", "睡前", "日常"],
        "睡前": ["轻松", "放松", "治愈", "温暖", "短篇", "散文", "生活", "日常", "随笔"],
        "治愈": ["心理", "情绪", "散文", "温暖", "生活", "成长", "疗愈", "放松", "轻松"],
        "治愈系": ["治愈", "温暖", "情绪", "心理", "生活", "成长", "疗愈", "轻松"],
        "温暖": ["治愈", "生活", "散文", "情感", "成长", "家庭", "日常", "轻松"],
        "幽默": ["轻松", "喜剧", "日常", "生活", "放松", "有趣"],
        "烧脑": ["推理", "悬疑", "犯罪", "侦探", "反转", "逻辑", "谜案", "心理", "案件"],
        "悬疑": ["推理", "犯罪", "侦探", "烧脑", "谜案", "反转", "惊悚", "心理"],
        "推理": ["悬疑", "犯罪", "侦探", "谜案", "逻辑", "烧脑", "反转", "案件"],
        "犯罪": ["悬疑", "推理", "侦探", "案件", "谜案", "心理", "社会", "法律"],
        "侦探": ["推理", "悬疑", "犯罪", "案件", "谜案", "烧脑"],
        "反转": ["悬疑", "推理", "烧脑", "情节", "谜案"],
        "爱情": ["情感", "青春", "校园", "成长", "关系", "女性", "家庭", "恋爱"],
        "青春": ["校园", "成长", "爱情", "青年", "学生", "友情", "梦想", "轻松", "大学生"],
        "校园": ["青春", "学生", "大学生", "成长", "爱情", "友情", "青年"],
        "女性成长": ["女性", "成长", "独立", "情感", "社会", "心理", "文学", "自我"],
        "女性": ["性别", "女性主义", "成长", "社会", "文学", "独立", "情感"],
        "家庭": ["亲情", "生活", "成长", "关系", "情感", "现实主义", "温暖"],
        "亲情": ["家庭", "情感", "成长", "温暖", "生活"],
        "心理": ["心理学", "认知", "情绪", "行为", "压力", "自我", "成长", "治愈", "关系", "沟通"],
        "压力": ["心理", "情绪", "治愈", "放松", "焦虑", "自我成长", "疗愈"],
        "焦虑": ["心理", "情绪", "压力", "治愈", "自我", "认知", "放松"],
        "情绪": ["心理", "焦虑", "压力", "治愈", "关系", "自我", "认知"],
        "人生": ["哲学", "生命", "意义", "成长", "价值", "思考", "生活", "文学"],
        "人生意义": ["哲学", "存在主义", "生命", "价值", "思考", "成长", "人生"],
        "哲学": ["思想", "人生", "意义", "存在主义", "伦理", "智慧", "思辨", "价值"],
        "孤独": ["心理", "人生", "文学", "治愈", "情绪", "成长"],
        "表达": ["写作", "沟通", "演讲", "语言", "表达能力", "逻辑", "思维", "文学"],
        "表达能力": ["表达", "写作", "沟通", "演讲", "逻辑", "思维", "语言"],
        "写作": ["文学", "表达", "创作", "小说", "散文", "叙事", "文字", "沟通"],
        "沟通": ["表达", "社交", "关系", "管理", "心理", "谈判", "人际关系"],
        "社交": ["沟通", "关系", "心理", "表达", "人际关系", "谈判"],
        "人际关系": ["社交", "沟通", "心理", "关系", "情绪"],
        "演讲": ["表达", "沟通", "语言", "说服", "逻辑", "公众表达"],
        "逻辑": ["思维", "表达", "推理", "算法", "哲学", "批判性思维"],
        "批判性思维": ["逻辑", "思维", "哲学", "表达", "方法论"],
        "提升自己": ["成长", "自我提升", "学习方法", "认知", "心理", "管理", "效率", "习惯"],
        "自我提升": ["成长", "学习方法", "认知", "效率", "管理", "心理", "习惯"],
        "效率": ["时间管理", "自律", "学习方法", "管理", "习惯", "方法论"],
        "自律": ["时间管理", "效率", "习惯", "成长", "学习方法"],
        "学习方法": ["学习", "效率", "自律", "认知", "方法论", "学生", "成长"],
        "职业规划": ["大学生", "成长", "管理", "自我提升", "工作", "职场"],
        "经济": ["金融", "商业", "市场", "投资", "宏观经济", "管理", "经济学", "社会"],
        "金融": ["经济", "投资", "市场", "商业", "理财", "货币", "风险"],
        "投资": ["金融", "经济", "理财", "市场", "股票", "商业"],
        "管理": ["领导力", "组织", "商业", "企业", "沟通", "战略", "团队", "效率"],
        "商业": ["经济", "管理", "市场", "企业", "创业", "战略", "互联网"],
        "创业": ["商业", "互联网", "管理", "产品", "市场", "创新"],
        "领导力": ["管理", "团队", "组织", "沟通", "战略"],
        "科普": ["科学", "通识", "大众", "入门", "自然", "宇宙", "医学", "心理学", "生物", "物理"],
        "通识": ["科普", "入门", "基础", "大众", "人文", "历史", "哲学", "科学", "素养"],
        "教育": ["学习", "学生", "成长", "教学", "学校", "家庭教育", "方法"],
        "儿童": ["童书", "少儿", "成长", "教育", "绘本", "儿童文学", "亲子"],
        "医学": ["健康", "疾病", "生命", "身体", "医生", "科普", "心理"],
        "健康": ["医学", "身体", "生活", "心理", "疾病", "科普"],
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
        {
            "name": "轻松治愈阅读",
            "query": ["轻松", "放松", "睡前", "治愈", "治愈系", "温暖", "情绪", "生活", "散文", "短篇", "幽默"],
            "book": ["轻松", "放松", "睡前", "治愈", "温暖", "情绪", "生活", "散文", "日常", "成长", "短篇", "随笔", "幽默"],
            "boost": 0.21,
        },
        {
            "name": "悬疑推理",
            "query": ["烧脑", "悬疑", "推理", "犯罪", "侦探", "反转", "谜案", "案件", "惊悚"],
            "book": ["烧脑", "悬疑", "推理", "犯罪", "侦探", "反转", "谜案", "逻辑", "心理", "案件", "惊悚"],
            "boost": 0.22,
        },
        {
            "name": "青春情感",
            "query": ["青春", "校园", "爱情", "情感", "成长", "友情", "女性成长", "亲情", "家庭"],
            "book": ["青春", "校园", "爱情", "情感", "成长", "友情", "女性", "青年", "家庭", "亲情", "温暖"],
            "boost": 0.19,
        },
        {
            "name": "表达沟通",
            "query": ["表达", "表达能力", "沟通", "社交", "人际关系", "写作", "演讲", "逻辑", "批判性思维"],
            "book": ["表达", "表达能力", "沟通", "社交", "人际关系", "写作", "演讲", "逻辑", "思维", "语言", "管理"],
            "boost": 0.20,
        },
        {
            "name": "自我提升与学习方法",
            "query": ["提升自己", "自我提升", "效率", "自律", "学习方法", "习惯", "成长", "职业规划", "职场"],
            "book": ["提升自己", "自我提升", "效率", "自律", "学习方法", "习惯", "成长", "认知", "管理", "职场", "方法论"],
            "boost": 0.20,
        },
        {
            "name": "科普通识",
            "query": ["科普", "通识", "科学", "大众", "自然", "医学", "健康", "有趣", "入门"],
            "book": ["科普", "通识", "科学", "大众", "自然", "医学", "健康", "有趣", "入门", "基础"],
            "boost": 0.18,
        },
        {
            "name": "教育与儿童阅读",
            "query": ["教育", "儿童", "少儿", "学生", "学习", "家庭教育", "绘本", "亲子"],
            "book": ["教育", "儿童", "少儿", "学生", "学习", "家庭教育", "绘本", "亲子", "成长"],
            "boost": 0.18,
        },
    ]

    BOOK_SEMANTIC_EXPANSIONS: dict[str, list[str]] = {
        "青春": ["校园", "成长", "青年", "学生", "大学生", "爱情", "友情", "梦想", "轻松"],
        "校园": ["青春", "学生", "大学生", "成长", "爱情", "友情"],
        "小说": ["故事", "叙事", "人物", "情节", "文学", "虚构", "人生"],
        "文学": ["小说", "散文", "故事", "经典", "表达", "人生", "人性"],
        "名著": ["经典", "文学", "人生", "思想", "世界文学", "中国文学", "人性"],
        "经典": ["名著", "文学", "人生", "思想", "世界文学", "中国文学"],
        "现实主义": ["现实", "社会", "人生", "苦难", "平凡", "文学", "小说", "底层"],
        "散文": ["生活", "温暖", "治愈", "情感", "日常", "轻松", "睡前", "随笔"],
        "随笔": ["散文", "生活", "思考", "日常", "轻松", "人文"],
        "短篇": ["睡前", "轻松", "故事", "碎片阅读", "文学"],
        "推理": ["悬疑", "犯罪", "侦探", "烧脑", "逻辑", "谜案", "反转", "案件"],
        "悬疑": ["推理", "犯罪", "侦探", "烧脑", "谜案", "心理", "反转"],
        "犯罪": ["悬疑", "推理", "侦探", "案件", "社会", "心理", "法律"],
        "科幻": ["未来", "宇宙", "科技", "太空", "文明", "幻想", "想象力", "星际"],
        "历史": ["文明", "人物", "朝代", "社会", "人文", "通史", "制度"],
        "传记": ["人物", "人生", "经历", "成长", "历史", "名人"],
        "心理": ["情绪", "认知", "关系", "压力", "焦虑", "治愈", "成长", "沟通"],
        "哲学": ["人生", "意义", "思想", "价值", "思辨", "智慧", "生命"],
        "教育": ["学习", "学生", "成长", "方法", "家庭教育", "教学", "学习方法"],
        "经济": ["商业", "金融", "市场", "投资", "管理", "经济学"],
        "金融": ["经济", "投资", "市场", "理财", "商业", "风险"],
        "管理": ["领导力", "组织", "沟通", "效率", "团队", "战略", "职场"],
        "商业": ["经济", "管理", "创业", "市场", "产品", "战略"],
        "人工智能": ["ai", "机器学习", "深度学习", "算法", "python", "大模型", "科技"],
        "机器学习": ["人工智能", "ai", "算法", "数据", "python", "统计学习"],
        "编程": ["程序设计", "python", "代码", "计算机", "算法", "开发"],
        "科普": ["通识", "科学", "大众", "入门", "有趣", "自然"],
        "通识": ["科普", "入门", "人文", "科学", "历史", "哲学", "素养"],
        "女性": ["女性成长", "独立", "情感", "社会", "文学", "心理"],
        "爱情": ["情感", "青春", "校园", "成长", "关系", "女性"],
        "家庭": ["亲情", "生活", "成长", "关系", "情感", "温暖"],
        "儿童": ["童书", "少儿", "成长", "教育", "绘本", "亲子"],
    }

    @staticmethod
    def _dedupe(items: Iterable[str]) -> list[str]:
        seen: set[str] = set()
        out: list[str] = []
        for item in items:
            value = (item or "").strip()
            if value and value not in seen:
                out.append(value)
                seen.add(value)
        return out

    @classmethod
    def _book_extra_semantic_terms(cls, book: Book) -> str:
        raw_terms: list[str] = []
        raw_terms.extend([
            book.title or "",
            book.subtitle or "",
            main_tag(book) or "",
            book.difficulty or "",
            book.description or "",
            book.publisher.name if book.publisher else "",
            book.series.name if book.series else "",
        ])
        raw_terms.extend(a.name for a in book.authors)
        raw_terms.extend(book_tag_names(book))
        raw_text = " ".join(raw_terms).lower()

        extra: list[str] = []
        for key, values in cls.BOOK_SEMANTIC_EXPANSIONS.items():
            if key.lower() in raw_text:
                extra.append(key)
                extra.extend(values)

        for key, values in cls.SYNONYMS.items():
            if key.lower() in raw_text:
                extra.append(key)
                extra.extend(values[:8])

        return " ".join(cls._dedupe(extra))

    @classmethod
    def book_text(cls, book: Book) -> str:
        """Build a weighted semantic document from a book."""
        title = book.title or ""
        subtitle = book.subtitle or ""
        category = main_tag(book) or ""
        difficulty = book.difficulty or ""
        description = book.description or ""
        publisher = book.publisher.name if book.publisher else ""
        series = book.series.name if book.series else ""
        authors = " ".join(a.name for a in book.authors)
        tags = " ".join(book_tag_names(book))
        extra_semantic_terms = cls._book_extra_semantic_terms(book)

        weighted_parts = [
            title, title, title, title,
            subtitle, subtitle,
            category, category, category,
            difficulty, difficulty,
            tags, tags, tags, tags,
            authors, authors, authors,
            series, series,
            publisher,
            extra_semantic_terms, extra_semantic_terms, extra_semantic_terms,
            description,
        ]
        return " ".join(x for x in weighted_parts if x)

    @classmethod
    def _expand_synonyms(cls, text: str, tokens: list[str]) -> list[str]:
        expanded = list(tokens)
        lower_text = (text or "").lower()
        upper_text = (text or "").upper()

        for key, values in cls.SYNONYMS.items():
            key_lower = key.lower()
            if key_lower in lower_text or key.upper() in upper_text or key_lower in tokens:
                expanded.append(key_lower)
                expanded.extend(v.lower() for v in values)

        return expanded

    @classmethod
    def tokenize(cls, text: str) -> list[str]:
        original = text or ""
        lowered = original.lower()

        cleaned = lowered
        for sw in sorted(cls.STOPWORDS, key=len, reverse=True):
            cleaned = cleaned.replace(sw.lower(), " ")

        tokens: list[str] = []
        tokens.extend(re.findall(r"[a-z0-9]{2,}", cleaned))

        for key in cls.SYNONYMS.keys():
            if key.lower() in lowered:
                tokens.append(key.lower())

        chinese_blocks = re.findall(r"[\u4e00-\u9fa5]+", cleaned)
        for block in chinese_blocks:
            if len(block) <= 10:
                tokens.append(block)

            if len(block) >= 5:
                tokens.extend(block[i:i + 5] for i in range(0, max(len(block) - 5 + 1, 0)))

            for n in (2, 3, 4):
                for i in range(0, max(len(block) - n + 1, 0)):
                    tokens.append(block[i:i + n])

        tokens = [t for t in tokens if t and t not in cls.STOPWORDS]
        expanded = cls._expand_synonyms(original, tokens)
        return [t for t in expanded if t and t not in cls.STOPWORDS]

    @classmethod
    def query_is_natural_language(cls, query: str) -> bool:
        text = query or ""
        markers = [
            "适合", "推荐", "想看", "想读", "有没有", "入门", "零基础", "关于", "了解", "怎么", "可以",
            "大学生", "初学", "睡前", "轻松", "治愈", "烧脑", "提升", "表达能力", "类似", "适读", "偏向",
        ]
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
        q_text = (query or "").lower()
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
                rule_boost = float(rule.get("boost", 0.14)) if isinstance(rule, dict) else 0.14
                boost += min(rule_boost, 0.10 + b_hit_count * 0.026)

        return min(boost, 0.45), matched_domains

    @classmethod
    def _difficulty_boost(cls, query: str, book: Book) -> float:
        q = query or ""
        difficulty = book.difficulty or ""
        text = cls._book_lower_text(book)
        boost = 0.0

        if any(x in q for x in ["入门", "零基础", "初学", "大学生", "新手", "基础", "通俗", "简单"]):
            if difficulty in {"入门", "大众"} or any(x in text for x in ["入门", "基础", "导论", "通识", "初学", "大众", "新手"]):
                boost += 0.15

        if any(x in q for x in ["进阶", "深入", "专业", "研究生", "高级", "系统学习", "原理"]):
            if difficulty in {"进阶", "专业"} or any(x in text for x in ["进阶", "深入", "原理", "专业", "系统", "理论"]):
                boost += 0.11

        if any(x in q for x in ["轻松", "睡前", "放松", "不费脑"]):
            if difficulty in {"入门", "大众"} or any(x in text for x in ["轻松", "睡前", "散文", "随笔", "短篇", "治愈", "温暖", "生活"]):
                boost += 0.11

        return min(boost, 0.20)

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
            parts.append("适配阅读难度或使用场景")

        if cls._exact_phrase_boost(query, book) > 0:
            parts.append("书名、作者或标签与你的搜索内容相符")

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
            min_score = 0.11 if cls.query_is_natural_language(query) or len(tokens) >= 8 else 0.08

        rows = [(book, cls.semantic_score(query, book)) for book in books]
        rows = [(book, score) for book, score in rows if score >= min_score]
        rows.sort(key=lambda x: x[1], reverse=True)
        return rows[:limit]
