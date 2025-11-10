#!/bin/bash

echo "Starting Expense Tracker application..."
echo "NOTICE: Running with minimal dependencies."
echo "For full functionality, run: npm install --legacy-peer-deps"
echo ""
echo "Current limitations:"
echo "- Prisma client not generated (run 'npx prisma generate' after npm install)"
echo "- Next.js development server only"
echo "- Basic HTML/CSS functionality"
echo ""
echo "Starting basic Next.js dev server..."

# Create a simple node_modules if it doesn't exist
mkdir -p node_modules

# Try to start Next.js dev server, fall back to basic HTML if it fails
npx next dev --port 3000 2>/dev/null || {
  echo ""
  echo "⚠️  Next.js dependencies not available. Starting basic HTML server..."
  echo "Install dependencies for full functionality: npm install --legacy-peer-deps"
  
  # Start a simple HTTP server with the static content
  python3 -m http.server 3000 --directory . || python -m SimpleHTTPServer 3000
}