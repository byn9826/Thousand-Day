#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.relation import checkRelation, requestRelation
from handler.user import checkUser, searchRelative
from handler.pet import searchBelong, newPet
from handler.moment import petsMoment
from handler.upload import uploadPet
from handler.message import numNew


user_routes = Blueprint('user_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Get user
@user_routes.route('/user/<int:id>')
def userHome(id):
    return render_template('user.html')

#Init user page
@user_routes.route('/user/view', methods = ['GET', 'POST'])
def userView():
    #only response to post
    if request.method == 'POST':
        #which page id has been visit
        currentId = int(request.form['id'])
        cnx = mysql.connector.connect(**config)
        try:
            #get user information
            user = checkUser(currentId, cnx)
            #return 0 for db error
            if user == "0":
                return str(0)
            #return 1 for user not exist
            if not user:
                return str(1)
            #get relative info
            relative = searchRelative(currentId, cnx)
            #get relations between visitor and page owner
            if session.get('userId') is not None:
                visitorId = int(session['userId'])
                relations = checkRelation(visitorId, currentId, cnx)
                #return 0 for db error
                if relations == "0":
                    return str(0)
                num = numNew(visitorId, cnx)
                #return 0 for db error
                if num == "0":
                    return str(0)
            #Not login, return code 3
            else:
                relations = "3"
            pets = searchBelong(currentId, cnx)
            #return 0 for db error
            if pets == "0":
                return str(0)
            if len(pets) != 0:
                #Get all pets id in list
                allId = [x['pet_id'] for x in pets]
                moments = petsMoment(allId, 0, cnx)
                #return 0 for db error
                if moments == "0":
                    return str(0)
            #not pets, no moments
            else:
                moments = []
                allId = None
        finally:
            cnx.close()
        #when visitor have login
        if session.get('userId') is not None:
            result = [user, relative, relations, pets, moments, session['userId'], session['userName'], allId, num[0]]
        #when visitor not login
        else:
            result = [user, relative, relations, pets, moments, None, None, allId, None]
        return jsonify(result)
    else:
        abort(404)


#Update user_relation table
@user_routes.route('/user/addFriend', methods = ['GET', 'POST'])
def addFriend():
    #only response to post
    if request.method == 'POST':
        #return 3 for must login to send request
        if session.get('userId') is None:
            return str(3)
        receiverId = int(request.form['receiver'])
        applicantId = int(session['userId'])
        #request to be friend with oneself, return 2
        if receiverId == applicantId:
            return str(2)
        cnx = mysql.connector.connect(**config)
        try:
            result = requestRelation(applicantId, receiverId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)


#Load more moment
@user_routes.route('/user/loadMoment', methods = ['GET', 'POST'])
def loadMoment():
    #only response to post
    if request.method == 'POST':
        json = request.json
        showMore = json['showMore']
        #get pets list to search moments
        petsList = json['petsList']
        #Get the start row number
        startPin = showMore * 20
        cnx = mysql.connector.connect(**config)
        try:
            moments = petsMoment(petsList, startPin, cnx)
        finally:
            cnx.close()
        #return 0 for db error
        if moments == "0":
            return str(0)
        #return 1 for no more moments
        elif len(moments) == 0:
            return str(1)
        return jsonify(moments)
    else:
        abort(404)

#create new pet
@user_routes.route('/user/createPet', methods = ['GET', 'POST'])
def createPet():
    #only response to post
    if request.method == 'POST':
        #must login
        if session.get('userId') is None:
            return str(0)
        #name can't be empty
        name = request.form['name'][:10].strip()
        if name == '':
            return str(1)
        gender = int(request.form['gender'])
        # gender must be 0 or 1
        if gender != 0 and gender != 1:
            return str(1)
        # type must be 0,1,2,3,4
        petType = int(request.form['type'])
        if petType != 0 and petType != 1 and petType != 2 and petType != 3 and petType != 4:
            return str(1)
        nature = int(request.form['nature'])
        #nature must be 0,1,2,3
        if nature != 0 and nature != 1 and nature != 2 and nature != 3:
            return str(1)
        lon = float(request.form['lon'])
        lat = float(request.form['lat'])
        #file must exist
        if 'file' not in request.files:
            return str(1)
        file = request.files['file']
        cnx = mysql.connector.connect(**config)
        try:
            create = newPet(session['userId'], name, gender, petType, nature, lon, lat, cnx)
        #row create success, save image
            if create is not None:
                upload = uploadPet(file, int(create))
            else:
                return str(2)
        finally:
            cnx.close()
        #error with the file uploaded
        if upload == '1':
            return str(1)
        #success
        else:
            return str(3)
    else:
        abort(404)  