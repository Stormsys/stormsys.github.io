import React from "react";
export default function Footer() {
  return (
    <>
      <section id="about" className="about">
        <div>
          <span className="eyebrow">02 / THE PERSON BEHIND THE WORK</span>
          <h2>
            Engineer at heart.
            <br />
            Leader by practice.
          </h2>
        </div>
        <div className="about-copy">
          <p>
            I work at the intersection of people, platforms and products. At
            Meta, I lead teams shipping Applied AI. Before that, I worked on
            developer platforms at Checkout.com and restaurant operations at
            Just Eat Takeaway.com.
          </p>
          <p>
            Outside work, I follow my curiosity: building apps, connecting
            devices and finding better ways to run a badminton club. The common
            thread is making something useful, then making it better.
          </p>
          <a className="text-link" href="/cv/">
            Explore my experience ↗
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <div>
          <span className="eyebrow">LET'S CONNECT</span>
          <h2>
            Always up for a<br />
            good conversation.
          </h2>
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/diogomoura1"
          >
            Say hello on LinkedIn ↗
          </a>
        </div>
        <div className="footer-bottom">
          <span>Diogo Moura · London</span>
          <nav aria-label="Footer navigation">
            <a href="https://github.com/Stormsys">GitHub ↗</a>
            <a href="/cv/">Résumé ↗</a>
            <a href="#top">Back to top ↑</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
