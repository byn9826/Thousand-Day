#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

#transfer owner to relative
#return 1 for success
#return 0 for error
def transferPet(petId, ownerId, relativeId, cnx):
    petQuery = 'UPDATE pet set owner_id = %s, relative_id = %s WHERE pet_id = %s'
    try:
        petCursor = cnx.cursor()
        petCursor.execute(petQuery, (relativeId, ownerId, petId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return '0'
    finally:
        petCursor.close()

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

#update pet name
def newName(petId, petName, cnx):
    petQuery = 'UPDATE pet set pet_name = %s WHERE pet_id = %s'
    try:
        petCursor = cnx.cursor()
        petCursor.execute(petQuery, (petName, petId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return '0'
    finally:
        petCursor.close()

#delete relative of one pet
#return 0 for error
#return 1 for success
def deleteRelative(petId, cnx):
    delQuery = 'UPDATE pet SET relative_id = %s WHERE pet_id = %s'
    try:
        delCursor = cnx.cursor()
        delCursor.execute(delQuery, (None, petId))
        cnx.commit()
        return '1'
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        #return 0 for error
        return '0'
    finally:
        delCursor.close()

#add one user to one pet's relative
#return row affected
def addRelative(relativeId, petId, cnx):
    addQuery = 'UPDATE pet SET relative_id = %s WHERE pet_id = %s AND relative_id is %s'
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (relativeId, petId, None))
        cnx.commit()
        return str(addCursor.rowcount)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        #return 0 for error
        return '0'
    finally:
        addCursor.close()

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

#get list of pets name from list of pets id
#return list of pet name and id
#return 0 for error
def petsName(petsId, cnx):
    listQuery = 'SELECT pet_id, pet_name FROM pet WHERE pet_id IN (%s)'
    listHolder = ', '.join(list(map(lambda x: '%s', petsId)))
    try:
        #Get all pet info
        listQuery = listQuery % (listHolder)
        listCursor = cnx.cursor(dictionary=True)
        listCursor.execute(listQuery, petsId)
        return listCursor.fetchall()
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return '0'
    finally:
        listCursor.close()
