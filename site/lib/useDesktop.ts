"use client";
import { useEffect, useState } from "react";

/** True on wide screens with motion allowed: the layouts that get pinned, scrubbed set pieces. */
export const CINEMA = "(min-width: 761px) and (prefers-reduced-motion: no-preference)";

export function useCinema() {
  const [on, setOn] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(CINEMA);
    const f = () => setOn(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return on;
}
