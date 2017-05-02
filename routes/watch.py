#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.moment import newMoment


watch_routes = Blueprint('watch_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Init love page
@watch_routes.route('/watch/view', methods = ['GET', 'POST'])
def watchView():
    #only response to post request
    if request.method == 'POST':
        cnx = mysql.connector.connect(**config)
        try:
            #get 10 newest moments
            new = newMoment(0, cnx)
            if new == 0:
                return str(0)
        finally:
            cnx.close()
        if session.get('userName') is not None:
            visitorName = session['userName']
            visitorId = session['userId']
        else:
            visitorName = None
            visitorId = None
        return jsonify([new, visitorName, visitorId])
    else:
        abort(404)