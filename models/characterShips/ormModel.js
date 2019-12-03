const COLUMN_NAMES = ["id", "character_id", "ship_id", "effective_date"];

let orm = require('../../sequelize');
let table = orm.characterShips;

function readAll(callback) {
	table.findAll({ raw: true }).then(rows => {
		callback(null, rows);
	}).catch(error => {
		console.error('SEQUELIZE character_ship.readAll ERROR:', error);
		callback(error);
	});
}

function readOne(id, callback) {
	//table.findByPk(id).then(row => {
	table.findOne({ where: { id: id }, raw: true }).then(row => {
		callback(null, row);
	}).catch(error => {
		console.error('SEQUELIZE character_ship.readOne ERROR:', error);
		callback(error);
	});
}

// get all with character id
function readAllWithCharacterId(id, callback) {
	table.findAll({
		where: { character_id: id },
		raw: true,
		freezeTableName: true,
		underscored: true,
		include: [{
			model: orm.ships,
			attributes: ['name', 'registry']
		}]
	}).then(rows => {
		callback(null, rows);
	}).catch(error => {
		console.error('SEQUELIZE character_ship.readAllWithCharacterId ERROR:', error);
		callback(error);
	});
}

// get all with ship id
function readAllWithShipId(id, callback) {
	// TODO: I'll complete this if the UI actually needs it.
	//database.all('SELECT character_ship.id, characters.id AS character_id, characters.name, effective_date FROM character_ship JOIN characters ON character_ship.character_id = characters.id WHERE ship_id = ?', [id], callback);
}

// delete
function remove(id, callback) {
	table.destroy({ where: { id: id }}).then(numDeleted => {
		callback(null, numDeleted);
	}).catch(error => {
		console.error('SEQUELIZE character_ship.remove ERROR:', error);
		callback(error);
	});
}

// create
function create(parameters, callback) {
	table.create({
		character_id: parameters.character_id,
		ship_id: parameters.ship_id,
		effective_date: parameters.effective_date
	}).then(row => {
		callback(null, row);
	}).catch(error => {
		console.error('SEQUELIZE character_ship.create ERROR:', error);
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
		callback(null, rowsUpdated);
	}).catch(error => {
		console.error('SEQUELIZE character_ship.update ERROR:', error);
		callback(error);
	});
}

module.exports = { readAll, readOne, readAllWithCharacterId, readAllWithShipId, remove, create, update, COLUMN_NAMES };