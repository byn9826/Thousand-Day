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
        relation = relationCursor.fetchone()
        #return 1 for not friend
        if not relation:
            return str(1)
        #return 4 for request sent
        elif relation[1] == pageId and relation[2] == 0:
            return str(4)
        #return 1 for page user send request to visitor before
        elif relation[0] == pageId and relation[2] == 0:
            return str(1)
        #return 5 for friends relation
        elif relation[2] == 1:
            return str(5)
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        return str(0)
    finally:
        relationCursor.close()

#send become friend request
def requestRelation(visitorId, pageId, cnx):
    #request to be friend with oneself, return 2
    if visitorId == pageId:
        return str(2)
    #check if there's friend request from page id to visitor before
    searchQuery = ('SELECT * From user_relation WHERE applicant_id = %s AND receiver_id = %s '
                    'AND friend_statue = %s ')
    #directly become friends if there are request before
    confirmQuery = 'UPDATE user_relation SET friend_statue = %s WHERE applicant_id = %s AND receiver_id = %s'
    #create send request for not friends and no request before
    requestQuery = 'INSERT INTO user_relation (applicant_id, receiver_id, friend_statue) VALUES (%s, %s, %s)'
    try:
        searchCursor = cnx.cursor()
        searchCursor.execute(searchQuery, (pageId, visitorId, 0))
        search = searchCursor.fetchone()
        #no past requirement exist, insert new one
        if not search:
            requestCursor = cnx.cursor()
            requestCursor.execute(requestQuery, (visitorId, pageId, 0))
            cnx.commit()
            requestCursor.close()
            #return 4 for success send friend request
            return str(4)
        #return 5 for become friends
        else:
            confirmCursor = cnx.cursor()
            confirmCursor.execute(confirmQuery, (1, pageId, visitorId))
            cnx.commit()
            confirmCursor.close()
            return str(5)
    #return 0 for db error
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(0)
    finally:
        searchCursor.close()

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