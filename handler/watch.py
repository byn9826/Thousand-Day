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

#check one user's all watch pet id
def userWatch(userId, cnx):
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
        return str(0)
    finally:
        watchCursor.close()

#update watch relation between pet and user
def updateWatch(visitorId, petId, addWatch, cnx):
    #Check it should be watch or unwatch
    if addWatch:
        watchQuery = 'INSERT INTO pet_watch (pet_id, user_id) VALUES (%s, %s)'
    else:
        watchQuery = 'DELETE FROM pet_watch WHERE pet_id = %s AND user_id = %s'
    try:
        watchCursor = cnx.cursor()
        watchCursor.execute(watchQuery, (petId, visitorId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        watchCursor.close()

#top 10 watch pets
#def topWatch(cnx):
#    topQuery = 'SELECT pet_id, COUNT(*) AS count FROM pet_watch GROUP BY pet_id ORDER BY count DESC LIMIT 10'
#    try:
#        topCursor = cnx.cursor(dictionary=True)
 #       topCursor.execute(topQuery)
#        return topCursor.fetchall()
#    except mysql.connector.Error as err:
 #       print('Something went wrong: {}'.format(err))
 #       return str(0)
 #   finally:
  #      topCursor.close()