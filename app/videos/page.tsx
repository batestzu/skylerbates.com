"use client";

import { motion } from "framer-motion";

// Replace src with real YouTube/Vimeo embed URLs
const videos = [
  {
    id: "1",
    title: "Live at The Basement",
    subtitle: "Nashville, TN · 2024",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Studio Session #1",
    subtitle: "Behind the scenes",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Acoustic Set",
    subtitle: "Living room performance",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Music Video",
    subtitle: "Official release",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function VideosPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          Watch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,6rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Videos
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="group"
          >
            {/* Embed */}
            <div className="relative w-full aspect-video bg-[rgba(255,255,255,0.03)] border border-[rgba(245,240,235,0.06)] overflow-hidden mb-4">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#F5F0EB] mb-1">
              {video.title}
            </h2>
            <p className="text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/40 font-[family-name:var(--font-inter)]">
              {video.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
