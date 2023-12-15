import os 
from flask import Flask 
from flask_restful import Resource, Api
from application import config
from application.config import LocalDevelopmentConfig, StageConfig
from application.data.database import db 
from application.jobs import workers 
import logging 
from flask_sse import sse 
from flask_caching import Cache

logging.basicConfig(
    filename = 'debug.log', 
    level = logging.DEBUG, 
    format = f"%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s"
)

app = None 
api = None 
celery = None
cache = None

def create_app() : 
    app = Flask(__name__, template_folder = 'templates')
    if os.getenv('ENV', 'development') == 'production' :
        raise Exception('Currently no production config is setup')
    elif os.getenv('ENV', 'development') == 'stage' :
        app.logger.info("starting stage.")
        print("starting stage")
        app.config.from_object(StageConfig)
        print("pushed config")
    else : 
        print('starting local dev')
        app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    api = Api(app)
    app.app_context().push()

    # create celery
    celery = workers.celery
    celery.conf.update(
        broker_url = app.config["CELERY_BROKER_URL"], 
        result_backend = app.config["CELERY_RESULT_BACKEND"]
    )

    celery.Task = workers.ContextTask
    app.app_context().push()
    cache = Cache(app)
    app.app_context().push()
    return app, api, celery, cache 

app, api, celery, cache = create_app()

# @sse.before_request
# def check_access() :
#     if request.args.get("channel") == "analytics" and not g.user.is_admin() : 
#         abort(403)

app.register_blueprint(sse, url_prefix="/stream")
 
# import all the controllers so they are loaded 
from application.controller.controllers import *
# from application.controller.webhooks import *
from application.controller.api import UserAPI
api.add_resource(UserAPI, "/api/user", "/api/user/<string:username>")

if __name__ == '__main__' : 
    app.run(host = '0.0.0.0', port = 8080)