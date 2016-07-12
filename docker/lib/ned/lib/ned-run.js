const config = require('../config')
const spawn = require('./spawn')

const Factory = ({appDir}) => {
  return (command, dockerArgs = '') => {
    if (!command) {
      throw new Error('nedRun requires a command.')
    }
    return spawn.through([
      `docker run --rm`,
      ...dockerArgs,
      `-e NED_HOST_APP_DIR=${appDir}`,
      `-v /var/run/docker.sock:/var/run/docker.sock`,
      `-v ${appDir}:/app`,
      `pmkr/ned:1.0`,
      command
    ])
  }
}

const nedRun = Factory({appDir: config.hostAppDir})

nedRun.Factory = Factory

module.exports = nedRun
