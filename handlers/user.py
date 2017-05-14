#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#check google account
#return user id if account exist
#return 0 if not exist
def checkGoogle(googleId, cnx):
    googleQuery = 'SELECT user_id FROM user WHERE google_id = %s'
    try:
        googleCursor = cnx.cursor()
        googleCursor.execute(googleQuery, (googleId, ))
        return googleCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        googleCursor.close()
