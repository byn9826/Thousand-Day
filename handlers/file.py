#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import time
from werkzeug.utils import secure_filename

#allow jpg png for moment upload
ALLOWED_MOMENT = set(['png', 'jpg', 'jpeg'])
def allowedMoment(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_MOMENT

#upload moment in edit page
#return 2 for no privilege
#return 0 for error
#return file name for success
def momentImage(file, petId):
    if file.filename == '':
        return '2'
    if file and allowedMoment(file.filename):
        #name time with special time span
        fileName = str(time.time()).replace('.', '-') + '.' + secure_filename(file.filename)
        #store into pet id folder
        foldPath = '../static/img/pet/' + str(petId) + '/moment/'
        #create folder path if not exist
        dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), foldPath)
        if not os.path.exists(dir):
            os.makedirs(dir)
        try:
            file.save(os.path.join(dir, fileName))
        except Exception as err:
            print('Something went wrong: {}'.format(err))
            return '1'
        #return filename for success
        return fileName
    #file type not allowed return 1
    else:
        return '2'

#Allow png for pet profile update
ALLOWED_PET = set(['png'])
def allowedPet(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_PET

#upload pet profile in edit page
#return 0 for error
#return 1 for success
#return 2 for file error
def petAvatar(file, petId):
    #check preset profile image name
    if file.filename != '0.png':
        return '2'
    #check file format
    if file and allowedPet(file.filename):
        fileName = secure_filename(file.filename)
        foldPath = '../static/img/pet/' + str(petId) + '/cover/'
        #create folder path if not exist
        dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), foldPath)
        if not os.path.exists(dir):
            os.makedirs(dir)
        try:
            #save profile image
            file.save(os.path.join(dir, fileName))
            return '1'
        except Exception as err:
            print('Something went wrong: {}'.format(err))
            return '0'
    else:
        return '2'
