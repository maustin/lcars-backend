const COLUMN_DATA = [];
let database = require('../../database');

// get all
function readAll(callback) {
	database.all('SELECT oid AS id, * FROM characters', callback);
}

// get single
function readOne(id, callback) {
	database.all('SELECT oid AS id, * FROM characters WHERE oid = ?', [id], callback);
}

// delete
function remove(id, callback) {
	database.run('DELETE FROM characters WHERE oid = ?', [id], callback);
}

// create
function create(parameters, callback) {
	database.run('INSERT INTO characters VALUES(?, ?, ?, ?, ?, ?, ?, 1)',
		[parameters.name, parameters.species_id, parameters.gender,
		parameters.dob, parameters.actor, parameters.image, parameters.status], callback);
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

	database.run('UPDATE characters SET ' + setFields.join(', ') + ' WHERE oid = ?', paramFields, callback);
}

database.all('PRAGMA table_info(characters)', (error, rows) => {
	if (error) console.error(error);
	else {
		rows.forEach(item => COLUMN_DATA.push(item));
	}
});

module.exports = { readAll, readOne, create, update, remove, COLUMN_DATA };
