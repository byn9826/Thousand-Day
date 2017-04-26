#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.pet import filterPet
from handler.moment import petsMoment


explore_routes = Blueprint('explore_routes', __name__, template_folder = 'templates')
config = secret.mysql()


#Get explore
@explore_routes.route('/explore')
def exploreHome():
    return render_template('explore.html')

#load 20 moments
@explore_routes.route('/explore/getMoment', methods = ['GET', 'POST'])
def getMoment():
    #only response to post request
    if request.method == 'POST':
        type = int(request.form['type'])
        nature = int(request.form['nature'])
        load = int(request.form['load']) * 20
        cnx = mysql.connector.connect(**config)
        #get all filter pets
        try:
            pets = filterPet(type, nature, cnx)
            if pets == '0':
                return str(0)
            if len(pets) != 0:
                #Get all pets id in list
                allId = [x[0] for x in pets]
                moments = petsMoment(allId, load, cnx)
                #return 0 for db error
                if moments == '0':
                    return str(0)
            #not pets, no moments
            else:
                moments = []
        finally:
            cnx.close()
        return jsonify(moments)
    else:
        abort(404)