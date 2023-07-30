import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/02.txt', { encoding: 'utf8' })

	const arr = data.split('\n').filter(line => {
		let [limits, char, password] = line.split(' ', 3)
		const [pos1, pos2] = limits.split('-', 2).map(lim => parseInt(lim))
		char = char[0]

		const cond1 = password[pos1 - 1] === char
		const cond2 = password[pos2 - 1] === char
		return cond1 != cond2
	})

	console.log('valid passwords', arr.length)
}

main()
