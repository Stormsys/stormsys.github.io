import React, { useEffect, useRef } from "react";
import Icon from "./Icon";
import SignalLoom from "./SignalLoom";

// The header takes the tone of the section passing beneath it, so it never
// slices the dark section with a light bar. An observer watches a thin line at
// the header's middle; no scroll handler.
function useNavTone(nav) {
  useEffect(() => {
    const dark = document.querySelector(".approach");
    if (!dark || typeof IntersectionObserver === "undefined") return undefined;
    let observer;
    const watch = () => {
      observer?.disconnect();
      const middle = Math.round(nav.current.offsetHeight / 2);
      observer = new IntersectionObserver(
        ([entry]) => {
          nav.current.dataset.tone = entry.isIntersecting ? "dark" : "light";
        },
        {
          rootMargin: `-${middle}px 0px -${Math.max(0, window.innerHeight - middle - 1)}px 0px`,
        },
      );
      observer.observe(dark);
    };
    watch();
    window.addEventListener("resize", watch);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", watch);
    };
  }, [nav]);
}

export default function Hero() {
  const nav = useRef(null);
  useNavTone(nav);
  return (
    <>
      <nav className="site-nav" aria-label="Main navigation" ref={nav}>
        <a className="wordmark" href="#top" aria-label="Diogo Moura — home">
          dm<span>.</span>
        </a>
        <div>
          <a href="#projects">Selected work</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
          <a className="nav-cv" href="/cv/">
            CV <span aria-hidden="true"><Icon name="arrow-up-right" /></span>
          </a>
        </div>
      </nav>
      <header className="hero" id="top">
        <p className="eyebrow">
          DIOGO MOURA <span className="separator">/</span> BUILDER · ENGINEER ·
          LEADER
        </p>
        <div className="hero-stage">
          <div className="hero-story">
            <h1>
              <span className="hero-line">Feel the friction.</span>
              <span className="hero-line hero-line--signal">
                Build beyond it.
              </span>
            </h1>
            <div className="hero-intro">
              <p>
                I’m Diogo. A builder long before AI. Now the cost of fixing
                something has fallen so far that I can act the moment I feel the
                pain. Build faster, push the boundaries and think bigger every
                day, without lowering the bar.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#projects">
                  Explore the work <span aria-hidden="true"><Icon name="arrow-down" /></span>
                </a>
                <a className="inline-link" href="#contact">
                  Let’s talk <span aria-hidden="true"><Icon name="arrow-down" /></span>
                </a>
              </div>
            </div>
          </div>
          <SignalLoom />
        </div>
        <div className="hero-meta">
          <span>
            Engineering Manager, Applied AI at <strong>Meta</strong>
          </span>
          <span>
            Previously <strong>Checkout.com</strong> & <strong>Just Eat</strong>
          </span>
          <span>London, UK</span>
        </div>
      </header>
    </>
  );
}
