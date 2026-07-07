from __future__ import annotations

import re
from collections import Counter
from typing import Any

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models import Author, Book, GraphRelation, Publisher, SemanticNode, Series, Tag
from app.services.serializers import book_card
from app.utils.tagging import book_tag_names, clean_tag, main_tag

settings = get_settings()

PATH_WEIGHTS = {
    "same_author": 1.0,
    "similar": 0.9,
    "next_read": 0.9,
    "prerequisite": 0.85,
    "same_tag": 0.8,
    "same_audience": 0.75,
    "topic_bridge": 0.72,
    "multi_hop": 0.7,
    "same_field": 0.65,
    "same_keyword": 0.6,
    "same_series": 0.6,
    "same_publisher": 0.5,
    "same_difficulty": 0.35,
}

BASE_LABELS = {"Book", "Author", "Tag", "Publisher", "Series"}
SEMANTIC_LABELS = {"Field", "Audience", "Difficulty", "Keyword", "Topic"}
ALL_LABELS = BASE_LABELS | SEMANTIC_LABELS

PATH_LABELS = {
    "same_author": "同作者",
    "same_tag": "同标签",
    "same_series": "同系列",
    "same_publisher": "同出版社",
    "similar": "相似图书",
    "multi_hop": "多跳语义",
    "same_field": "同领域",
    "same_audience": "同适读人群",
    "same_keyword": "共同关键词",
    "same_difficulty": "同阅读难度",
    "topic_bridge": "主题桥接",
    "next_read": "续读路径",
    "prerequisite": "前置阅读",
}

RELATION_LABELS = {
    "AUTHORED_BY": "作者",
    "TAGGED_AS": "标签",
    "PUBLISHED_BY": "出版社",
    "BELONGS_TO_SERIES": "所属系列",
    "SIMILAR_TO": "相似图书",
    "BELONGS_TO_FIELD": "领域",
    "SUITABLE_FOR": "适读人群",
    "HAS_DIFFICULTY": "阅读难度",
    "HAS_KEYWORD": "关键词",
    "HAS_TOPIC": "主题",
    "NEXT_READ": "续读推荐",
    "PREREQUISITE_OF": "前置阅读",
}

SHARED_SEMANTIC_RELATIONS = [
    ("BELONGS_TO_FIELD", "same_field", "Field"),
    ("SUITABLE_FOR", "same_audience", "Audience"),
    ("HAS_KEYWORD", "same_keyword", "Keyword"),
    ("HAS_TOPIC", "topic_bridge", "Topic"),
    ("HAS_DIFFICULTY", "same_difficulty", "Difficulty"),
]


def _safe_rel_type(value: str) -> str:
    if not re.fullmatch(r"[A-Z_][A-Z0-9_]*", value or ""):
        raise HTTPException(400, "不合法的关系类型")
    return value


_neo4j_unavailable = False  # global cache: don't retry after first failure

