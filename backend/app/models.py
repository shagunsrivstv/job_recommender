from app import db

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    skills = db.Column(db.Text)
    content = db.Column(db.Text)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    company = db.Column(db.String(120))
    description = db.Column(db.Text)
    skills = db.Column(db.Text)
