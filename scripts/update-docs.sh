#!/bin/bash

LatestVersion=$(npm view balm-ui-pro version)

npm run docs
cd dist
git init
git add -A
git commit -m "update official site for balm-ui-pro@$LatestVersion"
git push -f git@github.com:balmjs/pro.balmjs.com.git master:gh-pages
