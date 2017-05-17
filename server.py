#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
import secret
from routes.account import account_routes
from routes.pet import pet_routes
from routes.user import user_routes
from routes.edit import edit_routes
from routes.signup import signup_routes
from routes.profile import profile_routes
from routes.moment import moment_routes
from routes.explore import explore_routes
from routes.watch import watch_routes
from routes.message import message_routes

from api.accounts import accounts_routes
from api.users import users_routes
from api.lists import lists_routes
from api.moments import moments_routes
from api.pets import pets_routes
from api.explores import explores_routes
from api.panels import panels_routes

app = Flask(__name__, static_folder='static', static_url_path='')
app.secret_key = secret.secretKey()
app.register_blueprint(account_routes)
app.register_blueprint(pet_routes)
app.register_blueprint(user_routes)
app.register_blueprint(edit_routes)
app.register_blueprint(signup_routes)
app.register_blueprint(profile_routes)
app.register_blueprint(moment_routes)
app.register_blueprint(explore_routes)
app.register_blueprint(watch_routes)
app.register_blueprint(message_routes)

app.register_blueprint(accounts_routes)
app.register_blueprint(users_routes)
app.register_blueprint(lists_routes)
app.register_blueprint(moments_routes)
app.register_blueprint(pets_routes)
app.register_blueprint(explores_routes)
app.register_blueprint(panels_routes)

@app.route('/')
def watchHome():
    return render_template('watch.html')


@app.route('/react')
def reactHome():
    return render_template('react.html')

@app.route('/about')
def paulHome():
    return render_template('about.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    raise Exception(e)
    return render_template('500.html'), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0')
