import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/03.txt', { encoding: 'utf8' })

	const patternMatrix = data.split('\n').map(line => line.split(''))

	const rows = patternMatrix.length,
		cols = patternMatrix[0].length

	// [down, right]
	const directions = [
		[1, 1],
		[1, 3],
		[1, 5],
		[1, 7],
		[2, 1],
	]

	const ans = directions
		.map(([down, right]) => {
			let pos = [0, 0]
			let treeCount = 0
			while (pos[0] < rows - 1) {
				pos = [pos[0] + down, (pos[1] + right) % cols]
				if (patternMatrix[pos[0]][pos[1]] === '#') {
					treeCount++
				}
			}
			return treeCount
		})
		.reduce((a, b) => a * b, 1)

	console.log('product of trees encountered on various slopes:', ans)
}

main()
