#!/bin/bash

# pass everything to `ned-cli` in a ned docker container

docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e NED_HOST_APP_DIR="$PWD" \
  pmkr/ned:1.0 \
  ned-cli "$@"
