import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/04.txt', { encoding: 'utf8' })

	const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
	const validPassports = data.split('\n\n').filter(p => {
		const fields = p
			.replaceAll('\n', ' ')
			.split(' ')
			.map(field => field.split(':', 2))
			.reduce((prev: { [key: string]: string }, curr) => {
				const [k, v] = curr
				prev[k] = v
				return prev
			}, {})
		const isValid =
			Object.keys(fields).length >= requiredFields.length &&
			requiredFields.every(f => f in fields)
		return isValid
	})

	console.log('valid passports', validPassports.length)
}

main()
