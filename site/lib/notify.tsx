"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { PackId } from "./products";

type Notify = { open: boolean; pack: PackId | "any"; ask: (pack?: PackId) => void; close: () => void; setPack: (p: PackId | "any") => void };
const Ctx = createContext<Notify | null>(null);

export function NotifyProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pack, setPack] = useState<PackId | "any">("any");
  const ask = useCallback((p?: PackId) => {
    if (p) setPack(p);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  return <Ctx.Provider value={{ open, pack, ask, close, setPack }}>{children}</Ctx.Provider>;
}

export function useNotify() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useNotify outside NotifyProvider");
  return c;
}
