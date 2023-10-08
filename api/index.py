from flask import Flask
import csv, json, os, datetime
from astropy.time import Time
app = Flask(__name__)

entries = os.scandir('./api/datasets')  #data source locations

data_map = {} #storage for all file data

#parses the discovered files adding them to the data map
for entry in entries:
    if(not entry.is_file() or not entry.name.endswith('.csv')): #only do csv entries
        continue
    
    data = []
    last_valid_year = 0
    last_valid_jd = 0
    
    with open(entry.path, "r") as file:
        csvReader = csv.DictReader(file)

        for row in csvReader:
            modified_row = {}
            for key, value in row.items():  #loop for changing keys to lower case
                new_key = key.lower()
                if(new_key == 'long'):  #finds header of long and changes to lng
                    new_key = 'lng'
                
                if(new_key == 'y'):
                    new_key = 'year'
                elif(new_key == 'day'):
                    new_key = 'jd'
                modified_row[new_key] = value

            if 'date' in modified_row.keys():   #if date exists move on
                continue

            if('year' in modified_row.keys() and 'jd' in modified_row.keys()):
                try:
                    last_valid_year = int(modified_row['year'])
                    last_valid_jd = int(modified_row['jd'])

                    temp_date = Time(last_valid_jd, format='jd').to_datetime()
                    #date = str(last_valid_year)+temp_date.month+temp_date.day
                    print(temp_date)
                except:
                    print('error')
                    pass

            data.append(modified_row)
        
    data_map[entry.name.lower()[:-4]] = data

seismic_data = []

@app.route('/api/seismic ')
def seismic():
    return json.dump({'data' : seismic_data}), 200, {'Content-Type':'application/json'}
