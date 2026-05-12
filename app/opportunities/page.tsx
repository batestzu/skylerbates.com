"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const opportunities: { href: string; title: string; date: string; venue: string; description: string; open: boolean }[] = [];

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
          {opportunities.map((opp) => (
            <Link key={opp.href} href={opp.href} className="block group">
              <div className="border border-[rgba(245,240,235,0.10)] p-6 hover:border-[#C2185B]/40 transition-colors duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C2185B] mb-1 font-[family-name:var(--font-inter)]">
                      {opp.date} — {opp.venue}
                    </p>
                    <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#F5F0EB] mb-2 group-hover:text-[#C2185B] transition-colors duration-200">
                      {opp.title}
                    </h2>
                    <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] leading-relaxed">
                      {opp.description}
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
          ))}
        </motion.div>
      </div>
    </div>
  );
}
