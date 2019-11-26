let Sequelize = require('sequelize');
let orm = new Sequelize('database',
	null, null, { storage: './database.db', dialect: 'sqlite', logging: false });

orm
.authenticate()
.then(() => {
	console.log('Sequelize connected');
})
.catch(err => {
	console.error('Sequelize failed to connect:', err);
});

module.exports = orm;