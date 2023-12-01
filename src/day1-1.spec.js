import { describe, expect, it, test } from 'vitest';
import { addFirstAndLastLineDigits, extractCoordinates } from './day1-1';

describe('day 1 problem 1', () => {
	test('addFirstAndLastLineDigits', () => {
		expect(addFirstAndLastLineDigits('')).toBe(0);
		expect(addFirstAndLastLineDigits('onevpntrrkggtjzsvktxxprsthd')).toBe(0);
		expect(addFirstAndLastLineDigits('1onevpntrrkggtjzsvktxxprsthd')).toBe(11);
		expect(addFirstAndLastLineDigits('1onevp3ntrrkggtjzsvktxxprsthd')).toBe(13);
		expect(addFirstAndLastLineDigits('1onevpn2trr2kgg4tjzsvkprsthd')).toBe(14);
	});
	it('should return 7', async () => {
		const result = await extractCoordinates('src/coordinates.txt');
		expect(result).toBe(54667);
	});
});
