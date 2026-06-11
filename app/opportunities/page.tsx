"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const venues = [
  {
    href: "/opportunities/the-highlander",
    title: "The Highlander",
    tagline: "British Pub · North Augusta, SC",
    description: "Friday night performances. Solo acts & groups welcome. $150–$200 pay plus free Yuengling.",
  },
  {
    href: "/opportunities/the-partridge-inn",
    title: "The Partridge Inn",
    tagline: "Southern Grand Hotel · Augusta, GA",
    description: "Upscale dinner music for 8595 restaurant (Fridays) and the 6South rooftop bar (Saturdays).",
  },
  {
    href: "/opportunities/vibe-with-us-jazz",
    title: "VibeWithUs Jazz",
    tagline: "In Partnership with VibeWithUs Entertainment",
    description: "Jazz musicians for public and private events. Groups and individuals encouraged to apply.",
  },
  {
    href: "/opportunities/432-bleu",
    title: "432 Bleu",
    tagline: "Interactive Concert Venue",
    description: "Livestream-ready stage. Ticket-split compensation, VIP packages, merch support, and global reach.",
  },
];

export default function OpportunitiesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          Work together
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,6rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Opportunities
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4"
        >
          {venues.map((venue, i) => (
            <motion.div
              key={venue.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
            >
              <Link href={venue.href} className="block group">
                <div className="border border-[rgba(245,240,235,0.10)] p-6 hover:border-[#C2185B]/40 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#C2185B] mb-1 font-[family-name:var(--font-inter)]">
                        {venue.tagline}
                      </p>
                      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#F5F0EB] mb-2 group-hover:text-[#C2185B] transition-colors duration-200">
                        {venue.title}
                      </h2>
                      <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] leading-relaxed">
                        {venue.description}
                      </p>
                    </div>
                    <span className="shrink-0 mt-1 text-[#F5F0EB]/30 group-hover:text-[#C2185B] transition-colors duration-200">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
