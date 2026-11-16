import React from "react";
import CommitChart from "./CommitChart";
import "./BuildProof.scss";

// The story of how it gets built: one idea per beat, each carried by one
// number or one drawing. Snapshot on 16 November 2026. Numbers only: no feature
// names, change titles, tool names or member data, and never a count of the AI
// reviewers.

// SAFETY FIGURE SLOT — drop a verified release-safety figure in here once it
// exists (for example { value: "…", label: "…" }). Until then nothing renders:
// no success percentage and no rollback count have been verified.
const SAFETY_FIGURE = null;

// One beat: the idea in large type on the left, its proof on the right.
export function Beat({ lead, rest, figure, line, note, id, quiet, children }) {
  return (
    <div className={quiet ? "story-beat story-beat--quiet" : "story-beat"} id={id}>
      <div className="story-beat__pin">
        <div className="story-beat__row">
          <h3 className="story-beat__say">
            <span>{lead}</span> <span>{rest}</span>
          </h3>
          <p className="story-beat__proof">
            <b>{figure}</b>
            <span>{line}</span>
            {note && <span className="story-beat__note">{note}</span>}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

// 554 is the count of production releases since the first, on 29 March 2026.
// Nothing else about releases is stated: no pace, rate or percentage.
export default function BuildProof() {
  return (
    <>
      <Beat
        id="proof"
        lead="One"
        rest="builder"
        figure="554"
        line="production releases since March"
        note={
          SAFETY_FIGURE && (
            <>
              <b>{SAFETY_FIGURE.value}</b> {SAFETY_FIGURE.label}
            </>
          )
        }
      />
      <Beat
        lead="Hundreds"
        rest="of possibilities"
        figure="~190 a day"
        line="agent sessions on an average day"
      >
        <CommitChart />
      </Beat>
      <Beat
        lead="Human"
        rest="judgement throughout"
        figure="1 in 5"
        line="changes I let go"
        note="Multiple AI reviewers can stop a change. I make the final call."
      />
    </>
  );
}
