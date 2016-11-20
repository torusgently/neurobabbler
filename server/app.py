from flask import Flask, jsonify, current_app, render_template, request
from flask_cors import CORS, cross_origin

import sys
from flask.ext.cache import Cache

from modules.network_builder import NetworkBuilder

global_variables = {}
builder = None


app = Flask(__name__, static_url_path='/static')
CORS(app)
cache = Cache(app,config={'CACHE_TYPE': 'simple'})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/network', methods=['POST', 'GET'])
def network():
    content = request.get_json()

    builder = cache.get('builder')

    print(content)
    if(builder is None):
        builder = NetworkBuilder("sequential")
        cache.set('builder', builder, timeout=20*60)

    msg = builder.do(content["command"], content["parameters"])
    cache.set('builder', builder)
    try:
        return jsonify(builder.to_dict())
    except Exception as e:
        return jsonify(e)
     

@app.route('/data')
def names():
    data = {"names": ["Test","Data"]}
    return builder.model.to_json()

if __name__ == '__main__':
    app.run(processes=1, debug=True)
