import { beforeEach, describe, expect, test } from 'vitest';
import { countPossibleWins, readRaces, timeToDistance } from './day6';

/*
Time:      7  15   30
Distance:  9  40  200
*/
describe('day 6', () => {
	test('timeToDistance', async () => {
		expect(timeToDistance(0, 7)).toEqual(0);
		expect(timeToDistance(1, 7)).toEqual(6);
		expect(timeToDistance(2, 7)).toEqual(10);
		expect(timeToDistance(3, 7)).toEqual(12);
		expect(timeToDistance(4, 7)).toEqual(12);
		expect(timeToDistance(5, 7)).toEqual(10);
		expect(timeToDistance(6, 7)).toEqual(6);
		expect(timeToDistance(7, 7)).toEqual(0);
	});
	describe('with example', () => {
		let races;
		beforeEach(async () => {
			races = await readRaces('src/day6.example.txt');
		});
		test('readRaces', async () => {
			expect(races).toEqual({
				distances: [9, 40, 200],
				timeLimits: [7, 15, 30],
			});
		});
		test('countPossibleWins', () => {
			expect(countPossibleWins(races, 0)).toEqual(4);
			expect(countPossibleWins(races, 1)).toEqual(8);
			expect(countPossibleWins(races, 2)).toEqual(9);
		});
		test('part1', () => {
			const raceCount = races.timeLimits.length;
			let result = 1;
			for (let raceIndex = 0; raceIndex < raceCount; raceIndex++) {
				result *= countPossibleWins(races, raceIndex);
			}
			expect(result).toEqual(288);
		});
	});
	test('part1', async () => {
		const races = await readRaces('src/day6.input.txt');
		const raceCount = races.timeLimits.length;
		let result = 1;
		for (let raceIndex = 0; raceIndex < raceCount; raceIndex++) {
			const possibleWins = countPossibleWins(races, raceIndex);
			result *= possibleWins;
		}
		expect(result).toEqual(1731600);
	});
	test('part2', async () => {
		const races = await readRaces('src/day6.input.txt');
		races.timeLimits[0] = Number(
			races.timeLimits.reduce((a, b) => `${a}${b}`, ''),
		);
		races.distances[0] = Number(
			races.distances.reduce((a, b) => `${a}${b}`, ''),
		);
		const possibleWins = countPossibleWins(races, 0);
		expect(possibleWins).toEqual(40087680);
	});
});
