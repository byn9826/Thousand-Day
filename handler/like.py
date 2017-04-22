#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#check if user like a moment
def searchLike(momentId, cnx):
    likeQuery = 'SELECT user_id FROM moment_like WHERE moment_id = %s'
    try:
        likeCursor = cnx.cursor()
        likeCursor.execute(likeQuery, (momentId, ))
        return likeCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        likeCursor.close()

#search all comment for a moment
def searchComment(momentId, startPoint, cnx):
    commentQuery = 'SELECT * FROM moment_comment WHERE moment_id = %s ORDER BY comment_id DESC LIMIT %s, 5'
    pin = startPoint * 5
    try:
        commentCursor = cnx.cursor(dictionary=True)
        commentCursor.execute(commentQuery, (momentId, pin))
        return commentCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        commentCursor.close()