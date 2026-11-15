# The Daily Ritual: landing page

Next.js 16 (App Router) on Vercel, headless Shopify checkout (built, switched off until launch).

```bash
cd site && npm install && npm run dev
```

## The story (scroll order)

Rebuilt 2026-11-15 after a six-seat expert review (see `docs/LANDING_REVIEW.md` and `docs/review/`).

| # | Chapter | What happens |
|---|---|---|
| 0 | Curtain | Once per session: PR logo draws (GSAP DrawSVG), lifts in 1.9 s; any input skips; lifts without JS |
| 1 | Hero | Not pinned. "New from Paleo Robbie", "Bangkok is thirsty work.", Blender **arrive** sequence deals four pack fronts in |
| 2 | Heat (`#why`) | Desktop: pinned, four beats with holds, climbing sun, WebGL heat shimmer. Phone: plain blocks |
| 3 | The four (`#ritual`) | Desktop: pinned sideways day, parks on each stick, sun-and-clock instrument, portrait **float** loops. Phone: four stacked colour cards |
| 4 | What's inside (`#inside`) | Ring of six (draws once) + the label table with amounts |
| 5 | Real food (`#food`) | One marquee of real ingredients (CSS), the no-thanks list |
| 6 | Just add water (`#pour`) | Pinned briefly; Blender **pour** scrubbed, steps timed to the footage |
| 7 | Who it's for (`#you`) | Four full-width bands in the stick colours, each with a still and a button |
| 8 | The close | Not pinned: real-time Three.js sticks dealt into a fan, WebGL fizz |
| 9 | Packs (`#packs`) | Sampler first; waiting list while checkout is off |
| 10 | Questions (`#faq`) | Six plain answers |

Rules the build keeps: every section owns its background and text colour; one page edge (`--gutter`) and one type ramp
(`--t-small`, `--t-body`, `--t-lead`); phones and reduced motion get stacked layouts with nothing positioned by viewport
height; WebGL canvases mount only near the viewport; image sequences load only near the viewport.

## Libraries

- GSAP 3.15 + ScrollTrigger, SplitText, DrawSVG, CustomEase, matchMedia (`lib/gsap.ts`)
- Motion 14: nav, buttons, pack selector pill, waiting-list sheet, buy bar, bag
- Three.js 0.187 via @react-three/fiber 9: heat shimmer and fizz (`components/Particles.tsx`), 3D sticks (`components/StickStage.tsx`)
- Lenis smooth wheel scrolling, synced to ScrollTrigger
- CSS keyframes / SVG: marquee, curtain fallback, sun arc

## Blender sequences

Rendered on Erik's Mac (`render/cinema.py`), encoded by `render/encode_seq.mjs` into `public/seq/<shot>/{d,m}/####.webp`
plus `public/seq/manifest.json`. `components/SequenceCanvas.tsx` reads the manifest, picks desktop/mobile frames, loads coarse-to-fine,
and falls back to a still until a shot exists.

## Before launch: the waiting list

While `NEXT_PUBLIC_CHECKOUT_LIVE` is not `true`, every buy button opens the waiting-list sheet (`components/NotifySheet.tsx`),
tagged with the pack. `/api/notify` logs each sign-up as a `[notify]` line and, if `NOTIFY_WEBHOOK_URL` is set, POSTs it there
as JSON. A "Preview" ribbon shows unless `NEXT_PUBLIC_PREVIEW_RIBBON=false`.

## Checkout

`NEXT_PUBLIC_CHECKOUT_LIVE=false` (default) shows "Checkout opens at launch". To go live: create the products in Shopify, fill the
variant GIDs and Storefront token from `.env.example`, set the flag to `true`. `/api/checkout` builds a Storefront cart and redirects
to Shopify's `checkoutUrl`.

Prices in `lib/products.ts` are **indicative** until pricing is signed off. Copy, claims, the label table and the FAQ all live in that file.
