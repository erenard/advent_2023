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

const findLastDigit =
	/.*([0-9]|one|two|three|four|five|six|seven|eight|nine).*$/;
const findFirstDigit = /([0-9]|one|two|three|four|five|six|seven|eight|nine)/g;

function parseDigit(digit) {
	switch (digit) {
		case 'one':
			return 1;
		case 'two':
			return 2;
		case 'three':
			return 3;
		case 'four':
			return 4;
		case 'five':
			return 5;
		case 'six':
			return 6;
		case 'seven':
			return 7;
		case 'eight':
			return 8;
		case 'nine':
			return 9;
		default:
			return parseInt(digit);
	}
}

export function addFirstAndLastLineDigits(line) {
	const digits = [...line.matchAll(findFirstDigit)];
	const firstDigit = digits[0]?.[0];
	const lastDigit = digits[digits.length - 1]?.[0];
	if (firstDigit && lastDigit) {
		return parseInt(parseDigit(firstDigit) + '' + parseDigit(lastDigit));
	}
	return 0;
}

export async function extractCoordinates(filename) {
	const lines = await extractAndTrimLines(filename);
	const values = lines.map(addFirstAndLastLineDigits);
	return values.reduce((a, b) => a + b, 0);
}
