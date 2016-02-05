__author__ = 'IBM'

from qpylib import qpylib
import os
from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory

from app import app
# set the project root directory as the static folder, you can set others.
#app = Flask(__name__, static_url_path='static')
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
APP_STATIC = os.path.join(APP_ROOT, 'static')

@app.route('/',  methods=['GET'])
def restData():

    qpylib.log("Folder is" + APP_STATIC)
    try:
        return send_from_directory(APP_STATIC, "index.html" )
        #return render_template("index.html")
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise
    #return render_template("index.html")

@app.route('/ConsoleIP')
def getIP():
    try:
        console_ip = qpylib.get_console_address()
        return jsonify(console=console_ip)
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise
    return jsonify(console=console_ip)
