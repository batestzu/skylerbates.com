import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opportunities | Skyler Bates",
  description: "Opportunities to collaborate and perform with Skyler Bates.",
};

export default function OpportunitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
