# The Daily Ritual: landing page

Next.js 16 (App Router) on Vercel, headless Shopify checkout (built, switched off until launch).

```bash
cd site && npm install && npm run dev
```

## The story (scroll order)

| # | Chapter | Effect |
|---|---|---|
| 0 | Intro curtain | PR logo strokes draw themselves (GSAP DrawSVG), fill, curtain lifts |
| 1 | Hero: The Daily Ritual | pinned; Blender **assemble** sequence scrubbed on a canvas: four sticks spin from a stack into a row |
| 2 | The fog (problem) | dark, pinned; lines surface out of blurred haze, 2% counter, WebGL field greys and slows, sunrise glow |
| 3 | The day (4 sticks) | pinned **horizontal** scroll 07:00 → 20:00; sun rides an SVG arc (MotionPath), clock runs, page colour follows the panels; Blender **float** loops |
| 4 | Six, not three | ring draws, six electrolytes snap on, counter to 6 |
| 5 | Real food | two ingredient marquees (CSS keyframes), skewed by scroll velocity; the zeros |
| 6 | Just add water | pinned; Blender **pour** sequence scrubbed, steps light up |
| 7 | For you | GLP-1, parents & kids, lifters, sleepers: Motion spring-tilt cards, GSAP batch entrance |
| 8 | Climax | colour sweep through the whole day, particle field fizzes, **real-time Three.js sticks** (label art) fly into a fan; packs, bag, checkout |

## Libraries

- GSAP 3.15 + ScrollTrigger, SplitText, DrawSVG, MotionPath, CustomEase (`lib/gsap.ts`)
- Motion 14 (springs, layout, AnimatePresence): nav, cards, magnetic buttons, segmented control, bag drawer
- Three.js 0.187 via @react-three/fiber 9: particle field shader (`components/Particles.tsx`), 3D sticks (`components/StickStage.tsx`)
- Lenis smooth scroll, synced to ScrollTrigger
- CSS keyframes / SVG: marquee, scroll cue, sun arc, striped "coming soon" button

## Blender sequences

Rendered on Erik's Mac (`render/cinema.py`), encoded by `render/encode_seq.mjs` into `public/seq/<shot>/{d,m}/####.webp`
plus `public/seq/manifest.json`. `components/SequenceCanvas.tsx` reads the manifest, picks desktop/mobile frames, loads coarse-to-fine,
and falls back to a still until a shot exists.

## Checkout

`NEXT_PUBLIC_CHECKOUT_LIVE=false` (default) shows "Checkout opens at launch". To go live: create the products in Shopify, fill the
variant GIDs and Storefront token from `.env.example`, set the flag to `true`. `/api/checkout` builds a Storefront cart and redirects
to Shopify's `checkoutUrl`.

Prices in `lib/products.ts` are **placeholders** until pricing is signed off.
