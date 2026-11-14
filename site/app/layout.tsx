import type { Metadata, Viewport } from "next";
import { Anton, Outfit } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const outfit = Outfit({ weight: ["300", "400", "500", "700", "800"], subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "The Daily Ritual · Paleo Robbie",
  description:
    "Four electrolyte sticks for the four parts of your day. All 6 electrolytes, real food, zero sugar. Rise & Brine, Pump It Up, Glow Up, Snooze Control.",
  openGraph: { images: ["/img/trio-2400.webp"] },
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
      <body>{children}</body>
    </html>
  );
}
