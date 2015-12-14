'use strict'

const fs = require('fs')
const _ = require('lodash')
const readList = require('./util/read-list')
const createMatches = require('./util/create-matches')

return readList()
	.then(data => {
		const names = JSON.parse(data)

		if (_.uniq(names).length !== names.length) {
			console.error('DUPLICATES DETECTED, YOU HAVE BEEN VERY NAUGHTY')
			process.exit(1)
		}

		const matches = createMatches(names)

		_.forEach(matches, (val, key) => {
			console.log(key, 'is secret santa for', val)
		})

		return matches
	})
