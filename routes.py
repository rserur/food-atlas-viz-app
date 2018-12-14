# 2018-12-09 @ 05:29:55 PM
from flask import Flask, flash, render_template, request, url_for, redirect, session
import os

from flask_heroku import Heroku

app = Flask(__name__)

# local postgresql or heroku postgresql
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/final_project'

heroku = Heroku(app)

# index route
@app.route('/')
@app.route('/index')
def index():
    map_options = [ 'pop15', 'lowi15', 'hhnv15', 'snapspth16', 'ffrpth14', 'snap16', 'fmrktpth16']
    return render_template('index.html', title="Home", map_options=map_options)

# prediction calculator route
@app.route('/prediction-calculator')
def calculator():

    return render_template('calculator.html', title="Prediction Calculator")

# @app.route('/load_data', methods=['GET'])
# def load_data():
#   # test

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
