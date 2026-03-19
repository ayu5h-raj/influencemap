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
