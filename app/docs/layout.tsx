import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor Documents — Skyler Bates",
  description: "Secure W-9 submission for contractors.",
  robots: { index: false, follow: false },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
