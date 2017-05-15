#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
from handlers.moment import publicMoments, oneMoment
from handlers.like import searchLike
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
        finally:
            cnx.close()
        return jsonify([moment, like])
    else:
        abort(404)
