"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Photo = { src: string; act: string; width: number; height: number };
type Event = { venue: string; context: string; photos: Photo[] };

// width/height are the actual pixel dimensions of the files in public/portfolio
const events: Event[] = [
  {
    venue: "Sweetwaters Edge",
    context: "Benefit concert — conceived and produced",
    photos: [
      { src: "/portfolio/IMG_4227.jpg", act: "The Augusta Cowpunk Collective", width: 1600, height: 1200 },
      { src: "/portfolio/IMG_4404.jpg", act: "Kale The Plant", width: 1200, height: 1600 },
      { src: "/portfolio/ChristianPhilSW.jpg", act: "Christian & Phil", width: 1200, height: 1600 },
      { src: "/portfolio/MikhilDesaiSW.jpg", act: "Mikhil Desai", width: 1200, height: 1600 },
      { src: "/portfolio/StephenBoucherSW.jpg", act: "Stephen Boucher", width: 1200, height: 1600 },
    ],
  },
  {
    venue: "The Partridge Inn",
    context: "Weekly series across three spaces — scaled up for Masters Week",
    photos: [
      { src: "/portfolio/IMG_4639.jpg", act: "DJ Cellus — Rooftop", width: 1200, height: 1600 },
      { src: "/portfolio/IMG_4796.jpg", act: "CC WiTT — Restaurant, Masters Week", width: 1200, height: 1600 },
      { src: "/portfolio/IMG_4803.jpg", act: "Matt Dalheimer — Veranda, Masters Week", width: 1200, height: 1600 },
      { src: "/portfolio/MikhillDesaiPI.jpg", act: "Mikhil Desai — Rooftop", width: 1600, height: 1200 },
      { src: "/portfolio/GregHesterDevranRoofPI.jpg", act: "Greg Hester & Devran — Rooftop", width: 1200, height: 1600 },
      { src: "/portfolio/OmarKalePIRoof.jpg", act: "Omar Kale — Rooftop", width: 1200, height: 1600 },
      { src: "/portfolio/OmarKalePI.jpg", act: "Omar Kale", width: 1200, height: 1600 },
      { src: "/portfolio/ChrisNeilsenPI.jpg", act: "Chris Nielsen", width: 1200, height: 1600 },
      { src: "/portfolio/ChrisNielsenPI2.jpg", act: "Chris Nielsen", width: 1200, height: 1600 },
      { src: "/portfolio/FernandoGonzalesPI.jpg", act: "Fernando Gonzales", width: 1200, height: 1600 },
      { src: "/portfolio/JamesHuttonPI.jpg", act: "James Hutton", width: 1200, height: 1600 },
      { src: "/portfolio/KeithGregoryPI.jpg", act: "Keith Gregory", width: 1200, height: 1600 },
      { src: "/portfolio/PosterPI2.jpg", act: "Six South event poster — John Hobbs & Robert Reid", width: 940, height: 788 },
    ],
  },
  {
    venue: "The Crowne Plaza",
    context: "Weekly series — lounge and outdoor stages",
    photos: [
      { src: "/portfolio/IMG_6323.jpg", act: "Nery Kim & Wilson Stokes", width: 1200, height: 1600 },
      { src: "/portfolio/IMG_6636.jpg", act: "Chris Nielsen — Outside", width: 1200, height: 1600 },
      { src: "/portfolio/IMG_6656.jpg", act: "This Is the House of Soul Jazz Trio", width: 1600, height: 1200 },
    ],
  },
  {
    venue: "432 Bleu",
    context: "Cyber Venue",
    photos: [
      { src: "/portfolio/DaveMercer432Bleu.jpg", act: "Dave “Muz” Mercer", width: 1080, height: 1080 },
      { src: "/portfolio/InstantShamanPoster432Bleu.jpg", act: "Instant Shaman — Acoustic", width: 1131, height: 1600 },
    ],
  },
  {
    venue: "The Highlander",
    context: "Weekly series",
    photos: [
      { src: "/portfolio/IMG_2698.jpg", act: "Jacob Phillips & Freddie Gray", width: 1200, height: 1600 },
      { src: "/portfolio/IMG_3159.jpg", act: "Chris Rudd", width: 1200, height: 1600 },
      { src: "/portfolio/RaelynBryantFreddieGrayHI.jpg", act: "Raelyn Bryant & Freddie Gray", width: 1600, height: 900 },
      { src: "/portfolio/ABandCalledMooseHI.jpg", act: "A Band Called Moose", width: 1200, height: 1600 },
      { src: "/portfolio/BlueLavaHI.jpg", act: "Blue Lava", width: 1200, height: 1600 },
      { src: "/portfolio/ChrisSebbyHIRotate90.jpg", act: "Chris Sebby", width: 1200, height: 1600 },
      { src: "/portfolio/ChrisSebby3HI.jpg", act: "Chris Sebby", width: 1200, height: 1600 },
      { src: "/portfolio/DougJamesHI.jpg", act: "Doug James", width: 1200, height: 1600 },
      { src: "/portfolio/EricTrusigHI.jpg", act: "Eric Trusig", width: 1200, height: 1600 },
      { src: "/portfolio/EricTrusig_HI_2.jpg", act: "Eric Trusig", width: 1200, height: 1600 },
      { src: "/portfolio/IanRistrophHI1.jpg", act: "Ian Ristroph", width: 1200, height: 1600 },
      { src: "/portfolio/JacobPhillipsHI.jpg", act: "Jacob Phillips", width: 1200, height: 1600 },
      { src: "/portfolio/JacobPhillipsHI2.jpg", act: "Jacob Phillips", width: 1200, height: 1600 },
      { src: "/portfolio/JamesHuttonHI.jpg", act: "James Hutton", width: 1200, height: 1600 },
      { src: "/portfolio/JeremyGautierHIRotate90.jpg", act: "Jeremy Gautier", width: 1200, height: 1600 },
      { src: "/portfolio/JohnathanHIKnight.jpg", act: "Johnathan Knight", width: 1200, height: 1600 },
      { src: "/portfolio/KeithHI.jpg", act: "Keith", width: 1200, height: 1600 },
      { src: "/portfolio/MattDalheimerHIrotate90.jpg", act: "Matt Dalheimer", width: 1200, height: 1600 },
      { src: "/portfolio/OmarKaleHI.jpg", act: "Omar Kale", width: 1200, height: 1600 },
      { src: "/portfolio/PublicMindHI.jpg", act: "Public Mind", width: 1200, height: 1600 },
      { src: "/portfolio/RandyG.jpg", act: "Randy G", width: 1200, height: 1600 },
      { src: "/portfolio/WillMoonOccultsHI.jpg", act: "Will Moon — Occults", width: 1200, height: 1600 },
    ],
  },
];

