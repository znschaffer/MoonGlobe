from flask import Flask
import json
app = Flask(__name__)

event_catelog = []

def parse_event_catelog():
    file = open("./api/levent.1008weber.csv", "r")
    header = file.read().split(",") #skips the header for the document
    print(header)
    while(True):
        content = file.read()
        if(not content):
            break
        
        content = content.split(",")
        print(content)
        




@app.route("/api/catelog")
def hello_world():

    return json.dumps({'data':event_catelog}), 200, {'ContentType':'application/json'} 

parse_event_catelog()