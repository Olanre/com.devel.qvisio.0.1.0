__author__ = 'IBM'

from qpylib import qpylib
from app import app
 
@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/loadSystem', methods=['GET'])
def restData():
    try:
        headers = {'content-type' : 'text/plain'}
        arielOptions = qpylib.REST( 'get', '/api/ariel/databases', headers = headers )
        options = {}
        for arielDB in arielOptions.json():
            options[arielDB] = arielDB.capitalize()
            qpylib.log( "Ariel DB " + arielDB )
        return json.dumps({'id':'ArielDBs','title':'Choose an Ariel DB','HTML':render_template('ariel.html', options=options) })
    except Exception as e:
        qpylib.log( "Error "  + str(e) )
        raise