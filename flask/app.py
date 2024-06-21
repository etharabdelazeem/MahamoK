import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.sql import func

from config import DevelopmentConfig, ProductionConfig
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

@app.route('/')
def Welcome():
        return ('Welcome to MahamoK!')


@app.route('/homepage')
def homepage():
    return render_template('homepage.html')

# Database configuration
if os.environ.get('FLASK_ENV') == 'production':
    app.config.from_object(ProductionConfig)
else:
    app.config.from_object(DevelopmentConfig)

# Initialize the database
db = SQLAlchemy(app)

if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0', port='5000')
