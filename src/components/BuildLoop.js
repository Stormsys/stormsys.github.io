import React, { useEffect, useRef, useState } from "react";
import { useWorkingNodes } from "./workingNodes";
import "./BuildLoop.scss";

// Signals on the loop's lines. They only ever travel the way the loop runs:
// left to right between the steps, right to left along the way back. Paths are
// [[left%, top%], ...]; a neighbour set off by a previous firing sits a little
// further along the same direction.
function forwardFiring(rand, previous) {
  const gap = previous ? (previous.gap + 1) % 4 : Math.floor(rand() * 4);
  const from = 10 + 20 * gap + 6 + rand() * 4;
  const to = from + (rand() < 0.2 ? 0 : 1 + rand() * 3.5);
  return {
    gap,
    path: [0, 1 / 3, 2 / 3, 1].map((step) => [from + (to - from) * step, 0]),
  };
}
function returnFiring(rand, previous) {
  const from = previous
    ? Math.max(20, previous.to - 2 - rand() * 6)
    : 20 + rand() * 66;
  const to = Math.max(13, from - (rand() < 0.2 ? 0 : 1.5 + rand() * 6));
  return {
    to,
    path: [0, 1 / 3, 2 / 3, 1].map((step) => [from + (to - from) * step, 0]),
  };
}

const stages = [
  {
    name: "Problem",
    title: "Find the friction worth fixing.",
    judgement:
      "Notice the extra step, the awkward interaction and the effort people have learned to work around. Decide what is worth fixing.",
    assistance:
      "Put multiple models to work on the problem: investigate the code, challenge the brief and bring back competing approaches.",
    output: "A clear problem to solve",
  },
  {
    name: "Explore",
    title: "Make room for better possibilities.",
    judgement:
      "Think beyond the immediate fix. Compare directions, weigh the trade-offs and choose where the effort will matter most.",
    assistance:
      "Run different approaches in parallel. Build prototypes, compare the results and take the strongest direction forward.",
    output: "A direction worth testing",
  },
  {
    name: "Build",
    title: "Turn the idea into a working slice.",
    judgement:
      "Give the experience as much care as the functionality. Shape the behaviour and the small details together.",
    assistance:
      "Connect models to native development workflows, backed by my own server rack and home-grown CI/CD pipelines.",
    output: "Useful. Thoughtful. Tangible.",
  },
  {
    name: "Test",
    title: "Make it earn its place.",
    judgement:
      "Use it as a person would. Check the flow, the edge cases and the small details—not just whether the feature works.",
    assistance:
      "Use separate passes for implementation, review and testing. Feed failures back through the pipeline and inspect the result.",
    output: "Evidence, not assumptions",
  },
  {
    name: "Learn",
    title: "Let reality shape the next version.",
    judgement:
      "Listen to feedback, notice what people struggle with and choose the next meaningful improvement.",
    assistance:
      "Improve the system as well as the product: carry useful findings into the tools, automation and workflows behind the next build.",
    output: "A sharper next question",
  },
];

export function pulseOverlap(head, tail, center, radius) {
  const overlap = Math.max(0, Math.min(head, center + radius) - Math.max(tail, center - radius));
  return Math.min(1, overlap / Math.max(0.001, Math.min(head - tail, radius * 2)));
}

