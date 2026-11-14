"use client";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { scrollToId } from "./SmoothScroll";

export default function Nav() {
  const { count, setOpen } = useCart();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
  });
  return (
    <motion.header
      className="nav"
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ type: "spring", stiffness: 380, damping: 40 }}
    >
      <a href="#top" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollToId("top"); }} aria-label="Paleo Robbie, back to top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Paleo Robbie" />
      </a>
      <nav className="nav-links" aria-label="Chapters">
        {[
          ["ritual", "The Ritual"],
          ["six", "Electrolytes"],
          ["food", "Real food"],
          ["you", "For you"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <motion.button
          className="btn btn-small"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => scrollToId("shop")}
        >
          Shop
        </motion.button>
        <motion.button className="bag" onClick={() => setOpen(true)} whileTap={{ scale: 0.9 }} aria-label={`Bag, ${count} items`}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
            <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                className="bag-count"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 18 }}
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  );
}
