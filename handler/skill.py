#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#update pet's skill name
def updateSkillname(petId, userId, skillIndex, skillName, cnx): 
    #match the right row
    if skillIndex == 0:
        nameQuery = 'UPDATE pet SET skillone_name = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
    elif skillIndex ==1:
        nameQuery = 'UPDATE pet SET skilltwo_name = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
    elif skillIndex ==2:
        nameQuery = 'UPDATE pet SET skillthree_name = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
    elif skillIndex ==3:
        nameQuery = 'UPDATE pet SET skillfour_name = %s WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s)'
    try:
        nameCursor = cnx.cursor()
        #must have name before
        nameCursor.execute(nameQuery, (skillName, petId, userId, userId))
        cnx.commit()
        return str(2)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(3)
    finally:
        nameCursor.close()