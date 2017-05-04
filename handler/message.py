#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

#search messages related to one user
def getMessages(userId, pin, nums, cnx):
    messageQuery = 'SELECT * FROM message WHERE receiver_id = %s ORDER BY message_date DESC, message_id DESC LIMIT %s, %s'
    try:
        messageCursor = cnx.cursor(dictionary=True)
        messageCursor.execute(messageQuery, (userId, pin, nums))
        return messageCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        messageCursor.close()

#change message statue to read or unread
def statueMessage(messageId, new, userId, cnx):
    statueQuery = 'UPDATE message SET message_read = %s WHERE message_id = %s AND receiver_id = %s'
    try:
        statueCursor = cnx.cursor()
        statueCursor.execute(statueQuery, (new, messageId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(2)
    finally:
        statueCursor.close()

#remove message 
def removeMessage(messageId, userId, cnx):
    removeQuery = 'DELETE FROM message WHERE message_id = %s AND receiver_id = %s'
    try:
        removeCursor = cnx.cursor()
        removeCursor.execute(removeQuery, (messageId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(2)
    finally:
        removeCursor.close()

#check number of unread messages
def numNew(userId, cnx):
    numQuery = 'SELECT COUNT(*) FROM message WHERE receiver_id = %s AND message_read = 0'
    try:
        numCursor = cnx.cursor()
        numCursor.execute(numQuery, (userId, ))
        return numCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        numCursor.close()
    
#send message for friend request
def sendFriend(userId, userName, targetId, cnx):
    messageQuery = (
        'INSERT INTO message (receiver_id, message_date, message_read, user_id, user_name) '
        'VALUES (%s, %s, 0, %s, %s)'
    )
    current = datetime.datetime.now().date()
    try:
        messageCursor = cnx.cursor()
        messageCursor.execute(messageQuery, (targetId, current, userId, userName))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(0)
    finally:
        messageCursor.close()

#send message for become friend success
def sendSuccess(userId, userName, targetId, cnx):
    messageQuery = (
        'INSERT INTO message (receiver_id, message_date, message_read, friend_id, user_name) '
        'VALUES (%s, %s, 0, %s, %s)'
    )
    current = datetime.datetime.now().date()
    try:
        messageCursor = cnx.cursor()
        messageCursor.execute(messageQuery, (targetId, current, userId, userName))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(0)
    finally:
        messageCursor.close()