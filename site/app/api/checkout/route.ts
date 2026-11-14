import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/shopify";
import { PACKS } from "@/lib/products";

export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_CHECKOUT_LIVE !== "true") {
    return NextResponse.json({ error: "Checkout opens at launch." }, { status: 503 });
  }
  try {
    const body = (await req.json()) as { lines?: { id: string; qty: number }[] };
    const valid = new Set(PACKS.map((p) => p.id as string));
    const lines = (body.lines || []).filter((l) => valid.has(l.id) && l.qty > 0);
    if (!lines.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    const url = await createCheckout(lines);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
