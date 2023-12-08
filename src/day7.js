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

function getValueWithJokers(hand) {
	const { J: jokersCount, ...figuresCount } = hand
		.split('')
		.reduce((acc, card) => {
			acc[card] = (acc[card] || 0) + 1;
			return acc;
		}, {});
	if (jokersCount === 5) return [5];
	const values = Object.values(figuresCount);
	if (jokersCount) {
		const index = values.indexOf(Math.max(...values));
		values[index] += jokersCount;
	}
	return values;
}

function getValueWithoutJokers(hand) {
	return Object.values(
		hand.split('').reduce((acc, card) => {
			acc[card] = (acc[card] || 0) + 1;
			return acc;
		}, {}),
	);
}

function getValue(cardCounts) {
	if (cardCounts.length === 1) {
		return 6;
	} else if (cardCounts.length === 2 && Math.max(...cardCounts) === 4) {
		return 5;
	} else if (cardCounts.length === 2 && Math.max(...cardCounts) === 3) {
		return 4;
	} else if (cardCounts.length === 3 && Math.max(...cardCounts) === 3) {
		return 3;
	} else if (cardCounts.length === 3) {
		return 2;
	} else if (cardCounts.length === 4) {
		return 1;
	}
	return 0;
}
export function readHand(line, useJokers = false) {
	const [hand, bid] = line.split(' ');
	const sort = hand
		.split('')
		.map((card) => {
			if (!useJokers) {
				switch (card) {
					case '2':
						return 'A';
					case '3':
						return 'B';
					case '4':
						return 'C';
					case '5':
						return 'D';
					case '6':
						return 'E';
					case '7':
						return 'F';
					case '8':
						return 'G';
					case '9':
						return 'H';
					case 'T':
						return 'I';
					case 'J':
						return 'J';
					case 'Q':
						return 'K';
					case 'K':
						return 'L';
					case 'A':
						return 'M';
				}
			} else {
				switch (card) {
					case 'J':
						return 'A';
					case '2':
						return 'B';
					case '3':
						return 'C';
					case '4':
						return 'D';
					case '5':
						return 'E';
					case '6':
						return 'F';
					case '7':
						return 'G';
					case '8':
						return 'H';
					case '9':
						return 'I';
					case 'T':
						return 'J';
					case 'Q':
						return 'K';
					case 'K':
						return 'L';
					case 'A':
						return 'M';
				}
			}
		})
		.join('');

	const values = useJokers
		? getValueWithJokers(hand)
		: getValueWithoutJokers(hand);
	return {
		hand,
		bid: Number(bid),
		sort,
		value: getValue(values),
	};
}

export function orderHands(lines, useJokers = false) {
	return lines
		.map((line) => readHand(line, useJokers))
		.sort((a, b) => {
			if (a.value > b.value) {
				return 1;
			}
			if (a.value < b.value) {
				return -1;
			}
			return a.sort.localeCompare(b.sort);
		});
}
