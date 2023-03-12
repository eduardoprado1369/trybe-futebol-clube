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
<span>*</span> -> primary key  
** -> foreign key
* Users

 |  field  |  type  |
 |---------|--------|
 | id*     | number |
 | username| string |
 | role    | string |
 | email   | string |
 | password| string |
 
 * Teams
 
 |  field  |  type  |
 |---------|--------|
 | id*     | number |
 | teamName| string |
 
 * Matches
 
 |    field     |  type  |
 |--------------|--------|
 | id*          | number |
 | homeTeam**   | number |
 | homeTeamGoals| number |
 | awayTeam**   | number |
 | awayTeamGoals| number |
 | inProgress   | boolean|
