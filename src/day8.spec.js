import { beforeEach, describe, expect, test } from 'vitest';
import {
	countSteps,
	stepIterator,
	readGraphLines,
	extractAndTrimLines,
} from './day8';

/*
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
*/
describe('day 8', () => {
	test('2 step example', () => {
		const sequenceLine = 'RL';
		const it = stepIterator(sequenceLine);
		expect(it.next()).toEqual({ done: false, value: 'R' });
		expect(it.next()).toEqual({ done: false, value: 'L' });
		expect(it.next()).toEqual({ done: false, value: 'R' });
		expect(it.next()).toEqual({ done: false, value: 'L' });
		expect(it.next()).toEqual({ done: false, value: 'R' });
		expect(it.next()).toEqual({ done: false, value: 'L' });
		const graphLines = [
			'AAA = (BBB, CCC)',
			'BBB = (DDD, EEE)',
			'CCC = (ZZZ, GGG)',
			'DDD = (DDD, DDD)',
			'EEE = (EEE, EEE)',
			'GGG = (GGG, GGG)',
			'ZZZ = (ZZZ, ZZZ)',
		];
		const graph = readGraphLines(graphLines);
		expect(graph).toEqual({
			AAA: ['BBB', 'CCC'],
			BBB: ['DDD', 'EEE'],
			CCC: ['ZZZ', 'GGG'],
			DDD: ['DDD', 'DDD'],
			EEE: ['EEE', 'EEE'],
			GGG: ['GGG', 'GGG'],
			ZZZ: ['ZZZ', 'ZZZ'],
		});
		expect(countSteps(it, graph, 'AAA', 'ZZZ')).toEqual(2);
	});
	test('6 step example', () => {
		const sequenceLine = 'LLR';
		const it = stepIterator(sequenceLine);
		const graphLines = [
			'AAA = (BBB, BBB)',
			'BBB = (AAA, ZZZ)',
			'ZZZ = (ZZZ, ZZZ)',
		];
		const graph = readGraphLines(graphLines);
		expect(countSteps(it, graph, 'AAA', 'ZZZ')).toEqual(6);
	});
	test('part1', async () => {
		const lines = await extractAndTrimLines('src/day8.input.txt');
		const iterator = stepIterator(lines[0]);
		const graph = readGraphLines(lines.slice(1));
		expect(countSteps(iterator, graph, 'AAA', 'ZZZ')).toEqual(11309);
	});
});
