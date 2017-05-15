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
