"use client";

import { motion } from "framer-motion";

interface Show {
  id: string;
  date: string;
  dayOfWeek: string;
  venue: string;
  city: string;
  stateCountry: string;
  ticketUrl?: string;
  note?: string;
}

// Update these shows as dates approach
const shows: Show[] = [
  {
    id: "1",
    date: "25 Mar 2026",
    dayOfWeek: "Wednesday",
    venue: "The Maxwell Performing Arts Theatre",
    city: "Augusta",
    stateCountry: "GA",
    ticketUrl: "https://www.instagram.com/p/DUjJUIEEdEf/",
    note: "Rooted 250"
  },
  {
    id: "2",
    date: "25 Mar 2026",
    dayOfWeek: "Wednesday",
    venue: "The Highlander",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/abritishpub",
    note: "Host: Open Mic Night"
  },
  {
    id: "3",
    date: "27 Mar 2026",
    dayOfWeek: "Friday",
    venue: "Invite Only",
    city: "Augusta",
    stateCountry: "GA",
    ticketUrl: "https://www.facebook.com/InstantShaman",
    note: "We Do Private Functions!"
  },
  {
    id: "4",
    date: "28 Mar 2026",
    dayOfWeek: "Saturday",
    venue: "Sweetwaters Edge",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/p/Sweetwaters-Edge-61576975732009/",
    note: "Tommy Kole Benefit Show"
  },
  {
    id: "5",
    date: "29 Mar 2026",
    dayOfWeek: "Sunday",
    venue: "Boil Weeval - Instant Shaman - Acoustic",
    city: "Augusta",
    stateCountry: "GA",
    ticketUrl: "https://thebollweevil.com/",
    note: "Brunch: 12-3 PM"
  },
  {
    id: "6",
    date: "1 Apr 2026",
    dayOfWeek: "Wednesday",
    venue: "The Highlander",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/abritishpub",
    note: "Host: Open Mic Night"
  },
  {
    id: "7",
    date: "8 Apr 2026",
    dayOfWeek: "Wednesday",
    venue: "The Highlander",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/abritishpub",
    note: "Host: Open Mic Night"
  },
  {
    id: "8",
    date: "10 Apr 2026",
    dayOfWeek: "Friday",
    venue: "Sweetwaters Edge",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/p/Sweetwaters-Edge-61576975732009/",
    note: "Open Mic Night"
  },
  {
    id: "9",
    date: "15 Apr 2026",
    dayOfWeek: "Wednesday",
    venue: "The Highlander",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/abritishpub",
    note: "Host: Open Mic Night"
  },
  {
    id: "10",
    date: "17 Apr 2026",
    dayOfWeek: "Friday",
    venue: "Sweetwaters Edge",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/p/Sweetwaters-Edge-61576975732009/",
    note: "Open Mic Night"
  },
  {
    id: "11",
    date: "22 Apr 2026",
    dayOfWeek: "Wednesday",
    venue: "The Highlander",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/abritishpub",
    note: "Host: Open Mic Night"
  },
  {
    id: "12",
    date: "24 Apr 2026",
    dayOfWeek: "Friday",
    venue: "Sweetwaters Edge",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/p/Sweetwaters-Edge-61576975732009/",
    note: "Open Mic Night"
  },
  {
    id: "13",
    date: "29 Apr 2026",
    dayOfWeek: "Wednesday",
    venue: "The Highlander",
    city: "North Augusta",
    stateCountry: "SC",
    ticketUrl: "https://www.facebook.com/abritishpub",
    note: "Host: Open Mic Night"
  },
];

export default function ShowsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          Live
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,6rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Shows
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="divide-y divide-[rgba(245,240,235,0.06)]">
          {shows.map((show, i) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[rgba(255,255,255,0.02)] -mx-3 px-3 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
                {/* Date */}
                <div className="shrink-0 min-w-[130px]">
                  <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#F5F0EB]">
                    {show.date}
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/30 font-[family-name:var(--font-inter)]">
                    {show.dayOfWeek}
                  </p>
                </div>

                {/* Venue */}
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-[family-name:var(--font-inter)] text-sm text-[#F5F0EB]/80 font-medium">
                      {show.venue}
                    </p>
                    {show.note && (
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5">
                        {show.note}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#F5F0EB]/40 font-[family-name:var(--font-inter)] mt-0.5">
                    {show.city}, {show.stateCountry}
                  </p>
                </div>
              </div>

              {show.ticketUrl && (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 self-start sm:self-center px-6 py-2 border border-[rgba(245,240,235,0.15)] text-[#F5F0EB]/60 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-inter)] hover:border-[#C2185B] hover:text-[#C2185B] transition-all duration-200 whitespace-nowrap"
                >
                  Tickets
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {shows.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#F5F0EB]/30 italic">
              No shows currently scheduled.
            </p>
            <p className="mt-4 text-sm text-[#F5F0EB]/30 font-[family-name:var(--font-inter)]">
              Check back soon, or{" "}
              <a href="/booking" className="text-[#C2185B] hover:underline">
                inquire about booking
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
