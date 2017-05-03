#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.moment import readMoment, delMoment
from handler.like import searchLike, searchComment, insertComment, newLike
from handler.pet import searchPet
from handler.upload import removeMoment
from handler.message import numNew


moment_routes = Blueprint('moment_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Get moment page
@moment_routes.route('/moment/<int:id>')
def momentPage(id):
    return render_template('moment.html')

#Init moment page
@moment_routes.route('/moment/view', methods = ['GET', 'POST'])
def momentView():
    #only response to post
    if request.method == 'POST':
        momentId = int(request.form['id'])
        cnx = mysql.connector.connect(**config)
        try:
            moment = readMoment(momentId, cnx)
            #moment not exist
            if moment is None:
                return str(1)
            if moment == '0':
                return str(0)
            result = searchLike(momentId, cnx)
            if result == '0':
                return str(0)
            comment = searchComment(momentId, 0, 0, cnx)
            if comment == '0':
                return str(0)
            pet = searchPet(moment['pet_id'], cnx)
            if pet == '0':
                return str(0)
            if session.get('userId') is not None:
                num = numNew(session['userId'], cnx)
        finally:
            cnx.close()
        #id of current visitor
        if session.get('userId') is not None:
            userId = session['userId']
            userName = session['userName']
            num = num[0]
        else:
            userId = None
            userName = None
            num = None
        return jsonify([moment, result, userId, comment, userName, [pet['owner_id'], pet['relative_id']], num])
    else:
        abort(404)

#Load more comment
@moment_routes.route('/moment/commentLoad', methods = ['GET', 'POST'])
def commentLoad():
    #only response to post
    if request.method == 'POST':
        pin = int(request.form['pin'])
        id = int(request.form['id'])
        add = int(request.form['add'])
        cnx = mysql.connector.connect(**config)
        try:
            comment = searchComment(id, pin, add, cnx)
        finally:
            cnx.close()
        return jsonify(comment)
    else:
        abort(404)    

#create one more comment
@moment_routes.route('/moment/createComment', methods = ['GET', 'POST'])
def createComment():
    #only response to post
    if request.method == 'POST':
        #must login
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        content = request.form['content']
        momentId = int(request.form['id'])
        cnx = mysql.connector.connect(**config)
        try:
            result = insertComment(content, momentId, userId, cnx)
        finally:
            cnx.close()
        return str(result)
    else:
        abort(404) 

#change like statues after users click like button
@moment_routes.route('/moment/changeLike', methods = ['GET', 'POST'])
def changeLike():
    #only response to post
    if request.method == 'POST':
        #must login
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        momentId = int(request.form['id'])
        statues = request.form['statues']
        cnx = mysql.connector.connect(**config)
        try:
            result = newLike(userId, momentId, statues, cnx)
        finally:
            cnx.close()
        return str(result)
    else:
        abort(404) 

#delete moment
@moment_routes.route('/moment/deleteMoment', methods = ['GET', 'POST'])
def deleteMoment():
    #only response to post
    if request.method == 'POST':
        #must login
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        petId = int(request.form['pet'])
        momentId = int(request.form['moment'])
        imageName = request.form['image']
        #delete moment row first
        cnx = mysql.connector.connect(**config)
        try:
            pet = searchPet(petId, cnx)
            if pet == '0':
                return str(2)
            #check user privilege
            if pet['owner_id'] != userId and pet['relative_id'] != userId:
                return str(0)
            result = delMoment(momentId, petId, cnx)
            #delete success, remove file
            if result == '1':
                delete = removeMoment(petId, imageName)
        finally:
            cnx.close()
        return result
    else:
        abort(404)