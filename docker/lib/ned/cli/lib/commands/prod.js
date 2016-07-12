const nedRun = require('../../../lib/ned-run')

module.exports = () => {
  return [
    'prod',
    [
      'runs app in production mode'
    ].join('\n'),
    (yargs) => {
      nedRun('ned-get-prod-image')
    }
  ]
}
