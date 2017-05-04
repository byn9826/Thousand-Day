#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#search all comments for one user id
def commentMoments(userId, cnx):
    likeQuery = 'SELECT DISTINCT(moment_id) FROM moment_comment WHERE user_id = %s ORDER by moment_id DESC'
    try:
        likeCursor = cnx.cursor()
        likeCursor.execute(likeQuery, (userId, ))
        return likeCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        likeCursor.close()