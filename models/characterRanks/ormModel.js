const COLUMN_NAMES = ["id", "character_id", "rank_id", "effective_date"];

let table = require('../../sequelize').characterRanks;

function readAll(callback) {
	table.findAll({ raw: true }).then(rows => {
		callback(null, rows);
	}).catch(error => {
		console.error('SEQUELIZE character_rank.readAll ERROR:', error);
		callback(error);
	});
}

function readOne(id, callback) {
	//table.findByPk(id).then(row => {
	table.findOne({ where: { id: id }, raw: true }).then(row => {
		callback(null, [row]);
	}).catch(error => {
		console.error('SEQUELIZE character_rank.readOne ERROR:', error);
		callback(error);
	});
}

// get all with character id
function readAllWithCharacterId(id, callback) {
	//table.findAll({ where: { }, raw: true})

	//database.all('SELECT character_rank.id AS id, ranks.name, ranks.id AS rank_id, effective_date FROM character_rank JOIN ranks ON character_rank.rank_id = ranks.id WHERE character_id = ?', [id], callback);
}

// delete
function remove(id, callback) {
	table.destroy({ where: { id: id }}).then(numDeleted => {
		callback(null, numDeleted);
	}).catch(error => {
		console.error('SEQUELIZE character_rank.remove ERROR:', error);
		callback(error);
	});
}

// create
function create(parameters, callback) {
	table.create({
		character_id: parameters.character_id,
		rank_id: parameters.rank_id,
		effective_date: parameters.effective_date
	}).then(row => {
		callback(null);
	}).catch(error => {
		console.error('SEQUELIZE character_rank.create ERROR:', error);
		callback(error);
	});
}

function update(parameters, callback) {
	let id = parameters.id;
	let updateObject = {};
	
	COLUMN_NAMES.forEach(column => {
		if (parameters[column] != undefined) {
			updateObject[column] = parameters[column];
		}
	});
	
	table.update(updateObject, {
		where: { id: id },
		returning: false
	}).then(rowsUpdated => {
		callback(null);
	}).catch(error => {
		console.error('SEQUELIZE character_rank.update ERROR:', error);
		callback(error);
	});
}

module.exports = { readAll, readOne, readAllWithCharacterId, remove, create, update, COLUMN_NAMES };