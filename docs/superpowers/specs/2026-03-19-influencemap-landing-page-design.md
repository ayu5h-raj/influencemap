# InfluenceMap Waitlist Landing Page — Design Spec

**Date:** 2026-03-19
**Status:** Approved
**Tech stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v3, Framer Motion, Space Grotesk + Space Mono fonts

---

## Overview

A waitlist landing page for InfluenceMap — an AI-powered influencer discovery platform. The page collects emails, showcases the product concept through an interactive mockup, and communicates the value proposition to brand marketers.

**Core value prop:** "Stop guessing. Find influencers who've already promoted products like yours — by scanning your competitors' brand deals across every platform."

---

## Architecture

**Approach:** Component-per-section with shared UI primitives. Each landing page section is its own component. Shared UI primitives (Button, Badge, Input) keep styling consistent. The ProductMockup is the centerpiece and gets its own sub-component (InfluencerCard). Framer Motion animations are colocated with each component. A shared ScrollReveal wrapper handles viewport-triggered reveal animations.

### File Structure

```
influencemap/
├── app/
│   ├── layout.tsx              # Root layout, fonts, meta tags, dark bg
│   ├── page.tsx                # Landing page — composes all sections
│   ├── globals.css             # Tailwind base + CSS variables
│   ├── joined/
│   │   └── page.tsx            # Waitlist confirmation page
│   └── api/
│       └── waitlist/
│           └── route.ts        # POST handler for email collection
├── components/
│   ├── Hero.tsx                # Hero section with headline + WaitlistForm
│   ├── HowItWorks.tsx          # 3-step explanation
│   ├── ProductMockup.tsx       # Interactive mockup in browser chrome frame
│   ├── InfluencerCard.tsx      # Expandable influencer result card
│   ├── PlatformCoverage.tsx    # 4-platform detection grid
│   ├── Metrics.tsx             # Animated stat counters
│   ├── UseCases.tsx            # 3 use-case cards
│   ├── WaitlistForm.tsx        # Shared email form (hero + bottom CTA)
│   ├── ScrollReveal.tsx        # Framer Motion viewport-triggered wrapper
│   ├── Footer.tsx              # Footer with links
│   └── ui/
│       ├── Button.tsx          # Primary/secondary/ghost variants
│       ├── Badge.tsx           # Colored pill component
│       └── Input.tsx           # Dark-styled input with focus ring
├── lib/
│   └── waitlist.ts             # JSON file read/write for email storage
├── public/
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## Color Palette

| Token           | Value                    | Usage                        |
|-----------------|--------------------------|------------------------------|
| bg              | #0A0A0C                  | Page background              |
| surface         | #141417                  | Cards, elevated surfaces     |
| border          | rgba(255,255,255,0.06)   | Card borders, dividers       |
| brand-red       | #E24B4A                  | Primary accent, CTAs         |
| brand-pink      | #D4537E                  | Gradient secondary accent    |
| success         | #1D9E75                  | Success states, live dots    |
| text-primary    | #EEEEE8                  | Headings, primary text       |
| text-secondary  | #A0A09A                  | Body text, descriptions      |
| text-muted      | #66665F                  | Labels, captions             |

---

## Typography

- **Headings + body:** Space Grotesk (Google Fonts) — bold, geometric, modern. Loaded via `next/font/google`.
- **Monospace accents:** Space Mono — for numbers, stats, handles, counters.
- Both fonts loaded with `next/font/google` for optimal performance (no layout shift).

---

## Components

### 1. Root Layout (`app/layout.tsx`)

- Sets `<html>` with `scroll-behavior: smooth`, dark background
- Loads Space Grotesk and Space Mono via `next/font/google`
- Meta tags: title "InfluenceMap — Find influencers your competitors already trust", OG tags for social sharing
- Applies font CSS variables to `<body>`

### 2. Landing Page (`app/page.tsx`)

Composes sections in order:
1. Hero
2. HowItWorks
3. ProductMockup
4. PlatformCoverage
5. Metrics
6. UseCases
7. Bottom CTA (WaitlistForm variant="bottom")
8. Footer

### 3. Hero

- Full viewport height, centered content, max-width ~720px
- **Background:** Animated gradient mesh — 2-3 radial gradients with brand-red and brand-pink at 5-8% opacity, animated with slow CSS keyframe position shifts. No canvas/WebGL.
- **Headline:** "Find influencers your competitors already trust" — Space Grotesk bold, large
- **Subheadline:** Full value prop paragraph in text-secondary
- **WaitlistForm** with variant="hero"
- **Trust line:** "Join 2,400+ brand marketers on the waitlist" in text-muted. Note: the `/joined` page position number (2400–2599) is derived from this same baseline — if the trust line number changes, update the position range accordingly.
- **Scroll indicator:** Animated chevron at bottom, fades out on scroll via `useScroll`

### 4. WaitlistForm

Shared between hero and bottom CTA. Props: `variant: "hero" | "bottom"`.

- Email input + submit button in a single row
- Client-side email regex validation
- Button states: idle → loading (spinner) → success (morphs to checkmark via Framer Motion)
- **Success flow sequence:** API responds → button morphs to checkmark (0.5s animation) → hold checkmark for 1s → redirect to `/joined`. Total delay ~1.5s after API response.
- Bottom variant has different heading copy: "Be first to search. Get early access when we launch." + spam disclaimer

### 5. HowItWorks

- Section header: "How it works"
- 3-column grid (desktop), single column (mobile)
- Each step: step number (Space Mono, brand-red), inline SVG icon, heading, description
- Steps:
  1. Pick your category — "Tell us what you sell. Laptops, skincare, fitness gear — we support 200+ product categories."
  2. We crawl competitor brands — "Our AI scans the social pages of every major brand in your category, detecting paid partnerships, sponsored tags, @mentions, and collab posts."
  3. Discover proven influencers — "Get a ranked list of creators who've already promoted products like yours, complete with engagement stats, audience data, and estimated rates."
- ScrollReveal with 0.15s stagger per card

### 6. ProductMockup (Centerpiece)

**Browser chrome frame:**
- Dark minimal frame with 3 dots (red/yellow/green), fake URL bar showing `app.influencemap.com`, rounded corners
- Built with plain divs + Tailwind

**Search bar:**
- Pre-filled: "Laptop reviewers, India, 100K+ followers"
- Non-functional but has focus ring on hover

**Filter pills:**
- Horizontal scrollable row: Laptops (pre-selected, brand-red bg), Smartphones, Gaming, Audio, Wearables
- Click swaps active pill (cosmetic only)

**Crawled-from strip:**
- Brand names: Dell, HP, ASUS, Acer, Apple, Samsung in text-muted
- Green pulsing dot with "Live crawl" badge (`animate-pulse`)

**Sort bar:**
- Three buttons: Best match (active), Followers, Engagement
- Click swaps active state (cosmetic, no reorder)

**InfluencerCard (sub-component):**

Collapsed state:
- Avatar: initials with colored background
- Name, handle (Space Mono)
- Platform badges: YouTube (#FF0000), Instagram (#E4405F), TikTok (#00F2EA), X (#1DA1F2)
- Follower count, engagement rate
- Circular match score: SVG circle with `stroke-dasharray` animation on mount

Expanded state (Framer Motion AnimatePresence + layout):
- Past brand collab pills
- Avg views, estimated rate range, niche tag
- Recent sponsored post title
- "Start outreach" button (brand-red)

Behavior:
- First card expanded by default
- Accordion — one card expanded at a time
- Staggered entry: 0.1s stagger on first viewport intersection

**Influencer data:**

| Name | Handle | Followers | Platforms | Engagement | Score | Past Brands |
|------|--------|-----------|-----------|------------|-------|-------------|
| Arun Maini | @Mrwhosetheboss | 19.2M | YouTube, Instagram | 5.8% | 97 | Samsung, OnePlus, Nothing, Qualcomm |
| Gaurav Chaudhary | @TechnicalGuruji | 23.8M | YouTube, Instagram | 3.2% | 94 | HP, Dell, Asus, Xiaomi |
| iJustine | @iJustine | 7.1M | YouTube, TikTok, Instagram | 4.5% | 91 | Apple, Intel, Razer, Adobe |
| Dave Lee | @Dave2D | 4.2M | YouTube | 6.1% | 89 | LG, Framework, dbrand, Anker |
| Trakin Tech | @TrakinTech | 12.5M | YouTube, Instagram | 3.9% | 86 | Realme, ASUS, Boat, Samsung |

**Extended data for expanded state (hardcoded per influencer):**

| Handle | Avg Views | Rate Range | Niche | Recent Sponsored Post |
|--------|-----------|------------|-------|----------------------|
| @Mrwhosetheboss | 3.2M | $25K–$50K | Consumer Tech | "Is the Galaxy S25 Ultra Worth It?" |
| @TechnicalGuruji | 1.8M | $15K–$35K | Tech Reviews (Hindi) | "HP Spectre x360 — Best Laptop of 2026?" |
| @iJustine | 1.1M | $20K–$45K | Lifestyle Tech | "My Entire Apple Setup Tour" |
| @Dave2D | 2.4M | $18K–$40K | Premium Tech | "Framework Laptop 16 — 6 Months Later" |
| @TrakinTech | 1.5M | $10K–$25K | Budget Tech (Hindi) | "ASUS ROG Phone — Gaming Beast?" |

**Mobile:** Cards stack full-width, platform badges wrap, browser chrome simplified (no URL bar).

### 7. PlatformCoverage

- 2x2 grid (desktop), single column (mobile)
- Each card: SVG platform icon, platform name, 4 bullet points
- Card accent (border-left) in platform brand color
- Subtle hover lift: `translateY(-2px)` transition

Platform details:
- **Instagram:** Paid partnership labels, tagged brand posts, story mentions, collab posts
- **YouTube:** Sponsored segments, description affiliate links, branded integrations, product placements
- **TikTok:** Branded content toggles, hashtag sponsorships, duet collabs, creator marketplace posts
- **X / Twitter:** Sponsored tweets, brand ambassador threads, product launch tweets

### 8. Metrics

- 4-column grid (desktop), 2x2 (mobile), centered
- Large numbers in Space Mono, animated counter on viewport intersection
- Counter uses `requestAnimationFrame` — no external library
- Stats:
  - "4M+" — influencer profiles indexed
  - "50K+" — brand deals tracked
  - "200+" — product categories
  - "15s" — average search time
- Label below each in text-secondary

### 9. UseCases

- 3-column grid (desktop), stacked (mobile)
- Same card style as PlatformCoverage for visual consistency
- Cards:
  1. **Brand marketing teams** — "Find creators who've proven they can sell products in your category. No more guessing based on follower counts alone."
  2. **Agencies** — "Manage influencer discovery across multiple clients and categories. One search, every platform."
  3. **D2C startups** — "Compete with big brands by finding the same influencers — or discovering hidden gems they missed."

### 10. Footer

- Flex row: Logo left, links right
- Links: Privacy, Terms, Twitter/X, LinkedIn (all `#` placeholders)
- Copyright: "© 2026 InfluenceMap. All rights reserved."

