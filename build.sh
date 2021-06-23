#!/usr/bin/env bash
echo "please enter docker tag ->"
read  tag
# npm install
npm run build
# copy dist to docker
cp -R .vuepress/dist docker/
# to docker dir
cd docker
# build
docker build  -t zzxcncz/doc:$tag .
