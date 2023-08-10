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

type Position = [number, number]

async function main() {
	const data = await fs.readFile('inputs/11.txt', { encoding: 'utf8' })
	const initialState = data.split('\n').map(ln => ln.split(''))
	const rows = initialState.length,
		cols = initialState[0].length

	const neighbors = ([i, j]: Position, mat: string[][]): Position[] => {
		const isValid = ([a, b]: Position) =>
			0 <= a && a < rows && 0 <= b && b < cols
		const isSeat = ([a, b]: Position) => ['L', '#'].includes(mat[a][b])
		const findFirstSeat = (pt: Position, dir: [number, number]) => {
			while (true) {
				pt = [pt[0] + dir[0], pt[1] + dir[1]]
				if (!isValid(pt)) break
				if (isSeat(pt)) return pt
			}
			return null
		}
		return directions
			.map(([x, y]) => findFirstSeat([i, j], [x, y]))
			.filter(pt => pt !== null) as Position[]
	}

	const applyRules = (arrangement: string[][]) => {
		const changes: { [key: string]: Position[] } = {
			L: [], // to make L (empty)
			'#': [], // to make # (occupied)
		}
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const cell = arrangement[i][j]
				const isSeat = cell === 'L' || cell === '#'
				if (isSeat) {
					const nbors = neighbors([i, j], arrangement)
					const occupiedSeats = nbors.filter(
						([i, j]) => arrangement[i][j] === '#'
					)
					if (cell === 'L' && occupiedSeats.length === 0) {
						changes['#'].push([i, j])
					}
					if (cell === '#' && occupiedSeats.length >= 5) {
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
	let arrangement = initialState
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
