import React, { useEffect, useRef, useState } from "react";
import "./SignalLoom.scss";

// A small, deterministic vector illustration. No canvas loop or external assets.
const threads = Array.from({ length: 33 }, (_, index) => {
  const offset = (index - 16) * 8;
  return `M 30 180 C 150 180, 145 ${180 + offset}, 288 ${180 + offset} S 455 180, 570 180`;
});

export default function SignalLoom() {
  const [amplified, setAmplified] = useState(false);
  const [iteration, setIteration] = useState(0);
  const figure = useRef(null);
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
        <svg viewBox="0 0 600 360" fill="none">
          <path
            className="loom-axis"
            d="M30 30 V330 M570 30 V330 M0 180 H600"
          />
          <g className="loom-thread-shape">
            {threads.map((path, i) => (
              <path
                className="loom-thread"
                key={i}
                d={path}
                style={{ "--thread": i }}
              />
            ))}
          </g>
          <g className="loom-thread-shape loom-travellers" key={iteration}>
            {threads
              .filter((_, i) => i % 4 === 0)
              .map((path, i) => (
                <path
                  key={i}
                  d={path}
                  pathLength="100"
                  style={{ "--thread": i }}
                />
              ))}
          </g>
          <circle className="loom-source" cx="30" cy="180" r="6" />
          <rect
            className="loom-result"
            x="562"
            y="172"
            width="16"
            height="16"
            rx="2"
          />
          <path className="loom-result-tick" d="m566 180 3 3 5-6" />
        </svg>
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
              setIteration(iteration + 1);
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
