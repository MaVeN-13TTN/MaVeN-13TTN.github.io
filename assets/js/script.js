// Portfolio Script
document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio script loaded.");

  // Update copyright year in footer
  const updateCopyrightYear = () => {
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
      const currentYear = new Date().getFullYear();
      currentYearElement.textContent = currentYear;
    }
  };

  // Call the function to update the year
  updateCopyrightYear();

  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
  }

  // Toggle theme on click
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("light-theme");

    // Save theme preference
    if (body.classList.contains("light-theme")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });

  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Change icon based on menu state
    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        navToggle.querySelector("i").classList.remove("fa-times");
        navToggle.querySelector("i").classList.add("fa-bars");
      }
    });
  });

  // Add page loader
  const loader = document.createElement("div");
  loader.className = "page-loader";
  const loaderIcon = document.createElement("div");
  loaderIcon.className = "loader-icon";
  loader.appendChild(loaderIcon);
  document.body.appendChild(loader);

  // Hide loader when page is fully loaded
  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.classList.add("loaded");

      // Remove from DOM after transition completes
      setTimeout(function () {
        loader.remove();
      }, 500);
    }, 500); // Add a small delay for visual effect
  });

  // Add scroll-to-top button
  const scrollButton = document.querySelector(".scroll-to-top");

  // Show/hide scroll button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  });

  // Scroll to top when button clicked
  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Activate nav link based on scroll position
  const sections = document.querySelectorAll("section, header#about");
  const navLinksItems = document.querySelectorAll("nav ul li a");

  function updateActiveNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Offset for fixed nav
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinksItems.forEach((link) => {
      link.classList.remove("active");
      if (current && link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Initial call to set active link
  updateActiveNavLink();

  // Update active link on scroll
  window.addEventListener("scroll", updateActiveNavLink);

  // Add animation to sections when they come into view
  const animateSections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const sectionObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(20px)";

        // Trigger animation after a small delay
        setTimeout(() => {
          entry.target.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);

        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  },
  observerOptions);

  animateSections.forEach((section) => {
    section.style.opacity = "0";
    sectionObserver.observe(section);
  });

  // Form submission handling with Formspree
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const formStatus = document.getElementById("form-status");

    async function handleSubmit(event) {
      event.preventDefault();

      // Simple form validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all required fields.";
        formStatus.className = "error";
        return;
      }

      const submitButton = contactForm.querySelector(".submit-button");
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          formStatus.textContent =
            "Thanks for your message! I'll get back to you soon.";
          formStatus.className = "success";
          contactForm.reset();
        } else {
          const data = await response.json();
          if (data.errors) {
            formStatus.textContent = data.errors
              .map((error) => error.message)
              .join(", ");
          } else {
            formStatus.textContent =
              "Oops! There was a problem submitting your form.";
          }
          formStatus.className = "error";
        }
      } catch (error) {
        formStatus.textContent =
          "Oops! There was a problem submitting your form.";
        formStatus.className = "error";
        console.error(error);
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }

    contactForm.addEventListener("submit", handleSubmit);
  }

  // Project Modal Functionality
  const modal = document.getElementById("project-modal");
  const modalClose = document.querySelector(".modal-close");
  const projectButtons = document.querySelectorAll(".view-project");

  // Only set up modal functionality if modal elements exist (not on blog pages)
  if (modal && modalClose) {
    // Open modal when "View Details" is clicked
    projectButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        // Get project data from data attributes
        const projectCard = this.closest(".project-card");
        const title = projectCard.getAttribute("data-title");
        const image = projectCard.getAttribute("data-image");
        const description = projectCard.getAttribute("data-description");
        const challenges = projectCard.getAttribute("data-challenges");
        const featuresJSON = projectCard.getAttribute("data-features");
        const implementation = projectCard.getAttribute("data-implementation");
        const github = projectCard.getAttribute("data-github");
        const demo = projectCard.getAttribute("data-demo");
        const tech = projectCard.getAttribute("data-tech").split(",");

        // Populate modal with project data
        document.getElementById("modal-project-title").textContent = title;
        document.getElementById("modal-project-image").src = image;
        document.getElementById("modal-project-image").alt = title;
        document.getElementById("modal-project-description").textContent =
          description;
        document.getElementById("modal-project-challenges").textContent =
          challenges;
        document.getElementById("modal-project-implementation").textContent =
          implementation;

        // Set links
        document.getElementById("modal-github-link").href = github;

        // Handle demo link - show only if demo URL exists
        const demoLink = document.getElementById("modal-demo-link");
        if (demo && demo.trim() !== "") {
          demoLink.href = demo;
          demoLink.style.display = "flex"; // Show the demo link
        } else {
          demoLink.style.display = "none"; // Hide the demo link
        }

        // Clear and populate tech tags
        const techContainer = document.getElementById("modal-project-tech");
        techContainer.innerHTML = "";
        tech.forEach((item) => {
          const span = document.createElement("span");
          span.textContent = item.trim();
          techContainer.appendChild(span);
        });

        // Clear and populate features list
        const featuresList = document.getElementById("modal-project-features");
        featuresList.innerHTML = "";
        const features = JSON.parse(featuresJSON);
        features.forEach((feature) => {
          const li = document.createElement("li");
          li.textContent = feature;
          featuresList.appendChild(li);
        });

        // Show modal
        modal.classList.add("show");
        body.style.overflow = "hidden"; // Prevent scrolling behind modal
      });
    });

    // Close modal when X is clicked
    modalClose.addEventListener("click", function () {
      modal.classList.remove("show");
      body.style.overflow = ""; // Restore scrolling
    });

    // Close modal when clicking outside the content
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("show");
        body.style.overflow = ""; // Restore scrolling
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        body.style.overflow = ""; // Restore scrolling
      }
    });
  } // End of modal functionality conditional

  // Certificates Carousel
  const initCarousel = () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const currentSlideEl = document.getElementById("current-slide");
    const totalSlidesEl = document.getElementById("total-slides");

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let slideWidth = slides[0].getBoundingClientRect().width;
    let autoplayInterval;
    let startX,
      moveX,
      isDragging = false;
    let animationId = null;

    // Update total slides count
    if (totalSlidesEl) {
      totalSlidesEl.textContent = slides.length;
    }

    // Preload adjacent images for smoother transitions
    const preloadAdjacentImages = (index) => {
      const preloadIndexes = [
        (index + 1) % slides.length,
        (index - 1 + slides.length) % slides.length,
      ];

      preloadIndexes.forEach((i) => {
        const slideImg = slides[i].querySelector("img");
        if (slideImg && slideImg.getAttribute("loading") === "lazy") {
          const newImg = new Image();
          newImg.src = slideImg.src;
          slideImg.setAttribute("loading", "eager");
        }
      });
    };

    // Set initial position and update active classes
    const updateCarousel = (animate = true) => {
      // Update transform with or without animation
      if (!animate) {
        track.style.transition = "none";
        requestAnimationFrame(() => {
          track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
          requestAnimationFrame(() => {
            track.style.transition =
              "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
          });
        });
      } else {
        track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      }

      // Update active classes for slides
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex);

        // Add aria-hidden attribute for accessibility
        slide.setAttribute("aria-hidden", index !== currentIndex);
      });

      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
        dot.setAttribute("aria-selected", index === currentIndex);
      });

      // Update counter
      if (currentSlideEl) {
        currentSlideEl.textContent = currentIndex + 1;
      }

      // Preload adjacent images
      preloadAdjacentImages(currentIndex);
    };

    // Handle window resize
    const handleResize = () => {
      slideWidth = slides[0].getBoundingClientRect().width;
      updateCarousel(false);
    };

    // Next slide
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    };

    // Previous slide
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    // Go to specific slide
    const goToSlide = (index) => {
      currentIndex = index;
      updateCarousel();
    };

    // Start autoplay
    const startAutoplay = () => {
      stopAutoplay(); // Clear any existing interval
      autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    // Stop autoplay
    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    // Touch/mouse events for swipe functionality
    const handleDragStart = (e) => {
      stopAutoplay();
      isDragging = true;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;

      // Cancel any ongoing animation
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    const handleDragMove = (e) => {
      if (!isDragging) return;

      moveX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      const diff = moveX - startX;

      // Only move the track if dragging significantly
      if (Math.abs(diff) > 5) {
        e.preventDefault();

        // Calculate how much to move (with resistance at edges)
        const translateX = -currentIndex * slideWidth + diff * 0.8;

        track.style.transition = "none";
        track.style.transform = `translateX(${translateX}px)`;
      }
    };

    const handleDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      const diff = moveX - startX;

      // Determine if we should change slides based on drag distance
      if (Math.abs(diff) > slideWidth * 0.2) {
        if (diff > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        // Return to current slide if not dragged far enough
        updateCarousel();
      }

      startAutoplay();
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (
        document.activeElement === prevButton ||
        document.activeElement === nextButton ||
        [...dots].includes(document.activeElement)
      ) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            prevSlide();
            break;
          case "ArrowRight":
            e.preventDefault();
            nextSlide();
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            if ([...dots].includes(document.activeElement)) {
              const index = parseInt(
                document.activeElement.getAttribute("data-slide")
              );
              goToSlide(index);
            }
            break;
        }

        stopAutoplay();
        startAutoplay();
      }
    };

    // Event listeners
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);

    prevButton.addEventListener("click", () => {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });

    nextButton.addEventListener("click", () => {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        stopAutoplay();
        startAutoplay();
      });

      // Keyboard accessibility for dots
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToSlide(index);
          stopAutoplay();
          startAutoplay();
        }
      });
    });

    // Touch events for mobile swipe
    track.addEventListener("touchstart", handleDragStart, { passive: false });
    track.addEventListener("touchmove", handleDragMove, { passive: false });
    track.addEventListener("touchend", handleDragEnd);

    // Mouse events for desktop drag
    track.addEventListener("mousedown", handleDragStart);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    // Pause autoplay when hovering over carousel
    carouselContainer.addEventListener("mouseenter", stopAutoplay);
    carouselContainer.addEventListener("mouseleave", startAutoplay);

    // Initialize
    updateCarousel(false);
    startAutoplay();

    // Cleanup function to remove event listeners when needed
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      track.removeEventListener("touchstart", handleDragStart);
      track.removeEventListener("touchmove", handleDragMove);
      track.removeEventListener("touchend", handleDragEnd);
      track.removeEventListener("mousedown", handleDragStart);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      carouselContainer.removeEventListener("mouseenter", stopAutoplay);
      carouselContainer.removeEventListener("mouseleave", startAutoplay);
      stopAutoplay();
    };
  };

  // Initialize carousel when DOM is loaded
  initCarousel();

  // Resume download functionality
  const resumeButton = document.querySelector(
    ".resume-download .download-button"
  );
  if (resumeButton) {
    resumeButton.addEventListener("click", function () {
      // Create a tooltip to explain how to download from Google Drive
      const showDownloadTooltip = () => {
        // Check if tooltip already exists
        if (document.querySelector(".download-tooltip")) return;

        const tooltip = document.createElement("div");
        tooltip.className = "download-tooltip";
        tooltip.innerHTML = `
          <div class="tooltip-content">
            <p><strong>To download the resume:</strong></p>
            <ol>
              <li>Click the <i class="fas fa-download"></i> icon in the top right of Google Drive viewer</li>
              <li>Or use the File → Download option from the menu</li>
            </ol>
            <button class="tooltip-close"><i class="fas fa-times"></i></button>
          </div>
        `;

        document.body.appendChild(tooltip);

        // Position the tooltip
        const buttonRect = resumeButton.getBoundingClientRect();
        tooltip.style.top = buttonRect.bottom + window.scrollY + 10 + "px";
        tooltip.style.left = buttonRect.left + window.scrollX + "px";

        // Add close button functionality
        tooltip
          .querySelector(".tooltip-close")
          .addEventListener("click", function () {
            tooltip.remove();
          });

        // Auto-remove after 10 seconds
        setTimeout(() => {
          if (document.body.contains(tooltip)) {
            tooltip.remove();
          }
        }, 10000);
      };

      // Show tooltip after a short delay to ensure the Google Drive page has opened
      setTimeout(showDownloadTooltip, 1000);
    });
  }
});
