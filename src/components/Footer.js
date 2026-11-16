import React from "react";
import Icon from "./Icon";
import GitHubIcon from "./GitHubIcon";
export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <div>
          <p className="eyebrow">04 / LET’S TALK</p>
          <h2>
            Good things start
            <br />
            with a conversation.
          </h2>
        </div>
        <div className="contact-links">
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/diogomoura1"
            target="_blank"
            rel="noreferrer"
          >
            Find me on LinkedIn <span aria-hidden="true"><Icon name="arrow-up-right" /></span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Diogo Moura <span aria-hidden="true">/</span> London, UK
        </span>
        <nav aria-label="Footer navigation">
          <a href="https://github.com/Stormsys" target="_blank" rel="noreferrer">
            <GitHubIcon />
            GitHub <span aria-hidden="true"><Icon name="arrow-up-right" /></span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="/cv/">
            CV <Icon name="arrow-up-right" />
          </a>
          <a href="#top">
            Back to top <Icon name="arrow-up" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
