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

export function* stepIterator(line) {
	const steps = line.split('');
	let index = 0;
	while (index < steps.length) {
		yield steps[index];
		index++;
		if (index === steps.length) {
			index = 0;
		}
	}
}

export function readGraphLines(lines) {
	return lines
		.map((line) => [
			line.substring(0, 3),
			line.substring(7, 10),
			line.substring(12, 15),
		])
		.reduce((acc, tokens) => {
			if (acc[tokens[0]]) throw new Error(`Duplicate key ${tokens[0]}`);
			acc[tokens[0]] = tokens.slice(1);
			return acc;
		}, {});
}

export function countSteps(iterator, graph, from, to) {
	let steps = 0;
	let current = from;
	while (current !== to) {
		const direction = iterator.next().value;
		current = graph[current][direction === 'R' ? 1 : 0];
		steps++;
	}
	return steps;
}

export function countMultiSteps(iterator, graph, startingPoints) {
	let steps = 0;
	let current = startingPoints;
	while (current.some((point) => point.substring(2) !== 'Z')) {
		const direction = iterator.next().value;
		current = current.map((point) => {
			const next = graph[point][direction === 'R' ? 1 : 0];
			return next;
		});
		steps++;
	}
	return steps;
}
//
// const lines = await extractAndTrimLines('src/day8.input.txt');
// const iterator = stepIterator(lines[0]);
// const graph = readGraphLines(lines.slice(1));
// const startingPoints = Object.keys(graph).filter(
// 	(key) => key.substring(2) === 'A',
// );
// console.log(startingPoints);
// // countMultiSteps(iterator, graph, startingPoints);
