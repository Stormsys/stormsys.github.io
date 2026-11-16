import React from "react";
import HobbyIcon from "./HobbyIcon";

const HOBBIES = [
  ["shuttlecock", "Badminton"],
  ["glove", "Boxing"],
  ["dices", "Board games"],
  ["camera", "Photography"],
  ["printer3d", "3D printing"],
];

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about-heading">
        <p className="eyebrow">03 / THE PERSON BEHIND THE WORK</p>
        <h2 id="about-title">
          People matter.
          <br />
          So does the craft.
        </h2>
        <dl className="career-note">
          <div className="career-note__now">
            <dt>Currently</dt>
            <dd>
              <strong>Engineering Manager, Meta</strong>
              <span>Leading teams in Applied AI</span>
            </dd>
          </div>
          <div>
            <dt>Previously</dt>
            <dd>Checkout.com · Just Eat · Ericsson</dd>
          </div>
        </dl>
        <a className="inline-link" href="/cv/">
          Explore my experience <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="about-copy">
        <p className="about-lead">
          I’m Diogo. An engineer who moved into leadership and never stopped
          building.
        </p>
        <p>
          At Meta, I lead teams working on Applied AI. Before that, I worked on
          developer platforms at Checkout.com and restaurant operations at Just
          Eat. I care about giving people the clarity, trust and space to do
          work they’re proud of.
        </p>
        <p>
          Outside work, building has always been personal. Badminton admin
          became software. Devices that wouldn’t talk to each other became
          integrations. I find it hard to leave that friction alone, and I
          build the way I lead: set the direction, hold the bar, own what
          ships.
        </p>
        <div className="off-screen">
          <span className="eyebrow">AWAY FROM THE KEYBOARD</span>
          <ul className="hobbies">
            {HOBBIES.map(([icon, label]) => (
              <li key={label}>
                <HobbyIcon name={icon} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <blockquote className="leadership-quote">
        <p>
          “His leadership style, marked by clarity and a sense of enjoyment, has
          created a positive and collaborative work environment.”
        </p>
        <footer>
          <cite>VP, Engineering · Checkout.com · 2023</cite>
          <a href="/cv/#/feedback">
            Read the feedback <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </blockquote>
    </section>
  );
}
