import React from "react";
import SignalLoom from "./SignalLoom";

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
        <div className="hero-stage">
          <div className="hero-story">
            <h1>
              <span className="hero-line">Always a builder.</span>
              <span className="hero-line hero-line--signal">
                AI changes <br />
                the pace.
              </span>
            </h1>
            <div className="hero-intro">
              <p>
                I’m Diogo Moura. Engineer, leader, and a builder long before AI.
                I’ve always found ways to automate the tedious parts. Now, more
                of the ideas become real.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#projects">
                  Explore the work <span aria-hidden="true">↗</span>
                </a>
                <a className="inline-link" href="#contact">
                  Let’s talk <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
          <SignalLoom />
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
