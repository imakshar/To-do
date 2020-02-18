from flask_restful import Resource
from flask import request,jsonify
from db import db
import datetime
class TaskModel(db.Model):
    __tablename__='tasks'
    # id = db.Column(db.Integer, primary_key=True,default=1)
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(80))
    status = db.Column(db.Integer)
    createdAt = db.Column(db.String(80)) 
    completedAt = db.Column(db.String(80)) 
    
    def __init__(self,task,status,createdAt,completedAt):
       
        self.task = task
        self.status = status
        self.createdAt = createdAt
        self.completedAt = completedAt
    
    def save_to_db(self):    
            db.session.add(self)
            db.session.commit()
         
    def json(self):
        # return {'id':self.id, 'uuid':self.uuid,'firstname':self.firstname,'lastname':self.lastname,'ip':self.ip}
        return {'id':self.id, 'task':self.task,'status':self.status,'createdAt':self.createdAt,'completedAt':self.completedAt}
 
class Task(Resource):
    def post(self):
        try:
            data =request.get_json()
            task= data['task']
            status = data['status']
            createdAt =  data['createdAt']
            completedAt =  data['completedAt']             
            
            user = TaskModel(task,status,createdAt,completedAt)
            user.save_to_db()
            return {"id":user.id}, 201
        except:
            return {"message":"Add task method failed!"},500    
    
    def get(self):
        try:
            return {'task':list(map(lambda x: x.json(), TaskModel.query.all()))}
            # return {'users': [user.json()] for user in TaskModel.query.all()}
        except:
            return {"message":"Can't get the task"},500

    def put(self):
        
        data =request.get_json()
        id = data['id']
        status = data['status']
        completedAt = data['completedAt']
        # task = TaskModel.query.filter_by(id=id).first()
         
        
        task = TaskModel.query.filter_by(id=id).first()
        task.status = status
        task.completedAt = completedAt 
        db.session.commit()
        return {"message":"data updated"}

    def delete(self):
        # get perameters
        id=request.args.get('id')
        task = TaskModel.query.filter_by(id=id).delete()
        db.session.commit()
        return {"message":"deleted"}, 200

