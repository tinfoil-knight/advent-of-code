import fs from 'fs/promises'

type SeatPos = { row: number; col: number }
const seatId = ({ row, col }: SeatPos) => row * 8 + col
const range = (start: number, end: number) =>
	new Array(end - start + 1).fill(undefined).map((_, idx) => idx + start)

const enc = ({ row, col }: SeatPos) => `${row},${col}`

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
	const seatPositionsSet = new Set(seatPositions.map(enc))
	const seatIds = new Set(seatPositions.map(seatId))

	const allPossibleSeats = range(0, 127)
		.map(row => range(0, 7).map(col => ({ row, col })))
		.flat()
	const missingSeats = allPossibleSeats.filter(
		seat => !seatPositionsSet.has(enc(seat))
	)

	const mySeat = missingSeats.find(pos => {
		const id = seatId(pos)
		const notFrontOrBack = ![0, 127].includes(pos.row)
		return notFrontOrBack && seatIds.has(id + 1) && seatIds.has(id - 1)
	})
	console.log('my seat id', mySeat && seatId(mySeat))
}

main()
