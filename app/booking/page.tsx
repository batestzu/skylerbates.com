"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Step = "form" | "loading" | "success" | "error";

const eventTypes = [
  "Concert / Club",
  "Festival",
  "Private Event",
  "Corporate Event",
  "Wedding",
  "Other",
];

export default function BookingPage() {
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    eventType: "",
    date: "",
    venue: "",
    city: "",
    budget: "",
    message: "",
  });

  function update(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStep("loading");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Something went wrong.");
      setStep("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("form");
    }
  }

  const inputClass =
    "w-full bg-transparent border border-[rgba(245,240,235,0.12)] px-4 py-3 text-[#F5F0EB] text-sm font-[family-name:var(--font-inter)] placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-[#C2185B] transition-colors";
  const labelClass =
    "block text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/40 mb-2 font-[family-name:var(--font-inter)]";

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          Get in touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,6rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Booking
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
              Inquiry received
            </h2>
            <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] max-w-sm mx-auto">
              Thank you — we&apos;ll be in touch soon about your inquiry.
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
            {/* Row 1: Name + Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Your name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="jane@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 2: Organization + Event Type */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Organization / Venue</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="The Music Hall"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Event type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => update("eventType", e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-[#0e0a0c]">Select…</option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#0e0a0c]">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Date + City */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Event date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => update("date", e.target.value)}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
              <div>
                <label className={labelClass}>City / Location</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Nashville, TN"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className={labelClass}>Venue name</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => update("venue", e.target.value)}
                placeholder="The Basement"
                className={inputClass}
              />
            </div>

            {/* Budget */}
            <div>
              <label className={labelClass}>Budget / Offer</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="$500 guarantee + door"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>Additional details *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us about the show, expected audience, production needs, etc."
                className={`${inputClass} resize-none`}
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
              {step === "loading" ? "Sending…" : "Submit Inquiry"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
