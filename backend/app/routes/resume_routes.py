from flask import Blueprint, request, jsonify
from app import db
from app.models import Resume
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

        # Create a new Resume object and save it to the database
        resume = Resume(
            name=parsed.get("name", "Unknown"),
            email=parsed.get("email", "unknown@example.com"),
            skills=parsed["skills"],
            content=parsed["text"]
        )
        db.session.add(resume)
        db.session.commit()

        # Return a success response with parsed data
        return jsonify({
            "message": "Resume parsed and saved",
            "resume_id": resume.id,
            "skills": parsed["skills"],
            "name": parsed.get("name", "Unknown"),
            "email": parsed.get("email", "unknown@example.com")
        }), 200

    except KeyError as e:
        # Handle missing keys in the parsed data
        return jsonify({"message": f"Missing key in parsed data: {str(e)}"}), 500

    except Exception as e:
        # Handle any other exceptions
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500