import json
from neo4j import GraphDatabase


class Neo4jImporter:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def import_books(self, json_file):
        with open(json_file, "r", encoding="utf-8") as f:
            books = json.load(f)

        with self.driver.session() as session:
            for book in books:
                session.execute_write(self.create_book_graph, book)

    def import_authors(self, json_file):
        with open(json_file, "r", encoding="utf-8") as f:
            authors = json.load(f)

        with self.driver.session() as session:
            for author in authors:
                session.execute_write(self.create_author_graph, author)

    @staticmethod
    def create_author_graph(tx, author):
        tx.run(
            """
            MERGE (a:Author {name: $name})
            SET a.brief_intro = $brief_intro,
                a.gender = $gender,
                a.birth_date = $birth_date,
                a.death_date = $death_date,
                a.birth_place = $birth_place,
                a.imdb_id = $imdb_id,
                a.url = $url
            """,
            name=author["name"],
            brief_intro=author.get("brief_intro", ""),
            gender=author.get("gender", ""),
            birth_date=author.get("birth_date", ""),
            death_date=author.get("death_date", ""),
            birth_place=author.get("birth_place", ""),
            imdb_id=author.get("imdb_id", ""),
            url=author.get("url", "")
        )

    @staticmethod
    def create_book_graph(tx, book):
        tx.run(
            """
            MERGE (b:Book {isbn: $isbn})
            SET b.title = $title,
                b.pages = $pages,
                b.publish_year = $publish_year,
                b.score = $score,
                b.summary = $summary,
                b.votes = $votes,
                b.price = $price
            """,
            isbn=book.get("isbn"),
            title=book.get("title"),
            pages=book.get("pages"),
            publish_year=book.get("publish_year"),
            score=book.get("score"),
            summary=book.get("summary"),
            votes=book.get("votes"),
            price=book.get("price")
        )

        for author in book.get("authors", []):
            tx.run(
                """
                MERGE (a:Author {name: $author})
                MERGE (b:Book {isbn: $isbn})
                MERGE (a)-[:WROTE]->(b)
                """,
                author=author,
                isbn=book.get("isbn")
            )

        publisher = book.get("publisher")
        if publisher:
            tx.run(
                """
                MERGE (p:Publisher {name: $publisher})
                MERGE (b:Book {isbn: $isbn})
                MERGE (p)-[:PUBLISHED]->(b)
                """,
                publisher=publisher,
                isbn=book.get("isbn")
            )

        for tag in book.get("tags", []):
            tx.run(
                """
                MERGE (t:Tag {name: $tag})
                MERGE (b:Book {isbn: $isbn})
                MERGE (t)-[:TAG]->(b)
                """,
                tag=tag,
                isbn=book.get("isbn")
            )

        series = book.get("series")
        if series:
            tx.run(
                """
                MERGE (s:Series {name: $series})
                MERGE (b:Book {isbn: $isbn})
                MERGE (s)-[:SERIES]->(b)
                """,
                series=series,
                isbn=book.get("isbn")
            )


if __name__ == "__main__":
    importer = Neo4jImporter(
        uri="bolt://localhost:7687",
        user="neo4j",
        password="12345678"
    )
    # 先导入作者详细信息（为节点补充属性）
    importer.import_authors("data/Author.json")
    importer.import_books("data/books.json")
    importer.close()