const COLUMN_DATA = [];
let database = require('../../database');

// get all (prob won't need this one)
function readAll(callback) {
	database.all('SELECT * FROM character_ship', callback);
}

// get single
function readOne(id, callback) {
	database.all('SELECT * FROM character_ship WHERE id = ?', [id], callback);
}

// get all with character id
function readAllWithCharacterId(id, callback) {
	// Sequelize is doing **** with ship table name in it's response
	// to this query, turning "ships.X" into "ship.X". So to normalize the results,
	// we'll make the SQL version match it. :/
	database.all('SELECT character_ship.*, ships.name AS "ship.name", ships.registry AS "ship.registry", effective_date FROM character_ship JOIN ships ON character_ship.ship_id = ships.id WHERE character_id = ?', [id], callback);
}

// get all with ship id
function readAllWithShipId(id, callback) {
	database.all('SELECT character_ship.id, characters.id AS character_id, characters.name, effective_date FROM character_ship JOIN characters ON character_ship.character_id = characters.id WHERE ship_id = ?', [id], callback);	
}

// delete
function remove(id, callback) {
	database.run('DELETE FROM character_ship WHERE id = ?', [id], callback);
}

// create
function create(parameters, callback) {
	database.run('INSERT INTO character_ship ("character_id", "ship_id", "effective_date") VALUES(?, ?, ?)',
		[parameters.character_id, parameters.ship_id, parameters.effective_date], callback);
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

	database.run('UPDATE character_ship SET ' + setFields.join(', ') + ' WHERE id = ?', paramFields, callback);
}

database.all('PRAGMA table_info(character_ship)', (error, rows) => {
	if (error) console.error(error);
	else {
		rows.forEach(item => COLUMN_DATA.push(item));
	}
});

module.exports = { readAll, readOne, readAllWithCharacterId, readAllWithShipId, create, update, remove, COLUMN_DATA };
