"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Section {
  title: string;
  items: string[];
}

const venueLoadIns = [
  {
    venue: "The Highlander",
    details: "Load-in: as early as 4:00 PM; park around back, inform staff, there is a ramp and rear entrance. Self- Soundcheck. there is a Yamaha Powered Mixer with two 15's installed. A monitor can be daisy chained or there is an aux output for powered monitors. Free Yuengling!",
  },
  {
    venue: "The Partridge Inn",
    details: "Load-in: as early as 4:00 PM, Check with staff for rooftop entry prior to 5:00 PM. Park in the lower parking deck (Hickman Road Entrance). Carts are available at the front entrance of the hotel. Please return when finished loading. You will be provided photos of playing locations. In both cases check sound with host and or bartender. There are no food or beverage comps.",
  },
  {
    venue: "Crowne Plaza",
    details: "Load in: as early as 4:00 PM & 5:00 PM for roof shows; You may temporarially park (with hazards) in front of the "Salt & Marrow" entrance. after you have unloaded park in the parking garage nearest the hotel. If you have a parking fee in the garage, you may submit a reciept and be riembursed seperate from your performance compensation. Speak to booking agent for further details.",
  },
];

const sections: Section[] = [
  {
    title: "House Rules",
    items: [
      "Set lengths, volume guidelines, and stage conduct — details coming soon.",
      "Equipment and backline expectations — details coming soon.",
    ],
  },
  {
    title: "Perks",
    items: [
      "Venue hospitality (drinks / meals) — details coming soon.",
      "Promotion on the skylerbates.com shows page and social channels.",
      "Strong performances lead to recurring slots across our partner venues.",
    ],
  },
  {
    title: "Agreements",
    items: [
      "Payment terms and cancellation notice — details coming soon.",
      "Promotion expectations — details coming soon.",
      "Paid contractors must submit a W-9 before their first payout — use the secure form linked below.",
    ],
  },
];

export default function OnboardingPage() {
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
          {" / "}Artist Onboarding
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,7vw,5rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Artist Onboarding
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-8"
        />

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-14"
        >
          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#F5F0EB]/90 leading-relaxed mb-3">
            Thank you for working with 432 Intelligence Inc DBA VibeWithUS Entertainment.
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] font-[family-name:var(--font-inter)]">
            VibeWithUs, Grow With US.
          </p>
        </motion.div>

        {/* Load-in & Soundcheck */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mb-12"
        >
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#F5F0EB] mb-6">
            Load-In &amp; Soundcheck
          </h2>
          <div className="divide-y divide-[rgba(245,240,235,0.06)] border border-[rgba(245,240,235,0.10)]">
            {venueLoadIns.map((v) => (
              <div key={v.venue} className="p-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                <p className="shrink-0 sm:min-w-[180px] font-[family-name:var(--font-inter)] text-sm text-[#F5F0EB]/80 font-medium">
                  {v.venue}
                </p>
                <p className="text-sm text-[#F5F0EB]/40 font-[family-name:var(--font-inter)] italic">
                  {v.details}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rules / Perks / Agreements */}
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}
            className="mb-12"
          >
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#F5F0EB] mb-6">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 text-sm text-[#F5F0EB]/60 font-[family-name:var(--font-inter)] leading-relaxed"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C2185B]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* W-9 + PDF */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 mt-16"
        >
          <Link
            href="/docs"
            className="flex-1 text-center py-4 bg-[#C2185B] text-[#F5F0EB] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:bg-[#a01048] transition-colors duration-200"
          >
            Submit Your W-9
          </Link>
          <a
            href="/onboarding-packet.pdf"
            download
            className="flex-1 text-center py-4 border border-[rgba(245,240,235,0.15)] text-[#F5F0EB]/60 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
          >
            Download the PDF Packet
          </a>
        </motion.div>

        {/* Contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-12 text-sm text-[#F5F0EB]/40 font-[family-name:var(--font-inter)]"
        >
          Questions? Reach out any time at{" "}
          <a href="mailto:theskylerbates@gmail.com" className="text-[#C2185B] hover:underline">
            theskylerbates@gmail.com
          </a>
          .
        </motion.p>
      </div>
    </div>
  );
}
