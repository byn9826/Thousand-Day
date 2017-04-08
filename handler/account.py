#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#check google account
def checkGoogle(googleId, cnx):
    googleQuery = 'SELECT user_id, user_name FROM user WHERE google_id = %s'
    try:
        googleCursor = cnx.cursor()
        googleCursor.execute(googleQuery, (googleId, ))
        return googleCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        googleCursor.close()



















    visitorId = int(visitorId)
    pageId = int(pageId)
    #visitor visit his own page, return 2
    if visitorId == pageId:
        return str(2)
    relationQuery = ('SELECT * From user_relation WHERE ((applicant_id = %s AND receiver_id = %s) '
                     'OR (applicant_id = %s AND receiver_id = %s)) AND friend_statue = %s')
    cnx = cnx
    relationCursor = cnx.cursor()
    relationCursor.execute(relationQuery, (pageId, visitorId, visitorId, pageId, 1))
    relation = relationCursor.fetchone()
    relationCursor.close()
    #visitor visit friend page, return 1
    if relation:
        return str(1)
    #visitor visit strange page, return 0
    else:
        return str(0)