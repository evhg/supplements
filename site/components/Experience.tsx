"use client";
import dynamic from "next/dynamic";
import { CartProvider } from "@/lib/cart";
import SmoothScroll from "./SmoothScroll";
import Chapters from "./Chapters";
import Nav from "./Nav";
import Intro from "./Intro";
import CartDrawer from "./CartDrawer";
import Hero from "./sections/Hero";
import Fog from "./sections/Fog";
import Ritual from "./sections/Ritual";
import Six from "./sections/Six";
import RealFood from "./sections/RealFood";
import Pour from "./sections/Pour";
import ForYou from "./sections/ForYou";
import Climax from "./sections/Climax";
import Footer from "./sections/Footer";

const Particles = dynamic(() => import("./Particles"), { ssr: false });

export default function Experience({ logoSvg }: { logoSvg: string }) {
  return (
    <CartProvider>
      <SmoothScroll />
      <Chapters />
      <Particles />
      <Intro logoSvg={logoSvg} />
      <Nav />
      <main>
        <Hero />
        <Fog />
        <Ritual />
        <Six />
        <RealFood />
        <Pour />
        <ForYou />
        <Climax />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
