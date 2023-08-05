import fs from 'fs/promises'

type Graph = { [key: string]: string[] }

const dfs = (graph: Graph, startNode: string, target: string) => {
	let stack = [startNode]
	const seen = new Set()
	while (stack.length) {
		const v = stack.pop() as string
		if (v == target) {
			return true
		}
		if (seen.has(v)) {
			continue
		}
		seen.add(v)
		stack = stack.concat(graph[v])
	}
	return false
}

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
		graph[parent] = child.map(c => c.color)
	}
	const target = 'shiny gold'
	const reachedTarget = Object.keys(graph).filter(
		parent => parent != target && dfs(graph, parent, target)
	)
	console.log(reachedTarget.length)
}

main()
