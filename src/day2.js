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

const findGameId = /Game ([0-9]+)/;
const findRed = / ([0-9]+) red/;
const findBlue = / ([0-9]+) blue/;
const findGreen = / ([0-9]+) green/;

export function readLine(line) {
	const lineTokens = line.split(':');
	const gameId = findGameId.exec(lineTokens[0]);
	const lineValues = lineTokens[1].split(';');
	const values = lineValues.map((value) => {
		const rgb = {};
		if (findRed.test(value)) {
			rgb.red = parseInt(findRed.exec(value)[1]);
		}
		if (findBlue.test(value)) {
			rgb.blue = parseInt(findBlue.exec(value)[1]);
		}
		if (findGreen.test(value)) {
			rgb.green = parseInt(findGreen.exec(value)[1]);
		}
		return rgb;
	});
	return { [gameId[1]]: values };
}

export function isPossibleGame(game) {
	return !game.some((value) => {
		return value.red > 12 || value.blue > 14 || value.green > 13;
	});
}

export function miniPossibleGame(game) {
	return game.reduce(
		(acc, value) => {
			acc.red = Math.max(acc.red, value.red || 0);
			acc.blue = Math.max(acc.blue, value.blue || 0);
			acc.green = Math.max(acc.green, value.green || 0);
			return acc;
		},
		{ red: 0, blue: 0, green: 0 },
	);
}
