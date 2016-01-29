__author__ = 'IBM'

from qpylib import qpylib

from flask import render_template
from app import app
from utils import utils
 
@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/loadSystem', methods=['GET'])
def restData():
    try:
        console_ip = qpylib.get_console_address()
        return render_template("index.html", title = "QRadar All-in-One Visualizer", console_ip=console_ip)
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise
    return render_template("index.html", title = "QRadar All-in-One Visualizer", error="Unable to connect to QRadar")
    

