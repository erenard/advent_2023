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
		const next =
			iterator.next().value === 'R' ? graph[current][1] : graph[current][0];
		steps++;
		current = next;
	}
	return steps;
}

console.log('day 8');
const lines = await extractAndTrimLines('src/day8.input.txt');
const iterator = stepIterator(lines[0]);
const graph = readGraphLines(lines.slice(1));
console.log(countSteps(iterator, graph, 'AAA', 'ZZZ'));
