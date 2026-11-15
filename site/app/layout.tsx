import type { Metadata, Viewport } from "next";
import { Anton, Outfit } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const outfit = Outfit({ weight: ["300", "400", "500", "700", "800"], subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://dailyritual.cathnivore.com"),
  title: "The Daily Ritual: electrolyte drink mix | Paleo Robbie",
  description:
    "Four electrolyte drink sticks for a Bangkok day, from Paleo Robbie. All six electrolytes, real food first, no caffeine, no added sugar.",
  openGraph: {
    title: "Bangkok is thirsty work.",
    description: "Four electrolyte drinks for the four parts of your day, from Paleo Robbie. Real food first. No caffeine, no added sugar, no weird stuff.",
    images: ["/img/hero-poster.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F6EFE4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${outfit.variable}`}>
      <body>
        <noscript>
          <style>{`.r-reveal,.heat-beat,.hero-copy>*,.hero-chant{opacity:1!important;transform:none!important;visibility:visible!important}.nav{opacity:1!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
