import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Skyler Bates",
  description: "Live events produced by Skyler Bates.",
  robots: { index: false, follow: false },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
