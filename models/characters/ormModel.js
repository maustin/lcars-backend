const COLUMN_NAMES = ["id", "name", "species_id", "gender", "dob", "actor", "image", "status", "user_generated"];

let orm = require('../../sequelize');
let table = orm.characters;

function readAll(callback) {
	table.findAll({
		raw: true,
		include: [{
			model: orm.species,
			attributes: ['name']
		}]
	}).then(rows => {
		callback(null, rows);
	}).catch(error => {
		console.error('SEQUELIZE characters.readAll ERROR:', error);
		callback(error);
	});
}

function readOne(id, callback) {
	//table.findByPk(id).then(row => {
	table.findOne({
		where: { id: id },
		raw: true,
		include: [{
			model: orm.species,
			attributes: ['name']
		}]
	}).then(row => {
		console.log(row)
		callback(null, [row]);
	}).catch(error => {
		console.error('SEQUELIZE characters.readOne ERROR:', error);
		callback(error);
	});
}

// delete
function remove(id, callback) {
	table.destroy({ where: { id: id }}).then(numDeleted => {
		callback(null, numDeleted);
	}).catch(error => {
		console.error('SEQUELIZE characters.remove ERROR:', error);
		callback(error);
	});
}

// create
function create(parameters, callback) {
	table.create({
		name: parameters.name,
		species_id: parameters.species_id,
		gender: parameters.gender,
		dob: parameters.dob,
		actor: parameters.actor,
		image: parameters.image,
		status: parameters.status,
		user_generated: 1
	}).then(row => {
		callback(null);
	}).catch(error => {
		console.error('SEQUELIZE characters.create ERROR:', error);
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
		console.error('SEQUELIZE characters.update ERROR:', error);
		callback(error);
	});
}

module.exports = { readAll, readOne, remove, create, update, COLUMN_NAMES };