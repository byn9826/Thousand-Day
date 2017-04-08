#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.pet import searchPet, updateName, delCompanion, friendPets, updateCompanion, updateRelative, transferPet
from handler.relation import twoRelation, oneRelation, checkRelation, stopRelation
from handler.user import userList, checkUser
from handler.upload import uploadPet, uploadSkillimg
from handler.location import changeLocation
from handler.skill import updateSkillname


edit_routes = Blueprint('edit_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Get edit pet
@edit_routes.route('/edit/pet/<int:id>')
def petHome(id):
    #user must login
    if session.get('userId') is None:
        abort(404)
    return render_template('edit.html')

#Init edit pet
@edit_routes.route('/edit/pet', methods = ['GET', 'POST'])
def petView():
    #only response to post
    if request.method == 'POST':
        #only response to logged in user, return 0
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        petId = int(request.form['id'])
        cnx = mysql.connector.connect(**config)
        try:
            pet = searchPet(petId, cnx)
        finally:
            cnx.close()
        if not pet:
            return str(1)
        #user not pet owner return 1
        if pet['owner_id'] != userId and pet['relative_id'] != userId:
            return str(2)
        session['petId'] = petId
        #get relative user id
        if userId == pet['owner_id']:
            if pet['relative_id'] is not None:
                session['otherId'] = pet['relative_id']
            else:
                session['otherId'] = None
        elif userId == pet['relative_id']:
            session['otherId'] = pet['owner_id']
        return jsonify([pet, userId, session['userName']])
    else:
        abort(404)

#Update pet name
@edit_routes.route('/edit/pet/updateName', methods=['GET', 'POST'])
def petName():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        userId = session['userId']
        petId = session['petId']
        petName = request.form['name'][:10]
        cnx = mysql.connector.connect(**config)
        try:
            result = updateName(petName, petId, userId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#Remove companion of a pet
@edit_routes.route('/edit/pet/delTeam', methods=['GET', 'POST'])
def delTeam():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        userId = session['userId']
        petId = session['petId']
        index = request.form['index']
        cnx = mysql.connector.connect(**config)
        try:
            result = delCompanion(index, petId, userId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#Search all pets for all pet owner and relative's friend
@edit_routes.route('/edit/pet/searchTeam', methods=['GET', 'POST'])
def searchTeam():
    if request.method == 'POST':
        #only response to pet owner, return 0
        if session.get('petId') is None:
            return str(0)
        userId = session['userId']
        otherId = session['otherId']
        petId = session['petId']
        cnx = mysql.connector.connect(**config)
        try:
            relations = twoRelation(userId, otherId, cnx)
            #return 1 for db not working
            if relations == '0':
                return str(1)
            friends = friendPets(relations, petId, cnx)
            #return 1 for db error
            if friends == '0':
                return str(1)
        finally:
            cnx.close()
        return jsonify(friends)
    else:
        abort(404)

#Update pet team
@edit_routes.route('/edit/pet/updateTeam', methods=['GET', 'POST'])
def updateTeam():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner, return 0
        if session.get('petId') is None:
            return str(0)
        userId = session['userId']
        petId = session['petId']
        companionFirst = request.form['first']
        companionSecond = request.form['second']
        #convert empty string to none
        if companionFirst == '':
            companionFirst = None
        if companionSecond == '':
            companionSecond = None
        cnx = mysql.connector.connect(**config)
        try:
            result = updateCompanion(companionFirst, companionSecond, petId, userId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#delete relative for a pet
@edit_routes.route('/edit/pet/delRelative', methods=['GET', 'POST'])
def delRelative():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        petId = session['petId']
        userId = session['userId']
        relativeId = session['otherId']
        cnx = mysql.connector.connect(**config)
        try:
            result = updateRelative(petId, userId, relativeId, None, cnx)
        finally:
            cnx.close()
        if result == '1':
            #emptry other id
            session['otherId'] = None
        return result
    else:
        abort(404)

#search relative for a pet
@edit_routes.route('/edit/pet/searchRelative', methods=['GET', 'POST'])
def searchRelative():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        petId = session['petId']
        ownerId = session['userId']
        cnx = mysql.connector.connect(**config)
        try:
            friends = oneRelation(ownerId, cnx)
            #return 1 for db error
            if friends == '0':
                return str(1)
            users = userList(friends, cnx)
            #return 1 for db error
            if users == '0':
                return str(1)
        finally:
            cnx.close()
        return jsonify(users)
    else:
        abort(404)

#add relative for a pet
@edit_routes.route('/edit/pet/addRelative', methods=['GET', 'POST'])
def addRelative():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        petId = session['petId']
        ownerId = session['userId']
        relativeId = int(request.form['choice'])
        cnx = mysql.connector.connect(**config)
        try:
            check = checkRelation(ownerId, relativeId, cnx)
            #not friend, can't be relative
            if check != '5':
                return str(1)
            result = updateRelative(petId, ownerId, None, relativeId, cnx)
            #not sucess, return 1
            if result != '1':
                return str(1)
        finally:
            cnx.close()
        #update session otherId
        session['otherId'] = relativeId
        return str(2)
    else:
        abort(404)

#search relative information for display
@edit_routes.route('/edit/pet/showRelative', methods = ['GET', 'POST'])
def showRelative():
    #only response post request
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        #find relative info
        relativeId = session['otherId']
        cnx = mysql.connector.connect(**config)
        try:
            relative = checkUser(relativeId, cnx)
            #return 1 for db error
            if relative == '0':
                return str(1)
        finally:
            cnx.close()
        return jsonify(relative)
    else:
        abort(404)

#transfer ownership to relative
@edit_routes.route('/edit/pet/transOwner', methods=['GET', 'POST'])
def transOwner():
    #only response to post
    if request.method == 'POST':
        #only response to relative id exist
        if session.get('otherId') is None:
            return str(0)
        petId = session['petId']
        ownerId = session['userId']
        relativeId = session['otherId']
        cnx = mysql.connector.connect(**config)
        try:
            result = transferPet(ownerId, relativeId, petId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#End relationship with a pet
@edit_routes.route('/edit/pet/endRelation', methods=['GET', 'POST'])
def endRelation():
    #only response to post
    if request.method == 'POST':
        #only response to owner id exist
        if session.get('otherId') is None:
            return str(0)
        petId = session['petId']
        userId = session['userId']
        ownerId = session['otherId']
        cnx = mysql.connector.connect(**config)
        try:
            result = stopRelation(ownerId, userId, petId, cnx)
        finally:
            cnx.close()
        if result == '1':
            #remove pet session and relative session
            session['petId'] = None
            session['otherId'] = None
        return result
    else:
        abort(404)

#Update profie picture in PNG format
@edit_routes.route('/edit/pet/updateProfile', methods=['GET', 'POST'])
def petProfile():
    #only response to post request
    if request.method == 'POST':
        #only response to user own this pet
        if session.get('petId') is None:
            return str(0)
        #file must exist
        if 'file' not in request.files:
            return str(1)
        file = request.files['file']
        return uploadPet(file, session['petId'])
    else:
         abort(404)

#Update pet's location
@edit_routes.route('/edit/pet/updateLocation', methods=['GET', 'POST'])
def petLocation():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        userId = session['userId']
        petId = session['petId']
        json = request.json
        lon = json['location'][0]
        lat = json['location'][1]
        cnx = mysql.connector.connect(**config)
        try:
            result = changeLocation(lon, lat, petId, userId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#Update pet's skill name
@edit_routes.route('/edit/pet/updateSkill', methods=['GET', 'POST'])
def petSkill():
    #only response to post
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        userId = session['userId']
        petId = session['petId']
        skillName = request.form['name'][:16]
        skillIndex = int(request.form['index'])
        if not skillName:
            return str(1)
        cnx = mysql.connector.connect(**config)
        try:
            result = updateSkillname(petId, userId, skillIndex, skillName, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#Update skill pictures in JPG format
@edit_routes.route('/edit/pet/updatePic', methods=['GET', 'POST'])
def skillPic():
    #only response to post request
    if request.method == 'POST':
        #only response to user own this pet
        if session.get('petId') is None:
            return str(0)
        #file must exist
        if 'file' not in request.files:
            return str(1)
        file = request.files['file']
        return uploadSkillimg(file, session['petId'])
    else:
         abort(404)

#Update skill pictures and namefor the first time
@edit_routes.route('/edit/pet/initPic/<int:num>', methods=['GET', 'POST'])
def skillInit(num):
    #only response to post request
    if request.method == 'POST':
        #only response to user own this pet
        if session.get('petId') is None:
            return str(0)
        #file must exist
        if 'file' not in request.files:
            return str(1)
        file = request.files['file']
        upload = uploadSkillimg(file, session['petId'])
        if upload == '1' or upload == '3':
            return upload
        #update related skill name to unknow skill
        petId = session['petId']
        userId = session['userId']
        skillIndex = num
        skillName = 'Unknow Skill'
        cnx = mysql.connector.connect(**config)
        try:
            result = updateSkillname(petId, userId, skillIndex, skillName, cnx)
        finally:
            cnx.close()
        return result
    else:
         abort(404)