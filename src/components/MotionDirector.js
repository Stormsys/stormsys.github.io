import { useEffect, useRef, useState } from "react";
import "./MotionDirector.scss";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const ENTRANCES =
  ".section-heading, .shuttle-block, .featured-project, .project-card, .about-heading, .about-copy";

export default function MotionDirector() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(REDUCED_MOTION).matches,
  );
  // The progress bar joins after the first render, so the first render is the
  // same markup wherever it happens: at build time or in the browser.
  const [mounted, setMounted] = useState(false);
  const progress = useRef(null);
  const enabled = !reduced;

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(REDUCED_MOTION);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("data-motion");
    root.dataset.motion = enabled ? "on" : "off";
    window.dispatchEvent(
      new CustomEvent("portfolio-motion-change", { detail: { enabled } }),
    );
    // A prerendered page holds its entrances at their starting pose (see the
    // script in public/index.html). The hold shifts them down, so on release
    // re-measure the ones the observer saw as not yet in view.
    const release = () => root.removeAttribute("data-motion-wait");
    const inView = (element) => {
      const box = element.getBoundingClientRect();
      const shown =
        Math.min(window.innerHeight, box.bottom) - Math.max(0, box.top);
      return box.height > 0 && shown / box.height >= 0.08;
    };
    if (!enabled || !("IntersectionObserver" in window)) release();
    if (!enabled)
      return () => {
        if (previous === null) root.removeAttribute("data-motion");
        else root.setAttribute("data-motion", previous);
      };

    const main = document.querySelector("main");
    const seen = new WeakSet();
    const animated = new Set();
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              const held = root.hasAttribute("data-motion-wait");
              release();
              entries.forEach(({ target, isIntersecting }) => {
                if (!isIntersecting && !(held && inView(target))) return;
                target.classList.add("motion-enter");
                animated.add(target);
                observer.unobserve(target);
              });
            },
            { threshold: 0.08 },
          )
        : null;
    const discover = () => {
      if (!main || !observer) return;
      main.querySelectorAll(ENTRANCES).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };
    discover();
    const mutations = new MutationObserver(discover);
    if (main) mutations.observe(main, { childList: true, subtree: true });

    const artwork = document.querySelector(".product-devices");
    const figure = artwork?.closest(".product-figure");
    const desktop = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    let frame = 0;
    const render = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const fraction =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${fraction})`;
      if (!artwork || !figure) return;
      if (!desktop.matches) {
        artwork.style.removeProperty("--motion-drift");
        return;
      }
      const box = figure.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      const offset = Math.max(
        -10,
        Math.min(
          10,
          (window.innerHeight / 2 - box.top - box.height / 2) * 0.025,
        ),
      );
      artwork.style.setProperty("--motion-drift", `${offset.toFixed(2)}px`);
    };
    const schedule = () => {
      if (!frame && !document.hidden)
        frame = window.requestAnimationFrame(render);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    desktop.addEventListener("change", schedule);
    schedule();
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      animated.forEach((element) => element.classList.remove("motion-enter"));
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      desktop.removeEventListener("change", schedule);
      artwork?.style.removeProperty("--motion-drift");
      if (previous === null) root.removeAttribute("data-motion");
      else root.setAttribute("data-motion", previous);
    };
  }, [enabled]);

  return (
    <>
      {mounted && enabled && (
        <div className="motion-progress" aria-hidden="true">
          <span ref={progress} />
        </div>
      )}

    </>
  );
}
