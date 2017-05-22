#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#Create watch relation between user and pet
#return 0 for error
#return 1 for success
def createWatch(userId, petId, cnx):
    watchQuery = 'INSERT INTO pet_watch (pet_id, user_id) VALUES (%s, %s)'
    try:
        watchCursor = cnx.cursor()
        watchCursor.execute(watchQuery, (petId, userId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        watchCursor.close()

#delete watch relation between user and pet
#return 0 for error
#return 1 for success
def deleteWatch(userId, petId, cnx):
    watchQuery = 'DELETE FROM pet_watch WHERE pet_id = %s AND user_id = %s'
    try:
        watchCursor = cnx.cursor()
        watchCursor.execute(watchQuery, (petId, userId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        watchCursor.close()

#get all pet ids on one users watch list
#return 0 for error
def allWatch(userId, cnx):
    watchQuery = 'SELECT pet_id FROM pet_watch WHERE user_id = %s'
    try:
        watchCursor = cnx.cursor()
        watchCursor.execute(watchQuery, (userId, ))
        watchRaw = watchCursor.fetchall()
        #get array store all watcher id
        return [x[0] for x in watchRaw]
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        watchCursor.close()

#search 20 pet ids of one user
#return 0 for error
#return pet id list for success
def userWatch(userId, pin, cnx):
    watchQuery = 'SELECT pet_id FROM pet_watch WHERE user_id = %s LIMIT %s, 20'
    try:
        watchCursor = cnx.cursor()
        watchCursor.execute(watchQuery, (userId, pin))
        watchRaw = watchCursor.fetchall()
        #get array store all watcher id
        return [x[0] for x in watchRaw]
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        watchCursor.close()

#search all watcher ids of one pet
#return 0 for error
def searchWatch(petId, cnx):
    watchQuery = 'SELECT user_id FROM pet_watch WHERE pet_id = %s'
    try:
        watchCursor = cnx.cursor()
        watchCursor.execute(watchQuery, (petId, ))
        watchRaw = watchCursor.fetchall()
        #get array store all watcher id
        return [x[0] for x in watchRaw]
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        watchCursor.close()
