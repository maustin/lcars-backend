const COLUMN_DATA = [];
let database = require('../../database');

// get all (prob won't need this one)
function readAll(callback) {
	database.all('SELECT * FROM character_rank', callback);
}

// get single
function readOne(id, callback) {
	database.all('SELECT * FROM character_rank WHERE id = ?', [id], callback);
}

// get all with character id
function readAllWithCharacterId(id, callback) {
	database.all('SELECT character_rank.*, ranks.name AS "rank.name", ranks.id AS "rank.id" FROM character_rank JOIN ranks ON character_rank.rank_id = ranks.id WHERE character_id = ?', [id], callback);
}

// delete
function remove(id, callback) {
	database.run('DELETE FROM character_rank WHERE id = ?', [id], callback);
}

// create
function create(parameters, callback) {
	database.run('INSERT INTO character_rank ("character_id", "rank_id", "effective_date") VALUES(?, ?, ?)',
		[parameters.character_id, parameters.rank_id, parameters.effective_date], callback);
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

	database.run('UPDATE character_rank SET ' + setFields.join(', ') + ' WHERE id = ?', paramFields, callback);
}

database.all('PRAGMA table_info(character_rank)', (error, rows) => {
	if (error) console.error(error);
	else {
		rows.forEach(item => COLUMN_DATA.push(item));
	}
});

module.exports = { readAll, readOne, readAllWithCharacterId, create, update, remove, COLUMN_DATA };
