'use strict'

const fs = require('fs')
const _ = require('lodash')

const createMatches = names => {
	let shuffled = _.shuffle(names)
	const matches = {}
	// Flips to true if the last person left gets themselves as secret santa,
	// causing new matches to be created
	let hoHoUhOh = false

	_.forEach(names, name => {
		if (shuffled.length > 1) {
			// If  there are several people left, and someone is going to
			// get themselves, shuffle until they won't
			while (name === _.last(shuffled)) {
				shuffled = _.shuffle(shuffled)
			}
		} else {
			// If only a single person remaings, check if they are
			// going to be assigned themselves, if so, rerun
			if (name === shuffled[0]) {
				hoHoUhOh = true
			}
		}

		matches[name] = shuffled.pop()
	})

	return hoHoUhOh ? createMatches(names) : matches
}

fs.readFile(`${__dirname}/naughty-or-nice.json`, 'utf-8', (err, data) => {
	const names = JSON.parse(data)
	const matches = createMatches(names)

	_.forEach(matches, (val, key) => {
		console.log(key, 'is secret santa for', val)
	})
})
