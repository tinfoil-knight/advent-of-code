import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/10.txt', { encoding: 'utf8' })

	const joltages = data.split('\n').map(ln => parseInt(ln))
	joltages.sort((a, b) => a - b)
	const device = (joltages.at(-1) as number) + 3
	joltages.push(device)

	let prev = 0
	const diff: { [key: string]: number } = {
		1: 0,
		2: 0,
		3: 0,
	}
	for (const num of joltages) {
		diff[num - prev] += 1
		prev = num
	}
	console.log(diff[1] * diff[3])
	console.log(diff)
}

main()
