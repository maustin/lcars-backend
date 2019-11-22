let database = require('./database');

const buildCharactersTable = 'CREATE TABLE IF NOT EXISTS characters ('
+ 'name TEXT NOT NULL, '
+ 'species_id INTEGER, '
+ 'gender TEXT, '
+ 'dob TEXT, '
+ 'actor TEXT, '
+ 'image TEXT, '
+ 'status TEXT, '
+ 'userGenerated INTEGER DEFAULT 0, '
+ 'FOREIGN KEY (species_id) REFERENCES species (oid))';

const buildSpeciesTable = 'CREATE TABLE IF NOT EXISTS species ('
+ 'name TEXT, '
+ 'origin TEXT, '
+ 'name_generator TEXT DEFAULT NULL)';

const buildRankTable = 'CREATE TABLE IF NOT EXISTS ranks ('
+ 'name TEXT, '
+ 'species_id INTEGER, '
+ 'FOREIGN KEY (species_id) REFERENCES species (oid))';

const buildShipTable = 'CREATE TABLE IF NOT EXISTS ships ('
+ 'name TEXT, '
+ 'class TEXT, '
+ 'registry TEXT, '
+ 'status TEXT, '
+ 'image TEXT)';

const buildCharacterRankTable = 'CREATE TABLE IF NOT EXISTS character_rank ('
+ 'character_id INTEGER, '
+ 'rank_id INTEGER, '
+ 'effective_date TEXT, '
+ 'FOREIGN KEY (character_id) REFERENCES characters (oid), '
+ 'FOREIGN KEY (rank_id) REFERENCES ranks (oid))';

const buildCharacterShipTable = 'CREATE TABLE IF NOT EXISTS character_ship ('
+ 'character_id INTEGER NOT NULL, '
+ 'ship_id INTEGER NOT NULL, '
+ 'effective_date TEXT, '
+ 'FOREIGN KEY (character_id) REFERENCES characters (oid), '
+ 'FOREIGN KEY (ship_id) REFERENCES ships (oid))';

const wipeCharacters = 'DELETE FROM characters';
const wipeSpecies = 'DELETE FROM species';
const wipeRanks = 'DELETE FROM ranks';
const wipeShips = 'DELETE FROM ships';
const wipeCharacterRanks = 'DELETE FROM character_rank';
const wipeCharacterShips = 'DELETE FROM character_ship';

// Consider adding Vulcan, Cardassian, Romulan, Borg
// Name Generators:
// https://donjon.bin.sh/scifi/name/star_trek.html
// https://www.fantasynamegenerators.com/star-trek-betazoid-names.php
const insertSpecies = 'INSERT INTO species VALUES '
+ '("Human", "Earth", NULL), '
+ '("Klingon", "Qu\'noS", NULL), '
+ '("Betazoid", "Betazed", NULL), '
+ '("Bajoran", "Bajor", NULL), '
+ '("Ferengi", "Ferenginar", NULL), '
+ '("Changling", "Unknown", NULL), '
+ '("Soong-type Android", "N/A", NULL), '
+ '("Trill", "Trill", NULL), '
+ '("Human Augment", "Earth", NULL)';

const insertRanks = 'INSERT INTO ranks VALUES '
+ '("Ensign", 1), '
+ '("Lieutenant Junior Grade", 1), '
+ '("Lieutenant", 1), '
+ '("Lieutenant Commander", 1), '
+ '("Commander", 1), '
+ '("Captain", 1), '
+ '("Admiral", 1)';

// Picard, Riker, Data, LaForge, Worf, Crusher, Troi, Yar, O'Brien, the boy
// Sisko, Kira, Dax (both), Bashir, Odo, Quark
// name, sp_id, gender, dob, actor, image, status
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

// Enterprise D, Enterprise E, DS9, Stargazer, Pegasus, Potemkin, Hood, Trieste, Victory, Saratoga
// name, class, registry, status, image
const insertShips = 'INSERT INTO ships VALUES '
+ '("USS Enterprise", "Galaxy-class", "NCC-1701-D", "Destroyed, 2371", ""), '
+ '("USS Enterprise", "Sovereign-class", "NCC-1701-E", "Active", ""), '
+ '("Deep Space 9", "Terok Nor-type", "", "Active", ""), '
+ '("USS Stargazer", "Constellation-class", "NCC-2893", "Recovered, 2364", ""), '
+ '("USS Pegasus", "Oberth-class", "NCC-53847", "Wrecked, 2358", ""), '
+ '("USS Potemkin", "Excelsior-class", "NCC-2005", "Active", ""), '
+ '("USS Hood", "Excelsior-class", "NCC-42296", "Active", ""), '
+ '("USS Trieste", "Merced-class", "NCC-37124", "Active", ""), '
+ '("USS Victory", "Constellation-class", "NCC-9754", "Active", ""), '
+ '("USS Saratoga", "Miranda-class", "NCC-31911", "Destroyed, 2366", "")';

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
let queries = [buildSpeciesTable, buildRankTable,
		buildShipTable, buildCharactersTable,
		insertSpecies, insertRanks,
		insertShips, insertCharacters];

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
