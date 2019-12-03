# Project 2 - Star Trek API
#### An API covering Characters, Ships, Species, and Ranks from Star Trek eras TNG (The Next Generation) to DS9 (Deep Space 9).

## Entity Relationship Diagram
![ERD Diagram](https://i.ibb.co/TK8ZW81/Star-Trek-API.png)

## API Documentation
[Check out the API Docs on Postman!](https://documenter.getpostman.com/view/9534886/SWE27KyV)

## Object-Relational Mapping
As an additional task, I implemented a duplicate API that works through the Sequelize ORM library. To access this version of the API, simply prepend `/orm` to the request.

For example, get all characters with request `/characters` would become `/orm/characters`.

## Technologies Used
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite3](https://www.npmjs.com/package/sqlite3)
- [Sequelize](https://sequelize.org/)
- ERD via [dbdiagram.io](https://dbdiagram.io/home)
- API docs via [Postman](https://www.getpostman.com/)

## Next Steps
- Only parse request for JSON if JSON is expected (POST, PUT)
- React GUI
- [JOI validation](https://github.com/hapijs/joi)
