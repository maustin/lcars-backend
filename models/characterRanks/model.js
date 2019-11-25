const COLUMN_DATA = [];
let database = require('../../database');

// get all (prob won't need this one)
function readAll(callback) {
	database.all('SELECT oid AS id, * FROM character_rank', callback);
}

// get single
function readOne(id, callback) {
	database.all('SELECT oid AS id, * FROM character_rank WHERE oid = ?', [id], callback);
}

// get all with character id
function readAllWithCharacterId(id, callback) {
	database.all('SELECT character_rank.oid AS id, ranks.name, ranks.oid AS rank_id, effective_date FROM character_rank JOIN ranks ON character_rank.rank_id = ranks.oid WHERE character_id = ?', [id], callback);
}

// delete
function remove(id, callback) {
	database.run('DELETE FROM character_rank WHERE oid = ?', [id], callback);
}

// create
function create(parameters, callback) {
	database.run('INSERT INTO character_rank VALUES(?, ?, ?)',
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

	database.run('UPDATE character_rank SET ' + setFields.join(', ') + ' WHERE oid = ?', paramFields, callback);
}

database.all('PRAGMA table_info(character_rank)', (error, rows) => {
	if (error) console.error(error);
	else {
		rows.forEach(item => COLUMN_DATA.push(item));
	}
});

module.exports = { readAll, readOne, readAllWithCharacterId, create, update, remove, COLUMN_DATA };
