from app import db

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    skills = db.Column(db.Text)
    content = db.Column(db.Text)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    skills = db.Column(db.ARRAY(db.String), nullable=False)  # Array of skills
    description = db.Column(db.Text, nullable=True)
