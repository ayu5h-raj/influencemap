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
              className="flex items-center justify-center w-[140px] h-[42px] rounded-lg bg-success flex-shrink-0"
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
              className="whitespace-nowrap min-w-[140px] flex-shrink-0"
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
