import os 
basedir = os.path.abspath(os.path.dirname(__file__))

class Config() : 
    DEBUG = False 
    SQLITE_DB_DIR = None 
    SQLALCHEMY_DATABASE_URI = None 
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    WTF_CSRF_ENABLED = False 
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'

class LocalDevelopmentConfig(Config) : 
    SQLITE_DB_DIR = os.path.join(basedir, "../db_directory")
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(SQLITE_DB_DIR, 'testdb.sqlite3')
    DEBUG = True 
    SECURITY_PASSWORD_HASH = 'bcrypt'
    # ! read from env 
    SECRET_KEY = "KJ!&&S18@^#73jhcbwic!@#^" # strong random difficult key 
    SECURITY_PASSWORD_SALT = '289&#219KAJ@!*@Dach%^jb!!*@' #strong, unique, random key or salt
    SECURITY_REGISTERABLE = True 
    SECURITY_SEND_REGISTER_EMAIL = False # send automatic email
    SECURITY_UNAUTHORIZED_VIEW = None # if its unauthorized through 403 error
    WTF_CSRF_ENABLED = False 
    
class TestingConfig(Config) : 
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:' # using in memory database
    DEBUG = True 
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECRET_KEY = "KJ!&&S18@^#73jhcbwic!@#^"
    SECURITY_PASSWORD_SALT = '289&#219KAJ@!*@Dach%^jb!!*@'
    SECURITY_REGISTERABLE = True 
    SECURITY_SEND_REGISTER_EMAIL = False 
    SECURITY_UNAUTHORIZED_VIEW = None
    WTF_CSRF_ENABLED = False 

"""
class ProductionDevelopmentConfig(Config) : 
    SQLITE_DB_DIR = os.path.join(basedir, "../db_directory")
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(SQLITE_DB_DIR, 'proddb.sqlite3')
    DEBUG = False 
    PASSWORD = os.getenv('PASSWORD')
"""