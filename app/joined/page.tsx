"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

function JoinedContent() {
  const prefersReducedMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const position = searchParams.get("p") ? Number(searchParams.get("p")) : null;

  const shareText = encodeURIComponent(
    "I just joined the @InfluenceMap waitlist \u2014 an AI tool that finds influencers by crawling competitor brand deals. Check it out:"
  );

  const shareUrl = encodeURIComponent("https://influencemap.com");

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

        {position && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.1 }}
            className="font-mono text-2xl text-brand-red font-bold mb-8"
          >
            Your position: #{position.toLocaleString()}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.2 }}
          className={`flex flex-col sm:flex-row gap-3 justify-center ${position ? "" : "mt-6"}`}
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
        </motion.div>
      </div>
    </main>
  );
}

export default function JoinedPage() {
  return (
    <Suspense>
      <JoinedContent />
    </Suspense>
  );
}
