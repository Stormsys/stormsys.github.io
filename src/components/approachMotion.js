import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The scroll story for the ShuttleStats case study section. The page's default is the finished
// state: every word and drawing is present without this file. When motion is
// welcome it makes the section unfold as it is read:
//
//   opening   the headline settles line by line
//   one       the idea arrives and a single point appears: the band's origin
//   hundreds  scrubbed to scroll (no pin, no snap), the band draws out of that
//             point through the months; labels land as it reaches them
//   human     the number and its sentence arrive; nothing else
//   loop      the steps light once in order, then rest
//   close     the two convictions arrive slowly and simply
//
// Only transforms and opacity are animated. Reduced motion runs none of it.
const EASE = "power3.out";

export function useApproachStory(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window.matchMedia !== "function") return undefined;
    // A page opened on an anchor (for example #proof) lands there first, so
    // the story below can treat what is on screen as already told. Landed
    // again once everything has loaded, in case late layout moved the target.
    const land = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id && document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    };
    land();
    if (document.readyState !== "complete") {
      window.addEventListener("load", land, { once: true });
    }
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 701px)",
      },
      (context) => {
        const { motion, wide } = context.conditions;
        if (!motion) return undefined;
        const q = gsap.utils.selector(root);
        root.dataset.story = "on";

        // Type settles the same way everywhere: a short rise, no bounce.
        const settle = (timeline, targets, at) =>
          timeline.from(
            targets,
            { yPercent: 36, opacity: 0, duration: 0.9, stagger: 0.1, ease: EASE },
            at,
          );
        const arrive = (timeline, targets, at) =>
          timeline.from(
            targets,
            { y: 10, opacity: 0, duration: 0.7, stagger: 0.08, ease: EASE },
            at,
          );
        const timelines = [];
        const played = (trigger, start = "top 88%") => {
          const timeline = gsap.timeline({
            scrollTrigger: { trigger, start, once: true },
          });
          timelines.push([timeline, trigger]);
          return timeline;
        };
        const counter = (node, to, format) => {
          const state = { value: 0 };
          return {
            state,
            to,
            render: () => {
              node.textContent = format(Math.round(state.value));
            },
          };
        };

        // Opening.
        const opening = played(q(".section-heading")[0]);
        opening.from(q(".section-heading .eyebrow"), { opacity: 0, duration: 0.6 }, 0);
        settle(opening, q("#approach-title > span"), 0.05);
        arrive(opening, q(".section-heading > p"), 0.55);

        const [one, hundreds, human, loopBeat] = q(".story-beat");
        const say = (beat) => beat.querySelectorAll(".story-beat__say > span");
        const proof = (beat) => beat.querySelector(".story-beat__proof");

        // One builder: the idea, its number counting once, and the single
        // point the whole band will grow from.
        const first = counter(proof(one).querySelector("b"), 554, String);
        const oneLine = played(one);
        settle(oneLine, say(one), 0);
        arrive(oneLine, proof(one).children, 0.35);
        oneLine.to(
          first.state,
          { value: first.to, duration: 1.1, ease: "power2.out", onUpdate: first.render },
          0.35,
        );
        oneLine.from(
          q(".commit-chart__origin"),
          { scale: 0, opacity: 0, duration: 0.9, ease: EASE },
          0.5,
        );

        // Hundreds of possibilities: the heading arrives on its own; the band
        // is drawn by the reader's scroll.
        const second = counter(proof(hundreds).querySelector("b"), 190, (value) => `~${value} a day`);
        const hundredsLine = played(hundreds);
        settle(hundredsLine, say(hundreds), 0);
        arrive(hundredsLine, proof(hundreds).children, 0.35);
        // Counted once on arrival, not tied to scroll: a number must never
        // rest on a value that is not the real one.
        hundredsLine.to(
          second.state,
          { value: second.to, duration: 1.1, ease: "power2.out", onUpdate: second.render },
          0.35,
        );

        const chart = q(".commit-chart")[0];
        // No pin and no snap: the band draws as it rises through the screen,
        // starting the moment its top edge appears and already under way, so
        // there is never an empty frame to wait through.
        const draw = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: chart,
            start: "top 98%",
            end: wide ? "top 34%" : "top 30%",
            scrub: 0.25,
          },
        });
        draw.fromTo(chart.querySelector(".story-cover"), { scaleX: 0.88 }, { scaleX: 0, duration: 1 }, 0);
        [...chart.querySelectorAll("[data-at]")].forEach((label) => {
          draw.fromTo(
            label,
            { opacity: 0 },
            { opacity: 1, duration: 0.07 },
            Math.max(0, (Number(label.dataset.at) - 0.12) / 0.88 - 0.02),
          );
        });
        draw.fromTo(chart.querySelector("figcaption"), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.92);

        // Human judgement: the number and the sentence carry this beat alone.
        const humanLine = played(human);
        settle(humanLine, say(human), 0);
        arrive(humanLine, proof(human).children, 0.35);

        // The loop: the steps light once, in order, then rest.
        const loopLine = played(loopBeat);
        settle(loopLine, say(loopBeat), 0);
        arrive(loopLine, proof(loopBeat).children, 0.3);
        const loop = played(q(".build-loop")[0]);
        loop.from(
          q(".build-loop__tab"),
          // Cleared afterwards: a leftover transform would make each step its
          // own layer and let the pulse line show through the circles.
          { opacity: 0, y: 8, duration: 0.7, stagger: 0.12, ease: EASE, clearProps: "transform,opacity" },
          0,
        );
        loop.from(q(".build-loop__return"), { opacity: 0, duration: 0.9, ease: "power1.out" }, 0.55);
        loop.from(
          q(".build-loop__panel"),
          { opacity: 0, duration: 0.9, ease: "power1.out" },
          0.7,
        );

        // The close: slower and simpler than everything before it.
        const close = played(q(".story-close")[0], "top 90%");
        close.from(q(".story-close"), { opacity: 0, duration: 1.2, ease: "power1.out" }, 0);
        close.from(
          q(".story-close > div"),
          { y: 8, opacity: 0, duration: 1.4, stagger: 0.3, ease: "power2.out" },
          0.1,
        );

        // Arriving by anchor, refresh or back button: whatever is already on
        // screen or above it is simply there, finished. Only what the reader
        // scrolls down to gets an entrance.
        timelines.forEach(([timeline, trigger]) => {
          if (trigger.getBoundingClientRect().top < window.innerHeight * 0.88) {
            timeline.scrollTrigger?.kill();
            timeline.progress(1);
          }
        });

        return () => {
          delete root.dataset.story;
          first.state.value = first.to;
          first.render();
          second.state.value = second.to;
          second.render();
        };
      },
    );
    return () => mm.revert();
  }, [ref]);
}
