"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PurchaseModal from "@/components/shop/PurchaseModal";

const songs = [
  {
    id: "1",
    title: process.env.NEXT_PUBLIC_SONG_TITLE || "Untitled Track",
    description: "A new original — yours for whatever you can give.",
    duration: "3:47",
    year: "2025",
  },
];

function SuccessBanner({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 mb-8"
    >
      <div className="flex items-center justify-between bg-[#C2185B]/15 border border-[#C2185B]/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#C2185B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-[#F5F0EB]/80 font-[family-name:var(--font-inter)]">
            Payment complete — check your inbox for your download link.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[#F5F0EB]/40 hover:text-[#F5F0EB] transition-colors text-xl leading-none ml-4"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [modalSong, setModalSong] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true);
      // Clean up URL
      window.history.replaceState({}, "", "/shop");
    }
  }, [searchParams]);

  return (
    <>
      {showSuccess && <SuccessBanner onClose={() => setShowSuccess(false)} />}

      <div className="max-w-7xl mx-auto px-6">
        {songs.map((song, i) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group border border-[rgba(245,240,235,0.08)] hover:border-[rgba(245,240,235,0.18)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-6">
              {/* Track number / art placeholder */}
              <div className="shrink-0 w-16 h-16 bg-gradient-to-br from-[#C2185B]/20 to-[#7C3AED]/20 flex items-center justify-center border border-[rgba(245,240,235,0.06)]">
                <span className="font-[family-name:var(--font-cormorant)] text-2xl text-[#F5F0EB]/20 font-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#F5F0EB] mb-1">
                  {song.title}
                </h2>
                <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] mb-2">
                  {song.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#F5F0EB]/30 font-[family-name:var(--font-inter)] uppercase tracking-[0.1em]">
                  <span>{song.duration}</span>
                  <span>·</span>
                  <span>{song.year}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setModalSong(song.title)}
              className="shrink-0 self-start md:self-center px-8 py-3 border border-[#C2185B] text-[#C2185B] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:bg-[#C2185B] hover:text-[#F5F0EB] transition-all duration-200 whitespace-nowrap"
            >
              Name Your Price
            </button>
          </motion.div>
        ))}

        {/* Info section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 pt-12 border-t border-[rgba(245,240,235,0.06)] grid md:grid-cols-3 gap-8"
        >
          {[
            {
              heading: "Pay what you can",
              body: "Set your price — $0 is always welcome. Art should be accessible.",
            },
            {
              heading: "Delivered instantly",
              body: "A download link lands in your inbox within minutes of purchase.",
            },
            {
              heading: "Support independent music",
              body: "Every dollar goes directly to making more music. Thank you.",
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#D4AF37] mb-2">
                {heading}
              </h3>
              <p className="text-sm text-[#F5F0EB]/40 font-[family-name:var(--font-inter)] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {modalSong && (
        <PurchaseModal
          songTitle={modalSong}
          onClose={() => setModalSong(null)}
        />
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          Music
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,6rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Shop
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-12"
        />
      </div>

      <Suspense fallback={null}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
