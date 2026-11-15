import React, { useEffect, useRef, useState } from "react";
import "./BuildLoop.scss";

const stages = [
  {
    name: "Problem",
    title: "Find the friction worth fixing.",
    judgement:
      "Get close to the real task. Decide what would actually help and which constraints matter.",
    assistance:
      "Put multiple models to work on the problem: investigate the code, challenge the brief and bring back competing approaches.",
    output: "A clear problem to solve",
  },
  {
    name: "Explore",
    title: "Make room for better possibilities.",
    judgement:
      "Compare directions, weigh the tradeoffs and choose an idea worth putting in someone’s hands.",
    assistance:
      "Run different approaches in parallel. Build prototypes, compare the results and take the strongest direction forward.",
    output: "A direction worth testing",
  },
  {
    name: "Build",
    title: "Turn the idea into a working slice.",
    judgement:
      "Shape the behaviour, set the boundaries and stay close to the details that make it useful.",
    assistance:
      "Connect models to native development workflows, backed by my own server rack and home-grown CI/CD pipelines.",
    output: "Something that works",
  },
  {
    name: "Test",
    title: "Make it earn its place.",
    judgement:
      "Check real behaviour, edge cases and usability. Decide whether the result meets the bar.",
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

export default function BuildLoop() {
  const [active, setActive] = useState(0);
  const [flowing, setFlowing] = useState(false);
  const diagram = useRef(null);
  const tabs = useRef([]);

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
      <div className="build-loop__caption">
        <span>Human direction × An AI-native build system</span>
        <span>
          Explore the loop <span aria-hidden="true">↓</span>
        </span>
      </div>
      <div
        className="build-loop__tabs"
        ref={diagram}
        role="tablist"
        aria-label="How I work with AI"
      >
        <svg
          className="build-loop__forward"
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path pathLength="1" d="M100 1 H900" />
        </svg>
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
            style={{ "--signal-delay": `${0.2 + index * 1.1}s` }}
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
        <span>Every iteration informs the next</span>
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
          <div className="build-loop__panel-heading">
            <span className="build-loop__stage-number" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{stage.title}</h3>
          </div>
          <div className="build-loop__roles">
            <div className="build-loop__role">
              <h4>
                <span aria-hidden="true">↳</span> My direction
              </h4>
              <p>{stage.judgement}</p>
            </div>
            <div className="build-loop__role build-loop__role--ai">
              <h4>
                <span aria-hidden="true">＋</span> The engine at work
              </h4>
              <p>{stage.assistance}</p>
            </div>
            <div className="build-loop__output">
              <h4>What moves forward</h4>
              <p>
                {stage.output}
                <span aria-hidden="true">↗</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
