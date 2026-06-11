"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Step = "form" | "loading" | "success";

export default function ThePartridgeInnPage() {
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    opportunity: "The Partridge Inn",
    name: "",
    groupName: "",
    email: "",
    phone: "",
    actType: "",
    equipmentRequests: "",
    favoriteBeverage: "",
    notes: "",
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
          <Link href="/opportunities" className="hover:text-[#C2185B]/70 transition-colors">
            Opportunities
          </Link>
          {" / "}The Partridge Inn
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,7vw,5rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          The Partridge Inn
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-[#F5F0EB]/70 font-[family-name:var(--font-inter)] text-sm leading-relaxed mb-12 max-w-xl"
        >
          The Partridge Inn is a Southern Grand Hotel. It features an upscale fine dining
          restaurant, 8595, and an elegant rooftop bar, 6South. We have entertainment on Fridays
          &amp; Saturdays. Friday will be in 8595 and Saturday will be at 6South. We are looking
          for solos and duos for nice dinner music. If you feel this is you please fill out a form
          and I will follow up with you.
        </motion.p>

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
              Application received
            </h2>
            <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] max-w-sm mx-auto">
              Thank you for your interest in The Partridge Inn. We&apos;ll be in touch soon.
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
            {/* Name + Group Name */}
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
                <label className={labelClass}>Group name</label>
                <input
                  type="text"
                  value={formData.groupName}
                  onChange={(e) => update("groupName", e.target.value)}
                  placeholder="Smith &amp; Cole Duo"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-6">
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
              <div>
                <label className={labelClass}>Phone number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Act Type */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Act type</label>
                <select
                  value={formData.actType}
                  onChange={(e) => update("actType", e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-[#0e0a0c]">Select…</option>
                  <option value="Solo" className="bg-[#0e0a0c]">Solo</option>
                  <option value="Duo" className="bg-[#0e0a0c]">Duo</option>
                </select>
              </div>
            </div>

            {/* Equipment Requests */}
            <div>
              <label className={labelClass}>Equipment requests</label>
              <input
                type="text"
                value={formData.equipmentRequests}
                onChange={(e) => update("equipmentRequests", e.target.value)}
                placeholder="PA, monitors, music stand…"
                className={inputClass}
              />
            </div>

            {/* Favorite Beverage */}
            <div>
              <label className={labelClass}>Favorite beverage</label>
              <input
                type="text"
                value={formData.favoriteBeverage}
                onChange={(e) => update("favoriteBeverage", e.target.value)}
                placeholder="Sparkling water, sweet tea…"
                className={inputClass}
              />
            </div>

            {/* Notes */}
            <div>
              <label className={labelClass}>Additional notes</label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Tell us about your sound, repertoire, or anything else."
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
              {step === "loading" ? "Sending…" : "Submit Application"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
