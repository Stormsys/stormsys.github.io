import React, { useEffect, useRef } from "react";
import ParticleCanvas from "./ParticleCanvas";

function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (heroHeight * 0.6), 1);

      if (contentRef.current) {
        contentRef.current.style.opacity = 1 - progress;
        contentRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = 1 - progress * 3;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="hero-wrapper" ref={heroRef}>
      <ParticleCanvas />
      <div className="hero" ref={contentRef}>
        <div className="hero-name hero-anim">Diogo Moura</div>
        <div className="hero-title hero-anim">
          Engineering Manager at Meta <span>· London</span>
        </div>
        <div className="hero-divider hero-anim" />
        <p className="hero-bio hero-anim">
          I'm a builder at heart. By day I lead engineering teams shipping Applied AI
          products at <strong>Meta</strong> — before that, developer platforms at{" "}
          <strong>Checkout.com</strong> and restaurant supply &amp; availability at{" "}
          <strong>Just Eat Takeaway.com</strong>. By night I'm building apps, platforms, and
          home automations — reducing real-life friction and making mundane
          things feel exciting. I've never stopped shipping.
        </p>
        <nav className="hero-links hero-anim" aria-label="Social links">
          <a
            href="https://uk.linkedin.com/in/diogomoura1"
            target="_blank"
            rel="noreferrer"
            className="hero-link"
            aria-label="LinkedIn profile"
          >
            in
          </a>
          <a
            href="https://github.com/stormsys"
            target="_blank"
            rel="noreferrer"
            className="hero-link"
            aria-label="GitHub profile"
          >
            gh
          </a>
          <a
            href="/cv"
            target="_blank"
            rel="noreferrer"
            className="hero-link-pill"
            aria-label="View CV"
          >
            View CV →
          </a>
        </nav>
      </div>
      <div className="scroll-hint" ref={hintRef}>
        <span>projects</span>
        <div className="scroll-arrow" />
      </div>
    </header>
  );
}

export default Hero;
