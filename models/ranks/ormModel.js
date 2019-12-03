// While the raw SQL versions get column names from the db,
// in sequelize we need to know the names ahead of time for the mapping.
// So there's no reason to populate it dynamically; the fields are already
// hardcoded in the table define.
const COLUMN_NAMES = ["id", "name", "user_generated"];

let orm = require('../../sequelize');
let table = orm.ranks;

function readAll(callback) {
	table.findAll({
		raw: true
	}).then(rows => {
		callback(null, rows);
	}).catch(error => {
		console.error('SEQUELIZE ranks.readAll ERROR:', error);
		callback(error);
	});
}

function readOne(id, callback) {
	//table.findByPk(id).then(row => {
	table.findOne({
		where: { id: id },
		raw: true
	}).then(row => {
		callback(null, row);
	}).catch(error => {
		console.error('SEQUELIZE ranks.readOne ERROR:', error);
		callback(error);
	});
}

// delete
function remove(id, callback) {
	table.destroy({ where: { id: id }}).then(numDeleted => {
		callback(null, numDeleted);// returns 0 if nothing deleted
	}).catch(error => {
		console.error('SEQUELIZE ranks.remove ERROR:', error);
		callback(error);
	});
}

// create
function create(parameters, callback) {
	table.create({
		name: parameters.name,
		user_generated: 1
	}).then(row => {
		// raw sql doesn't return the result, so we won't either
		//callback(null, row.get({ plain: true }));
		callback(null, row);
	}).catch(error => {
		console.error('SEQUELIZE ranks.create ERROR:', error);
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
		console.error('SEQUELIZE ranks.update ERROR:', error);
		callback(error);
	});
}

module.exports = { readAll, readOne, remove, create, update, COLUMN_NAMES };