#!/bin/bash

DistTags=$(npm view balm-ui-pro dist-tags --json)
LegacyVersion=$(echo "$DistTags" | jq --raw-output '.legacy')

npm run docs
cd dist
git init
git add -A
git commit -m "update official site for balm-ui-pro@$LegacyVersion"
git push -f git@github.com:balmjs/legacy.pro.balmjs.com.git main:gh-pages
