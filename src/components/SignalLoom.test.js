import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignalLoom, { seededRandom } from "./SignalLoom";
beforeEach(() => {
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
});
test("the loom keeps its frame and can be amplified and reset accessibly", () => {
  // jsdom has no canvas; the drawing is decorative and simply does not start.
  HTMLCanvasElement.prototype.getContext = () => null;
  const { container } = render(<SignalLoom seed={1} />);
  expect(container.querySelector(".signal-loom__art")).toHaveAttribute("aria-hidden", "true");
  expect(container.querySelector("canvas")).toBeInTheDocument();
  expect(container).toHaveTextContent("HUMAN INSTINCT × AI");
  expect(container).toHaveTextContent("One idea More possibilities Made useful");
  expect(container).toHaveTextContent("The instinct stays.The possibilities expand.");
  const button = screen.getByRole("button", { name: /Amplify/ });
  expect(button).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(button);
  expect(screen.getByRole("button", { name: /Reset/ })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(button);
  expect(screen.getByRole("button", { name: /Amplify/ })).toHaveAttribute("aria-pressed", "false");
});

test("the random source is seedable, so a run is repeatable", () => {
  const a = seededRandom(7);
  const b = seededRandom(7);
  expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  expect(seededRandom(8)()).not.toEqual(seededRandom(7)());
});
