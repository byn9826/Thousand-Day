#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#create new token
#return 1 for success
#return 0 for error
def addToken(userId, userToken, cnx):
    addQuery = 'INSERT INTO user_token (user_id, user_token) VALUES (%s, %s) ON DUPLICATE KEY UPDATE user_token = %s'
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (userId, userToken, userToken))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(0)
    finally:
        addCursor.close()
