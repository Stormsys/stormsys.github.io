import React from "react";

const paths = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  home: "m3 11 9-8 9 8M5 10v10h14V10M9 20v-7h6v7",
  shuttle: "m6 4 11 3 3 11-4 3L4 9 6 4Zm0 0 10 17M4 9l16 9M10 5l8 15",
};
export default function Icon({ name, className = "" }) {
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
