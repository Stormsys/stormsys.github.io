import React from "react";
import "./ShuttleSpotlight.scss";

export default function ShuttleSpotlight({ project }) {
  return (
    <div className="shuttle-block">
      <article
        className="shuttle-spotlight"
        aria-labelledby="project-shuttlestats"
      >
        <div className="shuttle-spotlight__copy">
          <p className="shuttle-spotlight__eyebrow">
            {project?.number || "01"} / Selected build / Community software
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
            <div className="shuttle-spotlight__links">
              <a
                href="https://shuttlestats.app/learn"
                target="_blank"
                rel="noreferrer"
              >
                Explore ShuttleStats <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a className="is-inpage" href="#proof">
                See the numbers <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
        <figure className="shuttle-spotlight__visual shuttle-spotlight__visual--discover">
          <div className="shuttle-spotlight__screen shuttle-spotlight__screen--discover">
            <div className="shuttle-spotlight__club-header">
              <img
                src="/images/shuttlestats-discover-header.png"
                width="220"
                height="58"
                alt="ShuttleStats Discover"
              />
              <span className="shuttle-spotlight__profile" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="8" r="3.25" />
                  <path d="M5.5 20v-2a6.5 6.5 0 0 1 13 0v2" />
                </svg>
              </span>
            </div>
            <img
              src="/images/shuttlestats-featured-clubs.png"
              width="430"
              height="852"
              alt="ShuttleStats Featured clubs on mobile, showing the complete Generation Badminton card and club statistics."
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            ShuttleStats <span>Featured clubs</span>
          </figcaption>
        </figure>
      </article>
    </div>
  );
}
