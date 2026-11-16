import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Projects from "./Projects";

test("keeps ShuttleStats deliberately high-level", () => {
  render(<Projects />);
  const teaser = screen.getByRole("article", { name: "ShuttleStats" });
  // Two actions inside the card: the product, and the case study below.
  expect(
    within(teaser).getAllByRole("link").map((link) => link.getAttribute("href")),
  ).toEqual(["https://shuttlestats.app/learn", "#proof"]);
  expect(within(teaser).getByRole("link", { name: /See the numbers/ })).toBeInTheDocument();
  expect(teaser.querySelector("details")).toBeNull();
  expect(teaser).not.toHaveTextContent(
    /DynamoDB|JWT|matchmaking|tests|Badminton Club Stats/i,
  );
  expect(teaser).toHaveTextContent("Software for the badminton community");
});

test("filters projects and announces the result without changing project identity", () => {
  render(<Projects />);
  expect(screen.getByRole("status")).toHaveTextContent("7 projects");
  fireEvent.click(screen.getByRole("button", { name: "Home & automation" }));
  expect(screen.getByRole("status")).toHaveTextContent("3 projects");
  expect(
    screen.queryByRole("article", { name: "ShuttleStats" }),
  ).not.toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(3);
  fireEvent.click(screen.getByRole("button", { name: "Badminton" }));
  expect(screen.getByRole("status")).toHaveTextContent("4 projects");
  expect(
    screen.getByRole("article", { name: "ShuttleStats" }),
  ).toBeInTheDocument();
});

test("no project card carries a note that is not the owner's wording", () => {
  const { container } = render(<Projects />);
  expect(container).not.toHaveTextContent(/Private build for my club/i);
  expect(container.querySelector(".project-note")).toBeNull();
});
