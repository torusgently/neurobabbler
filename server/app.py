from flask import Flask, jsonify, current_app, render_template, request
import sys
from flask.ext.cache import Cache

from modules.network_builder import NetworkBuilder

global_variables = {}
builder = None


app = Flask(__name__, static_url_path='/static')
cache = Cache(app,config={'CACHE_TYPE': 'simple'})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/network', methods=['POST', 'GET'])
def network():
    content = request.get_json()

    builder = cache.get('builder')

    if(builder is None):
        builder = NetworkBuilder("sequential")
        cache.set('builder', builder, timeout=20*60)

    msg = builder.do(content["command"], content["parameters"])
    cache.set('builder', builder)

    return jsonify({"msg" : msg})
     

@app.route('/data')
def names():
    data = {"names": ["Test","Data"]}
    return jsonify(data)

if __name__ == '__main__':
    app.run(processes=1, debug=True)
