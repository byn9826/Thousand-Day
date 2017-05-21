#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#search all likes for one moment
#return 0 for error
def searchLike(momentId, cnx):
    likeQuery = 'SELECT user_id FROM moment_like WHERE moment_id = %s'
    try:
        likeCursor = cnx.cursor()
        likeCursor.execute(likeQuery, (momentId, ))
        return likeCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        likeCursor.close()

#add like for one moment
#return 0 for error
def addLike(momentId, userId, cnx):
    addQuery = 'INSERT INTO moment_like (user_id, moment_id) VALUES (%s, %s)'
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (userId, momentId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        addCursor.close()

#delete like for one moment
#return 0 for error
def deleteLike(momentId, userId, cnx):
    delQuery = 'DELETE FROM moment_like WHERE user_id = %s AND moment_id = %s'
    try:
        delCursor = cnx.cursor()
        delCursor.execute(delQuery, (userId, momentId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        delCursor.close()
