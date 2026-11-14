"use client";
// A button that leans toward the pointer on springs, with a press squish. Used for the big buys.
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Magnetic({
  children,
  className = "btn",
  onClick,
  disabled,
  strength = 0.35,
  ...rest
}: { children: React.ReactNode; className?: string; onClick?: () => void; disabled?: boolean; strength?: number } & Record<string, unknown>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.4 });
  return (
    <motion.button
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
