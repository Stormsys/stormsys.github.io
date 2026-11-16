import React from "react";
import { render } from "@testing-library/react";
import About from "./About";

test("About says nothing about Meta beyond the role and its one line", () => {
  const { container } = render(<About />);
  const meta = [...container.querySelectorAll("p, dd, li")]
    .map((node) => node.textContent)
    .filter((text) => /Meta/.test(text));
  expect(meta).toEqual([
    "Engineering Manager, MetaLeading teams in Applied AI",
    expect.stringMatching(/^At Meta, I lead teams working on Applied AI\./),
  ]);
  // No team size, product or outcome figure anywhere in the section.
  expect(container.textContent).not.toMatch(/\d+\s*(people|engineers|%|×)|tripled/i);
});

test("each hobby is a word with a decorative icon", () => {
  const { container } = render(<About />);
  const hobbies = [...container.querySelectorAll(".hobbies li")];
  expect(hobbies.map((item) => item.textContent)).toEqual([
    "Badminton", "Boxing", "Board games", "Photography", "3D printing",
  ]);
  hobbies.forEach((item) =>
    expect(item.querySelector("svg")).toHaveAttribute("aria-hidden", "true"),
  );
});
