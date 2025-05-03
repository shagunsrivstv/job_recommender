from flask import Blueprint, request, jsonify
from app import db
from app.models import Resume, Job
from app.utils.parser import parse_resume
import os

resume_bp = Blueprint('resume', __name__)

@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
    try:
        # Check if a file is included in the request
        if "file" not in request.files:
            return jsonify({"message": "No file part in the request"}), 400

        file = request.files["file"]

        # Check if a file is selected
        if file.filename == "":
            return jsonify({"message": "No file selected"}), 400

        # Save the file to a temporary directory
        os.makedirs("./tmp", exist_ok=True)
        path = f"./tmp/{file.filename}"
        file.save(path)

        # Parse the resume using the parser utility
        parsed = parse_resume(path)  # Assuming parse_resume is implemented in parser.py

        # Validate parsed data
        if not parsed:
            return jsonify({"message": "Failed to parse the resume"}), 500

        # Extract parsed data with default values
        name = parsed.get("name", "Unknown")
        email = parsed.get("email", "unknown@example.com")
        skills = parsed.get("skills", [])

        # Find recommended jobs based on skills
        recommended_jobs = Job.query.filter(
            Job.skills.any(skill in skills for skill in Job.skills)
        ).all()

        # Format the recommended jobs for the response
        jobs_data = [
            {
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "skills": job.skills,
                "description": job.description,
            }
            for job in recommended_jobs
        ]

        # Return a success response with parsed data and recommended jobs
        return jsonify({
            "message": "Resume parsed successfully",
            "name": name,
            "email": email,
            "skills": skills,
            "recommended_jobs": jobs_data
        }), 200

    except KeyError as e:
        # Handle missing keys in the parsed data
        return jsonify({"message": f"Missing key in parsed data: {str(e)}"}), 500

    except Exception as e:
        # Handle any other exceptions
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500