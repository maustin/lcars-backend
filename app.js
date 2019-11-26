let express = require('express');
let app = express();

let speciesRouter = require('./models/species/router');
let ranksRouter = require('./models/ranks/router');
let shipsRouter = require('./models/ships/router');
let charactersRouter = require('./models/characters/router');
let characterRanksRouter = require('./models/characterRanks/router');
let characterShipsRouter = require('./models/characterShips/router');

let ormRanksRouter = require('./models/ranks/ormRouter');

app.use(express.json());
app.use('/species', speciesRouter);
app.use('/ranks', ranksRouter);
app.use('/ships', shipsRouter);
app.use('/characters', charactersRouter);
app.use('/characterranks', characterRanksRouter);
app.use('/characterships', characterShipsRouter);

app.use('/ormranks', ormRanksRouter);

app.get('/', (request, response, next) => {
	response.send("Ohai!");
});

// test
//let orm = require('./sequelize');

module.exports = app;