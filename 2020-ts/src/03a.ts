import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/03.txt', { encoding: 'utf8' })

	const patternMatrix = data.split('\n').map(line => line.split(''))

	const rows = patternMatrix.length,
		cols = patternMatrix[0].length

	let treeCount = 0

	let pos = [0, 0]

	while (pos[0] < rows - 1) {
		pos = [pos[0] + 1, (pos[1] + 3) % cols]
		if (patternMatrix[pos[0]][pos[1]] === '#') {
			treeCount++
		}
	}

	console.log('trees encountered:', treeCount)
}

main()
