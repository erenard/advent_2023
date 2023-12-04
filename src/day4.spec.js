import { beforeEach, describe, expect, test } from 'vitest';
import {
	extractAndTrimLines,
	readLine,
	scoreLine,
	sumScores,
	totalCards,
	winningCardCount,
} from './day4';
/*
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
*/
describe('day 3', () => {
	test('readLine', () => {
		expect(
			readLine('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'),
		).toEqual({
			cardNumber: 1,
			numbers: [41, 48, 83, 86, 17],
			winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
		});
		expect(
			readLine('Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'),
		).toEqual({
			cardNumber: 2,
			numbers: [13, 32, 20, 16, 61],
			winningNumbers: [61, 30, 68, 82, 17, 32, 24, 19],
		});
		expect(
			readLine('Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'),
		).toEqual({
			cardNumber: 3,
			numbers: [1, 21, 53, 59, 44],
			winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
		});
		expect(
			readLine('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'),
		).toEqual({
			cardNumber: 4,
			numbers: [41, 92, 73, 84, 69],
			winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
		});
		expect(
			readLine('Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'),
		).toEqual({
			cardNumber: 5,
			numbers: [87, 83, 26, 28, 32],
			winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
		});
		expect(
			readLine('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'),
		).toEqual({
			cardNumber: 6,
			numbers: [31, 18, 13, 56, 72],
			winningNumbers: [74, 77, 10, 23, 35, 67, 36, 11],
		});
	});
	test('scoreLine', () => {
		expect(
			scoreLine({
				cardNumber: 1,
				numbers: [41, 48, 83, 86, 17],
				winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
			}),
		).toEqual(8);
		expect(
			scoreLine({
				cardNumber: 2,
				numbers: [13, 32, 20, 16, 61],
				winningNumbers: [61, 30, 68, 82, 17, 32, 24, 19],
			}),
		).toEqual(2);
		expect(
			scoreLine({
				cardNumber: 3,
				numbers: [1, 21, 53, 59, 44],
				winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
			}),
		).toEqual(2);
		expect(
			scoreLine({
				cardNumber: 4,
				numbers: [41, 92, 73, 84, 69],
				winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
			}),
		).toEqual(1);
		expect(
			scoreLine({
				cardNumber: 5,
				numbers: [87, 83, 26, 28, 32],
				winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
			}),
		).toEqual(0);
		expect(
			scoreLine({
				cardNumber: 6,
				numbers: [31, 18, 13, 56, 72],
				winningNumbers: [74, 77, 10, 23, 35, 67, 36, 11],
			}),
		).toEqual(0);
	});
	test('sumScores', () => {
		expect(sumScores([8, 2, 2, 1, 0, 0])).toEqual(13);
	});
	test('part 1', async () => {
		const scores = (await extractAndTrimLines('src/day4.input.txt'))
			.map(readLine)
			.map(scoreLine);
		expect(sumScores(scores)).toBe(20107);
	});

	describe('with cards', () => {
		let cards = [];
		beforeEach(() => {
			cards = [
				readLine('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'),
				readLine('Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'),
				readLine('Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'),
				readLine('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'),
				readLine('Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'),
				readLine('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'),
			];
		});

		test('winningCardCount', () => {
			expect(winningCardCount(cards[0])).toBe(4);
			expect(winningCardCount(cards[1])).toBe(2);
			expect(winningCardCount(cards[2])).toBe(2);
			expect(winningCardCount(cards[3])).toBe(1);
			expect(winningCardCount(cards[4])).toBe(0);
			expect(winningCardCount(cards[5])).toBe(0);
		});

		test('totalCards', () => {
			expect(totalCards(cards)).toStrictEqual([1, 2, 4, 8, 14, 1]);
		});

		test('sum', () => {
			expect(totalCards(cards).reduce((a, b) => a + b, 0)).toBe(30);
		});
	});
	test('part 2', async () => {
		const cards = (await extractAndTrimLines('src/day4.input.txt')).map(
			readLine,
		);
		expect(totalCards(cards).reduce((a, b) => a + b, 0)).toBe(8172507);
	});
});
