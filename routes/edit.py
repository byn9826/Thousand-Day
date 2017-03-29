#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
from flask import Blueprint, session, render_template, abort, request, jsonify
from werkzeug.utils import secure_filename
import mysql.connector
import secret


edit_routes = Blueprint('edit_routes', __name__, template_folder = 'templates')
config = secret.mysql()


#Get edit pet
@edit_routes.route('/edit/pet/<int:id>')
def petHome(id):
    if session.get('userId') is None:
        abort(404)
    return render_template('editPet.html')


#Init edit pet
@edit_routes.route('/edit/pet', methods = ['GET', 'POST'])
def petView():
    if request.method == 'POST':
        #only response to logged in user
        if session.get('userId') is None:
            return jsonify({'Result': 0})
        #find if pet exist
        user_id = session['userId']
        pet_id = request.form['id']
        petQuery = (
            'SELECT pet_id, pet_name, companion_first, companion_second, '
            'owner_id, relative_id, location_lon, location_lat, '
            'skillone_name, skilltwo_name, skillthree_name, skillfour_name '
            'FROM pet WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
        )
        try:
            #search for pet
            cnx = mysql.connector.connect(**config)
            petCursor = cnx.cursor(dictionary=True)
            petCursor.execute(petQuery, (pet_id, user_id, user_id))
            pet = petCursor.fetchone()
            #If pet not exist
            if not pet:
                return jsonify({'Result': 1})
            session['petId'] = pet_id
            #another owner's id
            if user_id is pet['owner_id']:
                if pet['relative_id'] is not None:
                    session['otherId'] = pet['relative_id']
                else:
                    session['otherId'] = 0
            elif user_id is pet['relative_id']:
                session['otherId'] = pet['owner_id']
            result = [pet, user_id]
            return jsonify(result)
        except mysql.connector.Error as err:
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 0})
        finally:
            petCursor.close()
            cnx.close()
    else:
        abort(404)


#Allow png for profile
ALLOWED_PROFILE = set(['png'])
def allowed_profile(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_PROFILE


#Update profie picture in PNG format
@edit_routes.route('/edit/pet/updateProfile', methods=['GET', 'POST'])
def petProfile():
    #only response to post request
    if request.method == 'POST':
        #only response to user own this pet
        if session.get('petId') is None:
            return jsonify({'Result': 3})
        #file must exist
        if 'file' not in request.files:
            return jsonify({'Result': 0})
        file = request.files['file']
        #check preset file name
        if file.filename != '0.png':
            return jsonify({'Result': 1})
        #check file format
        if file and allowed_profile(file.filename):
            filename = secure_filename(file.filename)
            fold_path = '../static/img/pet/' + session['petId'] + '/cover/'
            try:
                #save profile image
                file.save( os.path.join(os.path.dirname(os.path.abspath(__file__)), fold_path, filename))
                return jsonify({'Result': 2})
            except Exception as err:
                print('Something went wrong: {}'.format(err))
                return jsonify({'Result': 3})
        else:
            return jsonify({'Result': 1})
    else:
         abort(404)


#Update location
@edit_routes.route('/edit/pet/updateLocation', methods=['GET', 'POST'])
def petLocation():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return jsonify({'Result': 0})
        user_id = session['userId']
        pet_id = session['petId']
        json = request.json
        lon = json['location'][0]
        lat = json['location'][1]
        #update location for current pet
        locationQuery = 'UPDATE pet SET location_lon = %s, location_lat = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
        try:
            cnx = mysql.connector.connect(**config)
            locationCursor = cnx.cursor()
            locationCursor.execute(locationQuery, (lon, lat, pet_id, user_id, user_id))
            cnx.commit()
            return jsonify({'Result': 1})
        except mysql.connector.Error as err:
            cnx.rollback()
            return jsonify({'Result': 0})
        finally:
            locationCursor.close()
            cnx.close()
    else:
        abort(404)


#Update pet name
@edit_routes.route('/edit/pet/updateName', methods=['GET', 'POST'])
def petName():
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return jsonify({'Result': 0})
        user_id = session['userId']
        pet_id = session['petId']
        pet_name = request.form['name']
        #update pet name
        nameQuery = 'UPDATE pet SET pet_name = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
        try:
            cnx = mysql.connector.connect(**config)
            nameCursor = cnx.cursor()
            nameCursor.execute(nameQuery, (pet_name, pet_id, user_id, user_id))
            cnx.commit()
            return jsonify({'Result': 1})
        except mysql.connector.Error as err:
            cnx.rollback()
            return jsonify({'Result': 2})
            print('Something went wrong: {}'.format(err))
        finally:
            nameCursor.close()
            cnx.close()
    else:
        abort(404)


#Remove companions of a pet
@edit_routes.route('/edit/pet/delTeam', methods=['GET', 'POST'])
def delTeam():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return jsonify({'Result': 1})
        user_id = session['userId']
        pet_id = session['petId']
        pet_index = request.form['index']
        #check which one has been removed
        if pet_index == '0':
            teamQuery = 'UPDATE pet SET companion_first = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
        elif pet_index == '1':
            teamQuery = 'UPDATE pet SET companion_second = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
        else:
            return jsonify({'Result': 2})
        try:
            cnx = mysql.connector.connect(**config)
            teamCursor = cnx.cursor()
            teamCursor.execute(teamQuery, (None, pet_id, user_id, user_id))
            cnx.commit()
            return jsonify({'Result': 0})
        except mysql.connector.Error as err:
            cnx.rollback()
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 1})
        finally:
            teamCursor.close()
            cnx.close()
    else:
        abort(404)


