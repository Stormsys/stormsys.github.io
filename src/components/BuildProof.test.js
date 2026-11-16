import React from "react";
import { render, screen } from "@testing-library/react";
import BuildProof from "./BuildProof";

test("tells three beats, each with one idea and one measured fact", () => {
  render(<BuildProof />);
  const beats = screen
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.closest(".story-beat"));
  expect(
    beats.map((beat) => [
      beat.querySelector("h3").textContent,
      beat.querySelector(".story-beat__proof b").textContent,
      beat.querySelector(".story-beat__proof span").textContent,
    ]),
  ).toEqual([
    ["One builder", "554", "production releases since March"],
    ["Hundreds of possibilities", "~190 a day", "agent sessions on an average day"],
    ["Human judgement throughout", "1 in 5", "changes I let go"],
  ]);
  expect(beats[2]).toHaveTextContent(
    "Multiple AI reviewers can stop a change. I make the final call.",
  );
  // The card's "See the numbers" link lands on the first beat.
  expect(beats[0]).toHaveAttribute("id", "proof");
});

test("leaves out what is unverified, rejected or private", () => {
  const { container } = render(<BuildProof />);
  expect(container).not.toHaveTextContent(
    /%|rollback|42|tests|test files|blocked|290|unique|repositor|logs|changes proposed|638|17 a week|every week|stopped|57/i,
  );
  // The number of AI reviewers is never stated.
  expect(container).not.toHaveTextContent(/\d+\s+(AI\s+)?reviewers|eight/i);
  expect(container).toHaveTextContent("Snapshot on 16 November 2026.");
  expect(container).toHaveTextContent("agent sessions");
});

test("draws commit volume once, hidden from assistive tech, with a text equivalent", () => {
  const { container } = render(<BuildProof />);
  const figure = container.querySelector("figure");
  const drawings = figure.querySelectorAll("svg");
  expect(drawings).toHaveLength(1);
  expect(drawings[0]).toHaveAttribute("aria-hidden", "true");
  expect(container.querySelectorAll("svg")).toHaveLength(1);
  expect(figure.closest(".story-beat")).toHaveTextContent("~190 a day");
  expect(figure).toHaveTextContent("2,553 in one week");
  expect(
    [...figure.querySelectorAll(".commit-chart__months li")].map(
      (month) => month.textContent,
    ),
  ).toEqual([
    "May: 1,322",
    "Jun: 3,493",
    "Jul: 4,691",
    "Aug: 4,121",
    "Sep: 6,536",
    "Oct: 4,631",
    "Nov 1–16: 1,074",
  ]);
  // Decorative working nodes never reach assistive tech.
  expect(container.querySelector(".commit-chart__nodes")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  expect(figure).toHaveTextContent(
    "Commits a week, May to November 2026: from 74 in the quietest week to a peak of 2,553 in late September",
  );
});
