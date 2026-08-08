// Scroll-triggered reveal animations for glass panels/cards.
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Parallax: each background layer drifts vertically at its own speed on scroll.
const parallaxLayers = document.querySelectorAll(".parallax-layer");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (parallaxLayers.length && !prefersReducedMotion) {
  let ticking = false;

  const applyParallax = () => {
    const scrollY = window.scrollY;
    parallaxLayers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0;
      layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  applyParallax();
}

// Scroll cue in hero jumps to the About section.
const scrollCue = document.getElementById("scrollCue");
if (scrollCue) {
  scrollCue.addEventListener("click", () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  });
}

// Background grid toggle (footer), persisted across visits. Defaults to on.
const gridOverlay = document.getElementById("gridOverlay");
const gridToggle = document.getElementById("gridToggle");
if (gridOverlay && gridToggle) {
  const gridStored = localStorage.getItem("showGrid") !== "false";
  gridToggle.checked = gridStored;
  gridOverlay.classList.toggle("grid-visible", gridStored);

  gridToggle.addEventListener("change", () => {
    gridOverlay.classList.toggle("grid-visible", gridToggle.checked);
    localStorage.setItem("showGrid", gridToggle.checked);
  });
}

// Footer year.
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
