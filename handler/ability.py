#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#update ability point
def updateAbility(petId, userId, petAbility, petPotential, prevAbility, prevPotential, cnx):
    #Update abilities with current pet id and user id in session
    abilityQuery = (
        'Update pet SET '
        'ability_attack = %s, ability_defend = %s, ability_health = %s, '
        'ability_swift = %s, ability_lucky = %s, pet_potential = %s '
        'WHERE pet_id = %s AND (owner_id = %s OR relative_id = %s) '
        'AND ability_attack = %s AND ability_defend = %s AND ability_health = %s '
        'AND ability_swift = %s AND ability_lucky = %s AND pet_potential = %s'
    )
    try:
        abilityCursor = cnx.cursor()
        abilityCursor.execute(abilityQuery, (petAbility[0], petAbility[1], petAbility[2], petAbility[3], petAbility[4], petPotential, petId, userId, userId, prevAbility[0], prevAbility[1], prevAbility[2], prevAbility[3], prevAbility[4], prevPotential))
        cnx.commit()
        return str(2)
    except mysql.connector.Error as err:
        cnx.rollback()
        print('Something went wrong: {}'.format(err))
        return str(3)
    finally:
        abilityCursor.close()