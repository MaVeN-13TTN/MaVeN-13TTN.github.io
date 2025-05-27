const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const blogsDir = path.join(__dirname, "../blogs");
const postsJsonPath = path.join(blogsDir, "posts.json");

function generatePostsJson() {
  try {
    // Read all files in the blogs directory
    const files = fs.readdirSync(blogsDir);

    // Filter for markdown files only
    const markdownFiles = files.filter(
      (file) => file.endsWith(".md") && file !== "README.md"
    );

    const posts = [];

    markdownFiles.forEach((file) => {
      const filePath = path.join(blogsDir, file);
      const fileContents = fs.readFileSync(filePath, "utf8");

      // Parse frontmatter from markdown
      const { data: frontmatter, content } = matter(fileContents);

      // Extract slug from filename (remove .md extension)
      const slug = path.basename(file, ".md");

      // Generate excerpt from content (first 150 characters)
      const excerpt =
        content
          .replace(/^#+\s+.*$/gm, "") // Remove headings
          .replace(/[*_`]/g, "") // Remove markdown formatting
          .trim()
          .substring(0, 150) + (content.length > 150 ? "..." : "");

      // Create post object
      const post = {
        slug,
        title: frontmatter.title || "Untitled Post",
        category: frontmatter.category || "General",
        date:
          frontmatter.date ||
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        author: frontmatter.author || "Ndung'u Kinyanjui",
        image:
          frontmatter.image ||
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        excerpt: frontmatter.excerpt || excerpt,
        tags: frontmatter.tags || [],
      };

      posts.push(post);
    });

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Write posts.json
    fs.writeFileSync(postsJsonPath, JSON.stringify(posts, null, 2));

    console.log(`✅ Generated posts.json with ${posts.length} posts`);
    console.log("Posts found:");
    posts.forEach((post) => {
      console.log(`  - ${post.title} (${post.slug})`);
    });
  } catch (error) {
    console.error("❌ Error generating posts.json:", error.message);
    process.exit(1);
  }
}

// Run the function
generatePostsJson();
