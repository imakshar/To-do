from flask import Flask
from flask_restful import Api
from task import Task
import os
from db import db 

app=Flask(__name__)
app.secret_key='msd'

app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///data.db'
# app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://uPlRJGzDnQ:pl5hFq8Fap@remotemysql.com/uPlRJGzDnQ'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api=Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

db.init_app(app)

api.add_resource(Task,'/task')
if __name__ == '__main__' :
    app.run(port=5000,debug=True)
    # app.run(host='192.168.29.10',port=5000,debug=True)
