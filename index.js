const shuffle = require('lodash.shuffle')

const names = require('./names')

const shuffledNames = shuffle(names)

shuffledNames.forEach((name, index) => {
	const santee = shuffledNames[index + 1]
	console.log(`${name} is secret santa for ${santee || shuffledNames[0]}`)
})
