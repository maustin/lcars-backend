const COLUMN_DATA = [];
let database = require('../../database');

// get all
function readAll(callback) {
	database.all('SELECT * FROM ranks', callback);
}

// get single
function readOne(id, callback) {
	database.get('SELECT * FROM ranks WHERE ranks.id = ?', [id], callback);
}

// delete
function remove(id, callback) {
	database.get('SELECT id FROM ranks WHERE id = ?', [id], (error, data) => {
		if (data)
			database.run('DELETE FROM ranks WHERE id = ?', [id], callback);
		else
			callback(404, null);
	});
}

// create
function create(parameters, callback) {
	database.run('INSERT INTO ranks ("name", "user_generated") VALUES(?, 1)',
		[parameters.name], callback);
}

// update
function update(parameters, callback) {
	let id = parameters.id;
	let setFields = [];
	let paramFields = [];
	COLUMN_DATA.forEach(column => {
		if (parameters[column.name] != undefined) {
			setFields.push(column.name + ' = ?');
			paramFields.push(parameters[column.name]);
		}
	});
	paramFields.push(id);

	database.get('SELECT id FROM ranks WHERE id = ?', [id], (error, data) => {
		if (data)
			database.run('UPDATE ranks SET ' + setFields.join(', ') + ' WHERE id = ?', paramFields, callback);
		else
			callback(404, null);
	});
}

database.all('PRAGMA table_info(ranks)', (error, rows) => {
	if (error)
		console.error(error);
	else
		rows.forEach(item => COLUMN_DATA.push(item));
});

module.exports = { readAll, readOne, create, update, remove, COLUMN_DATA };
