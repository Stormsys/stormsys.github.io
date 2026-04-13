# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign stormsys.net from a minimal business card into a professional hub with animated particle hero and scrollable project showcase.

**Architecture:** Single-page React app. Hero section with canvas-based particle network, projects section with scroll-triggered animations. Remove Vanta/Three.js dependencies. All styling via SCSS with existing variable system.

**Tech Stack:** React 17, SCSS, Canvas API, IntersectionObserver, no new dependencies.

**Spec:** `docs/superpowers/specs/2026-04-13-landing-page-redesign-design.md`

---

## File Structure

### Files to create:
- `src/components/ParticleCanvas.js` — Canvas particle network animation (hero background)
- `src/components/Hero.js` — Hero section: name, title, bio, links
- `src/components/Projects.js` — Project showcase with grouped cards
- `src/components/Footer.js` — Minimal footer
- `src/components/ScrollReveal.js` — IntersectionObserver wrapper for scroll animations
- `src/data/projects.js` — Project data (names, descriptions, tags, links)
- `src/scss/_hero.scss` — Hero section styles
- `src/scss/_projects.scss` — Projects section styles
- `src/scss/_footer.scss` — Footer styles
- `src/scss/_animations.scss` — Scroll reveal + parallax animations

### Files to modify:
- `src/App.js` — Replace entire component with new layout
- `src/App.scss` — Replace with imports for new partials
- `src/index.scss` — Update body background, remove old gradient/earth-tone body bg
- `src/scss/variables.scss` — Add new design tokens for dark theme
- `src/scss/shared.scss` — Remove font-awesome import
- `public/index.html` — Update title, add meta description
- `public/manifest.json` — Update app name, theme color
- `package.json` — Remove `vanta`, `three`, `font-awesome` dependencies

### Files to keep unchanged:
- `src/index.js` — Entry point stays the same
- `src/scss/reset.scss` — CSS reset is fine
- `src/scss/mixins.scss` — Existing mixins are still useful
- `.github/workflows/react.yml` — CI/CD unchanged
- `public/CNAME` — Domain config unchanged

---

### Task 1: Update SCSS variables and global styles for dark theme

**Files:**
- Modify: `src/scss/variables.scss`
- Modify: `src/index.scss`
- Modify: `src/scss/shared.scss`

- [ ] **Step 1: Update variables.scss with new dark theme tokens**

Replace the entire contents of `src/scss/variables.scss`:

```scss
// ── Dark earth-tone palette ──
$bg-dark: #0f0e0b;
$primary: #7e7758;
$secondary: #AFA98D;
$accent: #d9d6c9;
$text-heading: #f5f1e6;
$text-body: #a8a290;
$text-muted: #8a8470;
$text-dim: #6b6556;
$text-faint: #5a5647;
$text-ghost: #3d3a32;

// Tag colors
$tag-swift: #f59e0b;
$tag-typescript: #60a5fa;
$tag-python: #4ade80;
$tag-aws: #fb923c;
$tag-live: #4ade80;

// Legacy tokens (kept for mixins compatibility)
$primary-color: $primary;
$secondary-color: $secondary;
$accent-color: $accent;
$text-color: $text-heading;
$text-shadow-color: #b4af98;
$link-color: $secondary;
$link-hover-color: $accent;

// Typography
$font-family-primary: "Inter", system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
$font-family-mono: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;

// Font weights
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Spacing scale
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;
$spacing-xxl: 3rem;

// Border radius
$border-radius-sm: 0.25rem;
$border-radius-md: 0.5rem;
$border-radius-lg: 1rem;

// Shadows
$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);

// Transitions
$transition-fast: 0.15s ease-in-out;
$transition-normal: 0.25s ease-in-out;
$transition-slow: 0.4s ease-in-out;

// Responsive breakpoints
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$content-max-width: 900px;
```

- [ ] **Step 2: Remove font-awesome import from shared.scss**

Replace the entire contents of `src/scss/shared.scss`:

```scss
@import "variables";
@import "mixins";
```

- [ ] **Step 3: Rewrite index.scss for dark theme**

