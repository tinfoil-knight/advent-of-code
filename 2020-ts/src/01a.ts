import fs from 'fs'
import readline from 'readline'

async function main() {
	const fsStream = fs.createReadStream('inputs/01.txt')

	const rl = readline.createInterface({
		input: fsStream,
	})

	// Assumptions:
	// - Input only has integers
	// - Input has exactly one matching pair that sums up to 2020

	const s = new Set<number>()

	for await (const line of rl) {
		const entry = parseInt(line)
		const complementary = 2020 - entry
		if (s.has(complementary)) {
			console.log('product:', entry * complementary)
			break
		} else {
			s.add(entry)
		}
	}
}

main()
