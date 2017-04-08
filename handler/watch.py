#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#search all watcher ids of one pet
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
        return str(0)
    finally:
        watchCursor.close()

def updateWatch(visitorId, petId, addWatch, cnx):
    #Check it should be watch or unwatch
    if addWatch:
        watchQuery = 'INSERT INTO pet_watch (pet_id, user_id) VALUES (%s, %s)'
    else:
        watchQuery = 'DELETE FROM pet_watch WHERE pet_id = %s AND user_id = %s'
    try:
        watchCursor = cnx.cursor()
        watchCursor.execute(watchQuery, (visitorId, petId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        watchCursor.close()