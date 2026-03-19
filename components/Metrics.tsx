"use client";

import { useRef, useEffect, useState } from "react";
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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (prefersReducedMotion) {
      setDisplayValue(display);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    let rafId: number;

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
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(display);
      }
    }

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isInView, prefersReducedMotion, value, display]);

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
