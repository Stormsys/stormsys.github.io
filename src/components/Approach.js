import React from "react";
export default function Approach() {
  return (
    <section
      className="approach"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / HOW I BUILD</p>
          <h2 id="approach-title">
            More possibility.
            <br />
            The same high bar.
          </h2>
        </div>
        <p>
          AI is part of my working practice.
          <br />
          Curiosity and engineering judgement guide it.
        </p>
      </div>
      <div className="principles">
        <article>
          <span className="principle-number">01</span>
          <h3>Start with something real.</h3>
          <p>
            A repeated task. A clumsy workflow. Something people put up with. I
            like getting close enough to a problem to see what would actually
            help.
          </p>
        </article>
        <article>
          <span className="principle-number">02</span>
          <h3>Build with AI, from the start.</h3>
          <p>
            AI is woven into how I explore and build. It gives me room to test
            more ideas, work across more of the stack, and move from possibility
            to a working product faster.
          </p>
        </article>
        <article>
          <span className="principle-number">03</span>
          <h3>Own the result.</h3>
          <p>
            Speed matters when the result is useful. I care about the decisions,
            the details and how it behaves in someone’s hands. That’s where
            engineering judgement earns its place.
          </p>
        </article>
      </div>
    </section>
  );
}
