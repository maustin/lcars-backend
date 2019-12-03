const COLUMN_DATA = [];
let database = require('../../database');

// get all
function readAll(callback) {
	database.all('SELECT characters.*, species.name AS "species.name" FROM characters JOIN species ON characters.species_id = species.id', callback);
}

// get single
function readOne(id, callback) {
	database.get('SELECT characters.*, species.name AS "species.name" FROM characters JOIN species ON characters.species_id = species.id WHERE characters.id = ?', [id], callback);
}

// delete
function remove(id, callback) {
	database.get('SELECT id FROM characters WHERE id = ?', [id], (error, data) => {
		if (data)
			database.run('DELETE FROM characters WHERE id = ?', [id], callback);
		else
			callback(404, null);
	});
}

// create
function create(parameters, callback) {
	database.run('INSERT INTO characters ("name", "species_id", "gender", "dob", "actor", "image", "status", "user_generated") VALUES(?, ?, ?, ?, ?, ?, ?, 1)',
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

	database.get('SELECT id FROM characters WHERE id = ?', [id], (error, data) => {
		if (data)
			database.run('UPDATE characters SET ' + setFields.join(', ') + ' WHERE id = ?', paramFields, callback);
		else
			callback(404, null);
	});
}

database.all('PRAGMA table_info(characters)', (error, rows) => {
	if (error)
		console.error(error);
	else
		rows.forEach(item => COLUMN_DATA.push(item));
});

module.exports = { readAll, readOne, create, update, remove, COLUMN_DATA };
