#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handlers.file import petAvatar
from handlers.token import findUser
from handlers.pet import addPet


panels_routes = Blueprint('panels_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#create new pet
#return 0 for error
#return 2 for info not verify
@panels_routes.route('/panels/createPet', methods = ['GET', 'POST'])
def createPet():
    #only response to post
    if request.method == 'POST':
        petName = request.form['name'][:10].strip()
        if len(petName) == 0:
            return '2'
        petGender = int(request.form['gender'])
        if petGender != 0 and petGender != 1:
            return '2'
        petType = int(request.form['type'])
        if petType != 0 and petType !=1 and petType !=2 and petType != 3 and petType != 4:
            return '2'
        petNature = int(request.form['nature'])
        if petNature != 0 and petNature != 1 and petNature != 2 and petNature !=3:
            return '2'
        if 'file' not in request.files:
            return '2'
        petFile = request.files['file']
        id = int(request.form['id'])
        token = request.form['token']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            userId = user[0]
            if userId != id:
                return '2'
            create = addPet(userId, petName, petGender, petType, petNature, cnx)
            if create == '0':
                return '0'
            return petAvatar(petFile, int(create))
        finally:
            cnx.close()
    else:
        abort(404)
