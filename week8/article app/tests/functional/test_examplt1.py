from main import app 
from application.database import db 

def test_no_articles_home() : 
    #? arange 
    client = app.test_client()
    ctx = app.app_context()
    ctx.push()
    db.create_all()

    #? act
    respose = client.get('/')
    
    #? asserting 
    # when nothing is there on the articles page the title should still be all articles 
    assert b"<title>All Articles</title>" in response.data 

    #? cleanup 
    ctx.pop()
    db.drop_all()

