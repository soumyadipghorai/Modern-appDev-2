from flask import Flask, request, render_template 
from flask import current_app as app 
from application.models import Article, ArticleSearch
from application import tasks 
from datetime import datetime
from main import app as app 
# from flask_security import login_required, roles_accepted, roles_required
from flask_sse import sse 

print("in web hooks ", app)

@app.route("/webhook_receiver/github", methods = ["GET"])
def webhook_github() : 
    content = request.json
    print(content)
    print(request.headers)
    return "ok", 200 