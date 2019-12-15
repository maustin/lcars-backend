let database = require('./database');

const buildCharactersTable = 'CREATE TABLE IF NOT EXISTS characters ('
+ 'id INTEGER PRIMARY KEY, '
+ 'name TEXT NOT NULL, '
+ 'species_id INTEGER, '
+ 'gender TEXT, '
+ 'dob TEXT, '
+ 'actor TEXT, '
+ 'image TEXT, '
+ 'status TEXT, '
+ 'user_generated INTEGER DEFAULT 0, '
+ 'FOREIGN KEY (species_id) REFERENCES species (id))';

const buildSpeciesTable = 'CREATE TABLE IF NOT EXISTS species ('
+ 'id INTEGER PRIMARY KEY, '
+ 'name TEXT, '
+ 'origin TEXT, '
+ 'name_generator TEXT DEFAULT NULL, '
+ 'user_generated INTEGER DEFAULT 0)';

const buildRankTable = 'CREATE TABLE IF NOT EXISTS ranks ('
+ 'id INTEGER PRIMARY KEY, '
+ 'name TEXT, '
+ 'user_generated INTEGER DEFAULT 0)';

const buildShipTable = 'CREATE TABLE IF NOT EXISTS ships ('
+ 'id INTEGER PRIMARY KEY, '
+ 'name TEXT, '
+ 'class TEXT, '
+ 'registry TEXT, '
+ 'status TEXT, '
+ 'image TEXT, '
+ 'user_generated INTEGER DEFAULT 0)';

const buildCharacterRankTable = 'CREATE TABLE IF NOT EXISTS character_rank ('
+ 'id INTEGER PRIMARY KEY, '
+ 'character_id INTEGER NOT NULL, '
+ 'rank_id INTEGER NOT NULL, '
+ 'effective_date TEXT, '
+ 'CONSTRAINT fk_CHAR FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE, '
+ 'CONSTRAINT fk_RANK FOREIGN KEY (rank_id) REFERENCES ranks (id) ON DELETE CASCADE)';

const buildCharacterShipTable = 'CREATE TABLE IF NOT EXISTS character_ship ('
+ 'id INTEGER PRIMARY KEY, '
+ 'character_id INTEGER NOT NULL, '
+ 'ship_id INTEGER NOT NULL, '
+ 'effective_date TEXT, '
+ 'CONSTRAINT fk_CHAR FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE, '
+ 'CONSTRAINT fk_SHIP FOREIGN KEY (ship_id) REFERENCES ships (id) ON DELETE CASCADE)';

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
const insertSpecies = 'INSERT INTO species ("name", "origin", "name_generator", "user_generated") VALUES '
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
const insertRanks = 'INSERT INTO ranks ("name", "user_generated") VALUES '
+ '("Civilian", 0), '
+ '("Ensign", 0), '
+ '("Lieutenant Junior Grade", 0), '
+ '("Lieutenant", 0), '
+ '("Lieutenant Commander", 0), '
+ '("Commander", 0), '
+ '("Captain", 0), '
+ '("Admiral", 0), '
+ '("Petty Officer", 0), '
+ '("Chief Petty Officer", 0), '
+ '("Senior Chief Petty Officer", 0)';

// name, sp_id, gender, dob, actor, image, status, user_generated
const insertCharacters = 'INSERT INTO characters '
+ '("name", "species_id", "gender", "dob", "actor", "image", "status", "user_generated") VALUES '
+ '("Jean-Luc Picard", 1, "m", "July 13, 2305", "Patrick Stewart", "", "Active", 0), '
+ '("William T. Riker", 1, "m", "2335", "Jonathan Frakes", "", "Active", 0), '
+ '("Data", 7, "m", "February 2, 2338", "Brent Spiner", "", "Deceased, 2379", 0), '
+ '("Geordi LaForge", 1, "m", "February 16, 2335", "LeVar Burton", "", "Active", 0), '
+ '("Worf", 2, "m", "2340", "Michael Dorn", "", "Active", 0), '
+ '("Beverly Crusher", 1, "f", "October 13, 2324", "Gates McFadden", "", "Active", 0), '
+ '("Deanna Troi", 3, "f", "March 29, 2336", "Marina Sirtis", "", "Active", 0), '
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