Replace the entire contents of `src/index.scss`:

```scss
@import "scss/shared";
@import "scss/reset";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --bg-dark: #{$bg-dark};
  --primary: #{$primary};
  --secondary: #{$secondary};
  --accent: #{$accent};
  --text-heading: #{$text-heading};
  --text-body: #{$text-body};
  --text-muted: #{$text-muted};
  --text-dim: #{$text-dim};
}

html {
  scroll-behavior: smooth;
  height: -webkit-fill-available;
}

body {
  color: $text-heading;
  background: $bg-dark;
  font-family: $font-family-primary;
  font-weight: $font-weight-regular;
  line-height: 1.6;
  min-height: 100dvh;
  min-height: -webkit-fill-available;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  margin: 0;
  padding: 0;
}

a {
  color: $secondary;
  text-decoration: none;
  transition: color $transition-normal;

  &:hover {
    color: $accent;
  }

  &:focus-visible {
    outline: 2px solid $secondary;
    outline-offset: 2px;
    border-radius: $border-radius-sm;
  }
}

::selection {
  background: rgba(175, 169, 141, 0.25);
  color: $text-heading;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(175, 169, 141, 0.2);
  border-radius: 3px;

  &:hover {
    background: rgba(175, 169, 141, 0.35);
  }
}
```

- [ ] **Step 4: Verify SCSS compiles**

Run: `cd /workspace/stormsys.github.io && npx react-scripts build 2>&1 | tail -5`
Expected: Build may fail because App.js still imports old SCSS classes, but SCSS compilation itself should work. We'll fix the React components next.

- [ ] **Step 5: Commit**

```bash
git add src/scss/variables.scss src/scss/shared.scss src/index.scss
git commit -m "refactor: update SCSS to dark earth-tone theme, remove font-awesome"
```

---

### Task 2: Create project data file

**Files:**
- Create: `src/data/projects.js`

- [ ] **Step 1: Create the projects data file**

Create `src/data/projects.js`:

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.js
git commit -m "feat: add project showcase data"
```

---

### Task 3: Create ParticleCanvas component

**Files:**
- Create: `src/components/ParticleCanvas.js`

- [ ] **Step 1: Create the particle canvas component**

Create `src/components/ParticleCanvas.js`:

```js
import React, { useRef, useEffect, useCallback } from "react";

const PARTICLE_COUNT = 100;
const CONNECT_DISTANCE = 160;
const PARTICLE_COLOR = "175, 169, 141";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const runningRef = useRef(false);

  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      });
    }
    return particles;
  }, []);

  const draw = useCallback(() => {
    if (!runningRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = particlesRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DISTANCE) {
          const alpha = (1 - dist / CONNECT_DISTANCE) * 0.08;
          ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    for (const p of particles) {
      ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.o})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    // IntersectionObserver: only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runningRef.current = true;
          draw();
        } else {
          runningRef.current = false;
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0.1 }
    );

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [initParticles, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}

export default ParticleCanvas;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ParticleCanvas.js
git commit -m "feat: add canvas particle network component"
```

---

### Task 4: Create ScrollReveal component

**Files:**
- Create: `src/components/ScrollReveal.js`
- Create: `src/scss/_animations.scss`

- [ ] **Step 1: Create the ScrollReveal component**

Create `src/components/ScrollReveal.js`:

```js
import React, { useRef, useEffect, useState } from "react";

function ScrollReveal({ children, className = "", stagger = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseClass = stagger ? "reveal-stagger" : "reveal";
  const visibleClass = visible ? "visible" : "";

  return (
    <div ref={ref} className={`${baseClass} ${visibleClass} ${className}`}>
      {children}
    </div>
  );
}

export default ScrollReveal;
```

- [ ] **Step 2: Create the animations SCSS partial**

Create `src/scss/_animations.scss`:

```scss
@import "variables";

// ── Hero entrance animations ──
@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-anim {
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeIn 0.8s ease forwards;

  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.15}s;
    }
  }
}

// ── Scroll reveal ──
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-stagger {
  .reveal-child {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &.visible .reveal-child {
    opacity: 1;
    transform: translateY(0);

    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        transition-delay: #{($i - 1) * 0.1}s;
      }
    }
  }
}

