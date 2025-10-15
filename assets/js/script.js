document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu functionality
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking on a nav link
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });

  // Smooth scroll for navigation links
  const allNavLinks = document.querySelectorAll(
    ".nav-links a, .hero-buttons a"
  );
  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
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
    }
  );

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // Animate skill bars on scroll
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  document.querySelectorAll(".skill").forEach((skill) => {
    skillObserver.observe(skill);
  });

  // Contact Form Modal & EmailJS
  const contactBtn = document.getElementById("contactBtn");
  const contactModal = document.getElementById("contactModal");
  const modalClose = document.querySelector(".modal-close");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Initialize EmailJS
  emailjs.init("Txb7Gf9T2oxETCybV");

  // Open modal
  contactBtn.addEventListener("click", function () {
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll on mobile
  });

  // Close modal
  modalClose.addEventListener("click", function () {
    contactModal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Close modal when clicking outside
  contactModal.addEventListener("click", function (e) {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && contactModal.classList.contains("active")) {
      contactModal.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
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
            contactModal.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
            formStatus.className = "form-status";
          }, 3000);
        },
        function (error) {
          formStatus.textContent =
            "Oops! Something went wrong. Please try again or email me directly.";
          formStatus.className = "form-status error";
        }
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
  const slideWidth = allSlides[0].getBoundingClientRect().width;

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

  // Auto-play carousel (increased to 7 seconds for better mobile readability)
  let autoplay = setInterval(() => {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex++;
      updateSlide();
    }
  }, 7000);

  // Pause autoplay on hover
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => {
      if (!isTransitioning) {
        isTransitioning = true;
        currentIndex++;
        updateSlide();
      }
    }, 7000);
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
      clearInterval(autoplay); // Pause autoplay on touch
    },
    { passive: true }
  );

  trackContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();

      // Restart autoplay after touch
      autoplay = setInterval(() => {
        if (!isTransitioning) {
          isTransitioning = true;
          currentIndex++;
          updateSlide();
        }
      }, 7000);
    },
    { passive: true }
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
});
