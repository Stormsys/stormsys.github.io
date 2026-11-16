import React, { useEffect, useRef, useState } from "react";
import "./SignalLoom.scss";

// "Red is friction". One idea on the left, a ticked result on the right, and
// 33 threads between them that start out tangled. Tangled thread runs hot red.
// An agent sets off along each thread at its own moment and its own speed, and
// behind it the thread runs clean and cools to thin ink. A small counter of the
// remaining crossings runs down to zero; the tick lights, the clean fan holds,
// then the tangle eases back and it runs again with new timings.
//
// Drawn on a canvas in a 600×360 space. Decorative: the figure's text is the
// accessible content. The random source is seeded, so a run is repeatable.
const N = 33;
const K = 64;
const SEED = 4503;
// Reduced motion shows one deliberate still, this far into a run: the left of
// the fan already clean, the right still tangled, agents mid-thread.
const STILL_AT = 4.6;

export const seededRandom = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const ease = (p) => {
  p = clamp(p, 0, 1);
  return p * p * (3 - 2 * p);
};
const envelope = (u) => Math.pow(Math.sin(Math.PI * clamp(u, 0, 1)), 1.25);
const alpha = (rgb, a) => `rgba(${rgb},${a})`;
const toRgb = (value, fallback) => {
  const hex = (value || "").trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  const n = parseInt(hex, 16);
  return `${n >> 16},${(n >> 8) & 255},${n & 255}`;
};