// ── Scroll hint animation ──
@keyframes scrollDrift {
  0%, 100% {
    opacity: 0.3;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) translateY(6px);
  }
}

// ── Reduced motion ──
@media (prefers-reduced-motion: reduce) {
  .hero-anim {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .reveal,
  .reveal-stagger .reveal-child {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollReveal.js src/scss/_animations.scss
git commit -m "feat: add scroll reveal component and animation styles"
```

---

### Task 5: Create Hero component and styles

**Files:**
- Create: `src/components/Hero.js`
- Create: `src/scss/_hero.scss`

- [ ] **Step 1: Create hero SCSS**

Create `src/scss/_hero.scss`:

```scss
@import "variables";
@import "mixins";

.hero-wrapper {
  position: relative;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;

  // Bottom fade into content
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(to bottom, transparent, $bg-dark);
    z-index: 1;
    pointer-events: none;
  }
}

.hero {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 48px;
  max-width: $content-max-width;
  margin: 0 auto;
}

.hero-name {
  font-size: 64px;
  font-weight: $font-weight-bold;
  letter-spacing: -3px;
  color: $text-heading;
  margin-bottom: 8px;
  text-shadow: 0 2px 40px rgba(0, 0, 0, 0.5);
}

.hero-title {
  font-size: 18px;
  color: $secondary;
  font-weight: $font-weight-medium;
  margin-bottom: 28px;
  text-shadow: 0 1px 20px rgba(0, 0, 0, 0.5);

  span {
    color: $primary;
  }
}

.hero-divider {
  width: 56px;
  height: 3px;
  background: linear-gradient(90deg, $secondary, $primary);
  border-radius: 2px;
  margin-bottom: 28px;
}

.hero-bio {
  font-size: 17px;
  color: #c4bfad;
  max-width: 580px;
  line-height: 1.8;
  margin-bottom: 40px;
  text-shadow: 0 1px 20px rgba(0, 0, 0, 0.4);

  strong {
    color: $text-heading;
    font-weight: $font-weight-medium;
  }
}

.hero-links {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
}

.hero-link {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba($secondary, 0.08);
  border: 1px solid rgba($secondary, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $secondary;
  font-size: 13px;
  font-weight: $font-weight-semibold;
  transition: all 0.3s ease;

  &:hover {
    background: rgba($secondary, 0.18);
    border-color: rgba($secondary, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    color: $accent;
  }

  &:focus-visible {
    outline: 2px solid $secondary;
    outline-offset: 4px;
  }
}

.hero-link-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 24px;
  background: rgba($secondary, 0.08);
  border: 1px solid rgba($secondary, 0.2);
  color: $secondary;
  font-size: 13px;
  font-weight: $font-weight-medium;
  transition: all 0.3s ease;

  &:hover {
    background: rgba($secondary, 0.18);
    border-color: rgba($secondary, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    color: $accent;
  }

  &:focus-visible {
    outline: 2px solid $secondary;
    outline-offset: 4px;
  }
}

.scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: $text-faint;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: scrollDrift 2.5s ease-in-out infinite;
}

.scroll-arrow {
  width: 1px;
  height: 24px;
  background: linear-gradient(to bottom, transparent, $text-faint);
}

// ── Mobile ──
@media (max-width: $breakpoint-md) {
  .hero {
    padding: 60px 24px;
  }

  .hero-name {
    font-size: 42px;
    letter-spacing: -1.5px;
  }

  .hero-title {
    font-size: 15px;
  }

  .hero-bio {
    font-size: 15px;
  }
}
```

- [ ] **Step 2: Create the Hero component**

Create `src/components/Hero.js`:

```js
import React, { useEffect, useRef } from "react";
import ParticleCanvas from "./ParticleCanvas";

function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (heroHeight * 0.6), 1);

      if (contentRef.current) {
        contentRef.current.style.opacity = 1 - progress;
        contentRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = 1 - progress * 3;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="hero-wrapper" ref={heroRef}>
      <ParticleCanvas />
      <div className="hero" ref={contentRef}>
        <div className="hero-name hero-anim">Diogo Moura</div>
        <div className="hero-title hero-anim">
          Engineering Manager at Meta <span>· London</span>
        </div>
        <div className="hero-divider hero-anim" />
        <p className="hero-bio hero-anim">
          I'm a builder at heart. By day I lead engineering teams shipping GenAI
          products at <strong>Meta</strong> — before that, developer platforms at{" "}
          <strong>Checkout.com</strong> and restaurant tech at{" "}
          <strong>Just Eat</strong>. By night I'm writing code — Swift apps,
          serverless backends, Home Assistant integrations, whatever problem
          needs solving next. I've never stopped shipping.
        </p>
        <nav className="hero-links hero-anim" aria-label="Social links">
          <a
            href="https://uk.linkedin.com/in/diogomoura1"
            target="_blank"
            rel="noreferrer"
            className="hero-link"
            aria-label="LinkedIn profile"
          >
            in
          </a>
          <a
            href="https://github.com/stormsys"
            target="_blank"
            rel="noreferrer"
            className="hero-link"
            aria-label="GitHub profile"
          >
            gh
          </a>
          <a
            href="/cv"
            target="_blank"
            rel="noreferrer"
            className="hero-link-pill"
            aria-label="View CV"
          >
            View CV →
          </a>
        </nav>
      </div>
      <div className="scroll-hint" ref={hintRef}>
        <span>projects</span>
        <div className="scroll-arrow" />
      </div>
    </header>
  );
}

export default Hero;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.js src/scss/_hero.scss
git commit -m "feat: add hero section with particle background and parallax scroll"
```

---

### Task 6: Create Projects component and styles

**Files:**
- Create: `src/components/Projects.js`
- Create: `src/scss/_projects.scss`

- [ ] **Step 1: Create projects SCSS**

Create `src/scss/_projects.scss`:

```scss
@import "variables";

.projects {
  max-width: $content-max-width;
  margin: 0 auto;
  padding: 40px 48px 120px;
  position: relative;
}

.section-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: $primary;
  margin-bottom: 56px;
  font-weight: $font-weight-semibold;
}

