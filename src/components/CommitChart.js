import React, { useRef } from "react";
import { useWorkingNodes } from "./workingNodes";
import {
  WEEKLY_COMMITS,
  MONTHLY_COMMITS,
  COMMITS_CAPTION,
  COMMITS_PEAK_LABEL,
  COMMITS_TEXT_EQUIVALENT,
  SNAPSHOT_NOTE,
} from "../data/commits";
import "./CommitChart.scss";

// The drawing lives in one function. To change the chart style, replace
// LoomBand with another component that takes the same `weeks` array; the
// figure, caption, peak label and text equivalent below stay as they are.
const WIDTH = 1120;
const HEIGHT = 180;
const THREADS = 9;

const smooth = (points) =>
  points
    .map(([x, y], index) => {
      if (!index) return `M${x} ${y}`;
      const [px, py] = points[index - 1];
      const mid = ((px + x) / 2).toFixed(1);
      return `C${mid} ${py} ${mid} ${y} ${x} ${y}`;
    })
    .join("");

const LIVE_NODES = 32;
const STILL_NODES = 9;
const STILL_SHARES = [3, 7, 5, 9, 2, 6, 8, 4, 1];

const geometry = (weeks) => {
  const peak = Math.max(...weeks);
  const step = WIDTH / weeks.length;
  const middle = HEIGHT / 2;
  return {
    middle,
    reach: (count) => (count / peak) * (middle - 6),
    // The last week runs to the right edge: the band stays open, because today
    // is not an ending.
    x: (week) =>
      week === weeks.length - 1 ? WIDTH : +(week * step + step / 2).toFixed(1),
  };
};

// The hero's thread fan, mirrored about a centre line. Its half-width at each
// week is that week's volume, measured from zero at the centre. It opens from a
// single point on the left and is left open on the right.
function LoomBand({ weeks }) {
  const { middle, reach, x } = geometry(weeks);
  const threads = [];
  for (let thread = 1; thread <= THREADS; thread += 1) {
    const share = thread / THREADS;
    [-1, 1].forEach((side) => {
      const points = weeks.map((count, week) => [
        x(week),
        +(middle + side * reach(count) * share).toFixed(1),
      ]);
      threads.push(
        <path
          key={`${thread}${side}`}
          className={thread % 3 === 0 ? "is-signal" : undefined}
          style={{ opacity: 0.3 + share * 0.45 }}
          d={smooth([[0, middle], ...points])}
        />,
      );
    });
  }
  return (
    <svg
      className="commit-chart__drawing"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {threads}
    </svg>
  );
}

// Where a thread is at a fractional week, as percentages of the band. It
// follows the same curve as the drawn path, so a node stays on its thread.
function threadPoint(weeks, at, side, share) {
  const { middle, reach, x } = geometry(weeks);
  const week = Math.min(weeks.length - 2, Math.floor(at));
  const t = at - week;
  const x0 = x(week);
  const x3 = x(week + 1);
  const mid = (x0 + x3) / 2;
  const y0 = middle + side * reach(weeks[week]) * share;
  const y3 = middle + side * reach(weeks[week + 1]) * share;
  const u = 1 - t;
  const px = x0 * u * u * u + 3 * mid * u * u * t + 3 * mid * u * t * t + x3 * t * t * t;
  const py = y0 + (y3 - y0) * (3 * t * t - 2 * t * t * t);
  return [(px / WIDTH) * 100, (py / HEIGHT) * 100];
}

// One firing: a week chosen in proportion to its volume (weighted further
// toward the busy weeks, so the peak crackles and the thin early weeks only
// spark now and then), any thread, either side, and a short run FORWARD along
// that thread. Time runs left to right, so nothing ever travels left. A
// neighbour set off by a previous firing sits on the next thread, a little
// further on.
const WEIGHTS = WEEKLY_COMMITS.map((count) => Math.pow(count, 1.35));
const WEIGHT_TOTAL = WEIGHTS.reduce((sum, weight) => sum + weight, 0);

