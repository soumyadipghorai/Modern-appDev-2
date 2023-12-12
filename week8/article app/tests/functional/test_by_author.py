from main import app 
from application.database import db 
import pytest 
from application.models import User, Article, ArticleAuthors
from bs4 import BeautifulSoup

class TestArticlesByAuthor:
    def test_without_login(self, client, initialize_database): 
        u = User(user_name = "testuser", email = "test@example.com", password = "password", active = 1)
        db.session.add(u)
        db.session.commit()

        a = Article(title = "my article", content = 'my content')
        db.session.add(a)
        db.session.commit()

        aa = ArticleAuthors(user_id = u.id, article_id = a.article_id)
        db.session.add(aa)
        db.session.commit()

        response = client.get('/articles_by/testuser', follow_redirects = True)
        assert response.status_code == 200 

        soup = BeautifulSoup(respose.data, 'html.parser')
        heading = soup.find_all('h1')
        assert h2_heading[0].string == 'Login'

    def test_with_login(self, client, initialize_database): 
        response = client.get('/login', data = dict(email = 'test@example.com', password = "password"))
        response = client.get('/articles_by/testuser', follow_redirects = True)
        assert b"Logout" in response.data 
        assert b"testuser" in response.data 