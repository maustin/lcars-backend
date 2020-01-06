const COLUMN_DATA = [];
let database = require('../../database');

function readOne(email, callback) {
	database.get('SELECT * FROM users WHERE email = ?', [email], callback);
}

function remove(email, callback) {
	// TODO
	console.error('users.remove is not yet implemented');
}

function create(parameters, callback) {
	database.run('INSERT INTO users ("username", "email", "password", "created") VALUES (?, ?, ?, ?)',
		[parameters['username'], parameters['email'], parameters['password'], Math.floor(Date.now() / 1000)], callback);
}

function update(parameters, callback) {
	// TODO
	console.error('users.update is not yet implemented');
}

function setLastLogin(id, callback) {
	database.run('UPDATE users SET last_login = ? WHERE id = ?', [Math.floor(Date.now() / 1000), id], callback);
}

database.all('PRAGMA table_info(character_rank)', (error, rows) => {
	if (error)
		console.error(error);
	else
		rows.forEach(item => COLUMN_DATA.push(item));
});

module.exports = { readOne, remove, create, update, setLastLogin, COLUMN_DATA };