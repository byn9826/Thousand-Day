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

#check facebook account
def checkFacebook(facebookId, cnx):
    facebookQuery = 'SELECT user_id, user_name FROM user WHERE facebook_id = %s'
    try:
        facebookCursor = cnx.cursor()
        facebookCursor.execute(facebookQuery, (facebookId, ))
        return facebookCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        facebookCursor.close()

#register a new account for login user
def addAccount(facebook, google, name, cnx):
    addQuery = 'INSERT INTO user (google_id, facebook_id, user_name, user_term) VALUES (%s, %s, %s, 1)'
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (google, facebook, name))
        cnx.commit()
        newId = addCursor.lastrowid
        return str(newId)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return None
    finally:
        addCursor.close()