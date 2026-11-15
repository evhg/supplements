"use client";
import { CartProvider } from "@/lib/cart";
import { NotifyProvider } from "@/lib/notify";
import { CHECKOUT_LIVE, PREVIEW } from "@/lib/products";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Intro from "./Intro";
import BuyBar from "./BuyBar";
import CartDrawer from "./CartDrawer";
import NotifySheet from "./NotifySheet";
import Hero from "./sections/Hero";
import Heat from "./sections/Heat";
import Ritual from "./sections/Ritual";
import Inside from "./sections/Inside";
import RealFood from "./sections/RealFood";
import Pour from "./sections/Pour";
import ForYou from "./sections/ForYou";
import Climax from "./sections/Climax";
import Packs from "./sections/Packs";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";

export default function Experience({ logoSvg }: { logoSvg: string }) {
  return (
    <CartProvider>
      <NotifyProvider>
        <SmoothScroll />
        <Intro logoSvg={logoSvg} />
        {PREVIEW && (
          <p className="ribbon" role="note">
            Preview. Formula and prices to be confirmed. Not yet on sale.
          </p>
        )}
        <Nav />
        <main className={PREVIEW ? "has-ribbon" : undefined}>
          <Hero />
          <Heat />
          <Ritual />
          <Inside />
          <RealFood />
          <Pour />
          <ForYou />
          <Climax />
          <Packs />
          <Faq />
        </main>
        <Footer />
        <BuyBar />
        {CHECKOUT_LIVE && <CartDrawer />}
        <NotifySheet />
        <div id="jump-cover" aria-hidden />
      </NotifyProvider>
    </CartProvider>
  );
}
