from flask import Flask
import csv, json, os
from astropy.time import Time
app = Flask(__name__)


def jd_to_date(year, jd):
    if year < 0:
        year = 0
    # Create a Time object for the specified JD
    time = Time(jd, format='jd', scale='utc')

    # Set the year component of the Time object
    time = time.to_datetime()
    time = time.replace(year=year)

    # Extract the calendar date in ISO format
    return time.isoformat()

entries = os.scandir('./api/datasets')  #data source locations

data_map = {} #storage for all file data

#parses the discovered files adding them to the data map
for entry in entries:
    if(not entry.is_file() or not entry.name.endswith('.csv')): #only do csv entries
        continue
    
    data = []
    
    with open(entry.path, "r") as file:
        csvReader = csv.DictReader(file)

        for row in csvReader:
            modified_row = {}
            for key, value in row.items():  #loop for changing keys to lower case
                new_key = key.lower()
                if(new_key == 'long'):  #finds header of long and changes to lng
                    new_key = 'lng'
                elif(new_key == 'y'):
                    new_key = 'year'
                elif(new_key == 'day'):
                    new_key = 'jd'
                modified_row[new_key] = value

            if 'date' in modified_row.keys():   #if date exists move on
                continue

            if('year' in modified_row.keys() and 'jd' in modified_row.keys()):
                if(not modified_row['year']):
                    print('aksdjflakdsjf')
                    continue
                date = jd_to_date(int(modified_row['year']), int(modified_row['jd']))

            data.append(modified_row)
        
    data_map[entry.name.lower()[:-4]] = data

seismic_data = []

@app.route('/api/seismic ')
def seismic()
{
    return json.dump({'data' : seismic_data}), 200, {'Content-Type':'application/json'}
}