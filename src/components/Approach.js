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
          Multiple models. My own infrastructure. Home-grown pipelines and native
          workflows. I build the system that lets me explore and ship more —
          and stay accountable for the direction, the details and the result.
        </p>
      </div>
      <BuildLoop />
    </section>
  );
}
