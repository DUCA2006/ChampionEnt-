/* ==========================================

   CHAMPION PORTFOLIO — MAIN JAVASCRIPT

========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* MOBILE NAVIGATION */

  const menuToggle = document.getElementById("menuToggle");

  const nav = document.getElementById("nav");

  function closeMenu() {

    if (!menuToggle || !nav) return;

    nav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation");

  }

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(

        "aria-expanded",

        String(isOpen)

      );

      menuToggle.setAttribute(

        "aria-label",

        isOpen ? "Close navigation" : "Open navigation"

      );

    });

    // Close menu after selecting a link

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });

    // Close when clicking outside navigation

    document.addEventListener("click", event => {

      if (

        nav.classList.contains("open") &&

        !nav.contains(event.target) &&

        !menuToggle.contains(event.target)

      ) {

        closeMenu();

      }

    });

    // Close with Escape key

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {

        closeMenu();

      }

    });

  }

  /* SCROLL REVEAL ANIMATIONS */

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(

    "(prefers-reduced-motion: reduce)"

  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  } else {

    const revealObserver = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },

      {

        threshold: 0.12,

        rootMargin: "0px 0px -40px 0px"

      }

    );

    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  }

  /* PAGE SCROLL PROGRESS */

  const progress = document.getElementById("pageProgress");

  let ticking = false;

  function updateProgress() {

    if (!progress) return;

    const documentHeight =

      document.documentElement.scrollHeight -

      window.innerHeight;

    const percentage = documentHeight > 0

      ? (window.scrollY / documentHeight) * 100

      : 0;

    progress.style.width = `${percentage}%`;

    ticking = false;

  }

  if (progress) {

    window.addEventListener("scroll", () => {

      if (!ticking) {

        window.requestAnimationFrame(updateProgress);

        ticking = true;

      }

    }, { passive: true });

    updateProgress();

  }

  /* AUTOMATIC COPYRIGHT YEAR */

  const year = document.getElementById("year");

  if (year) {

    year.textContent = new Date().getFullYear();

  }

  /* BACK TO TOP */

  document.querySelectorAll(".back-top").forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      window.scrollTo({

        top: 0,

        behavior: prefersReducedMotion ? "instant" : "smooth"

      });

    });

  });

  /* IMAGE LOADING OPTIMISATION */

  document.querySelectorAll("img").forEach(img => {

    if (!img.hasAttribute("loading")) {

      img.loading = "lazy";

    }

    img.decoding = "async";

  });

});