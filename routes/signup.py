#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.account import addAccount
from handler.upload import initUser, uploadSkillimg


signup_routes = Blueprint('signup_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Get edit pet
@signup_routes.route('/signup/<string:name>')
def signUp(name):
    #must logout first
    if session.get('google') is not None:
        return render_template('signup.html', google = session['google'], profile = session['googleProfile'] )
    elif session.get('facebook') is not None:
        return render_template('signup.html', facebook = session['facebook'])
    else:
        abort(404)
        
#display terms and privacy
@signup_routes.route('/terms&privacy')
def termsPrivacy():  
    return render_template('terms&privacy.html')

#create new account for user
@signup_routes.route('/signup/createAccount/<string:name>', methods=['GET', 'POST'])
def createAccount(name):
    #only response to post
    if request.method == 'POST':
        #if google, facebook id not exist return 0
        if session.get('google') is None and session.get('facebook') is None:
            return str(0)
        name = name[:10].strip()
        #name space can't be empty
        if name == '':
            return str(1)
        #must upload a file
        if 'file' not in request.files:
            return str(2)
        file = request.files['file']
        #check preset profile image name
        if not file or file.filename != '0.jpg':
            return str(2)
        facebook = session['facebook'] if session['facebook'] else None
        google = session['google'] if session['google'] else None
        cnx = mysql.connector.connect(**config)
        result = addAccount(facebook, google, name, cnx)
        if result is None:
            return str(3)
        upload = initUser(file, result)
        #signup success, store in session
        session['userId'] = int(result)
        session['userName'] = name
        session['facebook'] = None
        session['google'] = None
        return jsonify({'id': result})
    else:
        abort(404)