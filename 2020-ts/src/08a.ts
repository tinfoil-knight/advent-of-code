import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/08.txt', { encoding: 'utf8' })

	const instructions = data.split('\n').map(ln => ln.split(' ', 2))

	let acc = 0
	const seen = new Set<number>()
	for (let i = 0; i < instructions.length; ) {
		if (seen.has(i)) {
			break
		}
		seen.add(i)

		const [op, arg] = instructions[i]
		console.log(i, op, arg)
		switch (op) {
			case 'acc':
				acc += parseInt(arg)
				i++
				break
			case 'jmp':
				i += parseInt(arg)
				break
			case 'nop':
				i++
				break
			default:
				throw new Error(`invalid operation ${op}`)
		}
	}

	console.log(acc)
}

main()
