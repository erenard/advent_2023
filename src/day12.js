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

function countIn(zeChar, zeString) {
	let count = 0;
	for (let i = 0; i < zeString.length; i++) {
		if (zeString.charAt(i) === zeChar) {
			count++;
		}
	}
	return count;
}

const ones = /[1]/g;

function* arrangements(replacementCount, wantedOnes) {
	const possibleArrangements = Math.pow(2, replacementCount);
	arr: for (
		let currentArrangement = 0;
		currentArrangement < possibleArrangements;
		currentArrangement++
	) {
		let binary = currentArrangement.toString(2);
		// const count = binary.match(ones)?.length;
		// const count = countIn('1', binary);
		let count = 0;
		for (let i = 0; i < binary.length; i++) {
			if (binary.charAt(i) === '1') {
				count++;
				if (count > wantedOnes) {
					continue arr;
				}
			}
		}
		if (count !== wantedOnes) {
			continue;
		}
		yield binary.padStart(replacementCount, '0');
	}
}
export function countArrangements(line) {
	const [field, set] = line.split(' ');
	const replacementCount = countIn('?', field);
	const onesCount = countIn('#', field);
	const wantedOnes =
		set
			.split(',')
			.map(Number)
			.reduce((acc, val) => acc + val, 0) - onesCount;
	let validArrangementCount = 0;
	const regexStr = set
		.split(',')
		.map((n) => `[1#]{${n}}`)
		.join('[^#]+');
	const validationRegexp = new RegExp(regexStr, 'g');
	for (let binary of arrangements(replacementCount, wantedOnes)) {
		let binIndex = 0;
		let currentField = field.replaceAll('?', () => binary.charAt(binIndex++));
		if (currentField.match(validationRegexp)) {
			validArrangementCount++;
		}
	}
	return validArrangementCount;
}
