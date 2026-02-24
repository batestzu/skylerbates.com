import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch live performances, studio sessions, and music videos from Skyler Bates.",
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
