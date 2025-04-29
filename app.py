from flask import Flask, render_template, request, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

@app.route('/')
def home():
    users = mongo.db.users.find()
    return render_template('index.html', users=users)

@app.route('/add_user', methods=['POST'])
def add_user():
    name = request.form.get('name')
    mongo.db.users.insert_one({'name': name})
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
