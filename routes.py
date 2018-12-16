from flask import Flask, flash, render_template, request, url_for, redirect, session, jsonify
from models import db,FoodAtlas
import os
from sklearn.externals import joblib
import numpy as np

from flask_heroku import Heroku

app = Flask(__name__)
app.secret_key = "project-e14-a"

# local postgresql or heroku postgresql
heroku = Heroku(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/final_project'
db.init_app(app)

# index route
@app.route('/')
@app.route('/index')
def index():
    # map_options = [ 'pop15', 'lowi15', 'hhnv15', 'snapspth16', 'ffrpth14', 'snap16', 'fmrktpth16']
    map_options = { 'pop15': 'Population', 'lowi15': 'Low Income & Low Access', 'hhnv15': 'No Car & Low Access', 'ffrpth14': 'Fast Food', 'fmrktpth16': 'Farmer\'s Markets' }
    return render_template('index.html', title="CSCI e14a - Food Access & Health Project", map_options=map_options)

# prediction calculator route
@app.route('/prediction-calculator')
def calculator():

    return render_template('calculator.html', title="Prediction Calculator")

@app.route('/load_data', methods=['GET'])
def load_data():
    food_atlas_json = {'food_atlas': []}
    food_atlas = FoodAtlas.query.all()
    for record in food_atlas:
        food_atlas_info = record.__dict__
        del food_atlas_info['_sa_instance_state']
        food_atlas_json['food_atlas'].append(food_atlas_info)
    return jsonify(food_atlas_json)

@app.route ('/get_counties/<state>', methods=['GET'])
def get_counties(state):
    counties = db.session.query(FoodAtlas).filter_by(state=state)
    counties_json = {'counties': []}
    for record in counties:
        counties_info  = record.__dict__
        del counties_info['_sa_instance_state']
        counties_json['counties'].append(counties_info)
    return jsonify(counties_json)

@app.route('/predict', methods=['POST'])
def make_prediction():
    if request.method=='POST':
        df = []
        selected_state = request.form['selected_state']
        fips = int(request.form['selected_county'])
        input_1 = float(request.form['input_1'])
        input_2 = float(request.form['input_2'])
        input_3 = float(request.form['input_3'])
        df = [input_1,input_2,input_3]
        # prediction = model.predict(np.array(df).reshape(1, -1))
        # predicted_val = str(np.squeeze(prediction.round(2)))
        predicted_val = 100
        map_options = { 'pop15': 'Population', 'lowi15': 'Low Income & Low Access', 'hhnv15': 'No Car & Low Access', 'ffrpth14': 'Fast Food', 'fmrktpth16': 'Farmer\'s Markets' }
        return render_template('index.html', title="CSCI e14a - Food Access & Health Project", map_options=map_options, predicted_val=predicted_val, input_1=input_1, input_2=input_2, input_3=input_3)

@app.route("/data/<path:csv>")
def getCSV(csv):
    csvFile = os.path.join("data/", csv)
    return parseCSV(csvFile)

def parseCSV(fileNm):
  with open(fileNm, 'r') as fr:
    lines = fr.readlines()
  return '\n'.join(lines)

if __name__ == "__main__":
    model = joblib.load('regr.pkl')
    app.run(debug=True)
