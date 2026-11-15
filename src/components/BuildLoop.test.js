import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import BuildLoop from "./BuildLoop";

test("the build loop works with a single keyboard tab stop and arrow navigation", () => {
  render(<BuildLoop />);
  const problem = screen.getByRole("tab", { name: "Problem" });
  expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Problem");
  fireEvent.keyDown(problem, { key: "End" });
  const learn = screen.getByRole("tab", { name: "Learn" });
  expect(learn).toHaveFocus();
  expect(learn).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Learn");
  fireEvent.keyDown(learn, { key: "ArrowRight" });
  expect(problem).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Problem");
  expect(screen.getAllByRole("tab").filter(tab => tab.tabIndex === 0)).toHaveLength(1);
});

test("each stage distinguishes human decisions, The engine at work and a useful outcome", () => {
  render(<BuildLoop />);
  for (const name of ["Problem", "Explore", "Build", "Test", "Learn"]) {
    fireEvent.click(screen.getByRole("tab", { name }));
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAccessibleName(name);
    expect(within(panel).getByRole("heading", {name:/My direction/})).toBeInTheDocument();
    expect(within(panel).getByRole("heading", {name:/The engine at work/})).toBeInTheDocument();
    expect(within(panel).getByRole("heading", {name:"What moves forward"})).toBeInTheDocument();
  }
});
