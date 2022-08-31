#!/bin/bash

DistTags=$(npm view balm-ui-pro dist-tags --json)
LatestVersion=$(echo "$DistTags" | jq --raw-output '.latest')

npm run docs
cd dist
git init
git add -A
git commit -m "update official site for balm-ui-pro@$LatestVersion"
git push -f git@github.com:balmjs/pro.balmjs.com.git master:gh-pages
