#!/bin/bash

set -e

export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker login
docker build . -f .cloud/Dockerfile -t doelia/planning-teletravail:main
docker push doelia/planning-teletravail:main
