import React from "react";

export default function Hero() {
  return (
    <>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Diogo Moura — home">
          dm<span>.</span>
        </a>
        <div>
          <a href="#projects">Selected work</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
          <a className="nav-cv" href="/cv/">
            CV <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
      <header className="hero" id="top">
        <p className="eyebrow">
          DIOGO MOURA <span className="separator">/</span> ENGINEER · LEADER ·
          BUILDER
        </p>
        <h1>
          Always a builder.
          <br />
          <span>AI changes the pace.</span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-intro">
            <p>
              I’ve always built things and automated the tedious parts. Now I
              build with AI at the core—exploring further, moving faster, and
              turning more ideas into something useful.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#projects">
                Explore the work <span aria-hidden="true">↗</span>
              </a>
              <a className="inline-link" href="#approach">
                How I think about building <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-note">
            <span className="signal-mark" aria-hidden="true">
              ↗
            </span>
            <p>
              The tools keep evolving.
              <br />
              The drive was always there.
            </p>
          </div>
        </div>
        <div className="hero-meta">
          <span>
            Engineering Manager at <strong>Meta</strong>
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
