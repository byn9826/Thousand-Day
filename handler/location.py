#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector

#update pet location
def changeLocation(lon, lat, petId, userId, cnx):
    #update location for current pet
    locationQuery = (
        'UPDATE pet SET location_lon = %s, location_lat = %s WHERE pet_id = %s AND '
        '(owner_id = %s OR relative_id = %s)'
    )
    try:
        locationCursor = cnx.cursor()
        locationCursor.execute(locationQuery, (lon, lat, petId, userId, userId))
        cnx.commit()
        return str(1)
    except mysql.connector.Error as err:
        print('Something went wrong: {}'.format(err))
        cnx.rollback()
        return str(2)
    finally:
        locationCursor.close()