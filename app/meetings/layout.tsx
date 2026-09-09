import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meeting Request — Skyler Bates",
  description: "Request a sit-down meeting with Skyler Bates.",
  robots: { index: false, follow: false },
};

export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
