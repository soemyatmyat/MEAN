Description: 
A simple node.js that uses MEAN: MySQL as database, Express as web framework, AngularJS as frontend framework and NodeJS as the server platform

Functionalites:
1. Login and Registration with JWT <br>
Token based Authentication: sign up for new account or login with username & password <br>
Token based Authorization: segegrated by user's role (admin, moderator, user), authorize the user to access resources <br>
---------------------------------------------------------------------------------<br>
Methods| Urls               | Actions<br>
---------------------------------------------------------------------------------<br>
[POST] | /api/auth/signup/  | signup new account <br>
(middlware: verifySignUp checks if username/email already exists in the system) <br>
[POST] | /api/auth/signin/  | login an account <br>
[POST] | /api/auth/signout/ | logout the account <br>
---------------------------------------------------------------------------------<br>
2. CRUD of todo List<br>
---------------------------------------------------------------------------------<br>
Methods| Urls               | Actions<br>
---------------------------------------------------------------------------------<br>
[POST] | /api/todos | create a new todo <br>
[GET] | /api/todos/  | get all todos <br>
[GET] | /api/todos/{:id}| get a todo with {id} <br>
[GET] | /api/todos/completed| get all completed todos <br>
[PUT] | /api/todos/{:id}| update a todo with {id} <br>
[DELETE]|/api/todos/{:id} | remove a todo with {id} <br>
[DELETE]|/api/todos | remove all todos <br>
---------------------------------------------------------------------------------<br>

Tech Stack:
1. MySQL@2.18.1 with Sequelize@7.0.0 <br>
2. Express@4.17.2 with cors@2.8.5 <br>
3. Angular <br>
4. Node@17.3.0, npm@8.3.0 <br>
5. JsonWebToken@8.5.1 <br>
6. bCryptJS@2.4.3 <br>
<br>

Project Structure:
1. config <br>
--> auth.config <br>
--> db.config <br>
2. routes <br>
--> auth.routes.js <br>
--> todo.routes.js <br>
4. middlewares <br>
--> verifySignUp.js: check duplicate username/email <br>
--> authJwt.js: verify Token, check user roles in db <br>
4. controllers <br>
5. models for Sequelize models <br>
--> User (username, email, password) <br>
--> Role (id,name) <br>
--> ToDo (title, description, completed) <br>
6. server.js <br>
--> import and initialize necessary modules and routes, listen for connections.<br>
