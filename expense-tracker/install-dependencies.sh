#!/bin/bash

echo "Installing dependencies..."

# Create node_modules manually
mkdir -p node_modules

# Add Prisma to package.json
cat >> package.json << 'EOF'
,
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@prisma/client": "^5.0.0",
    "prisma": "^5.0.0",
    "pg": "^8.11.0"
  }
}
EOF

echo "Package.json updated with Prisma dependencies"
echo "Run 'npm install' when npm cache issue is resolved"
echo ""
echo "To fix npm cache permissions, run:"
echo "sudo chown -R \$(whoami):\$(whoami) ~/.npm"