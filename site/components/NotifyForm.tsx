"use client";
// The launch waiting-list form. Used inline under the packs and inside the sheet any buy button opens.
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PACKS, STICKS } from "@/lib/products";
import { useNotify } from "@/lib/notify";

const CHOICES = [
  { id: "any", label: "Not sure yet" },
  { id: "sampler", label: "The Sampler" },
  { id: "weekly", label: "The Weekly Ritual" },
  ...STICKS.map((s) => ({ id: s.id, label: `${s.line}, box of 30` })),
] as const;

export default function NotifyForm({ id }: { id: string }) {
  const { pack, setPack } = useNotify();
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    setError(null);
    try {
      const res = await fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, pack, hp }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Something went wrong. Please try again.");
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "done" ? (
        <motion.p key="done" className="notify-done" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          You&apos;re on the list. We&apos;ll be in touch the day it lands.
        </motion.p>
      ) : (
        <motion.form key="form" className="notify-form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} noValidate>
          <label htmlFor={`${id}-pack`}>Which one are you after?</label>
          <select id={`${id}-pack`} value={PACKS.some((p) => p.id === pack) ? pack : "any"} onChange={(e) => setPack(e.target.value as never)}>
            {CHOICES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <label htmlFor={`${id}-email`}>Your email</label>
          <div className="notify-row">
            <input
              id={`${id}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={error ? `${id}-err` : undefined}
              aria-invalid={!!error}
            />
            <button className="btn btn-red" type="submit" disabled={state === "busy"}>
              {state === "busy" ? "Sending…" : "Tell me when it lands"}
            </button>
          </div>
          <input className="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden name="company" />
          {error && (
            <p className="notify-error" id={`${id}-err`} role="alert">
              {error}
            </p>
          )}
          <p className="notify-small">One email, on the day it lands. Nothing else.</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