const strengths = [
  {
    title: "Many programs, one producer",
    body: "Weekly series running in parallel at The Highlander, The Partridge Inn, and The Crowne Plaza, plus concerts at 432 Bleu, A Cyber Venue.",
  },
  {
    title: "Built for the room and the audience",
    body: "A rooftop DJ set, a jazz trio on the patio, a cowpunk band in a full-stage room, and a solo set on a hotel veranda. Every space and crowd gets a different format, with the same quality bar.",
  },
  {
    title: "Scaling for peak moments",
    body: "Masters Week, when Augusta hosts visitors from around the world, means taking a weekly program and expanding it across a rooftop, a restaurant, and a veranda at once.",
  },
  {
    title: "Production tools built with AI",
    body: "I use AI to build my own production tools: artist recruitment forms for each venue, an onboarding packet covering load-in, house rules, and agreements, automated contractor paperwork, and a booking intake that sorts real requests from spam.",
  },
];

const allPhotos =events.flatMap((e) => e.photos.map((p) => ({ ...p, venue: e.venue })));

export default function PortfolioPage() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % allPhotos.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + allPhotos.length) % allPhotos.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl text-[#F5F0EB] mb-6 font-[family-name:var(--font-cormorant)]"
        >
          Events I&apos;ve Produced
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[#F5F0EB]/60 max-w-2xl mb-16 leading-relaxed font-[family-name:var(--font-inter)]"
        >
          Through VibeWithUS Entertainment, I produce live music programs across multiple venues every
          week. I book the talent, work with each venue on its space, handle the logistics, and run
          the night. The work ranges from a benefit concert I threw to Masters Week programming across
          a historic hotel&apos;s rooftop, restaurant, and veranda, and every event is designed around
          how the audience should feel walking in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-baseline gap-4 mb-16"
        >
          <span className="text-6xl md:text-7xl text-[#D4AF37] font-[family-name:var(--font-cormorant)]">
            1,000+
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#F5F0EB]/50 font-[family-name:var(--font-inter)]">
            Individual nights produced
          </span>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px bg-[rgba(245,240,235,0.08)] mb-24">
          {strengths.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#080808] p-6 md:p-8"
            >
              <h3 className="text-2xl text-[#F5F0EB] mb-3 font-[family-name:var(--font-cormorant)]">
                {s.title}
              </h3>
              <p className="text-sm text-[#F5F0EB]/60 leading-relaxed font-[family-name:var(--font-inter)]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        {events.map((event) => (
          <section key={event.venue} className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="mb-8 border-l-2 border-[#C2185B] pl-4"
            >
              <h2 className="text-3xl md:text-4xl text-[#F5F0EB] font-[family-name:var(--font-cormorant)]">
                {event.venue}
              </h2>
              <p className="text-xs uppercase tracking-[0.15em] text-[#D4AF37] mt-1 font-[family-name:var(--font-inter)]">
                {event.context}
              </p>
            </motion.div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {event.photos.map((photo, i) => (
                <motion.figure
                  key={photo.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="mb-6 break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setActive(allPhotos.findIndex((p) => p.src === photo.src))}
                    className="block w-full overflow-hidden group cursor-zoom-in"
                  >
                    <Image
                      src={photo.src}
                      alt={`${photo.act} at ${event.venue}`}
                      width={photo.width}
                      height={photo.height}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-[#F5F0EB]/70 font-[family-name:var(--font-inter)]">
                    {photo.act}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-[#080808]/95 flex flex-col items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <div className="relative w-full flex-1">
              <Image
                src={allPhotos[active].src}
                alt={`${allPhotos[active].act} at ${allPhotos[active].venue}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-sm text-[#F5F0EB]/80 font-[family-name:var(--font-inter)]">
              {allPhotos[active].act} <span className="text-[#F5F0EB]/40">· {allPhotos[active].venue}</span>
            </p>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 text-[#F5F0EB]/70 hover:text-[#F5F0EB] text-3xl leading-none"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
