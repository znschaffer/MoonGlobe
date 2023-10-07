from flask import Flask
import csv
import json
app = Flask(__name__)

levent_catalog = {'data':[]}
lognonne_2003 = {'data':[]}

def toJson(csvRelativePath, variable):
    with open(csvRelativePath) as file:
        csvReader = csv.DictReader(file)

        for row in csvReader:
            variable['data'].append(row)
        
        



@app.route("/api/levent")
def levent():
    return json.dumps(levent_catalog), 200, {'ContentType':'application/json'} 

@app.route("/api/lognonne_2003")
def lognonne():
    return json.dumps(lognonne_2003), 200, {'ContentType':'application/json'} 

toJson('api/levent.1008weber.csv', levent_catalog)
toJson('api/lognonne_2003_catalog.csv', lognonne_2003)