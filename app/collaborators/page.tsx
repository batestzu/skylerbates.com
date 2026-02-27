"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Collaborator {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  photo?: string;
  photoPosition?: string;
  instruments?: string[];
  links?: { label: string; href: string }[];
}

const collaborators: Collaborator[] = [
  {
    id: "1",
    name: "Skyler Bates",
    role: "Vocals · Guitar · Songwriter",
    photo: "/collaborators/skyback.jpg",
    shortBio: "The voice and pen behind it all — writing from the intersection of grief and wonder.",
    fullBio:
      "Skyler Bates has been trying to figure his life out for a while now. Still working on it. For now he enjoys his family, his music and his friends.",
    instruments: ["Vocals", "Acoustic Guitar", "Electric Guitar", "Producer"],
  },
  {
    id: "2",
    name: "Mikhil Desai",
    role: "Guitarist: Cool Guy : Composer",
    photo: "/collaborators/mikhil.jpg",
    shortBio: "The only thing more Golden than his Fingers; Is his heart.",
    fullBio:
      "Mikhil Desai was taught by the Gods how to rock when he was but a wee infant in his crib. He doesnt remember, but his fingers do. Mikhil is currently on a quest. The depth of which his heart cannot seem to comprehend. Until then, you can see us in the Band: Instant Shaman which was formed in 2022 in Augusta, GA.",
    instruments: ["Lead Guitar", "Rhythm", "Pedal Expert", "Quartermaster"],
  },
  {
    id: "3",
    name: "Stephen Boucher",
    role: "Drums · Wearing Suits",
    photo: "/collaborators/Stephen.jpg",
    shortBio: "Stephen is the heartbeat of Instant Shaman. His beats guide us; his fashion inspires us.",
    fullBio:
     "When Stephen Boucher was born in Japan, the nurse said something his parents could not understand: 太鼓打ち.",
    instruments: ["Drums", "Percussion", "Vocals"],
  },
  {
    id: "4",
    name: "Freddie Gray",
    role: "Bass : Vocals : Musical Genius",
    photo: "/collaborators/Freddie.jpeg",
    photoPosition: "center 1px",
    shortBio: "Plays from hips; Sings from the soul",
    fullBio:
      "Freddie Gray was on track to be a drummer, thats until he got himself a bass guitar and realized that the world needed him to be a bassist. He has been playing bass for 10 years and has been in several bands in the Augusta area. Instant Shaman is of course is his favorite band for obvious reasons",
    instruments: ["Bass", "Composer", "Vocals"]
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
        {/* Avatar */}
        <div className="w-64 h-64 mb-5 relative overflow-hidden bg-gradient-to-br from-[#C2185B]/20 to-[#7C3AED]/20 border border-[rgba(245,240,235,0.06)] flex items-center justify-center">
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              fill
              className="object-cover"
              style={{ objectPosition: person.photoPosition ?? "center" }}
            />
          ) : (
            <span className="font-[family-name:var(--font-cormorant)] text-7xl text-[#F5F0EB]/20 font-light">
              {person.name.split(" ").map((n) => n[0]).join("")}
            </span>
          )}
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
