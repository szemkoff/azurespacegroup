#!/bin/bash
set -e

echo "Building site with logos..."
npm run build

echo "Ensuring logo files are available in all locations..."
mkdir -p build/img/ build/AzureSpaceGroup/img/
cp -f static/img/azure_corp_mark_black.svg build/img/
cp -f static/img/azure_corp_mark_black.svg build/AzureSpaceGroup/img/
cp -f static/img/logo.svg build/img/
cp -f static/img/logo.svg build/AzureSpaceGroup/img/

echo "Verifying logo files:"
find build -name "*.svg" | grep -i logo

echo "Creating direct deploy to gh-pages branch without using GitHub Actions..."
cd build

# Initialize git in the build directory
git init
git config --global user.email "$(git config user.email)"
git config --global user.name "$(git config user.name)"

# Create a new branch (to avoid any conflicts with master)
git checkout -b gh-pages

# Add all files and commit
git add -A
git commit -m "Deploy website - direct commit"

# Force push to the gh-pages branch
git push -f https://github.com/szemkoff/AzureSpaceGroup.git gh-pages

cd ..
echo "Deployment complete! Check https://szemkoff.github.io/AzureSpaceGroup/" 