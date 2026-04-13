export const projectGroups = [
  {
    id: "badminton",
    name: "Badminton",
    icon: "🏸",
    colorClass: "badminton",
    description:
      "I organise badminton sessions in London and got tired of spreadsheets. So I built an ecosystem — live session management, automated court booking, and on-court scoring from your wrist.",
    projects: [
      {
        name: "TBC Singles Organiser",
        tags: [
          { label: "live", color: "live" },
          { label: "TypeScript", color: "typescript" },
          { label: "React", color: "react" },
          { label: "AWS", color: "aws" },
        ],
        description:
          "Full-stack PWA for managing badminton singles sessions. Fair matchmaking with Elo/Glicko-2 ratings, real-time WebSocket sync, skill tracking and player stats. Runs on Lambda + DynamoDB with a kiosk mode for the tablet at the courts.",
        links: [
          { label: "tbc.badminton-leagues.com", url: "https://tbc.badminton-leagues.com" },
        ],
      },
      {
        name: "Shuttle Shockers Admin",
        tags: [
          { label: "TypeScript", color: "typescript" },
          { label: "AWS", color: "aws" },
        ],
        description:
          "Automated court booking for our club sessions. Recurring schedules, member attendance, Stripe payment tracking, Google Calendar sync, and push notifications — because coordinating 20 people over WhatsApp doesn't scale.",
        links: [],
      },
      {
        name: "Badminton Score Companion",
        tags: [{ label: "Swift", color: "swift" }],
        description:
          "Native iOS & watchOS app for live match scoring with CoreData sync. Track games in real time from your wrist.",
        links: [
          { label: "badmintonscores.app", url: "https://badmintonscores.app" },
        ],
      },
    ],
  },
  {
    id: "smarthome",
    name: "Smart Home",
    icon: "🏠",
    colorClass: "smarthome",
    description:
      "If a device in my house can be automated, it probably is. Custom Home Assistant integrations for everything the defaults don't cover.",
    projects: [
      {
        name: "Sections Grid Layout",
        tags: [{ label: "TypeScript", color: "typescript" }],
        description:
          "Custom HA dashboard view using CSS Grid with responsive layouts, kiosk mode, Jinja templates, and per-section styling. For when the default dashboard isn't enough.",
        links: [
          { label: "GitHub", url: "https://github.com/Stormsys/sections-grid-layout" },
        ],
      },
      {
        name: "Smart Chore Tracker",
        tags: [{ label: "Python", color: "python" }],
        description:
          "Household chores tracked with real sensors — power monitoring detects the washing machine finishing, contact sensors know when the bins go out, presence detection handles room-based tasks.",
        links: [
          { label: "GitHub", url: "https://github.com/Stormsys/home-assistant-chores" },
        ],
      },
      {
        name: "+ 5 more integrations",
        tags: [{ label: "Python", color: "python" }],
        description:
          "Prusa 3D printers, Ocado grocery delivery, Netgear switches, Roam EV charging, and building package tracking — all custom-built for Home Assistant.",
        links: [
          { label: "View all on GitHub", url: "https://github.com/Stormsys?tab=repositories" },
        ],
      },
    ],
  },
];
