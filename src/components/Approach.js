import React, { useRef } from "react";
import { useApproachStory } from "./approachMotion";
import BuildLoop from "./BuildLoop";
import BuildProof, { Beat } from "./BuildProof";
export default function Approach() {
  const section = useRef(null);
  useApproachStory(section);
  return (
    <section
      ref={section}
      className="approach"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / SHUTTLESTATS CASE STUDY</p>
          <h2 id="approach-title">
            <span>More possibility.</span> <span>The same high bar.</span>
          </h2>
        </div>
        <p>I build the product—and the system that builds it.</p>
      </div>
      <div className="story-act">
        <BuildProof />
      </div>
      <div className="story-act">
        <Beat
          quiet
          lead="Every iteration"
          rest="informs the next"
          figure="411"
          line="autonomous workflow runs in 55 days, coordinating 2,196 agents"
        >
          <BuildLoop />
        </Beat>
      </div>
      <div className="story-act story-close">
        <div>
          <h3>
            How it feels is part
            <br />
            of how it works.
          </h3>
          <p>
            UX is just as important to me as functionality, and the small
            details matter. I feel friction more than most. AI makes that loop a
            superpower.
          </p>
        </div>
        <div>
          <h3>Small things compound.</h3>
          <p>
            The boring work is handled. So my time goes on the big picture:
            what to build, and what it becomes.
          </p>
        </div>
      </div>
    </section>
  );
}
