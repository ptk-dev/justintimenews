from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.edmundson import EdmundsonSummarizer
from flask import Flask, jsonify, request
import requests


def ask(article, sen):
    parser = PlaintextParser.from_string(article, Tokenizer("english"))

    edmundson_summarizer = EdmundsonSummarizer()
    edmundson_summarizer.bonus_words = ["important", "key", "critical"]
    edmundson_summarizer.stigma_words = ["however", "although", "despite"]
    edmundson_summarizer.null_words = ["a", "an", "the"]

    edmundson_summary = edmundson_summarizer(
        parser.document,
        sentences_count=sen
    )
    result = ""
    for sentence in edmundson_summary:
        result += str(sentence)+"\n"
    return result


app = Flask(__name__)


@app.route("/ask", methods=['POST'])
def ask_page():
    data = request.get_json()
    article = data.get('article')
    return jsonify({'quick_report': ask(article, 1), 'detailed_report': ask(article, 5)})

active=requests.post("http://localhost:3333")

if __name__ == "__main__":
    app.run()