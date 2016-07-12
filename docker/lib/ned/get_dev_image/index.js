const fs = require('fs')
const shell = require('shell-tag')
const createImageTag = require('../lib/create-image-tag')

if (fs.existsSync('/app/Dockerfile')) {
  const imageTag = createImageTag('dev')
  try {
    shell`cd /app; docker build -t ${imageTag} ./`
    process.stdout.write(imageTag)
  } catch (err) {
    process.stderr.write(err.toString())
  }
} else {
  process.stdout.write('pmkr/node-app:1.0')
}
