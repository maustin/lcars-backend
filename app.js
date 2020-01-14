let express = require('express');
let cors = require('cors');
let app = express();

let authRouter = require('./auth/router');
let speciesRouter = require('./models/species/router');
let ranksRouter = require('./models/ranks/router');
let shipsRouter = require('./models/ships/router');
let charactersRouter = require('./models/characters/router');
let characterRanksRouter = require('./models/characterRanks/router');
let characterShipsRouter = require('./models/characterShips/router');

/*let ormSpeciesRouter = require('./models/species/ormRouter');
let ormRanksRouter = require('./models/ranks/ormRouter');
let ormShipsRouter = require('./models/ships/ormRouter');
let ormCharactersRouter = require('./models/characters/ormRouter');
let ormCharacterRanksRouter = require('./models/characterRanks/ormRouter');
let ormCharacterShipsRouter = require('./models/characterShips/ormRouter');*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// console logging
app.use((req, res, next) => {
	console.log(`URL:${req.url} - METHOD:${req.method} - AT:${new Date().toLocaleString()}`);
	next();
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/species', speciesRouter);
app.use('/api/v1/ranks', ranksRouter);
app.use('/api/v1/ships', shipsRouter);
app.use('/api/v1/characters', charactersRouter);
app.use('/api/v1/characterranks', characterRanksRouter);
app.use('/api/v1/characterships', characterShipsRouter);

/*app.use('/orm/species', ormSpeciesRouter);
app.use('/orm/ranks', ormRanksRouter);
app.use('/orm/ships', ormShipsRouter);
app.use('/orm/characters', ormCharactersRouter);
app.use('/orm/characterranks', ormCharacterRanksRouter);
app.use('/orm/characterships', ormCharacterShipsRouter);*/

app.get('/', (request, response, next) => {
	response.send("Ohai!");
});

module.exports = app;