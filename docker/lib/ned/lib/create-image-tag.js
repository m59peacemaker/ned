const {hostAppDir} = require('../config')

const createImageTag = mode => {
  const name = hostAppDir.split(/[^\w]/).filter(v => v !== '')
  const imageTag = ['ned', mode, ...name].join('-')
  return imageTag
}

module.exports = createImageTag
