from flask_restful import Resource 
from application.data.database import db 
from flask_restful import fields, marshal_with, reqparse
from application.data.models import User, Article 
from application.utils.validation import NotFoundError, BusinessValidationError

# it helps in formatting if you don't want any fields 
# then directly delete it from here and it would be reflected in the output
output_fields = {
    'user_id' : fields.Integer, 
    'username' : fields.String, 
    'email' : fields.String
}

create_user_parser = reqparse.RequestParser()
create_user_parser.add_argument('username')
create_user_parser.add_argument('email')

update_user_parser = reqparse.RequestParser()
update_user_parser.add_argument('email')

class UserAPI(Resource) :
    @marshal_with(output_fields)
    def get(self, username): 
        # get the username 
        print('In UserAPI GET method', username)

        # get the user from database based on username 
        user = db.session.query(User).filter(User.user_name == username).first()
        if user: 
            return {
                'user_id' : user.user_id,
                'username' : user.user_name, 
                'email' : user.email
                }
            # return user
        else : 
            raise NotFoundError(status_code = 404) 


        print("GET username", username)
        return {"username" : username}

    @marshal_with(output_fields)
    def put(self, username): 
        print('put')
        args = update_user_parser.parse_args()
        email = args.get('email', None)

        # email validation 
        if email is None : 
            raise BusinessValidationError(status_code = 400, error_code = 'BE1002', error_message = 'email is required')

        if "@" in email : 
            pass 
        else : 
            raise BusinessValidationError(status_code = 400, error_code = 'BE1003', error_message = 'invalid email')

        anotherUser = db.session.query(User).filter(User.email == email).first()
        if anotherUser : 
            raise BusinessValidationError(status_code = 400, error_code = 'BE1006', error_message = 'duplicate email')

        user = db.session.query(User).filter(User.user_name == username).first()
        if user is None :
            raise NotFoundError(status_code = 404)

        user.email = email 
        db.session.add(user)
        db.session.commit()
        return {
                'user_id' : user.user_id,
                'username' : user.user_name, 
                'email' : user.email
                }

    def delete(self, username):
        # check if the user exists --> if article exists --> throw error 
        # else delete 
        user = db.session.query(User).filter(User.user_name == username).first()
        if user is None :
            raise NotFoundError(status_code = 404) 

        articles = Article.query.filter(Article.authors.any(username == username))
        print(articles.content)
        if articles : 
            raise BusinessValidationError(status_code= 400, error_code = 'BE1005', error_message= "can't delete user as there are article by the user")
        db.session.delete(user)
        db.session.commit()

        return user 

    # @marshal_with(output_fields)
    def post(self): 
        print('post')
        args = create_user_parser.parse_args()
        username = args.get('username', None)
        email = args.get('email', None)

        if username is None : 
            raise BusinessValidationError(status_code = 400, error_code = 'BE1001', error_message = 'username is required')
        
        if email is None : 
            raise BusinessValidationError(status_code = 400, error_code = 'BE1002', error_message = 'email is required')

        if "@" in email : 
            pass 
        else : 
            raise BusinessValidationError(status_code = 400, error_code = 'BE1003', error_message = 'invalid email')

        user = db.session.query(User).filter((User.user_name == username) | (User.email == email)).first()

        if user : 
            raise BusinessValidationError(status_code = 400, error_code = 'BE1004', error_message = 'duplicate user')
        
        new_user = User(user_name = username, email = email)
        db.session.add(new_user)
        db.session.commit()
        return "", 201