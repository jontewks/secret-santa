'use strict'

const readList = require('./util/read-list')
const createMatches = require('./util/create-matches')
const _ = require('lodash')
const assert = require('assert')

describe('Secret Santa', () => {
	let names
	let matches

	before(() => {
		return readList()
			.then(data => {
				names = JSON.parse(data)
				matches = createMatches(names)
			})
	})

	it('Length of output is the same as the length of the input', () => {
		assert.equal(names.length, _.keys(matches).length)
	})

	it('Each list contains the exact same names', () => {
		assert.deepEqual(names, _.keys(matches))
	})

	it('Matches has no duplicates', () => {
		assert.deepEqual(_.keys(matches), _.uniq(_.keys(matches)))
	})

	it('Nobody was assigned themselves', () => {
		_.forEach(matches, (val, key) => {
			assert.notEqual(val, key)
		})
	})
})
