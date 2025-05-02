from flask import Blueprint, request, jsonify
from app import db
from app.models import Resume
from app.utils.parser import parse_resume
import os

resume_bp = Blueprint('resume', __name__)

@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
    file = request.files["file"]
    os.makedirs("./tmp", exist_ok=True)
    path = f"./tmp/{file.filename}"
    file.save(path)

    parsed = parse_resume(path)  # from parser.py
    resume = Resume(
        name=parsed.get("name", "Unknown"),
        email=parsed.get("email", "unknown@example.com"),
        skills=parsed["skills"],
        content=parsed["text"]
    )
    db.session.add(resume)
    db.session.commit()

    return jsonify({
        "message": "Resume parsed and saved",
        "resume_id": resume.id,
        "skills": parsed["skills"],
        "name": parsed.get("name", "Unknown"),
        "email": parsed.get("email", "unknown@example.com")
    })

