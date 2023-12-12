flask --app main db init --> to create migrations folder <br>
flask --app main db migrate -m "DB Initial migration." --> initial migration, creates a version, if the table doesn't exists it will create the tables <br>
flask --app main db upgrade --> creates tables <br>
flask --app main db revision -m "Add FTS" --> creates an empty revision <br>