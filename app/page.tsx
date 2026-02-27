"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const photos = [
  { id: 1, type: "photo", src: "/photos/Highlander Poster.jpg", alt: "Highlander poster", aspect: "tall" },
  { id: 2, type: "photo", src: "/photos/Partridge Roof Top.jpg", alt: "Partridge Inn Rooftop", aspect: "wide" },
  { id: 3, type: "photo", src: "/photos/Sologuitar.jpg", alt: "Solo guitar", aspect: "square" },
  { id: 4, type: "video", src: "https://www.youtube.com/embed/7IGWjHAgwJs", alt: "Solo Pt II", aspect: "tall" },
  { id: 5, type: "video", src: "https://www.youtube.com/embed/OafaooBQ10c", alt: "Plz Don Call", aspect: "wide" },
  { id: 6, type: "video", src: "https://www.youtube.com/embed/k-PObcemCjU", alt: "She Likes Sara More Than Me", aspect: "wide" },
  { id: 7, type: "video", src: "https://www.youtube.com/embed/VzSdinFkxKk", alt: "Used to be", aspect: "tall" },
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
        {/* Background photo */}
        <Image
          src="/nobodies cover.jpg"
          alt="Skyler Bates"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-[#080808]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808]/80" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C2185B]/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7C3AED]/8 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-4 font-[family-name:var(--font-inter)]"
          >
            Singer · Songwriter · Producer · Executive · Performer · Booking Agent · Human
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative overflow-hidden group cursor-pointer aspect-square"
            >
              {photo.type === "video" ? (
                <iframe
                  src={photo.src}
                  title={photo.alt}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              ) : (
                <>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#C2185B]/0 group-hover:bg-[#C2185B]/10 transition-colors duration-500" />
                </>
              )}
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
