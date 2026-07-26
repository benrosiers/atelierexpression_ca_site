// Lightweight parallax engine shared by index and demo pages.
// No dependencies. Combines scroll progress + pointer position, writes only
// CSS custom properties (--parallax-x/--parallax-y/--paint-rotation) that
// paint layers read via transform: translate3d(...) rotate(...).
//
// data-parallax            marks an element as animated
// data-parallax-depth      0..1, how strongly it reacts (default 0.12)
// data-parallax-axis       "x" | "y" | "both" (default "both")
// data-parallax-pointer    "true" to also react to pointer position (default false)
// data-parallax-rotate     max rotation in degrees applied with scroll (default 0)

const SCROLL_RANGE_PX = 36;
const POINTER_RANGE_PX = 12;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initParallax(root = document) {
  if (prefersReducedMotion()) return;

  const elements = Array.from(root.querySelectorAll("[data-parallax]")).map((el) => ({
    el,
    depth: parseFloat(el.dataset.parallaxDepth || "0.12"),
    axis: el.dataset.parallaxAxis || "both",
    usePointer: el.dataset.parallaxPointer === "true",
    rotateMax: parseFloat(el.dataset.parallaxRotate || "0"),
    inView: true,
  }));

  if (!elements.length) return;

  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  let scrollProgress = 0; // -1..1, position of viewport centre within document
  let pointerX = 0; // -1..1
  let pointerY = 0; // -1..1
  let queued = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = elements.find((item) => item.el === entry.target);
        if (match) match.inView = entry.isIntersecting;
      });
    },
    { rootMargin: "20% 0px 20% 0px" }
  );
  elements.forEach((item) => observer.observe(item.el));

  function readScroll() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    scrollProgress = (window.scrollY / max) * 2 - 1;
  }

  function apply() {
    queued = false;
    for (const item of elements) {
      if (!item.inView) continue;

      let x = 0;
      let y = 0;

      if (item.axis !== "y") {
        x += scrollProgress * SCROLL_RANGE_PX * item.depth * 0.4;
        if (item.usePointer && hasFinePointer) x += pointerX * POINTER_RANGE_PX * item.depth;
      }
      if (item.axis !== "x") {
        y += scrollProgress * SCROLL_RANGE_PX * item.depth;
        if (item.usePointer && hasFinePointer) y += pointerY * POINTER_RANGE_PX * item.depth;
      }

      item.el.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
      item.el.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);

      if (item.rotateMax) {
        const rotate = scrollProgress * item.rotateMax;
        item.el.style.setProperty("--paint-rotation", `${rotate.toFixed(2)}deg`);
      }
    }
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  }

  readScroll();
  schedule();

  window.addEventListener(
    "scroll",
    () => {
      readScroll();
      schedule();
    },
    { passive: true }
  );

  if (hasFinePointer) {
    window.addEventListener(
      "pointermove",
      (event) => {
        pointerX = (event.clientX / window.innerWidth) * 2 - 1;
        pointerY = (event.clientY / window.innerHeight) * 2 - 1;
        schedule();
      },
      { passive: true }
    );
  }

  window.addEventListener("resize", () => {
    readScroll();
    schedule();
  });
}
