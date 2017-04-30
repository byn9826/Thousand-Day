#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

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

#add like moment
def newLike(userId, momentId, statues, cnx):
    if statues == '1':
        addQuery = 'INSERT INTO moment_like (user_id, moment_id) VALUES (%s, %s)'
    else:
        addQuery = 'DELETE FROM moment_like WHERE user_id = %s AND moment_id = %s'
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (userId, momentId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(2)
    finally:
        addCursor.close()

#search all comment for a moment
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
        return str(0)
    finally:
        commentCursor.close()

#insert one comment
def insertComment(content, moment, user, cnx):
    create = datetime.datetime.now().date()
    insertQuery = (
        'INSERT INTO moment_comment (comment_content, moment_id, user_id, comment_time) VALUES '
        '(%s, %s, %s, %s)'
    )
    try:
        insertCursor = cnx.cursor()
        insertCursor.execute(insertQuery, (content, moment, user, create))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(2)
    finally:
        insertCursor.close()

#get two newest comment for momment list
def relateComment(moments, cnx):
    commentsQuery = 'SELECT * FROM moment_comment WHERE moment_id IN (%s) ORDER BY comment_id DESC LIMIT 2'
    commentsHolder = ', '.join(list(map(lambda x: '%s', moments)))
    try:
        commentsQuery = commentsQuery % (commentsHolder)
        commentsCursor = cnx.cursor(dictionary=True)
        commentsCursor.execute(commentsQuery, moments)
        return commentsCursor.fetchall()
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        commentsCursor.close()