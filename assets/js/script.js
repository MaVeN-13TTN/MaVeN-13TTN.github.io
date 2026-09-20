document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Respect visitors who prefer reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  // Hamburger menu functionality
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  function setMenu(open) {
    hamburger.classList.toggle("active", open);
    navLinks.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  hamburger.addEventListener("click", function () {
    setMenu(!hamburger.classList.contains("active"));
  });

  // Close menu when clicking on a nav link
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
      setMenu(false);
    }
  });

  // Smooth scroll for navigation links
  const allNavLinks = document.querySelectorAll(
    ".nav-links a, .hero-buttons a",
  );
  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: scrollBehavior,
      });
    });
  });

  // Add scroll animations to sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // Animate skill bars when they scroll into view.
  // Each .skill-level keeps its target width inline (so the bars still render
  // if JavaScript is unavailable); we collapse them, then animate back on view.
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.targetWidth;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  document.querySelectorAll(".skill-level").forEach((level) => {
    level.dataset.targetWidth = level.style.width;
    level.style.width = "0";
    skillObserver.observe(level);
  });

  // Contact Form Modal & EmailJS
  const contactBtn = document.getElementById("contactBtn");
  const contactModal = document.getElementById("contactModal");
  const modalClose = document.querySelector(".modal-close");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  let lastFocusedElement = null;

  // Initialize EmailJS
  emailjs.init("Txb7Gf9T2oxETCybV");

  function getFocusable() {
    return contactModal.querySelectorAll(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll on mobile
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
  }

  function closeModal() {
    contactModal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // Open modal
  contactBtn.addEventListener("click", openModal);

  // Close modal
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside
  contactModal.addEventListener("click", function (e) {
    if (e.target === contactModal) {
      closeModal();
    }
  });

  // Keyboard handling: Escape to close, Tab to keep focus inside the modal
  contactModal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "Tab") {
      const focusable = Array.from(getFocusable());
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Handle form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".btn-submit");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // EmailJS send
    emailjs
      .sendForm("service_0xart6k", "template_n7s81oc", contactForm)
      .then(
        function (response) {
          formStatus.textContent =
            "Message sent successfully! I'll get back to you soon.";
          formStatus.className = "form-status success";
          contactForm.reset();

          setTimeout(function () {
            closeModal();
            formStatus.className = "form-status";
          }, 3000);
        },
        function (error) {
          formStatus.textContent =
            "Oops! Something went wrong. Please try again or email me directly.";
          formStatus.className = "form-status error";
        },
      )
      .finally(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });

  // ALX Certificates Carousel
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-btn.next");
  const prevButton = document.querySelector(".carousel-btn.prev");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  let currentIndex = 0;
  let isTransitioning = false;

  // Clone first and last slides for infinite loop effect
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(track.children);

  // Start at the first real slide (index 1 because of the clone at start)
  currentIndex = 1;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Create indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = Array.from(indicatorsContainer.children);

  function updateIndicators() {
    let actualIndex = currentIndex - 1;
    if (actualIndex < 0) actualIndex = slides.length - 1;
    if (actualIndex >= slides.length) actualIndex = 0;

    indicators.forEach((ind, idx) => {
      ind.classList.toggle("active", idx === actualIndex);
    });
  }

  function updateSlide(smooth = true) {
    if (smooth) {
      track.style.transition = "transform 0.5s ease-in-out";
    } else {
      track.style.transition = "none";
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
  }

  function handleTransitionEnd() {
    if (currentIndex === 0) {
      // We're at the last clone, jump to the real last slide
      currentIndex = slides.length;
      updateSlide(false);
    } else if (currentIndex === allSlides.length - 1) {
      // We're at the first clone, jump to the real first slide
      currentIndex = 1;
      updateSlide(false);
    }
    isTransitioning = false;
  }

  track.addEventListener("transitionend", handleTransitionEnd);

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index + 1; // +1 to account for the clone at start
    updateSlide();
  }

  nextButton.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSlide();
  });

  prevButton.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateSlide();
  });

  // Auto-play carousel (7s interval), unless the visitor prefers reduced motion
  const carouselContainer = document.querySelector(".carousel-container");
  let autoplay = null;

  function advanceCarousel() {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex++;
      updateSlide();
    }
  }

  function startAutoplay() {
    if (prefersReducedMotion || autoplay) return;
    autoplay = setInterval(advanceCarousel, 7000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
    autoplay = null;
  }

  startAutoplay();

  // Pause on hover and on keyboard focus (WCAG 2.2.2 Pause, Stop, Hide)
  carouselContainer.addEventListener("mouseenter", stopAutoplay);
  carouselContainer.addEventListener("mouseleave", startAutoplay);
  carouselContainer.addEventListener("focusin", stopAutoplay);
  carouselContainer.addEventListener("focusout", (e) => {
    if (!carouselContainer.contains(e.relatedTarget)) startAutoplay();
  });

  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  const trackContainer = document.querySelector(".carousel-track-container");

  trackContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay(); // Pause autoplay on touch
    },
    { passive: true },
  );

  trackContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();

      // Restart autoplay after touch
      startAutoplay();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous
        if (!isTransitioning) {
          isTransitioning = true;
          currentIndex--;
          updateSlide();
        }
      } else {
        // Swipe left - go to next
        if (!isTransitioning) {
          isTransitioning = true;
          currentIndex++;
          updateSlide();
        }
      }
    }
  }

  // Keyboard navigation for carousel accessibility
  document.addEventListener("keydown", (e) => {
    if (
      document.activeElement === nextButton ||
      document.activeElement === prevButton ||
      trackContainer.contains(document.activeElement)
    ) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (!isTransitioning) {
          isTransitioning = true;
          currentIndex--;
          updateSlide();
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (!isTransitioning) {
          isTransitioning = true;
          currentIndex++;
          updateSlide();
        }
      }
    }
  });

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll to top when clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior,
    });
  });
});
