#!/bin/zsh
# Build new image
docker-compose up -d

# Creating the tag
docker tag heating-front:1.0.0 docker.pkg.github.com/gustavoeraldo/heating-system-front/heating-front:1.0.0

# Pushing new tag to git
docker push docker.pkg.github.com/gustavoeraldo/heating-system-front/heating-front:1.0.0