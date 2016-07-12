const fs = require('fs')
const shell = require('shell-tag')
const spawn = require('../lib/spawn')
const nedRun = require('../lib/ned-run')
const createImageTag = require('../lib/create-image-tag')

nedRun('ned-get-dev-image').on('close', () => {
  const devImageTag = createImageTag('dev')
  const prodImageTag = createImageTag('prod')

  const Dockerfile = `
  FROM ${devImageTag}
  COPY ./package.json /app/
  RUN cd /app; npm install;
  COPY ./ /app/
  RUN app-build-prod
  CMD ["app"]
  `

  shell`cp -r /app /tmp/app && rm -rf /tmp/app/node_modules`
  fs.writeFileSync('/tmp/app/Dockerfile', Dockerfile)
  spawn.through(`docker build -t ${prodImageTag} ./`, {cwd: '/tmp/app'})
  .on('close', () => {
    spawn.through(`docker run --rm ${prodImageTag}`)
  })
})
