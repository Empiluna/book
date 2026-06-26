from flask import Flask
from flask import jsonify

from service.recommendation_service import recommend

app = Flask(__name__)

@app.route("/recommend/<isbn>")
def get_recommend(isbn):

    books = recommend(isbn)

    return jsonify(books)

if __name__ == "__main__":
    app.run(debug=True)