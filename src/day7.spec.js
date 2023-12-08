import { beforeEach, describe, expect, test } from 'vitest';
import { readHand, orderHands, extractAndTrimLines } from './day7';

/*
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
*/
describe('day 7', () => {
	test('readHand', () => {
		expect(readHand('32T3K 765')).toEqual({
			bid: 765,
			hand: '32T3K',
			sort: 'BAIBL',
			value: 1,
		});
		expect(readHand('T55J5 684')).toEqual({
			bid: 684,
			hand: 'T55J5',
			sort: 'IDDJD',
			value: 3,
		});
		expect(readHand('KK677 28')).toEqual({
			bid: 28,
			hand: 'KK677',
			sort: 'LLEFF',
			value: 2,
		});
		expect(readHand('KTJJT 220')).toEqual({
			bid: 220,
			hand: 'KTJJT',
			sort: 'LIJJI',
			value: 2,
		});
		expect(readHand('QQQJA 483')).toEqual({
			bid: 483,
			hand: 'QQQJA',
			sort: 'KKKJM',
			value: 3,
		});
	});
	test('orderHands', () => {
		expect(
			orderHands([
				'32T3K 765',
				'T55J5 684',
				'KK677 28',
				'KTJJT 220',
				'QQQJA 483',
			]).map((h) => h.hand + ' ' + h.bid),
		).toEqual(['32T3K 765', 'KTJJT 220', 'KK677 28', 'T55J5 684', 'QQQJA 483']);
	});
	test('part1', async () => {
		const lines = await extractAndTrimLines('src/day7.input.txt');
		expect(
			orderHands(lines)
				.map(({ bid }, index) => bid * (index + 1))
				.reduce((a, b) => a + b, 0),
		).toEqual(253205868);
	});
	test('orderHands with jokers', () => {
		expect(
			orderHands(
				['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483'],
				true,
			).map((h) => h.hand + ' ' + h.bid),
		).toEqual(['32T3K 765', 'KK677 28', 'T55J5 684', 'QQQJA 483', 'KTJJT 220']);
		expect(
			orderHands(
				['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483'],
				true,
			)
				.map(({ bid }, index) => bid * (index + 1))
				.reduce((a, b) => a + b, 0),
		).toEqual(5905);
	});
	test('Jokers cases', () => {
		expect(readHand('22222 28', true).value).toEqual(6);
		expect(readHand('22224 28', true).value).toEqual(5);
		expect(readHand('22244 28', true).value).toEqual(4);
		expect(readHand('22245 28', true).value).toEqual(3);
		expect(readHand('23235 28', true).value).toEqual(2);
		expect(readHand('23245 28', true).value).toEqual(1);

		expect(readHand('22J22 28', true).value).toEqual(6);
		expect(readHand('22J24 28', true).value).toEqual(5);
		expect(readHand('22J44 28', true).value).toEqual(4);
		expect(readHand('22J45 28', true).value).toEqual(3);
		expect(readHand('23J45 28', true).value).toEqual(1);

		expect(readHand('22JJ2 28', true).value).toEqual(6);
		expect(readHand('22JJ4 28', true).value).toEqual(5);
		expect(readHand('23JJ4 28', true).value).toEqual(3);

		expect(readHand('2JJJ2 28', true).value).toEqual(6);
		expect(readHand('2JJJ4 28', true).value).toEqual(5);

		expect(readHand('2JJJJ 28', true).value).toEqual(6);

		expect(readHand('JJJJJ 28', true).value).toEqual(6);
	});
	test('part2', async () => {
		const lines = await extractAndTrimLines('src/day7.input.txt');
		// orderHands(lines, true).filter(h => h.value === 6).forEach(h => {
		//     console.log(h.hand, h.hand.split('').filter(c => c === 'J').length);
		// });
		expect(
			orderHands(lines, true)
				.map(({ bid }, index) => bid * (index + 1))
				.reduce((a, b) => a + b, 0),
		).toEqual(253907829);
	});
});
