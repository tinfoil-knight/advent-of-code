import fs from 'fs/promises'

type Graph = { [key: string]: string[] }

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)

async function main() {
	const data = await fs.readFile('inputs/07.txt', { encoding: 'utf8' })
	const rules = data.split('\n').map(ln => {
		const match = ln.match(
			/^(?<parent>[\w| ]*) bags contain (?<children>.*)\.$/
		)
		const { parent, children } = match?.groups as {
			parent: string
			children: string
		}
		const parsedChildren =
			children === 'no other bags'
				? []
				: children.split(', ').map(s => {
						const { count, color } = s.match(
							/^(?<count>\d*) (?<color>[\w| ]*) bag[s]?$/
						)?.groups as { count: string; color: string }
						return { count: parseInt(count), color }
				  })
		return { parent, child: parsedChildren }
	})

	const graph: Graph = {}
	for (const { parent, child } of rules) {
		graph[parent] = child
			.map(({ color, count }) => new Array(count).fill(color))
			.flat()
	}

	const cache: { [key: string]: number } = {}
	const count = (node: string): number => {
		if (node in cache) return cache[node]
		if (graph[node].length == 0) return 0

		const total = graph[node].length + sum(graph[node].map(count))
		cache[node] = total
		return total
	}
	console.log(count('shiny gold'))
}

main()
