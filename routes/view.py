# -*- coding: utf-8 -*-
from flask import Blueprint, render_template, abort, request, jsonify
from pymongo import MongoClient
import mysql.connector
import database
from bson import json_util


view_pages = Blueprint('view_pages', __name__, template_folder = 'templates')
conn = database.mongo()
config = database.mysql()
db = MongoClient(conn).baozier


@view_pages.route('/explore')
def storyHome():
    return render_template('explore.html')


@view_pages.route('/pet/<int:id>')
def petHome(id):
    return render_template('pet.html')


@view_pages.route('/pet/view', methods = ['GET', 'POST'])
def petView():
    if request.method == 'POST':
        #get pet info
        id = request.form['id']
        cnx = mysql.connector.connect(**config)
        petCursor = cnx.cursor(dictionary=True)
        petQuery = 'SELECT * FROM pet WHERE pet_id = %s'
        petCursor.execute(petQuery, (id, ))
        pet = petCursor.fetchone()
        petCursor.close()
        #get owner info
        pet_owner = pet['owner_id']
        pet_relative = pet['relative_id']
        ownerCursor = cnx.cursor(dictionary=True)
        ownerQuery = 'SELECT user_id, user_name, user_aura FROM user WHERE user_id = %s OR user_id = %s'
        ownerCursor.execute(ownerQuery, (pet_owner, pet_relative))
        owner = ownerCursor.fetchall()
        ownerCursor.close()
        #get watcher info
        watcherCursor = cnx.cursor()
        watcherQuery = 'SELECT user_id FROM pet_watch WHERE pet_id = %s'
        watcherCursor.execute(watcherQuery, (id, ))
        watcherRaw = watcherCursor.fetchall()
        watcher = [x[0] for x in watcherRaw]
        watcherCursor.close()
        #get companion info
        companion_first = pet['companion_first']
        companion_second = pet['companion_second']
        companionCursor = cnx.cursor(dictionary=True)
        companionQuery = 'SELECT pet_id, pet_nature, (ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) AS pet_ability FROM pet WHERE pet_id = %s OR pet_id = %s'
        companionCursor.execute(companionQuery, (companion_first, companion_second))
        companion = companionCursor.fetchall()
        companionCursor.close()
        #get moment info
        momentCursor = cnx.cursor()
        momentQuery = 'SELECT * FROM moment WHERE pet_id = %s'
        momentCursor.execute(momentQuery, (id, ))
        moment = momentCursor.fetchall()
        momentCursor.close()
        #return result
        result = [pet, owner, watcher, companion, moment]
        cnx.close()
        return jsonify(result)
    else:
        abort(404)

#@view_pages.route('/pet/view', methods = ['GET', 'POST'])
#def petView():
#    if request.method == 'POST':
#        id = request.form['id']
#        pet = db.pet.find_one({'id': int(id)})
#        if not pet:
#            abort(404)
#        moment = db.moment.find_one({'id': int(id)})
#        if moment:
#            pet['moment'] = moment['moment']
#        return json_util.dumps(pet)
#    else:
#        abort(404)


@view_pages.route('/user/<int:id>')
def userHome(id):
    return render_template('user.html')


@view_pages.route('/user/view', methods = ['GET', 'POST'])
def userView():
    if request.method == 'POST':
        id = request.form['id']
        user = db.user.find_one({'id': int(id)})
        if not user:
            abort(404)
        return json_util.dumps(user)
    else:
        abort(404)


@view_pages.route('/react')
def reactHome():
    return render_template('react.html')