#!/bin/bash

# Use Node.js 18.x
export NODE_VERSION=18

# Debug: Print current directory and list files
echo "Current directory: $(pwd)"
ls -la

# Make sure the JSON file exists
if [ -f "attorney_enriched_reviews.json" ]; then
  echo "JSON file found in project root"
  
  # Copy the JSON file to the Vercel root directory
  echo "Copying JSON file to Vercel root directory..."
  cp attorney_enriched_reviews.json /vercel/attorney_enriched_reviews.json
  
  # Also copy to dist directory (will be created during build)
  mkdir -p dist
  cp attorney_enriched_reviews.json dist/
else
  echo "ERROR: attorney_enriched_reviews.json not found in project root!"
  echo "Files in current directory:"
  ls -la
fi

# Install dependencies
npm install

# Build the site
npm run build

# After build, make sure the JSON file is in the dist directory
if [ -f "attorney_enriched_reviews.json" ] && [ -d "dist" ]; then
  echo "Copying JSON file to dist directory after build..."
  cp attorney_enriched_reviews.json dist/
fi

# Final check
echo "Final file locations:"
echo "Project root:"
ls -la attorney_enriched_reviews.json 2>/dev/null || echo "Not found in project root"
echo "Vercel root:"
ls -la /vercel/attorney_enriched_reviews.json 2>/dev/null || echo "Not found in Vercel root"
echo "Dist directory:"
ls -la dist/attorney_enriched_reviews.json 2>/dev/null || echo "Not found in dist directory"
