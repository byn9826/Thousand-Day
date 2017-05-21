#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#search 5 comment for a moment
#return 0 for error
def searchComment(momentId, startPoint, addPoint, cnx):
    commentQuery = 'SELECT * FROM moment_comment WHERE moment_id = %s ORDER BY comment_id DESC LIMIT %s, 5'
    pin = startPoint * 5 + addPoint
    try:
        commentCursor = cnx.cursor(dictionary=True)
        commentCursor.execute(commentQuery, (momentId, pin))
        return commentCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        commentCursor.close()
