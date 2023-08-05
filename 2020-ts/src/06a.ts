import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/06.txt', { encoding: 'utf8' })
	const groups = data.split('\n\n').map(group => group.replaceAll('\n', ''))
	const uniqueAnswers = groups.map(answers => new Set(answers).size)

	console.log(
		'sum of counts',
		uniqueAnswers.reduce((a, b) => a + b)
	)
}

main()
