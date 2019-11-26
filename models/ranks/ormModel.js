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
		console.log(rows);
		callback(null, rows);
	}).catch(error => {
		console.error('SEQ ERROR!', error);
		callback(error);
	});
}

function readOne(id, callback) {
	console.log('SEQUELIZE READ ONE');
	//table.findByPk(id).then(row => {
	table.findOne({ where: { id: id }, raw: true }).then(row => {
		//console.log(row.get({ plain: true }));
		//console.log([row]);
		// wrapping this in an array to match raw sql return 
		callback(null, [row]);
	}).catch(error => {
		console.error('SEQ ERROR!', error);
		callback(error);
	});
}

// delete
function remove(id, callback) {
	console.log('SEQ DELETE', id);
	table.destroy({ where: { id: id }}).then(numDeleted => {
		callback(numDeleted);// returns 0 if nothing deleted
	}).catch(error => {
		console.error('SEQUELIZE ERROR:', error);
		callback(error);
	});
}

// create
function create(parameters, callback) {
	//database.run('INSERT INTO ranks ("name", "species_id", "user_generated") VALUES(?, ?, 1)',
	//	[parameters.name, parameters.species_id], callback);
}

module.exports = { readAll, readOne, remove };