#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret

from handlers.user import readUser
from handlers.pet import findRelative, searchPets
from handlers.moment import userMoments

users_routes = Blueprint('users_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#Read one users data
#return 0 for error
#return array for success
#return 2 for user not exist
@users_routes.route('/users/read', methods = ['GET', 'POST'])
def read():
    #only response to post
    if request.method == 'POST':
        #which page id has been visit
        pageId = request.json['id']
        cnx = mysql.connector.connect(**config)
        try:
            #get user information
            userName = readUser(pageId, cnx)
            #return 0 for db error
            if userName == '0':
                return '0'
            #return 1 for user not exist
            if not userName:
                return '2'
            #get relative ids
            relative = findRelative(pageId, cnx)
            #return 0 for db error
            if relative == '0':
                return '3'
            #get all pets info belong to this user
            pets = searchPets(pageId, cnx)
            #return 0 for db error
            if pets == "0":
                return '4'
            if len(pets) is not 0:
                #Get all pets id in list
                petIds = [x['pet_id'] for x in pets]
                moments = userMoments(petIds, 0, cnx)
                #return 0 for db error
                if moments == '0':
                    return '5'
            #if not pets, no moments
            else:
                petIds = []
                moments = []
        finally:
            cnx.close()
        return jsonify([userName, relative, pets, petIds, moments])
    else:
        abort(404)

#load more moments for one user
# return 0 for error
#return list of moments when success
@users_routes.route('/users/loadMoments', methods = ['GET', 'POST'])
def loadMoments():
    #only response to post
    if request.method == 'POST':
        petsList = request.json['petsList']
        loadTimes = request.json['loadTimes']
        startPin = loadTimes * 20
        cnx = mysql.connector.connect(**config)
        try:
            moments = userMoments(petsList, 0, cnx)
        finally:
            cnx.close()
        #return 0 for db error
        if moments == '0':
            return '0'
        return jsonify(moments)
    else:
        abort(404)
