import React from "react";
import BuildLoop from "./BuildLoop";
export default function Approach() {
  return (
    <section
      className="approach"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / HOW I BUILD</p>
          <h2 id="approach-title">
            More possibility.
            <br />
            The same high bar.
          </h2>
        </div>
        <p>
          AI expands what I can explore and build. I stay accountable for the
          direction, the details and what ships.
        </p>
      </div>
      <BuildLoop />
    </section>
  );
}
