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

# Work out which extra cities have enough attorneys for a page
node scripts/build-directory.mjs

# Build the site
npm run build

# The attorney data file is only read at build time. It is not copied to the
# public site, so the whole directory can't be downloaded in one file.
