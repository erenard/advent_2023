import { describe, expect, test } from 'vitest';
import {
	readAlmanac,
	extractAndTrimLines,
	findMapSection,
	seedToLocation,
} from './day5';

import { setFlagsFromString } from 'v8';
import { runInNewContext } from 'vm';

setFlagsFromString('--expose_gc');
const gc = runInNewContext('gc'); // nocommit

/*
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
 */
describe('day 5', () => {
	test('findMapSection', async () => {
		const lines = await extractAndTrimLines('src/day5.example.txt');
		expect(findMapSection(lines, 'seed-to-soil')).toEqual([
			'50 98 2',
			'52 50 48',
		]);
		expect(findMapSection(lines, 'soil-to-fertilizer')).toEqual([
			'0 15 37',
			'37 52 2',
			'39 0 15',
		]);
		expect(findMapSection(lines, 'fertilizer-to-water')).toEqual([
			'49 53 8',
			'0 11 42',
			'42 0 7',
			'57 7 4',
		]);
		expect(findMapSection(lines, 'water-to-light')).toEqual([
			'88 18 7',
			'18 25 70',
		]);
		expect(findMapSection(lines, 'light-to-temperature')).toEqual([
			'45 77 23',
			'81 45 19',
			'68 64 13',
		]);
		expect(findMapSection(lines, 'temperature-to-humidity')).toEqual([
			'0 69 1',
			'1 0 69',
		]);
		expect(findMapSection(lines, 'humidity-to-location')).toEqual([
			'60 56 37',
			'56 93 4',
		]);
	});

	test('readAlmanac', async () => {
		const almanac = await readAlmanac('src/day5.example.txt');
		expect(almanac.seeds).toEqual([79, 14, 55, 13]);
		expect(almanac.seedToSoil).toEqual([
			[50, 98, 2],
			[52, 50, 48],
		]);
	});

	test('seedToLocation', async () => {
		const almanac = await readAlmanac('src/day5.example.txt');
		expect(seedToLocation(79, almanac)).toEqual(82);
		expect(seedToLocation(14, almanac)).toEqual(43);
		expect(seedToLocation(55, almanac)).toEqual(86);
		expect(seedToLocation(13, almanac)).toEqual(35);
	});

	test('example', async () => {
		const almanac = await readAlmanac('src/day5.example.txt');
		expect(
			Math.min(...almanac.seeds.map((seed) => seedToLocation(seed, almanac))),
		).toEqual(35);
	});

	test('part 1', async () => {
		const almanac = await readAlmanac('src/day5.input.txt');
		expect(
			Math.min(...almanac.seeds.map((seed) => seedToLocation(seed, almanac))),
		).toEqual(309796150);
	});

	test('part 2, example', async () => {
		const almanac = await readAlmanac('src/day5.example.txt');
		let result = 0;
		for (let i = 0; i < almanac.seeds.length / 2; i++) {
			const start = almanac.seeds[i * 2];
			const length = almanac.seeds[i * 2 + 1];
			for (let j = start; j < start + length; j++) {
				const location = seedToLocation(j, almanac);
				console.log(j, location, result);
				result = result ? Math.min(result, location) : location;
			}
			gc();
		}
		expect(result).toEqual(46);
	});

	test.only('part 2', async () => {
		const almanac = await readAlmanac('src/day5.input.txt');
		let result = 0;
		for (let i = 0; i < almanac.seeds.length / 2; i++) {
			const start = almanac.seeds[i * 2];
			const length = almanac.seeds[i * 2 + 1];
			for (let j = start; j < start + length; j++) {
				const location = seedToLocation(j, almanac);
				console.log(j, location, result);
				result = result ? Math.min(result, location) : location;
			}
			gc();
		}
		expect(result).toEqual(46);
	});
});
