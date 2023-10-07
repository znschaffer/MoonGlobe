from flask import Flask
import csv
import json
app = Flask(__name__)

event_catelog = []

def toJson(csvRelativePath):
    data = {'data': []}

    with open(csvRelativePath) as file:
        csvReader = csv.DictReader(file)

        for row in csvReader:
            data.data.append(json.dumps(row))
    return data
        
        



@app.route("/api/catelog")
def hello_world():

    return json.dumps(toJson('./api/levent.1008weber.csv')), 200, {'ContentType':'application/json'} 

parse_event_catelog()