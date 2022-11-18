#!/bin/bash

LegacyVersion=$(npm view balm-ui-pro@legacy version)

npm run docs
cd dist
git init
git add -A
git commit -m "update official site for balm-ui-pro@$LegacyVersion"
git push -f git@github.com:balmjs/legacy.pro.balmjs.com.git master:gh-pages
