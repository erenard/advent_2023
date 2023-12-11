import { describe, expect, test } from 'vitest';
import {
	extractAndTrimLines,
	findStartPosition,
	findLoop,
	expandRightAndLeftHandedPositions,
} from './day10';

describe('day 10', () => {
	test('part1.0', () => {
		const lines = [
			'..F7.',
			'.FJ|.',
			'SJ.L7',
			'|F--J',
			'LJ...', //pl
		];
		const startPosition = findStartPosition(lines);
		expect(startPosition).toStrictEqual({
			x: 0,
			y: 2,
		});
		const { loop } = findLoop(lines, startPosition);
		expect(loop.length).toBe(16);
	});
	test('part1.1', () => {
		const lines = ['7-F7-', '.FJ|7', 'SJLL7', '|F--J', 'LJ.LJ'];
		const startPosition = findStartPosition(lines);
		expect(startPosition).toStrictEqual({
			x: 0,
			y: 2,
		});
		const { loop } = findLoop(lines, startPosition);
		expect(loop.length).toBe(16);
	});
	test('part1.2', async () => {
		const lines = await extractAndTrimLines('src/day10.input.txt');
		const startPosition = findStartPosition(lines);
		expect(startPosition).toStrictEqual({
			x: 31,
			y: 26,
		});
		const { loop } = findLoop(lines, startPosition);
		expect(loop.length / 2).toBe(6599);
	});
	test('part2.0', () => {
		const lines = [
			'...........',
			'.S-------7.',
			'.|F-----7|.',
			'.||OOOOO||.',
			'.||OOOOO||.',
			'.|L-7OF-J|.',
			'.|II|O|II|.',
			'.L--JOL--J.',
			'.....O.....',
		];
		const startPosition = findStartPosition(lines);
		expect(startPosition).toStrictEqual({
			x: 1,
			y: 1,
		});
		const { loop, rightHandedPositions, leftHandedPositions } = findLoop(
			lines,
			startPosition,
		);
		const innerLoopPositions = expandRightAndLeftHandedPositions(
			lines,
			loop,
			rightHandedPositions,
			leftHandedPositions,
		);
		expect(innerLoopPositions.length).toEqual(4);
	});
	test('part2.x', async () => {
		const lines = await extractAndTrimLines('src/day10.input.txt');
		const startPosition = findStartPosition(lines);
		expect(startPosition).toStrictEqual({
			x: 31,
			y: 26,
		});
		const { loop, rightHandedPositions, leftHandedPositions } = findLoop(
			lines,
			startPosition,
		);
		const innerLoopPositions = expandRightAndLeftHandedPositions(
			lines,
			loop,
			rightHandedPositions,
			leftHandedPositions,
		);
		expect(innerLoopPositions.length).toEqual(477);
	});
});
