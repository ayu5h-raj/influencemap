"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { influencers, categories, crawledBrands, sortOptions } from "@/lib/data";
import InfluencerCard from "./InfluencerCard";
import ScrollReveal from "./ScrollReveal";

const SEARCH_QUERY = "Laptop reviewers, India, 100K+ followers";
const TYPE_SPEED = 45; // ms per character
const SCAN_BRANDS = ["Dell", "HP", "ASUS", "Acer", "Apple", "Samsung"];

type Phase = "idle" | "typing" | "scanning" | "results";

export default function ProductMockup() {
  const [activeCategory, setActiveCategory] = useState("Laptops");
  const [activeSort, setActiveSort] = useState<string>("Best match");
  const [expandedIndex, setExpandedIndex] = useState(0);

  // Animation state
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedText, setTypedText] = useState("");
  const [scanIndex, setScanIndex] = useState(-1);
  const [visibleCards, setVisibleCards] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const hasStarted = useRef(false);

  // Typewriter effect
  const runTypewriter = useCallback(() => {
    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setTypedText(SEARCH_QUERY.slice(0, charIndex));
      if (charIndex >= SEARCH_QUERY.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("scanning"), 400);
      }
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, []);

  // Scanning effect
  const runScanning = useCallback(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setScanIndex(idx);
      idx++;
      if (idx >= SCAN_BRANDS.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowFilters(true);
          setPhase("results");
        }, 600);
      }
    }, 350);
    return () => clearInterval(interval);
  }, []);

  // Results stagger
  const runResults = useCallback(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCards(count);
      if (count >= influencers.length) {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Trigger sequence on scroll into view
  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    if (prefersReducedMotion) {
      // Skip animation, show everything immediately
      setTypedText(SEARCH_QUERY);
      setShowFilters(true);
      setScanIndex(SCAN_BRANDS.length - 1);
      setVisibleCards(influencers.length);
      setPhase("results");
      return;
    }

    // Start sequence after a brief pause
    const timeout = setTimeout(() => setPhase("typing"), 500);
    return () => clearTimeout(timeout);
  }, [isInView, prefersReducedMotion]);

  // Run phase effects
  useEffect(() => {
    if (phase === "typing") return runTypewriter();
    if (phase === "scanning") return runScanning();
    if (phase === "results") return runResults();
  }, [phase, runTypewriter, runScanning, runResults]);

  return (
    <section className="py-24 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4">
            See it in action
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            Type what you&apos;re looking for. We&apos;ll scan every competitor and surface the creators.
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
              {/* Search bar with typewriter */}
              <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="w-full bg-bg border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary min-h-[42px] flex items-center">
                  {typedText}
                  {(phase === "typing" || phase === "idle") && (
                    <motion.span
                      className="inline-block w-[2px] h-4 bg-brand-red ml-0.5"
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  )}
                </div>
              </div>

              {/* Scanning state */}
              <AnimatePresence>
                {phase === "scanning" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 mb-6 py-4 px-4 rounded-lg bg-bg/50 border border-surface-border"
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-brand-red/30 border-t-brand-red rounded-full flex-shrink-0"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    />
                    <div className="text-sm">
                      <span className="text-text-secondary">Scanning competitors</span>
                      <span className="text-text-muted mx-1.5">—</span>
                      <span className="font-mono text-brand-red">
                        {scanIndex >= 0 ? SCAN_BRANDS[Math.min(scanIndex, SCAN_BRANDS.length - 1)] : "..."}
                      </span>
                      <span className="text-text-muted ml-2 text-xs">
                        {scanIndex >= 0 ? `${scanIndex + 1}/${SCAN_BRANDS.length}` : ""}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Filters + results (appear after scanning) */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Category pills */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
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
                          className={`px-2.5 py-1 rounded text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                            activeSort === opt
                              ? "bg-white/10 text-text-primary"
                              : "text-text-muted hover:text-text-secondary"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results count */}
              <AnimatePresence>
                {visibleCards > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-3 text-xs text-text-muted"
                  >
                    <span className="font-mono text-text-primary">{visibleCards}</span>
                    {" "}of{" "}
                    <span className="font-mono text-text-primary">{influencers.length}</span>
                    {" "}creators found
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Influencer cards — stagger in */}
              <div className="space-y-2">
                {influencers.slice(0, visibleCards).map((inf, i) => (
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
