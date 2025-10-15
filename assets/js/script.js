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
  });

  // Close modal
  modalClose.addEventListener("click", function () {
    contactModal.classList.remove("active");
  });

  // Close modal when clicking outside
  contactModal.addEventListener("click", function (e) {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && contactModal.classList.contains("active")) {
      contactModal.classList.remove("active");
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
});
