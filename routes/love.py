#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Blueprint, session, render_template, abort, request, jsonify
import mysql.connector
import secret


love_routes = Blueprint('love_routes', __name__, template_folder = 'templates')
config = secret.mysql()


#Get love
@love_routes.route('/love')
def loveHome():
    return render_template('love.html')