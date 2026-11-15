// Public portfolio copy. Keep ShuttleStats intentionally high-level.
export const projectGroups = [
  {
    id: "badminton",
    name: "Badminton",
    projects: [
      {
        id: "scores",
        name: "Badminton Scores App",
        category: "iPhone & Apple Watch",
        featured: true,
        problem: "Stay in the game. Keep the score on your wrist.",
        features:
          "An Apple Watch scoring app with a companion iPhone experience for live scoreboards, match history and performance tracking. Built around the way we actually play.",
        detail:
          "The interesting challenge is keeping watch and phone in sync while making scoring quick enough to use between rallies. The app supports singles and doubles, undoing a point, and reviewing the match afterwards.",
        stack: ["Swift", "SwiftUI", "watchOS", "iOS"],
        links: [
          { label: "Explore the app", url: "https://badmintonscores.app" },
        ],
      },
      {
        id: "shuttlestats",
        name: "ShuttleStats",
        category: "Community software",
        problem:
          "Software for the badminton community, shaped by time on court.",
        links: [],
      },
      {
        id: "booking",
        name: "Club Admin & Booking Bot",
        category: "Everyday automation",
        problem: "Less time organising the session. More time playing it.",
        features:
          "Court bookings, attendance, payments and reminders brought together for my club.",
        detail:
          "A practical response to the admin that used to live across WhatsApp conversations. The booking workflow connects court availability, payments and calendar updates.",
        stack: ["TypeScript", "AWS", "Stripe"],
        links: [],
      },
      {
        id: "leagues",
        name: "Badminton Leagues",
        category: "Web platform",
        problem: "A better home for leagues that started on paper.",
        features:
          "Competitions, challenge ladders and match results in one place, built for badminton groups.",
        detail:
          "Seasonal competitions sit alongside challenge-based ladders. Players can confirm results and follow their match history, while organisers manage groups and skill brackets.",
        stack: ["React", "TypeScript", "AWS"],
        links: [
          {
            label: "Visit Badminton Leagues",
            url: "https://badminton-leagues.com",
          },
        ],
      },
    ],
  },
  {
    id: "smarthome",
    name: "Home & automation",
    projects: [
      {
        id: "grid",
        name: "Sections Grid Layout",
        category: "Open source · Home Assistant",
        problem: "A home dashboard that fits the way you live.",
        features:
          "Responsive layouts and thoughtful controls for Home Assistant wallboards and tablets.",
        detail:
          "Combines CSS Grid with the native Sections view: column spans, responsive breakpoints, dynamic templates and kiosk mode, without an accumulating pile of styling workarounds.",
        stack: ["TypeScript", "Lit", "CSS Grid"],
        links: [
          {
            label: "View on GitHub",
            url: "https://github.com/Stormsys/sections-grid-layout",
          },
        ],
      },
      {
        id: "chores",
        name: "ADHD Chore System",
        category: "Open source · Automation",
        problem: "Do the thing. Let the house handle the check-off.",
        features:
          "Chore tracking connected to real-world sensors, designed to reduce the effort of remembering and recording everyday tasks.",
        detail:
          "A washing machine’s power draw signals that a cycle is done; a door sensor helps confirm it was unloaded. Physical signals replace another app to open and another box to tick.",
        stack: ["Python", "Home Assistant", "MQTT"],
        links: [
          {
            label: "View on GitHub",
            url: "https://github.com/Stormsys/home-assistant-chores",
          },
        ],
      },
      {
        id: "integrations",
        name: "Home Assistant Integrations",
        category: "Open source · Connected devices",
        problem: "Making the things that don’t talk to each other, talk.",
        features:
          "Custom connections for 3D printing, deliveries, network equipment and EV charging.",
        detail:
          "Integrations for Prusa, Ocado, Netgear, Roam EV and building package notifications. Each started with a service I wanted to bring into the same home setup.",
        stack: ["Python", "Home Assistant"],
        links: [
          {
            label: "Browse the repositories",
            url: "https://github.com/Stormsys?tab=repositories",
          },
        ],
      },
    ],
  },
];
