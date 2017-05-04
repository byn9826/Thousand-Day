#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret
from handler.relation import allRelation, delRelation, checkRelation, numFriends, cleanRequest, doFriends
from handler.user import userList
from handler.message import getMessages, statueMessage, removeMessage, numNew, sendSuccess


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
                friends = []
                applys = []
            else:
                friend = []
                apply = []
                for r in relation:
                    if r['friend_statue'] == 1:
                        if r['receiver_id'] == userId:
                            friend.append(r['applicant_id'])
                        else:
                            friend.append(r['receiver_id'])
                    else:
                        if r['receiver_id'] == userId:
                            apply.append(r['applicant_id'])
                if len(friend) == 0:
                    friends = []
                else:
                    friends = userList(friend, cnx)
                if friends == '0':
                    return str(0)
                if len(apply) == 0:
                    applys = []
                else:
                    applys = userList(list(set(apply)), cnx)
            messages = getMessages(userId, 0, 20, cnx)
            if messages == '0':
                return str(0)
            num = numNew(userId, cnx)
            if num == '0':
                return str(0)
        finally:
            cnx.close()
        return jsonify([userId, userName, friends, applys, messages, num[0]])
    else:
        abort(404)

#load more messages
@message_routes.route('/message/moreMessage', methods = ['GET', 'POST'])
def moreMessage():
    #only response to post
    if request.method == 'POST':
        #user must login
        if session.get('userId') is None:
            return str(0)
        userId = session['userId']
        times = int(request.form['times'])
        pin = times * 20
        cnx = mysql.connector.connect(**config)
        try:
            messages = getMessages(userId, pin, 20, cnx)
            if messages == '0':
                return str(1)
            return jsonify(messages)
        finally:
            cnx.close()
    else:
        abort(404)

#Delete friend
@message_routes.route('/message/delFriend', methods = ['GET', 'POST'])
def delFriend():
    #only response to post
    if request.method == 'POST':
        #user must login
        if session.get('userId') is None:
            return str(0)
        delId = int(request.form['id'])
        userId = session['userId']
        cnx = mysql.connector.connect(**config)
        try:
            return delRelation(userId, delId, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#add friends
@message_routes.route('/message/addFriend', methods = ['GET', 'POST'])
def addFriend():
    #only response to post
    if request.method == 'POST':
        #user must login
        if session.get('userId') is None:
            return str(0)
        addId = int(request.form['id'])
        userId = session['userId']
        userName = request.form['name']
        cnx = mysql.connector.connect(**config)
        try:
            #check if applicant do send request before
            relation = checkRelation(addId, userId, cnx)
            #return 1 for all kind of error
            if relation != str(4):
                return str(1)
            #check number of friends of current user
            maxUser = numFriends(userId, cnx)
            #return 2 if current user already have more than 50 friends
            if maxUser[0] >= 50:
                return str(2)
            #return 3 if target user already have more than 50 friends
            maxAdd = numFriends(addId, cnx)
            if maxUser[0] >= 50:
                return str(3)
            #clean friend request from current user to target user first
            clean = cleanRequest(userId, addId, cnx)
            if clean == '2':
                return str(1)
            confirm = doFriends(addId, userId, cnx)
            if confirm == '2':
                return str(1)
            message = sendSuccess(userId, userName, addId, cnx)
            #return 4 for success
            return str(4)
        finally:
            cnx.close()
    else:
        abort(404)

#read message or unread message
@message_routes.route('/message/readMessage', methods = ['GET', 'POST'])
def readMessage():
    #only response to post
    if request.method == 'POST':
        #user must login
        if session.get('userId') is None:
            return str(0)
        messageId = int(request.form['message'])
        readStatue = int(request.form['read'])
        userId = session['userId']
        if readStatue == 0:
            newStatue = 1
        else:
            newStatue = 0
        cnx = mysql.connector.connect(**config)
        try:
            return statueMessage(messageId, newStatue, userId, cnx)
        finally:
            cnx.close()
    else:
        abort(404)

#delete one message
@message_routes.route('/message/delMessage', methods = ['GET', 'POST'])
def delMessage():
    #only response to post
    if request.method == 'POST':
        #user must login
        if session.get('userId') is None:
            return str(0)
        messageId = int(request.form['message'])
        userId = session['userId']
        cnx = mysql.connector.connect(**config)
        try:
            return removeMessage(messageId, userId, cnx)
        finally:
            cnx.close()
    else:
        abort(404)