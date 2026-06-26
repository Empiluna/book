from neo4j_db.neo4j_driver import Neo4jDriver
from neo4j_db.recommendation_query import get_weighted_related_books

driver = Neo4jDriver()

def recommend(isbn):

    result = driver.execute_query(
        get_weighted_related_books(),
        {"isbn": isbn}
    )

    return result