let database = new (require('sqlite3')).Database('./database.db');

// What a lonely module.

module.exports = database;