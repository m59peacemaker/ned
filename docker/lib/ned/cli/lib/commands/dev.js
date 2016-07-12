const path = require('path')
const kexec = require('../kexec')
const bullet = '•'
const nedRun = require('../../../lib/ned-run')
const {hostAppDir} = require('../config')
const createImageTag = require('../../../lib/create-image-tag')

const namePosArgs = (names, argv) => {
 argv._
  .slice(1) // ditch command name
  .forEach((arg, idx) => {
    argv[names[idx]] = arg
  })
}

const kexecDev = ({hostAppDir, entry, imageTag, additionalArgs}) => {
  return kexec([
    `docker run --rm -it`,
    `-v ${hostAppDir}:/app`,
    entry ? `-e APP_ENTRY_POINT=${entry}` : null,
    imageTag,
    `app-dev ${additionalArgs || ''}`,
  ])
}

const imageTag = createImageTag('dev')

const Command = ({additionalArgs}) => {
  return [
    'dev [entry]',
    [
      'runs node project in dev mode',
      '[entry] is the path to be executed by `node`, relative to app root',
      'default [entry] is app root'
    ].map(v => bullet + ' ' + v).join('\n'),
    yargs => {
      const argv = yargs.argv
      if (argv.help) { return }
      namePosArgs(['entry'], argv)
      nedRun('ned-get-dev-image').on('close', () => kexecDev({
        hostAppDir, imageTag, additionalArgs, entry: argv.entry
      }))
    }
  ]
}

module.exports = Command
