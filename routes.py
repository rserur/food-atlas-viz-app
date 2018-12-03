from flask import Flask, flash, render_template, request, url_for, redirect, session

app = Flask(__name__)

# Local db
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/final_project'

# index route
@app.route('/')
@app.route('/index')
def index():

    return render_template('index.html', title="Home")

# prediction calculator route
@app.route('/prediction-calculator')
def calculator():

    return render_template('calculator.html', title="Prediction Calculator")


if __name__ == "__main__":
    app.run(debug=True)
