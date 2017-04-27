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
from routes.love import love_routes


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
app.register_blueprint(love_routes)


@app.route('/')
def indexHome():
    return render_template('love.html')


@app.route('/react')
def reactHome():
    return render_template('react.html')


@app.route('/animation')
def animationHome():
    return render_template('animation.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)