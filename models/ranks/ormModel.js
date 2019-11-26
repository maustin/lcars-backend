// While the raw SQL versions get column names from the db,
// in sequelize we need to know the names ahead of time for the mapping.
// So there's no reason to populate it dynamically; the fields are already
// hardcoded in the table define.
const COLUMN_DATA = ["id", "name", "species_id", "user_generated"];

let Sequelize = require('sequelize');
let orm = require('../../sequelize');
let table = orm.define('ranks', {
	id: { type: Sequelize.INTEGER, primaryKey: true },
	name: Sequelize.STRING,
	species_id: Sequelize.INTEGER,
	user_generated: Sequelize.INTEGER
}, { timestamps: false });

function readAll(callback) {
	table.findAll({ raw: true }).then(rows => {
		callback(null, rows);
	}).catch(error => {
		console.error('SEQUELIZE ranks.readAll ERROR:', error);
		callback(error);
	});
}

function readOne(id, callback) {
	//table.findByPk(id).then(row => {
	table.findOne({ where: { id: id }, raw: true }).then(row => {
		//console.log(row.get({ plain: true }));
		//console.log([row]);
		// wrapping this in an array to match raw sql return 
		callback(null, [row]);
	}).catch(error => {
		console.error('SEQUELIZE ranks.readOne ERROR:', error);
		callback(error);
	});
}

// delete
function remove(id, callback) {
	table.destroy({ where: { id: id }}).then(numDeleted => {
		callback(numDeleted);// returns 0 if nothing deleted
	}).catch(error => {
		console.error('SEQUELIZE ranks.remove ERROR:', error);
		callback(error);
	});
}

// create
function create(parameters, callback) {
	console.log('SEQ CREATE');
	table.create({
		name: parameters.name,
		species_id: parameters.species_id,
		user_generated: 1
	}).then(row => {
		// raw sql doesn't return the result, so we won't either
		//callback(null, [row.get({ plain: true })]);
		callback(null);
	}).catch(error => {
		console.error('SEQUELIZE CREATE ERROR:', error);
		callback(error);
	});
}

function update(parameters, callback) {
	let id = parameters.id;
	let updateObject = {};
	
	COLUMN_DATA.forEach(column => {
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
		console.error('SEQUELIZE UPDATE ERROR:', error);
		callback(error);
	});
}

module.exports = { readAll, readOne, remove, create, update };