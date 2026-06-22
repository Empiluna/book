"""
═══════════════════════════════════════════════════════
【模块二 · 知识图谱】服务层
  负责人: B
  职责:
    1. 知识图谱实体关系构建 (Neo4j)
    2. 多跳路径查询与推理
    3. 路径权重计算
    4. 图谱可视化数据 (管理员)
═══════════════════════════════════════════════════════
"""
from neo4j import Session as Neo4jSession
from typing import Optional
from app.core.database import get_neo4j_session


class GraphService:
    """
    知识图谱服务
    所有图操作通过 Neo4j Cypher 查询完成
    """

    # ── 路径类型默认权重 ──
    PATH_WEIGHTS = {
        "AUTHORED": 1.0,       # 作者关系 - 最高权重
        "TAGGED": 0.8,         # 标签关系
        "SERIES_OF": 0.6,      # 系列关系
        "PUBLISHED": 0.5,      # 出版社关系
        "SIMILAR": 0.7,        # 相似关系
    }

    @staticmethod
    def init_graph_constraints(session: Neo4jSession):
        """
        初始化图谱约束和索引（首次启动时执行）
        """
        constraints = [
            "CREATE CONSTRAINT IF NOT EXISTS FOR (b:Book) REQUIRE b.book_id IS UNIQUE",
            "CREATE CONSTRAINT IF NOT EXISTS FOR (a:Author) REQUIRE a.author_id IS UNIQUE",
            "CREATE CONSTRAINT IF NOT EXISTS FOR (t:Tag) REQUIRE t.tag_id IS UNIQUE",
            "CREATE CONSTRAINT IF NOT EXISTS FOR (p:Publisher) REQUIRE p.publisher_id IS UNIQUE",
            "CREATE CONSTRAINT IF NOT EXISTS FOR (s:Series) REQUIRE s.series_id IS UNIQUE",
        ]
        for cypher in constraints:
            try:
                session.run(cypher)
            except Exception:
                pass  # 约束已存在时忽略

    @staticmethod
    def create_book_entity(session: Neo4jSession, book_id: int, title: str,
                           **properties):
        """创建/更新图书节点"""
        cypher = """
        MERGE (b:Book {book_id: $book_id})
        SET b.title = $title, b += $props
        RETURN b
        """
        return session.run(cypher, book_id=book_id, title=title, props=properties)

    @staticmethod
    def create_relation(session: Neo4jSession,
                        source_type: str, source_id: int,
                        relation: str,
                        target_type: str, target_id: int):
        """创建两个节点间的关系"""
        cypher = f"""
        MATCH (a:{source_type} {{{source_type.lower()}_id: $source_id}})
        MATCH (b:{target_type} {{{target_type.lower()}_id: $target_id}})
        MERGE (a)-[:{relation}]->(b)
        """
        return session.run(cypher, source_id=source_id, target_id=target_id)

    # ═══════════════════════════════════════════════════════
    # 路径查询与推理 (3.2.2)
    # ═══════════════════════════════════════════════════════

    @staticmethod
    def find_paths(
        session: Neo4jSession,
        book_id: int,
        max_hops: int = 3,
        top_k: int = 20,
        path_weights: Optional[dict[str, float]] = None,
    ) -> dict:
        """
        从给定图书出发，沿图谱路径发现候选图书
        这是【接口契约】模块三调用的核心接口

        返回格式:
        {
            "source_book_id": 101,
            "source_book_title": "三体",
            "candidates": [
                {
                    "book_id": 203,
                    "book_title": "流浪地球",
                    "paths": [
                        {
                            "nodes": [...],
                            "relation_chain": ["AUTHORED", "AUTHORED"],
                            "total_weight": 0.9
                        }
                    ],
                    "final_score": 0.85
                }
            ]
        }
        """
        weights = path_weights or GraphService.PATH_WEIGHTS

        # ── 路径1: 同作者 → 其他作品 ──
        query_author_path = """
        MATCH (source:Book {book_id: $book_id})-[:AUTHORED]-(a:Author)-[:AUTHORED]-(candidate:Book)
        WHERE candidate.book_id <> $book_id
        RETURN candidate.book_id AS book_id, candidate.title AS title,
               'author' AS path_type, a.name AS via_name, 1 AS hop_count
        LIMIT $limit
        """

        # ── 路径2: 同标签 → 其他图书 ──
        query_tag_path = """
        MATCH (source:Book {book_id: $book_id})-[:TAGGED]-(t:Tag)-[:TAGGED]-(candidate:Book)
        WHERE candidate.book_id <> $book_id
        WITH candidate, t, count(*) AS shared_tags
        RETURN candidate.book_id AS book_id, candidate.title AS title,
               'tag' AS path_type, t.name AS via_name, 1 AS hop_count, shared_tags
        ORDER BY shared_tags DESC
        LIMIT $limit
        """

        # ── 路径3: 同系列 ──
        query_series_path = """
        MATCH (source:Book {book_id: $book_id})-[:SERIES_OF]-(s:Series)-[:SERIES_OF]-(candidate:Book)
        WHERE candidate.book_id <> $book_id
        RETURN candidate.book_id AS book_id, candidate.title AS title,
               'series' AS path_type, s.name AS via_name, 1 AS hop_count
        LIMIT $limit
        """

        # ── 路径4: 同出版社 ──
        query_publisher_path = """
        MATCH (source:Book {book_id: $book_id})-[:PUBLISHED]-(p:Publisher)-[:PUBLISHED]-(candidate:Book)
        WHERE candidate.book_id <> $book_id
        RETURN candidate.book_id AS book_id, candidate.title AS title,
               'publisher' AS path_type, p.name AS via_name, 1 AS hop_count
        LIMIT $limit
        """

        # ── 路径5: 多跳 - 同作者→同标签 ──
        query_multi_hop = """
        MATCH (source:Book {book_id: $book_id})-[:AUTHORED]-(a:Author)-[:AUTHORED]-(mid:Book)
              -[:TAGGED]-(t:Tag)-[:TAGGED]-(candidate:Book)
        WHERE candidate.book_id <> $book_id AND mid.book_id <> candidate.book_id
        RETURN candidate.book_id AS book_id, candidate.title AS title,
               'author_tag' AS path_type, (a.name + ' → ' + t.name) AS via_name, 2 AS hop_count
        LIMIT $limit
        """

        # 执行查询并汇总
        candidates_map: dict[int, dict] = {}
        source_title = session.run(
            "MATCH (b:Book {book_id: $id}) RETURN b.title", id=book_id
        ).single()

        queries = [
            (query_author_path, weights.get("AUTHORED", 1.0)),
            (query_tag_path, weights.get("TAGGED", 0.8)),
            (query_series_path, weights.get("SERIES_OF", 0.6)),
            (query_publisher_path, weights.get("PUBLISHED", 0.5)),
        ]

        if max_hops >= 2:
            queries.append((query_multi_hop, weights.get("SIMILAR", 0.7)))

        for cypher, weight in queries:
            try:
                results = session.run(cypher, book_id=book_id, limit=top_k)
                for record in results:
                    bid = record["book_id"]
                    if bid not in candidates_map:
                        candidates_map[bid] = {
                            "book_id": bid,
                            "book_title": record["title"],
                            "paths": [],
                            "final_score": 0.0,
                        }
                    path_info = {
                        "path_type": record["path_type"],
                        "via": record["via_name"],
                        "hop_count": record["hop_count"],
                        "weight": weight,
                    }
                    candidates_map[bid]["paths"].append(path_info)
                    candidates_map[bid]["final_score"] += weight
            except Exception:
                # 图谱未初始化时静默跳过
                continue

        # 按得分排序
        candidates = sorted(
            candidates_map.values(),
            key=lambda x: x["final_score"],
            reverse=True,
        )[:top_k]

        return {
            "source_book_id": book_id,
            "source_book_title": source_title["b.title"] if source_title else "",
            "candidates": candidates,
        }

    # ═══════════════════════════════════════════════════════
    # 图谱可视化 (管理员)
    # ═══════════════════════════════════════════════════════

    @staticmethod
    def get_subgraph(session: Neo4jSession, book_id: int, depth: int = 2):
        """获取以某图书为中心的子图（可视化用）"""
        cypher = """
        MATCH path = (b:Book {book_id: $book_id})-[*1..%d]-()
        RETURN path
        LIMIT 100
        """ % depth
        results = session.run(cypher, book_id=book_id)
        nodes = set()
        edges = []
        for record in results:
            # 解析路径中的节点和关系
            path = record["path"]
            for node in path.nodes:
                nodes.add({
                    "id": node.id,
                    "labels": list(node.labels),
                    "properties": dict(node),
                })
            for rel in path.relationships:
                edges.append({
                    "source": rel.start_node.id,
                    "target": rel.end_node.id,
                    "type": rel.type,
                })
        return {"nodes": list(nodes), "edges": edges}

    @staticmethod
    def get_stats(session: Neo4jSession) -> dict:
        """图谱统计信息"""
        cypher = """
        MATCH (b:Book)
        OPTIONAL MATCH (a:Author)
        OPTIONAL MATCH (t:Tag)
        OPTIONAL MATCH ()-[r]-()
        RETURN
          count(DISTINCT b) AS book_count,
          count(DISTINCT a) AS author_count,
          count(DISTINCT t) AS tag_count,
          count(DISTINCT r) AS relation_count
        """
        record = session.run(cypher).single()
        if record:
            return {
                "books": record["book_count"],
                "authors": record["author_count"],
                "tags": record["tag_count"],
                "relations": record["relation_count"],
            }
        return {"books": 0, "authors": 0, "tags": 0, "relations": 0}
