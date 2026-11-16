// Non-merge commits per ISO week, weeks 19–46 of 2026 (4 May – 15 November).
// Snapshot on 16 November 2026. Kept apart from the drawing so the chart style
// can be swapped without touching the numbers.
export const WEEKLY_COMMITS = [
  282, 74, 397, 412, 624, 950, 826, 850, 732, 1276, 898, 999, 1221, 1327, 635,
  1247, 649, 668, 1111, 684, 2485, 2553, 1072, 648, 1026, 1034, 495, 531,
];
export const COMMITS_CAPTION = "Commits a week, May to November 2026";
export const COMMITS_PEAK_LABEL = "2,553 in one week";
export const COMMITS_TEXT_EQUIVALENT =
  ": from 74 in the quietest week to a peak of 2,553 in late September";
export const SNAPSHOT_NOTE = "Snapshot on 16 November 2026.";

// Calendar-month totals. `week` is the index in WEEKLY_COMMITS where the month
// starts on the chart's time scale. November is a part month (1 to 16).
export const MONTHLY_COMMITS = [
  { name: "May", total: "1,322", week: 0 },
  { name: "Jun", total: "3,493", week: 4 },
  { name: "Jul", total: "4,691", week: 8 },
  { name: "Aug", total: "4,121", week: 13 },
  { name: "Sep", total: "6,536", week: 17 },
  { name: "Oct", total: "4,631", week: 22 },
  { name: "Nov", total: "1,074", week: 26, part: "1–16" },
];
