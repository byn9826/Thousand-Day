#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.pet import searchPet, searchCompanion, addPotent
from handler.user import searchOwner
from handler.watch import searchWatch, updateWatch
from handler.moment import singleMoment, addMoment
from handler.ability import updateAbility
from handler.upload import uploadMoment
from handler.message import numNew
import datetime


pet_routes = Blueprint('pet_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Get /pet
@pet_routes.route('/pet/<int:id>')
def petHome(id):
    return render_template('pet.html')

#Init pet page
@pet_routes.route('/pet/view', methods = ['GET', 'POST'])
def petView():
    #only response for post request
    if request.method == 'POST':
        #get visitor name and id if user loged in
        if session.get('userId') is None:
            currentId = None
            currentName = None
        else:
            currentId = session['userId']
            currentName = session['userName']
        #get pet id of current page
        petId = int(request.form['id'])
        cnx = mysql.connector.connect(**config)
        try:
            pet = searchPet(petId, cnx)
            #return 1 if pet not exist
            if not pet:
                return str(1)
            #return 0 for db error
            if pet == "0":
                return str(0)
            #get owner and relative id
            petOwner = pet['owner_id']
            petRelative = pet['relative_id']
            lastDate = pet['potential_date']
            todayDate = datetime.datetime.now().date()
            if lastDate == todayDate:
                newPotential = 0
            else:
                newPotential = 1
            owner = searchOwner(petOwner, petRelative, cnx)
            #return 1 if pet not exist
            if not owner:
                return str(1)
            #return 0 for db error
            if owner == "0":
                return str(0)
            #get all watch ids of one pet
            watch = searchWatch(petId, cnx)
            #return 0 for db error
            if watch == "0":
                return str(0) 
            companionFirst = pet['companion_first']
            companionSecond = pet['companion_second']
            #get all companion info of one pet
            companion = searchCompanion(companionFirst, companionSecond, cnx)
            #return 0 for db error
            if companion == "0":
                return str(0)
            #get all related moment of one pet
            moment = singleMoment(petId, 0, cnx)
            #return 0 for db error
            if moment == "0":
                return str(0)
            if session.get('userId') is not None:
                num = numNew(session['userId'], cnx)
                num = num[0]
            else:
                num = None
        finally:
            cnx.close()
        #store pet id into session if pet belong to current user
        if session.get('userId') is not None:
            if (session['userId'] == petOwner or session['userId'] == petRelative):
                session['petId'] = petId
        #return all infos
        result = [pet, owner, watch, companion, moment, currentId, currentName, newPotential, num]
        return jsonify(result)    
    else:
        abort(404)

#create new moment in pet page
@pet_routes.route('/pet/uploadMoment/<string:message>', methods=['GET', 'POST'])
def newMoment(message):
    #only response to post request
    if request.method == 'POST':
        #only process when pet belong to current user, return 0
        if session.get('petId') is None:
            return str(0)
        #file must be attached, return 1
        if 'file' not in request.files:
            return str(1)
        file = request.files['file']
        upload = uploadMoment(file, session['petId'])
        #return error code
        if upload == '1' or upload == '2':
            return upload
        #if update potent or not
        potent = int(request.form['potent'])
        #update moment table
        cnx = mysql.connector.connect(**config)
        try:
            row = addMoment(upload, message, session['petId'], cnx)
            if potent == 1:
                result = addPotent(session['petId'], cnx)
        finally:
            cnx.close()
        if not row:
            return str(2)
        return jsonify([int(row), upload, message])
    else:
         abort(404)

#Load more moment
@pet_routes.route('/pet/loadMoment', methods = ['GET', 'POST'])
def loadMoment():
    #only response to post request
    if request.method == 'POST':
        petId = int(request.form['petId'])
        loadTimes = int(request.form['showMore'])
        addTimes = int(request.form['addOne'])
        startPin = loadTimes * 20 + addTimes
        cnx = mysql.connector.connect(**config)
        try:
            result = singleMoment(petId, startPin, cnx)
        finally:
            cnx.close()
        #return 0 for db error
        if result == '0':
            return str(0)
        return jsonify(result)
    else:
        abort(404)

#Update watch table
@pet_routes.route('/pet/updateWatch', methods = ['GET', 'POST'])
def newWatch():
    #only response to post request
    if request.method == 'POST':
        #return 0 if not login
        if session.get('userId') is None:
            return str(0)
        petId = int(request.form['petId'])
        if request.form['addWatch'] == 'false':
            addWatch = False
        else:
            addWatch = True
        visitorId = session['userId']
        cnx = mysql.connector.connect(**config)
        try:
            #get update success or not
            result = updateWatch(visitorId, petId, addWatch, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#Update pet ability for current user
@pet_routes.route('/pet/updateAbility', methods = ['GET', 'POST'])
def newAbility():
    #Only response to POST request
    if request.method == 'POST':
        #only response to pet owner
        if session.get('petId') is None:
            return str(0)
        #Get new ability, new potential, pet id
        json = request.json
        petAbility = json['ability']
        petPotential = json['potential']
        prevAbility = json['prevAbility']
        prevPotential = json['prevPotential']
        petId = json['petId']
        userId = session['userId']
        #Get total number increased for ability
        total = 0
        for key, value in enumerate(petAbility):
            total += value - prevAbility[key]
        #Check if the increased ability equal to decreased potential
        if (total != (prevPotential - petPotential)):
            return str(1)
        cnx = mysql.connector.connect(**config)
        try:
            result = updateAbility(petId, userId, petAbility, petPotential, prevAbility, prevPotential, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)