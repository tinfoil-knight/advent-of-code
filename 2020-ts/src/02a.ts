import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/02.txt', { encoding: 'utf8' })

	const arr = data.split('\n').filter(line => {
		let [limits, char, password] = line.split(' ', 3)
		char = char[0]
		const [lo, hi] = limits.split('-', 2).map(lim => parseInt(lim))
		const occurences = password.split('').filter(c => c === char).length
		return occurences >= lo && occurences <= hi
	})

	console.log('valid passwords', arr.length)
}

main()
