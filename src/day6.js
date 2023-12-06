import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export async function extractAndTrimLines(filename) {
	const bufferData = await readFile(filename);
	const lines = bufferData.toString().split('\n');
	return lines;
}

export function timeToDistance(time, timeLimit) {
	if (time >= timeLimit || time < 1) {
		return 0;
	}
	return (timeLimit - time) * time;
}

const findNumbers = /\d+/g;

export async function readRaces(filename) {
	const lines = await extractAndTrimLines(filename);
	const timeNumbers = [...lines[0].matchAll(findNumbers)].map(
		(match) => match[0],
	);
	const distanceNumbers = [...lines[1].matchAll(findNumbers)].map(
		(match) => match[0],
	);
	return {
		timeLimits: timeNumbers.map(Number),
		distances: distanceNumbers.map(Number),
	};
}

export function countPossibleWins(races, index) {
	const timeLimit = races.timeLimits[index];
	const goal = races.distances[index];
	let time = 1;
	let win = 0;
	let lastDistance = 0;
	while (time < 100000000) {
		const distance = timeToDistance(time, timeLimit);
		if (distance === 0) return 0;
		if (distance === lastDistance) return win * 2;
		if (distance < lastDistance) return (win - 1) * 2 + 1;

		if (distance > goal) {
			win++;
		}
		time++;
		lastDistance = distance;
	}
	throw 'timeout';
}
