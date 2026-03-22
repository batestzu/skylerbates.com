"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Step = "form" | "loading" | "success" | "error";

const SET_LENGTHS = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "75 minutes", "90 minutes"];

const TIME_SLOTS = [
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM",
];

export default function TommyKoleBenefitPage() {
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    setLength: "",
    earliestTime: "",
    latestTime: "",
    bringingFriends: "",
    equipmentRequests: "",
    favoriteBeverage: "",
  });

  function update(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStep("loading");

    try {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunity: "Tommy Kole Benefit Show – 28 Mar @ Sweetwaters Edge",
          ...formData,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Something went wrong.");
      setStep("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border border-[rgba(245,240,235,0.12)] px-4 py-3 text-[#F5F0EB] text-sm font-[family-name:var(--font-inter)] placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-[#C2185B] transition-colors";
  const labelClass =
    "block text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/40 mb-2 font-[family-name:var(--font-inter)]";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/opportunities"
            className="text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/40 hover:text-[#C2185B] transition-colors duration-200 font-[family-name:var(--font-inter)] flex items-center gap-2"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Opportunities
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          28 Mar — Sweetwaters Edge
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,7vw,5rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Tommy Kole Benefit Show
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-12"
        />

        {step === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C2185B]/15 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#C2185B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#F5F0EB] mb-3">
              You&apos;re in the mix
            </h2>
            <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] max-w-sm mx-auto">
              Thanks for signing up — we&apos;ll be in touch with your slot details soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label className={labelClass}>Name / Band Name / Stage Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name or act name"
                className={inputClass}
              />
            </div>

            {/* Set length */}
            <div>
              <label className={labelClass}>How long would you like to play?</label>
              <select
                value={formData.setLength}
                onChange={(e) => update("setLength", e.target.value)}
                className={selectClass}
              >
                <option value="" className="bg-[#0e0a0c]">Select a set length…</option>
                {SET_LENGTHS.map((t) => (
                  <option key={t} value={t} className="bg-[#0e0a0c]">{t}</option>
                ))}
              </select>
            </div>

            {/* Earliest / Latest time */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Earliest you can play (1:00–8:00 PM)</label>
                <select
                  value={formData.earliestTime}
                  onChange={(e) => update("earliestTime", e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="bg-[#0e0a0c]">Select…</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t} className="bg-[#0e0a0c]">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Latest you can play (1:00–8:00 PM)</label>
                <select
                  value={formData.latestTime}
                  onChange={(e) => update("latestTime", e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="bg-[#0e0a0c]">Select…</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t} className="bg-[#0e0a0c]">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bringing friends */}
            <div>
              <label className={labelClass}>Will you be bringing friends to play with?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("bringingFriends", opt)}
                    className={`flex-1 py-3 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-inter)] border transition-colors duration-200 ${
                      formData.bringingFriends === opt
                        ? "border-[#C2185B] text-[#C2185B] bg-[#C2185B]/10"
                        : "border-[rgba(245,240,235,0.12)] text-[#F5F0EB]/50 hover:border-[#F5F0EB]/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment requests */}
            <div>
              <label className={labelClass}>Special equipment requests</label>
              <textarea
                rows={3}
                value={formData.equipmentRequests}
                onChange={(e) => update("equipmentRequests", e.target.value)}
                placeholder="Mic, DI box, specific amp, etc. — or leave blank if none"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Favorite beverage */}
            <div>
              <label className={labelClass}>What is your favorite beverage?</label>
              <input
                type="text"
                value={formData.favoriteBeverage}
                onChange={(e) => update("favoriteBeverage", e.target.value)}
                placeholder="We want to know"
                className={inputClass}
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 font-[family-name:var(--font-inter)]">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={step === "loading"}
              className="w-full py-4 bg-[#C2185B] text-[#F5F0EB] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:bg-[#a01048] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {step === "loading" ? "Submitting…" : "Submit"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
