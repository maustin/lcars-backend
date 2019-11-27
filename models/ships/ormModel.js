const COLUMN_NAMES = ["id", "name", "class", "registry", "status", "image", "user_generated"];

let orm = require('../../sequelize');
let table = orm.ships;

function readAll(callback) {
	table.findAll({ raw: true }).then(rows => {
		callback(null, rows);
	}).catch(error => {
		console.error('SEQUELIZE ships.readAll ERROR:', error);
		callback(error);
	});
}

function readOne(id, callback) {
	//table.findByPk(id).then(row => {
	table.findOne({ where: { id: id }, raw: true }).then(row => {
		callback(null, [row]);
	}).catch(error => {
		console.error('SEQUELIZE ships.readOne ERROR:', error);
		callback(error);
	});
}

// delete
function remove(id, callback) {
	table.destroy({ where: { id: id }}).then(numDeleted => {
		callback(null, numDeleted);
	}).catch(error => {
		console.error('SEQUELIZE ships.remove ERROR:', error);
		callback(error);
	});
}

// create
function create(parameters, callback) {
	table.create({
		name: parameters.name,
		class: parameters.class,
		registry: parameters.registry,
		status: parameters.status,
		image: parameters.image,
		user_generated: 1
	}).then(row => {
		callback(null);
	}).catch(error => {
		console.error('SEQUELIZE ships.create ERROR:', error);
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
		console.error('SEQUELIZE ships.update ERROR:', error);
		callback(error);
	});
}

module.exports = { readAll, readOne, remove, create, update, COLUMN_NAMES };