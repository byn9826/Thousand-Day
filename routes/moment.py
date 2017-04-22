#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.moment import readMoment
from handler.like import searchLike, searchComment

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
            comment = searchComment(momentId, 0, cnx)
            if comment == '0':
                return str(0)
        finally:
            cnx.close()
        #id of current visitor
            if session.get('userId') is not None:
                userId = session['userId']
            else:
                userId = None
        return jsonify([moment, result, userId, comment])
    else:
        abort(404)