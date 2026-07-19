/**
 * Generates public/onboarding-packet.pdf — the downloadable artist onboarding
 * packet linked from /opportunities/onboarding.
 *
 * Re-run after editing the content below:
 *   bun run scripts/generate-onboarding-packet.ts
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

const CREAM = rgb(0.98, 0.965, 0.94);
const INK = rgb(0.1, 0.09, 0.09);
const CRIMSON = rgb(0.76, 0.09, 0.36);
const GOLD = rgb(0.7, 0.58, 0.19);
const MUTED = rgb(0.42, 0.4, 0.39);

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 64;

const sections: { title: string; items: string[] }[] = [
  {
    title: "Load-In & Soundcheck",
    items: [
      "The Highlander — details coming soon.",
      "The Partridge Inn — details coming soon.",
      "Crowne Plaza — details coming soon.",
    ],
  },
  {
    title: "House Rules",
    items: [
      "Set lengths, volume guidelines, and stage conduct — details coming soon.",
      "Equipment and backline expectations — details coming soon.",
    ],
  },
  {
    title: "Perks",
    items: [
      "Venue hospitality (drinks / meals) — details coming soon.",
      "Promotion on the skylerbates.com shows page and social channels.",
      "Strong performances lead to recurring slots across our partner venues.",
    ],
  },
  {
    title: "Agreements",
    items: [
      "Payment terms and cancellation notice — details coming soon.",
      "Promotion expectations — details coming soon.",
      "Paid contractors must submit a W-9 before their first payout via the secure form at skylerbates.com/docs.",
    ],
  },
];

function wrap(text: string, font: import("pdf-lib").PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function main() {
  const doc = await PDFDocument.create();
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const page = doc.addPage([PAGE_W, PAGE_H]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: CREAM });
  // Crimson top band
  page.drawRectangle({ x: 0, y: PAGE_H - 8, width: PAGE_W, height: 8, color: CRIMSON });

  let y = PAGE_H - MARGIN - 12;
  const contentWidth = PAGE_W - MARGIN * 2;

  page.drawText("ARTIST ONBOARDING", { x: MARGIN, y, size: 11, font: sansBold, color: CRIMSON });
  y -= 30;

  const welcomeLines = wrap(
    "Thank you for working with 432 Intelligence Inc DBA VibeWithUS Entertainment.",
    serif,
    22,
    contentWidth
  );
  for (const line of welcomeLines) {
    page.drawText(line, { x: MARGIN, y, size: 22, font: serif, color: INK });
    y -= 27;
  }
  y -= 2;
  page.drawText("VibeWithUs, Grow With US.", { x: MARGIN, y, size: 12, font: serifItalic, color: GOLD });
  y -= 14;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: MARGIN + 90, y },
    thickness: 1,
    color: CRIMSON,
  });
  y -= 30;

  for (const section of sections) {
    page.drawText(section.title, { x: MARGIN, y, size: 16, font: serif, color: INK });
    y -= 20;
    for (const item of section.items) {
      const lines = wrap(item, sans, 10, contentWidth - 16);
      let first = true;
      for (const line of lines) {
        if (first) {
          page.drawCircle({ x: MARGIN + 3, y: y + 3.5, size: 1.5, color: CRIMSON });
        }
        page.drawText(line, { x: MARGIN + 14, y, size: 10, font: sans, color: MUTED });
        y -= 15;
        first = false;
      }
    }
    y -= 14;
  }

  // Footer
  page.drawLine({
    start: { x: MARGIN, y: MARGIN + 24 },
    end: { x: PAGE_W - MARGIN, y: MARGIN + 24 },
    thickness: 0.5,
    color: rgb(0.85, 0.83, 0.8),
  });
  page.drawText("Questions? theskylerbates@gmail.com   ·   skylerbates.com", {
    x: MARGIN,
    y: MARGIN + 8,
    size: 9,
    font: sans,
    color: MUTED,
  });

  const bytes = await doc.save();
  const out = path.join(process.cwd(), "public", "onboarding-packet.pdf");
  fs.writeFileSync(out, bytes);
  console.log(`Wrote ${out} (${bytes.length} bytes)`);
}

main();
