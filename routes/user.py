#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret


user_routes = Blueprint('user_routes', __name__, template_folder = 'templates')
config = secret.mysql()


#Get /user
@user_routes.route('/user/<int:id>')
def userHome(id):
    session['userId'] = 1
    return render_template('user.html')


#Init user page
@user_routes.route('/user/view', methods = ['GET', 'POST'])
def userView():
    if request.method == 'POST':
        current_id = request.form['id']
        #Find user info
        userQuery = 'SELECT * FROM user WHERE user_id = %s'
        #Find all relatives id
        relativeQuery = 'SELECT owner_id, relative_id FROM pet WHERE owner_id = %s OR relative_id = %s'
        #Find all pet of current owner
        petsQuery = (
            'SELECT pet_id, pet_name, pet_gender, pet_win, pet_type, '
            '(ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) AS pet_ability '
            'FROM pet WHERE owner_id = %s OR relative_id = %s'
        )
        #Find relative moments
        momentsQuery = 'SELECT * FROM moment WHERE pet_id in (%s) ORDER BY moment_id DESC LIMIT 0, 20'
        try:
            #get user info
            cnx = mysql.connector.connect(**config)
            userCursor = cnx.cursor(dictionary=True)
            userCursor.execute(userQuery, (current_id, ))
            user = userCursor.fetchone()
            #return result
            if not user:
                return jsonify({'Result': 2})
            #get relative id
            relativeCursor = cnx.cursor()
            relativeCursor.execute(relativeQuery, (current_id, current_id))
            relatives = relativeCursor.fetchall()
            #remove duplicate user_id and current_id
            s = []
            for r in relatives:
                if r != int(current_id):
                    s += r
            relative = list(set(s))
            relative = [x for x in relative if x != None and x != int(current_id)]
            #check relationship for loged in visitor
            if session['userId']:
                relationQuery = 'SELECT * From user_relation WHERE (applicant_id = %s AND receiver_id = %s) OR (applicant_id = %s AND receiver_id = %s) AND friend_statue = %s'
                relationCursor = cnx.cursor()
                relationCursor.execute(relationQuery, (current_id, session['userId'], session['userId'], current_id, 1))
                relation = relationCursor.fetchone()
                relationCursor.close()
                #Already friends
                if relation:
                    relations = 1
                #User himself
                elif int(current_id) == session['userId']:
                    relations = 2
                #Not friend
                else:
                    relations = 0
            #Not login
            else:
                relation = 3
            #Get all pets
            petsCursor = cnx.cursor(dictionary=True)
            petsCursor.execute(petsQuery, (current_id, current_id))
            pets = petsCursor.fetchall()
            #Get all moments
            all_id = [x['pet_id'] for x in pets]
            all_id = list(set(all_id))
            ids = ', '.join(list(map(lambda x: '%s', all_id)))
            momentsQuery = momentsQuery % (ids)
            momentsCursor = cnx.cursor(dictionary=True)
            momentsCursor.execute(momentsQuery, all_id)
            moments = momentsCursor.fetchall()
            result = [user, relative, relations, pets, moments]
            return jsonify(result)
        except mysql.connector.Error as err:
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 1})
        finally:
            userCursor.close()
            relativeCursor.close()
            petsCursor.close()
            momentsCursor.close()
            cnx.close()
    else:
        abort(404)


#Update user_relation table
@user_routes.route('/user/addFriend', methods = ['GET', 'POST'])
def addFriend():
    if request.method == 'POST':
        json = request.json
        receiver_id = json['apply']
        applicant_id = session['userId']
        #Insert new row into user relation table
        friendQuery = 'INSERT INTO user_relation (applicant_id, receiver_id, friend_statue) VALUES (%s, %s, %s)'
        try:
            cnx = mysql.connector.connect(**config)
            friendCursor = cnx.cursor()
            friendCursor.execute(friendQuery, (applicant_id, receiver_id, 0))
            cnx.commit()
            return jsonify({'Result': 0})
        except mysql.connector.Error as err:
            if err.errno == 1062:
                return jsonify({'Result': 2})
            else:
                return jsonify({'Result': 1})
            cnx.rollback()
        finally:
            friendCursor.close()
            cnx.close()
    else:
        abort(404)