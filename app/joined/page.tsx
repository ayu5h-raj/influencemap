"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

function getRandomPosition() {
  return Math.floor(Math.random() * 200) + 2400;
}

function getRandomCode() {
  return Math.random().toString(36).substring(2, 8);
}

export default function JoinedPage() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const positionRef = useRef(getRandomPosition());
  const position = positionRef.current;

  const codeRef = useRef(getRandomCode());
  const referralCode = codeRef.current;

  const referralLink = `influencemap.com/ref/${referralCode}`;

  const shareText = encodeURIComponent(
    "I just joined the @InfluenceMap waitlist \u2014 an AI tool that finds influencers by crawling competitor brand deals. Check it out:"
  );

  const shareUrl = encodeURIComponent("https://influencemap.com");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${referralLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (non-HTTPS or unsupported browser)
    }
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
