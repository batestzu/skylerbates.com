import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking",
  description: "Book Skyler Bates for your venue, festival, or private event.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
