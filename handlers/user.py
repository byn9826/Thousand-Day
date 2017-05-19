#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#get list of user name from user id
#return 0 for error
def usersName(usersId, cnx):
    listQuery = 'SELECT user_id, user_name FROM user WHERE user_id IN (%s)'
    listHolder = ', '.join(list(map(lambda x: '%s', usersId)))
    try:
        #Get all pet info
        listQuery = listQuery % (listHolder)
        listCursor = cnx.cursor(dictionary=True)
        listCursor.execute(listQuery, usersId)
        return listCursor.fetchall()
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        listCursor.close()

#create new user
#return new id for success
#return 0 for error
def addUser(facebook, google, name, cnx):
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
        return '0'
    finally:
        addCursor.close()

#use user id find username
#return name if success
#return 0 for fail
def readUser(userId, cnx):
    userQuery = 'SELECT user_name FROM user WHERE user_id = %s'
    try:
        #return user info
        userCursor = cnx.cursor()
        userCursor.execute(userQuery, (userId, ))
        return userCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        userCursor.close()

#update user name
#return 0 for error
#return 1 for success
def setName(userId, userName, cnx):
    userQuery = 'UPDATE user set user_name = %s WHERE user_id = %s'
    try:
        userCursor = cnx.cursor()
        userCursor.execute(userQuery, (userName, userId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return '0'
    finally:
        userCursor.close()

#check facebook account
#return user id if account exist
#return 0 if not exist
def checkFacebook(facebookId, cnx):
    facebookQuery = 'SELECT user_id, user_name FROM user WHERE facebook_id = %s'
    try:
        facebookCursor = cnx.cursor()
        facebookCursor.execute(facebookQuery, (facebookId, ))
        return facebookCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        facebookCursor.close()

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
