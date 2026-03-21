"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    question: "What is InfluenceMap?",
    answer:
      "InfluenceMap is an AI-powered influencer discovery platform. Describe your brand, niche, and goals — and our AI matches you with creators who are the best fit based on engagement quality, audience demographics, content relevance, and proven track record.",
  },
  {
    question: "How is this different from other influencer tools?",
    answer:
      "Most influencer platforms rely on self-reported databases or basic keyword searches. InfluenceMap uses intelligent matching — analyzing millions of creator profiles to find the ones that genuinely fit your brand, not just creators with big follower counts.",
  },
  {
    question: "Which platforms do you support?",
    answer:
      "We currently analyze creator profiles across Instagram and YouTube, evaluating engagement patterns, audience demographics, content style, and brand collaboration history. We're actively working on expanding to more platforms.",
  },
  {
    question: "How does the waitlist work?",
    answer:
      "Sign up with your email and you'll get a position in the queue. We're onboarding users in batches to ensure a great experience. You'll receive one email when it's your turn — no spam, ever.",
  },
  {
    question: "Is it free?",
    answer:
      "InfluenceMap will be free during the beta period. We plan to offer a generous free tier at launch, with premium plans for agencies and teams who need higher volume searches and advanced analytics.",
  },
  {
    question: "How do you find influencer data? Is it ethical?",
    answer:
      "We analyze publicly available data from social media platforms — public profiles, engagement metrics, and content. We don't access private profiles, DMs, or any non-public information. Our methods comply with platform terms of service and data protection regulations.",
  },
  {
    question: "What data do I get for each influencer?",
    answer:
      "For every creator we surface, you get: follower count, engagement rate, past brand collaborations, average views, content niche, and recent sponsored posts. Everything you need to make an informed outreach decision.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-surface-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-inset rounded"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-text-primary pr-4">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-muted flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="8" y1="3" x2="8" y2="13" />
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4">
            Frequently asked questions
          </h2>
          <p className="text-text-secondary text-center mb-12">
            Everything you need to know about InfluenceMap.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="border-t border-surface-border">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
