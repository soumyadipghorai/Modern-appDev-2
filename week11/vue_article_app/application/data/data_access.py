from application.data.models import Article
# from application.data.models import ArticleLikes
from main import cache 

@cache.cached(timeout = 50, key_prefix = 'get_all_articles')
def get_all_articles() : 
    articles = Article.query.all()
    return articles 

@cache.memorize(50)
def get_articles_by_username(username) : 
    articles = Article.query.filter(Article.authors.any(username = username))
    print(articles)
    return articles.all()