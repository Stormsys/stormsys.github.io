# Landing Page Redesign — Design Spec

**Date:** 2026-04-13
**Author:** Diogo Moura + Claude

## Overview

Redesign stormsys.net from a minimal business card into a professional hub with project showcase. The page should feel like an engineering manager who still ships code — authoritative, clean, with personality.

## Visual Direction

**Style:** Modern Minimal (option B) with existing earth-tone palette
**Tone:** Professional but not corporate. Builder energy.
**Animation:** Dynamic, edgy, minimal, beautiful. Scroll-driven motion throughout.

### Color Palette (existing)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-dark` | `#0f0e0b` | Page background |
| `--primary` | `#7e7758` | Accents, dividers, muted elements |
| `--secondary` | `#AFA98D` | Links, tags, interactive elements |
| `--accent` | `#d9d6c9` | Hover states, emphasis |
| `--text` | `#f5f1e6` | Headings |
| `--text-muted` | `#a8a290` | Body text |
| `--text-dim` | `#6b6556` | Descriptions, secondary text |

### Typography

- **Font:** Inter (already loaded from Google Fonts), system-ui fallback
- **Hero name:** 64px, weight 700, letter-spacing -3px
- **Hero title:** 18px, weight 500
- **Body:** 16-17px, line-height 1.75-1.8
- **Section labels:** 11px uppercase, letter-spacing 3px
- **Project names:** 16px, weight 600

## Sections

### 1. Hero (viewport height)

**Background:** Canvas-based particle network animation
- ~100 particles, earth-tone colored (`rgba(175,169,141)`)
- Connected with lines when within 160px distance
- Slow drift movement (0.3-0.4 velocity)
- Line opacity fades with distance (max 0.08 alpha)
- Particle opacity varies (0.1-0.5)
- No mouse/touch interaction — ambient only
- Contained to hero section only

**Bottom transition:** 200px linear gradient from transparent to `#0f0e0b`, seamless blend into projects section.

**Content (staggered fade-in on load):**
- Name: "Diogo Moura"
- Title: "Engineering Manager at Meta · London"
- Gradient divider line (56px)
- Bio: "I'm a builder at heart. By day I lead engineering teams shipping GenAI products at **Meta** — before that, developer platforms at **Checkout.com** and restaurant tech at **Just Eat**. By night I'm writing code — Swift apps, serverless backends, Home Assistant integrations, whatever problem needs solving next. I've never stopped shipping."
- Links: LinkedIn (circle), GitHub (circle), View CV (pill button)
- Scroll hint: "projects ↓" with animated line

**Hero parallax on scroll:** Content fades out and shifts up as user scrolls past, creating depth.

### 2. Projects Section

**Section label:** "What I Build" (11px uppercase)

**Scroll animations:**
- Each element uses IntersectionObserver to fade up (40px translate, 0.7s ease)
- Card groups use staggered delays (0s, 0.1s, 0.2s per child)
- Subtle parallax orbs in background (blurred, ~4% opacity, drift at different scroll speeds)

#### Group: Badminton 🏸

**Group description:** "I organise badminton sessions in London and got tired of spreadsheets. So I built an ecosystem — live session management, automated court booking, and on-court scoring from your wrist."

**Project cards:**

1. **TBC Singles Organiser**
   - Tags: `live`, `TypeScript`, `React`, `AWS`
   - Description: "Full-stack PWA for managing badminton singles sessions. Fair matchmaking with Elo/Glicko-2 ratings, real-time WebSocket sync, skill tracking and player stats. Runs on Lambda + DynamoDB with a kiosk mode for the tablet at the courts."
   - Link: tbc.badminton-leagues.com

2. **Shuttle Shockers Admin**
   - Tags: `TypeScript`, `AWS`
   - Description: "Automated court booking for our club sessions. Recurring schedules, member attendance, Stripe payment tracking, Google Calendar sync, and push notifications — because coordinating 20 people over WhatsApp doesn't scale."

3. **Badminton Score Companion**
   - Tags: `Swift`
   - Description: "Native iOS & watchOS app for live match scoring with CoreData sync. Track games in real time from your wrist."
   - Link: badmintonscores.app

#### Group: Smart Home 🏠

**Group description:** "If a device in my house can be automated, it probably is. Custom Home Assistant integrations for everything the defaults don't cover."

**Project cards:**

1. **Sections Grid Layout**
   - Tags: `TypeScript`
   - Description: "Custom HA dashboard view using CSS Grid with responsive layouts, kiosk mode, Jinja templates, and per-section styling. For when the default dashboard isn't enough."
   - Link: GitHub (public repo)

2. **Smart Chore Tracker**
   - Tags: `Python`
   - Description: "Household chores tracked with real sensors — power monitoring detects the washing machine finishing, contact sensors know when the bins go out, presence detection handles room-based tasks."
   - Link: GitHub (public repo)

3. **+ 5 more integrations**
   - Tags: `Python`
   - Description: "Prusa 3D printers, Ocado grocery delivery, Netgear switches, Roam EV charging, and building package tracking — all custom-built for Home Assistant."
   - Link: View all on GitHub

### 3. Footer

Minimal:
- Left: "Diogo Moura · London"
- Right: LinkedIn, GitHub links
- Top border: 1px `rgba(175,169,141,0.05)`

## Project Card Design

- Background: `rgba(175,169,141,0.03)` with `0.07` border
- Border radius: 16px
- Padding: 22px 26px
- Hover: lift 2px, slightly brighter background, shadow
- Layout: name + tags on first row, description below, links at bottom
- Tags are color-coded by language (Swift orange, TypeScript blue, Python green, AWS orange, live green with border)

## Responsive Behavior

- **Desktop (>640px):** Full layout, 900px max-width content
- **Mobile (<640px):** Reduced font sizes, cards lose left padding, project tags stack below name, footer stacks vertically

## Technical Decisions

- **No Vanta.js** — drop the dependency. Pure canvas particle system is lighter and more controllable.
- **No Three.js** — not needed for 2D particles. Saves ~500KB.
- **Keep React** — rewrite App.js as the main component with particle canvas ref.
- **Keep SCSS** — existing variable system and mixins are solid.
- **IntersectionObserver** for scroll reveals — no animation library needed.
- **Scroll event (passive)** for parallax — simple, performant with `will-change: transform`.
- **Font Awesome** — can be dropped, using text labels for links (in, gh) or switch to a lighter icon solution.

## Accessibility

- All links have proper `aria-label` attributes
- `prefers-reduced-motion`: disable particle animation, disable scroll reveals (show everything immediately)
- Focus-visible states on all interactive elements
- Minimum 44px touch targets on mobile
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`

## Performance

- Particle animation uses `requestAnimationFrame` with passive scroll listeners
- Particles only animate while hero is in viewport (IntersectionObserver)
- No external animation libraries
- Removing Three.js + Vanta saves ~500KB from bundle
