# save_json.py

import json


def save_book(book, file_path):

    with open(
        file_path,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            book,
            f,
            ensure_ascii=False,
            indent=4
        )