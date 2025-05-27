document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector(".blog-posts-container");
  const blogPostContent = document.getElementById("blog-post-content");
  const searchBar = document.getElementById("search-bar");
  const categoryFilter = document.getElementById("category-filter");

  // Blog posts will be loaded from posts.json
  let blogPosts = [];

  // Load blog posts from posts.json
  async function loadBlogPosts() {
    try {
      const response = await fetch("posts/posts.json");
      if (!response.ok) {
        throw new Error("Failed to load posts.json");
      }
      blogPosts = await response.json();
      return blogPosts;
    } catch (error) {
      console.error("Error loading blog posts:", error);
      blogPosts = []; // Fallback to empty array
      return blogPosts;
    }
  }

  function displayBlogPosts(postsToDisplay) {
    if (!postsContainer) return;
    postsContainer.innerHTML = ""; // Clear existing posts
    postsToDisplay.forEach((post) => {
      const postCard = `
                <article class="blog-card" data-slug="${post.slug}">
                    <div class="blog-card-image">
                        <a href="post.html?post=${post.slug}">
                            <img src="${post.image}" alt="${post.title}">
                        </a>
                    </div>
                    <div class="blog-card-content">
                        <span class="blog-card-category">${post.category}</span>
                        <h3 class="blog-card-title">
                            <a href="post.html?post=${post.slug}">${post.title}</a>
                        </h3>
                        <div class="blog-card-meta">
                            <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                            <span><i class="fas fa-user"></i> ${post.author}</span>
                        </div>
                        <p class="blog-card-excerpt">${post.excerpt}</p>
                        <a href="post.html?post=${post.slug}" class="blog-card-read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
            `;
      postsContainer.insertAdjacentHTML("beforeend", postCard);
    });
  }

  async function loadBlogPost(slug) {
    if (!blogPostContent) return;

    // Ensure posts are loaded first
    if (blogPosts.length === 0) {
      await loadBlogPosts();
    }

    const post = blogPosts.find((p) => p.slug === slug);
    const loadingSpinner = blogPostContent.querySelector(".loading-spinner");

    if (post) {
      try {
        // Since post.html is in /blog/ and posts are in /blog/posts/,
        // the relative path should work correctly
        const response = await fetch(`posts/${slug}.md`);
        if (!response.ok) {
          throw new Error(
            `Markdown file not found for ${slug}. Status: ${
              response.status
            }. URL: ${new URL(`posts/${slug}.md`, window.location.href).href}`
          );
        }
        const markdown = await response.text();
        const htmlContent = marked.parse(markdown);

        const postHTML = `
                    <img src="${post.image}" alt="${post.title}" class="post-image">
                    <h1 class="post-title">${post.title}</h1>
                    <div class="post-meta">
                        <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                        <span><i class="fas fa-folder-open"></i> ${post.category}</span>
                    </div>
                    <div class="post-body">${htmlContent}</div>
                `;
        if (loadingSpinner) loadingSpinner.remove();
        blogPostContent.innerHTML = postHTML;
        hljs.highlightAll(); // Apply syntax highlighting
        generateTableOfContents();
        loadRelatedPosts(post.category, post.slug);
      } catch (error) {
        console.error("Error loading post:", error);
        if (loadingSpinner) loadingSpinner.remove();
        blogPostContent.innerHTML = `<div class="error-message">
            <h2>Error Loading Blog Post</h2>
            <p><strong>Error:</strong> ${error.message}</p>
            <p>Please try refreshing the page or check your internet connection.</p>
          </div>`;
      }
    } else {
      if (loadingSpinner) loadingSpinner.remove();
      blogPostContent.innerHTML = `<div class="error-message">
        <h2>Blog Post Not Found</h2>
        <p>The requested blog post could not be found.</p>
        <p><a href="index.html">← Back to Blog</a></p>
      </div>`;
    }
  }

  function generateTableOfContents() {
    const tocList = document.getElementById("toc-list");
    if (!tocList || !blogPostContent) return;

    tocList.innerHTML = "";
    const headings = blogPostContent.querySelectorAll(
      ".post-body h1, .post-body h2, .post-body h3"
    );
    if (headings.length === 0) {
      const tocSection = document.querySelector(".table-of-contents");
      if (tocSection) tocSection.style.display = "none";
      return;
    }

    headings.forEach((heading, index) => {
      const id = `toc-heading-${index}`;
      heading.id = id;
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = heading.textContent;
      link.classList.add(`toc-level-${heading.tagName.toLowerCase()}`);
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });
  }

  function loadRelatedPosts(currentCategory, currentSlug) {
    const relatedPostsList = document.getElementById("related-posts-list");
    if (!relatedPostsList) return;

    relatedPostsList.innerHTML = "";
    const related = blogPosts
      .filter(
        (post) => post.category === currentCategory && post.slug !== currentSlug
      )
      .slice(0, 3);

    if (related.length === 0) {
      const relatedSection = document.querySelector(".related-posts");
      if (relatedSection) relatedSection.style.display = "none";
      return;
    }

    related.forEach((post) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `post.html?post=${post.slug}`;
      link.textContent = post.title;
      listItem.appendChild(link);
      relatedPostsList.appendChild(listItem);
    });
  }

  function filterAndSearchPosts() {
    if (!postsContainer) return; // Only run on blog listing page

    const searchTerm = searchBar ? searchBar.value.toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

    const filteredPosts = blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
      return matchesCategory && matchesSearch;
    });
    displayBlogPosts(filteredPosts);
  }

  // Initial setup based on the current page
  async function initializePage() {
    await loadBlogPosts(); // Load posts first

    if (postsContainer) {
      // We are on blog.html
      displayBlogPosts(blogPosts);
      if (searchBar) searchBar.addEventListener("input", filterAndSearchPosts);
      if (categoryFilter)
        categoryFilter.addEventListener("change", filterAndSearchPosts);
    }

    if (blogPostContent) {
      // We are on post.html
      const urlParams = new URLSearchParams(window.location.search);
      const postSlug = urlParams.get("post");
      if (postSlug) {
        await loadBlogPost(postSlug);
      } else {
        blogPostContent.innerHTML = "<p>No blog post specified.</p>";
      }
    }

    // Update current year in footer (if it exists from main script.js, this might be redundant)
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  }

  // Initialize the page
  initializePage();
});
