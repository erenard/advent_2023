import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export async function extractAndTrimLines(filename) {
	const bufferData = await readFile(filename);
	const lines = bufferData
		.toString()
		.split('\n')
		.filter((line) => line.trim());
	return lines;
}

const findLastDigit =
	/.*([1-9]|one|two|three|four|five|six|seven|eight|nine).*$/;
const findFirstDigit = /[1-9]|one|two|three|four|five|six|seven|eight|nine/;

function parseDigit(digit) {
	switch (digit) {
		case 'one':
			return '1';
		case 'two':
			return '2';
		case 'three':
			return '3';
		case 'four':
			return '4';
		case 'five':
			return '5';
		case 'six':
			return '6';
		case 'seven':
			return '7';
		case 'eight':
			return '8';
		case 'nine':
			return '9';
		default:
			return digit;
	}
}

export function debug(line) {
	const firstDigit = findFirstDigit.exec(line)[0];
	const lastDigit = findLastDigit.exec(line)[1];
	return [firstDigit, lastDigit];
}

export function concatFirstAndLastDigits(line) {
	const firstDigit = findFirstDigit.exec(line)?.[0] ?? '0';
	const lastDigit = findLastDigit.exec(line)?.[1] ?? '0';
	return parseDigit(firstDigit) + parseDigit(lastDigit);
}

export function sumUpLines(lines) {
	const values = lines
		.map(concatFirstAndLastDigits)
		.map((number) => parseInt(number));
	return values.reduce((a, b) => a + b, 0);
}

export async function extractCoordinates(filename) {
	const lines = await extractAndTrimLines(filename);
	return sumUpLines(lines);
}
