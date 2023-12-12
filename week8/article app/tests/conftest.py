from main import app 
from application.database import db 
import pytest 

@pytest.fixture(scope = "Module")
def client() : 
    #? arange 
    print("***************SETTING UP CLIENT***************")
    # Flask provides a way to test your application by exposing the Werkzeug 
    # and handling the context locals for you
    client = app.test_client()
    ctx = app.app_context()
    ctx.push()
    
    # ? Act 
    yield client 

    # ? cleanup 
    ctx.pop()

@pytest.fixture(scope="module")
def initialize_database() : 
    print('SETTING UP DB')
    db.create_all()

    yield db # this is where testing happens 

    #? tear down 
    db.drop_all()

