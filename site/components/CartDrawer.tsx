"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { baht, CHECKOUT_LIVE } from "@/lib/products";

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
          <motion.div className="drawer-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
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
              <h2>Your ritual</h2>
              <button className="x" onClick={() => setOpen(false)} aria-label="Close bag">
                ×
              </button>
            </header>
            {!lines.length && <p className="drawer-empty">Your bag is empty. The day starts at 07:00.</p>}
            <motion.ul layout className="drawer-lines">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.li key={l.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, height: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.pack.image} alt="" />
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
                <motion.b key={total} initial={{ scale: 1.15 }} animate={{ scale: 1 }}>
                  {baht(total)}
                </motion.b>
              </p>
              {CHECKOUT_LIVE ? (
                <button className="btn btn-big btn-full" disabled={!count || busy} onClick={() => checkout()}>
                  {busy ? "Opening checkout…" : "Checkout"}
                </button>
              ) : (
                <button className="btn btn-big btn-full btn-soon" disabled aria-disabled>
                  Checkout opens at launch
                </button>
              )}
              {error && <p className="drawer-error">{error}</p>}
              <p className="drawer-note">Secure checkout by Shopify. Prices in Thai baht, VAT included.</p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
