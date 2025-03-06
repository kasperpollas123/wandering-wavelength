#!/bin/bash

# Use Node.js 18.x
export NODE_VERSION=18

# Debug: Print current directory and list files
echo "Current directory: $(pwd)"
ls -la

# Create a simple mock JSON file if the real one doesn't exist
# This prevents build failures due to missing file
if [ ! -f "attorney_enriched_reviews.json" ]; then
  echo "Creating mock JSON file for build..."
  echo '{"listings":[]}' > attorney_enriched_reviews.json
fi

# Install dependencies
npm install

# Create public directory if it doesn't exist
mkdir -p public

# Ensure the JSON file is in the public directory
if [ -f "attorney_enriched_reviews.json" ]; then
  echo "Copying JSON file to public directory..."
  cp attorney_enriched_reviews.json public/
fi

# Build the site
npm run build

# Ensure the JSON file is in the dist directory
if [ -f "attorney_enriched_reviews.json" ] && [ -d "dist" ]; then
  echo "Copying JSON file to dist directory..."
  cp attorney_enriched_reviews.json dist/
fi

# Final check
echo "Final file locations:"
echo "Project root:"
ls -la attorney_enriched_reviews.json 2>/dev/null || echo "Not found in project root"
echo "Public directory:"
ls -la public/attorney_enriched_reviews.json 2>/dev/null || echo "Not found in public directory"
echo "Dist directory:"
ls -la dist/attorney_enriched_reviews.json 2>/dev/null || echo "Not found in dist directory"
