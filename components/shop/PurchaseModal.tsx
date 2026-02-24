"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PurchaseModalProps {
  songTitle: string;
  onClose: () => void;
}

type Step = "form" | "loading" | "success" | "error";

export default function PurchaseModal({ songTitle, onClose }: PurchaseModalProps) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");

  const parsedAmount = parseFloat(amount) || 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStep("loading");

    try {
      if (parsedAmount <= 0) {
        // Free download flow
        const res = await fetch("/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, songTitle }),
        });
        if (!res.ok) throw new Error((await res.json()).error || "Something went wrong.");
        setStep("success");
      } else {
        // Paid flow — redirect to Stripe
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, amount: parsedAmount, songTitle }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong.");
        window.location.href = data.url;
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("form");
    }
  }

  const presets = [0, 3, 5, 10];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-[#0e0a0c] border border-[rgba(245,240,235,0.1)] p-8"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-[#F5F0EB]/40 hover:text-[#F5F0EB] transition-colors text-xl leading-none"
          >
            ×
          </button>

          {step === "success" ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#C2185B]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#C2185B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#F5F0EB] mb-2">
                Check your inbox
              </h3>
              <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)]">
                {`"${songTitle}" is on its way to ${email}.`}
              </p>
              <button
                onClick={onClose}
                className="mt-6 text-xs uppercase tracking-[0.2em] text-[#C2185B] font-[family-name:var(--font-inter)] hover:text-[#F5F0EB] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C2185B] mb-1 font-[family-name:var(--font-inter)]">
                Now downloading
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#F5F0EB] mb-6">
                {songTitle}
              </h3>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="purchase-email"
                  className="block text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/50 mb-2 font-[family-name:var(--font-inter)]"
                >
                  Email address
                </label>
                <input
                  id="purchase-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent border border-[rgba(245,240,235,0.15)] px-4 py-3 text-[#F5F0EB] text-sm font-[family-name:var(--font-inter)] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#C2185B] transition-colors"
                />
              </div>

              {/* Amount */}
              <div className="mb-5">
                <label
                  htmlFor="purchase-amount"
                  className="block text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/50 mb-2 font-[family-name:var(--font-inter)]"
                >
                  Name your price
                </label>
                {/* Presets */}
                <div className="flex gap-2 mb-3">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p === 0 ? "0" : String(p))}
                      className={`flex-1 py-2 text-xs font-[family-name:var(--font-inter)] border transition-colors duration-150 ${
                        (amount === String(p) || (p === 0 && amount === "0"))
                          ? "border-[#C2185B] text-[#C2185B] bg-[#C2185B]/10"
                          : "border-[rgba(245,240,235,0.15)] text-[#F5F0EB]/50 hover:border-[rgba(245,240,235,0.3)]"
                      }`}
                    >
                      {p === 0 ? "Free" : `$${p}`}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F5F0EB]/40 text-sm font-[family-name:var(--font-inter)]">
                    $
                  </span>
                  <input
                    id="purchase-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent border border-[rgba(245,240,235,0.15)] pl-8 pr-4 py-3 text-[#F5F0EB] text-sm font-[family-name:var(--font-inter)] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#C2185B] transition-colors"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-400 mb-4 font-[family-name:var(--font-inter)]">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={step === "loading"}
                className="w-full py-3 bg-[#C2185B] text-[#F5F0EB] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:bg-[#a01048] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {step === "loading"
                  ? "Please wait…"
                  : parsedAmount > 0
                  ? `Pay $${parsedAmount.toFixed(2)} & Download`
                  : "Get for Free"}
              </button>

              <p className="mt-4 text-center text-[10px] text-[#F5F0EB]/25 font-[family-name:var(--font-inter)] leading-relaxed">
                Your email will be added to the mailing list. You can unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
