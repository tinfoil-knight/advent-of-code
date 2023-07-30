import fs from 'fs/promises'

const EYE_COLORS = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])

const isYear = (s: string) => /^[0-9]{4}$/.test(s)
const inRange = (year: number, lo: number, hi: number) =>
	year >= lo && year <= hi

const kToValidation: { [key: string]: (a: string) => boolean } = {
	byr: s => isYear(s) && inRange(parseInt(s), 1920, 2002),
	iyr: s => isYear(s) && inRange(parseInt(s), 2010, 2020),
	eyr: s => isYear(s) && inRange(parseInt(s), 2020, 2030),
	hgt: s => {
		const match = s.match(/^(?<sizeS>[0-9]{2,3})(?<unit>cm|in)$/)
		if (match?.groups) {
			const { sizeS, unit } = match.groups
			const size = parseInt(sizeS)
			return unit == 'cm' ? inRange(size, 150, 193) : inRange(size, 59, 76)
		}
		return false
	},
	hcl: s => /^#[a-f0-9]{6}$/.test(s),
	ecl: s => EYE_COLORS.has(s),
	pid: s => /^[0-9]{9}$/.test(s),
}

async function main() {
	const data = await fs.readFile('inputs/04.txt', { encoding: 'utf8' })

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
		return Object.keys(fields).length >= Object.keys(kToValidation).length
			? Object.entries(kToValidation).every(
					([key, validator]) => key in fields && validator(fields[key])
			  )
			: false
	})

	console.log('valid passports', validPassports.length)
}

main()
