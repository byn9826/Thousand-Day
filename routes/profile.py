#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, request, session, abort, jsonify
import mysql.connector
import secret
from handler.user import setName, setAbout, setAura
from handler.upload import initUser


profile_routes = Blueprint('profile_routes', __name__)
config = secret.mysql()

#update username
@profile_routes.route('/profile/profileName', methods = ['GET', 'POST'])
def userName():
    #only response to post
    if request.method == 'POST':
        #only response to login user
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        userName = request.form['name'][:10].strip()
        if userName == '':
            return str(3)
        cnx = mysql.connector.connect(**config)
        try:
            result = setName(userName, userId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#update user about
@profile_routes.route('/profile/profileAbout', methods = ['GET', 'POST'])
def userAbout():
    #only response to post
    if request.method == 'POST':
        #only response to login user
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        userAbout = request.form['about'][:30].strip()
        cnx = mysql.connector.connect(**config)
        try:
            result = setAbout(userAbout, userId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)

#update user profile
@profile_routes.route('/profile/profileImage', methods = ['GET', 'POST'])
def userProfile():
     #only response to post
    if request.method == 'POST':
         #only response to login user
        if session.get('userId') is None:
            return str(0)
        userId = str(session['userId'])
        #file must exist
        if 'file' not in request.files:
            return str(1)
        file = request.files['file']
        return initUser(file, userId)
    else:
        abort(404)

#update user aura
@profile_routes.route('/profile/profileAura', methods = ['GET', 'POST'])
def userAura():
    #only response to post
    if request.method == 'POST':
        #only response to login user
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        userAura = int(request.form['aura'])
        cnx = mysql.connector.connect(**config)
        try:
            result = setAura(userAura, userId, cnx)
        finally:
            cnx.close()
        return result
    else:
        abort(404)