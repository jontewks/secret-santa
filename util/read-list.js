const Promise = require('bluebird')
const readFileAsync = Promise.promisify(require('fs').readFile)

module.exports = () => {
	return readFileAsync('naughty-or-nice.json', 'utf-8')
}
