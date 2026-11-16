import React from "react";

// Lucide arrows (https://lucide.dev, ISC licence), drawn thin to sit beside text.
// Each is sized in em so it tracks the type it follows; the box is larger than
// its layout footprint so the arrow reads at the size the old text arrows did.
const arrows = {
  "arrow-up-right": "M7 7h10v10M7 17 17 7",
  "arrow-down": "M12 5v14M19 12l-7 7-7-7",
  "arrow-up": "m5 12 7-7 7 7M12 19V5",
  "arrow-left": "m12 19-7-7 7-7M19 12H5",
};
const paths = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  home: "m3 11 9-8 9 8M5 10v10h14V10M9 20v-7h6v7",
  shuttle: "m6 4 11 3 3 11-4 3L4 9 6 4Zm0 0 10 17M4 9l16 9M10 5l8 15",
};
export default function Icon({ name, className = "", weight = 1 }) {
  if (arrows[name])
    return (
      <svg
        className={`icon-arrow icon-${name} ${className}`.trim()}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d={arrows[name]} />
      </svg>
    );
  return (
    <svg
      className={`ui-icon ${className}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name] || paths.grid} />
    </svg>
  );
}
