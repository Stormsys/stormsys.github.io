import React, { useRef, useEffect, useState } from "react";

function ScrollReveal({ children, className = "", stagger = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseClass = stagger ? "reveal-stagger" : "reveal";
  const visibleClass = visible ? "visible" : "";

  return (
    <div ref={ref} className={`${baseClass} ${visibleClass} ${className}`}>
      {children}
    </div>
  );
}

export default ScrollReveal;
