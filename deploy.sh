#!/bin/bash
set -e

# Build the site
npm run build

# Ensure the logo is available in all possible locations
mkdir -p build/img/ build/AzureSpaceGroup/img/
cp -f static/img/azure_corp_mark_black.svg build/img/
cp -f static/img/azure_corp_mark_black.svg build/AzureSpaceGroup/img/
cp -f static/img/logo.svg build/img/
cp -f static/img/logo.svg build/AzureSpaceGroup/img/

# Show the directories where the logo should be
echo "Logo files should be in:"
ls -la build/img/*.svg
ls -la build/AzureSpaceGroup/img/*.svg

# Deploy to GitHub Pages
GIT_USER=szemkoff USE_SSH=false npm run deploy 