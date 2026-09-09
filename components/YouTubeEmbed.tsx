"use client";

import { useState } from "react";

function extractVideoId(embedUrl: string): string {
  return embedUrl.split("/embed/")[1]?.split("?")[0] ?? "";
}

export default function YouTubeEmbed({
  embedUrl,
  title,
  className = "",
}: {
  embedUrl: string;
  title: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const videoId = extractVideoId(embedUrl);

  if (loaded) {
    return (
      <iframe
        src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`absolute inset-0 w-full h-full ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play ${title}`}
      className={`absolute inset-0 w-full h-full group ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#080808]/30 group-hover:bg-[#080808]/10 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-[#C2185B] flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
          <svg className="w-5 h-5 text-[#F5F0EB] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
