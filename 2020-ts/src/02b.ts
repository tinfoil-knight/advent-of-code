import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/02.txt', { encoding: 'utf8' })

	const arr = data
		.split('\n')
		.map(line => {
			let [limits, char, password] = line.split(' ', 3)
			char = char[0]
			let [pos1, pos2] = limits.split('-', 2).map(lim => parseInt(lim))

			return {
				pos1,
				pos2,
				char,
				password,
			}
		})
		.filter(({ pos1, pos2, char, password }) => {
			const cond1 = password[pos1 - 1] === char ? 1 : 0
			const cond2 = password[pos2 - 1] === char ? 1 : 0
			return Boolean(cond1 ^ cond2)
		})

	console.log('valid passwords', arr.length)
}

main()