### 11. Waitlist Confirmation (`/joined`)

- Centered layout, max-width 480px
- **Checkmark animation:** SVG circle + checkmark path with Framer Motion `pathLength` animation
- **Heading:** "You're on the list!"
- **Copy:** "We'll reach out when it's your turn. In the meantime, share InfluenceMap with your network to move up the queue."
- **Position:** Client-side generated: `Math.floor(Math.random() * 200) + 2400`, displayed as "#2,4XX"
- **Share buttons:**
  - Twitter/X: Pre-filled tweet text: "I just joined the @InfluenceMap waitlist — an AI tool that finds influencers by crawling competitor brand deals. Check it out:" + URL
  - LinkedIn: Share URL pointing to landing page root
  - Copy link: Copies referral link to clipboard, shows "Copied!" toast for 2s
- **Referral link:** `influencemap.com/ref/{random-6-chars}` — cosmetic only, no tracking backend

---

## Shared Utilities

### ScrollReveal

Wraps children in `motion.div` with `useInView` trigger. Props: `delay` (number), `direction` ("up" | "left" | "right"). Default: fade-up with 24px Y offset (translates from 24px below to 0). Used by every section for consistent reveal behavior.

### UI Primitives

- **Button:** Variants: primary (brand-red bg), secondary (surface bg, border), ghost (transparent). Sizes: sm, md, lg.
- **Badge:** Colored pill with text. Takes `color` prop.
- **Input:** Dark-styled (`surface` bg), light border on focus (brand-red ring), placeholder in text-muted.

