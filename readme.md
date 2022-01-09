Description: A simple Node.js REST CRUD API that uses MEAN: MySQL as the database, Express as the web framework, AngularJS as the frontend framework and NodeJS as the server platform
=========================================
Functionalities
=========================================
1. Login and Registration with JWT
--> Token based Authentication: sign up for new account or login with username & password
--> Token based Authorization: segegrated by user's role (admin, moderator, user), authorize the user to access resources

Methods| Urls               | Actions
[POST] | /api/auth/signup/  | signup new account
(middlware: verifySignUp checks if username/email already exists in the system)
[POST] | /api/auth/signin/  | login an account
[POST] | /api/auth/signout/ | logout the account


2. CRUD of todo List

=========================================
Tech Stacks
=========================================
1. MySQL@2.18.1 with Sequelize@7.0.0
2. Express@4.17.2 with cors@2.8.5
3. Angular
4. Node@17.3.0, npm@8.3.0
5. JsonWebToken@8.5.1
6. bCryptJS@2.4.3
=========================================
Project Overview
=========================================
1. config
--> auth.config
--> db.config
2. routes
3. middlewares
--> verifySignUp.js: check duplicate username/email
--> authJwt.js: verify Token, check user roles in db
4. controllers
5. models for Sequelize models
--> User (username, email, password)
--> Role (id,name)
--> ToDo (title, description, completed)
6. server.js
--> import and initialize necessary modules and routes, listen for connections.
