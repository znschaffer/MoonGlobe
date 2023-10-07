from flask import Flask
import csv
import json
app = Flask(__name__)

levent_catalog = {'data':[]}
_2003_Moonquake_Data = {'data':[]}

def toJson(csvRelativePath, variable):
    with open(csvRelativePath) as file:
        csvReader = csv.DictReader(file)

        for row in csvReader:
            variable['data'].append(row)
        
        



@app.route("/api/levent")
def levent():
    return json.dumps(levent_catalog), 200, {'ContentType':'application/json'} 

@app.route("/api/_2003_Moonquake_Data")
def lognonne():
    return json.dumps(_2003_Moonquake_Data), 200, {'ContentType':'application/json'} 

toJson('api/levent.1008weber.csv', levent_catalog)
toJson('api/_2003_Moonquake_Data.csv', _2003_Moonquake_Data)