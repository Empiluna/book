from elasticsearch_db.es_client import es

def search_books(keyword):

    body = {
        "query": {
            "multi_match": {
                "query": keyword,
                "fields": [
                    "title^3",
                    "summary"
                ]
            }
        }
    }

    result = es.search(
        index="books",
        body=body,
        size=50
    )

    return result["hits"]["hits"]