import fs from 'fs/promises'

const twoSum = (arr: number[], start: number, end: number, target: number) => {
	const s = new Set<number>()
	for (let i = start; i < end; i++) {
		const complement = target - arr[i]
		if (s.has(complement)) {
			return true
		}
		s.add(arr[i])
	}
	return false
}

const findInvalidNum = (arr: number[], preambleSize: number) => {
	for (let i = preambleSize; i < arr.length; i++) {
		if (!twoSum(arr, i - preambleSize, i, arr[i])) {
			return arr[i]
		}
	}
}

const findEncryptionWeakness = (arr: number[], invalidNum: number) => {
	for (let i = 0; i < arr.length; i++) {
		let sum = 0
		let j = i
		while (j < arr.length && sum < invalidNum) {
			sum += arr[j]
			if (sum === invalidNum) {
				const slice = arr.slice(i, j + 1)
				return Math.max(...slice) + Math.min(...slice)
			}
			j++
		}
	}
}

async function main() {
	const data = await fs.readFile('inputs/09.txt', { encoding: 'utf8' })

	const arr = data.split('\n').map(ln => parseInt(ln))
	const preambleSize = 25

	const invalidNum = findInvalidNum(arr, preambleSize)
	const weakness = findEncryptionWeakness(arr, invalidNum as number)
	console.log(weakness)
}

main()
