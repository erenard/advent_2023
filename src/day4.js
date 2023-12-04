import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export async function extractAndTrimLines(filename) {
	const bufferData = await readFile(filename);
	const lines = bufferData
		.toString()
		.split('\n')
		.filter((line) => line.trim());
	return lines;
}

export function readLine(line) {
	const cardNumber = Number(line.split(':')[0].substring(5));
	const numbers = line
		.split(':')[1]
		.split('|')[0]
		.split(' ')
		.map((token) => token.trim())
		.filter((token) => token !== '')
		.map((token) => Number(token));
	const winningNumbers = line
		.split(':')[1]
		.split('|')[1]
		.split(' ')
		.map((token) => token.trim())
		.filter((token) => token !== '')
		.map((token) => Number(token));
	return {
		cardNumber,
		numbers,
		winningNumbers,
	};
}

export function scoreLine({ numbers, winningNumbers }) {
	return numbers
		.filter((number) => winningNumbers.includes(number))
		.reduce((sum) => (sum ? sum * 2 : 1), 0);
}

export function sumScores(scores) {
	return scores.reduce((sum, score) => sum + score, 0);
}

export function winningCardCount({ numbers, winningNumbers }) {
	return numbers
		.map((number) => (winningNumbers.includes(number) ? 1 : 0))
		.reduce((sum, num) => sum + num, 0);
}

export function totalCards(cards) {
	const cardCount = new Array(cards.length).fill(1);
	cards.forEach((card) => {
		const winningCount = winningCardCount(card);
		const amount = cardCount[card.cardNumber - 1];

		for (let i = 0; i < winningCount; i++) {
			cardCount[card.cardNumber + i] += amount;
		}
	});
	return cardCount;
}
