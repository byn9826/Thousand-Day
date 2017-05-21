#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
from handlers.moment import publicMoments, oneMoment
from handlers.like import searchLike, addLike, deleteLike
from handlers.comment import searchComment
import secret

moments_routes = Blueprint('moments_routes', __name__, template_folder = 'templates')
config = secret.mysql()

#get data for one moment
#return 0 for error
#return 2 for not exist
@moments_routes.route('/moments/readMoment', methods = ['GET', 'POST'])
def readMoment():
    #only response to post
    if request.method == 'POST':
        momentId = request.json['id']
        cnx = mysql.connector.connect(**config)
        try:
            moment = oneMoment(momentId, cnx)
            #moment not exist
            if moment is None:
                return '2'
            if moment == '0':
                return '0'
            like = searchLike(momentId, cnx)
            if like == '0':
                return '0'
            comment = searchComment(momentId, 0, 0, cnx)
            if comment == '0':
                return '0'
        finally:
            cnx.close()
        return jsonify([moment, like, comment])
    else:
        abort(404)

#watch a pet
#return 0 for error
@moments_routes.route('/moments/updateLike', methods = ['GET', 'POST'])
def upadateLike():
    if request.method == 'POST':
        token = request.json['token']
        id = request.json['id']
        moment = request.json['moment']
        action = request.json['action']
        cnx = mysql.connector.connect(**config)
        try:
            #user = findUser(token, cnx)
            #if user == '0':
            #    return '0'
            #elif user is None:
            #    return '2'
            #else:
            #    userId = user[0]
            #if userId != id:
            #    return '2'
            if action == 1:
                return addLike(moment, id, cnx)
            elif action == 0:
                return deleteLike(moment, id, cnx)
        finally:
            cnx.close()
    else:
        abort(404)
