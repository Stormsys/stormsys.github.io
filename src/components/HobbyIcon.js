import React from "react";

// Small line icons for the hobbies row. Camera and dices are Lucide's drawings;
// Lucide has no shuttlecock, boxing glove or 3D printer, so those three are
// drawn here to the same rules: 24×24, stroke only, round caps and joins,
// currentColor, one stroke weight for the whole set.
const ICONS = {
  shuttlecock: (
    <>
      <path d="M8.5 16.5h7v1a3.5 3.5 0 0 1-7 0z" />
      <path d="M8.5 16.5 4.5 6" />
      <path d="M15.5 16.5 19.5 6" />
      <path d="M10.8 16.5 9.5 4.2" />
      <path d="M13.2 16.5 14.5 4.2" />
      <path d="M4.5 6c1.5-1.6 3.2-2.1 5-1.8 1.7-1 3.3-1 5 0 1.8-.3 3.5.2 5 1.8" />
      <path d="M6.4 11h11.2" />
    </>
  ),
  glove: (
    <>
      <path d="M8 16V8.5a4.5 4.5 0 0 1 9 0V16" />
      <path d="M8 10H6.75a2.75 2.75 0 0 0 0 5.5H8" />
      <path d="M12 10.5h5" />
      <rect x="7.5" y="16" width="10" height="4.5" rx="1.5" />
    </>
  ),
  dices: (
    <>
      <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
      <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
      <path d="M6 18h.01" />
      <path d="M10 14h.01" />
      <path d="M15 6h.01" />
      <path d="M18 9h.01" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  printer3d: (
    <>
      <path d="M4 20V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v15" />
      <path d="M2 20h20" />
      <path d="M4 8.5h16" />
      <path d="M10.25 8.5v1.75L12 12l1.75-1.75V8.5" />
      <path d="M8.5 17h7" />
      <path d="M9.5 14.5h5" />
    </>
  ),
};

export default function HobbyIcon({ name }) {
  return (
    <svg
      className="hobby-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}
