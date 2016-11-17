from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return 'Flask is running! Lets start Hacking!'

@app.route('/data')
def names():
    data = {"names": ["Test","Data"]}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
