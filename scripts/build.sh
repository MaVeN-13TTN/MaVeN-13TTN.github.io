#!/bin/bash

echo "🚀 Building portfolio and generating posts.json..."

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

echo "✅ Done! Your portfolio is ready."
echo "💡 Next steps:"
echo "   1. Review the generated blog/posts/posts.json"
echo "   2. Test your portfolio at index.html"
echo "   3. Test your blog at blog/index.html"
echo "   4. Commit and push your changes"
echo "💡 You can now commit and push your changes."
