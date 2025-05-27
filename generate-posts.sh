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
echo "💡 Next steps:"
echo "   1. Review the generated posts.json"
echo "   2. Test your blog at blog.html"
echo "   3. Commit and push your changes"
echo "💡 You can now commit and push your changes."
