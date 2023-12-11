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
export function findStartPosition(lines) {
	let x = 0,
		y = 0;
	for (; y < lines.length; y++) {
		if (lines[y].indexOf('S') > -1) {
			x = lines[y].indexOf('S');
			break;
		}
	}
	return { x, y };
}

function goNorth({ x, y }) {
	return { x, y: y - 1 };
}

function goSouth({ x, y }) {
	return { x, y: y + 1 };
}

function goEast({ x, y }) {
	return { x: x + 1, y };
}

function goWest({ x, y }) {
	return { x: x - 1, y };
}

function isPositionIn({ x, y }, collection) {
	return collection.some((position) => position.x === x && position.y === y);
}

function isValidPosition({ x, y }, lines) {
	return x >= 0 && x < lines[0].length && y >= 0 && y < lines.length;
}

function findFirstMove(lines, startPosition) {
	const northPosition = goNorth(startPosition);
	const southPosition = goSouth(startPosition);
	const eastPosition = goEast(startPosition);
	const westPosition = goWest(startPosition);
	const northPossible =
		isValidPosition(northPosition, lines) &&
		(lines[northPosition.y][northPosition.x] === 'F' ||
			lines[northPosition.y][northPosition.x] === '7' ||
			lines[northPosition.y][northPosition.x] === '|');
	const southPossible =
		isValidPosition(southPosition, lines) &&
		(lines[southPosition.y][southPosition.x] === 'L' ||
			lines[southPosition.y][southPosition.x] === 'J' ||
			lines[southPosition.y][southPosition.x] === '|');
	const eastPossible =
		isValidPosition(eastPosition, lines) &&
		(lines[eastPosition.y][eastPosition.x] === 'J' ||
			lines[eastPosition.y][eastPosition.x] === '7' ||
			lines[eastPosition.y][eastPosition.x] === '-');
	const westPossible =
		isValidPosition(westPosition, lines) &&
		(lines[westPosition.y][westPosition.x] === 'F' ||
			lines[westPosition.y][westPosition.x] === 'L' ||
			lines[westPosition.y][westPosition.x] === '-');
	if (northPossible && southPossible) {
		return { lastMove: 'N', block: '|' };
	}
	if (eastPossible && westPossible) {
		return { lastMove: 'E', block: '-' };
	}
	if (northPossible && westPossible) {
		return { lastMove: 'S', block: 'J' };
	}
	if (northPossible && eastPossible) {
		return { lastMove: 'S', block: 'L' };
	}
	if (southPossible && eastPossible) {
		return { lastMove: 'N', block: 'F' };
	}
	if (southPossible && westPossible) {
		return { lastMove: 'N', block: '7' };
	}
}

export function findLoop(lines, startPosition) {
	const loop = [];
	const right = [];
	const left = [];

	let { lastMove, block } = findFirstMove(lines, startPosition);
	let position = startPosition;
	do {
		loop.push(position);
		switch (lastMove) {
			case 'N':
				switch (block) {
					case '|':
						right.push(goEast(position));
						left.push(goWest(position));
						position = goNorth(position);
						break;
					case 'F':
						left.push(goWest(position));
						left.push(goNorth(position));
						position = goEast(position);
						lastMove = 'E';
						break;
					case '7':
						right.push(goEast(position));
						right.push(goNorth(position));
						position = goWest(position);
						lastMove = 'W';
						break;
				}
				break;
			case 'S':
				switch (block) {
					case '|':
						right.push(goWest(position));
						left.push(goEast(position));
						position = goSouth(position);
						break;
					case 'J':
						left.push(goEast(position));
						left.push(goSouth(position));
						position = goWest(position);
						lastMove = 'W';
						break;
					case 'L':
						right.push(goWest(position));
						right.push(goSouth(position));
						position = goEast(position);
						lastMove = 'E';
						break;
				}
				break;
			case 'E':
				switch (block) {
					case '-':
						right.push(goSouth(position));
						left.push(goNorth(position));
						position = goEast(position);
						break;
					case '7':
						left.push(goNorth(position));
						left.push(goEast(position));
						position = goSouth(position);
						lastMove = 'S';
						break;
					case 'J':
						right.push(goSouth(position));
						right.push(goEast(position));
						position = goNorth(position);
						lastMove = 'N';
						break;
				}
				break;
			case 'W':
				switch (block) {
					case '-':
						right.push(goNorth(position));
						left.push(goSouth(position));
						position = goWest(position);
						break;
					case 'F':
						right.push(goNorth(position));
						right.push(goWest(position));
						position = goSouth(position);
						lastMove = 'S';
						break;
					case 'L':
						left.push(goSouth(position));
						left.push(goWest(position));
						position = goNorth(position);
						lastMove = 'N';
						break;
				}
				break;
		}
		block = lines[position.y][position.x];
	} while (block !== 'S');

	return { loop, rightHandedPositions: right, leftHandedPositions: left };
}

export function expandPositions(lines, loop, positions) {
	const validPositions = [];

	let positionsToTest = positions;
	while (positionsToTest.length) {
		positionsToTest = positionsToTest.filter((p) => !isPositionIn(p, loop));
		positionsToTest = positionsToTest.reduce((acc, p) => {
			if (!isPositionIn(p, acc)) {
				acc.push(p);
			}
			return acc;
		}, []);
		if (positionsToTest.some((p) => !isValidPosition(p, lines))) {
			return [];
		}
		validPositions.push(...positionsToTest);

		const nextPositionsToTest = positionsToTest.flatMap((position) => [
			goNorth(position),
			goSouth(position),
			goEast(position),
			goWest(position),
		]);

		positionsToTest = nextPositionsToTest.filter(
			(p) => !isPositionIn(p, validPositions),
		);
	}
	return validPositions;
}

export function expandRightAndLeftHandedPositions(
	lines,
	loop,
	rightHandedPositions,
	leftHandedPositions,
) {
	const groupLeft = expandPositions(lines, loop, leftHandedPositions);
	const groupRight = expandPositions(lines, loop, rightHandedPositions);
	return groupLeft.length ? groupLeft : groupRight;
}
