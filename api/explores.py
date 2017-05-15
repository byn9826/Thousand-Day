#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handlers.pet import filterPets
from handlers.moment import userMoments


explores_routes = Blueprint('explores_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#load 20 moments with condition
#return 0 for error
@explores_routes.route('/explores/searchMoments', methods = ['GET', 'POST'])
def getMoment():
    #only response to post request
    if request.method == 'POST':
        type = request.json['type']
        nature = request.json['nature']
        load = request.json['load'] * 20
        cnx = mysql.connector.connect(**config)
        #get all filter pets
        try:
            pets = filterPets(type, nature, cnx)
            if pets == '0':
                return '0'
            if len(pets) != 0:
                #Get all pets id in list
                allId = [x[0] for x in pets]
                moments = userMoments(allId, load, cnx)
                #return 0 for db error
                if moments == '0':
                    return '0'
            #not pets, no moments
            else:
                moments = []
        finally:
            cnx.close()
        return jsonify(moments)
    else:
        abort(404)
