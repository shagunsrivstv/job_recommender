class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://yourusername:yourpassword@db-endpoint.rds.amazonaws.com:5432/jobdb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'supersecretkey'
