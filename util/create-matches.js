'use strict'

const _ = require('lodash')

module.exports = names => {
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
