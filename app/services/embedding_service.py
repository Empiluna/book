from __future__ import annotations

import hashlib
import math
import re
from collections import Counter
from typing import Iterable

from app.models import Book


class EmbeddingService:
    """Lightweight local semantic vector service.

    It intentionally has no external model dependency so the project can run in classroom/demo
    environments. The implementation uses hashing-vector embeddings over Chinese/English tokens.
    Later it can be replaced by sentence-transformers, FAISS, or an online embedding API without
    changing SearchService's public methods.
    """

    VECTOR_DIM = 256

    # Domain expansion makes natural language queries such as “适合大学生入门人工智能的书”
    # match books tagged with AI, Python, machine learning, deep learning, etc.
    SYNONYMS: dict[str, list[str]] = {
        "人工智能": ["ai", "机器学习", "深度学习", "神经网络", "算法", "数据挖掘", "python"],
        "AI": ["人工智能", "机器学习", "深度学习", "神经网络"],
        "入门": ["基础", "初学", "零基础", "导论", "实践", "通识"],
        "大学生": ["学生", "教材", "基础", "入门", "通识"],
        "编程": ["程序设计", "python", "代码", "开发"],
        "科幻": ["未来", "宇宙", "三体", "幻想"],
        "历史": ["中国史", "世界史", "文明", "人物", "传记"],
        "心理": ["心理学", "认知", "情绪", "行为"],
    }

    @classmethod
    def book_text(cls, book: Book) -> str:
        fields: list[str] = [
            book.title or "",
            book.subtitle or "",
            book.category or "",
            book.difficulty or "",
            book.description or "",
            book.publisher.name if book.publisher else "",
            book.series.name if book.series else "",
        ]
        fields.extend(a.name for a in book.authors)
        fields.extend(t.name for t in book.tags)
        return " ".join(x for x in fields if x)

    @classmethod
    def tokenize(cls, text: str) -> list[str]:
        text = (text or "").lower()
        tokens: list[str] = []
        # English / number words.
        tokens.extend(re.findall(r"[a-z0-9]{2,}", text))
        # Chinese terms: keep 2-4 gram fragments to approximate semantic overlap without jieba.
        chinese_blocks = re.findall(r"[\u4e00-\u9fa5]+", text)
        for block in chinese_blocks:
            if len(block) <= 4:
                tokens.append(block)
            for n in (2, 3, 4):
                for i in range(0, max(len(block) - n + 1, 0)):
                    tokens.append(block[i:i + n])
        # Domain synonym expansion.
        expanded = list(tokens)
        raw = text.upper()
        for key, values in cls.SYNONYMS.items():
            if key.lower() in text or key.upper() in raw:
                expanded.extend(v.lower() for v in values)
        return expanded

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
            vec[idx] += sign * (1.0 + math.log(count))
        norm = math.sqrt(sum(v * v for v in vec)) or 1.0
        return [v / norm for v in vec]

    @staticmethod
    def cosine(a: Iterable[float], b: Iterable[float]) -> float:
        value = sum(x * y for x, y in zip(a, b))
        return max(0.0, min(1.0, value))

    @classmethod
    def semantic_score(cls, query: str, book: Book) -> float:
        q_vec = cls.vectorize(query)
        b_vec = cls.vectorize(cls.book_text(book))
        score = cls.cosine(q_vec, b_vec)
        q_text = query.lower()
        # Small rule-based boosts for important intent words.
        if "入门" in query and (book.difficulty in {"入门", "大众"} or "入门" in (book.title or "")):
            score += 0.12
        if "大学生" in query and book.difficulty in {"入门", "大众"}:
            score += 0.06
        if "人工智能" in query or "ai" in q_text:
            tags = {t.name.lower() for t in book.tags}
            text = cls.book_text(book).lower()
            if {"人工智能", "机器学习", "深度学习", "python", "算法"} & tags or "人工智能" in text or "机器学习" in text:
                score += 0.18
        return round(min(score, 1.0), 4)

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
            min_score = 0.20 if len(tokens) >= 8 else 0.10

        rows = [(book, cls.semantic_score(query, book)) for book in books]
        rows = [(book, score) for book, score in rows if score >= min_score]
        rows.sort(key=lambda x: x[1], reverse=True)
        return rows[:limit]
