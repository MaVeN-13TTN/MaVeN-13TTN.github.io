#!/bin/bash

echo "🚀 Auto-generating posts.json from markdown files..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to use this script."
    exit 1
fi

# Check if npm dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate posts.json
npm run generate-posts

echo "✅ Done! Your posts.json has been updated."
echo "💡 You can now commit and push your changes."
