import React from "react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">LET’S TALK</p>
          <h2>
            Good things start
            <br />
            with a conversation.
          </h2>
        </div>
        <div className="contact-links">
          <a className="contact-link" href="mailto:diogo@stormsys.net">
            diogo@stormsys.net <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/diogomoura1"
            target="_blank"
            rel="noreferrer"
          >
            Find me on LinkedIn <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Diogo Moura <span aria-hidden="true">/</span> London, UK
        </span>
        <nav aria-label="Footer navigation">
          <a href="https://github.com/Stormsys">GitHub ↗</a>
          <a href="/cv/">CV ↗</a>
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
