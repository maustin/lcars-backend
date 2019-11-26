let express = require('express');
let app = express();

let speciesRouter = require('./models/species/router');
let ranksRouter = require('./models/ranks/router');
let shipsRouter = require('./models/ships/router');
let charactersRouter = require('./models/characters/router');
let characterRanksRouter = require('./models/characterRanks/router');
let characterShipsRouter = require('./models/characterShips/router');

let ormSpeciesRouter = require('./models/species/ormRouter');
let ormRanksRouter = require('./models/ranks/ormRouter');
let ormShipsRouter = require('./models/ships/ormRouter');
let ormCharactersRouter = require('./models/characters/ormRouter');


app.use(express.json());

app.use('/species', speciesRouter);
app.use('/ranks', ranksRouter);
app.use('/ships', shipsRouter);
app.use('/characters', charactersRouter);
app.use('/characterranks', characterRanksRouter);
app.use('/characterships', characterShipsRouter);

app.use('/orm/species', ormSpeciesRouter);
app.use('/orm/ranks', ormRanksRouter);
app.use('/orm/ships', ormShipsRouter);
app.use('/orm/characters', ormCharactersRouter);

app.get('/', (request, response, next) => {
	response.send("Ohai!");
});

// test
//let orm = require('./sequelize');

module.exports = app;