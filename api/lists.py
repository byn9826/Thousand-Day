#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
from handlers.moment import publicMoments, userMoments, listMoments
from handlers.watch import allWatch
from handlers.like import userLike
from handlers.comment import userComments
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

#read most recent moment on watch list
#return 0 for error
#return 1 for didn't watch a pet
@lists_routes.route('/lists/readWatch', methods = ['GET', 'POST'])
def readWatch():
    if request.method == 'POST':
        userId = request.json['id']
        cnx = mysql.connector.connect(**config)
        try:
            #get all pets id one user watched
            lists = allWatch(userId, cnx)
            if lists == '0':
                return '0'
            #didn't watch a pet return 1
            elif len(lists) == 0:
                return '1'
            #get recent 20 moment from pet list
            new = userMoments(lists, 0, cnx)
        finally:
            cnx.close()
        if new == '0':
            return '0'
        else:
            return jsonify([new, lists])
    else:
        abort(404)

#load more moment on watch list
#return 0 for error
@lists_routes.route('/lists/loadWatch', methods = ['GET', 'POST'])
def loadWatch():
    if request.method == 'POST':
        lists = request.json['list']
        load = request.json['load']
        cnx = mysql.connector.connect(**config)
        try:
            pin = load * 20
            new = userMoments(lists, pin, cnx)
        finally:
            cnx.close()
        if new == '0':
            return '0'
        else:
            return jsonify(new)
    else:
        abort(404)

#load 20 love moment for one user
#return 0 for error
@lists_routes.route('/lists/readLove', methods = ['GET', 'POST'])
def readLove():
    if request.method == 'POST':
        id = request.json['id']
        load = request.json['load'] * 20
        cnx = mysql.connector.connect(**config)
        try:
            #get all love moments id
            love = userLike(id, load, cnx)
            if love == '0':
                return '0'
            elif len(love) == 0:
                moments = []
            else:
                loves = [l[0] for l in love]
                moments = listMoments(loves, cnx)
        finally:
            cnx.close()
        if moments == '0':
            return '0'
        else:
            return jsonify(moments)
    else:
        abort(404)

#load 20 moment where user leave a comment
#return 0 for error
@lists_routes.route('/lists/readComment', methods = ['GET', 'POST'])
def readComment():
    if request.method == 'POST':
        id = request.json['id']
        load = request.json['load'] * 20
        cnx = mysql.connector.connect(**config)
        try:
            comment = userComments(id, load, cnx)
            if comment == '0':
                return '0'
            elif len(comment) == 0:
                moments = []
            else:
                comments = [c[0] for c in comment]
                moments = listMoments(comments, cnx)
        finally:
            cnx.close()
        if moments == '0':
            return '0'
        else:
            return jsonify(moments)
    else:
        abort(404)
