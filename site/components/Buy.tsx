"use client";
// One buy control for the whole page. Checkout live: adds the pack to the bag.
// Before launch: opens the waiting list, tagged with the pack, so no button is a dead end.
import { motion } from "motion/react";
import { CHECKOUT_LIVE, type PackId } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useNotify } from "@/lib/notify";

export default function Buy({ pack, live, className = "btn btn-red" }: { pack: PackId; live: string; className?: string }) {
  const { add } = useCart();
  const { ask } = useNotify();
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 26 }}
      onClick={() => (CHECKOUT_LIVE ? add(pack) : ask(pack))}
    >
      {CHECKOUT_LIVE ? live : "Tell me when it lands"}
    </motion.button>
  );
}
