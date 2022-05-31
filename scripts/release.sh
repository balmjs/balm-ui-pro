#!/bin/bash

npm run prod

LatestTag=$(git describe --tags `git rev-list --tags --max-count=1`)
echo -e "Latest version: ${LatestTag}"

echo -e "Input new release version: (e.g. 0.1.0)"
read tagName

regVersion='^(0\.[0-9]+\.[0-9]+)$'
regTag='^v(0\.[0-9]+\.[0-9]+)$'

canRelease=false

if [[ "$tagName" =~ $regTag ]]; then
  canRelease=true
elif [[ "$tagName" =~ $regVersion ]] && [[ ! "$tagName" =~ $regTag ]]; then
  tagName="v${tagName}"
  canRelease=true
else
  echo "Invalid version: ${tagName}"
fi

if $canRelease; then
  echo "${tagName} releasing"

  npm publish

  git tag ${tagName}
  git push origin ${tagName}

  echo "${tagName} released"
fi
