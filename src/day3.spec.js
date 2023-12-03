import { beforeEach, describe, expect, test } from 'vitest';
import {
	concatNumbersAndSymbols,
	extractAndTrimLines,
	findNumbersAdjacentToSymbol,
	isNumberAdjacentToSymbol,
	readLine,
} from './day3';
/*
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
*/
describe('day 3', () => {
	test('readLine', () => {
		expect(readLine('467..114..', 0)).toEqual({
			numbers: [
				{
					ends: 2,
					lineIndex: 0,
					starts: 0,
					text: '467',
				},
				{
					ends: 7,
					lineIndex: 0,
					starts: 5,
					text: '114',
				},
			],
			symbols: [],
		});
		expect(readLine('...*......', 1)).toEqual({
			numbers: [],
			symbols: [
				{
					ends: 3,
					lineIndex: 1,
					starts: 3,
					text: '*',
				},
			],
		});
		expect(readLine('..35..633.', 2)).toEqual({
			numbers: [
				{
					ends: 3,
					lineIndex: 2,
					starts: 2,
					text: '35',
				},
				{
					ends: 8,
					lineIndex: 2,
					starts: 6,
					text: '633',
				},
			],
			symbols: [],
		});
		expect(readLine('......#...', 3)).toEqual({
			numbers: [],
			symbols: [
				{
					ends: 6,
					lineIndex: 3,
					starts: 6,
					text: '#',
				},
			],
		});
		expect(readLine('617*......', 4)).toEqual({
			numbers: [
				{
					ends: 2,
					lineIndex: 4,
					starts: 0,
					text: '617',
				},
			],
			symbols: [
				{
					ends: 3,
					lineIndex: 4,
					starts: 3,
					text: '*',
				},
			],
		});
		expect(readLine('.....+.58.', 5)).toEqual({
			numbers: [
				{
					ends: 8,
					lineIndex: 5,
					starts: 7,
					text: '58',
				},
			],
			symbols: [
				{
					ends: 5,
					lineIndex: 5,
					starts: 5,
					text: '+',
				},
			],
		});
		expect(readLine('..592.....', 6)).toEqual({
			numbers: [
				{
					ends: 4,
					lineIndex: 6,
					starts: 2,
					text: '592',
				},
			],
			symbols: [],
		});
		expect(readLine('......755.', 7)).toEqual({
			numbers: [
				{
					ends: 8,
					lineIndex: 7,
					starts: 6,
					text: '755',
				},
			],
			symbols: [],
		});
		expect(readLine('...$.*....', 8)).toEqual({
			numbers: [],
			symbols: [
				{
					ends: 3,
					lineIndex: 8,
					starts: 3,
					text: '$',
				},
				{
					ends: 5,
					lineIndex: 8,
					starts: 5,
					text: '*',
				},
			],
		});
		expect(readLine('.664.598..', 9)).toEqual({
			numbers: [
				{
					ends: 3,
					lineIndex: 9,
					starts: 1,
					text: '664',
				},
				{
					ends: 7,
					lineIndex: 9,
					starts: 5,
					text: '598',
				},
			],
			symbols: [],
		});
	});
	test('concatNumbersAndSymbols', () => {
		expect(
			concatNumbersAndSymbols([
				{ numbers: ['a', 'b'], symbols: ['c', 'd'] },
				{ numbers: ['e', 'f'], symbols: ['g', 'h'] },
				{ numbers: ['i', 'j'], symbols: ['k', 'l'] },
			]),
		).toEqual({
			numbers: ['a', 'b', 'e', 'f', 'i', 'j'],
			symbols: ['c', 'd', 'g', 'h', 'k', 'l'],
		});
	});
	describe('with numbersAndSymbols', () => {
		let numbersAndSymbols;
		beforeEach(() => {
			numbersAndSymbols = concatNumbersAndSymbols([
				readLine('467..114..', 0),
				readLine('...*......', 1),
				readLine('..35..633.', 2),
				readLine('......#...', 3),
				readLine('617*......', 4),
				readLine('.....+.58.', 5),
				readLine('..592.....', 6),
				readLine('......755.', 7),
				readLine('...$.*....', 8),
				readLine('.664.598..', 9),
			]);
		});
		test('isNumberAdjacentToSymbol', () => {
			numbersAndSymbols.numbers
				.filter((number) => ['114', '58'].includes(number.text))
				.forEach((number) => {
					expect(
						isNumberAdjacentToSymbol(number, numbersAndSymbols.symbols),
					).toBeFalsy();
				});
			numbersAndSymbols.numbers
				.filter((number) => !['114', '58'].includes(number.text))
				.forEach((number) => {
					expect(
						isNumberAdjacentToSymbol(number, numbersAndSymbols.symbols),
					).toBeTruthy();
				});
		});
		test('sumOfNumbersAdjacentToSymbols', () => {
			expect(
				numbersAndSymbols.numbers
					.filter((number) =>
						isNumberAdjacentToSymbol(number, numbersAndSymbols.symbols),
					)
					.reduce((sum, number) => sum + Number(number.text), 0),
			).toBe(4361);
		});
		test('part1 result', async () => {
			const numbersAndSymbols = concatNumbersAndSymbols(
				(await extractAndTrimLines('src/day3.input.txt')).map(readLine),
			);
			expect(
				numbersAndSymbols.numbers
					.filter((number) =>
						isNumberAdjacentToSymbol(number, numbersAndSymbols.symbols),
					)
					.reduce((sum, number) => sum + Number(number.text), 0),
			).toBe(528799);
		});
		test('findNumbersAdjacentToSymbol', () => {
			const asterixs = numbersAndSymbols.symbols.filter(
				(symbol) => symbol.text === '*',
			);
			expect(
				findNumbersAdjacentToSymbol(asterixs[0], numbersAndSymbols.numbers),
			).toEqual([
				{ ends: 2, lineIndex: 0, starts: 0, text: '467' },
				{ ends: 3, lineIndex: 2, starts: 2, text: '35' },
			]);
			expect(
				findNumbersAdjacentToSymbol(asterixs[1], numbersAndSymbols.numbers),
			).toEqual([{ ends: 2, lineIndex: 4, starts: 0, text: '617' }]);
			expect(
				findNumbersAdjacentToSymbol(asterixs[2], numbersAndSymbols.numbers),
			).toEqual([
				{ ends: 8, lineIndex: 7, starts: 6, text: '755' },
				{ ends: 7, lineIndex: 9, starts: 5, text: '598' },
			]);
			expect(asterixs.length).toBe(3);
		});
		test('sum of the products of numbers adjacent to asterix', async () => {
			const asterixs = numbersAndSymbols.symbols.filter(
				(symbol) => symbol.text === '*',
			);
			expect(
				asterixs
					.map((asterix) =>
						findNumbersAdjacentToSymbol(asterix, numbersAndSymbols.numbers),
					)
					.filter((numbers) => numbers.length === 2)
					.map((numbers) => Number(numbers[0].text) * Number(numbers[1].text))
					.reduce((sum, number) => sum + number, 0),
			).toBe(467835);
		});
		test('part2 result', async () => {
			const numbersAndSymbols = concatNumbersAndSymbols(
				(await extractAndTrimLines('src/day3.input.txt')).map(readLine),
			);
			const asterixs = numbersAndSymbols.symbols.filter(
				(symbol) => symbol.text === '*',
			);
			expect(
				asterixs
					.map((asterix) =>
						findNumbersAdjacentToSymbol(asterix, numbersAndSymbols.numbers),
					)
					.filter((numbers) => numbers.length === 2)
					.map((numbers) => Number(numbers[0].text) * Number(numbers[1].text))
					.reduce((sum, number) => sum + number, 0),
			).toBe(84907174);
		});
	});
});
