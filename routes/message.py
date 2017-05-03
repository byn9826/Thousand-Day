#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.relation import allRelation, delRelation
from handler.user import userList


message_routes = Blueprint('message_routes', __name__, template_folder = 'templates')
config = secret.mysql()


#Get message page
@message_routes.route('/message')
def messageHome():
    #user must login
    if session.get('userId') is None:
        abort(404)
    return render_template('message.html')


#Get message page data
@message_routes.route('/message/view', methods = ['GET', 'POST'])
def messageView():
    #only response to post
    if request.method == 'POST':
        userId = session['userId']
        userName = session['userName']
        cnx = mysql.connector.connect(**config)
        try:
            relation = allRelation(userId, cnx)
            if relation == '0':
                return str(0)
            if len(relation) == 0:
                return jsonify([userId, userName, []])
            friend = []
            for r in relation:
                if r['friend_statue'] == 1:
                    if r['receiver_id'] == userId:
                        friend.append(r['applicant_id'])
                    else:
                        friend.append(r['receiver_id'])
            friends = userList(friend, cnx)
            if friends == '0':
                return str(0)
        finally:
            cnx.close()
        return jsonify([userId, userName, friends])
    else:
        abort(404)

#Delete friend
@message_routes.route('/message/delFriend', methods = ['GET', 'POST'])
def delFriend():
    #only response to post
    if request.method == 'POST':
        if session.get('userId') is None:
            return str(0)
        delId = request.form['id']
        userId = session['userId']
        cnx = mysql.connector.connect(**config)
        try:
            return delRelation(userId, delId, cnx)
        finally:
            cnx.close()
    else:
        abort(404)