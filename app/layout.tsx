import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://skylerbates.com"),
  title: {
    default: "Skyler Bates",
    template: "%s | Skyler Bates",
  },
  description: "Singer, songwriter, and collaborator. Music that moves between ache and beauty.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skylerbates.com",
    siteName: "Skyler Bates",
    title: "Skyler Bates",
    description: "Singer, songwriter, and collaborator. Music that moves between ache and beauty.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Skyler Bates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyler Bates",
    description: "Singer, songwriter, and collaborator. Music that moves between ache and beauty.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
