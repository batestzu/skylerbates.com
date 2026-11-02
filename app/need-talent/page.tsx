"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Step = "form" | "loading" | "success";

const talentTypes = [
  "Solo Acoustic",
  "Duo",
  "Jazz Ensemble",
  "Full Band",
  "DJ",
  "Host / MC",
  "Not sure yet",
];

const eventTypes = [
  "Private Party",
  "Wedding",
  "Corporate Event",
  "Restaurant / Bar",
  "Festival",
  "Hotel / Venue Residency",
  "Other",
];

export default function NeedTalentPage() {
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    eventType: "",
    date: "",
    time: "",
    city: "",
    venue: "",
    guests: "",
    budget: "",
    message: "",
  });
  const [talent, setTalent] = useState<string[]>([]);
  // Honeypot — invisible to real users, catches bots that blindly fill every input.
  const [company, setCompany] = useState("");
  const mountedAt = useRef(Date.now());

  function update(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleTalent(t: string) {
    setTalent((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStep("loading");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "talent",
          ...formData,
          talent: talent.join(", "),
          company,
          elapsedMs: Date.now() - mountedAt.current,
        }),
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
          For event planners &amp; venues
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,6rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Need Talent?
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-sm leading-relaxed text-[#F5F0EB]/60 font-[family-name:var(--font-inter)] mb-12 max-w-xl"
        >
          Planning an event and need live entertainment? At 432 Intelligence Inc, we have an
          extensive network of artists, musicians, performers, comedians and more.
          Tell us about your event and we&apos;ll follow up with options.
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
              Request received
            </h2>
            <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] max-w-sm mx-auto">
              Thank you — we&apos;ll reach out soon with talent options for your event.
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
            {/* Honeypot — hidden from real users, left open for bots to fill */}
            <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Name + Email */}
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

            {/* Phone + Organization */}
            <div className="grid sm:grid-cols-2 gap-6">
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
              <div>
                <label className={labelClass}>Organization / Business</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="Smith & Co. Events"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Talent wanted */}
            <div>
              <label className={labelClass}>What kind of talent?</label>
              <div className="flex flex-wrap gap-3">
                {talentTypes.map((t) => {
                  const on = talent.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleTalent(t)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-[family-name:var(--font-inter)] border transition-colors duration-200 ${
                        on
                          ? "border-[#C2185B] bg-[#C2185B]/15 text-[#F5F0EB]"
                          : "border-[rgba(245,240,235,0.12)] text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:border-[rgba(245,240,235,0.3)]"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Event type + Guests */}
            <div className="grid sm:grid-cols-2 gap-6">
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
              <div>
                <label className={labelClass}>Expected guests</label>
                <input
                  type="text"
                  value={formData.guests}
                  onChange={(e) => update("guests", e.target.value)}
                  placeholder="About 150"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Date + Time */}
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
                <label className={labelClass}>Set time / length</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => update("time", e.target.value)}
                  placeholder="7–10pm, two sets"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Venue + City */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Venue name</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => update("venue", e.target.value)}
                  placeholder="The Grand Ballroom"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>City / Location</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Augusta, GA"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className={labelClass}>Budget</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="$"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>Tell us about your event *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="The vibe you're going for, indoor/outdoor, sound system available, special song requests, etc."
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
              {step === "loading" ? "Sending…" : "Request Talent"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
