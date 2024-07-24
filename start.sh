#!/bin/bash

echo 'Preparing to run automation on production mode.'

puppeteer_cache_dir=".cache/puppeteer"
puppeteer_dep_dir="node_modules/puppeteer/"

if [[ -d "$puppeteer_cache_dir" ]];
then
    echo "$puppeteer_cache_dir directory exists."
else
    echo "$puppeteer_cache_dir directory does not exist. Trying to re-install Puppeteer."
    npm install
    npx puppeteer browsers install chrome
fi

echo "Running script now..."
node scraper.js
