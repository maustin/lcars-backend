const COLUMN_DATA = [];
let database = require('../../database');

// get all
function readAll(callback) {
	database.all('SELECT oid AS id, * FROM ships', callback);
}

// get single
function readOne(id, callback) {
	database.all('SELECT oid AS id, * FROM ships WHERE oid = ?', [id], callback);
}

// delete
function remove(id, callback) {
	database.run('DELETE FROM ships WHERE oid = ?', [id], callback);
}

// create
function create(parameters, callback) {
	database.run('INSERT INTO ships VALUES(?, ?, ?, ?, ?, 1)',
		[parameters.name, parameters.class, parameters.registry,
		parameters.status, parameters.image], callback);
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

	database.run('UPDATE ships SET ' + setFields.join(', ') + ' WHERE oid = ?', paramFields, callback);
}

database.all('PRAGMA table_info(ships)', (error, rows) => {
	if (error) console.error(error);
	else {
		rows.forEach(item => COLUMN_DATA.push(item));
	}
});

module.exports = { readAll, readOne, create, update, remove, COLUMN_DATA };
