from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from redis import Redis
import os

db = SQLAlchemy()
redis_client = Redis(host='localhost', port=6379, decode_responses=True)

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object("app.config.Config")
    db.init_app(app)

    from app.routes.resume_routes import resume_bp
    from app.routes.job_routes import job_bp
    from app.routes.recommend_routes import recommend_bp

    app.register_blueprint(resume_bp, url_prefix="/api/resume")
    app.register_blueprint(job_bp, url_prefix="/api/job")
    app.register_blueprint(recommend_bp, url_prefix="/api/recommend")
    
    CORS(app, resources={r"/*": {"origins": "http://localhost:3007"}})

    return app
