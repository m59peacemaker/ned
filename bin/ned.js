#!/usr/bin/env node

const yargs = require('yargs')
const kexec = require('kexec')

require.resolve('ned-lint/bin/cmd')
require.resolve('ned-test/bin/cmd')
require.resolve('ned-transpile/bin/cmd')

const subCmd = path => kexec(require.resolve(path), process.argv.slice(3))
const makeSubCmd = (path) => {
  return () => subCmd(path)
}

yargs.usage('\nUsage: $0 [options] [command]')

  .command({
    command: 'dev',
    aliases: ['d'],
    desc: 'run app in dev mode',
    handler: makeSubCmd('./ned-dev')
  })

  .command({
    command: 'lint',
    aliases: ['l'],
    desc: 'lint app for JavaScript Standard Style compliance',
    handler: makeSubCmd('ned-lint/bin/cmd')
  })

  .command({
    command: 'test',
    aliases: ['t'],
    desc: 'run tests',
    handler: makeSubCmd('ned-test/bin/cmd')
  })

  .command({
    command: 'transpile',
    aliases: ['tr'],
    desc: 'transpile application',
    handler: makeSubCmd('ned-transpile/bin/cmd')
  })

  .command({
    command: 'help [cmd]',
    desc: 'display help for [cmd]',
    handler: ({cmd}) => {
      if (cmd) {
        kexec(process.argv[1], [cmd, '--help'])
      } else {
        kexec(process.argv[1], ['--help'])
      }
    }
  })

  .option('h')
  .alias('h', 'help')
  .describe('h', 'output usage information')

  .argv

yargs.showHelp()