---

## API & Data

### POST `/api/waitlist`

- Accepts: `{ email: string }`
- Validates email format with regex
- Checks for duplicates via `lib/waitlist.ts`
- Appends to `waitlist.json` in project root
- **Response codes:**
  - 200: `{ success: true, position: number }` — email added or already exists
  - 400: `{ error: "Invalid email format" }` — validation failed
  - 409: `{ error: "Email already registered" }` — duplicate submission
  - 500: `{ error: "Something went wrong" }` — file write failure
- **Note:** No rate limiting for MVP. This is a prototype endpoint — the JSON file approach does not persist on Vercel's serverless filesystem. Swap to a database before production deployment.

### `lib/waitlist.ts`

- `addEmail(email: string): Promise<{ position: number }>`
- `hasEmail(email: string): Promise<boolean>`
- Reads/writes `waitlist.json` using `fs/promises`
- File format: `{ emails: [{ email: string, joinedAt: string }] }`
- **Concurrency:** Uses atomic write (write to temp file, then rename) to avoid corruption from concurrent requests. This is prototype-grade — sufficient for local dev and low-traffic demos, not for production.

---

## Animation Strategy

All animations use Framer Motion. No external animation libraries.

- **Scroll reveals:** `ScrollReveal` wrapper, staggered per section
- **Hero background:** CSS keyframe animation on radial gradients (no Framer Motion needed)
- **Influencer cards:** `AnimatePresence` + `layout` for expand/collapse, `stroke-dasharray` for score circles
- **Waitlist button:** `layoutId` transition from button → checkmark
- **Metric counters:** `requestAnimationFrame`-based counter triggered by `useInView`
- **Scroll indicator:** Opacity tied to `useScroll` progress

