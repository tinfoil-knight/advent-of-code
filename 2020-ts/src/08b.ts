import fs from 'fs/promises'

const switchOp = (op: string) => (op === 'jmp' ? 'nop' : 'jmp')

const terminates = (
	instructions: string[][],
	changedIndex: number
): number | false => {
	let acc = 0
	const seen = new Set<number>()

	let i = 0
	while (i < instructions.length) {
		if (seen.has(i)) {
			return false
		}

		seen.add(i)

		const [op, arg] = instructions[i]
		const actualOp = i === changedIndex ? switchOp(op) : op
		switch (actualOp) {
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
	return acc
}

async function main() {
	const data = await fs.readFile('inputs/08.txt', { encoding: 'utf8' })

	const instructions = data.split('\n').map(ln => ln.split(' ', 2))

	// PERF: We can record the instructions that are processed until infinite loop occurs
	// and then run this loop on those specific instructions (in reverse) to find the wrong one

	for (let i = 0; i < instructions.length; i++) {
		const [op, _] = instructions[i]
		if (['jmp', 'nop'].includes(op)) {
			const result = terminates(instructions, i)
			if (result) {
				console.log('acc value', result)
				break
			}
		}
	}
}

main()
