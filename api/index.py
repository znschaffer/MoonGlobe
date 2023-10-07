from flask import Flask
import csv
import json
app = Flask(__name__)

event_catelog = []
event_vladalog = []

def parse_event_catelog():
    file = open("./api/levent.1008weber.csv", "r")
    header = file.read().split(",") #skips the header for the document
    print(header)
    while(True):
        content = file.read()
        if(not content):
            break
        
        content = content.split(",")

def parse_event_vladalog():
    file = open("aapi/lognonne_2003_catalog.csv", "r")
    header = file.read().split(",") #skips the header for the document
    while(True):
        content = file.read()
        if(not content):
            break
        
        
        
        content = content.split(",")[:12]
        
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