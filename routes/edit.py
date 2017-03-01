#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
from flask import Blueprint, session, render_template, abort, request, jsonify
from werkzeug.utils import secure_filename
import mysql.connector
import secret


edit_routes = Blueprint('edit_routes', __name__, template_folder = 'templates')
config = secret.mysql()
ALLOWED_EXTENSIONS = set(['png'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@edit_routes.route('/edit/pet/<int:id>')
def petHome(id):
    return render_template('editPet.html')


@edit_routes.route('/edit/pet', methods = ['GET', 'POST'])
def petView():
    if request.method == 'POST':
        user_id = session['userId']
        pet_id = request.form['id']
        try:
            #search for pet owner
            cnx = mysql.connector.connect(**config)
            petCursor = cnx.cursor(dictionary=True)
            petQuery = 'SELECT pet_id, pet_name, pet_location, companion_first, companion_second FROM pet WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
            petCursor.execute(petQuery, (pet_id, user_id, user_id))
            pet = petCursor.fetchone()
            if pet:
                #get companions info
                companion_first = pet['companion_first']
                companion_second = pet['companion_second']
                companionCursor = cnx.cursor(dictionary=True)
                companionQuery = 'SELECT pet_id, pet_nature, (ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) AS pet_ability FROM pet WHERE pet_id = %s OR pet_id = %s'
                companionCursor.execute(companionQuery, (companion_first, companion_second))
                companion = companionCursor.fetchall()
                result = [pet, companion]
                return jsonify(result)
            else:
                abort(404)
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            petCursor.close()
            cnx.close()
    else:
        abort(404)


@edit_routes.route('/edit/pet/updateProfile', methods=['GET', 'POST'])
def petProfile():
    if request.method == 'POST':
        if 'file' not in request.files:
            abort(404)
        file = request.files['file']
        if file.filename != '0.png':
            abort(404)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            fold_path = '../static/img/pet/' + session['petId'] + '/cover/'
            file.save( os.path.join(os.path.dirname(os.path.abspath(__file__)), fold_path, filename))
            return jsonify({'Success': True})
        else:
            abort(404)
    else:
         abort(404)