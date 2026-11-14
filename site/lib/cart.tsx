"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PACKS, type Pack } from "./products";

type Line = { id: Pack["id"]; qty: number };
type Cart = {
  lines: (Line & { pack: Pack })[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (id: Pack["id"], qty?: number) => void;
  setQty: (id: Pack["id"], qty: number) => void;
  checkout: () => Promise<string | null>;
  error: string | null;
  busy: boolean;
};

const Ctx = createContext<Cart | null>(null);
const KEY = "ritual-bag-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setRaw(JSON.parse(s));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {}
  }, [raw]);

  const add = useCallback((id: Pack["id"], qty = 1) => {
    setError(null);
    setRaw((r) => {
      const i = r.findIndex((l) => l.id === id);
      if (i < 0) return [...r, { id, qty }];
      const n = [...r];
      n[i] = { id, qty: Math.min(20, n[i].qty + qty) };
      return n;
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id: Pack["id"], qty: number) => {
    setRaw((r) => (qty <= 0 ? r.filter((l) => l.id !== id) : r.map((l) => (l.id === id ? { ...l, qty: Math.min(20, qty) } : l))));
  }, []);

  const lines = useMemo(
    () => raw.map((l) => ({ ...l, pack: PACKS.find((p) => p.id === l.id)! })).filter((l) => l.pack),
    [raw],
  );
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.pack.price, 0);

  const checkout = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: raw }),
      });
      const j = await res.json();
      if (!res.ok || !j.url) throw new Error(j.error || "Checkout failed");
      window.location.href = j.url;
      return j.url as string;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setBusy(false);
    }
  }, [raw]);

  return (
    <Ctx.Provider value={{ lines, count, total, open, setOpen, add, setQty, checkout, error, busy }}>{children}</Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
