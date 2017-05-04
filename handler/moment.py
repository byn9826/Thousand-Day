#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

#read information of one moment
def readMoment(momentId, cnx):
    momentQuery = 'SELECT * FROM moment WHERE moment_id = %s'
    try:
        momentCursor = cnx.cursor(dictionary=True)
        momentCursor.execute(momentQuery, (momentId, ))
        return momentCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        momentCursor.close()

#add moment to moment table
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
        return None
    finally:
        momentCursor.close()


#search 20 moments from pet id list
def petsMoment(petsId, startPoint, cnx):
    momentQuery = 'SELECT * FROM moment WHERE pet_id in (%s) ORDER BY moment_id DESC LIMIT %s, 20'
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
        return str(0)
    finally:
        momentCursor.close()

#search 20 moments for one pet
def singleMoment(petId, startPoint, cnx):
    momentQuery = 'SELECT * FROM moment WHERE pet_id = %s ORDER BY moment_id DESC LIMIT %s, 20'
    try:
        momentCursor = cnx.cursor()
        momentCursor.execute(momentQuery, (petId, startPoint))
        return momentCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        momentCursor.close()

#search 10 newest moment from all pets
def newMoment(startPoint, cnx):
    startPoint = startPoint * 10
    newQuery = 'SELECT * FROM moment ORDER BY moment_id DESC LIMIT %s, 10'
    try:
        newCursor = cnx.cursor(dictionary=True)
        newCursor.execute(newQuery, (startPoint, ))
        return newCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        newCursor.close()

#delete one moment
def delMoment(moment, pet, cnx):
    delQuery = 'DELETE FROM moment WHERE moment_id = %s AND pet_id = %s'
    try:
        delCursor = cnx.cursor()
        delCursor.execute(delQuery, (moment, pet))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(2)
    finally:
        delCursor.close()

#get moments from a list of moment id
def listMoments(mList, cnx):
    listQuery = 'SELECT * FROM moment WHERE moment_id IN (%s) ORDER BY moment_id DESC'
    listHolder = ', '.join(list(map(lambda x: '%s', mList)))
    try:
        #Get all moments info
        listQuery = listQuery % (listHolder)
        listCursor = cnx.cursor(dictionary=True)
        listCursor.execute(listQuery, mList)
        return listCursor.fetchall()
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        listCursor.close()