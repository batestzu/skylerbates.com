"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Collaborator {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  instruments?: string[];
  links?: { label: string; href: string }[];
}

const collaborators: Collaborator[] = [
  {
    id: "1",
    name: "Skyler Bates",
    role: "Vocals · Guitar · Songwriter",
    shortBio: "The voice and pen behind it all — writing from the intersection of grief and wonder.",
    fullBio:
      "Skyler Bates has been writing songs since they were old enough to hold a guitar. Their music is rooted in the American folk tradition but pushes toward something harder to name — a sound that lives in the space between a lullaby and a heartbreak. Based in Nashville, Skyler has performed across the country, sharing stages with artists ranging from indie folk to Americana. Their songs have been described as both devastatingly sad and quietly hopeful, often at the same time.",
    instruments: ["Vocals", "Acoustic Guitar", "Electric Guitar", "Piano"],
  },
  {
    id: "2",
    name: "Marcus Webb",
    role: "Bass · Producer",
    shortBio: "Holds everything together from the low end. Has a way of making silence feel like music.",
    fullBio:
      "Marcus Webb grew up in Memphis, the son of a church musician and a jazz bassist. He came up through gospel before finding his way into the singer-songwriter world, and that lineage shows — there's a depth and intentionality to every note he plays. As a producer, Marcus has a gift for creating space, for knowing when to pull back and let the song breathe. He and Skyler have been collaborating since 2020.",
    instruments: ["Bass Guitar", "Upright Bass", "Keys"],
  },
  {
    id: "3",
    name: "Priya Anand",
    role: "Violin · Arrangements",
    shortBio: "Brings classical training and a feral spirit. Her string arrangements make rooms feel bigger.",
    fullBio:
      "Priya Anand began studying violin at age four, went on to study at conservatory, and then promptly decided to play in every genre she could find. She discovered folk and Americana in her mid-twenties and never looked back. Priya's arrangements for Skyler's songs draw on everything from Appalachian fiddle to chamber music, and the result is something entirely her own. She also teaches and runs a string quartet in Nashville.",
    instruments: ["Violin", "Viola", "Orchestral Arrangements"],
  },
  {
    id: "4",
    name: "Dani Reyes",
    role: "Drums · Percussion",
    shortBio: "Plays with the restraint of someone who knows exactly how much to hold back.",
    fullBio:
      "Dani Reyes is a Nashville-based drummer who has played on more records than they can count. What makes Dani special isn't flash — it's taste. They know that great drumming in a folk or Americana context is about feel, about locking in with the song rather than competing with it. Off stage, Dani is a devoted record collector and can usually be found digging through bins at the local shop on weekends.",
    instruments: ["Drums", "Percussion", "Brushes"],
  },
];

function CollaboratorCard({ person, index }: { person: Collaborator; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border border-[rgba(245,240,235,0.08)] bg-[rgba(255,255,255,0.02)]"
    >
      {/* Header */}
      <div className="p-8 pb-6">
        {/* Avatar placeholder */}
        <div className="w-16 h-16 mb-5 bg-gradient-to-br from-[#C2185B]/20 to-[#7C3AED]/20 border border-[rgba(245,240,235,0.06)] flex items-center justify-center">
          <span className="font-[family-name:var(--font-cormorant)] text-2xl text-[#F5F0EB]/20 font-light">
            {person.name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#F5F0EB] mb-1">
          {person.name}
        </h2>
        <p className="text-xs uppercase tracking-[0.15em] text-[#C2185B] font-[family-name:var(--font-inter)] mb-4">
          {person.role}
        </p>
        <p className="text-sm text-[#F5F0EB]/55 font-[family-name:var(--font-inter)] leading-relaxed">
          {person.shortBio}
        </p>

        {/* Instruments */}
        {person.instruments && (
          <div className="flex flex-wrap gap-2 mt-4">
            {person.instruments.map((inst) => (
              <span
                key={inst}
                className="text-[10px] uppercase tracking-[0.12em] text-[#F5F0EB]/30 border border-[rgba(245,240,235,0.08)] px-2.5 py-1 font-[family-name:var(--font-inter)]"
              >
                {inst}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expand toggle */}
      <div className="px-8 pb-8">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs uppercase tracking-[0.2em] text-[#C2185B]/70 font-[family-name:var(--font-inter)] hover:text-[#C2185B] transition-colors flex items-center gap-2"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-base leading-none"
          >
            ↓
          </motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm text-[#F5F0EB]/65 font-[family-name:var(--font-inter)] leading-relaxed border-t border-[rgba(245,240,235,0.06)] pt-4">
                {person.fullBio}
              </p>
              {person.links && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {person.links.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-[0.15em] text-[#D4AF37] font-[family-name:var(--font-inter)] hover:underline"
                    >
                      {label} →
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CollaboratorsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          The band
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,6rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Collaborators
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-xl text-sm text-[#F5F0EB]/45 font-[family-name:var(--font-inter)] leading-relaxed"
        >
          These are the people who show up and make the music real.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        {collaborators.map((person, i) => (
          <CollaboratorCard key={person.id} person={person} index={i} />
        ))}
      </div>
    </div>
  );
}
