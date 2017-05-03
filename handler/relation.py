#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#check visitor's relationship with user of current page
def checkRelation(visitorId, pageId, cnx):
    #visitor visit his own page, return 2
    if visitorId == pageId:
        return str(2)
    relationQuery = ('SELECT * From user_relation WHERE ((applicant_id = %s AND receiver_id = %s) '
                     'OR (applicant_id = %s AND receiver_id = %s))')
    try:
        relationCursor = cnx.cursor()
        relationCursor.execute(relationQuery, (pageId, visitorId, visitorId, pageId))
        relation = relationCursor.fetchall()
        #return 1 for not friend
        if not relation:
            return str(1)
        if len(relation) == 1:
            #return 4 for request sent
            if relation[0][1] == pageId and relation[0][2] == 0:
                return str(4)
            #return 5 for friends relation
            elif relation[0][2] == 1:
                return str(5)
            #not friend return 1
            else:
                return str(1)
        elif len(relation) == 2:
            return str(4)
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        relationCursor.close()

#send become friend request
def requestRelation(visitorId, pageId, cnx):
    requestQuery = 'INSERT INTO user_relation (applicant_id, receiver_id, friend_statue) VALUES (%s, %s, %s)'
    try:
        requestCursor = cnx.cursor()
        requestCursor.execute(requestQuery, (visitorId, pageId, 0))
        cnx.commit()
        return str(4)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(0)
    finally:
        requestCursor.close()

#end relation with one pet
def stopRelation(ownerId, userId, petId, cnx):
    #remove relative id
    endQuery = 'UPDATE pet SET relative_id = %s WHERE pet_id = %s AND owner_id = %s AND relative_id = %s'
    try:
        endCursor = cnx.cursor()
        endCursor.execute(endQuery, (None, petId, ownerId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        endCursor.close()


#check all friends of one user
def oneRelation(userId, relation, cnx):
    #search all friends id list
    searchQuery = (
        'SELECT applicant_id, receiver_id FROM user_relation '
        'WHERE (applicant_id = %s OR receiver_id = %s) AND friend_statue = %s'
    ) 
    try:
        searchCursor = cnx.cursor()
        searchCursor.execute(searchQuery, (userId, userId, relation))
        options = searchCursor.fetchall()
        combine = []
        #combine all ids
        for o in options:
            combine += o
        clean = []
        #remove owner himself
        for c in combine:
            if c != userId:
                clean.append(c)
        return clean
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        searchCursor.close()


#check all friends of one pet's owner and relative
def twoRelation(userId, otherId, cnx):
    relationQuery = (
        'SELECT applicant_id, receiver_id FROM user_relation '
        'WHERE (receiver_id = %s OR receiver_id = %s OR applicant_id = %s OR applicant_id = %s) '
        'AND friend_statue = %s'
    )
    try:
        relationCursor = cnx.cursor()
        relationCursor.execute(relationQuery, (userId, otherId, userId, otherId, 1))
        result = relationCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        relationCursor.close()
    #remove duplicate ids
    s = []
    for r in result:
        s += r
    #return user id list
    return list(set(s))


#get all relation of one user, friends or not friends
def allRelation(userId, cnx):
    #search all friends id list
    searchQuery = (
        'SELECT * FROM user_relation '
        'WHERE (applicant_id = %s OR receiver_id = %s)'
    ) 
    try:
        searchCursor = cnx.cursor(dictionary=True)
        searchCursor.execute(searchQuery, (userId, userId))
        return searchCursor.fetchall()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        searchCursor.close()

#check total number of friends of one user
def numFriends(userId, cnx):
    searchQuery = (
        'SELECT COUNT(*) FROM user_relation WHERE (applicant_id = %s OR receiver_id = %s) '
        'AND friend_statue = 1'
    )
    try:
        searchCursor = cnx.cursor()
        searchCursor.execute(searchQuery, (userId, userId))
        return searchCursor.fetchone()
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        searchCursor.close()

#clean past friend request from one user to another
def cleanRequest(userId, targetId, cnx):
    cleanQuery = 'DELETE FROM user_relation WHERE applicant_id = %s AND receiver_id = %s AND friend_statue = 0'
    try:
        cleanCursor = cnx.cursor()
        cleanCursor.execute(cleanQuery, (userId, targetId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        cleanCursor.close()

#become friends relation
def doFriends(targetId, userId, cnx):
    doQuery = 'UPDATE user_relation SET friend_statue = 1 WHERE applicant_id = %s AND receiver_id = %s'
    try:
        doCursor = cnx.cursor()
        doCursor.execute(doQuery, (targetId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        doCursor.close()


#delete relation for two user
def delRelation(userId, friendId, cnx):
    delQuery = (
        'DELETE FROM user_relation WHERE (applicant_id = %s AND receiver_id = %s) '
        'OR (applicant_id = %s AND receiver_id = %s)'
    )
    try:
        delCursor = cnx.cursor()
        delCursor.execute(delQuery, (userId, friendId, friendId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(2)
    finally:
        delCursor.close()