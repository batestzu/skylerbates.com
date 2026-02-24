import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shows",
  description: "Upcoming live shows and tour dates for Skyler Bates.",
};

export default function ShowsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
