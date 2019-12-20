# Project 3 - Star Trek API
#### A Graphical '[LCARS](https://memory-alpha.fandom.com/wiki/Library_Computer_Access_and_Retrieval_System)'-style UI for accessing an API covering Characters, Ships, Species, and Ranks from Star Trek eras TNG (The Next Generation) to DS9 (Deep Space 9).
_Note:_ The database file is not included in this repo. To create the initial database, run `node seed.js`.

---

### Table of Contents
#### Front-end
- [Front-end](#frontend)

#### Back-end
- [Entity Relationship Diagram](#erd)
- [API Documentation](#docs)
- [~Object-Relational Mapping~](#orm)
- [Technologies Used](#tech)
- [Next Steps](#next)

---
<a name='frontend'/>

## Front-end
Check out the front-end repo at [https://github.com/maustin/lcars/](https://github.com/maustin/lcars/)

## Back-end
<a name='erd'/>

### Entity Relationship Diagram
![ERD Diagram](https://i.ibb.co/TK8ZW81/Star-Trek-API.png)

<a name='docs'/>

### API Documentation
SQL Version:<br/>
[Check out the API Docs on Postman!](https://documenter.getpostman.com/view/9534886/SWE27KyV)

~Sequelize ORM Version:~<br/>
~[Check out the ORM API Docs on Postman!](https://documenter.getpostman.com/view/9534886/SWE28KtM)~

<a name='orm'/>

### ~Object-Relational Mapping~
~As an additional task, I implemented a duplicate API that works through the Sequelize ORM library. To access this version of the API, simply prepend `/orm` to the request.~

~For example, get all characters with request `/characters` would become `/orm/characters`.~

<a name='tech'/>

### Technologies Used
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite3](https://www.npmjs.com/package/sqlite3)
- ~[Sequelize](https://sequelize.org/)~
- ERD via [dbdiagram.io](https://dbdiagram.io/home)
- API docs via [Postman](https://www.getpostman.com/)

<a name='next'/>

### Next Steps
- Only parse request for JSON if JSON is expected (POST, PUT)
- [JOI validation](https://github.com/hapijs/joi)