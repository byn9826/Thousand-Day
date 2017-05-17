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
        'INSERT INTO request (sender_id, receiver_id, pet_id, request_time, request_statue) '
        'VALUES (%s, %s, %s, %s, %s)'
    )
    try:
        reqCursor = cnx.cursor()
        reqCursor.execute(reqQuery, (senderId, receiverId, petId, reqDate, 0))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        return '3'
    finally:
        reqCursor.close()
