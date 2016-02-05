__author__ = 'IBM'

from qpylib import qpylib

from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory

from app import app
# set the project root directory as the static folder, you can set others.
#app = Flask(__name__, static_url_path='')

@app.route('/',  methods=['GET'])
def restData():
    
    try:
        #return redirect(url_for('templates', filename='index.html'))
        #return app.send_static_file('index.html')
        return render_template("index.html")
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise
    return render_template("index.html")

@app.route('/ConsoleIP')
def getIP():
    try:
        console_ip = qpylib.get_console_address()
        return jsonify(console=console_ip)
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise
    return jsonify(console=console_ip)
