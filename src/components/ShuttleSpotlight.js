import React from "react";
import "./ShuttleSpotlight.scss";

export default function ShuttleSpotlight({ project }) {
  return (
    <article
      className="shuttle-spotlight"
      aria-labelledby="project-shuttlestats"
    >
      <div className="shuttle-spotlight__copy">
        <p className="shuttle-spotlight__eyebrow">
          Selected build / Community software
        </p>
        <h3 id="project-shuttlestats" className="shuttle-spotlight__identity">
          <span className="sr-only">ShuttleStats</span>
          <img
            src="/images/shuttlestats-wordmark-dark.svg"
            width="392"
            height="96"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </h3>
        <div className="shuttle-spotlight__detail">
          <p>
            {project?.problem ||
              "Software for the badminton community, shaped by time on court."}
          </p>
          <a
            href="https://shuttlestats.app/learn"
            target="_blank"
            rel="noreferrer"
          >
            Explore ShuttleStats <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <figure className="shuttle-spotlight__visual">
        <div className="shuttle-spotlight__screen">
          <img
            src="/images/shuttlestats-current-sessions.jpg"
            width="430"
            height="746"
            alt="ShuttleStats public product preview showing the upcoming badminton sessions screen."
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption>
          ShuttleStats <span>Product preview</span>
        </figcaption>
      </figure>
    </article>
  );
}
