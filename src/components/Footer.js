import React from "react";
export default function Footer() {
  return (
    <>
      <section id="about" className="about">
        <div>
          <span className="eyebrow">02 / A BIT ABOUT ME</span>
          <h2>
            Still an engineer.
            <br />
            Even in meetings.
          </h2>
        </div>
        <div className="about-copy">
          <p>
            My day job is helping engineers do great work. At Meta, that means
            teams shipping Applied AI. Before that: developer platforms at
            Checkout.com, and restaurant operations at Just Eat Takeaway.com. I
            care about giving people room to grow, with enough direction to
            build something that matters.
          </p>
          <p>
            Away from work, I wanted less badminton admin. That became booking
            automation, league software and a watch app. At home, I connect the
            things that don’t talk to each other and 3D-print the bits that
            don’t exist yet. There’s usually a fairly ordinary problem behind
            the code.
          </p>
          <div className="off-screen">
            <span className="eyebrow">ALSO INTO</span>
            <p>Boxing · Board games · Photography · Travel</p>
          </div>
          <a className="text-link" href="/cv/">
            The career bit →
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <div>
          <span className="eyebrow">SAY HELLO</span>
          <h2>
            Building something?
            <br />
            I’d like to hear about it.
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
            <a href="/cv/">CV ↗</a>
            <a href="#top">Back to top ↑</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
