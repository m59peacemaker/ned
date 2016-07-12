const fs = require('fs')
const yargs = require('yargs')
const glob = require('glob')

const splitAtOccurrence = (delimiter, n, str) => {
  const parts = str.split(delimiter)
  return [parts.slice(0, n), parts.slice(n)]
    .map(arr => arr.join(delimiter))
    .filter(v => v.length ? v : false)
}

const [cliArgs, additionalArgs] = splitAtOccurrence(' -- ', 1, process.argv.slice(2).join(' '))

const cliYargs = yargs(cliArgs)

const addCommands = (yargs) => {
  return glob.sync(__dirname + '/lib/commands/*.js').reduce((acc, modulePath) => {
    return acc
      .command(...require(modulePath)({additionalArgs}))
  }, yargs)
}

const argv = addCommands(
  cliYargs
    .help()
    .alias('h', 'help')
).argv
