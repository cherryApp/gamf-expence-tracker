#!/bin/bash

echo "🔧 Testing Expense Tracker Application..."
echo "======================================="

# Check if Next.js can start
npx next info 2>/dev/null && {
    echo "✅ Next.js is available"
    echo "Starting development server..."
    npx next dev --port 3000
} || {
    echo "⚠️  Next.js dependencies not available"
    echo "Starting demo HTML server..."
    
    # Check if Python is available
    if command -v python3 &> /dev/null; then
        echo "✅ Python3 detected - starting basic HTTP server on port 3000"
        python3 -m http.server 3000
    elif command -v python &> /dev/null; then
        echo "✅ Python2 detected - starting basic HTTP server on port 3000"
        python -m SimpleHTTPServer 3000
    else
        echo "❌ No suitable runtime found"
        echo "Please install dependencies: npm install --legacy-peer-deps"
        exit 1
    fi
}