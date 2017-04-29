#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.watch import topWatch
from handler.pet import listPet
from handler.moment import newMoment

love_routes = Blueprint('love_routes', __name__, template_folder = 'templates')
config = secret.mysql()


#Get love
@love_routes.route('/love')
def loveHome():
    return render_template('love.html')

#Init love page
@love_routes.route('/love/view', methods = ['GET', 'POST'])
def loveView():
    #only response to post request
    if request.method == 'POST':
        cnx = mysql.connector.connect(**config)
        try:
            #get 10 top pets
            watcher = topWatch(cnx)
            if watcher == 0:
                return str(0)
            pet = [w['pet_id'] for w in watcher]
            info = listPet(pet, cnx)
            if info == 0:
                return str(0)
            new = newMoment(0, cnx)
            if new == 0:
                return str(0)
        finally:
            cnx.close()
        return jsonify([info, watcher, new])
    else:
        abort(404)