from flask import Flask, flash, render_template, request, url_for, redirect, session, jsonify
from models import db,FoodAtlas
import os
from sklearn.externals import joblib
import numpy as np
import math

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
    map_options = { 'pop15': 'Population', 'lowi15': 'Low Income & Low Access', 'hhnv15': 'No Car & Low Access', 'ffrpth14': 'Fast Food', 'fmrktpth16': 'Farmer\'s Markets', 'diabetes13': 'Diabetes' }
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
        record_as_dict = record.__dict__
        del record_as_dict['_sa_instance_state']

        # remove any NaN values in the single record
        nullless_record_as_dict = { k: v for k, v in record_as_dict.items() if isinstance(v, str) or not math.isnan(v) }
        # import code; code.interact(local=dict(globals(), **locals()))
        food_atlas_json['food_atlas'].append(nullless_record_as_dict)
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
        model = joblib.load('regr.pkl')
        df = []
        selected_state = request.form['selected_state']
        fips = int(request.form['selected_county'])
        try:
          input_1 = float(request.form['input_1'])
        except ValueError:
          input_1 = 0
        try:
          input_2 = float(request.form['input_2'])
        except ValueError:
          input_2 = 0
        try:
          input_3 = float(request.form['input_3'])
        except ValueError:
          input_3 = 0

        # Set default values for the remaining features for the selected county(fips)
        record = FoodAtlas.query.filter_by(fips=fips).first()
        supercpth14 = record.supercpth14
        pct_fmrkt_sfmnp16 = record.pct_fmrkt_sfmnp16
        ffrpth14 = input_1
        pct_nhwhite10 = record.pct_nhwhite10
        pct_nhpi10 = record.pct_nhpi10
        metro13 = record.metro13
        pct_fmrkt_snap16 = record.pct_fmrkt_snap16
        pct_laccess_lowi15 = record.pct_laccess_lowi15
        convspth14 = record.convspth14
        pct_65older10 = record.pct_65older10
        chipstax_stores14 = record.chipstax_stores14
        pct_fmrkt_frveg16 = record.pct_fmrkt_frveg16
        pct_laccess_snap15 = record.pct_laccess_snap15
        pct_laccess_white15 = record.pct_laccess_white15
        pct_laccess_nhasian15 = record.pct_laccess_nhasian15
        snapspth16 = record.snapspth16
        pct_laccess_hisp15 = record.pct_laccess_hisp15
        pct_laccess_seniors15 = record.pct_laccess_seniors15
        sodatax_stores14 = record.sodatax_stores14
        pct_laccess_pop15 = record.pct_laccess_pop15
        fsrpth14 = record.fsrpth14
        foodhub16 = record.foodhub16
        pct_laccess_multir15 = record.pct_laccess_multir15
        pct_sfsp15 = record.pct_sfsp15
        pct_fmrkt_wic16 = record.pct_fmrkt_wic16
        pct_nhna10 = record.pct_nhna10
        food_tax14 = input_3
        pct_fmrkt_credit16 = record.pct_fmrkt_credit16
        pct_laccess_hhnv15 = record.pct_laccess_hhnv15
        pct_laccess_nhna15 = record.pct_laccess_nhna15
        chipstax_vendm14 = record.chipstax_vendm14
        medhhinc15 = record.medhhinc15
        pct_fmrkt_anmlprod16 = record.pct_fmrkt_anmlprod16
        pct_hspa15 = record.pct_hspa15
        pct_wic15 = record.pct_wic15
        pct_18younger10 = record.pct_18younger10
        pct_fmrkt_otherfood16 = record.pct_fmrkt_otherfood16
        fmrktpth16 = input_2
        pct_fmrkt_wiccash16 = record.pct_fmrkt_wiccash16
        povrate15 = record.povrate15
        pct_fmrkt_baked16 = record.pct_fmrkt_baked16
        pct_snap16 = record.pct_snap16
        pct_nhblack10 = record.pct_nhblack10
        pct_nhasian10 = record.pct_nhasian10
        pct_laccess_black15 = record.pct_laccess_black15
        sodatax_vendm14 = record.sodatax_vendm14
        pct_nslp15 = record.pct_nslp15
        recfacpth14 = record.recfacpth14
        pct_laccess_child15 = record.pct_laccess_child15
        pct_sbp15 = record.pct_sbp15
        pct_hisp10 = record.pct_hisp10
        pct_laccess_nhpi15 = record.pct_laccess_nhpi15
        specspth14 = record.specspth14
        grocpth14 = record.grocpth14

        df = [supercpth14,pct_fmrkt_sfmnp16,ffrpth14,pct_nhwhite10,pct_nhpi10,metro13,pct_fmrkt_snap16,pct_laccess_lowi15,convspth14,pct_65older10,chipstax_stores14,pct_fmrkt_frveg16,pct_laccess_snap15,pct_laccess_white15,pct_laccess_nhasian15,snapspth16,pct_laccess_hisp15,pct_laccess_seniors15,sodatax_stores14,pct_laccess_pop15,fsrpth14,foodhub16,pct_laccess_multir15,pct_sfsp15,pct_fmrkt_wic16,pct_nhna10,food_tax14,pct_fmrkt_credit16,pct_laccess_hhnv15,pct_laccess_nhna15,chipstax_vendm14,medhhinc15,pct_fmrkt_anmlprod16,pct_hspa15,pct_wic15,pct_18younger10,pct_fmrkt_otherfood16,fmrktpth16,pct_fmrkt_wiccash16,povrate15,pct_fmrkt_baked16,pct_snap16,pct_nhblack10,pct_nhasian10,pct_laccess_black15,sodatax_vendm14,pct_nslp15,recfacpth14,pct_laccess_child15,pct_sbp15,pct_hisp10,pct_laccess_nhpi15,specspth14,grocpth14]
        prediction = model.predict(np.array(df).reshape(1, -1))
        predicted_obesity = str(np.squeeze(prediction.round(2)))

        predictions_json = {'predictions': { 'predicted_obesity': predicted_obesity }}

        return jsonify(predictions_json)

@app.route("/data/<path:csv>")
def getCSV(csv):
    csvFile = os.path.join("data/", csv)
    return parseCSV(csvFile)

def parseCSV(fileNm):
  with open(fileNm, 'r') as fr:
    lines = fr.readlines()
  return '\n'.join(lines)

if __name__ == "__main__":

    app.run(debug=True)
