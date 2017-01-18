# -*- coding: utf-8 -*-
from flask import Blueprint, render_template, redirect, current_app

view_pages = Blueprint('view_pages', __name__, template_folder='templates')

@view_pages.route('/')
def about():
    return render_template('about.html')

@view_pages.route('/setting/<int:id>')
def user(id):
    return render_template('setting.html')

@view_pages.route('/value/<int:id>')
def value(id):
    return render_template('value.html')

@view_pages.route('/plan/<int:id>')
def plan(id):
    return render_template('plan.html')

@view_pages.route('/react')
def react():
    return render_template('react.html')

@view_pages.route('/blog')
def blog():
    return redirect('http://blog.thousanday.com')

@view_pages.route('/other/<app>')
def other(app):
    return current_app.send_static_file('other/' + app + '/index.html')