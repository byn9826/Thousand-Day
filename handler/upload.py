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

#upload moment in pet page
def uploadMoment(file, petId):
    #no filename return 1
    if file.filename == '':
        return str(1)
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
            return str(2)
        #return filename for success
        return fileName
    #file type not allowed return 1
    else:
        return str(1)

#Allow png for pet profile update
ALLOWED_PET = set(['png'])
def allowedPet(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_PET

#upload pet profile in edit page
def uploadPet(file, petId):
    #check preset profile image name
    if file.filename != '0.png':
        return str(1)
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
            return str(2)
        except Exception as err:
            print('Something went wrong: {}'.format(err))
            return str(3)
    else:
        return str(1)

#Allow jpg for skill picture
ALLOWED_SKILL = set(['jpg'])
def allowedSkill(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_SKILL

#upload skill name when already init it
def uploadSkillimg(file, petId):
    #check preset file name
    if file.filename not in ['1.jpg', '2.jpg', '3.jpg', '4.jpg']:
        return str(1)
    #check file format
    if file and allowedSkill(file.filename):
        fileName = secure_filename(file.filename)
        foldPath = '../static/img/pet/' + str(petId) + '/cover/'
        #create folder path if not exist
        dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), foldPath)
        if not os.path.exists(dir):
            os.makedirs(dir)
        try:
            #save profile image
            file.save(os.path.join(dir, fileName))
            return str(2)
        except Exception as err:
            print('Something went wrong: {}'.format(err))
            return str(3)
    else:
        return str(1)

#allow jpg for user profile
ALLOWED_USER = set(['jpg'])
def allowedUser(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_USER

#upload user profile for signup
def initUser(file, userId):
    #check file format
    if file and allowedUser(file.filename):
        fileName = userId + '.jpg'
        foldPath = '../static/img/user/'
        #create folder path if not exist
        dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), foldPath)
        if not os.path.exists(dir):
            os.makedirs(dir)
        try:
            #save profile image
            file.save(os.path.join(dir, fileName))
        except Exception as err:
                print('Something went wrong: {}'.format(err))
        return str(3)

#remove moment image
def removeMoment(petId, imageName):
    foldPath = '../static/img/pet/' + str(petId) + '/moment/'
    try:
        os.remove(os.path.join(os.path.dirname(os.path.abspath(__file__)), foldPath, imageName))
    except Exception as err:
            print('Something went wrong: {}'.format(err))
    return str(1)
