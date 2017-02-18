# -*- coding: utf-8 -*-
from flask import Blueprint, abort, request, jsonify
from pymongo import MongoClient
import database


update_pages = Blueprint('update_pages', __name__)
conn = database.mongo()
db = MongoClient(conn).baozier


@update_pages.route('/pet/updateWatch', methods = ['GET', 'POST'])
def petUpdateWatch():
    if request.method == 'POST':
        info = request.get_json(force=True)
        id = info['id']
        watch = info['watch']
        result = db.pet.update_one(
            {'id': int(id)},
            {
                '$set': {
                    'watch': watch
                }
            }
        )
        if result.matched_count is not 1:
            abort(404)
        return "Success"
    else:
        abort(404)