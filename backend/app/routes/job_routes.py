from flask import Blueprint, request, jsonify
from app import db
from app.models import Job

job_bp = Blueprint('job', __name__)

@job_bp.route("/add", methods=["POST"])
def add_job():
    data = request.json
    job = Job(**data)
    db.session.add(job)
    db.session.commit()
    return jsonify({"message": "Job added"})