class GraphService:
    """Neo4j-first graph service with advanced semantic reasoning and SQL fallback.

    The graph now contains two layers:
    1. Basic bibliographic graph: Book/Author/Tag/Publisher/Series.
    2. Semantic graph: Field/Audience/Difficulty/Keyword/Topic and reading-path relations.

    This preserves the original document requirements while adding higher-level semantic reasoning.
    """

    def __init__(self, db: Session):
        self.db = db
        self._driver = None
        global _neo4j_unavailable
        if _neo4j_unavailable or not settings.NEO4J_URI:
            pass  # skip, already known to be unavailable
        elif settings.NEO4J_URI:
            try:
                from neo4j import GraphDatabase

                self._driver = GraphDatabase.driver(
                    settings.NEO4J_URI,
                    auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD),
                    connection_timeout=3,
                    max_connection_lifetime=30,
                )
                with self._driver.session() as session:
                    session.run("RETURN 1", timeout=3)
            except Exception as exc:
                self._driver = None
                _neo4j_unavailable = True
                if settings.REQUIRE_NEO4J:
                    raise HTTPException(503, f"Neo4j 未连接：{exc}")
        elif settings.REQUIRE_NEO4J:
            raise HTTPException(503, "严格模式要求使用 Neo4j，请设置 NEO4J_URI 并启动 Neo4j 服务")

    @property
    def using_neo4j(self) -> bool:
        return self._driver is not None

    def init_graph_constraints(self) -> dict:
        cyphers = [
            "CREATE CONSTRAINT book_id IF NOT EXISTS FOR (b:Book) REQUIRE b.id IS UNIQUE",
            "CREATE CONSTRAINT author_id IF NOT EXISTS FOR (a:Author) REQUIRE a.id IS UNIQUE",
            "CREATE CONSTRAINT tag_id IF NOT EXISTS FOR (t:Tag) REQUIRE t.id IS UNIQUE",
            "CREATE CONSTRAINT publisher_id IF NOT EXISTS FOR (p:Publisher) REQUIRE p.id IS UNIQUE",
            "CREATE CONSTRAINT series_id IF NOT EXISTS FOR (s:Series) REQUIRE s.id IS UNIQUE",
            "CREATE CONSTRAINT field_id IF NOT EXISTS FOR (n:Field) REQUIRE n.id IS UNIQUE",
            "CREATE CONSTRAINT audience_id IF NOT EXISTS FOR (n:Audience) REQUIRE n.id IS UNIQUE",
            "CREATE CONSTRAINT difficulty_id IF NOT EXISTS FOR (n:Difficulty) REQUIRE n.id IS UNIQUE",
            "CREATE CONSTRAINT keyword_id IF NOT EXISTS FOR (n:Keyword) REQUIRE n.id IS UNIQUE",
            "CREATE CONSTRAINT topic_id IF NOT EXISTS FOR (n:Topic) REQUIRE n.id IS UNIQUE",
        ]
        if self._driver:
            with self._driver.session() as session:
                for c in cyphers:
                    session.run(c)
            return {"message": "Neo4j 约束索引已初始化，包含基础实体和高级语义实体", "backend": "neo4j"}
        return {"message": "当前未连接 Neo4j，已使用 SQL 图谱降级模式", "backend": "sql-fallback"}

    def sync_from_mysql(self) -> dict:
        """Synchronize MySQL entities into SQL fallback graph and Neo4j.

        Advanced semantic nodes are inferred from existing book metadata, tags,
        descriptions and difficulty. This means the project can show a richer
        graph without requiring manual annotation for every demo book.
        """
        books = self.db.query(Book).filter(Book.is_deleted == False).all()  # noqa: E712
        self.db.query(GraphRelation).delete()
        self.db.query(SemanticNode).delete()
        self.db.flush()

        for book in books:
            for author in book.authors:
                self._add_relation("Book", book.id, "AUTHORED_BY", "Author", author.id, 1.0)
            if book.publisher:
                self._add_relation("Book", book.id, "PUBLISHED_BY", "Publisher", book.publisher.id, 0.5)
            if book.series:
                self._add_relation("Book", book.id, "BELONGS_TO_SERIES", "Series", book.series.id, 0.6)
            for tag in book.tags:
                if clean_tag(tag.name):
                    self._add_relation("Book", book.id, "TAGGED_AS", "Tag", tag.id, 0.8)

        self._create_semantic_relations(books)
        self._create_content_similar_relations(books)
        self._create_learning_path_relations(books)
        self.db.commit()

        if self._driver:
            self.init_graph_constraints()
            self._sync_neo4j(books)
            return {
                "message": "MySQL 实体已同步至 Neo4j，并完成高级语义关系构建",
                "backend": "neo4j",
                "books": len(books),
                "semantic_nodes": self.db.query(SemanticNode).count(),
                "relations": self.db.query(GraphRelation).count(),
            }
        return {
            "message": "MySQL 实体已同步至 SQL fallback 图谱，并完成高级语义关系构建",
            "backend": "sql-fallback",
            "books": len(books),
            "semantic_nodes": self.db.query(SemanticNode).count(),
            "relations": self.db.query(GraphRelation).count(),
        }

    def _sync_neo4j(self, books: list[Book]) -> None:
        rel_types = "|".join(sorted({r for r in RELATION_LABELS}))
        with self._driver.session() as session:
            session.run(f"MATCH ()-[r:{rel_types}]->() DELETE r")
            for book in books:
                session.run(
                    "MERGE (b:Book {id:$id}) SET b.title=$title,b.category=$category,b.difficulty=$difficulty,b.isbn=$isbn,b.score=$score",
                    id=book.id,
                    title=book.title,
                    category=main_tag(book) or book.category,
                    difficulty=book.difficulty,
                    isbn=book.isbn,
                    score=book.avg_rating,
                )
                for author in book.authors:
                    session.run("MERGE (a:Author {id:$id}) SET a.name=$name", id=author.id, name=author.name)
                if book.publisher:
                    session.run("MERGE (p:Publisher {id:$id}) SET p.name=$name", id=book.publisher.id, name=book.publisher.name)
                if book.series:
                    session.run("MERGE (s:Series {id:$id}) SET s.name=$name", id=book.series.id, name=book.series.name)
                for tag in book.tags:
                    clean_name = clean_tag(tag.name)
                    if not clean_name:
                        continue
                    session.run("MERGE (t:Tag {id:$id}) SET t.name=$name,t.category=$category", id=tag.id, name=clean_name, category=tag.category)

            for node in self.db.query(SemanticNode).all():
                label = node.node_type if node.node_type in SEMANTIC_LABELS else "Keyword"
                session.run(
                    f"MERGE (n:{label} {{id:$id}}) SET n.name=$name,n.description=$description,n.node_type=$node_type",
                    id=node.id,
                    name=node.name,
                    description=node.description,
                    node_type=node.node_type,
                )

            for rel in self.db.query(GraphRelation).all():
                if rel.source_type not in ALL_LABELS or rel.target_type not in ALL_LABELS:
                    continue
                relation_type = _safe_rel_type(rel.relation_type)
                session.run(
                    f"MATCH (s:{rel.source_type} {{id:$sid}}),(t:{rel.target_type} {{id:$tid}}) "
                    f"MERGE (s)-[r:{relation_type}]->(t) SET r.weight=$weight,r.label=$label",
                    sid=rel.source_id,
                    tid=rel.target_id,
                    weight=rel.weight,
                    label=RELATION_LABELS.get(relation_type, relation_type),
                )

    def _add_relation(self, source_type: str, source_id: int, relation_type: str, target_type: str, target_id: int, weight: float) -> None:
        self.db.add(
            GraphRelation(
                source_type=source_type,
                source_id=source_id,
                relation_type=relation_type,
                target_type=target_type,
                target_id=target_id,
                weight=round(float(weight), 3),
            )
        )

    def _semantic_node(self, node_type: str, name: str, description: str | None = None) -> SemanticNode:
        name = (name or "").strip()
        if not name:
            raise ValueError("semantic node name is empty")
        node = self.db.query(SemanticNode).filter_by(node_type=node_type, name=name).first()
        if node:
            return node
        node = SemanticNode(node_type=node_type, name=name, description=description)
        self.db.add(node)
        self.db.flush()
        return node

    def _create_semantic_relations(self, books: list[Book]) -> None:
        for book in books:
            field = self._field_for_book(book)
            field_node = self._semantic_node("Field", field, "图书所属的学科/内容领域")
            self._add_relation("Book", book.id, "BELONGS_TO_FIELD", "Field", field_node.id, 0.75)

            difficulty = book.difficulty or "大众"
            difficulty_node = self._semantic_node("Difficulty", difficulty, "阅读难度层级")
            self._add_relation("Book", book.id, "HAS_DIFFICULTY", "Difficulty", difficulty_node.id, 0.45)

            for audience in self._audiences_for_book(book):
                node = self._semantic_node("Audience", audience, "由类别、标签和简介推断出的适读人群")
                self._add_relation("Book", book.id, "SUITABLE_FOR", "Audience", node.id, 0.8)

            for topic in self._topics_for_book(book):
                node = self._semantic_node("Topic", topic, "细分主题/上位主题")
                self._add_relation("Book", book.id, "HAS_TOPIC", "Topic", node.id, 0.78)

            for keyword in self._keywords_for_book(book):
                node = self._semantic_node("Keyword", keyword, "内容关键词")
                self._add_relation("Book", book.id, "HAS_KEYWORD", "Keyword", node.id, 0.55)

    def _topics_for_book(self, book: Book) -> list[str]:
        tags = set(book_tag_names(book))
        text = f"{book.title} {book.description or ''} {' '.join(tags)}"
        topics: list[str] = []
        if {"科幻", "宇宙"} & tags or "宇宙" in text:
            topics += ["科幻", "宇宙文明"]
        if "物理" in tags:
            topics.append("科学探索")
        if {"人工智能", "机器学习", "深度学习"} & tags:
            topics += ["人工智能", "机器学习方法"]
        if "Python" in tags:
            topics.append("Python基础")
        if "算法" in tags:
            topics.append("算法思维")
        if {"文明", "历史", "人类"} & tags:
            topics.append("文明演化")
        if {"现实主义", "生命", "家庭"} & tags:
            topics.append("现实主义叙事")
        if {"投资", "商业", "经济", "管理"} & tags:
            topics.append("商业决策")
        if "心理" in tags:
            topics.append("行为心理")
        topics += [t for t in tags if len(t) <= 8]
        return list(dict.fromkeys(topics))[:6]

    def _keywords_for_book(self, book: Book) -> list[str]:
        tags = book_tag_names(book)
        text = f"{book.title} {book.description or ''} {' '.join(tags)}"
        controlled = [
            "宇宙", "文明", "外星文明", "人工智能", "机器学习", "深度学习", "Python", "算法",
            "现实主义", "家庭", "投资", "商业", "心理", "社会学", "用户体验", "设计", "政策", "战争",
        ]
        out = [x for x in controlled if x in text]
        out.extend(tags[:4])
        return list(dict.fromkeys(out))[:8]

    def _field_for_book(self, book: Book) -> str:
        tags = set(book_tag_names(book))
        tag = main_tag(book) or "通识"
        if {"人工智能", "机器学习", "深度学习", "Python", "算法", "编程", "计算机"} & tags:
            return "人工智能与计算机"
        if {"科幻", "硬科幻", "宇宙", "物理", "太空"} & tags:
            return "科幻与未来想象"
        if {"文学", "小说", "名著", "散文", "现实主义", "设计"} & tags:
            return "文学艺术与审美"
        if {"历史", "传记", "人文", "社会", "社科"} & tags:
            return "历史文明与社会科学"
        if {"经济", "金融", "管理", "商业", "投资"} & tags:
            return "经济管理与商业决策"
        if {"心理", "治愈", "情绪", "自我成长"} & tags:
            return "心理行为与社会认知"
        return f"{tag}通识"

    def _audiences_for_book(self, book: Book) -> list[str]:
        tags = set(book_tag_names(book))
        text = f"{book.title} {book.description or ''} {' '.join(tags)}"
        out: list[str] = []
        if {"人工智能", "机器学习", "深度学习", "Python", "算法", "编程", "计算机"} & tags:
            out.append("计算机学习者")
            if "入门" in tags or book.difficulty == "入门" or "入门" in text:
                out.append("零基础入门者")
            if {"人工智能", "机器学习", "深度学习"} & tags:
                out.append("AI入门者")
            if {"编程", "软件工程", "代码质量"} & tags:
                out.append("软件工程实践者")
        if {"科幻", "硬科幻", "宇宙", "物理", "太空"} & tags:
            out += ["科幻爱好者", "想象力阅读者"]
            if {"宇宙", "物理", "战争"} & tags:
                out.append("硬科幻读者")
        if {"文学", "小说", "名著", "散文"} & tags:
            out.append("文学阅读者")
            if "现实主义" in tags:
                out.append("现实主义文学读者")
        if {"历史", "传记", "人文", "社会", "社科"} & tags:
            out.append("通识阅读者")
            if {"文明", "历史", "人类"} & tags:
                out.append("文明研究读者")
        if {"投资", "商业", "经济", "管理", "金融"} & tags:
            out += ["商业与经济读者", "决策管理学习者"]
        if {"心理", "治愈", "情绪", "自我成长"} & tags:
            out.append("心理与行为研究读者")
        return list(dict.fromkeys(out or ["大众读者"]))[:4]

    def _create_content_similar_relations(self, books: list[Book]) -> None:
        semantic_features = self._book_semantic_features()
        for i, a in enumerate(books):
            a_tags = {t.id for t in a.tags}
            a_authors = {x.id for x in a.authors}
            a_sem = semantic_features.get(a.id, set())
            for b in books[i + 1:]:
                b_tags = {t.id for t in b.tags}
                b_authors = {x.id for x in b.authors}
                b_sem = semantic_features.get(b.id, set())
                score = 0.0
                if a.series_id and a.series_id == b.series_id:
                    score += 0.35
                if a.publisher_id and a.publisher_id == b.publisher_id:
                    score += 0.12
                tag_union = a_tags | b_tags
                if tag_union:
                    score += 0.30 * len(a_tags & b_tags) / len(tag_union)
                if a_authors & b_authors:
                    score += 0.30
                sem_union = a_sem | b_sem
                if sem_union:
                    score += 0.28 * len(a_sem & b_sem) / len(sem_union)
                if score >= 0.25:
                    self._add_relation("Book", a.id, "SIMILAR_TO", "Book", b.id, round(score, 3))
                    self._add_relation("Book", b.id, "SIMILAR_TO", "Book", a.id, round(score, 3))

    def _book_semantic_features(self) -> dict[int, set[str]]:
        features: dict[int, set[str]] = {}
        for rel in self.db.query(GraphRelation).filter(GraphRelation.source_type == "Book").all():
            if rel.target_type in SEMANTIC_LABELS:
                features.setdefault(rel.source_id, set()).add(f"{rel.target_type}:{rel.target_id}")
        return features

    def _create_learning_path_relations(self, books: list[Book]) -> None:
        # Series reading order.
        by_series: dict[int, list[Book]] = {}
        for b in books:
            if b.series_id:
                by_series.setdefault(b.series_id, []).append(b)
        for rows in by_series.values():
            rows.sort(key=lambda x: (x.publication_year or 9999, x.id))
            for a, b in zip(rows, rows[1:]):
                self._add_relation("Book", a.id, "NEXT_READ", "Book", b.id, 0.9)

        # Learning path for technical books: introductory books become prerequisites for advanced books.
        tech_books = [b for b in books if self._field_for_book(b) == "人工智能与计算机"]
        intros = [b for b in tech_books if b.difficulty == "入门" or "入门" in book_tag_names(b)]
        advanced = [b for b in tech_books if b not in intros]
        for intro in intros:
            intro_topics = set(self._topics_for_book(intro))
            for adv in advanced:
                if intro.id == adv.id:
                    continue
                overlap = intro_topics & set(self._topics_for_book(adv))
                intro_tag = main_tag(intro)
                adv_tag = main_tag(adv)
                if overlap or (intro_tag and adv_tag and intro_tag == adv_tag):
                    self._add_relation("Book", intro.id, "PREREQUISITE_OF", "Book", adv.id, 0.82)
                    self._add_relation("Book", intro.id, "NEXT_READ", "Book", adv.id, 0.78)

    def create_entity(self, entity_type: str, entity_id: int, properties: dict | None = None) -> dict:
        properties = properties or {}
        if entity_type not in ALL_LABELS:
            raise HTTPException(400, "不支持的实体类型")
        if entity_type in SEMANTIC_LABELS:
            name = properties.get("name") or properties.get("title") or f"{entity_type}-{entity_id}"
            node = self.db.query(SemanticNode).filter_by(node_type=entity_type, name=name).first()
            if not node:
                node = SemanticNode(id=entity_id, node_type=entity_type, name=name, description=properties.get("description"))
                self.db.add(node)
            else:
                node.description = properties.get("description") or node.description
            self.db.commit()
        if self._driver:
            props = {"id": entity_id, **properties}
            with self._driver.session() as session:
                session.run(f"MERGE (n:{entity_type} {{id:$id}}) SET n += $props", id=entity_id, props=props)
            return {"message": "实体已写入 Neo4j", "entity_type": entity_type, "entity_id": entity_id}
        return {"message": "实体已写入 SQL fallback 或由 MySQL 主表维护", "entity_type": entity_type, "entity_id": entity_id}

    def create_relation(self, source_type: str, source_id: int, relation_type: str, target_type: str, target_id: int, weight: float = 1.0) -> dict:
        if source_type not in ALL_LABELS or target_type not in ALL_LABELS:
            raise HTTPException(400, "不支持的实体类型")
        relation_type = _safe_rel_type(relation_type)
        self.db.add(GraphRelation(source_type=source_type, source_id=source_id, relation_type=relation_type, target_type=target_type, target_id=target_id, weight=weight))
        self.db.commit()
        if self._driver:
            with self._driver.session() as session:
                session.run(
                    f"MATCH (s:{source_type} {{id:$sid}}),(t:{target_type} {{id:$tid}}) MERGE (s)-[r:{relation_type}]->(t) SET r.weight=$weight",
                    sid=source_id,
                    tid=target_id,
                    weight=weight,
                )
        return {"message": "关系已创建", "relation_type": relation_type, "backend": "neo4j+sql" if self._driver else "sql-fallback"}

    def find_paths(self, book_id: int, max_hops: int = 2, top_k: int = 20, path_weights: dict[str, float] | None = None) -> dict:
        weights = {**PATH_WEIGHTS, **(path_weights or {})}
        book = self.db.get(Book, book_id)
        if not book or book.is_deleted:
            raise HTTPException(404, "源图书不存在")
        if self._driver:
            try:
                return self._find_paths_neo4j(book_id, max_hops, top_k, weights)
            except Exception:
                if settings.REQUIRE_NEO4J:
                    raise
        return self._find_paths_sql(book, max_hops, top_k, weights)

    def _find_paths_neo4j(self, book_id: int, max_hops: int, top_k: int, weights: dict[str, float]) -> dict:
        queries = [
            ("same_author", "MATCH (s:Book {id:$book_id})-[:AUTHORED_BY]->(a:Author)<-[:AUTHORED_BY]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct a.name) AS via"),
            ("same_tag", "MATCH (s:Book {id:$book_id})-[:TAGGED_AS]->(t:Tag)<-[:TAGGED_AS]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct t.name) AS via"),
            ("same_series", "MATCH (s:Book {id:$book_id})-[:BELONGS_TO_SERIES]->(x:Series)<-[:BELONGS_TO_SERIES]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct x.name) AS via"),
            ("same_publisher", "MATCH (s:Book {id:$book_id})-[:PUBLISHED_BY]->(p:Publisher)<-[:PUBLISHED_BY]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct p.name) AS via"),
            ("same_field", "MATCH (s:Book {id:$book_id})-[:BELONGS_TO_FIELD]->(n:Field)<-[:BELONGS_TO_FIELD]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct n.name) AS via"),
            ("same_audience", "MATCH (s:Book {id:$book_id})-[:SUITABLE_FOR]->(n:Audience)<-[:SUITABLE_FOR]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct n.name) AS via"),
            ("same_keyword", "MATCH (s:Book {id:$book_id})-[:HAS_KEYWORD]->(n:Keyword)<-[:HAS_KEYWORD]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct n.name) AS via"),
            ("topic_bridge", "MATCH (s:Book {id:$book_id})-[:HAS_TOPIC]->(n:Topic)<-[:HAS_TOPIC]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct n.name) AS via"),
            ("same_difficulty", "MATCH (s:Book {id:$book_id})-[:HAS_DIFFICULTY]->(n:Difficulty)<-[:HAS_DIFFICULTY]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, collect(distinct n.name) AS via"),
            ("next_read", "MATCH (s:Book {id:$book_id})-[:NEXT_READ]->(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, ['续读推荐'] AS via"),
            ("prerequisite", "MATCH (s:Book {id:$book_id})-[:PREREQUISITE_OF]->(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, ['前置阅读'] AS via"),
        ]
        if max_hops >= 2:
            queries.append(("multi_hop", "MATCH p=(s:Book {id:$book_id})-[*2..4]-(b:Book) WHERE b.id<>$book_id RETURN b.id AS id, [n IN nodes(p) | coalesce(n.title,n.name)] AS via LIMIT 80"))
        result: dict[int, dict] = {}
        with self._driver.session() as session:
            for path_type, q in queries:
                for row in session.run(q, book_id=book_id):
                    bid = int(row["id"])
                    result.setdefault(bid, {"score": 0.0, "paths": []})
                    via = list(row.get("via") or [])
                    result[bid]["score"] += weights.get(path_type, 0.5)
                    result[bid]["paths"].append({"type": path_type, "label": PATH_LABELS.get(path_type, path_type), "weight": weights.get(path_type, 0.5), "via": via})
        return self._pack_candidates(result, top_k, "neo4j", source_book=self.db.get(Book, book_id))

    def _find_paths_sql(self, source: Book, max_hops: int, top_k: int, weights: dict[str, float]) -> dict:
        result: dict[int, dict] = {}

        def add(candidate: Book, path_type: str, via: list[str], weight: float | None = None) -> None:
            if candidate.id == source.id or candidate.is_deleted:
                return
            w = weight if weight is not None else weights.get(path_type, 0.5)
            result.setdefault(candidate.id, {"score": 0.0, "paths": []})
            result[candidate.id]["score"] += w
            path_label = PATH_LABELS.get(path_type, path_type)
            via_text = "、".join(via) if via else path_label
            result[candidate.id]["paths"].append(
                {
                    "type": path_type,
                    "label": path_label,
                    "weight": round(w, 3),
                    "via": via,
                    "path_text": f"《{source.title}》 → {path_label}：{via_text} → 《{candidate.title}》",
                    "full_path": [
                        {"type": "Book", "label": source.title, "id": source.id},
                        {"type": self._path_middle_type(path_type), "label": f"{path_label}：{via_text}"},
                        {"type": "Book", "label": candidate.title, "id": candidate.id},
                    ],
                }
            )

        for author in source.authors:
            for b in author.books:
                add(b, "same_author", [author.name])
        source_tag_names = set(book_tag_names(source))
        for tag in source.tags:
            clean_name = clean_tag(tag.name)
            if not clean_name or clean_name not in source_tag_names:
                continue
            for b in tag.books:
                if clean_name in book_tag_names(b):
                    add(b, "same_tag", [clean_name])
        if source.series:
            for b in source.series.books:
                add(b, "same_series", [source.series.name])
        if source.publisher:
            for b in source.publisher.books:
                add(b, "same_publisher", [source.publisher.name])

        for relation_type, path_type, target_type in SHARED_SEMANTIC_RELATIONS:
            src_rels = self.db.query(GraphRelation).filter_by(source_type="Book", source_id=source.id, relation_type=relation_type, target_type=target_type).all()
            for src_rel in src_rels:
                via_label = self._entity_label(target_type, src_rel.target_id)
                other_rels = self.db.query(GraphRelation).filter(
                    GraphRelation.source_type == "Book",
                    GraphRelation.source_id != source.id,
                    GraphRelation.relation_type == relation_type,
                    GraphRelation.target_type == target_type,
                    GraphRelation.target_id == src_rel.target_id,
                ).limit(30).all()
                for rel in other_rels:
                    b = self.db.get(Book, rel.source_id)
                    if b:
                        add(b, path_type, [via_label], weights.get(path_type, 0.5) * rel.weight)

        for rel in self.db.query(GraphRelation).filter_by(source_type="Book", source_id=source.id, relation_type="SIMILAR_TO", target_type="Book").all():
            b = self.db.get(Book, rel.target_id)
            if b:
                add(b, "similar", ["内容与语义特征相似"], weights.get("similar", 0.9) * rel.weight)

        for relation_type, path_type in [("NEXT_READ", "next_read"), ("PREREQUISITE_OF", "prerequisite")]:
            for rel in self.db.query(GraphRelation).filter_by(source_type="Book", source_id=source.id, relation_type=relation_type, target_type="Book").all():
                b = self.db.get(Book, rel.target_id)
                if b:
                    add(b, path_type, [RELATION_LABELS.get(relation_type, relation_type)], weights.get(path_type, 0.8) * rel.weight)

        if max_hops >= 2:
            for b in self._semantic_multi_hop_books(source, limit=40):
                add(b, "multi_hop", ["领域/主题/人群复合语义路径"], weights.get("multi_hop", 0.7))

        return self._pack_candidates(result, top_k, "sql-fallback", source_book=source)

    def _semantic_multi_hop_books(self, source: Book, limit: int = 40) -> list[Book]:
        source_nodes = {(r.target_type, r.target_id) for r in self.db.query(GraphRelation).filter(GraphRelation.source_type == "Book", GraphRelation.source_id == source.id, GraphRelation.target_type.in_(list(SEMANTIC_LABELS))).all()}
        if not source_nodes:
            return []
        scores: Counter[int] = Counter()
        for typ, nid in source_nodes:
            rels = self.db.query(GraphRelation).filter(GraphRelation.source_type == "Book", GraphRelation.source_id != source.id, GraphRelation.target_type == typ, GraphRelation.target_id == nid).all()
            for r in rels:
                scores[r.source_id] += 1
        books = []
        for bid, _ in scores.most_common(limit):
            b = self.db.get(Book, bid)
            if b and not b.is_deleted:
                books.append(b)
        return books

    def _path_middle_type(self, path_type: str) -> str:
        return {
            "same_author": "Author",
            "same_tag": "Tag",
            "same_series": "Series",
            "same_publisher": "Publisher",
            "same_field": "Field",
            "same_audience": "Audience",
            "same_keyword": "Keyword",
            "same_difficulty": "Difficulty",
            "topic_bridge": "Topic",
            "similar": "Book",
            "next_read": "Book",
            "prerequisite": "Book",
        }.get(path_type, "Semantic")

    def _pack_candidates(self, result: dict[int, dict], top_k: int, backend: str, source_book: Book | None = None) -> dict:
        items = []
        for bid, data in sorted(result.items(), key=lambda x: x[1]["score"], reverse=True)[:top_k]:
            book = self.db.get(Book, bid)
            if book and not book.is_deleted:
                paths = data["paths"]
                # Neo4j path rows do not have target titles at query time; complete display text here.
                for p in paths:
                    if source_book and not p.get("path_text"):
                        via = "、".join(p.get("via") or []) or p.get("label") or "语义关联"
                        p["path_text"] = f"《{source_book.title}》 → {p.get('label', p.get('type'))}：{via} → 《{book.title}》"
                reason = self.path_reason(paths)
                card = book_card(book, score=data["score"], reason=reason, source="kg", paths=paths)
                card["path_count"] = len(paths)
                card["semantic_score"] = round(data["score"], 4)
                items.append(card)
        return {"backend": backend, "items": items, "total": len(items)}

    @staticmethod
    def path_reason(paths: list[dict]) -> str:
        if not paths:
            return "这本书与你的兴趣图谱相关。"
        priority = ["same_author", "topic_bridge", "same_audience", "same_field", "next_read", "prerequisite", "same_tag", "similar", "same_series", "same_publisher", "multi_hop", "same_keyword", "same_difficulty"]
        best = sorted(paths, key=lambda p: priority.index(p["type"]) if p.get("type") in priority else 99)[0]
        via = "、".join(best.get("via") or [])
        mapping = {
            "same_author": f"因为它与你喜欢的作品同属作者{via}。",
            "same_tag": f"因为它与你关注的标签“{via}”相关。",
            "same_series": f"因为它属于你感兴趣的系列“{via}”。",
            "same_publisher": f"因为它来自你常读的出版社“{via}”。",
            "similar": "因为它与某本高分图书在内容和语义特征上相似。",
            "multi_hop": "因为知识图谱发现了领域、主题和人群之间的多跳语义关联。",
            "same_field": f"因为它和你喜欢的图书同属“{via}”领域。",
            "same_audience": f"因为它同样适合“{via}”。",
            "same_keyword": f"因为它命中了共同关键词“{via}”。",
            "same_difficulty": f"因为它与你偏好的阅读难度“{via}”一致。",
            "topic_bridge": f"因为它与“{via}”主题存在语义桥接。",
            "next_read": "因为它位于当前图书之后的续读路径中。",
            "prerequisite": "因为它符合由入门到进阶的前置阅读路径。",
        }
        return mapping.get(best.get("type"), "这本书与你的兴趣图谱相关。")


    def profile_graph(self, user, mode: str = "profile", book_id: int | None = None, depth: int = 2, limit: int = 24) -> dict:
        """Build a readable graph explanation page.

        User-facing graph page now uses three layouts:
        - profile: profile -> preference/seed -> recommended books;
        - recent/high_rated: multi-seed profile graph, not a single latest book;
        - manual: selected book -> semantic relation -> recommended books.
        It deliberately avoids dumping the whole Neo4j subgraph to prevent overlap.
        """
        mode = mode or "profile"
        if mode == "manual" and book_id:
            return self._book_center_explain_graph(book_id, mode="manual", title="手动选择图书图谱", limit=limit, depth=depth)

        if mode in {"recent", "high_rated"}:
            seed_ids = self._select_seed_ids(user, mode, max_count=5)
            if seed_ids:
                title = "最近阅读图谱" if mode == "recent" else "高分图书图谱"
                center_label = "最近阅读画像" if mode == "recent" else "高分兴趣画像"
                return self._seed_collection_graph(user, seed_ids, mode=mode, title=title, center_label=center_label, limit=limit, depth=depth)

        return self._profile_center_graph(user, limit=limit)

    def _select_seed_ids(self, user, mode: str, max_count: int = 5) -> list[int]:
        """Select multiple seed books for graph reasoning.

        The graph page should not bind high-rated/recent modes to only one center
        book. This method returns several representative seed books so the graph
        can explain a cluster of interests.
        """
        if not user:
            return [b.id for b in self.db.query(Book).filter(Book.is_deleted == False).order_by(Book.hot_score.desc()).limit(max_count).all()]  # noqa: E712
        ids: list[int] = []
        if mode == "high_rated":
            from app.models import UserRating
            rows = self.db.query(UserRating).filter_by(user_id=user.id).order_by(UserRating.rating.desc(), UserRating.updated_at.desc()).limit(max_count * 2).all()
            for r in rows:
                if r.book_id not in ids:
                    ids.append(r.book_id)
                if len(ids) >= max_count:
                    break
        elif mode == "recent":
            histories = sorted([h for h in user.histories if h.book], key=lambda h: h.read_at, reverse=True)
            for h in histories:
                if h.book_id not in ids:
                    ids.append(h.book_id)
                if len(ids) >= max_count:
                    break
        if not ids:
            ids = [b.id for b in self.db.query(Book).filter(Book.is_deleted == False).order_by(Book.hot_score.desc()).limit(max_count).all()]  # noqa: E712
        return ids

    def _seed_collection_graph(self, user, seed_ids: list[int], mode: str, title: str, center_label: str, limit: int = 24, depth: int = 2) -> dict:
        """Build a graph centered on multiple selected seed books.

        Used by recent/high-rated modes. It shows: virtual interest center ->
        several seed books -> semantic relation nodes -> recommended books.
        """
        nodes: dict[str, dict] = {}
        edges: list[dict] = []
        path_cards: list[dict] = []

        def add_node(key: str, label: str, typ: str, size: int = 28, extra: dict | None = None) -> None:
            if key not in nodes:
                data = {"id": key, "label": label, "type": typ, "size": size}
                if extra:
                    data.update(extra)
                nodes[key] = data

        def add_edge(src: str, dst: str, label: str, relation: str, weight: float = 1.0) -> None:
            sig = (src, dst, relation)
            if not any((e["source"], e["target"], e.get("relation")) == sig for e in edges):
                edges.append({"source": src, "target": dst, "label": label, "relation": relation, "weight": round(float(weight), 3)})

        center = f"Profile:{mode}"
        add_node(center, center_label, "Profile", 54)
        merged_candidates: dict[int, dict] = {}
        clean_seed_ids: list[int] = []
        for sid in seed_ids[:5]:
            seed = self.db.get(Book, sid)
            if not seed or seed.is_deleted or sid in clean_seed_ids:
                continue
            clean_seed_ids.append(sid)
            skey = f"SeedBook:{seed.id}"
            add_node(skey, seed.title, "SeedBook", 38, {"book_id": seed.id})
            add_edge(center, skey, "高分种子" if mode == "high_rated" else "最近阅读", "INTEREST_SEED", 1.0)
            try:
                result = self.find_paths(seed.id, max_hops=max(2, depth), top_k=10)
            except Exception:
                result = {"items": []}
            for item in result.get("items", [])[:7]:
                bid = item.get("book_id") or item.get("id")
                if not bid or int(bid) in clean_seed_ids:
                    continue
                merged_candidates.setdefault(int(bid), {"score": 0.0, "paths": []})
                merged_candidates[int(bid)]["score"] += float(item.get("score") or item.get("semantic_score") or 0)
                merged_candidates[int(bid)]["paths"].extend(item.get("paths") or [])

        ranked = sorted(merged_candidates.items(), key=lambda x: x[1]["score"], reverse=True)[:8]
        for bid, data in ranked:
            book = self.db.get(Book, bid)
            if not book or book.is_deleted:
                continue
            bkey = f"RecBook:{book.id}"
            add_node(bkey, book.title, "Book", 32, {"book_id": book.id, "role": "recommended"})
            best_paths = sorted(data.get("paths") or [], key=lambda p: float(p.get("weight") or 0), reverse=True)[:2]
            if not best_paths:
                add_edge(center, bkey, "推荐", "PROFILE_RECOMMEND", 0.6)
                continue
            for path in best_paths:
                source_id = None
                if path.get("full_path"):
                    source_id = path["full_path"][0].get("id")
                seed_key = f"SeedBook:{source_id}" if source_id else center
                middle = path.get("full_path", [None, {}])[1] if path.get("full_path") else {}
                middle_label = middle.get("label") or "语义关系"
                middle_type = middle.get("type") or self._path_middle_type(path.get("type", "multi_hop"))
                if middle_type == "Book":
                    middle_type = "Topic"
                mkey = f"Path:{path.get('type')}:{middle_label}"
                add_node(mkey, str(middle_label).replace("同", "")[:24], middle_type, 28)
                add_edge(seed_key, mkey, path.get("label") or PATH_LABELS.get(path.get("type"), "语义路径"), path.get("type") or "SEMANTIC_PATH", path.get("weight") or 0.7)
                add_edge(mkey, bkey, "推出推荐", "LEADS_TO", path.get("weight") or 0.7)
                path_cards.append({
                    "source": self._entity_label("Book", source_id) if source_id else center_label,
                    "target": book.title,
                    "type": path.get("type"),
                    "label": path.get("label"),
                    "weight": path.get("weight"),
                    "path_text": path.get("path_text") or f"《{self._entity_label('Book', source_id) if source_id else center_label}》 → {middle_label} → 《{book.title}》",
                })
                if len(path_cards) >= 10:
                    break
            if len(path_cards) >= 10:
                break

        data = {
            "nodes": list(nodes.values()),
            "edges": edges,
            "center": center,
            "backend": "neo4j" if self._driver else "sql-fallback",
            "mode": mode,
            "title": title,
            "path_cards": path_cards[:10],
            "semantic_summary": {
                "SeedBook": [self._entity_label("Book", sid) for sid in clean_seed_ids],
            },
            "layout": "layered_profile",
        }
        return self._trim_graph(data, limit)

    def _book_center_explain_graph(self, book_id: int, mode: str = "manual", title: str = "中心图书图谱", limit: int = 20, depth: int = 2) -> dict:
        """Build a three-column explainable graph for one selected book.

        Structure: center book -> semantic relation nodes -> recommended books.
        This replaces the old star-shaped ``subgraph`` view that only showed many
        direct similar-book edges and was hard to read.
        """
        source = self.db.get(Book, book_id)
        if not source or source.is_deleted:
            raise HTTPException(404, "中心图书不存在")

        nodes: dict[str, dict] = {}
        edges: list[dict] = []
        path_cards: list[dict] = []

        def add_node(key: str, label: str, typ: str, size: int = 28, extra: dict | None = None) -> None:
            if key not in nodes:
                data = {"id": key, "label": label, "type": typ, "size": size}
                if extra:
                    data.update(extra)
                nodes[key] = data

        def add_edge(src: str, dst: str, label: str, relation: str, weight: float = 1.0) -> None:
            sig = (src, dst, relation)
            if not any((e["source"], e["target"], e.get("relation")) == sig for e in edges):
                edges.append({"source": src, "target": dst, "label": label, "relation": relation, "weight": round(float(weight), 3)})

        center = f"Book:{source.id}"
        add_node(center, source.title, "Book", 46, {"book_id": source.id, "role": "center"})

        # Use path inference results to construct explanation paths.
        try:
            inferred = self.find_paths(source.id, max_hops=max(2, depth), top_k=max(10, limit))
        except Exception:
            inferred = {"items": [], "backend": "sql-fallback"}

        used_books = 0
        max_books = max(5, min(9, limit // 2))
        for item in inferred.get("items", [])[:max_books]:
            bid = item.get("book_id") or item.get("id")
            if not bid or int(bid) == source.id:
                continue
            book = self.db.get(Book, int(bid))
            if not book or book.is_deleted:
                continue
            bkey = f"RecBook:{book.id}"
            add_node(bkey, book.title, "Book", 30, {"book_id": book.id, "role": "recommended"})
            used_books += 1

            # Prefer richer semantic paths before fallback similar edges.
            paths = sorted(item.get("paths") or [], key=lambda p: float(p.get("weight") or 0), reverse=True)[:2]
            if not paths:
                add_edge(center, bkey, "相似推荐", "SIMILAR_TO", 0.6)
                path_cards.append({"source": source.title, "target": book.title, "type": "similar", "label": "相似推荐", "weight": 0.6, "path_text": f"《{source.title}》 → 相似推荐 → 《{book.title}》"})
                continue

            for path in paths:
                ptype = path.get("type") or "multi_hop"
                via_values = [v for v in (path.get("via") or []) if v]
                if path.get("full_path") and len(path["full_path"]) > 1:
                    mid = path["full_path"][1]
                    middle_label = str(mid.get("label") or "语义关系")
                    middle_type = str(mid.get("type") or self._path_middle_type(ptype))
                else:
                    middle_label = "、".join(via_values[:2]) or PATH_LABELS.get(ptype, "语义关系")
                    middle_type = self._path_middle_type(ptype)
                # Avoid using Book as the middle layer for plain similar/next-read paths; show them as semantic relation nodes.
                if middle_type == "Book":
                    middle_type = "Topic"
                clean_label = middle_label.replace("同作者：", "").replace("同标签：", "").replace("主题桥接：", "").replace("共同关键词：", "")
                mkey = f"Semantic:{ptype}:{clean_label}"
                add_node(mkey, clean_label[:24], middle_type, 26, {"path_type": ptype})
                add_edge(center, mkey, PATH_LABELS.get(ptype, path.get("label") or ptype), ptype, path.get("weight") or 0.7)
                add_edge(mkey, bkey, "推出推荐", "LEADS_TO", path.get("weight") or 0.7)
                path_cards.append({
                    "source": source.title,
                    "target": book.title,
                    "type": ptype,
                    "label": PATH_LABELS.get(ptype, path.get("label") or ptype),
                    "weight": path.get("weight") or 0.7,
                    "path_text": path.get("path_text") or f"《{source.title}》 → {PATH_LABELS.get(ptype, ptype)}：{clean_label} → 《{book.title}》",
                })
                if len(path_cards) >= 10:
                    break
            if len(path_cards) >= 10:
                break

        # If inference has too few candidates, keep a small, clearly labelled fallback.
        if used_books == 0:
            for rel in self.db.query(GraphRelation).filter_by(source_type="Book", source_id=source.id, relation_type="SIMILAR_TO", target_type="Book").limit(6).all():
                book = self.db.get(Book, rel.target_id)
                if not book or book.is_deleted:
                    continue
                bkey = f"RecBook:{book.id}"
                mkey = "Semantic:similar:内容相似"
                add_node(mkey, "内容相似", "Topic", 26)
                add_node(bkey, book.title, "Book", 30, {"book_id": book.id, "role": "recommended"})
                add_edge(center, mkey, "相似图书", "similar", rel.weight or 0.6)
                add_edge(mkey, bkey, "推出推荐", "LEADS_TO", rel.weight or 0.6)
                path_cards.append({"source": source.title, "target": book.title, "type": "similar", "label": "相似图书", "weight": rel.weight or 0.6, "path_text": f"《{source.title}》 → 内容相似 → 《{book.title}》"})

        semantic_summary: dict[str, list[str]] = {
            "Author": [a.name for a in source.authors[:4]],
            "Tag": book_tag_names(source)[:6],
        }
        if source.publisher:
            semantic_summary["Publisher"] = [source.publisher.name]
        if source.series:
            semantic_summary["Series"] = [source.series.name]
        for typ in SEMANTIC_LABELS:
            vals = [self._entity_label(typ, r.target_id) for r in self.db.query(GraphRelation).filter_by(source_type="Book", source_id=source.id, target_type=typ).limit(6).all()]
            vals = [v for v in vals if v and v != f"{typ}:{0}"]
            if vals:
                semantic_summary[typ] = vals

        data = {
            "nodes": list(nodes.values()),
            "edges": edges,
            "center": center,
            "backend": "neo4j" if self._driver else "sql-fallback",
            "mode": mode,
            "title": title,
            "selected_seed": book_card(source),
            "path_cards": path_cards[:10],
            "semantic_summary": semantic_summary,
            "layout": "layered_book",
        }
        return self._trim_graph(data, limit)

    def _select_single_seed(self, user, mode: str) -> Book | None:
        if not user:
            return self.db.query(Book).filter(Book.is_deleted == False).order_by(Book.hot_score.desc()).first()  # noqa: E712
        if mode == "high_rated":
            row = self.db.query(__import__('app.models', fromlist=['UserRating']).UserRating).filter_by(user_id=user.id).order_by(__import__('app.models', fromlist=['UserRating']).UserRating.rating.desc()).first()
            if row:
                return self.db.get(Book, row.book_id)
        hist = sorted([h for h in user.histories if h.book], key=lambda h: h.read_at, reverse=True)
        return hist[0].book if hist else None

    def _profile_center_graph(self, user, limit: int = 24) -> dict:
        """Build a real user-profile graph based on interest clusters.

        Earlier versions displayed raw author/tag/field nodes around "我的阅读画像".
        That made the page look like a database-field expansion and made it too
        similar to the high-rated graph.  The profile view now abstracts raw
        behaviour into interest clusters and only draws:

        我的阅读画像 -> 兴趣簇 -> 推荐图书

        Raw evidence such as tags, authors and seed books is kept in the side
        summary instead of being drawn as many small nodes on the main graph.
        """
        from app.services.user_service import build_user_profile

        nodes: dict[str, dict] = {}
        edges: list[dict] = []
        path_cards: list[dict] = []

        def add_node(key: str, label: str, typ: str, size: int = 28, extra: dict | None = None) -> None:
            if key not in nodes:
                data = {"id": key, "label": label, "type": typ, "size": size}
                if extra:
                    data.update(extra)
                nodes[key] = data

        def add_edge(src: str, dst: str, label: str, relation: str, weight: float = 1.0) -> None:
            sig = (src, dst, relation)
            if not any((e["source"], e["target"], e.get("relation")) == sig for e in edges):
                edges.append({"source": src, "target": dst, "label": label, "relation": relation, "weight": round(float(weight), 3)})

        def book_text(book: Book) -> str:
            parts = [
                book.title or "",
                book.description or "",
                book.difficulty or "",
                " ".join(book_tag_names(book)),
                " ".join(a.name for a in book.authors),
                book.publisher.name if book.publisher else "",
                book.series.name if book.series else "",
            ]
            return " ".join(parts).lower()

        def book_category(book: Book) -> str:
            return main_tag(book) or ""

        def book_tags(book: Book) -> set[str]:
            return set(book_tag_names(book))

        def cluster_book_gate(cluster_key: str, book: Book) -> bool:
            """Decide whether a book is allowed to enter a user-facing interest cluster.

            Keyword matching alone is too loose for demo data.  For example, a
            science-fiction book may contain the word "文明", but it should not
            be pushed into the "历史人文" cluster unless its category/tag really
            indicates history or social science.  These gates make the graph
            explanation closer to a product-level recommendation logic.
            """
            category = book_category(book)
            tags = book_tags(book)
            txt = book_text(book)

            if cluster_key == "science_fiction":
                return (
                    category == "科幻"
                    or bool(tags & {"科幻", "硬科幻", "宇宙", "太空", "外星文明", "机器人"})
                    or any(x in txt for x in ["三体", "银河帝国", "火星", "外星", "太空"])
                )
            if cluster_key == "ai_tech":
                return (
                    category in {"技术", "计算机"}
                    or bool(tags & {"人工智能", "机器学习", "深度学习", "Python", "算法", "编程", "计算机"})
                )
            if cluster_key == "literature_reality":
                return (
                    category in {"文学", "小说", "名著"}
                    or bool(tags & {"文学", "小说", "现实主义", "名著", "外国文学", "中国文学"})
                    or any(x in txt for x in ["余华", "活着", "许三观", "百年孤独", "平凡的世界"])
                )
            if cluster_key == "history_humanity":
                # Do not classify ordinary sci-fi books as history only because
                # they mention words like "文明" or "未来".
                if category == "科幻" and not bool(tags & {"历史", "人类史", "文明史", "社会学", "哲学", "心理"}):
                    return False
                return (
                    category in {"历史", "社科", "哲学", "心理", "社会学"}
                    or bool(tags & {"历史", "人类", "文明史", "社会", "文化", "哲学", "心理", "社会学"})
                    or any(x in txt for x in ["人类简史", "未来简史", "乌合之众", "中国史", "世界史"])
                )
            if cluster_key == "business_mind":
                return (
                    category in {"经济", "管理", "商业"}
                    or bool(tags & {"经济", "商业", "管理", "投资", "营销", "决策"})
                    or any(x in txt for x in ["穷查理", "置身事内", "影响力"])
                )
            return True

        def cluster_hits(cluster: dict, book: Book) -> tuple[list[str], list[str]]:
            """Return strong/all keyword hits after category gating."""
            if not cluster_book_gate(cluster["key"], book):
                return [], []
            txt = book_text(book)
            strong_hits = [kw for kw in cluster.get("strong_keywords", []) if kw.lower() in txt]
            hits = [kw for kw in cluster.get("keywords", []) if kw.lower() in txt]
            return strong_hits, hits

        center = "Profile:me"
        add_node(center, "我的阅读画像", "Profile", 54, {"role": "center"})

        if user:
            profile = build_user_profile(self.db, user)
            recent_ids = []
            for item in profile.get("recent_books") or []:
                bid = item.get("book_id") or item.get("id")
                if bid:
                    recent_ids.append(int(bid))

            interest_ids = [int(x) for x in (profile.get("interest_seed_book_ids") or []) if x]
            high_ids = [int(x) for x in (profile.get("high_rated_book_ids") or []) if x]
            seed_ids = list(dict.fromkeys(recent_ids[:5] + interest_ids[:6] + high_ids[:4]))
            tag_preferences = profile.get("tag_preferences") or []
            favorite_authors = profile.get("favorite_authors") or []
            favorite_categories = profile.get("favorite_categories") or []
        else:
            profile = {}
            seed_ids = [b.id for b in self.db.query(Book).filter(Book.is_deleted == False).order_by(Book.hot_score.desc()).limit(5).all()]  # noqa: E712
            tag_preferences, favorite_authors, favorite_categories = [], [], []

        seed_books = []
        seen_seed: set[int] = set()
        for sid in seed_ids:
            if sid in seen_seed:
                continue
            b = self.db.get(Book, sid)
            if b and not b.is_deleted:
                seed_books.append(b)
                seen_seed.add(sid)
            if len(seed_books) >= 6:
                break
        if not seed_books:
            seed_books = self.db.query(Book).filter(Book.is_deleted == False).order_by(Book.hot_score.desc()).limit(5).all()  # noqa: E712
            seen_seed = {b.id for b in seed_books}

        # Interest-cluster rules.  These are intentionally user-facing concepts,
        # not raw database entity types.
        cluster_defs = [
            {
                "key": "science_fiction",
                "name": "科幻探索",
                "keywords": ["科幻", "硬科幻", "宇宙", "外星", "太空", "火星", "银河", "机器人", "时间", "未来", "三体"],
                "strong_keywords": ["科幻", "硬科幻", "外星", "太空", "银河", "三体", "机器人"],
                "desc": "关注科幻、宇宙探索、未来想象和技术社会主题。",
            },
            {
                "key": "ai_tech",
                "name": "AI技术学习",
                "keywords": ["人工智能", "机器学习", "深度学习", "python", "编程", "算法", "技术", "计算机", "神经网络", "数据", "linux", "mysql"],
                "strong_keywords": ["人工智能", "机器学习", "深度学习", "python", "编程", "算法", "计算机"],
                "desc": "关注编程、算法、人工智能和计算机技术学习路径。",
            },
            {
                "key": "literature_reality",
                "name": "文学现实",
                "keywords": ["文学", "小说", "现实", "现实主义", "余华", "活着", "故事", "家庭", "人生", "许三观"],
                "strong_keywords": ["文学", "小说", "现实主义", "余华", "活着", "许三观"],
                "desc": "关注文学叙事、现实主义、人生处境和社会经验。",
            },
            {
                "key": "history_humanity",
                "name": "历史人文",
                "keywords": ["历史", "人类", "文明史", "社会", "文化", "未来简史", "人类简史", "哲学", "心理", "乌合之众"],
                "strong_keywords": ["历史", "人类简史", "未来简史", "中国史", "世界史", "乌合之众"],
                "desc": "关注历史、人文、社会心理和文明演化。",
            },
            {
                "key": "business_mind",
                "name": "商业思维",
                "keywords": ["经济", "商业", "管理", "投资", "影响力", "穷查理", "置身事内", "营销", "决策", "思维"],
                "strong_keywords": ["经济", "商业", "管理", "投资", "决策"],
                "desc": "关注商业决策、经济社会、管理和思维方式。",
            },
        ]

        pref_words: list[str] = []
        pref_words.extend(str(x.get("name", "")) for x in tag_preferences[:8])
        pref_words.extend(str(x.get("name", "")) for x in favorite_authors[:5])
        pref_words.extend(str(x.get("name", "")) for x in favorite_categories[:5])
        pref_blob = " ".join(pref_words).lower()

        cluster_scores: dict[str, float] = {c["key"]: 0.0 for c in cluster_defs}
        cluster_evidence: dict[str, list[str]] = {c["key"]: [] for c in cluster_defs}
        seed_texts = {b.id: book_text(b) for b in seed_books}
        for c in cluster_defs:
            keys = [k.lower() for k in c["keywords"]]
            strong_keys = [k.lower() for k in c.get("strong_keywords", [])]
            for b in seed_books:
                strong_hits, hits = cluster_hits(c, b)
                strong_hit_count = len(strong_hits)
                weak_hit_count = len(hits)
                if strong_hit_count:
                    cluster_scores[c["key"]] += 1.4 + min(strong_hit_count, 3) * 0.45
                    if b.title not in cluster_evidence[c["key"]]:
                        cluster_evidence[c["key"]].append(b.title)
                elif weak_hit_count >= 2:
                    cluster_scores[c["key"]] += 0.45
                    if b.title not in cluster_evidence[c["key"]]:
                        cluster_evidence[c["key"]].append(b.title)
            pref_strong_hit = sum(1 for k in strong_keys if k in pref_blob)
            pref_weak_hit = sum(1 for k in keys if k in pref_blob)
            if pref_strong_hit:
                cluster_scores[c["key"]] += 0.9 + min(pref_strong_hit, 3) * 0.25
            elif pref_weak_hit >= 2:
                cluster_scores[c["key"]] += 0.35

        active_clusters = [c for c in cluster_defs if cluster_scores[c["key"]] > 0]
        if not active_clusters:
            # With sparse demo data, still show a useful profile graph.
            active_clusters = cluster_defs[:3]
            for c in active_clusters:
                cluster_scores[c["key"]] = 0.6
        active_clusters.sort(key=lambda c: cluster_scores[c["key"]], reverse=True)
        active_clusters = active_clusters[:4]

        all_books = self.db.query(Book).filter(Book.is_deleted == False).order_by(Book.hot_score.desc(), Book.avg_rating.desc()).limit(120).all()  # noqa: E712
        used_rec_ids: set[int] = set()
        cluster_summaries: list[str] = []

        for c in active_clusters:
            ckey = f"Cluster:{c['key']}"
            cscore = cluster_scores[c["key"]]
            evidence = cluster_evidence.get(c["key"], [])[:4]

            recs: list[tuple[float, Book, list[str]]] = []
            for b in all_books:
                if b.id in seen_seed or b.id in used_rec_ids:
                    continue
                strong_hits, hits = cluster_hits(c, b)
                if not hits:
                    continue
                # Require a clear cluster match.  A single generic weak word should
                # not make a book appear under an unrelated interest cluster.
                if not strong_hits and len(hits) < 2:
                    continue
                if c["key"] in {"ai_tech", "business_mind", "science_fiction", "history_humanity"} and not strong_hits:
                    continue

                score = (
                    len(strong_hits) * 2.6
                    + len(hits) * 0.25
                    + float(b.avg_rating or 0) / 10.0
                    + float(b.hot_score or 0) / 150.0
                )
                recs.append((score, b, (strong_hits or hits)[:3]))
            recs.sort(key=lambda x: x[0], reverse=True)

            if not recs:
                # Do not draw an interest-cluster node if it cannot connect to any
                # recommended book.  This keeps the visual graph explainable.
                continue

            add_node(ckey, c["name"], "InterestCluster", 42, {"description": c["desc"], "evidence": evidence})
            add_edge(center, ckey, "兴趣簇", "PROFILE_CLUSTER", max(0.5, min(cscore, 2.0)))

            chosen = recs[:2]
            cluster_rec_titles: list[str] = []
            for score, b, hits in chosen:
                used_rec_ids.add(b.id)
                bkey = f"RecBook:{b.id}"
                add_node(bkey, b.title, "Book", 34, {"book_id": b.id, "role": "recommended"})
                add_edge(ckey, bkey, "画像推荐", "CLUSTER_RECOMMEND", min(score, 2.0))
                hit_text = "、".join(hits) if hits else c["name"]
                path_cards.append({
                    "source": "我的阅读画像",
                    "target": b.title,
                    "type": "profile_cluster",
                    "label": c["name"],
                    "weight": round(min(score, 2.0), 3),
                    "path_text": f"我的阅读画像 → 兴趣簇：{c['name']} → 《{b.title}》",
                    "evidence": f"依据：{('、'.join(evidence) if evidence else hit_text)}；关键词：{hit_text}",
                })
                cluster_rec_titles.append(b.title)

            evidence_text = "、".join(evidence) if evidence else "偏好标签/阅读行为"
            rec_text = "、".join(cluster_rec_titles) if cluster_rec_titles else "暂无"
            cluster_summaries.append(f"{c['name']}：依据 {evidence_text}，推荐 {rec_text}")

        data = {
            "nodes": list(nodes.values()),
            "edges": edges,
            "center": center,
            "backend": "neo4j" if self._driver else "sql-fallback",
            "mode": "profile",
            "title": "我的画像图谱",
            "profile": profile,
            "path_cards": path_cards[:10],
            "semantic_summary": {
                "InterestCluster": cluster_summaries,
                "SeedBook": [b.title for b in seed_books[:5]],
                "Tag": [x["name"] for x in tag_preferences[:8]],
                "Author": [x["name"] for x in favorite_authors[:5]],
                "Field": [x["name"] for x in favorite_categories[:5]],
            },
            "layout": "profile_clusters",
        }
        return self._trim_graph(data, max(limit, 18))

    def _trim_graph(self, data: dict, limit: int = 24) -> dict:
        """Keep graph readable while preserving recommended books.

        Earlier versions trimmed by semantic-node priority, so the user profile
        graph could keep many preference nodes but drop every recommended book.
        This method uses balanced quotas: center/profile node, seed books,
        recommendation books, and the semantic bridge nodes that connect to
        those recommendations are kept first.
        """
        nodes = data.get("nodes") or []
        center = data.get("center")
        if len(nodes) <= limit:
            return data

        by_id = {n.get("id"): n for n in nodes}
        edges = data.get("edges") or []

        kept_ids: set[str] = set()

        def keep(node_id: str | None) -> None:
            if node_id and node_id in by_id:
                kept_ids.add(node_id)

        # 1) Center/profile node must always be visible.
        keep(center)
        for n in nodes:
            if n.get("type") == "Profile" or n.get("role") == "center":
                keep(n.get("id"))

        # 2) Keep representative seed books.
        seed_nodes = [n for n in nodes if n.get("type") == "SeedBook"]
        for n in seed_nodes[:5]:
            keep(n.get("id"))

        # 3) Keep recommended books before ordinary preference nodes.
        rec_nodes = [n for n in nodes if n.get("type") == "Book" and n.get("role") == "recommended"]
        # If there are no explicit role flags, fall back to RecBook id convention.
        if not rec_nodes:
            rec_nodes = [n for n in nodes if str(n.get("id", "")).startswith("RecBook:")]
        rec_quota = 6 if limit >= 20 else max(3, limit // 4)
        for n in rec_nodes[:rec_quota]:
            keep(n.get("id"))

        # 4) Keep bridge nodes on paths that lead to kept recommendations.
        changed = True
        while changed:
            changed = False
            for e in edges:
                src, dst = e.get("source"), e.get("target")
                if dst in kept_ids and src not in kept_ids and len(kept_ids) < limit:
                    keep(src); changed = True
                if src in kept_ids and dst not in kept_ids and len(kept_ids) < limit:
                    # Prefer semantic bridge nodes; do not flood with all books.
                    node = by_id.get(dst)
                    if node and node.get("type") != "Book":
                        keep(dst); changed = True

        # 5) Fill remaining slots with preference/semantic nodes by type priority.
        semantic_priority = {
            "InterestCluster": 0, "Author": 1, "Tag": 1, "Topic": 1, "Field": 1, "Audience": 1,
            "Series": 2, "Publisher": 2, "Difficulty": 2, "Keyword": 2,
            "SeedBook": 3, "Book": 4,
        }
        remaining = [n for n in nodes if n.get("id") not in kept_ids]
        remaining.sort(key=lambda n: (semantic_priority.get(n.get("type"), 9), -int(n.get("size") or 0)))
        for n in remaining:
            if len(kept_ids) >= limit:
                break
            # Avoid ordinary non-recommended books unless there is still room.
            if n.get("type") == "Book" and n.get("role") != "recommended" and len(kept_ids) < limit - 2:
                continue
            keep(n.get("id"))

        kept = [n for n in nodes if n.get("id") in kept_ids]
        kept_set = {n["id"] for n in kept}
        data["nodes"] = kept
        data["edges"] = [e for e in edges if e.get("source") in kept_set and e.get("target") in kept_set]
        data["trimmed"] = True
        data["node_limit"] = limit
        return data

    def semantic_paths(self, book_id: int, top_k: int = 10) -> dict:
        result = self.find_paths(book_id, max_hops=3, top_k=top_k)
        advanced_types = {"same_field", "same_audience", "same_keyword", "same_difficulty", "topic_bridge", "next_read", "prerequisite", "multi_hop"}
        for item in result["items"]:
            item["paths"] = [p for p in item.get("paths", []) if p.get("type") in advanced_types]
        result["items"] = [x for x in result["items"] if x.get("paths")]
        result["total"] = len(result["items"])
        result["mode"] = "advanced_semantic_reasoning"
        return result

    def explain_between(self, source_id: int, target_id: int) -> dict:
        source = self.db.get(Book, source_id)
        target = self.db.get(Book, target_id)
        if not source or not target:
            raise HTTPException(404, "图书不存在")
        paths = self.find_paths(source_id, max_hops=3, top_k=100)["items"]
        selected = next((x for x in paths if x["book_id"] == target_id), None)
        return {
            "source_book": book_card(source),
            "target_book": book_card(target),
            "paths": selected.get("paths", []) if selected else [],
            "reason": selected.get("reason") if selected else "暂未发现显式图谱路径。",
        }

    def subgraph(self, book_id: int, depth: int = 1) -> dict:
        book = self.db.get(Book, book_id)
        if not book:
            raise HTTPException(404, "图书不存在")
        nodes: dict[str, dict] = {}
        edges: list[dict] = []

        def node(key: str, label: str, typ: str, size: int = 30) -> None:
            nodes[key] = {"id": key, "label": label, "type": typ, "size": size}

        def edge(src: str, dst: str, label: str, weight: float = 1.0, relation: str | None = None) -> None:
            edge_key = (src, dst, relation or label)
            if not any((e["source"], e["target"], e.get("relation") or e.get("label")) == edge_key for e in edges):
                edges.append({"source": src, "target": dst, "label": label, "relation": relation or label, "weight": weight})

        center = f"Book:{book.id}"
        node(center, book.title, "Book", 46)

        direct = self.db.query(GraphRelation).filter(GraphRelation.source_type == "Book", GraphRelation.source_id == book.id).all()
        direct += self.db.query(GraphRelation).filter(GraphRelation.target_type == "Book", GraphRelation.target_id == book.id, GraphRelation.relation_type.in_(["NEXT_READ", "PREREQUISITE_OF", "SIMILAR_TO"])).all()

        semantic_targets: list[tuple[str, int]] = []
        for rel in direct:
            if rel.source_type == "Book" and rel.source_id == book.id:
                dst_key = f"{rel.target_type}:{rel.target_id}"
                node(dst_key, self._entity_label(rel.target_type, rel.target_id), rel.target_type, 32 if rel.target_type != "Book" else 34)
                edge(center, dst_key, RELATION_LABELS.get(rel.relation_type, rel.relation_type), rel.weight, rel.relation_type)
                if rel.target_type != "Book":
                    semantic_targets.append((rel.target_type, rel.target_id))
            else:
                src_key = f"{rel.source_type}:{rel.source_id}"
                node(src_key, self._entity_label(rel.source_type, rel.source_id), rel.source_type, 34)
                edge(src_key, center, RELATION_LABELS.get(rel.relation_type, rel.relation_type), rel.weight, rel.relation_type)

        if depth >= 2:
            for typ, nid in semantic_targets[:18]:
                rows = self.db.query(GraphRelation).filter(
                    GraphRelation.source_type == "Book",
                    GraphRelation.source_id != book.id,
                    GraphRelation.target_type == typ,
                    GraphRelation.target_id == nid,
                ).limit(8).all()
                for rel in rows:
                    other = self.db.get(Book, rel.source_id)
                    if other and not other.is_deleted:
                        ok = f"Book:{other.id}"
                        node(ok, other.title, "Book", 31)
                        edge(ok, f"{typ}:{nid}", RELATION_LABELS.get(rel.relation_type, rel.relation_type), rel.weight, rel.relation_type)

        return {
            "nodes": list(nodes.values()),
            "edges": edges,
            "center": center,
            "backend": "neo4j" if self._driver else "sql-fallback",
            "semantic_summary": self.semantic_summary(book_id),
        }

    def semantic_summary(self, book_id: int) -> dict:
        rows = self.db.query(GraphRelation).filter(GraphRelation.source_type == "Book", GraphRelation.source_id == book_id, GraphRelation.target_type.in_(list(SEMANTIC_LABELS))).all()
        grouped: dict[str, list[str]] = {t: [] for t in sorted(SEMANTIC_LABELS)}
        for r in rows:
            grouped.setdefault(r.target_type, []).append(self._entity_label(r.target_type, r.target_id))
        return {k: list(dict.fromkeys(v)) for k, v in grouped.items() if v}

    def _entity_label(self, typ: str, entity_id: int) -> str:
        if typ == "Book":
            row = self.db.get(Book, entity_id)
            return row.title if row else f"Book:{entity_id}"
        if typ == "Author":
            row = self.db.get(Author, entity_id)
            return row.name if row else f"Author:{entity_id}"
        if typ == "Tag":
            row = self.db.get(Tag, entity_id)
            return row.name if row else f"Tag:{entity_id}"
        if typ == "Publisher":
            row = self.db.get(Publisher, entity_id)
            return row.name if row else f"Publisher:{entity_id}"
        if typ == "Series":
            row = self.db.get(Series, entity_id)
            return row.name if row else f"Series:{entity_id}"
        if typ in SEMANTIC_LABELS:
            row = self.db.get(SemanticNode, entity_id)
            return row.name if row else f"{typ}:{entity_id}"
        return f"{typ}:{entity_id}"

    def stats(self) -> dict:
        semantic_counts = dict(Counter(x.node_type for x in self.db.query(SemanticNode).all()))
        return {
            "backend": "neo4j" if self._driver else "sql-fallback",
            "books": self.db.query(Book).filter(Book.is_deleted == False).count(),  # noqa: E712
            "authors": self.db.query(Author).count(),
            "tags": self.db.query(Tag).count(),
            "publishers": self.db.query(Publisher).count(),
            "series": self.db.query(Series).count(),
            "semantic_nodes": self.db.query(SemanticNode).count(),
            "fields": semantic_counts.get("Field", 0),
            "audiences": semantic_counts.get("Audience", 0),
            "difficulties": semantic_counts.get("Difficulty", 0),
            "keywords": semantic_counts.get("Keyword", 0),
            "topics": semantic_counts.get("Topic", 0),
            "relations": self.db.query(GraphRelation).count(),
            "advanced_relations": self.db.query(GraphRelation).filter(GraphRelation.target_type.in_(list(SEMANTIC_LABELS))).count(),
        }

    def query_cypher(self, cypher: str, params: dict | None = None) -> dict:
        if not self._driver:
            return {"backend": "sql-fallback", "message": "未连接Neo4j，无法执行Cypher；请启动docker-compose中的neo4j并配置NEO4J_URI。", "rows": []}
        if any(bad in cypher.lower() for bad in ["delete", "detach", "remove", "drop"]):
            raise HTTPException(400, "演示控制台仅允许只读查询")
        with self._driver.session() as session:
            rows = [dict(r) for r in session.run(cypher, **(params or {}))]
        return {"backend": "neo4j", "rows": rows}
