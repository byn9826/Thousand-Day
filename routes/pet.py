#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret


pet_routes = Blueprint('pet_routes', __name__, template_folder = 'templates')
config = secret.mysql()


@pet_routes.route('/pet/<int:id>')
def petHome(id):
    session['userId'] = 1
    return render_template('pet.html')


@pet_routes.route('/pet', methods = ['GET', 'POST'])
def petView():
    if request.method == 'POST':
        current_id = session['userId']
        pet_id = request.form['id']
        try:
            #get pet info
            cnx = mysql.connector.connect(**config)
            petCursor = cnx.cursor(dictionary=True)
            petQuery = 'SELECT * FROM pet WHERE pet_id = %s'
            petCursor.execute(petQuery, (pet_id, ))
            pet = petCursor.fetchone()
            #get owner info
            pet_owner = pet['owner_id']
            pet_relative = pet['relative_id']
            ownerCursor = cnx.cursor(dictionary=True)
            ownerQuery = 'SELECT user_id, user_name, user_aura FROM user WHERE user_id = %s OR user_id = %s'
            ownerCursor.execute(ownerQuery, (pet_owner, pet_relative))
            owner = ownerCursor.fetchall()
            #get watcher info
            watcherCursor = cnx.cursor()
            watcherQuery = 'SELECT user_id FROM pet_watch WHERE pet_id = %s'
            watcherCursor.execute(watcherQuery, (pet_id, ))
            watcherRaw = watcherCursor.fetchall()
            watcher = [x[0] for x in watcherRaw]
            #get companion info
            companion_first = pet['companion_first']
            companion_second = pet['companion_second']
            companionCursor = cnx.cursor(dictionary=True)
            companionQuery = 'SELECT pet_id, pet_nature, (ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) AS pet_ability FROM pet WHERE pet_id = %s OR pet_id = %s'
            companionCursor.execute(companionQuery, (companion_first, companion_second))
            companion = companionCursor.fetchall()
            #get moment info
            momentCursor = cnx.cursor()
            momentQuery = 'SELECT * FROM moment WHERE pet_id = %s'
            momentCursor.execute(momentQuery, (pet_id, ))
            moment = momentCursor.fetchall()
            #return result
            result = [pet, owner, watcher, companion, moment, current_id]
            return jsonify(result)
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            abort(404)
        finally:
            petCursor.close()
            ownerCursor.close()
            watcherCursor.close()
            companionCursor.close()
            momentCursor.close()
            cnx.close()
    else:
        abort(404)


@pet_routes.route('/pet/updateWatch', methods = ['GET', 'POST'])
def updateWatch():
    if request.method == 'POST':
        json = request.json
        pet_id = json['petId']
        user_id = session['userId']
        addWatch = json['addWatch']
        try:
            #update pet_watch
            cnx = mysql.connector.connect(**config)
            watchCursor = cnx.cursor()
            if addWatch:
                watchQuery = 'INSERT INTO pet_watch (pet_id, user_id) VALUES (%s, %s)'
            else:
                watchQuery = 'DELETE FROM pet_watch WHERE pet_id = %s AND user_id = %s'
            watchCursor.execute(watchQuery, (pet_id, user_id))
            cnx.commit()
            return jsonify({'Success': True})
        except mysql.connector.Error as err:
            cnx.rollback()
            print("Something went wrong: {}".format(err))
        finally:
            watchCursor.close()
            cnx.close()
    else:
        abort(404)


@pet_routes.route('/pet/edit/<int:id>')
def editHome(id):
    return render_template('petEdit.html')