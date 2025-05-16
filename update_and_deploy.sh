#!/bin/bash
set -e

echo "Starting enhanced deployment process with URL structure fixes..."

# Clean any previous build artifacts
echo "Cleaning previous build artifacts..."
rm -rf build .docusaurus

echo "Building site with improved URL structure..."
npm run build

echo "Ensuring logo files are available in all locations..."
mkdir -p build/img/ build/azurespacegroup/img/
cp -f static/img/azure_corp_mark_black.png build/img/
cp -f static/img/azure_corp_mark_black.png build/azurespacegroup/img/
cp -f static/img/logo.svg build/img/ 2>/dev/null || true
cp -f static/img/logo.svg build/azurespacegroup/img/ 2>/dev/null || true

echo "Verifying logo files:"
find build -name "*.png" | grep -i azure || echo "No PNG logo found"

echo "Checking investment opportunity pages structure:"
echo "Main directory:"
ls -la build/docs/investment-opportunities

echo "Checking individual grant pages:"
for page in quantum-sci uconn-quantum nsf-expand arpae-open doe-quantum nasa-niac afosr-basic; do
  echo "Checking $page:"
  if [ -d "build/docs/investment-opportunities/$page" ] && [ -f "build/docs/investment-opportunities/$page/index.html" ]; then
    echo "✅ $page directory and index.html found"
  else
    echo "❌ $page directory or index.html NOT found!"
    echo "Creating directory structure..."
    mkdir -p "build/docs/investment-opportunities/$page"
    if [ -f "build/docs/investment-opportunities/$page.html" ]; then
      echo "Moving $page.html to $page/index.html..."
      mv "build/docs/investment-opportunities/$page.html" "build/docs/investment-opportunities/$page/index.html"
      echo "✅ Fixed $page directory structure"
    else
      echo "ERROR: Cannot find $page.html to move!"
      exit 1
    fi
  fi
done

echo "Generating URL structure report for sitemap validation..."
grep -A 1 "investment-opportunities" build/sitemap.xml

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
git commit -m "Deploy website with fixed URL structure for investment pages"

# Force push to the gh-pages branch of azurespacegroup repository
git remote add origin https://github.com/szemkoff/azurespacegroup.git
git push -f origin gh-pages

cd ..
echo "Deployment complete! Check https://szemkoff.github.io/azurespacegroup/docs/investment-opportunities" 