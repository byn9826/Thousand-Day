#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, abort, request, jsonify
from oauth2client import client, crypt
import mysql.connector
import secret
from handler.relation import checkRelation
from handler.account import checkGoogle


account_routes = Blueprint('account_routes', __name__)
config = secret.mysql()


#user click log in with Google button on header
@account_routes.route('/account/googleLogin', methods = ['GET', 'POST'])
def googleLogin():
    #only response to post request
    if request.method == 'POST':
        #get google token to verify
        userToken = request.form['token']
        try:
            idInfo = client.verify_id_token(userToken, '168098850234-fsq84pk4cae97mlj0k464joc21cgqjvv.apps.googleusercontent.com')
            if idInfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise crypt.AppIdentityError("Wrong issuer.")
        #return 2 for can't validate
        except crypt.AppIdentityError:
            return str(2)
        #get user's google id
        googleId = idInfo['sub']
        #search user's information
        cnx = mysql.connector.connect(**config)
        result = checkGoogle(googleId, cnx)
        cnx.close()
        if result is not None and result != '0':
            #write into session
            session['userId'] = result[0]
            session['userName'] = result[1]
            #return user name and id for user exist
            return jsonify(result);
        elif result == '0':
            #return 0 for db error
            return str(0)
        else:
            #return 1 for account not exist
            return str(1)
    else:
        abort(404)


#check user relation after user login at one user page
@account_routes.route('/account/refreshRelation', methods = ['GET', 'POST'])
def refreshRelation():
    if request.method == 'POST':
        visitorId = int(request.form['visitorId'])
        pageId = int(request.form['pageId'])
        cnx = mysql.connector.connect(**config)
        result = checkRelation(visitorId, pageId, cnx)
        cnx.close()
        return result
    else:
        abort(404)

#logout, remove session
@account_routes.route('/account/logOut', methods = ['GET', 'POST'])
def logOut():
    #only response to post
    if request.method == 'POST':
        session.clear()
        #return 0 for success
        if session.get('userId') is None:
            return str(0)
        return str(1)
    else:
        abort(404)