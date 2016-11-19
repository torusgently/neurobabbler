from flask import Flask, jsonify, current_app, render_template, request
import sys

from modules.network_builder import NetworkBuilder

global_variables = {}
builder = None

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/network', methods=['POST', 'GET'])
def network():
    content = request.json
    global builder

    if(builder == None):
        builder = NetworkBuilder("sequential")
    builder.add_layer(content.parameters)

    return jsonify({"msg" : "success", "type" : "cool"})
     

@app.route('/data')
def names():
    data = {"names": ["Test","Data"]}
    return jsonify(data)

if __name__ == '__main__':
    app.run(processes=4)
