"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Placeholder photo grid — swap src values for real images
const photos = [
  { id: 1, alt: "Skyler performing live", aspect: "tall" },
  { id: 2, alt: "Studio session", aspect: "wide" },
  { id: 3, alt: "Backstage portrait", aspect: "square" },
  { id: 4, alt: "Outdoor shoot", aspect: "tall" },
  { id: 5, alt: "Close-up detail", aspect: "square" },
  { id: 6, alt: "Live at venue", aspect: "wide" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0d0408] to-[#080808]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C2185B]/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7C3AED]/8 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-4 font-[family-name:var(--font-inter)]"
          >
            Singer · Songwriter · Collaborator
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-cormorant)] text-[clamp(4rem,12vw,10rem)] font-light leading-[0.92] tracking-tight text-[#F5F0EB] mb-8"
          >
            Skyler
            <br />
            <em className="text-[#C2185B]">Bates</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#C2185B] text-[#F5F0EB] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:bg-[#a01048] transition-colors duration-200"
            >
              Get the Music
            </Link>
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 px-7 py-3 border border-[rgba(245,240,235,0.2)] text-[#F5F0EB]/70 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:border-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-all duration-200"
            >
              Upcoming Shows
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F5F0EB]/30 font-[family-name:var(--font-inter)]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[#F5F0EB]/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* Photo Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#F5F0EB]/80 tracking-wide">
            Gallery
          </h2>
          <div className="flex-1 h-px bg-[rgba(245,240,235,0.08)]" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`relative overflow-hidden bg-[rgba(255,255,255,0.03)] group cursor-pointer ${
                photo.aspect === "tall"
                  ? "aspect-[3/4]"
                  : photo.aspect === "wide"
                  ? "aspect-[16/9]"
                  : "aspect-square"
              } ${i === 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              {/* Placeholder — replace with real <Image> when photos are available */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C2185B]/10 to-[#7C3AED]/10" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <span className="text-[#F5F0EB]/10 font-[family-name:var(--font-cormorant)] text-lg italic text-center">
                  {photo.alt}
                </span>
              </div>
              <div className="absolute inset-0 bg-[#C2185B]/0 group-hover:bg-[#C2185B]/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-y border-[rgba(245,240,235,0.08)] py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C2185B] mb-2 font-[family-name:var(--font-inter)]">
              New music available
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[#F5F0EB]">
              Pay what you can.
            </h2>
          </div>
          <Link
            href="/shop"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 border border-[#C2185B] text-[#C2185B] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:bg-[#C2185B] hover:text-[#F5F0EB] transition-all duration-200"
          >
            Visit the Shop
          </Link>
        </div>
      </section>
    </>
  );
}