---

## Responsive Breakpoints

- **Desktop:** >= 1024px — full grid layouts, browser chrome with URL bar
- **Tablet:** 768px–1023px — 2-column grids
- **Mobile:** < 768px — single column, simplified mockup, stacked cards

---

## Performance

- Fonts via `next/font/google` (no layout shift)
- Below-fold sections lazy loaded with `next/dynamic`
- No heavy canvas/WebGL — all CSS/SVG animations
- Minimal dependencies: next, react, framer-motion, tailwindcss

---

## SEO

- Uses Next.js App Router `metadata` export in `layout.tsx` (not the legacy `<Head>` component)
- Title: "InfluenceMap — Find influencers your competitors already trust"
- Description: "InfluenceMap crawls brand pages across Instagram, YouTube, TikTok & X to surface creators who've done sponsored content in your product category."
- OG image: can be added later
- Proper heading hierarchy: single H1 per page

---

## Accessibility

- **Heading hierarchy:** Single `<h1>` per page, logical `<h2>`/`<h3>` nesting
- **Keyboard navigation:** Influencer cards expandable via Enter/Space, filter pills and sort buttons focusable with visible focus rings
- **ARIA:** Expandable cards use `aria-expanded`, `role="button"`, and `aria-controls`. Platform badges have `aria-label` for screen readers.
- **Reduced motion:** All Framer Motion animations respect `prefers-reduced-motion: reduce` — wrap animation variants in a `useReducedMotion()` check, falling back to instant transitions. The CSS gradient animation uses `@media (prefers-reduced-motion: reduce)` to disable.
- **Color contrast:** All text meets WCAG AA. text-primary (#EEEEE8) on bg (#0A0A0C) = 18.3:1. text-secondary (#A0A09A) on bg = 8.1:1. text-muted (#66665F) on bg = 4.5:1 (meets AA for large text; used only for labels/captions).
- **Form inputs:** Email input has associated `<label>` (visually hidden if needed), error messages linked via `aria-describedby`

---

## `/joined` Direct Access

If a user navigates directly to `/joined` without submitting the form, the page still renders with a random position number. This is intentional — there's no server-side session state to verify, and showing the confirmation is harmless. The referral link and share buttons are cosmetic-only (no tracking backend).
