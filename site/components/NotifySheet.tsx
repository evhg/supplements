"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNotify } from "@/lib/notify";
import NotifyForm from "./NotifyForm";

export default function NotifySheet() {
  const { open, close } = useNotify();
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", k);
      lenis?.start();
    };
  }, [open, close]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            data-lenis-prevent
          >
            <button className="x" onClick={close} aria-label="Close">
              ×
            </button>
            <h2 id="sheet-title">Not on sale just yet.</h2>
            <p className="sheet-lead">
              The first batch is on its way. Leave your email and we&apos;ll tell you the day it lands. It&apos;s coming to the Paleo
              Robbie grocery too, so a box can ride along with your next order.
            </p>
            <NotifyForm id="sheet" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
