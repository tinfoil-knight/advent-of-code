import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/06.txt', { encoding: 'utf8' })
	const groups = data.split('\n\n').map(group => group.split('\n'))

	const commonAnswers = groups.map(group => {
		return group.reduce(
			(prev, curr) => new Set(curr.split('').filter(x => prev.has(x))),
			new Set(group[0])
		)
	})

	console.log(
		'sum of counts',
		commonAnswers.reduce((prev, curr) => prev + curr.size, 0)
	)
}

main()
