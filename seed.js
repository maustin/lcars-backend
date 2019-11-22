let database = require('./database');

const buildCharactersTable = 'CREATE TABLE IF NOT EXISTS characters ('
+ 'name TEXT NOT NULL, '
+ 'species_id INTEGER, '
+ 'gender TEXT, '
+ 'dob TEXT, '
+ 'actor TEXT, '
+ 'image TEXT, '
+ 'status TEXT, '
+ 'user_generated INTEGER DEFAULT 0, '
+ 'FOREIGN KEY (species_id) REFERENCES species (oid) ON UPDATE CASCADE)';

const buildSpeciesTable = 'CREATE TABLE IF NOT EXISTS species ('
+ 'name TEXT, '
+ 'origin TEXT, '
+ 'name_generator TEXT DEFAULT NULL, '
+ 'user_generated INTEGER DEFAULT 0)';

const buildRankTable = 'CREATE TABLE IF NOT EXISTS ranks ('
+ 'name TEXT, '
+ 'species_id INTEGER, '
+ 'user_generated INTEGER DEFAULT 0, '
+ 'FOREIGN KEY (species_id) REFERENCES species (oid) ON UPDATE CASCADE)';

const buildShipTable = 'CREATE TABLE IF NOT EXISTS ships ('
+ 'name TEXT, '
+ 'class TEXT, '
+ 'registry TEXT, '
+ 'status TEXT, '
+ 'image TEXT, '
+ 'user_generated INTEGER DEFAULT 0)';

const buildCharacterRankTable = 'CREATE TABLE IF NOT EXISTS character_rank ('
+ 'character_id INTEGER, '
+ 'rank_id INTEGER, '
+ 'effective_date TEXT, '
+ 'FOREIGN KEY (character_id) REFERENCES characters (oid) ON DELETE CASCADE ON UPDATE CASCADE, '
+ 'FOREIGN KEY (rank_id) REFERENCES ranks (oid) ON DELETE CASCADE ON UPDATE CASCADE)';

const buildCharacterShipTable = 'CREATE TABLE IF NOT EXISTS character_ship ('
+ 'character_id INTEGER NOT NULL, '
+ 'ship_id INTEGER NOT NULL, '
+ 'effective_date TEXT, '
+ 'FOREIGN KEY (character_id) REFERENCES characters (oid) ON DELETE CASCADE ON UPDATE CASCADE, '
+ 'FOREIGN KEY (ship_id) REFERENCES ships (oid) ON DELETE CASCADE ON UPDATE CASCADE)';

const wipeCharacters = 'DELETE FROM characters';
const wipeSpecies = 'DELETE FROM species';
const wipeRanks = 'DELETE FROM ranks';
const wipeShips = 'DELETE FROM ships';
const wipeCharacterRanks = 'DELETE FROM character_rank';
const wipeCharacterShips = 'DELETE FROM character_ship';

// TODO: Consider adding Vulcan, Cardassian, Romulan, Borg
// Name Generators:
// https://donjon.bin.sh/scifi/name/star_trek.html
// https://www.fantasynamegenerators.com/star-trek-betazoid-names.php
const insertSpecies = 'INSERT INTO species VALUES '
+ '("Human", "Earth", NULL, 0), '
+ '("Klingon", "Qu\'noS", NULL, 0), '
+ '("Betazoid", "Betazed", NULL, 0), '
+ '("Bajoran", "Bajor", NULL, 0), '
+ '("Ferengi", "Ferenginar", NULL, 0), '
+ '("Changling", "Unknown", NULL, 0), '
+ '("Soong-type Android", "N/A", NULL, 0), '
+ '("Trill", "Trill", NULL, 0), '
+ '("Human Augment", "Earth", NULL, 0)';

// TODO: Add non-human ranks (at least Bajoran, Civilian)
const insertRanks = 'INSERT INTO ranks VALUES '
+ '("Ensign", 1, 0), '
+ '("Lieutenant Junior Grade", 1, 0), '
+ '("Lieutenant", 1, 0), '
+ '("Lieutenant Commander", 1, 0), '
+ '("Commander", 1, 0), '
+ '("Captain", 1, 0), '
+ '("Admiral", 1, 0)';

