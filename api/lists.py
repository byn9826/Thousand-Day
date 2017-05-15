#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
from handlers.moment import publicMoments
import secret

lists_routes = Blueprint('lists_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#read most recent public moments
#return 0 for error
@lists_routes.route('/lists/readPublic', methods = ['GET', 'POST'])
def readPublic():
    #only response to post request
    if request.method == 'POST':
        cnx = mysql.connector.connect(**config)

        try:
            #get 20 newest moments
            new = publicMoments(0, cnx)
            if new == '0':
                return '0'
        finally:
            cnx.close()
        return jsonify(new)
    else:
        abort(404)

#Load more public moments
#return 0 for error
@lists_routes.route('/lists/loadPublic', methods = ['GET', 'POST'])
def loadPublic():
    #only response to post request
    if request.method == 'POST':
        pin = request.json['times'] * 20
        cnx = mysql.connector.connect(**config)
        try:
            #get 10 newest moments
            new = publicMoments(pin, cnx)
            if new == '0':
                return '0'
        finally:
            cnx.close()
        return jsonify(new)
    else:
        abort(404)
