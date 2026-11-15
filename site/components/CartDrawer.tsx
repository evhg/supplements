"use client";
// The bag. Only reachable once checkout is live; before launch every buy button opens the waiting list instead.
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { baht } from "@/lib/products";
import Still from "./Still";

export default function CartDrawer() {
  const { lines, total, open, setOpen, setQty, checkout, busy, error, count } = useCart();
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [setOpen]);
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-label="Your bag"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            data-lenis-prevent
          >
            <header>
              <h2>Your bag</h2>
              <button className="x" onClick={() => setOpen(false)} aria-label="Close bag">
                ×
              </button>
            </header>
            {!lines.length && <p className="drawer-empty">Nothing in here yet. Mornings start with Rise & Brine.</p>}
            <motion.ul layout className="drawer-lines">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.li key={l.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, height: 0 }}>
                    <span className="drawer-thumb" style={{ background: l.pack.color }}>
                      <Still base={l.pack.image} fallback="/img/trio-1200.webp" alt="" />
                    </span>
                    <div>
                      <b>{l.pack.title}</b>
                      <small>{l.pack.sticks} sticks</small>
                      <div className="qty">
                        <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="One fewer">−</button>
                        <motion.span key={l.qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                          {l.qty}
                        </motion.span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="One more">+</button>
                      </div>
                    </div>
                    <span className="line-price">{baht(l.qty * l.pack.price)}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            <footer>
              <p className="drawer-total">
                <span>Total</span>
                <b>{baht(total)}</b>
              </p>
              <button className="btn btn-red btn-full" disabled={!count || busy} onClick={() => checkout()}>
                {busy ? "Opening checkout…" : "Checkout"}
              </button>
              {error && <p className="notify-error">{error}</p>}
              <p className="drawer-note">Secure checkout. Prices in Thai baht, VAT included.</p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
