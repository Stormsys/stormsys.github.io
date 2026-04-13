export const projectGroups = [
  {
    id: "badminton",
    name: "Badminton",
    icon: "🏸",
    colorClass: "badminton",
    description:
      "I help my club & friends group organise badminton sessions in London. Courts are in high demand, admin feels like a drag, and I got tired of WhatsApp, notes, and split focus. So I built an ecosystem — live session management, automated court booking, league rankings, and on-court scoring from your wrist.",
    projects: [
      {
        name: "Badminton Club Stats",
        subtitle: "The Badminton Collective",
        tags: [
          { label: "live", color: "live" },
          { label: "React", color: "react" },
          { label: "Lambda", color: "aws" },
          { label: "DynamoDB", color: "aws" },
          { label: "WebSockets", color: "aws" },
        ],
        fullStack: [
          "TypeScript", "React", "Vite", "Tailwind CSS v4", "TanStack Query",
          "Node.js", "Express", "AWS Lambda", "API Gateway HTTP", "API Gateway WebSocket",
          "DynamoDB", "CloudFront", "S3", "SSM Parameter Store",
          "Serverless Framework", "Vitest", "253 tests",
        ],
        problem: "Keeping members engaged between sessions and helping them track improvement over time — plus running fair, balanced singles sessions without a clipboard.",
        features: "Comprehensive admin and player-facing apps. Elo/Glicko-2 matchmaking, live WebSocket score sync, player progression tracking, an achievements system, and session wrap-up stats. Self-service tablet kiosk mode for courtside use.",
        complexity: "Server-authoritative state with DynamoDB conditional writes, queue-based matchmaking evaluating all pairwise combinations, device-scoped JWT auth. 253 tests.",
        links: [
          { label: "tbc.badminton-leagues.com", url: "https://tbc.badminton-leagues.com" },
        ],
      },
      {
        name: "Club Admin & Booking Bot",
        tags: [
          { label: "Step Functions", color: "aws" },
          { label: "Lambda", color: "aws" },
          { label: "Stripe", color: "typescript" },
          { label: "DynamoDB", color: "aws" },
        ],
        fullStack: [
          "TypeScript", "Node.js", "Express", "React 18", "Vite",
          "AWS Lambda", "Step Functions", "DynamoDB", "API Gateway",
          "CloudFront", "S3", "Serverless Framework",
          "Stripe Checkout", "Google Calendar API", "Web Push (VAPID)",
          "BeWell/Gladstone API", "Jest", "80%+ coverage",
        ],
        problem: "Coordinating 20+ players across weekly sessions — court bookings, payments, cancellations, no-shows — was consuming hours in WhatsApp threads.",
        features: "Automated pipeline that books courts via BeWell API, tracks attendance, processes Stripe payments, syncs to Google Calendar, and sends push reminders.",
        complexity: "4-step booking pipeline with Step Functions orchestration, ghost booking recovery, idempotent duplicate handling, HMAC-signed cancellation links.",
        links: [],
      },
      {
        name: "Badminton Leagues",
        tags: [
          { label: "live", color: "live" },
          { label: "React", color: "react" },
          { label: "Lambda", color: "aws" },
          { label: "API Gateway", color: "aws" },
        ],
        fullStack: [
          "TypeScript", "React 19", "Vite 7", "React Router",
          "Node.js", "AWS Lambda", "API Gateway", "DynamoDB",
          "CloudFront", "S3", "Route 53", "Serverless Framework",
        ],
        problem: "Badminton is a niche sport — all the existing league software is clunky, expensive, and designed for federations. My coach was running seasonal leagues on paper. There had to be something better, so I built it.",
        features: "Your league, run beautifully. A hybrid league & ladder platform — seasonal competitions with multiple brackets by skill level, challenge-based ladders, points-based rankings that update instantly after both players confirm results, Elo ratings for group-wide skill tracking, push notifications, and match history with performance stats. Full group management with public pages to attract members. Free to start, set up in minutes.",
        links: [
          { label: "badminton-leagues.com", url: "https://badminton-leagues.com" },
        ],
      },
      {
        name: "Badminton Scores App",
        tags: [
          { label: "Swift", color: "swift" },
          { label: "SwiftUI", color: "swift" },
          { label: "watchOS", color: "swift" },
        ],
        fullStack: [
          "Swift", "SwiftUI", "SwiftData", "WatchConnectivity",
          "watchOS 10+", "iOS 17+", "HealthKit", "MultipeerConnectivity",
          "Core Motion", "Factory DI", "XCTest",
          "AWS CDK", "S3", "CloudFront", "Universal Links",
        ],
        problem: "No way to keep score, share a live scoreboard, and track your match history — all without interrupting the game.",
        features: "Score from your wrist via watchOS, with a live courtside scoreboard on iPhone that keeps all players in sync. Full match history with stats and performance tracking over time. Singles, doubles, mixed formats with configurable rules.",
        complexity: "Actor-based WatchConnectivity with message deduplication, bidirectional phone/watch sync, SwiftData versioned schema migrations, undo/redo via snapshot stack, HealthKit workout integration, offline-first architecture.",
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
      "If a device in my house can be automated, it probably is. Custom Home Assistant integrations and dashboard tools for everything the defaults don't cover.",
    projects: [
      {
        name: "Sections Grid Layout",
        tags: [
          { label: "TypeScript", color: "typescript" },
          { label: "Lit", color: "typescript" },
          { label: "CSS Grid", color: "typescript" },
        ],
        fullStack: [
          "TypeScript", "Lit 3", "CSS Grid", "Rollup", "Vitest",
          "Home Assistant Frontend API", "Jinja Templates", "YAML", "HACS",
        ],
        problem: "Nobody made a good grid layout for Home Assistant tablets. I had a tower of card-mod hacks that kept breaking — so I decided to blend CSS Grid and the native Sections view into one beautiful package that makes wallboards actually striking.",
        features: "Full CSS Grid control with column spans, responsive breakpoints, per-section styling, Jinja templates for dynamic content, animated overlay alerts triggered by entity state, and kiosk mode for wall-mounted tablets. Drop-in replacement for the native Sections view.",
        complexity: "Three-tier manager architecture (Background, Overlay, SectionConfig), Jinja template evaluation with entity tracking and debounced re-rendering, YAML config CRUD, safe coexistence with layout-card.",
        links: [
          { label: "GitHub", url: "https://github.com/Stormsys/sections-grid-layout" },
        ],
      },
      {
        name: "ADHD Chore System",
        tags: [
          { label: "Python", color: "python" },
          { label: "Home Assistant", color: "python" },
        ],
        fullStack: [
          "Python 3.11+", "Home Assistant Core", "DataUpdateCoordinator",
          "Voluptuous", "MQTT", "HA Store", "HACS",
          "pytest", "freezegun", "488 tests",
        ],
        problem: "Todo lists don't work. Reminders get buried or ignored. The friction of opening an app to check off a chore is exactly the thing an ADHD brain won't do.",
        features: "Zero-friction chore tracking that detects completion through the physical world. Bluetooth beacons in the poop bag holder know when the dog goes out. A contact sensor in a 3D-printed pill bottle triggers when you take vitamins. A camera on the dog bowl uses AI to detect feeding. The washing machine's power draw knows it's done, and the door sensor confirms you actually unloaded it. No app, no check-offs — just do the thing and the house knows.",
        complexity: "11 pluggable detector types, full state machine (INACTIVE → PENDING → DUE → STARTED → COMPLETED), random announcement generation, reward tracking on completion, persistent state across restarts. 488 tests.",
        links: [
          { label: "GitHub", url: "https://github.com/Stormsys/home-assistant-chores" },
        ],
      },
      {
        name: "+ 5 more integrations",
        tags: [
          { label: "Python", color: "python" },
          { label: "OAuth", color: "python" },
          { label: "HACS", color: "python" },
        ],
        fullStack: [
          "Python 3.11+", "aiohttp", "OAuth 2.0 PKCE",
          "Firebase Auth", "Firestore", "HTML scraping",
          "Home Assistant Core", "HACS",
        ],
        problem: "Devices and services with no official Home Assistant integration.",
        features: "Prusa 3D printer monitoring with camera feeds. Ocado delivery tracking. Netgear switch port stats. Roam EV charging sessions. Building package notifications.",
        complexity: "OAuth 2.0 PKCE auth, HTML scraping (no API exists for Netgear), Firebase token refresh, Firestore document parsing.",
        links: [
          { label: "View all on GitHub", url: "https://github.com/Stormsys?tab=repositories" },
        ],
      },
    ],
  },
];
