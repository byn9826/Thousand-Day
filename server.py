# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template, request
from routes.view import view_pages
from werkzeug.utils import secure_filename
from routes.update import update_pages


app = Flask(__name__, static_folder='static', static_url_path='')
app.register_blueprint(view_pages)
app.register_blueprint(update_pages)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/img')
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'),404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'),500


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upate/petProfile', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            print('No file part')
            return "123"
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        print(file.filename)
        print(app.config['UPLOAD_FOLDER'])
        if file.filename == '':
            print('No selected file')
            return "234"
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print(os.path.join(app.config['UPLOAD_FOLDER']))
            return "345"
    return "456"





if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.run(debug=True)