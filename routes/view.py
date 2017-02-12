# -*- coding: utf-8 -*-
from flask import Blueprint, render_template, abort, request
from pymongo import MongoClient
import database
from bson import json_util


view_pages = Blueprint('view_pages', __name__, template_folder = 'templates')
conn = database.mongo()
db = MongoClient(conn).baozier


@view_pages.route('/pet/<int:id>')
def petHome(id):
    return render_template('pet.html')


@view_pages.route('/pet/view', methods = ['GET', 'POST'])
def petView():
    if request.method == 'POST':
        id = request.form['id']
        pet = db.pet.find_one({'id': int(id)})
        if not pet:
            abort(404)
        return json_util.dumps(pet)
    else:
        abort(404)


@view_pages.route('/react')
def reactHome():
    return render_template('react.html')


@view_pages.route('/waterfall')
def waterfallHome():
    return render_template('waterfall.html')