export default function BuildLoop() {
  const [active, setActive] = useState(0);
  const [flowing, setFlowing] = useState(false);
  const diagram = useRef(null);
  const tabs = useRef([]);
  const elapsed = useRef(0);
  const forwardAgents = useRef(null);
  const returnAgents = useRef(null);
  useWorkingNodes(forwardAgents, forwardFiring, 7919, 520);
  useWorkingNodes(returnAgents, returnFiring, 104729, 760);

  useEffect(() => {
    if (!flowing) return undefined;
    const root = diagram.current.closest(".build-loop");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = null;
    let nodes = [];
    let start = 0;
    let end = 0;
    let pulseWidth = 0;
    const measure = () => {
      const box = diagram.current.getBoundingClientRect();
      nodes = tabs.current.map(tab => {
        const node = tab.querySelector(".build-loop__node");
        const rect = node.getBoundingClientRect();
        return { center: rect.left + rect.width / 2 - box.left, radius: node.offsetWidth / 2 };
      });
      start = nodes[0].center - nodes[0].radius;
      end = nodes[nodes.length - 1].center + nodes[nodes.length - 1].radius;
      pulseWidth = Math.min(64, Math.max(24, (end - start) * 0.08));
      root.style.setProperty("--pulse-start", `${start}px`);
      root.style.setProperty("--pulse-track-width", `${end - start}px`);
      root.style.setProperty("--pulse-width", `${pulseWidth}px`);
    };
    const draw = (now) => {
      if (previous !== null) elapsed.current += Math.min(now - previous, 64);
      previous = now;
      const phase = (elapsed.current % 10000) / 10000;
      const head = start + phase / 0.48 * (end - start + pulseWidth);
      const tail = head - pulseWidth;
      root.style.setProperty("--pulse-left", `${tail - start}px`);
      root.style.setProperty("--forward-opacity", phase < 0.48 ? "0.7" : "0");
      const returning = Math.max(0, (phase - 0.49) / 0.51);
      root.style.setProperty("--return-offset", String(0.08 - returning * 1.08));
      root.style.setProperty("--return-opacity", phase >= 0.49 ? "0.7" : "0");
      tabs.current.forEach((tab, index) => {
        const glow = phase < 0.48 ? pulseOverlap(head, tail, nodes[index].center, nodes[index].radius) : 0;
        tab.style.setProperty("--node-glow", String(glow));
      });
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = null;
      if (!media.matches && !document.hidden && document.documentElement.dataset.motion !== "off") {
        frame = requestAnimationFrame(draw);
      }
    };
    measure();
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    resize?.observe(diagram.current);
    media.addEventListener("change", sync);
    window.addEventListener("portfolio-motion-change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("portfolio-motion-change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [flowing]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setFlowing(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(diagram.current);
    return () => observer.disconnect();
  }, []);

  function handleKeyDown(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % stages.length;
    else if (event.key === "ArrowLeft")
      next = (index + stages.length - 1) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next].focus();
  }

  return (
    <div
      className="build-loop"
      style={{ "--active-stage": active }}
      data-flowing={flowing}
    >
      <div
        className="build-loop__tabs"
        ref={diagram}
        role="tablist"
        aria-label="How I work with AI"
      >
        <span className="build-loop__forward" aria-hidden="true">
          <span className="build-loop__pulse" />
        </span>
        <span
          className="build-loop__agents"
          aria-hidden="true"
          ref={forwardAgents}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((slot) => (
            <b key={slot} className="is-live" />
          ))}
        </span>
        <span className="build-loop__selection" aria-hidden="true">
          <span />
        </span>
        {stages.map((stage, index) => (
          <button
            key={stage.name}
            ref={(element) => (tabs.current[index] = element)}
            type="button"
            role="tab"
            id={`build-loop-tab-${index}`}
            aria-controls={`build-loop-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className="build-loop__tab"
          >
            <span className="build-loop__node" aria-hidden="true">
              0{index + 1}
            </span>
            <span>{stage.name}</span>
          </button>
        ))}
      </div>
      <div className="build-loop__return" aria-hidden="true">
        <svg viewBox="0 0 1000 52" preserveAspectRatio="none">
          <path d="M900 1 V23 Q900 39 884 39 H116 Q100 39 100 23 V2" />
          <path d="M94 9 L100 2 L106 9" />
          <path
            className="build-loop__feedback-trace"
            pathLength="1"
            d="M900 1 V23 Q900 39 884 39 H116 Q100 39 100 23 V2"
          />
        </svg>
        <span
          className="build-loop__agents"
          aria-hidden="true"
          ref={returnAgents}
        >
          {[0, 1, 2, 3, 4, 5].map((slot) => (
            <b key={slot} className="is-live" />
          ))}
        </span>
      </div>
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className="build-loop__panel"
          role="tabpanel"
          id={`build-loop-panel-${index}`}
          aria-labelledby={`build-loop-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
        >
          <div className="build-loop__lead">
            <h3>{stage.title}</h3>
            <div className="build-loop__output">
              <h4 className="sr-only">What moves forward</h4>
              <p>{stage.output}</p>
            </div>
          </div>
          <div className="build-loop__roles">
            <div className="build-loop__role">
              <h4 className="sr-only">My direction</h4>
              <p>{stage.judgement}</p>
            </div>
            <div className="build-loop__role build-loop__role--ai">
              <h4 className="sr-only">The engine at work</h4>
              <p>{stage.assistance}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
