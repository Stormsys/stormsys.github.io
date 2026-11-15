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
          That’s annoying.
          <br />
          <span>Let’s fix it.</span>
        </h1>
        <p className="hero-aside">Usually with code. Sometimes a 3D printer.</p>
        <div className="hero-bottom">
          <p>
            I'm Diogo. Engineering Manager at Meta, badminton player, and the
            person who turns booking a court into a software project.
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
          <span>LESS ADMIN. MORE TIME ON COURT.</span>
        </div>
      </header>
    </>
  );
}
