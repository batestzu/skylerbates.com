import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Pay what you can for Skyler Bates music. Set your price — $0 is always welcome.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
