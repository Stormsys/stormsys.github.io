import React from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { act } from "react-dom/test-utils";
import App from "./App";

// The scroll story is an effect: it adds no markup, and its animation library
// does not load in the test runner (the other tests stub it the same way).
jest.mock("./components/approachMotion", () => ({ useApproachStory: () => {} }));

// The page is rendered once at build time and adopted by the browser. That is
// only safe while the first render is identical in both places, whatever the
// visitor's settings. React reports any difference when it hydrates.
function media(reducedMotion) {
  return (query) => ({
    matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
}

// The build itself runs with no browser at all (scripts/prerender.js). Here a
// browser exists, so the first render is taken under each motion setting.
function serverMarkup(reducedMotion = false) {
  window.matchMedia = media(reducedMotion);
  return renderToString(<App />);
}

function hydrateWith(markup, reducedMotion) {
  window.matchMedia = media(reducedMotion);
  const container = document.createElement("div");
  container.innerHTML = markup;
  document.body.appendChild(container);
  const errors = jest.spyOn(console, "error").mockImplementation(() => {});
  act(() => {
    ReactDOM.hydrate(<App />, container);
  });
  const complaints = errors.mock.calls.map((call) => String(call[0]));
  errors.mockRestore();
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  return complaints;
}

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.ResizeObserver = window.IntersectionObserver;
  HTMLCanvasElement.prototype.getContext = () => null;
});

test("the build-time page holds the real content and nothing tied to a visitor", () => {
  const markup = serverMarkup();
  expect(markup).toContain("<h1");
  expect(markup).toContain("Feel the friction.");
  expect(markup).toContain("Badminton Scores App");
  expect(serverMarkup(true)).toBe(markup);
  expect(markup).not.toContain("motion-progress");
  expect(markup).not.toMatch(/data-tone|style="[^"]*transform/);
  expect(markup).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
});

test.each([
  ["motion on", false],
  ["reduced motion", true],
])("the browser adopts the build-time page without a mismatch (%s)", (_, reducedMotion) => {
  expect(hydrateWith(serverMarkup(), reducedMotion)).toEqual([]);
});

test("the check reports a mismatch when the two renders differ", () => {
  const altered = serverMarkup().replace("Feel the friction.", "Something else.");
  expect(hydrateWith(altered, false).join(" ")).toMatch(/did not match/i);
});
