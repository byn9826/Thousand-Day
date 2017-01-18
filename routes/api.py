# -*- coding: utf-8 -*-
from flask import Blueprint, abort, request
from pymongo import MongoClient
from lib import database
from bson import json_util

api_pages = Blueprint('api_pages', __name__)
conn = database.mongo()
db = MongoClient(conn).baozier

@api_pages.route('/api/value', methods=['GET', 'POST'])
def showvalue():
    if request.method == 'POST':
        id = request.form['id']
        value = db.value.find_one({'id':int(id)})
        if not value:
            abort(404)
        return json_util.dumps(value)
    else:
        abort(404)

@api_pages.route('/api/valuePlans', methods=['GET', 'POST'])
def getplans():
    if request.method == 'POST':
        user = request.form['user']
        plans = db.plan.find({'user':int(user)},{'title': 1, '_id':0})
        titles = []
        for plan in plans:
            titles.append(plan["title"])
        return json_util.dumps(titles)
    else:
        abort(404)

@api_pages.route('/api/plan', methods=['GET', 'POST'])
def showplan():
    if request.method == 'POST':
        id = request.form['id']
        plan = db.plan.find_one({'id':int(id)})
        if not plan:
            abort(404)
        return json_util.dumps(plan)
    else:
        abort(404)

@api_pages.route('/api/planValues', methods=['GET', 'POST'])
def getvalues():
    if request.method == 'POST':
        ids = [int(s) for s in request.form['ids'].split(',')]
        values = db.value.find({'id':{'$in':ids}},{'_id':0, 'title':1, 'days':1, 'type':1, 'author':1, 'stars':1, 'id':1, 'count':1})
        return json_util.dumps(values)
    else:
        abort(404)