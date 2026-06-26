def get_weighted_related_books():
    return """
    MATCH (target:Book {isbn:$isbn})

    CALL {

        WITH target

        MATCH
        (target)<-[:TAG]-(t:Tag)-[:TAG]->(b:Book)

        WHERE target <> b

        RETURN b.isbn AS isbn,
               0.5 AS score

        UNION ALL

        WITH target

        MATCH
        (target)<-[:WROTE]-(a:Author)-[:WROTE]->(b:Book)

        WHERE target <> b

        RETURN b.isbn AS isbn,
               0.2 AS score

        UNION ALL

        WITH target

        MATCH
        (target)<-[:SERIES]-(s:Series)-[:SERIES]->(b:Book)

        WHERE target <> b

        RETURN b.isbn AS isbn,
               0.2 AS score

        UNION ALL

        WITH target

        MATCH
        (p:Publisher)-[:PUBLISHED]->(target)

        MATCH
        (p)-[:PUBLISHED]->(b:Book)

        WHERE target <> b

        RETURN b.isbn AS isbn,
               0.1 AS score
    }

    RETURN
        isbn,
        SUM(score) AS total_score

    ORDER BY total_score DESC
    LIMIT 20
    """