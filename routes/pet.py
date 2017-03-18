#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret


pet_routes = Blueprint('pet_routes', __name__, template_folder = 'templates')
config = secret.mysql()


#Get /pet
@pet_routes.route('/pet/<int:id>')
def petHome(id):
    session['userId'] = 1
    return render_template('pet.html')


#Init pet page
@pet_routes.route('/pet/view', methods = ['GET', 'POST'])
def petView():
    if request.method == 'POST':
        current_id = session['userId']
        pet_id = request.form['id']
        #Find pet info
        petQuery = 'SELECT * FROM pet WHERE pet_id = %s'
        #Find pet owners info
        ownerQuery = 'SELECT user_id, user_name, user_aura FROM user WHERE user_id = %s OR user_id = %s'
        #Find all watchers id
        watcherQuery = 'SELECT user_id FROM pet_watch WHERE pet_id = %s'
        #Find all companion info
        companionQuery = 'SELECT pet_id, pet_nature, (ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) AS pet_ability FROM pet WHERE pet_id = %s OR pet_id = %s'
        #Find all moment info
        momentQuery = 'SELECT * FROM moment WHERE pet_id = %s ORDER BY moment_id DESC LIMIT 0, 20'
        try:
            #get pet info
            cnx = mysql.connector.connect(**config)
            petCursor = cnx.cursor(dictionary=True)
            petCursor.execute(petQuery, (pet_id, ))
            pet = petCursor.fetchone()
            #get owner info
            pet_owner = pet['owner_id']
            pet_relative = pet['relative_id']
            ownerCursor = cnx.cursor(dictionary=True)
            ownerCursor.execute(ownerQuery, (pet_owner, pet_relative))
            owner = ownerCursor.fetchall()
            #get watcher info
            watcherCursor = cnx.cursor()
            watcherCursor.execute(watcherQuery, (pet_id, ))
            watcherRaw = watcherCursor.fetchall()
            watcher = [x[0] for x in watcherRaw]
            #get companion info
            companion_first = pet['companion_first']
            companion_second = pet['companion_second']
            companionCursor = cnx.cursor(dictionary=True)
            companionCursor.execute(companionQuery, (companion_first, companion_second))
            companion = companionCursor.fetchall()
            #get moment info
            momentCursor = cnx.cursor()
            momentCursor.execute(momentQuery, (pet_id, ))
            moment = momentCursor.fetchall()
            #return result
            if not pet or not owner:
                return jsonify({'Result': 2})
            result = [pet, owner, watcher, companion, moment, current_id]
            return jsonify(result)
        except mysql.connector.Error as err:
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 1})
        finally:
            petCursor.close()
            ownerCursor.close()
            watcherCursor.close()
            companionCursor.close()
            momentCursor.close()
            cnx.close()
    else:
        abort(404)


#Update watch table
@pet_routes.route('/pet/updateWatch', methods = ['GET', 'POST'])
def updateWatch():
    if request.method == 'POST':
        json = request.json
        pet_id = json['petId']
        addWatch = json['addWatch']
        user_id = session['userId']
        #Check it should be watch or unwatch
        if addWatch:
            watchQuery = 'INSERT INTO pet_watch (pet_id, user_id) VALUES (%s, %s)'
        else:
            watchQuery = 'DELETE FROM pet_watch WHERE pet_id = %s AND user_id = %s'
        try:
            #update pet_watch
            cnx = mysql.connector.connect(**config)
            watchCursor = cnx.cursor()
            watchCursor.execute(watchQuery, (pet_id, user_id))
            cnx.commit()
            return jsonify({'Result': 0})
        except mysql.connector.Error as err:
            cnx.rollback()
            return jsonify({'Result': 1})
            print('Something went wrong: {}'.format(err))
        finally:
            watchCursor.close()
            cnx.close()
    else:
        abort(404)


#Update pet ability for current user
@pet_routes.route('/pet/updateAbility', methods = ['GET', 'POST'])
def updateAbility():
    #Only response to POST request
    if request.method == 'POST':
        #Get new ability, new potential, pet id
        json = request.json
        pet_ability = json['ability']
        pet_potential = json['potential']
        prev_ability = json['prevAbility']
        prev_potential = json['prevPotential']
        pet_id = json['petId']
        user_id = session['userId']
        #Get total number increased for ability
        total = 0
        for key, value in enumerate(pet_ability):
            total += value - prev_ability[key]
        #Check if the increased ability equal to decreased potential
        if (total != (prev_potential - pet_potential)):
            return jsonify({'Result': 2})
        #Update abilities with current pet id and user id in session
        abilityQuery = (
            'Update pet SET '
            'ability_attack = %s, ability_defend = %s, ability_health = %s, '
            'ability_swift = %s, ability_lucky = %s, pet_potential = %s '
            'WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s) '
            'AND ability_attack = %s AND ability_defend = %s AND ability_health = %s '
            'AND ability_swift = %s AND ability_lucky = %s'
        )
        try:
            cnx = mysql.connector.connect(**config)
            abilityCursor = cnx.cursor()
            abilityCursor.execute(abilityQuery, (pet_ability[0], pet_ability[1], pet_ability[2], pet_ability[3], pet_ability[4], pet_potential, pet_id, user_id, user_id, prev_ability[0], prev_ability[1], prev_ability[2], prev_ability[3], prev_ability[4]))
            cnx.commit()
            return jsonify({'Result': 0})
        except mysql.connector.Error as err:
            cnx.rollback()
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 1})
        finally:
            abilityCursor.close()
            cnx.close()
    else:
        abort(404)


#Load more moment
@pet_routes.route('/pet/loadMoment', methods = ['GET', 'POST'])
def loadMoment():
    if request.method == 'POST':
        json = request.json
        pet_id = json['petId']
        showMore = json['showMore']
        #Get the start row number
        startPin = showMore * 20
        momentQuery = 'SELECT * FROM moment WHERE pet_id = %s ORDER BY moment_id DESC LIMIT %s, 20'
        #get moment info
        try:
            cnx = mysql.connector.connect(**config)
            momentCursor = cnx.cursor()
            momentCursor.execute(momentQuery, (pet_id, startPin))
            moment = momentCursor.fetchall()
            if moment:
                return jsonify(moment)
            else:
                return jsonify({'Result': 2})
        except mysql.connector.Error as err:
            cnx.rollback()
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 1})
        finally:
            momentCursor.close()
            cnx.close()
    else:
        abort(404)


#Upload moment
@pet_routes.route('/pet/uploadMoment/<string:message>', methods=['GET', 'POST'])
def uploadMoment(message):
    if request.method == 'POST':
        print(request.files['file'])
        print(message)
        return jsonify({'Result': 1})

    else:
         abort(404)