// ── Parallax accent orbs ──
.floating-accents {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.accent-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.04;
  will-change: transform;

  &.a {
    width: 400px;
    height: 400px;
    background: $secondary;
    top: 10%;
    right: -100px;
  }

  &.b {
    width: 300px;
    height: 300px;
    background: $primary;
    top: 50%;
    left: -80px;
  }

  &.c {
    width: 350px;
    height: 350px;
    background: $secondary;
    top: 80%;
    right: -50px;
  }
}

// ── Project Group ──
.project-group {
  margin-bottom: 80px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.group-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  &.badminton {
    background: rgba($tag-live, 0.08);
    border: 1px solid rgba($tag-live, 0.1);
  }

  &.smarthome {
    background: rgba($tag-typescript, 0.08);
    border: 1px solid rgba($tag-typescript, 0.1);
  }
}

.group-name {
  font-size: 22px;
  font-weight: $font-weight-semibold;
  color: $accent;
  letter-spacing: -0.5px;
}

.group-desc {
  font-size: 14px;
  color: $text-dim;
  margin-bottom: 24px;
  padding-left: 54px;
  line-height: 1.7;
}

// ── Project Cards ──
.project-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 54px;
}

.project-card {
  background: rgba($secondary, 0.03);
  border: 1px solid rgba($secondary, 0.07);
  border-radius: 16px;
  padding: 22px 26px;
  transition: all 0.35s ease;

  &:hover {
    background: rgba($secondary, 0.07);
    border-color: rgba($secondary, 0.14);
    transform: translateY(-2px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
}

.project-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 12px;
  flex-wrap: wrap;
}

.project-name {
  font-size: 16px;
  font-weight: $font-weight-semibold;
  color: $text-heading;
  letter-spacing: -0.3px;
}

.project-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: $font-weight-medium;
  background: rgba($secondary, 0.06);
  color: $text-muted;

  &.swift {
    background: rgba($tag-swift, 0.07);
    color: $tag-swift;
  }
  &.typescript,
  &.react {
    background: rgba($tag-typescript, 0.07);
    color: $tag-typescript;
  }
  &.python {
    background: rgba($tag-python, 0.07);
    color: $tag-python;
  }
  &.aws {
    background: rgba($tag-aws, 0.07);
    color: $tag-aws;
  }
  &.live {
    background: rgba($tag-live, 0.1);
    color: $tag-live;
    border: 1px solid rgba($tag-live, 0.12);
  }
}

