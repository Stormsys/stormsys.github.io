import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import MotionDirector from "./MotionDirector";

let reduced;
let desktop;
let intersections;
let mutations;
let frames;
let nextFrame;

function mediaQuery(matches) {
  const listeners = new Set();
  return {
    matches,
    addEventListener: jest.fn((_, callback) => listeners.add(callback)),
    removeEventListener: jest.fn((_, callback) => listeners.delete(callback)),
    change(value) {
      this.matches = value;
      act(() => listeners.forEach((callback) => callback({ matches: value })));
    },
  };
}

function mount() {
  return render(
    <div className="App">
      <MotionDirector />
      <main>
        <h2 className="section-heading">Selected work</h2>
        <figure className="product-figure">
          <div className="product-devices">Product preview</div>
        </figure>
      </main>
    </div>,
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-motion");
  reduced = mediaQuery(false);
  desktop = mediaQuery(true);
  intersections = [];
  mutations = [];
  frames = new Map();
  nextFrame = 0;
  jest
    .spyOn(window, "matchMedia")
    .mockImplementation((query) =>
      query.includes("prefers-reduced-motion") ? reduced : desktop,
    );
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  });
  jest
    .spyOn(window, "cancelAnimationFrame")
    .mockImplementation((id) => frames.delete(id));
  jest.spyOn(window, "MutationObserver").mockImplementation((callback) => {
    const observer = { callback, observe: jest.fn(), disconnect: jest.fn() };
    mutations.push(observer);
    return observer;
  });
  window.IntersectionObserver = jest.fn((callback) => {
    const observer = {
      callback,
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
    intersections.push(observer);
    return observer;
  });
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  delete window.IntersectionObserver;
  localStorage.clear();
  document.documentElement.removeAttribute("data-motion");
});

// JSDOM does not expose matchMedia; define it before spying in each case.
beforeAll(() => {
  window.matchMedia = () => {};
});
afterAll(() => {
  delete window.matchMedia;
});

test("pause removes entrance state, persists the preference and leaves content available", () => {
  const { unmount } = mount();
  const heading = screen.getByRole("heading", { name: "Selected work" });
  expect(heading).not.toHaveClass("motion-enter");
  act(() =>
    intersections[0].callback([{ target: heading, isIntersecting: true }]),
  );
  expect(heading).toHaveClass("motion-enter");
  fireEvent.click(screen.getByRole("button", { name: "Pause motion" }));
  expect(document.documentElement).toHaveAttribute("data-motion", "off");
  expect(heading).not.toHaveClass("motion-enter");
  expect(heading).toBeVisible();
  expect(localStorage.getItem("portfolio-motion-paused")).toBe("true");
  expect(document.querySelector(".motion-progress")).toBeNull();
  expect(intersections[0].disconnect).toHaveBeenCalledTimes(1);
  unmount();
  mount();
  expect(screen.getByRole("button", { name: "Resume motion" })).toBeEnabled();
  expect(document.documentElement).toHaveAttribute("data-motion", "off");
  fireEvent.click(screen.getByRole("button", { name: "Resume motion" }));
  expect(document.documentElement).toHaveAttribute("data-motion", "on");
  expect(localStorage.getItem("portfolio-motion-paused")).toBe("false");
});

test("device reduced motion wins over stored preference and updates live", () => {
  reduced.matches = true;
  mount();
  expect(screen.getByRole("button", { name: "Reduced motion" })).toBeDisabled();
  expect(document.documentElement).toHaveAttribute("data-motion", "off");
  expect(intersections).toHaveLength(0);
  reduced.change(false);
  expect(document.documentElement).toHaveAttribute("data-motion", "on");
  reduced.change(true);
  expect(document.documentElement).toHaveAttribute("data-motion", "off");
  expect(intersections[0].disconnect).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("heading")).toBeVisible();
});

test("unmount disconnects observers, removes listeners, cancels pending frames and restores root state", () => {
  document.documentElement.dataset.motion = "existing";
  const removeWindow = jest.spyOn(window, "removeEventListener");
  const removeDocument = jest.spyOn(document, "removeEventListener");
  const { unmount } = mount();
  const artwork = screen.getByText("Product preview");
  artwork.style.setProperty("--motion-drift", "5px");
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
  expect(intersections[0].disconnect).toHaveBeenCalledTimes(1);
  expect(mutations[0].disconnect).toHaveBeenCalledTimes(1);
  expect(removeWindow).toHaveBeenCalledWith("scroll", expect.any(Function));
  expect(removeWindow).toHaveBeenCalledWith("resize", expect.any(Function));
  expect(removeDocument).toHaveBeenCalledWith(
    "visibilitychange",
    expect.any(Function),
  );
  expect(reduced.removeEventListener).toHaveBeenCalledWith(
    "change",
    expect.any(Function),
  );
  expect(desktop.removeEventListener).toHaveBeenCalledWith(
    "change",
    expect.any(Function),
  );
  expect(artwork.style.getPropertyValue("--motion-drift")).toBe("");
  expect(document.documentElement).toHaveAttribute("data-motion", "existing");
});

test("blocked storage does not prevent pausing", () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("Blocked");
  });
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("Blocked");
  });
  mount();
  fireEvent.click(screen.getByRole("button", { name: "Pause motion" }));
  expect(document.documentElement).toHaveAttribute("data-motion", "off");
  expect(screen.getByRole("heading")).toBeVisible();
});

test("scroll bursts share one frame and artwork drift remains bounded", () => {
  mount();
  const artwork = screen.getByText("Product preview");
  jest
    .spyOn(artwork.parentElement, "getBoundingClientRect")
    .mockReturnValue({ top: -1000, bottom: 100, height: 1100 });
  fireEvent.scroll(window);
  fireEvent.scroll(window);
  expect(frames.size).toBe(1);
  act(() => {
    const callback = [...frames.values()][0];
    frames.clear();
    callback();
  });
  expect(
    Number.parseFloat(artwork.style.getPropertyValue("--motion-drift")),
  ).toBeLessThanOrEqual(10);
  desktop.change(false);
  act(() => {
    const callback = [...frames.values()][0];
    frames.clear();
    callback();
  });
  expect(artwork.style.getPropertyValue("--motion-drift")).toBe("");
});
