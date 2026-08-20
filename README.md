# Shankar Kumar — Portfolio

Premium, interactive portfolio positioned around **Agentic AI · AI Automation · Browser Automation · LLM Workflows · Full-Stack Systems**.

Built as a **static site** — `npm run build` produces a plain `dist/` folder you can host anywhere (Netlify, Vercel, GitHub Pages, Hostinger, S3, any static host).

## Tech

| Layer      | Choice                        |
| ---------- | ----------------------------- |
| Framework  | React 18 + TypeScript         |
| Build      | Vite 5 (static output)        |
| Styling    | Tailwind CSS 3                |
| Animation  | Framer Motion                 |
| Icons      | lucide-react                  |

## Commands

```bash
npm install       # once
npm run dev       # local dev server (http://localhost:5173)
npm run build     # typecheck + static build → dist/
npm run preview   # serve the built dist/ locally
npm run typecheck # types only
```

## Updating content — no code changes needed

**All content lives in `src/data/*.json`.** Edit the JSON, save, and the site updates. Types for every field are in [`src/types.ts`](src/types.ts) — your editor will autocomplete and flag mistakes.

| File                | Controls                                                        |
| ------------------- | --------------------------------------------------------------- |
| `profile.json`      | Name, hero headline, rotating words, about text, contact, facts  |
| `projects.json`     | Featured projects (Section 4) + filter tags                      |
| `skills.json`       | Skill categories + the relationship graph links (Section 6)      |
| `experience.json`   | Experience timeline (Section 8)                                  |
| `services.json`     | "How I Can Help" services (Section 9)                            |
| `case-studies.json` | Full case studies (Section 10)                                   |
| `learning.json`     | "Currently Exploring" timeline (Section 7)                       |
| `github.json`       | Pinned repositories (Section 12)                                 |
| `architecture.json` | Interactive architecture layers (Section 5)                      |

### Add a new project

Append an object to `src/data/projects.json`:

```jsonc
{
  "id": "unique-slug",
  "title": "Project Title",
  "tagline": "One punchy line.",
  "description": "What the system is.",
  "problem": "What was broken / manual.",
  "solution": "The system you built.",
  "technologies": ["Playwright", "Python"],
  "tags": ["Browser Automation", "LLM"],      // powers the filter chips
  "workflow": ["Step 1", "Step 2", "Step 3"], // animated pipeline
  "architecture": [{ "layer": "Input", "detail": "..." }],
  "capabilities": ["System capability, not a fake metric"],
  "keyLearnings": ["..."],
  "automationLevel": "Human-in-the-loop",     // or Fully Automated / Semi-Automated / Assistive
  "status": "Production",                     // or In Progress / Prototype / Concept / Archived
  "featured": true,
  "year": "2026",
  "github": "https://github.com/...",
  "live": "https://...",
  "screenshots": [{ "type": "image", "src": "/shots/x.png", "alt": "…", "caption": "…" }],
  "videos": [{ "type": "youtube", "src": "https://www.youtube.com/embed/ID", "caption": "Demo" }]
}
```

New filter chips appear automatically from `tags`.

### Add screenshots / videos

1. Drop files into `public/` (e.g. `public/shots/report.png`).
2. Reference them as `/shots/report.png` in `screenshots` / `media`.
3. Videos: `"type": "video"` for self-hosted MP4, `"type": "youtube"` with an **`/embed/` URL** for YouTube.

### Add a case study

Append to `case-studies.json` — the section renders the whole template (Problem → Old Process → Opportunity → System → Architecture → Technologies → Result → Learnings), plus optional `codeSnippet`, `media` and `github`.

### Add a service

Append to `services.json`. `icon` must be one of the names registered in `ICONS` inside [`src/components/Services.tsx`](src/components/Services.tsx) — add the icon to that map if you need a new one (keeps the bundle small).

### Update "Currently Exploring"

Edit `learning.json`. `status` is one of `Exploring → Learning → Applying → Comfortable` and drives the colour + progress dots. Items sort by status, then recency.

## Content rule baked into the copy

No invented achievements, clients, revenue, or ranking guarantees. Outcomes are phrased as **system capabilities**, **workflow implemented**, and **automation achieved**. Keep it that way when you add content.

## Section map

| # | Section              | Component                     |
| - | -------------------- | ----------------------------- |
| 1 | Hero                 | `Hero.tsx`                    |
| 2 | What I Build         | `WhatIBuild.tsx`              |
| 3 | Automation Thinking  | `AutomationFlow.tsx`          |
| 4 | Featured Projects    | `ProjectGrid.tsx` + `ProjectDetails.tsx` |
| 5 | System Architecture  | `ArchitectureVisualizer.tsx`  |
| 6 | Skills Ecosystem     | `SkillsEcosystem.tsx`         |
| 7 | Currently Exploring  | `LearningJourney.tsx`         |
| 8 | Experience Timeline  | `ExperienceTimeline.tsx`      |
| 9 | How I Can Help       | `Services.tsx`                |
| 10| Case Studies         | `CaseStudy.tsx`               |
| 11| About                | `About.tsx`                   |
| 12| Open Source / GitHub | `GitHubSection.tsx`           |
| 13| Contact / CTA        | `Contact.tsx`                 |

## SEO

Metadata, Open Graph, Twitter cards and Person JSON-LD live in [`index.html`](index.html). Update the URLs there once you have a domain, and replace `public/og-image.svg` with a 1200×630 PNG if you prefer.

## Deploying

```bash
npm run build     # → dist/
```

Upload `dist/` to any static host. `base: "./"` in `vite.config.ts` means it works from a subfolder too. For a custom domain, also update the `og:url` / canonical values in `index.html`.
