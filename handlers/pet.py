#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

#add new pet
#return new id for success
#return 0 for error
def addPet(userId, petName, petGender, petType, petNature, cnx):
    petReg = datetime.datetime.now().date()
    addQuery = (
        'INSERT INTO pet (pet_name, pet_gender, pet_type, pet_nature, pet_reg, owner_id) '
        'VALUES (%s, %s, %s, %s, %s, %s)'
    )
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (petName, petGender, petType, petNature, petReg, userId))
        cnx.commit()
        newId = addCursor.lastrowid
        return str(newId)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        addCursor.close()

#get data for one pet
#return 0 for error
def onePet(petId, cnx):
    petQuery = 'SELECT * FROM pet WHERE pet_id = %s'
    try:
        petCursor = cnx.cursor(dictionary=True)
        petCursor.execute(petQuery, (petId, ))
        return petCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        petCursor.close()

#get one pet's owner and relative id
#return 0 for error
def getBelong(petId, cnx):
    petQuery = 'SELECT owner_id, relative_id FROM pet WHERE pet_id = %s'
    try:
        #return all pets info
        petCursor = cnx.cursor()
        petCursor.execute(petQuery, (petId, ))
        return petCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        petCursor.close()

#search all pets info belong to one user
#return pets id, name, gender, nature, type list in array if success
#return 0 for error
def searchPets(userId, cnx):
    petsQuery = (
        'SELECT pet_id, pet_name, pet_gender, pet_nature, pet_type FROM pet WHERE owner_id = %s OR relative_id = %s'
    )
    try:
        #return all pets info
        petsCursor = cnx.cursor(dictionary=True)
        petsCursor.execute(petsQuery, (userId, userId))
        return petsCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        petsCursor.close()

#find all relatives for one user
#return relative id list for success
#return 0 for error
def findRelative(userId, cnx):
    relativeQuery = 'SELECT owner_id, relative_id FROM pet WHERE owner_id = %s OR relative_id = %s'
    try:
        relativeCursor = cnx.cursor()
        relativeCursor.execute(relativeQuery, (userId, userId))
        relatives = relativeCursor.fetchall()
        #remove duplicate user_id and current user id
        s = []
        for r in relatives:
            s += r
        relative = list(set(s))
        return [x for x in relative if x != None and x != userId]
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        relativeCursor.close()


#filter pets based on type and nature
#return 0 for error
def filterPets(type, nature, cnx):
    filterQuery = 'SELECT pet_id FROM pet WHERE pet_type = %s AND pet_nature = %s'
    try:
        filterCursor = cnx.cursor()
        filterCursor.execute(filterQuery, (type, nature))
        return filterCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        filterCursor.close()
