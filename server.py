# -*- coding: utf-8 -*-
from flask import Flask, render_template
from routes.view import view_pages
from routes.api import api_pages

app = Flask(__name__, static_folder='static', static_url_path='')
app.register_blueprint(view_pages)
app.register_blueprint(api_pages)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'),404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'),500

if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)