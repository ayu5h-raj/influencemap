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
        className="absolute inset-0 pointer-events-none"
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
