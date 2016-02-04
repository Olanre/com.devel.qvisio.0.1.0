__author__ = 'IBM'

from qpylib import qpylib

from flask import render_template, jsonify, url_for, redirect

from app import app

 
@app.route('/',  methods=['GET'])
def restData():
    try:
        console_ip = qpylib.get_console_address()
        return redirect(url_for('template', filename='index.html'))
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise
    return render_template("index.html", title = "QRadar All-in-One Visualizer", Errors="Unable to connect to QRadar")

@app.route('/ConsoleIP')
def getIP():
    try:
        console_ip = qpylib.get_console_address()
        return jsonify(console=console_ip)
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise
    return jsonify(console=console_ip)
