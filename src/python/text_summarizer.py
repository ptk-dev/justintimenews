import asyncio
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.edmundson import EdmundsonSummarizer
from simple_websocket import AioClient, ConnectionClosed
from flask import Flask, jsonify, request


def ask(article):
    parser = PlaintextParser.from_string(article, Tokenizer("english"))

    edmundson_summarizer = EdmundsonSummarizer()
    edmundson_summarizer.bonus_words = ["important", "key", "critical"]
    edmundson_summarizer.stigma_words = ["however", "although", "despite"]
    edmundson_summarizer.null_words = ["a", "an", "the"]

    edmundson_summary = edmundson_summarizer(
        parser.document,
        sentences_count=2
    )
    result = ""
    for sentence in edmundson_summary:
        result += str(sentence)+"\n"
    return result


app = Flask(__name__)


@app.route("/ask", methods=['POST'])
def ask():
    data = request.get_json()
    print(data)
    question = data.get('question')
    return jsonify({'answer': ask(question)})


if __name__ == '__main__':
    app.run(debug=True)
