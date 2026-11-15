"use client";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useNotify } from "@/lib/notify";
import { CHECKOUT_LIVE } from "@/lib/products";
import { scrollToId } from "./SmoothScroll";

const LINKS = [
  ["ritual", "The four"],
  ["inside", "What's inside"],
  ["food", "Real food"],
  ["you", "Who it's for"],
  ["packs", "Packs"],
] as const;

export default function Nav() {
  const { count, setOpen } = useCart();
  const { ask } = useNotify();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500);
  });
  return (
    <motion.header
      className="nav"
      animate={{ y: hidden ? "-180%" : "0%", opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 40 }}
    >
      <a href="#top" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollToId("top", 0); }} aria-label="Paleo Robbie: The Daily Ritual, back to top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Paleo Robbie" />
      </a>
      <nav className="nav-links" aria-label="Sections">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        {CHECKOUT_LIVE ? (
          <>
            <button className="btn btn-red btn-small" onClick={() => scrollToId("packs")}>
              Shop
            </button>
            <motion.button className="bag" onClick={() => setOpen(true)} whileTap={{ scale: 0.9 }} aria-label={`Bag, ${count} items`}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span key={count} className="bag-count" initial={{ scale: 0.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 600, damping: 18 }}>
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </>
        ) : (
          <button className="btn btn-red btn-small" onClick={() => ask()}>
            Tell me when it lands
          </button>
        )}
      </div>
    </motion.header>
  );
}
