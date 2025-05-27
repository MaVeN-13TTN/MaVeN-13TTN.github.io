# Ndung'u Kinyanjui - Personal Portfolio

A modern, responsive personal portfolio website showcasing my skills, projects, certifications, and contact information as a Cloud Engineer, Cybersecurity Analyst, and DevOps Enthusiast.

## 📋 Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Dark/Light Theme**: Toggle between dark and light themes with preferences saved locally
- **Blog System**: Complete blog functionality with automated post management
- **Interactive Elements**: 
  - Project cards with detailed modal views
  - Certificate carousel
  - Social media links
  - Contact form integration with Formspree
  - Blog with search and filtering capabilities
- **Sections Include**:
  - About Me
  - Education
  - Technical & Soft Skills
  - Projects Portfolio
  - Certifications & Awards
  - Blog Posts
  - Resume
  - Contact Information

## 📝 Blog System

The portfolio includes a complete blog system with the following features:

### Features
- **Markdown Support**: Write blog posts in Markdown with YAML frontmatter
- **Automated Generation**: Posts metadata automatically generated from frontmatter
- **Search & Filter**: Search posts by title/content and filter by categories
- **Responsive Design**: Blog layout works on all device sizes
- **Syntax Highlighting**: Code blocks with proper syntax highlighting
- **Related Posts**: Shows related content based on tags
- **Table of Contents**: Auto-generated for easy navigation

### Blog Publishing Workflow

To add a new blog post:

1. **Create a new markdown file** in the `blog/posts/` directory:
   ```bash
   touch blog/posts/my-new-post.md
   ```

2. **Add frontmatter and content** to your markdown file:
   ```yaml
   ---
   title: "Your Post Title"
   date: "May 27, 2025"
   category: "YourCategory"
   author: "Ndung'u Kinyanjui"
   image: "https://your-image-url.com/image.jpg"
   excerpt: "Brief description of your post"
   tags: ["tag1", "tag2", "tag3"]
   readTime: "5 min read"
   ---
   
   # Your Post Title
   
   Your blog content goes here...
   ```

3. **Generate the posts.json file**:
   ```bash
   npm run generate-posts
   ```
   Or use the convenient build script:
   ```bash
   ./scripts/build.sh
   ```

4. **Test your blog locally**:
   - Open `index.html` in your browser (main portfolio)
   - Navigate to the blog section or open `blog/index.html` directly
   - Check that your post appears correctly
   - Test search and filtering functionality

5. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "feat: add new blog post - Your Post Title"
   git push
   ```

### Blog File Structure
```
blog/
├── index.html              # Blog listing page
├── post.html               # Individual post page
└── posts/                  # Blog posts directory
    ├── posts.json          # Auto-generated blog metadata
    ├── my-first-post.md    # Sample blog post
    └── infrastructure-as-code-revolutionizing-devops.md

assets/
├── css/
│   ├── style.css           # Portfolio styles
│   └── blog.css            # Blog-specific styles
├── js/
│   ├── script.js           # Portfolio functionality
│   └── blog.js             # Blog functionality
└── images/
    └── favicon.svg         # Site favicon

scripts/
├── generate-posts.js       # Script to generate posts.json
└── build.sh                # Main build script
```

### Required Frontmatter Fields
- `title`: Post title
- `date`: Publication date (e.g., "May 27, 2025")
- `category`: Post category for filtering
- `author`: Author name
- `excerpt`: Brief description for post cards
- `tags`: Array of tags for categorization

### Optional Frontmatter Fields
- `image`: Featured image URL (defaults to placeholder)
- `readTime`: Estimated read time
- `featured`: Boolean to highlight important posts

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Blog System**: Markdown parsing with Marked.js, syntax highlighting with Highlight.js
- **Build Tools**: Node.js, npm for blog post generation
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins, Montserrat)
- **Form Handling**: Formspree
- **Hosting**: GitHub Pages

## 🚀 Getting Started

### Prerequisites
- Node.js (for blog functionality)
- Git

### Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/MaVeN-13TTN/MaVeN-13TTN.github.io.git
   cd MaVeN-13TTN.github.io
   ```

2. **Install dependencies** (for blog functionality):
   ```bash
   npm install
   ```

3. **Generate initial blog posts**:
   ```bash
   npm run generate-posts
   ```

4. **Open the portfolio**:
   - Open `index.html` in your browser for the main portfolio
   - Open `blog.html` for the blog section

## 📱 Responsive Design

The portfolio is optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1440px and up)

## 🎨 Customization

### Portfolio Customization
- Theme colors can be modified in the CSS variables in `style.css`
- Projects can be added by creating new project cards in the HTML
- Certifications can be updated in the carousel section

### Blog Customization
- Modify blog styling in `blog.css`
- Update default images and excerpts in `scripts/generate-posts.js`
- Add new categories by using them in post frontmatter
- Customize the blog layout in `blog.html` and `blog-details.html`

## 📦 Scripts

- `npm run generate-posts` - Generate posts.json from markdown files
- `./scripts/build.sh` - Complete build script with progress indicators
- `npm run build` - Alias for generate-posts (future extensibility)

## 📝 Contact

If you have any questions or feedback about this portfolio, feel free to reach out:

- Email: kinyanjuindungu1324@gmail.com
- LinkedIn: [Ndung'u Kinyanjui](https://www.linkedin.com/in/ndungu-kinyanjui/)
- GitHub: [MaVeN-13TTN](https://github.com/MaVeN-13TTN)

## 📄 License

This project is available for personal use and modification with appropriate attribution.
    