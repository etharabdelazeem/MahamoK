import os
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Task
from flask_migrate import Migrate
from config import DevelopmentConfig, ProductionConfig
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mahamok'

# Database configuration
if os.environ.get('FLASK_ENV') == 'production':
    app.config.from_object(ProductionConfig)
else:
    app.config.from_object(DevelopmentConfig)

# For guests
class AnonymousUser(AnonymousUserMixin):
    id = None

# Initialize the database and login manager
db.init_app(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate for database migrations
login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Redirect users to login page if not authenticated
login_manager.login_message_category = 'info'
login_manager.anonymous_user = AnonymousUser  # Set the anonymous user class

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/homepage')
def homepage():
    if current_user.is_authenticated:
        # Load user-specific tasks
        tasks = Task.query.filter_by(user_id=current_user.id).all()
    else:
        # For guest users, maybe load some default tasks or an empty list
        tasks = []
    return render_template('homepage.html', tasks=tasks)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Get form data
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # Hash the password
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        
        # Create a new user
        new_user = User(username=username, email=email, password=hashed_password)
        
        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()
        
        flash('Account created successfully!', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get form data
        email = request.form['email']
        password = request.form['password']
        
        # Query for the user by email
        user = User.query.filter_by(email=email).first()
        
        # Check if the user exists and the password is correct
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('homepage'))
        
        flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html')

@app.route('/guest')
def guest():
    return redirect(url_for('homepage'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('welcome'))

@app.route('/add_task', methods=['POST'])
def add_task():
    # Get form data
    title = request.form['title']
    description = request.form.get('description', '')
    deadline = request.form.get('deadline', None) or None
    priority = request.form.get('priority', '')

    # Check if the user is authenticated
    user_id = current_user.id if current_user.is_authenticated else None

    # Create a new task
    new_task = Task(title=title, description=description, deadline=deadline, priority=priority, user_id=current_user.id)

    # Add the new task to the database
    db.session.add(new_task)
    db.session.commit()

    # Prepare the task data for the JSON response
    task_data = {
        'id': new_task.id,
        'title': new_task.title,
        'description': new_task.description,
        'deadline': new_task.deadline,
        'priority': new_task.priority,
        'completed': new_task.completed
    }

    # Return a JSON response with the new task details
    return jsonify(success=True, task=task_data), 201

@app.route('/complete_task/<int:task_id>')
def complete_task(task_id):
    # Get the task by ID
    task = Task.query.get_or_404(task_id)
    
    # Mark the task as completed
    task.completed = True
    db.session.commit()
    
    return redirect(url_for('homepage'))

@app.route('/delete_task/<int:task_id>')
def delete_task(task_id):
    # Get the task by ID
    task = Task.query.get_or_404(task_id)
    
    # Delete the task from the database
    db.session.delete(task)
    db.session.commit()
    
    return redirect(url_for('homepage'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')