#Search all pets for all pet owner and relative's friend
@edit_routes.route('/edit/pet/searchTeam', methods=['GET', 'POST'])
def searchTeam():
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return jsonify({'Result': 0})
        user_id = session['userId']
        pet_id = session['petId']
        other_id = session['otherId']
        relationQuery = (
            'SELECT applicant_id, receiver_id FROM user_relation '
            'WHERE (receiver_id = %s OR receiver_id = %s OR applicant_id = %s OR applicant_id = %s) AND friend_statue = %s'
        )
        friendQuery = (
            'SELECT pet_id, pet_name, pet_nature, '
            '(ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) AS pet_ability '
            'FROM pet WHERE (owner_id IN (%s) OR relative_id IN (%s)) AND pet_id != (%s)'
        )   
        try:
            #Get all friends id
            cnx = mysql.connector.connect(**config)
            relationCursor = cnx.cursor()
            relationCursor.execute(relationQuery, (user_id, other_id, user_id, other_id, 1))
            relation = relationCursor.fetchall()
            if not relation:
                return jsonify({'Result': 2})
            else:
                #Remove duplicate id
                s = []
                for r in relation:
                    s += r
                relations = list(set(s))
                #Search all pets from all friends
                doubleRelation = relations + relations + [int(pet_id)]
                in_relations = ', '.join(list(map(lambda x: '%s', relations)))
                #Get all pets info
                friendQuery = friendQuery % (in_relations, in_relations, '%s')
                friendCursor = cnx.cursor(dictionary=True)
                friendCursor.execute(friendQuery, doubleRelation)
                friend = friendCursor.fetchall()
                if not friend:
                    friendCursor.close()
                    return jsonify({'Result': 2})
                else:
                    friendCursor.close()
                    return jsonify(friend)
        except mysql.connector.Error as err:
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 1})
        finally:
            relationCursor.close()         
            cnx.close()
    else:
        abort(404)


#Update pet team
@edit_routes.route('/edit/pet/updateTeam', methods=['GET', 'POST'])
def updateTeam():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return jsonify({'Result': 1})
        user_id = session['userId']
        pet_id = session['petId']
        companion_first = request.form['first']
        companion_second = request.form['second']
        #convert empty string to none
        if companion_first == '':
            companion_first = None
        if companion_second == '':
            companion_second = None
        memberQuery = 'UPDATE pet SET companion_first = %s, companion_second = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
        try:
            cnx = mysql.connector.connect(**config)
            memberCursor = cnx.cursor()
            memberCursor.execute(memberQuery, (companion_first, companion_second, pet_id, user_id, user_id))
            cnx.commit()
            return jsonify({'Result': 0})
        except mysql.connector.Error as err:
            cnx.rollback()
            print('Something went wrong: {}'.format(err))
            return jsonify({'Result': 1})
        finally:
            memberCursor.close()
            cnx.close()
    else:
        abort(404)