function makeThreads(S) {
  const R = S.random;
  S.threads = Array.from({ length: N }, () => ({
    y: Array.from({ length: 4 }, (_, k) => ({
      a: (R() - 0.5) * (46 - k * 8),
      f: 3 + R() * (9 + k * 7),
      ph: R() * 7,
    })),
    x: Array.from({ length: 2 }, () => ({
      a: (R() - 0.5) * 26,
      f: 6 + R() * 16,
      ph: R() * 7,
    })),
  }));
}
// Each agent has its own start delay and its own speed.
function resetRun(S) {
  const R = S.random;
  S.agents = Array.from({ length: N }, () => ({ d: R() * 2.8, v: 0.15 + R() * 0.28 }));
  S.T = 0;
  S.g = 0;
}
// A point on thread i at u (0..1), tangled by m (0 clean .. 1 tangled).
function point(S, i, u, m) {
  const e = envelope(u);
  const thread = S.threads[i];
  let n = 0;
  let nx = 0;
  if (m > 0) {
    for (const w of thread.y) n += w.a * Math.sin(w.ph + u * w.f + S.t * 0.55);
    for (const w of thread.x) nx += w.a * Math.sin(w.ph + u * w.f + S.t * 0.4);
  }
  const spread = 0.56 + 0.56 * S.a;
  // Amplified, the widest loops would leave the frame; ease them back in so
  // nothing is cut off at its edge.
  let dy = (i - 16) * 8 * spread * e + n * m * e * (1 + 0.5 * S.a);
  const reach = Math.abs(dy);
  if (reach > 120) dy = Math.sign(dy) * (120 + 48 * Math.tanh((reach - 120) / 48));
  return [30 + 540 * u + nx * m * e, 180 + dy];
}
function draw(c, S, dt) {
  const { signal, ink, paper, weight } = S.look;
  c.clearRect(0, 0, 600, 360);
  S.T += dt;
  let done = true;
  const reach = S.agents.map((agent) => {
    const v = Math.max(0, S.T - 1.2 - agent.d) * agent.v * (1 + 0.6 * S.a);
    if (v < 1.2) done = false;
    return v;
  });
  if (done) S.g += dt;
  const back = ease((S.g - 2.8) / 1.4);
  const tangle = (i, u) => Math.max(back, clamp(1 - (reach[i] - u) * 6, 0, 1));

  // Threads: hot where still tangled, cool where an agent has been. Two
  // strokes for the whole drawing.
  const hot = new Path2D();
  const cool = new Path2D();
  const points = [];
  for (let i = 0; i < N; i++) {
    points[i] = [];
    let previous = null;
    let previousTangle = 1;
    let current = null;
    for (let k = 0; k <= K; k++) {
      const u = k / K;
      const m = tangle(i, u);
      const q = point(S, i, u, m);
      points[i].push(q);
      if (previous) {
        // Continuous runs, so a thread is one line and not a row of dashes.
        const path = (m + previousTangle) / 2 > 0.5 ? hot : cool;
        if (path !== current) {
          path.moveTo(previous[0], previous[1]);
          current = path;
        }
        path.lineTo(q[0], q[1]);
      }
      previous = q;
      previousTangle = m;
    }
  }
  c.lineWidth = 0.6 * weight;
  c.strokeStyle = alpha(ink, 0.2);
  c.stroke(cool);
  c.lineWidth = 0.95 * weight;
  c.strokeStyle = alpha(signal, 0.62);
  c.stroke(hot);

  // Friction points: where neighbouring threads still cross.
  let crossings = 0;
  for (let i = 0; i < N - 1; i++) {
    for (let k = 3; k < K - 3; k++) {
      const a = points[i][k][1] - points[i + 1][k][1];
      const b = points[i][k + 1][1] - points[i + 1][k + 1][1];
      if (a * b < 0) crossings++;
    }
  }

  // Agents: small paper-filled ink rings.
  c.fillStyle = `rgb(${paper})`;
  c.strokeStyle = `rgb(${ink})`;
  c.lineWidth = 1.1 * weight;
  for (let i = 0; i < N; i++) {
    if (reach[i] <= 0 || reach[i] >= 1) continue;
    const q = point(S, i, reach[i], tangle(i, reach[i]));
    c.beginPath();
    c.arc(q[0], q[1], 2.6 * weight, 0, 7);
    c.fill();
    c.stroke();
  }

  c.font = `${S.look.type}px ui-monospace, SFMono-Regular, Consolas, monospace`;
  c.fillStyle = crossings ? `rgb(${signal})` : alpha(ink, 0.7);
  c.fillText(`friction points  ${String(crossings).padStart(3, "0")}`, 30, 30);

  // The two ends: the idea, and the result whose tick lights when it is clean.
  c.fillStyle = `rgb(${signal})`;
  c.beginPath();
  c.arc(30, 180, 6, 0, 7);
  c.fill();
  c.strokeStyle = `rgb(${ink})`;
  c.lineWidth = 1.2;
  c.fillStyle = `rgb(${paper})`;
  c.beginPath();
  c.rect(562, 172, 16, 16);
  c.fill();
  c.stroke();
  c.strokeStyle = crossings === 0 && S.g < 2.8 ? `rgb(${signal})` : `rgb(${ink})`;
  c.lineWidth = 1.4;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.beginPath();
  c.moveTo(566, 180);
  c.lineTo(569, 183);
  c.lineTo(574, 177);
  c.stroke();

  if (S.g > 4.2 && !S.still) resetRun(S);
}

