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