// name, sp_id, gender, dob, actor, image, status, user_generated
const insertCharacters = 'INSERT INTO characters VALUES '
+ '("Jean-Luc Picard", 1, "m", "July 13, 2305", "Patrick Stewart", "", "Active", 0), '
+ '("William T. Riker", 1, "m", "2335", "Jonathan Frakes", "", "Active", 0), '
+ '("Data", 7, "m", "February 2, 2338", "Brent Spiner", "", "Deceased, 2379", 0), '
+ '("Geordi LaForge", 1, "m", "February 16, 2335", "LeVar Burton", "", "Active", 0), '
+ '("Worf", 2, "m", "2340", "Michael Dorn", "", "Active", 0), '
+ '("Beverly Crusher", 1, "f", "October 13, 2324", "Gates McFadden", "", "Active", 0), '
+ '("Deana Troi", 3, "f", "March 29, 2336", "Marina Sirtis", "", "Active", 0), '
+ '("Natasha Yar", 1, "f", "2337", "Denise Crosby", "", "Deceased, 2364", 0), '
+ '("Miles O\'Brien", 1, "m", "September 2328", "Colm Meaney", "", "Active", 0), '
+ '("Wesley Crusher", 1, "m", "2348", "Wil Wheaton", "", "Active", 0), '
+ '("Benjamin Sisko", 1, "m", "2332", "Avery Brooks", "", "Missing, 2375", 0), '
+ '("Kira Nerys", 4, "f", "2343", "Nana Visitor", "", "Active", 0), '
+ '("Jadzia Dax", 8, "f", "2341", "Terry Farrell", "", "Deceased, 2374", 0), '
+ '("Ezri Dax", 8, "f", "", "Nicole de Boer", "", "Active", 0), '
+ '("Julian Bashir", 9, "m", "2341", "Alexander Siddig", "", "Active", 0), '
+ '("Odo", 6, "", "Unknown", "Rene Auberjonois", "", "Resigned, 2375", 0), '
+ '("Quark", 5, "m", "", "Armin Shimerman", "", "Active", 0)';

// name, class, registry, status, image
const insertShips = 'INSERT INTO ships VALUES '
+ '("USS Enterprise", "Galaxy-class", "NCC-1701-D", "Destroyed, 2371", "", 0), '
+ '("USS Enterprise", "Sovereign-class", "NCC-1701-E", "Active", "", 0), '
+ '("Deep Space 9", "Terok Nor-type", "", "Active", "", 0), '
+ '("USS Stargazer", "Constellation-class", "NCC-2893", "Recovered, 2364", "", 0), '
+ '("USS Pegasus", "Oberth-class", "NCC-53847", "Wrecked, 2358", "", 0), '
+ '("USS Potemkin", "Excelsior-class", "NCC-2005", "Active", "", 0), '
+ '("USS Hood", "Excelsior-class", "NCC-42296", "Active", "", 0), '
+ '("USS Trieste", "Merced-class", "NCC-37124", "Active", "", 0), '
+ '("USS Victory", "Constellation-class", "NCC-9754", "Active", "", 0), '
+ '("USS Saratoga", "Miranda-class", "NCC-31911", "Destroyed, 2366", "", 0)';

function runQuery(query) {
	return new Promise((resolve, reject) => {
		console.log('Query', query);
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

// For now, not using the wipes. Just trash the database if you wanna rebuild.
let queries = [buildSpeciesTable, buildRankTable, buildShipTable,
		buildCharactersTable, buildCharacterShipTable, buildCharacterRankTable,
		insertSpecies, insertRanks, insertShips, insertCharacters];

async function runQueries() {
	for (const query of queries) {
		try {
			await runQuery(query);
		}
		catch (error) {
			//console.error("Caught promise error:", error);
			// runQuery already logs error
		}
	}
}

runQueries();
