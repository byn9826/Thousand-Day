#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

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

#insert one comment
#return 1 for success
#return 0 for error
def createComment(userId, momentId, content, cnx):
    create = datetime.datetime.now().date()
    insertQuery = (
        'INSERT INTO moment_comment (comment_content, moment_id, user_id, comment_time) VALUES '
        '(%s, %s, %s, %s)'
    )
    try:
        insertCursor = cnx.cursor()
        insertCursor.execute(insertQuery, (content, momentId, userId, create))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return '0'
    finally:
        insertCursor.close()
