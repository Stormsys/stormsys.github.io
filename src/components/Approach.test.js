import React from "react";
import { render, screen } from "@testing-library/react";
import Approach from "./Approach";

// The scroll story is an enhancement over the finished page; leave it out here.
jest.mock("./approachMotion", () => ({ useApproachStory: () => {} }));

test("closes on the two convictions, in the approved words", () => {
  const { container } = render(<Approach />);
  expect(
    screen.getByRole("heading", { name: "How it feels is part of how it works." }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Small things compound." }),
  ).toBeInTheDocument();
  expect(container).toHaveTextContent(
    "The boring work is handled. So my time goes on the big picture: what to build, and what it becomes.",
  );
  expect(container).not.toHaveTextContent(/I think in years|where my attention belongs/);
});

test("says the loop's measured fact once and never counts the reviewers", () => {
  const { container } = render(<Approach />);
  expect(
    container.textContent.match(/autonomous workflow runs in 55 days, coordinating 2,196 agents/g),
  ).toHaveLength(1);
  expect(container).toHaveTextContent("Multiple AI reviewers can stop a change. I make the final call.");
  expect(container).not.toHaveTextContent(/\d+\s+(AI\s+)?reviewers|eight/i);
});
