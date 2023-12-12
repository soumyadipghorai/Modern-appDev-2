import os 
from flask import Flask 
from flask_restful import Resource, Api
from application import config
from application.config import LocalDevelopmentConfig, TestingConfig
from application.database import db 
from flask_security import Security, SQLAlchemySessionUserDatastore, SQLAlchemyUserDatastore
from application.models import User, Role
from flask_migrate import Migrate  
import logging 

logging.basicConfig(
        filename = 'debug.log', 
        level = logging.DEBUG, 
        format = f"%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s"
    )

app = None 
api = None 
def create_app() : 
    app = Flask(__name__, template_folder = 'templates')
    if os.getenv('ENV', 'development') == 'production' :
        app.logger.info("currently no production config is setup")
        raise Exception('Currently no production config is setup')

    elif os.getenv('ENV', "development") == "testing" : 
        app.logger.info("starting testing")
        print("start testing")
        app.config.from_object(TestingConfig)

    else : 
        print('starting local dev')
        app.config.from_object(LocalDevelopmentConfig)
    
    db.init_app(app)
    migrate = Migrate(app, db)
    api = Api(app)
    app.app_context().push()
    user_datastore = SQLAlchemySessionUserDatastore(db.session, User, Role)
    security = Security(app, user_datastore)
    app.logger.info("app setup complete")
    return app, api 

app, api = create_app()
 
# import all the controllers so they are loaded 
from application.controllers import *
from application.api import UserAPI
api.add_resource(UserAPI, "/api/user", "/api/user/<string:username>")

@app.errorhandler(404)
def page_not_found(e): 
    return render_template('404.html'), 404

@app.errorhandler(403)
def not_allowed(e): 
    return render_template('403.html'), 403

if __name__ == '__main__' : 
    app.run(host = '0.0.0.0', port = 8080)