let database = require('./database');

const buildCharactersTable = 'CREATE TABLE IF NOT EXISTS characters (name TEXT, species_id INTEGER, gender TEXT, dob TEXT, actor TEXT, image TEXT, status TEXT)';
const buildSpeciesTable = 'CREATE TABLE IF NOT EXISTS species (name TEXT, origin TEXT)'
const buildRankTable = 'CREATE TABLE IF NOT EXISTS ranks (name TEXT)';
const buildShipTable = 'CREATE TABLE IF NOT EXISTS ships (name TEXT, class TEXT, registry TEXT, status TEXT, owner TEXT, operator TEXT)';
const buildCharacterRankTable = 'CREATE TABLE IF NOT EXISTS character_rank (character_id INTEGER, rank_id INTEGER, effective_date TEXT)';
const buildCharacterShipTable = 'CREATE TABLE IF NOT EXISTS character_ship (character_id INTEGER, ship_id INTEGER, effective_date TEXT)';

const wipeCharacters = 'DELETE FROM characters';
const wipeSpecies = 'DELETE FROM species';
const wipeRanks = 'DELETE FROM ranks';
const wipeShips = 'DELETE FROM ships';
const wipeCharacterRanks = 'DELETE FROM character_rank';
const wipeCharacterShips = 'DELETE FROM character_ship';

const insertSpecies = 'INSERT INTO species VALUES ("Human", "Earth"), ("Klingon", "Qu\'noS"), ("Betazoid", "Betazed"), ("Bajoran", "Bajor"), ("Ferengi", "Ferenginar"), ("Changling", "Unknown"), ("Soong-type Android", "N/A"), ("Trill", "Trill"), ("Human Augment", "Earth")';

const insertRanks = 'INSERT INTO ranks VALUES ("Ensign"), ("Lieutenant Junior Grade"), ("Lieutenant"), ("Lieutenant Commander"), ("Commander"), ("Captain"), ("Admiral")';

// Picard, Riker, Data, LaForge, Worf, Crusher, Troi, Yar, O'Brien, the boy
// Sisko, Kira, Dax (both), Bashir, Odo, Quark
// name, sp_id, gender, dob, actor, image, status
const insertCharacters = 'INSERT INTO characters VALUES '
+ '("Jean-Luc Picard", 1, "m", "July 13, 2305", "Patrick Stewart", "", "Active"), '
+ '("William T. Riker", 1, "m", "2335", "Jonathan Frakes", "", "Active"), '
+ '("Data", 7, "m", "February 2, 2338", "Brent Spiner", "", "Deceased, 2379"), '
+ '("Geordi LaForge", 1, "m", "February 16, 2335", "LeVar Burton", "", "Active"), '
+ '("Worf", 2, "m", "2340", "Michael Dorn", "", "Active"), '
+ '("Beverly Crusher", 1, "f", "October 13, 2324", "Gates McFadden", "", "Active"), '
+ '("Deana Troi", 3, "f", "March 29, 2336", "Marina Sirtis", "", "Active"), '
+ '("Natasha Yar", 1, "f", "2337", "Denise Crosby", "", "Deceased, 2364"), '
+ '("Miles O\'Brien", 1, "m", "September 2328", "Colm Meaney", "", "Active"), '
+ '("Wesley Crusher", 1, "m", "2348", "Wil Wheaton", "", "Active"), '
+ '("Benjamin Sisko", 1, "m", "2332", "Avery Brooks", "", "Missing, 2375"), '
+ '("Kira Nerys", 4, "f", "2343", "Nana Visitor", "", "Active"), '
+ '("Jadzia Dax", 8, "f", "2341", "Terry Farrell", "", "Deceased, 2374"), '
+ '("Ezri Dax", 8, "f", "", "Nicole de Boer", "", "Active"), '
+ '("Julian Bashir", 9, "m", "2341", "Alexander Siddig", "", "Active"), '
+ '("Odo", 6, "", "Unknown", "Rene Auberjonois", "", "Resigned, 2375"), '
+ '("Quark", 5, "m", "", "Armin Shimerman", "", "Active")';

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

