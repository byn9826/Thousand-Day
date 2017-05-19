#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

#add new request
#return 1 for success
#return 3 for duplicate
def sendRequest(senderId, receiverId, petId, cnx):
    reqDate = datetime.datetime.now().date()
    reqQuery = (
        'INSERT INTO request (sender_id, receiver_id, pet_id, request_time) '
        'VALUES (%s, %s, %s, %s)'
    )
    try:
        reqCursor = cnx.cursor()
        reqCursor.execute(reqQuery, (senderId, receiverId, petId, reqDate))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        return '3'
    finally:
        reqCursor.close()

def removeRequest(petId, receiverId, cnx):
    removeQuery = 'DELETE FROM request WHERE pet_id = %s AND receiver_id = %s'
    try:
        removeCursor = cnx.cursor()
        removeCursor.execute(removeQuery, (petId, receiverId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        removeCursor.close()

#check if one reqest exist
def checkRequest(petId, receiverId, cnx):
    requestQuery = 'SELECT sender_id FROM request WHERE receiver_id = %s AND pet_id = %s'
    try:
        requestCursor = cnx.cursor()
        requestCursor.execute(requestQuery, (receiverId, petId))
        return requestCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        requestCursor.close()

#read 20 request for one user
#return request list
#return 0 for error
def userRequest(receiverId, pin, cnx):
    requestQuery = (
        'SELECT sender_id, pet_id, request_time FROM request WHERE receiver_id = %s '
        'ORDER BY request_time DESC LIMIT %s, 20'
    )
    try:
        requestCursor = cnx.cursor(dictionary=True)
        requestCursor.execute(requestQuery, (receiverId, pin))
        return requestCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        requestCursor.close()
