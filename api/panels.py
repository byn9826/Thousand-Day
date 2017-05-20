#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handlers.file import petAvatar, momentImage, userAvatar
from handlers.token import findUser
from handlers.pet import addPet, getBelong, onePet, newName, deleteRelative, transferPet, petsName, addRelative
from handlers.moment import addMoment
from handlers.user import setName, readUser, usersName
from handlers.request import sendRequest, userRequest, checkRequest, removeRequest
from handlers.watch import userWatch

panels_routes = Blueprint('panels_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#accept one request to be relative
#return 0 for error
#return 2 for no privilege
#return 3 for can't be relative
@panels_routes.route('/panels/acceptRequest', methods = ['GET', 'POST'])
def acceptRequest():
    if request.method == 'POST':
        pet = request.json['petId']
        id = request.json['userId']
        token = request.json['userToken']
        cnx = mysql.connector.connect(**config)
        try:
            #check user statues
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #check if request exist
            check = checkRequest(pet, id, cnx)
            if len(check) is 0 or check[0] is None:
                return '2'
            #update pet relative
            add = addRelative(id, pet, cnx)
            if add == '0':
                return '3'
            #remove request
            return removeRequest(pet, id, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#delelte one request to be relative
@panels_routes.route('/panels/deleteRequest', methods = ['GET', 'POST'])
def deleteRequest():
    if request.method == 'POST':
        pet = request.json['petId']
        id = request.json['userId']
        token = request.json['userToken']
        cnx = mysql.connector.connect(**config)
        try:
            #check user statues
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #remove request
            return removeRequest(pet, id, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#init request message page
#return 20 most recent request
#return 0 for error
@panels_routes.route('/panels/requestMessage', methods = ['GET', 'POST'])
def requestMessage():
    if request.method == 'POST':
        id = request.json['id']
        pin = request.json['pin']
        cnx = mysql.connector.connect(**config)
        try:
            #read 20 recent request
            result = userRequest(id, pin, cnx)
        finally:
            cnx.close()
        if result == '0':
            return '0'
        return jsonify(result)
    else:
        abort(404)

#init watch list page
#return 0 for error
#return watch list data if success
@panels_routes.route('/panels/watchList', methods = ['GET', 'POST'])
def watchList():
    if request.method == 'POST':
        id = request.json['id']
        pin = request.json['pin'] * 20
        cnx = mysql.connector.connect(**config)
        try:
            #read 20 watched pets
            watch = userWatch(id, pin, cnx)
            if watch == '0':
                return '0'
            lists = petsName(watch, cnx)
        finally:
            cnx.close()
        if lists == '0':
            return '0'
        else:
            return jsonify(lists)
    else:
        abort(404)

#search user name by if
#return 0 for error
#return name for success
@panels_routes.route('/panels/searchUser', methods = ['GET', 'POST'])
def searchUser():
    if request.method == 'POST':
        id = request.json['id']
        cnx = mysql.connector.connect(**config)
        try:
            name = readUser(id, cnx)
        finally:
            cnx.close()
        if name == '0':
            return '0'
        else:
            return jsonify(name)
    else:
        abort(404)

#transfer owner ship from owner to relative_id
#return 1 for success
#return 0 for error
#return 2 for no privilege
@panels_routes.route('/panels/transferOwnership', methods=['GET', 'POST'])
def transferOwnership():
    #only response to post
    if request.method == 'POST':
        id = request.json['id']
        token = request.json['token']
        pet = request.json['pet']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #check pet belonging
            belong = getBelong(pet, cnx)
            if belong == '0':
                return '0'
            #must be owner to transfer
            if belong[0] != id or belong[1] is None:
                return '2'
            return transferPet(pet, id, belong[1], cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#remove one pet's relative
#return 1 for success
#return 0 for fail
#return 2 for not privilege
@panels_routes.route('/panels/removeRelative', methods=['GET', 'POST'])
def removeRelative():
    #only response to post
    if request.method == 'POST':
        id = request.json['id']
        token = request.json['token']
        pet = request.json['pet']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #check pet belonging
            belong = getBelong(pet, cnx)
            if belong == '0':
                return '0'
            #must be owner to remove
            if belong[0] != id:
                return '2'
            return deleteRelative(pet, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#create new request
#return 1 for success
#retrn 0 for error
#return  2 for no privilege
#return 3 for duplicate
@panels_routes.route('/panels/petRequest', methods = ['GET', 'POST'])
def petRequest():
    if request.method == 'POST':
        senderId = request.json['senderId']
        token = request.json['token']
        petId = request.json['petId']
        receiverId = request.json['receiverId']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != senderId:
                return '2'
            #check pet belonging
            belong = getBelong(petId, cnx)
            if belong == '0':
                return '0'
            if belong[0] != senderId:
                return '2'
            return sendRequest(senderId, receiverId, petId, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#init edit pet page
#return 0 for error
#return pet info for success
@panels_routes.route('/panels/initEdit', methods = ['GET', 'POST'])
def initEdit():
    if request.method == 'POST':
        id = request.json['id']
        cnx = mysql.connector.connect(**config)
        try:
            pet = onePet(id, cnx)
        finally:
            cnx.close()
        if pet == '0':
            return '0'
        else:
            return jsonify(pet)
    else:
        abort(404)

#edit pet name
#return 0 for error
#return 1 for success
#return 2 for js vaid error
@panels_routes.route('/panels/petName', methods = ['GET', 'POST'])
def petName():
    #only response to post
    if request.method == 'POST':
        name = request.json['name'][:10].strip()
        if len(name) == 0:
            return '2'
        id = request.json['id']
        token = request.json['token']
        pet = request.json['pet']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #check pet belonging
            belong = getBelong(pet, cnx)
            if belong == '0':
                return '0'
            if belong[0] != id and belong[1] != id:
                return '2'
            return newName(pet, name, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#update pet image
#1 for success
#return 2 for js not valid
@panels_routes.route('/panels/petImage', methods = ['GET', 'POST'])
def petImage():
    #only response to post
    if request.method == 'POST':
        if 'file' not in request.files:
            return '2'
        image = request.files['file']
        id = int(request.form['id'])
        token = request.form['token']
        pet = int(request.form['pet'])
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #check pet belonging
            belong = getBelong(pet, cnx)
            if belong == '0':
                return '0'
            if belong[0] != id and belong[1] != id:
                return '2'
        finally:
            cnx.close()
        return petAvatar(image, pet)
    else:
        abort(404)

#end relation with pet from relative
@panels_routes.route('/panels/endRelation', methods=['GET', 'POST'])
def endRelation():
    #only response to post
    if request.method == 'POST':
        id = request.json['id']
        token = request.json['token']
        pet = request.json['pet']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #check pet belonging
            belong = getBelong(pet, cnx)
            if belong == '0':
                return '0'
            #must be relative to end
            if belong[1] != id:
                return '2'
            return deleteRelative(pet, cnx)
        finally:
            cnx.close()
    else:
        abort(404)


#update user name
#return 0 for error
#return 1 for success
#return 2 for js vaid error
@panels_routes.route('/panels/profileName', methods = ['GET', 'POST'])
def profileName():
    #only response to post
    if request.method == 'POST':
        name = request.json['name'][:10].strip()
        if len(name) == 0:
            return '2'
        id = request.json['id']
        token = request.json['token']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            return setName(id, name, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#update user image
#1 for success
#return 2 for js not valid
@panels_routes.route('/panels/profileImage', methods = ['GET', 'POST'])
def profileImage():
    #only response to post
    if request.method == 'POST':
        if 'file' not in request.files:
            return '2'
        image = request.files['file']
        id = int(request.form['id'])
        token = request.form['token']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
        finally:
            cnx.close()
        return userAvatar(image, id)
    else:
        abort(404)

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
            elif user is None:
                return '2'
            else:
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

#create new moment
#return 2 for no js not valid
@panels_routes.route('/panels/createMoment', methods=['GET', 'POST'])
def createMoment():
    #only response to post
    if request.method == 'POST':
        momentMessage = request.form['message'][:120].strip()
        if len(momentMessage) == 0:
            return '2'
        if 'file' not in request.files:
            return '2'
        momentFile = request.files['file']
        id = int(request.form['id'])
        token = request.form['token']
        pet = int(request.form['pet'])
        cnx = mysql.connector.connect(**config)
        try:
            #check user id
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #check pet belonging
            belong = getBelong(pet, cnx)
            if belong == '0':
                return '0'
            if belong[0] != id and belong[1] != id:
                return '2'
            upload = momentImage(momentFile, pet)
            if upload == '0' or upload == '2':
                return upload
            add = addMoment(upload, momentMessage, pet, cnx)
        finally:
            cnx.close()
        if add == '0':
            return '0'
        else:
            return add
    else:
        abort(404)
