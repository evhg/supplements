"use client";
// A buy bar that stays with the reader on phones and tablets (the top nav hides while scrolling down).
// Appears after the hero, steps aside while the packs or the footer are on screen.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { baht, pack } from "@/lib/products";
import { scrollToId } from "./SmoothScroll";

export default function BuyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let past = false;
    const blocking = new Set<Element>();
    const update = () => setShow(past && blocking.size === 0);
    const onScroll = () => {
      const p = window.scrollY > window.innerHeight * 0.7;
      if (p !== past) {
        past = p;
        update();
      }
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? blocking.add(e.target) : blocking.delete(e.target)));
      update();
    });
    ["packs", "faq", "foot"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="buybar" initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 34 }}>
          <p>
            <b>The Daily Ritual</b>
            <span>Sampler from {baht(pack("sampler").price)}</span>
          </p>
          <button className="btn btn-red" onClick={() => scrollToId("packs")}>
            Choose a pack
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
