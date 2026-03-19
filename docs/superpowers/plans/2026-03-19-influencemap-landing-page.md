# InfluenceMap Waitlist Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, deploy-ready waitlist landing page for InfluenceMap with an interactive product mockup, email collection, and polished dark-theme UI.

**Architecture:** Component-per-section with shared UI primitives. Each landing page section is its own file. A ScrollReveal wrapper handles all viewport-triggered animations. The ProductMockup + InfluencerCard are the centerpiece. Waitlist emails stored in a local JSON file via API route.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v3, Framer Motion, Space Grotesk + Space Mono (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-03-19-influencemap-landing-page-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout, fonts, metadata, dark bg, scroll-smooth |
| `app/globals.css` | Tailwind directives, CSS variables, gradient animation keyframes |
| `app/page.tsx` | Landing page — composes all section components |
| `app/joined/page.tsx` | Waitlist confirmation with checkmark animation + share |
| `app/api/waitlist/route.ts` | POST handler: validate, dedupe, store email |
| `lib/waitlist.ts` | Read/write waitlist.json via fs/promises |
| `lib/data.ts` | Hardcoded influencer data + platform data |
| `components/ui/Button.tsx` | Primary/secondary/ghost button variants |
| `components/ui/Badge.tsx` | Colored pill component |
| `components/ui/Input.tsx` | Dark-styled input with focus ring |
| `components/ScrollReveal.tsx` | Framer Motion viewport-triggered fade-up wrapper |
| `components/Hero.tsx` | Hero section: headline, subheadline, gradient bg, scroll indicator |
| `components/WaitlistForm.tsx` | Email form with loading/success states, redirect |
| `components/HowItWorks.tsx` | 3-step explanation grid |
| `components/InfluencerCard.tsx` | Expandable influencer result card |
| `components/ProductMockup.tsx` | Browser chrome frame + search + filters + cards |
| `components/PlatformCoverage.tsx` | 4-platform detection grid |
| `components/Metrics.tsx` | Animated stat counters |
| `components/UseCases.tsx` | 3 use-case cards |
| `components/Footer.tsx` | Footer with logo + links |
| `tailwind.config.ts` | Extended colors, fonts, custom theme tokens |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.js`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/ayushraj/Documents/github/influencemap
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Select defaults. This creates the scaffold with App Router, TypeScript, Tailwind.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Configure Tailwind theme**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0C",
        surface: "#141417",
        "surface-border": "rgba(255,255,255,0.06)",
        "brand-red": "#E24B4A",
        "brand-pink": "#D4537E",
        success: "#1D9E75",
        "text-primary": "#EEEEE8",
        "text-secondary": "#A0A09A",
        "text-muted": "#66665F",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Set up globals.css**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0A0A0C;
  --surface: #141417;
  --brand-red: #E24B4A;
  --brand-pink: #D4537E;
  --success: #1D9E75;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: #EEEEE8;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 100% 0%;
  }
  75% {
    background-position: 0% 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .animate-gradient {
    animation: none !important;
  }
}
```

- [ ] **Step 5: Set up root layout with fonts and metadata**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InfluenceMap — Find influencers your competitors already trust",
  description:
    "InfluenceMap crawls brand pages across Instagram, YouTube, TikTok & X to surface creators who've done sponsored content in your product category.",
  openGraph: {
    title: "InfluenceMap — Find influencers your competitors already trust",
    description:
      "InfluenceMap crawls brand pages across Instagram, YouTube, TikTok & X to surface creators who've done sponsored content in your product category.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder landing page**

Replace `app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-text-primary">
        InfluenceMap — Coming Soon
      </h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server runs**

```bash
npm run dev
```

Expected: Dev server starts at localhost:3000, dark background, Space Grotesk font, placeholder text visible.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, fonts, dark theme"
```

---

## Task 2: Hardcoded Data

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create influencer and platform data file**

```typescript
// lib/data.ts

export type Platform = "YouTube" | "Instagram" | "TikTok" | "X";

export const platformColors: Record<Platform, string> = {
  YouTube: "#FF0000",
  Instagram: "#E4405F",
  TikTok: "#00F2EA",
  X: "#1DA1F2",
};

export interface Influencer {
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  followers: string;
  platforms: Platform[];
  engagement: string;
  score: number;
  pastBrands: string[];
  avgViews: string;
  rateRange: string;
  niche: string;
  recentPost: string;
}

export const influencers: Influencer[] = [
  {
    name: "Arun Maini",
    handle: "@Mrwhosetheboss",
    initials: "AM",
    avatarColor: "#6366F1",
    followers: "19.2M",
    platforms: ["YouTube", "Instagram"],
    engagement: "5.8%",
    score: 97,
    pastBrands: ["Samsung", "OnePlus", "Nothing", "Qualcomm"],
    avgViews: "3.2M",
    rateRange: "$25K–$50K",
    niche: "Consumer Tech",
    recentPost: "Is the Galaxy S25 Ultra Worth It?",
  },
  {
    name: "Gaurav Chaudhary",
    handle: "@TechnicalGuruji",
    initials: "GC",
    avatarColor: "#F59E0B",
    followers: "23.8M",
    platforms: ["YouTube", "Instagram"],
    engagement: "3.2%",
    score: 94,
    pastBrands: ["HP", "Dell", "Asus", "Xiaomi"],
    avgViews: "1.8M",
    rateRange: "$15K–$35K",
    niche: "Tech Reviews (Hindi)",
    recentPost: "HP Spectre x360 — Best Laptop of 2026?",
  },
  {
    name: "iJustine",
    handle: "@iJustine",
    initials: "iJ",
    avatarColor: "#EC4899",
    followers: "7.1M",
    platforms: ["YouTube", "TikTok", "Instagram"],
    engagement: "4.5%",
    score: 91,
    pastBrands: ["Apple", "Intel", "Razer", "Adobe"],
    avgViews: "1.1M",
    rateRange: "$20K–$45K",
    niche: "Lifestyle Tech",
    recentPost: "My Entire Apple Setup Tour",
  },
  {
    name: "Dave Lee",
    handle: "@Dave2D",
    initials: "DL",
    avatarColor: "#10B981",
    followers: "4.2M",
    platforms: ["YouTube"],
    engagement: "6.1%",
    score: 89,
    pastBrands: ["LG", "Framework", "dbrand", "Anker"],
    avgViews: "2.4M",
    rateRange: "$18K–$40K",
    niche: "Premium Tech",
    recentPost: "Framework Laptop 16 — 6 Months Later",
  },
  {
    name: "Trakin Tech",
    handle: "@TrakinTech",
    initials: "TT",
    avatarColor: "#8B5CF6",
    followers: "12.5M",
    platforms: ["YouTube", "Instagram"],
    engagement: "3.9%",
    score: 86,
    pastBrands: ["Realme", "ASUS", "Boat", "Samsung"],
    avgViews: "1.5M",
    rateRange: "$10K–$25K",
    niche: "Budget Tech (Hindi)",
    recentPost: "ASUS ROG Phone — Gaming Beast?",
  },
];

export const categories = ["Laptops", "Smartphones", "Gaming", "Audio", "Wearables"];

export const crawledBrands = ["Dell", "HP", "ASUS", "Acer", "Apple", "Samsung"];

export const sortOptions = ["Best match", "Followers", "Engagement"] as const;

export interface PlatformCoverageItem {
  name: string;
  platform: Platform;
  color: string;
  detections: string[];
}

export const platformCoverage: PlatformCoverageItem[] = [
  {
    name: "Instagram",
    platform: "Instagram",
    color: "#E4405F",
    detections: [
      "Paid partnership labels",
      "Tagged brand posts",
      "Story mentions",
      "Collab posts",
    ],
  },
  {
    name: "YouTube",
    platform: "YouTube",
    color: "#FF0000",
    detections: [
      "Sponsored segments",
      "Description affiliate links",
      "Branded integrations",
      "Product placements",
    ],
  },
  {
    name: "TikTok",
    platform: "TikTok",
    color: "#00F2EA",
    detections: [
      "Branded content toggles",
      "Hashtag sponsorships",
      "Duet collabs",
      "Creator marketplace posts",
    ],
  },
  {
    name: "X / Twitter",
    platform: "X",
    color: "#1DA1F2",
    detections: [
      "Sponsored tweets",
      "Brand ambassador threads",
      "Product launch tweets",
      "Affiliate promotions",
    ],
  },
];

export const metrics = [
  { value: 4000000, suffix: "+", label: "Influencer profiles indexed", display: "4M" },
  { value: 50000, suffix: "+", label: "Brand deals tracked", display: "50K" },
  { value: 200, suffix: "+", label: "Product categories", display: "200" },
  { value: 15, suffix: "s", label: "Average search time", display: "15" },
];

export const useCases = [
  {
    title: "Brand marketing teams",
    description:
      "Find creators who've proven they can sell products in your category. No more guessing based on follower counts alone.",
  },
  {
    title: "Agencies",
    description:
      "Manage influencer discovery across multiple clients and categories. One search, every platform.",
  },
  {
    title: "D2C startups",
    description:
      "Compete with big brands by finding the same influencers — or discovering hidden gems they missed.",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add hardcoded influencer and platform data"
```

---

## Task 3: UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Badge.tsx`, `components/ui/Input.tsx`

- [ ] **Step 1: Create Button component**

```tsx
// components/ui/Button.tsx
"use client";

import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red/90 active:bg-brand-red/80",
  secondary:
    "bg-surface text-text-primary border border-surface-border hover:bg-surface/80",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
```

- [ ] **Step 2: Create Badge component**

```tsx
// components/ui/Badge.tsx

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
      style={
        color
          ? { backgroundColor: `${color}20`, color }
          : undefined
      }
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create Input component**

```tsx
// components/ui/Input.tsx
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", id, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          id={id}
          className={`w-full rounded-lg bg-surface border border-surface-border px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent ${error ? "ring-2 ring-red-500" : ""} ${className}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && id ? `${id}-error` : undefined}
          {...props}
        />
        {error && id && (
          <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI primitives — Button, Badge, Input"
```

---

## Task 4: ScrollReveal Component

**Files:**
- Create: `components/ScrollReveal.tsx`

- [ ] **Step 1: Create ScrollReveal wrapper**

```tsx
// components/ScrollReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const offsets = {
    up: { x: 0, y: 24 },
    left: { x: -24, y: 0 },
    right: { x: 24, y: 0 },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offsets[direction].x, y: offsets[direction].y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal component for viewport-triggered animations"
```

---

## Task 5: Waitlist Backend

**Files:**
- Create: `lib/waitlist.ts`, `app/api/waitlist/route.ts`

- [ ] **Step 1: Create waitlist storage logic**

```typescript
// lib/waitlist.ts
import { promises as fs } from "fs";
import path from "path";
import os from "os";

const WAITLIST_PATH = path.join(process.cwd(), "waitlist.json");

interface WaitlistEntry {
  email: string;
  joinedAt: string;
}

interface WaitlistData {
  emails: WaitlistEntry[];
}

async function readWaitlist(): Promise<WaitlistData> {
  try {
    const data = await fs.readFile(WAITLIST_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { emails: [] };
  }
}

async function writeWaitlist(data: WaitlistData): Promise<void> {
  const tmpPath = path.join(os.tmpdir(), `waitlist-${Date.now()}.json`);
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2));
  await fs.rename(tmpPath, WAITLIST_PATH);
}

export async function hasEmail(email: string): Promise<boolean> {
  const data = await readWaitlist();
  return data.emails.some(
    (entry) => entry.email.toLowerCase() === email.toLowerCase()
  );
}

export async function addEmail(
  email: string
): Promise<{ position: number }> {
  const data = await readWaitlist();
  data.emails.push({ email: email.toLowerCase(), joinedAt: new Date().toISOString() });
  await writeWaitlist(data);
  return { position: data.emails.length + 2400 };
}
```

- [ ] **Step 2: Create API route**

```typescript
// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { addEmail, hasEmail } from "@/lib/waitlist";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (await hasEmail(email)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const { position } = await addEmail(email);
    return NextResponse.json({ success: true, position });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Test manually**

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Expected: `{"success":true,"position":2401}`

- [ ] **Step 4: Commit**

```bash
git add lib/waitlist.ts app/api/waitlist/route.ts
echo "waitlist.json" >> .gitignore
git add .gitignore
git commit -m "feat: add waitlist API route with JSON file storage"
```

---

## Task 6: WaitlistForm Component

**Files:**
- Create: `components/WaitlistForm.tsx`

- [ ] **Step 1: Create WaitlistForm with loading/success states**

```tsx
// components/WaitlistForm.tsx
"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface WaitlistFormProps {
  variant: "hero" | "bottom";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({ variant }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const router = useRouter();
  const inputId = useId();
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setStatus("success");
        setTimeout(() => router.push("/joined"), prefersReducedMotion ? 0 : 1500);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setStatus("success");
      setTimeout(() => router.push("/joined"), prefersReducedMotion ? 0 : 1500);
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className={variant === "bottom" ? "max-w-lg mx-auto text-center" : ""}>
      {variant === "bottom" && (
        <>
          <h2 className="text-3xl font-bold text-text-primary mb-3">
            Be first to search
          </h2>
          <p className="text-text-secondary mb-6">
            Get early access when we launch.
          </p>
        </>
      )}
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <Input
          id={inputId}
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          error={error}
          disabled={status === "loading" || status === "success"}
        />
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="checkmark"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center w-[140px] h-[42px] rounded-lg bg-success"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
            </motion.div>
          ) : (
            <Button
              key="button"
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="whitespace-nowrap min-w-[140px]"
            >
              {status === "loading" ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                />
              ) : (
                "Join the waitlist"
              )}
            </Button>
          )}
        </AnimatePresence>
      </form>
      {variant === "bottom" && (
        <p className="text-text-muted text-xs mt-4">
          We&apos;ll never spam you. Just one email when it&apos;s your turn.
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WaitlistForm.tsx
git commit -m "feat: add WaitlistForm with loading, success, and error states"
```

---

## Task 7: Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

```tsx
// components/Hero.tsx
"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  const { scrollY } = useScroll();
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="animate-gradient absolute inset-0 opacity-100 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(226,75,74,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 80% 60%, rgba(212,83,126,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 50% 20%, rgba(226,75,74,0.04) 0%, transparent 70%)
          `,
          backgroundSize: "200% 200%",
          animation: prefersReducedMotion ? "none" : "gradient-shift 15s ease infinite",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6"
        >
          Find influencers your competitors already trust
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
        >
          InfluenceMap crawls brand pages across Instagram, YouTube, TikTok & X
          to surface creators who&apos;ve done sponsored content in your product
          category. Stop cold-DMing. Start with proof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <WaitlistForm variant="hero" />
          <p className="text-text-muted text-sm mt-4">
            Join 2,400+ brand marketers on the waitlist
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : chevronOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-muted"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with gradient background and scroll indicator"
```

---

## Task 8: HowItWorks Section

**Files:**
- Create: `components/HowItWorks.tsx`

- [ ] **Step 1: Create HowItWorks component**

```tsx
// components/HowItWorks.tsx
"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Pick your category",
    description:
      "Tell us what you sell. Laptops, skincare, fitness gear — we support 200+ product categories.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We crawl competitor brands",
    description:
      "Our AI scans the social pages of every major brand in your category, detecting paid partnerships, sponsored tags, @mentions, and collab posts.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.558" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Discover proven influencers",
    description:
      "Get a ranked list of creators who've already promoted products like yours, complete with engagement stats, audience data, and estimated rates.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-text-primary text-center mb-16">
            How it works
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className="p-6 rounded-xl bg-surface border border-surface-border">
                <span className="font-mono text-brand-red text-sm font-bold">
                  {step.number}
                </span>
                <div className="text-text-muted mt-3 mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: add HowItWorks section with 3-step grid"
```

---

## Task 9: InfluencerCard Component

**Files:**
- Create: `components/InfluencerCard.tsx`

This is the most complex component. It handles collapsed/expanded states with animation, the circular score indicator, platform badges, and expanded detail view.

- [ ] **Step 1: Create InfluencerCard**

```tsx
// components/InfluencerCard.tsx
"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Influencer, platformColors } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface InfluencerCardProps {
  influencer: Influencer;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

function ScoreCircle({ score }: { score: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />
        <motion.circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#E24B4A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-text-primary">
        {score}
      </span>
    </div>
  );
}

export default function InfluencerCard({
  influencer,
  isExpanded,
  onToggle,
  index,
}: InfluencerCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.1 }}
      className="bg-surface border border-surface-border rounded-xl overflow-hidden"
    >
      {/* Collapsed row */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-inset"
        aria-expanded={isExpanded}
        aria-controls={`card-detail-${index}`}
      >
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ backgroundColor: influencer.avatarColor }}
        >
          {influencer.initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-text-primary text-sm">
              {influencer.name}
            </span>
            <span className="font-mono text-text-muted text-xs">
              {influencer.handle}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {influencer.platforms.map((p) => (
              <span
                key={p}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                style={{ backgroundColor: `${platformColors[p]}20`, color: platformColors[p] }}
                aria-label={`${p} platform`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <div className="text-center">
            <div className="font-mono font-bold text-text-primary">
              {influencer.followers}
            </div>
            <div className="text-text-muted text-xs">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-mono font-bold text-text-primary">
              {influencer.engagement}
            </div>
            <div className="text-text-muted text-xs">Engagement</div>
          </div>
        </div>

        {/* Score */}
        <ScoreCircle score={influencer.score} />
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`card-detail-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-surface-border">
              {/* Mobile stats (visible on small screens only) */}
              <div className="flex sm:hidden gap-4 mb-3">
                <div>
                  <span className="font-mono text-sm font-bold text-text-primary">{influencer.followers}</span>
                  <span className="text-text-muted text-xs ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-mono text-sm font-bold text-text-primary">{influencer.engagement}</span>
                  <span className="text-text-muted text-xs ml-1">Engagement</span>
                </div>
              </div>

              {/* Past brands */}
              <div className="mb-3">
                <span className="text-text-muted text-xs block mb-1.5">
                  Past brand collaborations
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {influencer.pastBrands.map((brand) => (
                    <Badge key={brand} className="bg-white/5 text-text-secondary">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div>
                  <span className="text-text-muted text-xs">Avg views</span>
                  <div className="font-mono text-sm text-text-primary">{influencer.avgViews}</div>
                </div>
                <div>
                  <span className="text-text-muted text-xs">Est. rate</span>
                  <div className="font-mono text-sm text-text-primary">{influencer.rateRange}</div>
                </div>
                <div>
                  <span className="text-text-muted text-xs">Niche</span>
                  <div className="text-sm text-text-primary">{influencer.niche}</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-text-muted text-xs">Recent sponsored</span>
                  <div className="text-sm text-text-primary truncate">{influencer.recentPost}</div>
                </div>
              </div>

              <Button variant="primary" size="sm">
                Start outreach
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/InfluencerCard.tsx
git commit -m "feat: add InfluencerCard with expand/collapse, score circle, platform badges"
```

---

## Task 10: ProductMockup Component (Centerpiece)

**Files:**
- Create: `components/ProductMockup.tsx`

- [ ] **Step 1: Create ProductMockup**

```tsx
// components/ProductMockup.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { influencers, categories, crawledBrands, sortOptions } from "@/lib/data";
import InfluencerCard from "./InfluencerCard";
import ScrollReveal from "./ScrollReveal";

export default function ProductMockup() {
  const [activeCategory, setActiveCategory] = useState("Laptops");
  const [activeSort, setActiveSort] = useState<string>("Best match");
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4">
            See it in action
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            Here&apos;s what a search looks like. Real interface, real data format.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Browser chrome frame */}
          <div className="rounded-xl border border-surface-border bg-surface overflow-hidden shadow-2xl shadow-black/50">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border bg-[#0D0D10]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="hidden sm:flex flex-1 justify-center">
                <div className="bg-bg rounded-md px-4 py-1 text-xs text-text-muted font-mono">
                  app.influencemap.com
                </div>
              </div>
              <div className="w-[52px] hidden sm:block" />
            </div>

            {/* App content */}
            <div className="p-4 sm:p-6">
              {/* Search bar */}
              <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  readOnly
                  value="Laptop reviewers, India, 100K+ followers"
                  className="w-full bg-bg border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary cursor-default focus:outline-none focus:ring-2 focus:ring-brand-red"
                  tabIndex={-1}
                />
              </div>

              {/* Category pills */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? "bg-brand-red text-white"
                        : "bg-white/5 text-text-secondary hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Crawled from strip */}
              <div className="flex items-center gap-3 mb-4 text-xs text-text-muted overflow-x-auto pb-1">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-success"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="font-medium text-success">Live crawl</span>
                </div>
                <span className="text-text-muted/50">|</span>
                <span className="flex-shrink-0">Crawled from:</span>
                {crawledBrands.map((brand) => (
                  <span key={brand} className="font-mono flex-shrink-0">{brand}</span>
                ))}
              </div>

              {/* Sort bar */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-text-muted text-xs">Sort:</span>
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setActiveSort(opt)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      activeSort === opt
                        ? "bg-white/10 text-text-primary"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Influencer cards */}
              <div className="space-y-2">
                {influencers.map((inf, i) => (
                  <InfluencerCard
                    key={inf.handle}
                    influencer={inf}
                    isExpanded={expandedIndex === i}
                    onToggle={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProductMockup.tsx
git commit -m "feat: add ProductMockup with browser chrome, search, filters, and influencer cards"
```

---

## Task 11: PlatformCoverage Section

**Files:**
- Create: `components/PlatformCoverage.tsx`

- [ ] **Step 1: Create PlatformCoverage**

```tsx
// components/PlatformCoverage.tsx
"use client";

import { platformCoverage } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const platformIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  YouTube: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  TikTok: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  "X / Twitter": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export default function PlatformCoverage() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4">
            Every platform. Every signal.
          </h2>
          <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
            We crawl four major platforms and detect every type of brand partnership.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platformCoverage.map((platform, i) => (
            <ScrollReveal key={platform.name} delay={i * 0.1}>
              <div
                className="p-6 rounded-xl bg-surface border border-surface-border hover:-translate-y-0.5 transition-transform duration-200"
                style={{ borderLeftWidth: "3px", borderLeftColor: platform.color }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ color: platform.color }}>
                    {platformIcons[platform.name]}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {platform.name}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {platform.detections.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/PlatformCoverage.tsx
git commit -m "feat: add PlatformCoverage section with 4-platform detection grid"
```

---

## Task 12: Metrics Section

**Files:**
- Create: `components/Metrics.tsx`

- [ ] **Step 1: Create Metrics with animated counters**

```tsx
// components/Metrics.tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { metrics } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

function AnimatedCounter({
  value,
  suffix,
  display,
}: {
  value: number;
  suffix: string;
  display: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState("0");

  const animate = useCallback(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(display);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      if (value >= 1000000) {
        setDisplayValue((current / 1000000).toFixed(1) + "M");
      } else if (value >= 1000) {
        setDisplayValue(Math.floor(current / 1000) + "K");
      } else {
        setDisplayValue(String(current));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(display);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, prefersReducedMotion, value, display]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <span ref={ref} className="font-mono text-4xl sm:text-5xl font-bold text-text-primary">
      {displayValue}
      <span className="text-brand-red">{suffix}</span>
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 0.1}>
              <div>
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  display={metric.display}
                />
                <p className="text-text-secondary text-sm mt-2">
                  {metric.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Metrics.tsx
git commit -m "feat: add Metrics section with animated counters"
```

---

## Task 13: UseCases Section

**Files:**
- Create: `components/UseCases.tsx`

- [ ] **Step 1: Create UseCases**

```tsx
// components/UseCases.tsx
"use client";

import { useCases } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const icons = [
  // Brand teams - target
  <svg key="brand" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
  // Agencies - building
  <svg key="agency" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>,
  // D2C - rocket
  <svg key="d2c" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>,
];

export default function UseCases() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4">
            Built for teams that move fast
          </h2>
          <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
            Whether you&apos;re a solo founder or a global agency, InfluenceMap fits your workflow.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <ScrollReveal key={uc.title} delay={i * 0.15}>
              <div className="p-6 rounded-xl bg-surface border border-surface-border hover:-translate-y-0.5 transition-transform duration-200 h-full">
                <div className="text-text-muted mb-4">{icons[i]}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {uc.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {uc.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/UseCases.tsx
git commit -m "feat: add UseCases section with 3 audience cards"
```

---

## Task 14: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="border-t border-surface-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-text-primary">
            Influence<span className="text-brand-red">Map</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            Twitter / X
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            LinkedIn
          </a>
        </div>

        <p className="text-text-muted text-xs">
          &copy; 2026 InfluenceMap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 15: Compose Landing Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Wire up all sections**

```tsx
// app/page.tsx
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProductMockup from "@/components/ProductMockup";
import PlatformCoverage from "@/components/PlatformCoverage";
import Metrics from "@/components/Metrics";
import UseCases from "@/components/UseCases";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <ProductMockup />
      <PlatformCoverage />
      <Metrics />
      <UseCases />
      <section className="py-24 px-4">
        <WaitlistForm variant="bottom" />
      </section>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Full landing page renders with all sections, dark theme, animations on scroll, interactive mockup with expandable cards.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose landing page with all sections"
```

---

## Task 16: Waitlist Confirmation Page

**Files:**
- Create: `app/joined/page.tsx`

- [ ] **Step 1: Create /joined page**

```tsx
// app/joined/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function JoinedPage() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const position = useMemo(
    () => Math.floor(Math.random() * 200) + 2400,
    []
  );

  const referralCode = useMemo(
    () => Math.random().toString(36).substring(2, 8),
    []
  );

  const referralLink = `influencemap.com/ref/${referralCode}`;

  const shareText = encodeURIComponent(
    "I just joined the @InfluenceMap waitlist — an AI tool that finds influencers by crawling competitor brand deals. Check it out:"
  );

  const shareUrl = encodeURIComponent("https://influencemap.com");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Checkmark animation */}
        <motion.div className="mx-auto mb-8 w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#1D9E75"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M24 40l10 10 22-22"
              fill="none"
              stroke="#1D9E75"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: 0.6, ease: "easeOut" }
              }
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
          className="text-3xl font-bold text-text-primary mb-3"
        >
          You&apos;re on the list!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.95 }}
          className="text-text-secondary mb-2"
        >
          We&apos;ll reach out when it&apos;s your turn. In the meantime, share
          InfluenceMap with your network to move up the queue.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.1 }}
          className="font-mono text-2xl text-brand-red font-bold mb-8"
        >
          Your position: #{position.toLocaleString()}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
        >
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              Share on X
            </Button>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              Share on LinkedIn
            </Button>
          </a>
          <Button
            variant="secondary"
            size="md"
            onClick={handleCopy}
            className="w-full sm:w-auto"
          >
            {copied ? "Copied!" : "Copy link"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.3 }}
          className="bg-surface border border-surface-border rounded-lg p-3"
        >
          <p className="text-text-muted text-xs mb-1">Your referral link</p>
          <p className="font-mono text-sm text-text-secondary">{referralLink}</p>
        </motion.div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/joined/page.tsx
git commit -m "feat: add /joined waitlist confirmation page with checkmark animation and share"
```

---

## Task 17: Build Verification & Polish

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Fix any build errors**

Address any TypeScript or build errors that surface.

- [ ] **Step 3: Test the full flow**

```bash
npm run dev
```

Manual checks:
1. Landing page loads with dark theme, gradient background
2. All sections visible on scroll with staggered animations
3. ProductMockup: pills clickable, cards expand/collapse, score circles animate
4. Email form: validates input, shows loading, morphs to checkmark, redirects to /joined
5. /joined page: checkmark animates, position shows, share buttons work, copy link works
6. Mobile responsive: resize to 375px, verify stacking

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: build errors and polish"
```
