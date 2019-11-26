let Sequelize = require('sequelize');
let sequelize = new Sequelize('database',
	null, null, { storage: './database.db', dialect: 'sqlite', logging: false });

let models = ['characterRanks', 'characters', 'characterShips', 'ranks', 'ships', 'species'];
//let models = ['characters'];
let db = {};

models.forEach(modelName => {
	db[modelName] = sequelize.import('models/' + modelName + '/ormModelDef');
});

db.characters.belongsTo(db.species);

sequelize
.authenticate()
.then(() => {
	console.log('Sequelize connected');
})
.catch(err => {
	console.error('Sequelize failed to connect:', err);
});

//module.exports = orm;
db.orm = sequelize;

module.exports = db;