# Project Trybe Footbal Club

This is a back-end project that uses `Object-oriented programming` (`OOP`) to create a CRUD API that contains data about brazilian football (soccer), in which it's possible to create an account, login with an existing account, validate the login with a token, filter the teams and matches, calculate the leaderboards based on the results of the matches, among other funcionalities.  
This application was fully tested using `integration tests`.

# Technologies used
* TypeScript
* MySQL
* Sequelize ORM
* Node.js
* Express.js
* JSON Web Token
* Chai
* Mocha
* Sinon
* Docker

# Tables
* Users

 |  field  |  type  | primary key |
 |---------|--------|-------------|
 | id      | number | true        |
 | username| string | false
 | role    | string | false
 | email   | string | false
 | password| string | false
