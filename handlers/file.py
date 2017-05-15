#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
from werkzeug.utils import secure_filename

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
