import { describe, expect, test } from 'vitest';
import {
	readLine,
	isPossibleGame,
	extractAndTrimLines,
	miniPossibleGame,
} from './day2';

/*
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
*/
describe('day 2', () => {
	test('concatFirstAndLastDigits', () => {
		expect(
			readLine('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'),
		).toEqual({
			1: [{ blue: 3, red: 4 }, { red: 1, green: 2, blue: 6 }, { green: 2 }],
		});
		expect(
			readLine(
				'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
			),
		).toEqual({
			2: [
				{ blue: 1, green: 2 },
				{ green: 3, blue: 4, red: 1 },
				{ green: 1, blue: 1 },
			],
		});
		expect(
			readLine(
				'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
			),
		).toEqual({
			3: [
				{ green: 8, blue: 6, red: 20 },
				{ blue: 5, red: 4, green: 13 },
				{ green: 5, red: 1 },
			],
		});
		expect(
			readLine(
				'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
			),
		).toEqual({
			4: [
				{ green: 1, red: 3, blue: 6 },
				{ green: 3, red: 6 },
				{ green: 3, blue: 15, red: 14 },
			],
		});
		expect(
			readLine('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'),
		).toEqual({
			5: [
				{ red: 6, blue: 1, green: 3 },
				{ blue: 2, red: 1, green: 2 },
			],
		});
	});

	test('isPossibleGame', () => {
		expect(
			isPossibleGame([
				{ blue: 3, red: 4 },
				{ red: 1, green: 2, blue: 6 },
				{ green: 2 },
			]),
		).toBe(true);
		expect(
			isPossibleGame([
				{ blue: 1, green: 2 },
				{ green: 3, blue: 4, red: 1 },
				{ green: 1, blue: 1 },
			]),
		).toBe(true);
		expect(
			isPossibleGame([
				{ green: 8, blue: 6, red: 20 },
				{ blue: 5, red: 4, green: 13 },
				{ green: 5, red: 1 },
			]),
		).toBe(false);
		expect(
			isPossibleGame([
				{ green: 1, red: 3, blue: 6 },
				{ green: 3, red: 6 },
				{ green: 3, blue: 15, red: 14 },
			]),
		).toBe(false);
		expect(
			isPossibleGame([
				{ red: 6, blue: 1, green: 3 },
				{ blue: 2, red: 1, green: 2 },
			]),
		).toBe(true);
	});

	test('sum of possible game ids', async () => {
		const lines = await extractAndTrimLines('src/day2.input.txt');
		const gameById = lines
			.map(readLine)
			.reduce((game, acc) => Object.assign(acc, game), {});
		const sum = Object.entries(gameById)
			.map(([id, game]) => (isPossibleGame(game) ? parseInt(id) : 0))
			.reduce((a, b) => a + b, 0);
		expect(sum).toEqual(2505);
	});

	test('minimumPossibleGame', () => {
		expect(
			miniPossibleGame([
				{ blue: 3, red: 4 },
				{ red: 1, green: 2, blue: 6 },
				{ green: 2 },
			]),
		).toEqual({ red: 4, green: 2, blue: 6 });
		expect(
			miniPossibleGame([
				{ blue: 1, green: 2 },
				{ green: 3, blue: 4, red: 1 },
				{ green: 1, blue: 1 },
			]),
		).toEqual({ red: 1, green: 3, blue: 4 });
		expect(
			miniPossibleGame([
				{ green: 8, blue: 6, red: 20 },
				{ blue: 5, red: 4, green: 13 },
				{ green: 5, red: 1 },
			]),
		).toEqual({ green: 13, blue: 6, red: 20 });
		expect(
			miniPossibleGame([
				{ green: 1, red: 3, blue: 6 },
				{ green: 3, red: 6 },
				{ green: 3, blue: 15, red: 14 },
			]),
		).toEqual({ green: 3, red: 14, blue: 15 });
		expect(
			miniPossibleGame([
				{ red: 6, blue: 1, green: 3 },
				{ blue: 2, red: 1, green: 2 },
			]),
		).toEqual({ red: 6, blue: 2, green: 3 });
	});

	test('sum of the power of each game', async () => {
		const lines = await extractAndTrimLines('src/day2.input.txt');
		const gameById = lines
			.map(readLine)
			.reduce((game, acc) => Object.assign(acc, game), {});
		const sum = Object.values(gameById)
			.map((game) => {
				const miniGame = miniPossibleGame(game);
				return miniGame.red * miniGame.green * miniGame.blue;
			})
			.reduce((a, b) => a + b, 0);
		expect(sum).toEqual(70265);
	});
});
