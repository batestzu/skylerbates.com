import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Need Talent?",
  description:
    "Live music and entertainment for your event, booked through VibeWithUS Entertainment.",
};

export default function NeedTalentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
