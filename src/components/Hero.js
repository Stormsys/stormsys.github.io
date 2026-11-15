import React from "react";
export default function Hero() {
  return (
    <>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#top">
          dm<span>.</span>
        </a>
        <div>
          <a href="#projects">Things I’ve built</a>
          <a href="#about">About</a>
          <a href="/cv/">
            CV <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
      <header className="hero" id="top">
        <div className="eyebrow">
          <span className="status-dot" /> DIOGO MOURA / ENGINEER, MANAGER, MAKER
        </div>
        <h1>
          Always building.
          <br />
          <span>Now with more reach.</span>
        </h1>
        <p className="hero-aside">
          The curiosity came first. AI turned up the pace.
        </p>
        <div className="hero-bottom">
          <p>
            I’m Diogo. An engineer, leader and lifelong builder. I’ve always
            loved making things work better—from automating everyday tasks to
            helping teams ship. Today, AI is part of how I build, taking more of
            those ideas further, faster.
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
          <span>PEOPLE, IDEAS & THE DRIVE TO BUILD.</span>
        </div>
      </header>
    </>
  );
}
