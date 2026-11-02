"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// position: optional object-position for landscape shots cropped to the 3:4 frame
type Photo = { src: string; act: string; position?: string };

export default function VenuePhotos({ venue, photos }: { venue: string; photos: Photo[] }) {
  return (
    <section className="mt-20">
      <p className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]">
        Past performances
      </p>
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#F5F0EB] mb-8">
        Live at {venue}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {photos.map((p, i) => (
          <motion.figure
            key={p.src}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#0e0a0c]">
              <Image
                src={p.src}
                alt={`${p.act} at ${venue}`}
                fill
                sizes="(min-width: 768px) 150px, 50vw"
                className="object-cover"
                style={p.position ? { objectPosition: p.position } : undefined}
              />
            </div>
            <figcaption className="mt-2 text-xs text-[#F5F0EB]/50 font-[family-name:var(--font-inter)]">
              {p.act}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
