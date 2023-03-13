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
Legends:  
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
 
 # How to run the project

<span>*</span> It's necessary to have Docker and Docker Compose installed in your computer before running it. 
1. Clone the repository:  
   `git clone git@github.com:eduardoprado1369/trybe-futebol-clube.git`  
2. Start the containers that run the front-end, back-end and the database:  
   `npm run compose:up` <br> * **The default ports are `3000`, `3001` and `3002` but can be changed in the docker-compose.yml file.**  
