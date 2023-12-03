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

const findNumbers = /(\d+)*/g;
const findSymbols = /([^.\d]+)*/g;

function match2Metadata(match, lineIndex) {
	return {
		text: match[0],
		starts: match.index,
		ends: match.index + match[0].length - 1,
		lineIndex,
	};
}

export function readLine(line, lineIndex) {
	const numbers = [...line.matchAll(findNumbers)]
		.filter((match) => match[0])
		.map((match) => match2Metadata(match, lineIndex));
	const symbols = [...line.matchAll(findSymbols)]
		.filter((match) => match[0])
		.map((match) => match2Metadata(match, lineIndex));
	return {
		symbols,
		numbers,
	};
}

export function concatNumbersAndSymbols(numbersAndSymbols) {
	const numbers = numbersAndSymbols
		.map((numberAndSymbol) => numberAndSymbol.numbers)
		.flat();
	const symbols = numbersAndSymbols
		.map((numberAndSymbol) => numberAndSymbol.symbols)
		.flat();
	return {
		numbers,
		symbols,
	};
}

export function isNumberAdjacentToSymbol(number, symbols) {
	return symbols.some((symbol) => {
		return (
			symbol.starts >= number.starts - 1 &&
			symbol.ends <= number.ends + 1 &&
			symbol.lineIndex <= number.lineIndex + 1 &&
			symbol.lineIndex >= number.lineIndex - 1
		);
	});
}

export function findNumbersAdjacentToSymbol(symbol, numbers) {
	const returned = numbers.filter(
		(number) =>
			symbol.starts >= number.starts - 1 &&
			symbol.ends <= number.ends + 1 &&
			symbol.lineIndex <= number.lineIndex + 1 &&
			symbol.lineIndex >= number.lineIndex - 1,
	);
	return returned;
}
