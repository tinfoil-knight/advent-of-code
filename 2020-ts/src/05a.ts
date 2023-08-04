import fs from 'fs/promises'

type SeatPos = { row: number; col: number }
const seatId = ({ row, col }: SeatPos) => row * 8 + col

async function main() {
	const data = await fs.readFile('inputs/05.txt', { encoding: 'utf8' })

	const seatPositions = data.split('\n').map(pass => {
		const [rowSpec, colSpec] = [pass.slice(0, 7), pass.slice(7)]
		const row = parseInt(
			rowSpec
				.split('')
				.map(ch => (ch == 'F' ? 0 : 1))
				.join(''),
			2
		)
		const col = parseInt(
			colSpec
				.split('')
				.map(ch => (ch == 'L' ? 0 : 1))
				.join(''),
			2
		)
		return { row, col }
	})

	const seatIds = seatPositions.map(seatId)
	const highestId = Math.max(...seatIds)

	console.log('highest seat id', highestId)
}

main()
