"""
routes.py
- provides the API endpoints for consuming and producing
  REST requests and responses
"""
from flask import current_app, request, jsonify
from flask_cors import CORS
from flask_login import logout_user
from functools import wraps
from datetime import datetime, timedelta
from app import app, db
from app.models import User, Post

import jwt
import logging

log = logging.getLogger(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        auth_headers = request.headers.get('Authorization', '').split()

        invalid_msg = {
            'message': 'Invalid token. Registeration and / or authentication required',
            'authenticated': False
        }
        expired_msg = {
            'message': 'Expired token. Reauthentication required.',
            'authenticated': False
        }

        if len(auth_headers) != 2:
            return jsonify(invalid_msg), 401

        try:
            token = auth_headers[1]
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            user = User.query.filter_by(email=data['sub']).first()
            if not user:
                raise RuntimeError('User not found')
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify(expired_msg), 401 # 401 is Unauthorized HTTP status code
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return jsonify(invalid_msg), 401

    return _verify


@app.route('/api/login/', methods=('POST',))
def login():
    log.debug("Logging users in")
    data = request.get_json()
    user = User.authenticate(**data)

    if not user:
        return jsonify({'message': 'Invalid credentials', 'authenticated': False}), 401

    token = jwt.encode({
        'sub': user.email,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=30)},
        current_app.config['SECRET_KEY'])
    return jsonify({'token': token.decode('UTF-8'), 'user': user.to_dict()})


@app.route('/api/register/', methods=['POST'])
def register():
    data = request.get_json(force=True)
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@app.route('/api/posts/', methods=('POST',))
@token_required
def create_post(current_user):
    data = request.get_json()
    post = Post(body=data['body'])
    post.author = current_user
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201


@app.route('/api/posts/', methods=('GET',))
def fetch_posts():
    posts = Post.query.all()
    return jsonify([p.to_dict() for p in posts])


@app.route('/api/posts/<int:post_id>/', methods=('GET', 'PUT'))
def fetch_post(post_id):
    if request.method == 'GET':
        post = Post.query.get(post_id)
        return jsonify({'post': post.to_dict()})


@app.route('/logout/')
def logout():
    logout_user()



