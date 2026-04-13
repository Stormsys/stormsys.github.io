import React from "react";
import ScrollReveal from "./ScrollReveal";

function Footer() {
  return (
    <ScrollReveal>
      <footer className="site-footer">
        <div className="footer-text">Diogo Moura · London</div>
        <nav className="footer-links" aria-label="Footer links">
          <a
            href="https://uk.linkedin.com/in/diogomoura1"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/stormsys"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </nav>
      </footer>
    </ScrollReveal>
  );
}

export default Footer;
