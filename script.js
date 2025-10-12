document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-links a, .hero-buttons a");
  navLinks.forEach((link) => {
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
});
