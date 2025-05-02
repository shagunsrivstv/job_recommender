from flask import Blueprint, request, jsonify
from app import db
from app.models import Resume, Job
from app.utils.similarity import match_jobs
import pandas as pd

recommend_bp = Blueprint('recommend', __name__)

@recommend_bp.route("/<int:resume_id>", methods=["GET"])
def get_recommendations(resume_id):
    resume = Resume.query.get(resume_id)
    jobs = Job.query.all()
    job_df = pd.DataFrame([{"id": j.id, "title": j.title, "company": j.company, "description": j.description} for j in jobs])
    ranked_jobs = match_jobs(resume.content, job_df)
    return ranked_jobs[["title", "company", "similarity"]].head(5).to_json(orient="records")
