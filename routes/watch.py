#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.moment import newMoment, petsMoment
from handler.watch import userWatch


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
            if new == '0':
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

#Load more moment
@watch_routes.route('/watch/loadMoment', methods = ['GET', 'POST'])
def loadMoment():
    #only response to post request
    if request.method == 'POST':
        types = request.form['type']
        times = int(request.form['time'])
        #to load more recent
        if types == 'recent':
            cnx = mysql.connector.connect(**config)
            try:
                #get 10 newest moments
                new = newMoment(times, cnx)
                if new == '0':
                    return str(0)
            finally:
                cnx.close()
        #to load more on watch list
        elif types == 'watch':
            #must login first
            if session.get('userId') is None:
                return str(1)
            cnx = mysql.connector.connect(**config)
            try:
                #get all pets id one user watched
                list = userWatch(session['userId'], cnx)
                if list == '0':
                    return str(0)
                #didn't watch a pet return 2
                elif len(list) == 0:
                    return jsonify([])
                #get recent 20 moment from pet list
                pin = times * 20
                new = petsMoment(list, pin, cnx)
                if new == '0':
                    return str(0)
            finally:
                cnx.close()
        return jsonify(new)
    else:
        abort(404)