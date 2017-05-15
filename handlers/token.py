#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#from token find userId
#return 0 for error
def findUser(userToken, cnx):
    userQuery = 'SELECT user_id FROM user_token WHERE user_token = %s'
    try:
        userCursor = cnx.cursor()
        userCursor.execute(userQuery, (userToken, ))
        return userCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        userCursor.close()


#create new token
#return 1 for success
#return 0 for error
def addToken(userId, userToken, cnx):
    addQuery = 'INSERT INTO user_token (user_id, user_token) VALUES (%s, %s) ON DUPLICATE KEY UPDATE user_token = %s'
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (userId, userToken, userToken))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return '0'
    finally:
        addCursor.close()

#delete token
#return 1 for success
#return 0 for fail
def deleteToken(userId, cnx):
    cleanQuery = 'DELETE FROM user_token WHERE user_id = %s'
    try:
        cleanCursor = cnx.cursor()
        cleanCursor.execute(cleanQuery, (userId, ))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        cleanCursor.close()
