import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/02.txt', { encoding: 'utf8' })

	const arr = data
		.split('\n')
		.map(line => {
			let [limits, char, password] = line.split(' ', 3)
			char = char[0]
			let [lo, hi] = limits.split('-', 2).map(lim => parseInt(lim))

			return {
				lo,
				hi,
				char,
				password,
			}
		})
		.filter(({ lo, hi, char, password }) => {
			const occurences = password.split('').filter(ch => ch === char).length
			return occurences >= lo && occurences <= hi
		})

	console.log('valid passwords', arr.length)
}

main()
