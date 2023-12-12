import { describe, expect, test } from 'vitest';
import { extractAndTrimLines, countArrangements } from './day12';

describe('day 12', () => {
	test('part 1.0', () => {
		const lines = [
			'???.### 1,1,3',
			'.??..??...?##. 1,1,3',
			'?#?#?#?#?#?#?#? 1,3,1,6',
			'????.#...#... 4,1,1',
			'????.######..#####. 1,6,5',
			'?###???????? 3,2,1',
		];
		expect(lines.map(countArrangements)).toStrictEqual([1, 4, 1, 1, 4, 10]);
	});
	test('part 1.1', async () => {
		const lines = await extractAndTrimLines('./src/day12.input.txt');
		expect(
			lines.map(countArrangements).reduce((a, b) => a + b, 0),
		).toStrictEqual(8270);
	});
	test.only('part 2.0', () => {
		const lines = [
			'???.### 1,1,3',
			'.??..??...?##. 1,1,3',
			'?#?#?#?#?#?#?#? 1,3,1,6',
			'????.#...#... 4,1,1',
			'????.######..#####. 1,6,5',
			'?###???????? 3,2,1',
		];
		expect(lines.map(countArrangements)).toStrictEqual([1, 4, 1, 1, 4, 10]);
		expect(
			lines
				.map((line) => {
					const [a, b] = line.split(' ');
					return [[a, a].join('?'), [b, b].join(',')].join(' ');
				})
				.map(countArrangements),
		).toStrictEqual([1, 32, 1, 2, 20, 150]); // Fast until here
		expect(
			lines
				.map((line) => {
					const [a, b] = line.split(' ');
					return [[a, a, a].join('?'), [b, b, b].join(',')].join(' ');
				})
				.map(countArrangements),
		).toStrictEqual([1, 256, 1, 4, 100, 2250]); // 122926ms
	});
	test.skip('part 2.0', () => {
		const lines = [
			// '???.### 1,1,3',
			// '.??..??...?##. 1,1,3',
			// '?#?#?#?#?#?#?#? 1,3,1,6',
			// '????.#...#... 4,1,1',
			// '????.######..#####. 1,6,5',
			'?###???????? 3,2,1',
		];
		expect(
			lines
				.map((line) => {
					const [a, b] = line.split(' ');
					return [[a, a, a, a, a].join('?'), [b, b, b, b, b].join(',')].join(
						' ',
					);
				})
				.map(countArrangements)
				.reduce((a, b) => a + b, 0),
		).toEqual(525152);
	});
});
