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
