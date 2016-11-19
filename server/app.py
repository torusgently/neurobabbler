from flask import Flask, jsonify, current_app, render_template

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data')
def names():
    data = {"names": ["Test","Data"]}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
