from main import app 
from application.database import db 
import pytest 
from application.models import User, Article, ArticleAuthors
from bs4 import BeautifulSoup

def test_no_articles_home(client, initialize_database) : 
    #? act
    respose = client.get('/')
    
    #? asserting 
    assert b"<title>All Articles</title>" in response.data 

def test_check_one_article_home(client, initialize_database): 
    u = User(user_name = "testuser", email = "test@example.com", password = "password", active = 1)
    db.session.add(u)
    db.session.commit()

    a = Article(title = "my article", content = 'my content')
    db.session.add(a)
    db.session.commit()

    aa = ArticleAuthors(user_id = u.id, article_id = a.article_id)
    db.session.add(aa)
    db.session.commit()

    response = client.get('/')
    print(response.data)

    assert b"<title>All Articles</title>" in response.data 
    assert b"rating-icon" in response.data 
    soup = BeautifulSoup(respose.data, 'html.parser')
    ratings = soup.find_all('i', {'class' : 'rating-icon'})

    # only one rating should be available 
    assert len(ratings) == 1 

    h2_heading = soup.find_all("h2")
    assert len(h2_heading) == 1
    assert h2_heading[0].string == 'my article'