.project-desc {
  font-size: 14px;
  color: $text-muted;
  line-height: 1.65;
  margin-bottom: 12px;
}

.project-links {
  display: flex;
  gap: 16px;
}

.project-link {
  font-size: 12px;
  color: $secondary;
  font-weight: $font-weight-medium;
  transition: color 0.2s;

  &:hover {
    color: $accent;
  }
}

// ── Mobile ──
@media (max-width: $breakpoint-md) {
  .projects {
    padding: 40px 24px 80px;
  }

  .project-cards {
    padding-left: 0;
  }

  .group-desc {
    padding-left: 0;
  }

  .project-top {
    flex-direction: column;
  }
}
```

- [ ] **Step 2: Create the Projects component**

Create `src/components/Projects.js`:

```js
import React, { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { projectGroups } from "../data/projects";

function ProjectCard({ project }) {
  return (
    <div className="project-card reveal-child">
      <div className="project-top">
        <div className="project-name">{project.name}</div>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag.label} className={`tag ${tag.color}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
      <div className="project-desc">{project.description}</div>
      {project.links.length > 0 && (
        <div className="project-links">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectGroup({ group }) {
  return (
    <div className="project-group">
      <ScrollReveal>
        <div className="group-header">
          <div className={`group-icon ${group.colorClass}`}>{group.icon}</div>
          <div className="group-name">{group.name}</div>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="group-desc">{group.description}</div>
      </ScrollReveal>
      <ScrollReveal stagger>
        <div className="project-cards">
          {group.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

function Projects() {
  const sectionRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const offset = window.scrollY - sectionTop;

      orbsRef.current.forEach((orb) => {
        if (!orb) return;
        const speed = parseFloat(orb.dataset.speed) || 0.03;
        orb.style.transform = `translateY(${offset * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="projects" ref={sectionRef}>
      <div className="floating-accents">
        <div
          className="accent-orb a"
          data-speed="0.03"
          ref={(el) => (orbsRef.current[0] = el)}
        />
        <div
          className="accent-orb b"
          data-speed="0.05"
          ref={(el) => (orbsRef.current[1] = el)}
        />
        <div
          className="accent-orb c"
          data-speed="0.02"
          ref={(el) => (orbsRef.current[2] = el)}
        />
      </div>

      <ScrollReveal>
        <div className="section-label">What I Build</div>
      </ScrollReveal>

      {projectGroups.map((group) => (
        <ProjectGroup key={group.id} group={group} />
      ))}
    </main>
  );
}

export default Projects;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.js src/scss/_projects.scss
git commit -m "feat: add project showcase with scroll-triggered animations"
```

---

### Task 7: Create Footer component and styles

**Files:**
- Create: `src/components/Footer.js`
- Create: `src/scss/_footer.scss`

- [ ] **Step 1: Create footer SCSS**

Create `src/scss/_footer.scss`:

```scss
@import "variables";

.site-footer {
  max-width: $content-max-width;
  margin: 0 auto;
  padding: 0 48px 48px;
  border-top: 1px solid rgba($secondary, 0.05);
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  font-size: 13px;
  color: $text-ghost;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-link {
  font-size: 13px;
  color: $text-faint;
  transition: color 0.2s;

  &:hover {
    color: $secondary;
  }
}

@media (max-width: $breakpoint-md) {
  .site-footer {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 24px 24px 32px;
  }
}
```

- [ ] **Step 2: Create the Footer component**

Create `src/components/Footer.js`:

```js
import React from "react";
import ScrollReveal from "./ScrollReveal";

function Footer() {
  return (
    <ScrollReveal>
      <footer className="site-footer">
        <div className="footer-text">Diogo Moura · London</div>
        <nav className="footer-links" aria-label="Footer links">
          <a
            href="https://uk.linkedin.com/in/diogomoura1"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/stormsys"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </nav>
      </footer>
    </ScrollReveal>
  );
}

export default Footer;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.js src/scss/_footer.scss
git commit -m "feat: add minimal footer"
```

---

### Task 8: Wire up App.js and App.scss

**Files:**
- Modify: `src/App.js`
- Modify: `src/App.scss`

- [ ] **Step 1: Replace App.scss with imports**

Replace the entire contents of `src/App.scss`:

```scss
@import "scss/animations";
@import "scss/hero";
@import "scss/projects";
@import "scss/footer";
```

- [ ] **Step 2: Replace App.js with new layout**

Replace the entire contents of `src/App.js`:

```js
import React from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify the build compiles**

Run: `cd /workspace/stormsys.github.io && npx react-scripts build 2>&1 | tail -10`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.js src/App.scss
git commit -m "feat: wire up new landing page layout"
```

---

### Task 9: Update public assets and metadata

**Files:**
- Modify: `public/index.html`
- Modify: `public/manifest.json`

- [ ] **Step 1: Update index.html title and meta**

In `public/index.html`, replace the `<title>` tag:

```html
<title>Diogo Moura — Engineering Manager & Builder</title>
```

Also add a meta description after the theme-color meta tag:

```html
<meta name="description" content="Engineering Manager at Meta. Builder at heart — shipping Swift apps, serverless backends, and Home Assistant integrations." />
```

Update the theme-color to match the dark background:

```html
<meta name="theme-color" content="#0f0e0b" />
```

- [ ] **Step 2: Update manifest.json**

Replace the entire contents of `public/manifest.json`:

```json
{
  "short_name": "Diogo Moura",
  "name": "Diogo Moura — Engineering Manager & Builder",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#0f0e0b",
  "background_color": "#0f0e0b"
}
```

- [ ] **Step 3: Commit**

```bash
git add public/index.html public/manifest.json
git commit -m "chore: update page title, meta description, and manifest"
```

---

### Task 10: Remove unused dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Uninstall vanta, three, and font-awesome**

Run: `cd /workspace/stormsys.github.io && npm uninstall vanta three font-awesome`

Expected: Successfully removes packages and updates package.json and package-lock.json.

- [ ] **Step 2: Verify the build still works**

Run: `cd /workspace/stormsys.github.io && npx react-scripts build 2>&1 | tail -10`
Expected: Build succeeds. No references to removed packages remain.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove vanta, three.js, and font-awesome dependencies"
```

---

### Task 11: Final build verification and cleanup

**Files:**
- All files from previous tasks

- [ ] **Step 1: Full production build**

Run: `cd /workspace/stormsys.github.io && npm run build 2>&1 | tail -20`
Expected: Build succeeds with no warnings about missing modules.

- [ ] **Step 2: Start dev server and test**

Run: `cd /workspace/stormsys.github.io && npx react-scripts start`

Verify in browser:
- Particle animation renders in hero
- Hero text fades in with stagger
- Scroll down: hero parallaxes and fades out
- "What I Build" section label reveals on scroll
- Badminton group header, description, and cards stagger in
- Smart Home group does the same
- All links work (LinkedIn, GitHub, CV, project links)
- Footer reveals at bottom
- Mobile: resize browser to verify responsive layout
- Reduced motion: enable `prefers-reduced-motion` in dev tools, verify no animations

- [ ] **Step 3: Delete old font files that are no longer needed**

Run: `rm -rf /workspace/stormsys.github.io/public/fonts/`

The Roboto and Font Awesome font files in `/public/fonts/` are no longer referenced. Inter is loaded from Google Fonts CDN.

- [ ] **Step 4: Add .superpowers to .gitignore**

Append to `.gitignore`:

```
# Brainstorm mockups
.superpowers/
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove unused font files, update gitignore"
```
