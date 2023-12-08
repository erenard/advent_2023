import { beforeEach, describe, expect, test } from 'vitest';
import {
	countSteps,
	stepIterator,
	readGraphLines,
	extractAndTrimLines,
	countMultiSteps,
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
	test('6 multi step example', async () => {
		const sequenceLine = 'LR';
		const iterator = stepIterator(sequenceLine);
		const graphLines = [
			'11A = (11B, XXX)',
			'11B = (XXX, 11Z)',
			'11Z = (11B, XXX)',
			'22A = (22B, XXX)',
			'22B = (22C, 22C)',
			'22C = (22Z, 22Z)',
			'22Z = (22B, 22B)',
			'XXX = (XXX, XXX)',
		];
		const graph = readGraphLines(graphLines);
		const startingPoints = Object.keys(graph).filter(
			(key) => key.substring(2) === 'A',
		);
		expect(startingPoints).toEqual(['11A', '22A']);
		expect(countMultiSteps(iterator, graph, startingPoints)).toEqual(6);
	});
	test('part2', async () => {
		const lines = await extractAndTrimLines('src/day8.input.txt');
		const iterator = stepIterator(lines[0]);
		const graph = readGraphLines(lines.slice(1));
		const startingPoints = Object.keys(graph).filter(
			(key) => key.substring(2) === 'A',
		);
		const finishingPoints = Object.keys(graph).filter(
			(key) => key.substring(2) === 'Z',
		);
		expect(startingPoints).toEqual(['VBA', 'TVA', 'DVA', 'VPA', 'AAA', 'DTA']);
		expect(finishingPoints).toEqual(['DVZ', 'ZZZ', 'GGZ', 'HLZ', 'HSZ', 'XKZ']);
		expect(countMultiSteps(iterator, graph, ['VBA', 'TVA', 'DVA'])).toEqual(
			67172041,
		);
		expect(countMultiSteps(iterator, graph, ['VPA', 'AAA', 'DTA'])).toEqual(
			53796913,
		);
	});
});
