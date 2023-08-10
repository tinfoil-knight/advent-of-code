import fs from 'fs/promises'

const directions = [
	[0, 1],
	[1, 0],
	[-1, 0],
	[0, -1],
	[1, 1],
	[-1, 1],
	[1, -1],
	[-1, -1],
]

async function main() {
	const data = await fs.readFile('inputs/11.txt', { encoding: 'utf8' })
	const state = data.split('\n').map(ln => ln.split(''))
	const rows = state.length,
		cols = state[0].length

	const neighbors = (i: number, j: number): [number, number][] => {
		return directions
			.map(([x, y]) => [i + x, y + j] as [number, number])
			.filter(([x, y]) => 0 <= x && x < rows && 0 <= y && y < cols)
	}
	const applyRules = (arrangement: string[][]) => {
		const changes: { [key: string]: [number, number][] } = {
			L: [], // to make L (empty)
			'#': [], // to make # (occupied)
		}
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const cell = arrangement[i][j]
				const isSeat = cell === 'L' || cell === '#'
				if (isSeat) {
					const nbors = neighbors(i, j)
					const occupiedSeats = nbors.filter(
						([i, j]) => arrangement[i][j] === '#'
					)
					if (cell === 'L' && occupiedSeats.length === 0) {
						changes['#'].push([i, j])
					}
					if (cell === '#' && occupiedSeats.length >= 4) {
						changes['L'].push([i, j])
					}
				}
			}
		}
		Object.entries(changes).forEach(([seatState, positions]) => {
			positions.forEach(([i, j]) => {
				arrangement[i][j] = seatState
			})
		})
	}

	const stateSet = new Set()
	let arrangement = state
	while (true) {
		applyRules(arrangement)
		const s = String(arrangement)
		if (stateSet.has(s)) {
			break
		}
		stateSet.add(s)
	}

	console.log(arrangement.flat().filter(seat => seat === '#').length)
}

main()
