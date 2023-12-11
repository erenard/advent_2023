import { describe, expect, test } from 'vitest';
import {
	extractAndTrimLines,
	findPlanets,
	rangePlanetIndexPairs,
	findEmptyRowsAndCols,
	expandGalaxy,
	measureDistance,
	measureDistance2,
} from './day11';

describe('day 11', () => {
	test('findPlanets', () => {
		// ...#......
		// .......#..
		// #.........
		// ..........
		// ......#...
		// .#........
		// .........#
		// ..........
		// .......#..
		// #...#.....
		const lines = [
			'...#......',
			'.......#..',
			'#.........',
			'..........',
			'......#...',
			'.#........',
			'.........#',
			'..........',
			'.......#..',
			'#...#.....',
		];
		const planets = findPlanets(lines);
		expect(planets).toStrictEqual([
			{ x: 3, y: 0 },
			{ x: 7, y: 1 },
			{ x: 0, y: 2 },
			{ x: 6, y: 4 },
			{ x: 1, y: 5 },
			{ x: 9, y: 6 },
			{ x: 7, y: 8 },
			{ x: 0, y: 9 },
			{ x: 4, y: 9 },
		]);
		const { emptyRows, emptyCols } = findEmptyRowsAndCols(lines, planets);
		expect(emptyRows).toEqual([3, 7]);
		expect(emptyCols).toEqual([2, 5, 8]);
		const planetIndexPairs = rangePlanetIndexPairs(planets);
		expect(planetIndexPairs).toStrictEqual([
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4],
			[0, 5],
			[0, 6],
			[0, 7],
			[0, 8],
			[1, 2],
			[1, 3],
			[1, 4],
			[1, 5],
			[1, 6],
			[1, 7],
			[1, 8],
			[2, 3],
			[2, 4],
			[2, 5],
			[2, 6],
			[2, 7],
			[2, 8],
			[3, 4],
			[3, 5],
			[3, 6],
			[3, 7],
			[3, 8],
			[4, 5],
			[4, 6],
			[4, 7],
			[4, 8],
			[5, 6],
			[5, 7],
			[5, 8],
			[6, 7],
			[6, 8],
			[7, 8],
		]);
		const expanded = expandGalaxy(lines, emptyRows, emptyCols);
		expect(expanded).toStrictEqual([
			'....#........',
			'.........#...',
			'#............',
			'.............',
			'.............',
			'........#....',
			'.#...........',
			'............#',
			'.............',
			'.............',
			'.........#...',
			'#....#.......',
		]);
		const expandedPlanets = findPlanets(expanded);
		expect(
			rangePlanetIndexPairs(expandedPlanets)
				.map(([a, b]) =>
					measureDistance(expandedPlanets[a], expandedPlanets[b]),
				)
				.reduce((a, b) => a + b, 0),
		).toBe(374);
		expect(measureDistance(expandedPlanets[0], expandedPlanets[6])).toBe(15);
		expect(measureDistance(expandedPlanets[2], expandedPlanets[5])).toBe(17);
		expect(measureDistance(expandedPlanets[4], expandedPlanets[8])).toBe(9);
		expect(measureDistance(expandedPlanets[7], expandedPlanets[8])).toBe(5);
	});
	test('example 2', () => {
		const lines = [
			'....#........',
			'.........#...',
			'#............',
			'.............',
			'.............',
			'........#....',
			'.#...........',
			'............#',
			'.............',
			'.............',
			'.........#...',
			'#....#.......',
		];
		const { emptyRows, emptyCols } = findEmptyRowsAndCols(
			lines,
			findPlanets(lines),
		);
		expect(expandGalaxy(lines, emptyRows, emptyCols)).toStrictEqual([
			'......#............',
			'.............#.....',
			'#..................',
			'...................',
			'...................',
			'...................',
			'...................',
			'............#......',
			'.#.................',
			'..................#',
			'...................',
			'...................',
			'...................',
			'...................',
			'.............#.....',
			'#......#...........',
		]);
	});
	test('part1', async () => {
		const lines = await extractAndTrimLines('./src/day11.input.txt');
		const planets = findPlanets(lines);
		const { emptyRows, emptyCols } = findEmptyRowsAndCols(lines, planets);
		const expanded = expandGalaxy(lines, emptyRows, emptyCols);
		const expandedPlanets = findPlanets(expanded);
		expect(
			rangePlanetIndexPairs(expandedPlanets)
				.map(([a, b]) =>
					measureDistance(expandedPlanets[a], expandedPlanets[b]),
				)
				.reduce((a, b) => a + b, 0),
		).toBe(10292708);
	});
	test('part2.0', () => {
		const lines = [
			'...#......',
			'.......#..',
			'#.........',
			'..........',
			'......#...',
			'.#........',
			'.........#',
			'..........',
			'.......#..',
			'#...#.....',
		];
		const planets = findPlanets(lines);
		const { emptyRows, emptyCols } = findEmptyRowsAndCols(lines, planets);
		expect(
			rangePlanetIndexPairs(planets)
				.map(([a, b]) =>
					measureDistance2(planets[a], planets[b], emptyRows, emptyCols, 10),
				)
				.reduce((a, b) => a + b, 0),
		).toBe(1030);
		expect(
			rangePlanetIndexPairs(planets)
				.map(([a, b]) =>
					measureDistance2(planets[a], planets[b], emptyRows, emptyCols, 100),
				)
				.reduce((a, b) => a + b, 0),
		).toBe(8410);
	});
	test('part2.1', async () => {
		const lines = await extractAndTrimLines('./src/day11.input.txt');
		const planets = findPlanets(lines);
		const { emptyRows, emptyCols } = findEmptyRowsAndCols(lines, planets);
		expect(
			rangePlanetIndexPairs(planets)
				.map(([a, b]) =>
					measureDistance2(
						planets[a],
						planets[b],
						emptyRows,
						emptyCols,
						1000000,
					),
				)
				.reduce((a, b) => a + b, 0),
		).toBe(790194712336);
	});
});