function useFrictionCanvas(canvas, amplified, seed) {
  const state = useRef(null);
  useEffect(() => {
    const cv = canvas.current;
    let c = null;
    try {
      c = cv.getContext("2d");
    } catch (error) {
      c = null;
    }
    if (!c || typeof Path2D === "undefined") return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tokens = getComputedStyle(document.documentElement);
    const S = {
      random: seededRandom(seed),
      t: 0,
      a: 0,
      amp: false,
      still: false,
      look: {
        signal: toRgb(tokens.getPropertyValue("--signal"), "177,60,45"),
        ink: toRgb(tokens.getPropertyValue("--ink"), "36,36,36"),
        paper: toRgb(tokens.getPropertyValue("--paper"), "243,243,241"),
        weight: 1,
        type: 11,
      },
    };
    state.current = S;
    let visible = typeof IntersectionObserver === "undefined";
    let frame = 0;
    let last = 0;
    const moving = () =>
      !media.matches && document.documentElement.dataset.motion !== "off";
    const step = (dt) => {
      S.t += dt;
      S.a += ((S.amp ? 1 : 0) - S.a) * Math.min(1, dt * 2.5);
      draw(c, S, dt);
    };
    const begin = () => {
      S.random = seededRandom(seed);
      makeThreads(S);
      resetRun(S);
      S.t = 0;
    };
    // One deliberate frame, part-way through a run.
    const still = () => {
      S.still = true;
      S.a = S.amp ? 1 : 0;
      begin();
      for (let i = 0; i < STILL_AT * 60; i++) step(1 / 60);
    };
    S.redrawStill = () => {
      if (S.still) still();
    };
    const size = () => {
      const width = cv.clientWidth || 600;
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(width * ratio);
      cv.height = Math.round(width * 0.6 * ratio);
      const k = cv.width / 600;
      c.setTransform(k, 0, 0, k, 0, 0);
      // Small frames get heavier marks and larger type, so a phone does not
      // turn the drawing to mush or the counter to dust.
      S.look.weight = clamp(Math.pow(600 / width, 0.6), 1, 1.6);
      S.look.type = Math.max(11, Math.round((10.5 * 600) / width));
      if (S.still) still();
      else step(0);
    };
    const loop = (now) => {
      frame = 0;
      if (!visible || document.hidden || !moving()) return;
      step(Math.min(0.05, (now - last) / 1000 || 0.016));
      last = now;
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!moving()) {
        still();
        return;
      }
      if (S.still) {
        S.still = false;
        begin();
        step(0);
      }
      if (visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };
    begin();
    size();
    const resize =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(size);
    resize?.observe(cv);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              sync();
            },
            { threshold: 0.05 },
          );
    observer?.observe(cv);
    media.addEventListener("change", sync);
    window.addEventListener("portfolio-motion-change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      observer?.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("portfolio-motion-change", sync);
      document.removeEventListener("visibilitychange", sync);
      state.current = null;
    };
  }, [canvas, seed]);
  // Amplify widens the fan, deepens the tangle and speeds the agents, eased
  // in the frame loop; with motion off the still is redrawn in that state.
  useEffect(() => {
    const S = state.current;
    if (!S) return;
    S.amp = amplified;
    S.redrawStill();
  }, [amplified]);
}

export default function SignalLoom({ seed = SEED }) {
  const [amplified, setAmplified] = useState(false);
  const figure = useRef(null);
  const canvas = useRef(null);
  useFrictionCanvas(canvas, amplified, seed);
  useEffect(() => {
    const element = figure.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let point = { x: 0, y: 0 };
    const enabled = () =>
      !media.matches && document.documentElement.dataset.motion !== "off";
    const render = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const drift = enabled()
        ? Math.max(-22, Math.min(22, -rect.top * 0.045))
        : 0;
      element.style.setProperty("--loom-scroll", `${drift}px`);
      element.style.setProperty("--loom-x", `${enabled() ? point.x : 0}deg`);
      element.style.setProperty("--loom-y", `${enabled() ? point.y : 0}deg`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      point = {
        x: ((event.clientY - rect.top) / rect.height - 0.5) * -9,
        y: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
      };
      schedule();
    };
    const reset = () => {
      point = { x: 0, y: 0 };
      schedule();
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("portfolio-motion-change", reset);
    media.addEventListener("change", reset);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("portfolio-motion-change", reset);
      media.removeEventListener("change", reset);
    };
  }, []);
  return (
    <figure
      className={`signal-loom ${amplified ? "is-amplified" : ""}`}
      ref={figure}
    >
      <div className="signal-loom__topline">
        <span>HUMAN INSTINCT × AI</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="signal-loom__art" aria-hidden="true">
        <canvas ref={canvas} />
      </div>
      <figcaption>
        <div className="signal-loom__labels">
          <span>One idea</span>
          <span>More possibilities</span>
          <span>Made useful</span>
        </div>
        <div className="signal-loom__bottom">
          <p>
            The instinct stays.
            <br />
            <strong>The possibilities expand.</strong>
          </p>
          <button
            type="button"
            aria-pressed={amplified}
            onClick={() => {
              setAmplified(!amplified);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12h16M12 4v16M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            {amplified ? "Reset" : "Amplify"}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
