import os

from login import session
from headers import HEADERS


class ImageDownloader:

    @staticmethod
    def download(
            image_url,
            isbn
    ):

        if not image_url:
            return None

        if not isbn:
            return None

        os.makedirs(
            "images",
            exist_ok=True
        )

        filename = (
            f"images/{isbn}.jpg"
        )

        try:

            response = session.get(

                image_url,

                headers=HEADERS,

                timeout=20

            )

            if response.status_code != 200:
                return None

            with open(
                    filename,
                    "wb"
            ) as f:

                f.write(
                    response.content
                )

            return filename

        except Exception:

            return None