from flask import Flask, render_template, request, redirect, url_for
#from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

@app.route('/')
def Welcome():
        return ('Welcome to MahamoK!')


@app.route('/homepage')
def homepage():
    return render_template('homepage.html')

if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0', port='5000')
