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

async function main() {
	const data = await fs.readFile('inputs/09.txt', { encoding: 'utf8' })

	const arr = data.split('\n').map(ln => parseInt(ln))
	const preambleSize = 25
	for (let i = preambleSize; i < arr.length; i++) {
		if (!twoSum(arr, i - preambleSize, i, arr[i])) {
			console.log(i, arr[i])
			break
		}
	}
}

main()
