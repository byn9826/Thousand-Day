#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handlers.pet import onePet
from handlers.moment import petMoments
from handlers.watch import searchWatch, deleteWatch, createWatch
from handlers.token import findUser

pets_routes = Blueprint('pets_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#read data for one pet
#return 0 for error
#return 2 for pet not eixst
@pets_routes.route('/pets/readPet', methods = ['GET', 'POST'])
def petView():
    #only response for post request
    if request.method == 'POST':
        #get pet id of current page
        petId = request.json['id']
        cnx = mysql.connector.connect(**config)
        try:
            pet = onePet(petId, cnx)
            #return 1 if pet not exist
            if not pet:
                return '2'
            #return 0 for db error
            if pet == '0':
                return '0'
            #get all related moments of one pet
            moments = petMoments(petId, 0, cnx)
            #return 0 for db error
            if moments == "0":
                return '0'
            #get all watch ids of one pet
            watch = searchWatch(petId, cnx)
            #return 0 for db error
            if watch == '0':
                return '0'
        finally:
            cnx.close()
        #return data
        return jsonify([pet, moments, watch])
    else:
        abort(404)

#load more moment for one pet
@pets_routes.route('/pets/loadMoments', methods = ['GET', 'POST'])
def petLoad():
    if request.method == 'POST':
        id = request.json['id']
        pin = request.json['load'] * 20
        cnx = mysql.connector.connect(**config)
        try:
            moments = petMoments(id, pin, cnx)
        finally:
            cnx.close()
        if moments == "0":
            return '0'
        else:
            return jsonify(moments)
    else:
        abort(404)

#update watch pet or unwatch pet
#return 2 for not login
#return 1 for success
#return 0 for error
@pets_routes.route('/pets/updateWatch', methods = ['GET', 'POST'])
def updateWatch():
    #only response to post request
    if request.method == 'POST':
        token = request.json['userToken']
        id = request.json['userId']
        action = request.json['action']
        cnx = mysql.connector.connect(**config)
        try:
            user = findUser(token, cnx)
            if user == '0':
                return '0'
            elif user is None:
                return '2'
            else:
                userId = user[0]
            if userId != id:
                return '2'
            #unwatch when action is exist
            if action == 1:
                petId = request.json['petId']
                return deleteWatch(userId, petId, cnx)
            elif action == 0:
                petId = request.json['petId']
                return createWatch(userId, petId, cnx)
        finally:
            cnx.close()
    else:
        abort(404)
