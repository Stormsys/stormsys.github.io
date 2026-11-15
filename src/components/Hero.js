import React from "react";
export default function Hero() {
  return (
    <>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#top">
          dm<span>.</span>
        </a>
        <div>
          <a href="#projects">Selected work</a>
          <a href="#about">About</a>
          <a href="/cv/">
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
      <header className="hero" id="top">
        <div className="eyebrow">
          <span className="status-dot" /> ENGINEERING LEADER & HANDS-ON BUILDER
        </div>
        <h1>
          Good teams.
          <br />
          Useful software.
          <br />
          <span>A little curiosity.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            I'm Diogo Moura. I lead engineering teams at Meta and build things
            that make everyday life work a little better.
          </p>
          <a
            className="round-link"
            href="#projects"
            aria-label="Explore selected work"
          >
            ↓
          </a>
        </div>
        <div className="hero-meta">
          <span>BASED IN LONDON, UK</span>
          <span>PEOPLE · PLATFORMS · PRODUCTS</span>
        </div>
      </header>
    </>
  );
}
