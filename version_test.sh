#!/bin/bash

# cd
root=$(cd "$(dirname "$0")";pwd)

# generate manifest (change version first!).
node version_generator.js -v 1.1.0 -u http://192.168.55.58:5502/remote-assets/ -s ./build/android/assets -d assets/

# remove old remote-assets
if [ -d "./remote-assets/" ];then
  rm -rf ./remote-assets/
fi

# output new remote-assets
cp -a ./build/android/assets/ ./remote-assets/
cp -a ./assets/project.manifest ./remote-assets/
cp -a ./assets/version.manifest ./remote-assets/
