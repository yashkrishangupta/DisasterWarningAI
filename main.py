import os
import sys
import subprocess
import atexit
import signal
from flask import Flask, request, Response
import requests

app = Flask(__name__)
node_process = None
NODE_PORT = 3000

def start_node_server():
    global node_process
    if node_process is not None:
        return node_process
        
    env = os.environ.copy()
    env['NODE_ENV'] = 'development'
    env['PORT'] = str(NODE_PORT)
    
    print(f"Starting Node.js server on port {NODE_PORT}...", flush=True)
    node_process = subprocess.Popen(
        ['node', 'server/index.js'],
        env=env,
        stdout=sys.stdout,
        stderr=sys.stderr
    )
    
    import time
    time.sleep(3)
    
    return node_process

def cleanup():
    global node_process
    if node_process:
        print("Stopping Node.js server...", flush=True)
        node_process.terminate()
        try:
            node_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            node_process.kill()
        node_process = None

atexit.register(cleanup)

def signal_handler(signum, frame):
    cleanup()
    sys.exit(0)

signal.signal(signal.SIGTERM, signal_handler)
signal.signal(signal.SIGINT, signal_handler)

@app.before_request
def ensure_node_running():
    global node_process
    if node_process is None or node_process.poll() is not None:
        start_node_server()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    try:
        url = f'http://localhost:{NODE_PORT}/{path}'
        
        if request.method == 'GET':
            resp = requests.get(url, params=request.args, headers={key: value for key, value in request.headers if key != 'Host'}, stream=True)
        elif request.method == 'POST':
            resp = requests.post(url, data=request.get_data(), headers={key: value for key, value in request.headers if key != 'Host'}, stream=True)
        elif request.method == 'PUT':
            resp = requests.put(url, data=request.get_data(), headers={key: value for key, value in request.headers if key != 'Host'})
        elif request.method == 'DELETE':
            resp = requests.delete(url, headers={key: value for key, value in request.headers if key != 'Host'})
        else:
            resp = requests.request(request.method, url, data=request.get_data(), headers={key: value for key, value in request.headers if key != 'Host'})
        
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for name, value in resp.raw.headers.items() if name.lower() not in excluded_headers]
        
        return Response(resp.content, resp.status_code, headers)
    except requests.exceptions.ConnectionError:
        return Response('Node.js server is starting, please refresh in a moment...', 503)
    except Exception as e:
        return Response(f'Proxy error: {str(e)}', 500)
