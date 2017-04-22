#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector
import datetime

#search pet info based on pet id 
def searchPet(petId, cnx):
    petQuery = 'SELECT * FROM pet WHERE pet_id = %s'
    try:
        petCursor = cnx.cursor(dictionary=True)
        petCursor.execute(petQuery, (petId, ))
        return petCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        petCursor.close()

#search all pets info belong to one user
def searchBelong(userId, cnx):
    petsQuery = (
        'SELECT pet_id, pet_name, pet_gender, pet_win, pet_potential, pet_type, '
        '(ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) '
        'AS pet_ability FROM pet WHERE owner_id = %s OR relative_id = %s'
    )
    try:
        #return all pets info
        petsCursor = cnx.cursor(dictionary=True)
        petsCursor.execute(petsQuery, (userId, userId))
        return petsCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        petsCursor.close()

#search companion information for one pet
def searchCompanion(companionFirst, companionSecond, cnx):
    companionQuery = (
        'SELECT pet_id, pet_nature, '
        '(ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) '
        'AS pet_ability FROM pet WHERE pet_id = %s OR pet_id = %s'
    )
    try:
        #get two companions info
        companionCursor = cnx.cursor(dictionary=True)
        companionCursor.execute(companionQuery, (companionFirst, companionSecond))
        return companionCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        companionCursor.close()

#update pet name by pet id and user id
def updateName(petName, petId, userId, cnx):
    nameQuery = 'UPDATE pet SET pet_name = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
    try:
        nameCursor = cnx.cursor()
        nameCursor.execute(nameQuery, (petName, petId, userId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        nameCursor.close()

#remove companion of a pet
def delCompanion(index, petId, userId, cnx):
    #check which companion has been removed
    if index == '0':
        teamQuery = (
            'UPDATE pet SET companion_first = %s WHERE pet_id = %s AND '
            '(owner_id = %s OR relative_id = %s)'
        )
    elif index == '1':
        teamQuery = (
            'UPDATE pet SET companion_second = %s WHERE pet_id = %s AND '
            '(owner_id = %s OR relative_id = %s)'
        )
    try:
        teamCursor = cnx.cursor()
        teamCursor.execute(teamQuery, (None, petId, userId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        teamCursor.close()

#search all pets belongs to a list of users, not inlucde current pet
def friendPets(relations, petId, cnx):
    friendQuery = (
        'SELECT pet_id, pet_name, pet_nature, '
        '(ability_attack + ability_defend + ability_health + ability_swift + ability_lucky) '
        'AS pet_ability FROM pet WHERE (owner_id IN (%s) OR relative_id IN (%s)) AND pet_id != (%s)'
    )
    try:
        #Search all pets from all friends
        doubleRelation = relations + relations + [int(petId)]
        inRelations = ', '.join(list(map(lambda x: '%s', relations)))
        #Get all pets info
        friendQuery = friendQuery % (inRelations, inRelations, '%s')
        friendCursor = cnx.cursor(dictionary=True)
        friendCursor.execute(friendQuery, doubleRelation)
        return friendCursor.fetchall()
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        friendCursor.close()

#update companion for a pet
def updateCompanion(first, second, petId, userId, cnx):
    memberQuery = (
        'UPDATE pet SET companion_first = %s, companion_second = %s WHERE pet_id = %s '
        'AND (owner_id = %s OR relative_id = %s)'
    )
    try:
        memberCursor = cnx.cursor()
        memberCursor.execute(memberQuery, (first, second, petId, userId, userId))
        cnx.commit()
        return str(2)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(1)
    finally:
        memberCursor.close()

#delete relative for a pet
def updateRelative(petId, userId, relativeId, newValue, cnx):
    #remove relative id
    if relativeId:
        delQuery = 'UPDATE pet SET relative_id = %s WHERE pet_id = %s AND owner_id = %s AND relative_id = %s'
    #update relative id
    else:
        delQuery = 'UPDATE pet SET relative_id = %s WHERE pet_id = %s AND owner_id = %s AND relative_id is %s'
    try:
        delCursor = cnx.cursor()
        delCursor.execute(delQuery, (newValue, petId, userId, relativeId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        #return 2 for db error
        return str(2)
    finally:
        delCursor.close()

#transfer ownership of a pet
def transferPet(ownerId, relativeId, petId, cnx):
    #transfer roles
    transQuery = (
        'UPDATE pet SET owner_id = %s, relative_id = %s WHERE owner_id = %s '
        'AND relative_id = %s AND pet_id = %s'
    ) 
    try:
        transCursor = cnx.cursor()
        transCursor.execute(transQuery, (relativeId, ownerId, ownerId, relativeId, petId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        transCursor.close()

#create new pet
def newPet(userId, petName, petGender, petType, petNature, petLon, petLat, cnx):
    petReg = datetime.datetime.now().date()
    potential = 10
    win = 0
    addQuery = (
        'INSERT INTO pet (pet_name, pet_gender, pet_type, pet_nature, location_lon, location_lat, '
        'pet_reg, ability_attack, ability_defend, ability_health, ability_swift, ability_lucky, '
        'pet_potential, owner_id, pet_win) VALUES (%s, %s, %s, %s, %s, %s, %s, 50, 50, 50, 50, '
        '50, 10, %s, 0)'
    )
    try:
        addCursor = cnx.cursor()
        addCursor.execute(addQuery, (petName, petGender, petType, petNature, petLon, petLat, petReg, userId))
        cnx.commit()
        newId = addCursor.lastrowid
        return str(newId)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return None
    finally:
        addCursor.close()