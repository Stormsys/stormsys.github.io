import { useEffect } from "react";

// Working nodes, firing like neurons. A firing is one small mark: a quick
// bright attack, then a signal that runs FORWARD along its line for a short
// stretch while it decays. Firings arrive at random moments (no beat, no
// repeat), mostly faint with the occasional bright one, and a firing sometimes
// sets off one to three neighbours a moment later.
//
// A fixed pool of elements is recycled. Each firing is one Web Animations call
// on transform and opacity; there is no per-frame script. Everything stops
// when motion is reduced, the tab is hidden or the container is off screen.

// Small seeded generator: no shared clock, but the same character every load.
export function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// `pick(rand, previous)` returns one firing as { path: [[left%, top%], ...] }
// plus anything it wants handed back as `previous` when a neighbour is set off.
// Paths must only ever run forward along their line.
export function useWorkingNodes(ref, pick, seed, pace = 150) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const pool = Array.from(root.querySelectorAll(".is-live"));
    if (!pool.length || typeof pool[0].animate !== "function") return undefined;
    const rand = seeded(seed);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const free = pool.slice();
    const lives = new Set();
    const timers = new Set();
    let visible = typeof IntersectionObserver === "undefined";
    let running = false;
    let next = 0;
    // Fewer firings on a phone-sized drawing.
    const gap = () => pace * (root.clientWidth < 520 ? 2 : 1);

    const later = (run, wait) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (running) run();
      }, wait);
      timers.add(timer);
    };

    const fire = (previous, depth) => {
      const node = free.pop();
      if (!node) return;
      const firing = pick(rand, previous);
      const { path } = firing;
      const width = root.clientWidth;
      const height = root.clientHeight;
      const [left, top] = path[0];
      const at = (index) => {
        const [x, y] = path[Math.min(index, path.length - 1)];
        return `translate(${(((x - left) / 100) * width).toFixed(1)}px, ${(((y - top) / 100) * height).toFixed(1)}px)`;
      };
      const bright = rand() < 0.16;
      const peak = bright ? 0.95 : 0.3 + rand() * 0.35;
      const size = bright ? 1 + rand() * 0.35 : 0.5 + rand() * 0.45;
      const span = 450 + Math.pow(rand(), 1.6) * 1500;
      const attack = Math.min(0.3, (60 + rand() * 80) / span);
      node.style.left = `${left}%`;
      node.style.top = `${top}%`;
      node.classList.toggle("is-bright", bright);
      const life = node.animate(
        [
          { opacity: 0, transform: `${at(0)} scale(${size * 1.9})`, offset: 0 },
          { opacity: peak, transform: `${at(0)} scale(${size * 1.25})`, offset: attack },
          { opacity: peak * 0.7, transform: `${at(1)} scale(${size})`, offset: 0.4 },
          { opacity: peak * 0.32, transform: `${at(2)} scale(${size * 0.9})`, offset: 0.72 },
          { opacity: 0, transform: `${at(3)} scale(${size * 0.6})`, offset: 1 },
        ],
        { duration: span, easing: "linear", fill: "both" },
      );
      lives.add(life);
      life.onfinish = () => {
        lives.delete(life);
        // Drop the finished animation so nothing accumulates on the element.
        life.cancel();
        free.push(node);
      };
      // A short cascade: a neighbour answers a beat later, never a chain
      // reaction across the whole drawing.
      if (depth < 3 && rand() < (depth ? 0.5 : 0.34)) {
        later(() => fire(firing, depth + 1), 80 + rand() * 170);
      }
    };

    const tick = () => {
      fire(null, 0);
      // Exponential gaps: arrivals with no rhythm to find.
      next = setTimeout(tick, Math.min(1500, -Math.log(1 - rand()) * gap()));
    };

    const stop = () => {
      running = false;
      clearTimeout(next);
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
      lives.forEach((life) => {
        life.onfinish = null;
        life.cancel();
      });
      lives.clear();
      free.length = 0;
      free.push(...pool);
    };

    const sync = () => {
      const wanted =
        visible &&
        !media.matches &&
        !document.hidden &&
        document.documentElement.dataset.motion !== "off";
      if (wanted === running) return;
      if (!wanted) {
        stop();
        return;
      }
      running = true;
      next = setTimeout(tick, rand() * gap());
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            sync();
          });
    observer?.observe(root);
    media.addEventListener("change", sync);
    window.addEventListener("portfolio-motion-change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      stop();
      observer?.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("portfolio-motion-change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref, pick, seed, pace]);
}
