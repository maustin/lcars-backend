let Sequelize = require('sequelize');
let sequelize = new Sequelize('database',
	null, null, { storage: './database.db', dialect: 'sqlite', logging: false });

let models = ['characterRanks', 'characters', 'characterShips', 'ranks', 'ships', 'species'];
let db = {};

models.forEach(modelName => {
	db[modelName] = sequelize.import('models/' + modelName + '/ormModelDef');
});

db.characters.belongsTo(db.species);
db.ranks.belongsTo(db.species);
db.characterRanks.belongsTo(db.characters);
db.characterRanks.belongsTo(db.ranks);
db.characterShips.belongsTo(db.characters);
db.characterShips.belongsTo(db.ships);

sequelize
.authenticate()
.then(() => {
	console.log('Sequelize connected');
})
.catch(err => {
	console.error('Sequelize failed to connect:', err);
});

db.orm = sequelize;

module.exports = db;