#!/usr/bin/python
# -*- coding: utf-8 -*-
#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, abort, request, jsonify
from oauth2client import client, crypt
import mysql.connector
import secret
from handlers.user import checkGoogle
from handlers.token import addToken


accounts_routes = Blueprint('accounts_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#verify user login with google
#return id, name and token for success
#return 0 for error
#return 2 for account not exist
#return 3 for can't verify
@accounts_routes.route('/accounts/gLogin', methods = ['GET', 'POST'])
def gLogin():
    #only response to post request
    if request.method == 'POST':
        #get google token to verify
        userToken = request.form['token']
        try:
            idInfo = client.verify_id_token(userToken, '835652983909-6if3h222alkttk9oas3hr3tl15sq1u7m.apps.googleusercontent.com')
            if idInfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise crypt.AppIdentityError("Wrong issuer.")
        #return 3 for can't validate
        except crypt.AppIdentityError:
            return '3'
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
