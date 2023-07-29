import fs from 'fs/promises'

async function main() {
	const data = await fs.readFile('inputs/01.txt', { encoding: 'utf8' })

	// Assumptions:
	// - Input only has positive integers
	// - Input has exactly one triplet that sums up to 2020

	const arr: number[] = data
		.split('\n')
		.map(line => parseInt(line))
		.sort()

	const n = arr.length

	for (let i = 0; i < n; i++) {
		if (arr[i] >= 2020) {
			break
		}
		if (i > 0 && arr[i] == arr[i - 1]) {
			i += 1
		}

		let lo = i + 1
		let hi = n - 1

		while (lo < hi) {
			const sum = arr[i] + arr[lo] + arr[hi]

			if (sum > 2020) {
				hi -= 1
			} else if (sum < 2020) {
				lo += 1
			} else {
				console.log('product:', arr[i] * arr[lo] * arr[hi])
				break
			}
		}
	}
}

main()
