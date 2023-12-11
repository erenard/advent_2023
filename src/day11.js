import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

if (!String.prototype.splice) {
	/**
	 * {JSDoc}
	 *
	 * The splice() method changes the content of a string by removing a range of
	 * characters and/or adding new characters.
	 *
	 * @this {String}
	 * @param {number} start Index at which to start changing the string.
	 * @param {number} delCount An integer indicating the number of old chars to remove.
	 * @param {string} newSubStr The String that is spliced in.
	 * @return {string} A new string with the spliced substring.
	 */
	String.prototype.splice = function (start, delCount, newSubStr) {
		return (
			this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount))
		);
	};
}

export async function extractAndTrimLines(filename) {
	const bufferData = await readFile(filename);
	const lines = bufferData
		.toString()
		.split('\n')
		.filter((line) => line.trim());
	return lines;
}

export function findPlanets(lines) {
	const planets = [];
	for (let y = 0; y < lines.length; y++) {
		const row = lines[y];
		for (let column = 0; column < row.length; column++) {
			if (row[column] === '#') {
				planets.push({
					x: column,
					y: y,
				});
			}
		}
	}
	return planets;
}

export function findEmptyRowsAndCols(lines, planets) {
	const rowCount = lines.length;
	const columnCount = lines[0].length;
	const occupiedRows = planets.map((planet) => planet.y);
	const occupiedCols = planets.map((planet) => planet.x);
	const emptyRows = Array.from({ length: rowCount }, (_, i) => i).filter(
		(row) => !occupiedRows.includes(row),
	);
	const emptyCols = Array.from({ length: columnCount }, (_, i) => i).filter(
		(col) => !occupiedCols.includes(col),
	);
	return { emptyRows, emptyCols };
}

export function rangePlanetIndexPairs(planets) {
	const pairs = [];
	for (let i = 0; i < planets.length; i++) {
		for (let j = i + 1; j < planets.length; j++) {
			pairs.push([i, j]);
		}
	}
	return pairs;
}

export function expandGalaxy(lines, emptyRows, emptyCols) {
	const emptyRow = new Array(lines[0].length).fill('.').join('');
	emptyRows.reverse().forEach((row) => {
		lines.splice(row, 0, emptyRow);
	});

	emptyCols.reverse().forEach((col) => {
		lines.forEach((row, i) => {
			lines[i] = row.splice(col, 0, '.');
		});
	});

	return lines;
}

export function measureDistance(planet1, planet2) {
	return Math.abs(planet1.x - planet2.x) + Math.abs(planet1.y - planet2.y);
}

export function measureDistance2(
	planet1,
	planet2,
	emptyRows,
	emptyCols,
	multiplier,
) {
	const emptyRowsCount = emptyRows.filter(
		(row) =>
			(planet1.y < row && row < planet2.y) ||
			(planet2.y < row && row < planet1.y),
	).length;
	const emptyColsCount = emptyCols.filter(
		(col) =>
			(planet1.x < col && col < planet2.x) ||
			(planet2.x < col && col < planet1.x),
	).length;
	return (
		Math.abs(planet1.x - planet2.x) +
		Math.abs(planet1.y - planet2.y) +
		(multiplier - 1) * (emptyRowsCount + emptyColsCount)
	);
}
