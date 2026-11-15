import { useEffect, useRef, useState } from "react";
import "./MotionDirector.scss";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const ENTRANCES =
  ".section-heading, .shuttle-spotlight, .featured-project, .project-card, .about-heading, .about-copy";

function readPaused() {
  try {
    return window.localStorage.getItem("portfolio-motion-paused") === "true";
  } catch {
    return false;
  }
}

export default function MotionDirector() {
  const [paused, setPaused] = useState(readPaused);
  const [reduced, setReduced] = useState(
    () => window.matchMedia(REDUCED_MOTION).matches,
  );
  const progress = useRef(null);
  const enabled = !paused && !reduced;

  useEffect(() => {
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
              entries.forEach(({ target, isIntersecting }) => {
                if (!isIntersecting) return;
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

  const toggle = () => {
    setPaused((current) => {
      const next = !current;
      try {
        window.localStorage.setItem("portfolio-motion-paused", String(next));
      } catch {
        /* Storage may be unavailable. */
      }
      return next;
    });
  };

  return (
    <>
      {enabled && (
        <div className="motion-progress" aria-hidden="true">
          <span ref={progress} />
        </div>
      )}
      <button
        className="motion-toggle"
        type="button"
        onClick={toggle}
        disabled={reduced}
        title={
          reduced ? "Reduced motion follows your device setting" : undefined
        }
      >
        <span className="motion-toggle-mark" aria-hidden="true">
          {enabled ? "Ⅱ" : "▷"}
        </span>
        <span className="motion-toggle-label">
          {reduced
            ? "Reduced motion"
            : paused
              ? "Resume motion"
              : "Pause motion"}
        </span>
      </button>
    </>
  );
}
