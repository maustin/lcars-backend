let database = require('./database');

const buildCharactersTable = 'CREATE TABLE IF NOT EXISTS characters (name TEXT, species_id INTEGER, gender TEXT, dob TEXT, actor TEXT, image TEXT, status TEXT)';
const buildRankTable = 'CREATE TABLE IF NOT EXISTS ranks (name TEXT)';
const buildShipTable = 'CREATE TABLE IF NOT EXISTS ships (name TEXT, class TEXT, registry TEXT, status TEXT, owner TEXT, operator TEXT)';
const buildCharacterRankTable = 'CREATE TABLE IF NOT EXISTS character_rank (character_id INTEGER, rank_id INTEGER, effective_date TEXT)';
const buildCharacterShipTable = 'CREATE TABLE IF NOT EXISTS character_ship (character_id INTEGER, ship_id INTEGER, effective_date TEXT)';

const wipeCharacters = 'DELETE FROM characters';
const wipeRanks = 'DELETE FROM ranks';
const wipeShips = 'DELETE FROM ships';
const wipeCharacterRanks = 'DELETE FROM character_rank';
const wipeCharacterShips = 'DELETE FROM character_ship';

const insertRanks = 'INSERT INTO ranks VALUES ("Ensign"), ("Lieutenant Junior Grade"), ("Lieutenant"), ("Lieutenant Commander"), ("Commander"), ("Captain"), ("Admiral")';
// Enterprise D, DS9, Stargazer, 
const insertShips = 'INSERT INTO ships VALUES ()';


function runQuery(query) {
	return new Promise((resolve, reject) => {
		console.log('Query:', query);
		database.run(query, (error) => {
			if (error) {
				console.error('Failed:', error);
				reject(error);
			}
			else {
				console.log('OK');
				resolve(true);
			}
		});
	});
}

runQuery(buildCharactersTable)
	.then(runQuery(buildRankTable))
	.then(runQuery(buildShipTable))
	.then(runQuery(buildCharacterRankTable))
	.then(runQuery(buildCharacterShipTable))
	.catch(reason => {
		console.error('Promise chain failed:', reason);
});

