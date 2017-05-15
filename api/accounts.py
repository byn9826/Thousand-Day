#!/usr/bin/python
# -*- coding: utf-8 -*-
#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, abort, request, jsonify
from oauth2client import client, crypt
import mysql.connector
import secret
import requests
from handlers.user import checkGoogle, checkFacebook
from handlers.token import addToken, deleteToken


accounts_routes = Blueprint('accounts_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#logout, remove token
#return 1 for success, 0 for fail
@accounts_routes.route('/accounts/logOut', methods = ['GET', 'POST'])
def logOut():
    #only response to post
    if request.method == 'POST':
        userId = request.json['id']
        cnx = mysql.connector.connect(**config)
        try:
            return deleteToken(userId, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#verify user login with facebok
#return 0 for error
@accounts_routes.route('/accounts/fLogin', methods = ['GET', 'POST'])
def fLogin():
    #only response to post request
    if request.method == 'POST':
        #get google token to verify
        userToken = request.json['token']
        appSecret = secret.facebookSecret()
        access = requests.get('https://graph.facebook.com/oauth/access_token?client_id=447688265576125&client_secret=' + appSecret + '&grant_type=client_credentials')
        appToken = access.json()['access_token']
        link = 'https://graph.facebook.com/debug_token?input_token=' + userToken + '&access_token=' + appToken
        try:
            valid = requests.get(link)
            userId = valid.json()['data']['user_id']
        except (ValueError, KeyError, TypeError) as error:
            print(error)
            return '0'
        #search user's information
        cnx = mysql.connector.connect(**config)
        try:
            result = checkFacebook(userId, cnx)
            if result is not None and result != '0':
                token = secret.generateToken(userId);
                #insert token into db
                create = addToken(result[0], token, cnx)
                if create == '0':
                    return '0'
                else:
                    #return id, token
                    return jsonify([result[0], token])
        finally:
            cnx.close()
        if result == '0':
            #return 0 for db error
            return '0'
        else:
            #return 2 for account not exist
            return '2'
    else:
        abort(404)

#verify user login with google
#return id, name and token for success
#return 0 for error
#return 2 for account not exist
@accounts_routes.route('/accounts/gLogin', methods = ['GET', 'POST'])
def gLogin():
    #only response to post request
    if request.method == 'POST':
        #get google token to verify
        userToken = request.json['token']
        try:
            idInfo = client.verify_id_token(userToken, '835652983909-6if3h222alkttk9oas3hr3tl15sq1u7m.apps.googleusercontent.com')
            if idInfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise crypt.AppIdentityError("Wrong issuer.")
        #return 0 for can't validate
        except crypt.AppIdentityError:
            return '0'
        #get user's google id
        googleId = idInfo['sub']
        #search user's information
        cnx = mysql.connector.connect(**config)
        try:
            result = checkGoogle(googleId, cnx)
            if result is not None and result != '0':
                token = secret.generateToken(googleId);
                #insert token into db
                create = addToken(result[0], token, cnx)
                if create == '0':
                    return '0'
                else:
                    #return id, token
                    return jsonify([result[0], token])
        finally:
            cnx.close()
        if result == '0':
            #return 0 for db error
            return '0'
        else:
            #return 2 for account not exist
            return '2'
    else:
        abort(404)