function pickFiring(rand, previous) {
  const weeks = WEEKLY_COMMITS;
  const last = weeks.length - 1;
  const clamp = (value) => Math.min(last, Math.max(0, value));
  let from;
  let side;
  let thread;
  if (previous) {
    from = clamp(previous.to + rand() * 0.15);
    side = previous.side;
    thread = previous.thread + (rand() < 0.5 ? -1 : 1);
    if (thread < 1 || thread > THREADS) thread = previous.thread;
  } else {
    const target = rand() * WEIGHT_TOTAL;
    let running = 0;
    const week = WEIGHTS.findIndex((weight) => (running += weight) >= target);
    from = clamp(week + rand() - 0.5);
    side = rand() < 0.5 ? -1 : 1;
    thread = 1 + Math.floor(rand() * THREADS);
  }
  const to = clamp(from + (rand() < 0.25 ? 0 : 0.15 + rand() * 0.75));
  return {
    to,
    side,
    thread,
    path: [0, 1 / 3, 2 / 3, 1].map((step) =>
      threadPoint(weeks, from + (to - from) * step, side, thread / THREADS),
    ),
  };
}

// Working nodes: marks on the threads that fire like neurons, each at its own
// moment (see workingNodes.js). The still ones are the reduced-motion
// scatter. Decorative only.
function WorkingNodes({ weeks }) {
  const root = useRef(null);
  useWorkingNodes(root, pickFiring, 20261116, 120);
  const total = weeks.reduce((sum, count) => sum + count, 0);
  const still = Array.from({ length: STILL_NODES }, (_, index) => {
    const target = ((index + 0.5) / STILL_NODES) * total;
    let running = 0;
    const week = weeks.findIndex((count) => (running += count) >= target);
    const [left, top] = threadPoint(
      weeks,
      Math.min(weeks.length - 1, week + ((index * 5) % 7) / 10),
      index % 2 ? 1 : -1,
      STILL_SHARES[index] / THREADS,
    );
    return { left, top, paper: index % 4 === 1 };
  });
  return (
    <div className="commit-chart__nodes" aria-hidden="true" ref={root}>
      {still.map((node, index) => (
        <i
          key={index}
          className={node.paper ? "is-still is-paper" : "is-still"}
          style={{ left: `${node.left.toFixed(2)}%`, top: `${node.top.toFixed(2)}%` }}
        />
      ))}
      {Array.from({ length: LIVE_NODES }, (_, index) => (
        <b key={index} className="is-live" />
      ))}
    </div>
  );
}

export default function CommitChart() {
  const peakWeek = WEEKLY_COMMITS.indexOf(Math.max(...WEEKLY_COMMITS));
  return (
    <figure className="commit-chart">
      <div className="commit-chart__plot">
        <p
          className="commit-chart__peak"
          data-at={((peakWeek + 0.5) / WEEKLY_COMMITS.length).toFixed(3)}
          style={{
            "--at": `${(((peakWeek + 0.5) / WEEKLY_COMMITS.length) * 100).toFixed(2)}%`,
          }}
        >
          {COMMITS_PEAK_LABEL}
        </p>
        <div className="commit-chart__band">
          <LoomBand weeks={WEEKLY_COMMITS} />
          <WorkingNodes weeks={WEEKLY_COMMITS} />
          <span className="story-cover" aria-hidden="true" />
          <span className="commit-chart__origin" aria-hidden="true" />
        </div>
      </div>
      {/* A time scale, not an axis: where each month starts and what it held. */}
      <ol className="commit-chart__months" aria-label="Commits by month">
        {MONTHLY_COMMITS.map((month) => (
          <li
            key={month.name}
            data-at={(month.week / WEEKLY_COMMITS.length).toFixed(3)}
            className={month.part ? "is-part" : undefined}
            style={{
              "--at": `${((month.week / WEEKLY_COMMITS.length) * 100).toFixed(2)}%`,
            }}
          >
            <span>
              {month.name}
              {month.part && <span> {month.part}</span>}
            </span>
            <span className="sr-only">: </span>
            <b>{month.total}</b>
          </li>
        ))}
      </ol>
      <figcaption>
        <span>
          {COMMITS_CAPTION}
          <span className="sr-only">{COMMITS_TEXT_EQUIVALENT}</span>
        </span>
        <span>{SNAPSHOT_NOTE}</span>
      </figcaption>
    </figure>
  );
}
