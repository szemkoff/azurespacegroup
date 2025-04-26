#!/bin/bash

# Rebranding script: InstaForce to Azure Space Group
# This script performs global search and replace operations across the codebase

echo "Starting rebranding process: InstaForce to Azure Space Group"

# Replace "InstaForce" with "Azure Space Group"
find . -type f -not -path "*/node_modules/*" -not -path "*/build/*" -not -path "*/.git/*" -name "*.js" -o -name "*.md" -o -name "*.html" -o -name "*.css" | xargs sed -i '' 's/InstaForce/Azure Space Group/g'
echo "Replaced 'InstaForce' with 'Azure Space Group'"

# Replace "instaforce" with "azure-space-group"
find . -type f -not -path "*/node_modules/*" -not -path "*/build/*" -not -path "*/.git/*" -name "*.js" -o -name "*.md" -o -name "*.html" -o -name "*.css" | xargs sed -i '' 's/instaforce/azure-space-group/g'
echo "Replaced 'instaforce' with 'azure-space-group'"

# Replace "INSTAFORCE" with "AZURE SPACE GROUP"
find . -type f -not -path "*/node_modules/*" -not -path "*/build/*" -not -path "*/.git/*" -name "*.js" -o -name "*.md" -o -name "*.html" -o -name "*.css" | xargs sed -i '' 's/INSTAFORCE/AZURE SPACE GROUP/g'
echo "Replaced 'INSTAFORCE' with 'AZURE SPACE GROUP'"

# Replace "/InstaForce/" with "/AzureSpaceGroup/" in URLs
find . -type f -not -path "*/node_modules/*" -not -path "*/build/*" -not -path "*/.git/*" -name "*.js" -o -name "*.md" -o -name "*.html" -o -name "*.css" | xargs sed -i '' 's/\/InstaForce\//\/AzureSpaceGroup\//g'
echo "Replaced '/InstaForce/' with '/AzureSpaceGroup/' in URLs"

echo "Rebranding complete. Please review changes before committing." 