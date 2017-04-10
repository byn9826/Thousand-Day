#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret


signup_routes = Blueprint('signup_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Get edit pet
@signup_routes.route('/signup/<string:name>')
def signUp(name):
    #must logout first
    if session.get('google') is not None:
        return render_template('signup.html', google = session['google'] )
    elif session.get('facebook') is not None:
        print(session['facebook'])
        return render_template('signup.html', facebook = session['facebook'] )
        
    