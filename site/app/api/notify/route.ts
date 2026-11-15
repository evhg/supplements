// Launch waiting list. While checkout is off, every buy button leads here, tagged with the pack the shopper wanted,
// so demand can be counted by pack before the first order is placed with the maker.
//
// Where sign-ups go: if NOTIFY_WEBHOOK_URL is set, each one is POSTed there as JSON (a Google Sheet web app, Zapier,
// Make, a Slack or LINE webhook all work). It is also always written to the function log as one line starting
// "[notify]", so nothing is lost before a destination is connected.
import { NextResponse } from "next/server";
import { PACKS } from "@/lib/products";

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

export async function POST(req: Request) {
  let body: { email?: string; pack?: string; hp?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  if (body.hp) return NextResponse.json({ ok: true });            // honeypot: bots fill the hidden field
  const email = String(body.email || "").trim().toLowerCase();
  if (!EMAIL.test(email)) return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  const pack = PACKS.some((p) => p.id === body.pack) ? body.pack : "any";
  const entry = { email, pack, at: new Date().toISOString(), source: "dailyritual-landing" };
  console.log("[notify]", JSON.stringify(entry));
  const hook = process.env.NOTIFY_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(entry) });
    } catch (e) {
      console.error("[notify] webhook failed", (e as Error).message);
    }
  }
  return NextResponse.json({ ok: true });
}
