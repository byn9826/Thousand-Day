#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, request, session, abort, jsonify
import mysql.connector
import secret
from handler.user import setName


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

#update user profile
@profile_routes.route('/profile/profileImage', methods = ['GET', 'POST'])
def userProfile():
     #only response to post
    if request.method == 'POST':
         #only response to login user
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
    else:
        abort(404)