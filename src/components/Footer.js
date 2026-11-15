import React from "react";
export default function Footer() {
  return (
    <>
      <section id="about" className="about">
        <div>
          <span className="eyebrow">02 / A BIT ABOUT ME</span>
          <h2>
            People matter.
            <br />
            So does the craft.
          </h2>
        </div>
        <div className="about-copy">
          <p>
            I lead engineering teams at Meta working on Applied AI. Before that,
            I worked on developer platforms at Checkout.com and restaurant
            operations at Just Eat Takeaway.com. What matters to me is giving
            people the clarity, trust and room to do work they’re proud of—and
            helping them grow along the way.
          </p>
          <p>
            Building has always been personal. Badminton admin became booking
            automation, league software and a watch app. Devices that wouldn’t
            talk to each other became home integrations. I was doing this long
            before AI became part of the toolkit.
          </p>
          <p>
            Now I build with AI as a natural part of the process. It lets me
            explore more ideas and move faster from “what if” to something I can
            actually use. The tools have changed the pace. The instinct is the
            same: understand the problem, get hands-on, and make it better.
          </p>
          <div className="off-screen">
            <span className="eyebrow">ALSO INTO</span>
            <p>Boxing · Board games · Photography · Travel</p>
          </div>
          <a className="text-link" href="/cv/">
            Explore my experience →
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
