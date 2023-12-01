import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export async function extractAndTrimLines(filename) {
	const bufferData = await readFile(filename);
	const lines = bufferData
		.toString()
		.split('\n')
		.map((line) => line.trim());
	return lines;
}

const findLastDigit = /.*([0-9]).*$/;
const findFirstDigit = /[0-9]/;

export function addFirstAndLastLineDigits(line) {
	const lastDigit = findLastDigit.exec(line);
	const firstDigit = findFirstDigit.exec(line);
	if (firstDigit && lastDigit) {
		return parseInt(firstDigit[0] + lastDigit[1]);
	}
	return 0;
}

export async function extractCoordinates(filename) {
	const lines = await extractAndTrimLines(filename);
	const values = lines.map(addFirstAndLastLineDigits);
	return values.reduce((a, b) => a + b, 0);
}
