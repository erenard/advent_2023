import { describe, expect, test } from 'vitest';
import {
	concatFirstAndLastDigits,
	extractCoordinates,
	sumUpLines,
	debug,
} from './day1-2';

describe('day 1 problem 1', () => {
	test('concatFirstAndLastDigits', () => {
		expect(concatFirstAndLastDigits('two1nine')).toBe('29');
		expect(concatFirstAndLastDigits('eightwothree')).toBe('83');
		expect(concatFirstAndLastDigits('abcone2threexyz')).toBe('13');
		expect(concatFirstAndLastDigits('xtwone3four')).toBe('24');
		expect(concatFirstAndLastDigits('4nineeightseven2')).toBe('42');
		expect(concatFirstAndLastDigits('zoneight234')).toBe('14');
		expect(concatFirstAndLastDigits('7pqrstsixteen')).toBe('76');

		expect(concatFirstAndLastDigits('sadfsdfgsdf8dfsgsdfgdsfgsdfg')).toBe('88');
		expect(concatFirstAndLastDigits('sadfsdfgsdfeightdfgdsfgsdfg')).toBe('88');
		expect(concatFirstAndLastDigits('')).toBe('00');
		expect(concatFirstAndLastDigits('nineight')).toBe('98');
	});
	test('sumUpLines', () => {
		expect(
			sumUpLines([
				'two1nine',
				'eightwothree',
				'abcone2threexyz',
				'xtwone3four',
				'4nineeightseven2',
				'zoneight234',
				'7pqrstsixteen',
			]),
		).toBe(281);
	});
	test('should return the answer', async () => {
		const result = await extractCoordinates('src/coordinates.txt');
		expect(result).toEqual(54203);
	});
});
