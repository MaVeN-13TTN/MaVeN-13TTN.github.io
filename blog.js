document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector(".blog-posts-container");
  const blogPostContent = document.getElementById("blog-post-content");
  const searchBar = document.getElementById("search-bar");
  const categoryFilter = document.getElementById("category-filter");

  // Sample blog posts data (in a real scenario, this would come from a CMS or markdown files)
  const blogPosts = [
    {
      slug: "my-first-post",
      title: "My First Blog Post: The Journey Begins",
      category: "General",
      date: "May 27, 2025",
      author: "Ndung'u Kinyanjui",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      excerpt:
        "This is the beginning of my blogging journey. I'll be sharing insights on cloud, cybersecurity, and more.",
      tags: ["introduction", "tech"],
    },
    {
      slug: "understanding-cloud-native",
      title: "Understanding Cloud-Native Architectures",
      category: "Cloud Computing",
      date: "June 05, 2025",
      author: "Ndung'u Kinyanjui",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      excerpt:
        "A deep dive into the principles and benefits of building cloud-native applications. Explore microservices, containers, and orchestration.",
      tags: ["cloud", "microservices", "docker", "kubernetes"],
    },
    {
      slug: "essential-cybersecurity-tips",
      title: "5 Essential Cybersecurity Tips for Everyone",
      category: "Cybersecurity",
      date: "June 12, 2025",
      author: "Ndung'u Kinyanjui",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      excerpt:
        "Protect yourself online with these fundamental cybersecurity practices. From strong passwords to recognizing phishing attempts.",
      tags: ["security", "privacy", "tips"],
    },
  ];

  function displayBlogPosts(postsToDisplay) {
    if (!postsContainer) return;
    postsContainer.innerHTML = ""; // Clear existing posts
    postsToDisplay.forEach((post) => {
      const postCard = `
                <article class="blog-card" data-slug="${post.slug}">
                    <div class="blog-card-image">
                        <a href="blog-details.html?post=${post.slug}">
                            <img src="${post.image}" alt="${post.title}">
                        </a>
                    </div>
                    <div class="blog-card-content">
                        <span class="blog-card-category">${post.category}</span>
                        <h3 class="blog-card-title">
                            <a href="blog-details.html?post=${post.slug}">${post.title}</a>
                        </h3>
                        <div class="blog-card-meta">
                            <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                            <span><i class="fas fa-user"></i> ${post.author}</span>
                        </div>
                        <p class="blog-card-excerpt">${post.excerpt}</p>
                        <a href="blog-details.html?post=${post.slug}" class="blog-card-read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
            `;
      postsContainer.insertAdjacentHTML("beforeend", postCard);
    });
  }

  async function loadBlogPost(slug) {
    if (!blogPostContent) return;
    const post = blogPosts.find((p) => p.slug === slug);
    const loadingSpinner = blogPostContent.querySelector(".loading-spinner");

    if (post) {
      try {
        const response = await fetch(`blogs/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Markdown file not found for ${slug}`);
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
        blogPostContent.innerHTML =
          "<p>Error loading blog post. The markdown file might be missing or there was a network issue.</p>";
      }
    } else {
      if (loadingSpinner) loadingSpinner.remove();
      blogPostContent.innerHTML = "<p>Blog post not found.</p>";
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
      link.href = `blog-details.html?post=${post.slug}`;
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
  if (postsContainer) {
    // We are on blog.html
    displayBlogPosts(blogPosts);
    if (searchBar) searchBar.addEventListener("input", filterAndSearchPosts);
    if (categoryFilter)
      categoryFilter.addEventListener("change", filterAndSearchPosts);
  }

  if (blogPostContent) {
    // We are on blog-details.html
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get("post");
    if (postSlug) {
      loadBlogPost(postSlug);
    } else {
      blogPostContent.innerHTML = "<p>No blog post specified.</p>";
    }
  }

  // Update current year in footer (if it exists from main script.js, this might be redundant)
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
