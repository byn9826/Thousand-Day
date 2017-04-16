#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#check one user account
def checkUser(userId, cnx):
    userQuery = 'SELECT * FROM user WHERE user_id = %s'
    try:
        #return user info
        userCursor = cnx.cursor(dictionary=True)
        userCursor.execute(userQuery, (userId, ))
        return userCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        userCursor.close()

#search users info for pet's owner and relative
def searchOwner(ownerId, relativeId, cnx):
    ownerQuery = 'SELECT * FROM user WHERE user_id = %s OR user_id = %s'
    try:
        ownerCursor = cnx.cursor(dictionary=True)
        ownerCursor.execute(ownerQuery, (ownerId, relativeId))
        return ownerCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        ownerCursor.close()

#search all relatives for one user
def searchRelative(userId, cnx):
    relativeQuery = 'SELECT owner_id, relative_id FROM pet WHERE owner_id = %s OR relative_id = %s'
    try:
        relativeCursor = cnx.cursor()
        relativeCursor.execute(relativeQuery, (userId, userId))
        relatives = relativeCursor.fetchall()
        #remove duplicate user_id and current user id
        s = []
        for r in relatives:
            s += r
        relative = list(set(s))
        return [x for x in relative if x != None and x != int(userId)]
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        relativeCursor.close()

#search user info from users id list
def userList(userList, cnx):
    #get all user info for friends options
    userQuery = 'SELECT user_id, user_name, user_aura FROM user WHERE user_id IN (%s)'
    try:
        listHolder = ', '.join(list(map(lambda x: '%s', userList)))
        #Get all user info
        userQuery = userQuery % (listHolder)
        userCursor = cnx.cursor(dictionary=True)
        userCursor.execute(userQuery, userList)
        return userCursor.fetchall()
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        userCursor.close()

#update user's name
def setName(userName, userId, cnx):
    #get all user info for friends options
    userQuery = 'UPDATE user set user_name = %s WHERE user_id = %s'
    try:
        userCursor = cnx.cursor()
        userCursor.execute(userQuery, (userName, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(2)
    finally:
        userCursor.close()
        