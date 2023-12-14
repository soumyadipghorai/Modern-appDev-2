from flask import Flask, request, render_template 
from flask import current_app as app 
from application.models import Article, ArticleSearch
from application import tasks 
from datetime import datetime

@app.route('/', methods = ['GET', 'POST'])
def article() : 
    article = Article.query.all()
    # print("In articles, returning from DB {}".format(article))
    app.logger.debug("In articles, returning from DB {}".format(article))
    return render_template('article.html', articles = article)

@app.route('/articles_by/<userName>', methods = ['GET', 'POST'])
def articles_by_author(userName) : 
    # code will come and stop here 
    import pdb; pdb.set_trace() # debug
    # you can use flask shell
    val = 0 
    calc = 5/val
    article = Article.query.filter(Article.authors.any(user_name = userName)) 
    return render_template('articles_by_author.html', articles = article, user_name = userName)

@app.route('/search', methods = ['GET'])
def search() : 
    q = request.args.get('q')
    query = "%"+q+"%"

    # results = Art icle.query.filter(Article.content.like(query)).all()
    results = ArticleSearch.query.filter(ArticleSearch.content.op('MATCH')(q)).all()

    return render_template('results.html', q = q, results = results)


# can use blueprint and views 
@app.route('/feedback', methods = ['GET', 'POST'])
def feedback() : 
    if request.method == 'GET' : 
        return render_template('feedback.html', error = "")
    if request.method == 'POST' : 
        form = request.form
        print(form)
        email = form['email']
        if "@" in email : 
            pass 
        else : 
            error = "enter valid email"
            return render_template('feedback.html', error = error)
        return render_template('thanks.html')

@app.route("/article_like/<article_id>", methods = ['GET', 'POST'])
def like (article_id) :
    print(f'article with article_id {article_id} was liked')
    # create a table for article likes and store it 
    return "OK", 200

@app.route("/hello/<user_name>", methods = ['GET', 'POST'])
def hello(user_name) :
    job = tasks.just_say_hello.delay(user_name)

    return str(job), 200

@app.route("/hello2/", methods = ['GET', 'POST'])
def hello2() :
    now = datetime.now()
    print("now in flask =", now)
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("date and time = ", dt_string)
    job = tasks.print_current_time_job.apply_async(
        countdown = 60, expires = 120
    )
    # result = job.wait()
    return str(job), 200