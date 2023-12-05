import fs from 'fs';
import util from 'util';
import { setFlagsFromString } from 'v8';
import { runInNewContext } from 'vm';

setFlagsFromString('--expose_gc');
const gc = runInNewContext('gc'); // nocommit

const readFile = util.promisify(fs.readFile);

export async function extractAndTrimLines(filename) {
	const bufferData = await readFile(filename);
	const lines = bufferData.toString().split('\n');
	return lines;
}

export function findMapSection(lines, title) {
	const startIndex = lines.findIndex((line) => line === `${title} map:`);
	const endIndex = lines.findIndex(
		(line, index) => index > startIndex && line === '',
	);
	return lines.slice(startIndex + 1, endIndex);
}

export function readMap(lines, title) {
	const sectionLines = findMapSection(lines, title);
	return sectionLines.map((line) => {
		return line.split(' ').map(Number);
	});
}

export async function readAlmanac(filename) {
	const lines = await extractAndTrimLines(filename);
	const seedsLine = lines[0];
	const seeds = seedsLine
		.split(' ')
		.map(Number)
		.filter((seed) => !isNaN(seed));

	const seedToSoil = readMap(lines, 'seed-to-soil');
	const soilToFertilizer = readMap(lines, 'soil-to-fertilizer');
	const fertilizerToWater = readMap(lines, 'fertilizer-to-water');
	const waterToLight = readMap(lines, 'water-to-light');
	const lightToTemperature = readMap(lines, 'light-to-temperature');
	const temperatureToHumidity = readMap(lines, 'temperature-to-humidity');
	const humidityToLocation = readMap(lines, 'humidity-to-location');

	return {
		seeds,
		seedToSoil,
		soilToFertilizer,
		fertilizerToWater,
		waterToLight,
		lightToTemperature,
		temperatureToHumidity,
		humidityToLocation,
	};
}

function walkMap(mapConstraints, source) {
	const constraint = mapConstraints.find(
		(constraint) =>
			constraint[1] <= source && constraint[1] + constraint[2] > source,
	);
	if (!constraint) {
		return source;
	}
	return constraint[0] + (source - constraint[1]);
}

export function seedToLocation(
	seed,
	{
		seedToSoil,
		soilToFertilizer,
		fertilizerToWater,
		waterToLight,
		lightToTemperature,
		temperatureToHumidity,
		humidityToLocation,
	},
) {
	const soil = walkMap(seedToSoil, seed);
	const fertilizer = walkMap(soilToFertilizer, soil);
	const water = walkMap(fertilizerToWater, fertilizer);
	const light = walkMap(waterToLight, water);
	const temperature = walkMap(lightToTemperature, light);
	const humidity = walkMap(temperatureToHumidity, temperature);
	return walkMap(humidityToLocation, humidity);
}

const almanac = await readAlmanac('src/day5.input.txt');
let result = 0;
for (let i = 0; i < almanac.seeds.length / 2; i++) {
	const start = almanac.seeds[i * 2];
	const length = almanac.seeds[i * 2 + 1];
	console.log(
		`${i} / ${almanac.seeds.length / 2}: from ${start} to ${start + length}`,
	);
	for (let j = start; j < start + length; j++) {
		const location = seedToLocation(j, almanac);
		result = result ? Math.min(result, location) : location;
		if (j % 10000000 === 0) {
			gc();
			console.log(
				`${j} / ${start + length}, heap: ${
					process.memoryUsage().heapUsed / 1024 / 1024
				}`,
			);
		}
	}
}
console.log(result);
