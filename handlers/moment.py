#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

#add one new moment
#return 0 for error
#return moment id for success
def addMoment(name, message, petId, cnx):
    momentQuery = 'INSERT INTO moment (image_name, moment_message, pet_id, moment_date) VALUES (%s, %s, %s, %s)'
    moment = datetime.datetime.now().date()
    try:
        momentCursor = cnx.cursor()
        momentCursor.execute(momentQuery, (name, message, petId, moment))
        cnx.commit()
        newId = momentCursor.lastrowid
        return str(newId)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return '0'
    finally:
        momentCursor.close()

#read information of one moment
#return 0 for error
def oneMoment(momentId, cnx):
    momentQuery = 'SELECT * FROM moment WHERE moment_id = %s'
    try:
        momentCursor = cnx.cursor(dictionary=True)
        momentCursor.execute(momentQuery, (momentId, ))
        return momentCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        momentCursor.close()

#search 20 moments for most recent
#return moments list for success, 0 for error
def publicMoments(startPoint, cnx):
    newQuery = 'SELECT moment_id, pet_id, image_name FROM moment ORDER BY moment_id DESC LIMIT %s, 20'
    try:
        newCursor = cnx.cursor(dictionary=True)
        newCursor.execute(newQuery, (startPoint, ))
        return newCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        newCursor.close()

#search 20 moments for one pet
#return 0 for error
def petMoments(petId, startPoint, cnx):
        momentQuery = 'SELECT moment_id, pet_id, image_name FROM moment WHERE pet_id = %s ORDER BY moment_id DESC LIMIT %s, 20'
        try:
            momentCursor = cnx.cursor(dictionary=True)
            momentCursor.execute(momentQuery, (petId, startPoint))
            return momentCursor.fetchall()
        #return 0 for db error
        except mysql.connector.Error as err:
            print('Something went wrong: {}'.format(err))
            return '0'
        finally:
            momentCursor.close()

#search 20 moments from pets id list
#return moments info list for success
#return 0 for error
def userMoments(petsId, startPoint, cnx):
    momentQuery = 'SELECT moment_id, pet_id, image_name FROM moment WHERE pet_id in (%s) ORDER BY moment_id DESC LIMIT %s, 20'
    #prepare for in clause
    petsList = ', '.join(list(map(lambda x: '%s', petsId)))
    momentQuery = momentQuery % (petsList, '%s')
    holderList = petsId + [startPoint]
    try:
        #return all moments info
        momentCursor = cnx.cursor(dictionary=True)
        momentCursor.execute(momentQuery, holderList)
        return momentCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        momentCursor.close()