// name, class, registry, status, image, user_generated
const insertShips = 'INSERT INTO ships '
+ '("name", "class", "registry", "status", "image", "user_generated") VALUES '
+ '("USS Enterprise", "Galaxy-class", "NCC-1701-D", "Destroyed, 2371", "", 0), '
+ '("USS Enterprise", "Sovereign-class", "NCC-1701-E", "Active", "", 0), '
+ '("Deep Space 9", "Terok Nor-type", "", "Active", "", 0), '
+ '("USS Stargazer", "Constellation-class", "NCC-2893", "Recovered, 2364", "", 0), '
+ '("USS Pegasus", "Oberth-class", "NCC-53847", "Wrecked, 2358", "", 0), '
+ '("USS Potemkin", "Excelsior-class", "NCC-2005", "Active", "", 0), '
+ '("USS Hood", "Excelsior-class", "NCC-42296", "Active", "", 0), '
+ '("USS Trieste", "Merced-class", "NCC-37124", "Active", "", 0), '
+ '("USS Victory", "Constellation-class", "NCC-9754", "Active", "", 0), '
+ '("USS Saratoga", "Miranda-class", "NCC-31911", "Destroyed, 2366", "", 0), '
+ '("USS Livingston", "", "", "", "", 0), '
+ '("USS Okinawa", "", "", "", "", 0), '
+ '("USS Titan", "Luna-class", "NCC-80102", "Active", "", 0)';
//sf medical?

// char id, rank id, eff date
const insertCharacterRanks = 'INSERT INTO character_rank (character_id, rank_id, effective_date) VALUES '
+ '(1, 2, "2327"), '
+ '(1, 7, "2333"), '
+ '(2, 2, "2357"), '
+ '(2, 4, "2360"), '
+ '(2, 5, "2361"), '
+ '(2, 6, "2364"), '
+ '(2, 7, "2379"), '
+ '(3, 2, "2348"), '
+ '(3, 4, "2351"), '
+ '(3, 5, "2363"), '
+ '(4, 2, "2357"), '
+ '(4, 4, "2365"), '
+ '(4, 5, "2366"), '
+ '(5, 3, "2364"), '
+ '(5, 4, "2366"), '
+ '(5, 5, "2371"), '
+ '(6, 2, "2350"), '
+ '(6, 6, "2362"), '
+ '(7, 2, "2359"), '
+ '(7, 5, "2364"), '
+ '(7, 6, "2370"), '
+ '(8, 4, "2364"), '
+ '(9, 10, "2364"), '
+ '(9, 11, "2369"), '
+ '(10, 3, "2379"), '
+ '(11, 2, "2354"), '
+ '(11, 4, "2357"), '
+ '(11, 5, "2362"), '
+ '(11, 6, "2369"), '
+ '(11, 7, "2371")';

// char id, ship id, eff date
const insertCharacterShips = 'INSERT INTO character_ship (character_id, ship_id, effective_date) VALUES '
+ '(1, 4, "2333"), '
+ '(1, 1, "2364"), '
+ '(1, 2, "2372"), '
+ '(2, 5, "2357"), '
+ '(2, 6, "2361"), '
+ '(2, 7, "2363"), '
+ '(2, 1, "2364"), '
+ '(2, 2, "2372"), '
+ '(2, 13, "2379"), '
+ '(3, 8, "2349"), '
+ '(3, 1, "2364"), '
+ '(3, 2, "2372"), '
+ '(4, 9, "2358"), '
+ '(4, 7, "2361"), '
+ '(4, 1, "2364"), '
+ '(4, 2, "2372"), '
+ '(5, 1, "2364"), '
+ '(5, 3, "2372"), '
+ '(6, 1, "2364"), '
+ '(6, 2, "2372"), '
+ '(7, 1, "2364"), '
+ '(7, 2, "2372"), '
+ '(7, 13, "2379"), '
+ '(8, 1, "2364"), '
+ '(9, 1, "2364"), '
+ '(9, 3, "2369"), '
+ '(10, 1, "2364"), '
+ '(11, 11, "2357"), '
+ '(11, 12, "2362"), '
+ '(11, 10, "2365"), '
+ '(11, 3, "2369")';


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
// TODO: Why not delete the file in here?

let queries = [buildSpeciesTable, buildRankTable, buildShipTable,
		buildCharactersTable, buildCharacterShipTable, buildCharacterRankTable,
		insertSpecies, insertRanks, insertShips, insertCharacters,
		insertCharacterRanks, insertCharacterShips];

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

// Homepage
// - Login/Create Account
// - Profile
// - Search
// - About?
// Login
// - This could bea drop down overlay
// - Username, password, login button
// - Forgot link
// Create Account
// - Username
// - Email
// - Password
// - Repeat Password
// Profile
// - Image
// - Name
// - Species
// - Rank
// - API key
// About
// - Maybe?
// Search
// * If not logged in, as guest
// * Guest limits options to just searching
// * Logged in allows creation and deletion
// - Characters
// - Ships
// - Species

