# The Daily Ritual landing page: motion, renders and transitions

A handover for reusing the animation system on another landing page (Ayu).

- **Live reference:** https://dailyritual.cathnivore.com
- **Code:** `site/` in the `evhg/supplements` repository (Next.js). Paths below are relative to `site/`.
- **Renders:** `render/` in the same repository (Blender, driven by Python).

The essential code is quoted here, so the document works without repository access. Everything product-specific
(sticks, colours, copy) is called out, so you know what to swap.

---

## 1. The idea in one paragraph

The page is a short film you scroll through. The product shots are **pre-rendered in Blender as image sequences** and
played on a `<canvas>`, either once, on a loop, or scrubbed by the scroll position. Around them, **GSAP ScrollTrigger**
pins a few chapters and steps text in and out in fixed beats. Two small **Three.js** scenes add things that have to be
live (a fan of 3D packs, a field of bubbles). Phones and reduced-motion visitors get the same content as plain stacked
sections with one-time reveals: nothing is pinned there.

## 2. Stack

| Job | Library | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router), React | 16.4 / 19.3 | Any React setup works; nothing depends on Next. |
| Scroll animation | GSAP + ScrollTrigger, SplitText, DrawSVG, CustomEase | 3.15 | All GSAP plugins are free since 3.13. |
| React binding | `@gsap/react` (`useGSAP`) | 2.1 | Scopes selectors to a component and cleans up. |
| Smooth wheel | Lenis | 1.3 | Wheel only; touch scrolling stays native. |
| Micro-interactions | Motion (`motion/react`) | 14 | Button press, sliding pill, sticky bar. |
| Live 3D | three + `@react-three/fiber` | 0.187 / 9.8 | Two canvases, mounted only near the viewport. |
| Renders | Blender 4.2, Cycles | | Run as a Python module (`bpy`). |
| Encoding | sharp (libvips) | 0.35 | PNG frames to WebP. |

Setup lives in one file, `lib/gsap.ts`:

```ts
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, CustomEase, useGSAP);
CustomEase.create("ritual", "0.22, 1, 0.36, 1");        // the house ease
ScrollTrigger.config({ ignoreMobileResize: true });      // the address bar hiding must not re-measure pins
```

## 3. The rules that make it feel finished

These matter more than any single effect. Copy them first.

1. **One ease, few durations.** Entrances use `cubic-bezier(0.22, 1, 0.36, 1)` (fast start, long soft landing), 0.6 to
   0.9 s, staggered 0.025 to 0.09 s. Exits are shorter (0.2 s, `power2.in`). Scrubbed motion uses `ease: "none"`
   so it tracks the finger exactly.
2. **Text is never scrubbed.** Headlines land once, whole, when their section arrives. Only pictures follow the scroll.
   Scrubbed text reads as broken when someone stops halfway.
3. **Pinned chapters move in beats: travel, then hold.** Each beat arrives, sits dead still for a stretch of scroll,
   then hands over. One element leaves before the next arrives, so two lines never share the same spot.
4. **Scrub lag is small and consistent:** `scrub: 0.25` to `0.3` everywhere. Lenis adds the only other smoothing.
5. **Every section owns its background and its text colour.** No page-wide colour tween: it breaks the moment someone
   jumps with the menu.
6. **Two layouts, chosen by one media query.** "Cinema" (pinned, scrubbed) only for
   `(min-width: 761px) and (prefers-reduced-motion: no-preference)`. Everyone else gets stacked sections.
7. **Nothing heavy runs off screen.** WebGL canvases mount only near the viewport; image sequences start loading only
   when their section is about one and a half screens away.
8. **Every effect has a still fallback** (poster image, final frame, or plain block), so the page is complete without
   JavaScript, without WebGL and before the frames arrive.

## 4. Catalogue: what's on the page

| # | Effect | Where | Technique | File |
|---|---|---|---|---|
| 1 | Opening curtain: logo draws itself, curtain lifts | Page load | DrawSVG + `clip-path` | `components/Intro.tsx` |
| 2 | Four packs dealt into a row | Hero | Blender sequence, played once | `sections/Hero.tsx` |
| 3 | Pinned four-beat statement with rising sun and shimmer | "Why" chapter | ScrollTrigger pin + timeline, WebGL points | `sections/Heat.tsx` |
| 4 | Sideways journey that parks on each product, with a clock and sun arc | Product chapter | Pinned horizontal track, travel/hold timeline | `sections/Ritual.tsx` |
| 5 | Product gently turning in place | Each product panel | Blender sequence, looped | `components/SequenceCanvas.tsx` |
| 6 | Ring draws, six items pop in, counter runs to 6 | "What's inside" | DrawSVG, `back.out`, snapped tween | `sections/Inside.tsx` |
| 7 | Endless ingredient ticker, alternate words outlined | "Real food" | CSS keyframes only | `globals.css` (`.mq-inner`) |
| 8 | Pour: powder into a glass under your scroll, steps light up in time | "How to" | Blender sequence, scrubbed, pinned | `sections/Pour.tsx` |
| 9 | Headline letters rise from a mask | Closing chapter | SplitText with `mask` | `sections/Climax.tsx` |
| 10 | Four 3D packs dealt up into a fan that follows the pointer | Closing chapter | Three.js, progress from ScrollTrigger | `components/StickStage.tsx` |
| 11 | Bubbles rising, stronger mid-scroll | Closing chapter | Three.js points + small shader | `components/Particles.tsx` |
| 12 | Menu jump under a quick cover | Navigation | Fade a full-screen cover, jump, fade out | `components/SmoothScroll.tsx` |
| 13 | Button press, sliding selector pill, sticky buy bar | Throughout | Motion springs | `sections/Packs.tsx`, `components/BuyBar.tsx` |
| 14 | Blocks fade up once as they enter | Phones, long copy | Class toggle + CSS transition | `globals.css` (`.r-reveal`) |

## 5. Recipes

### 5.1 The image-sequence player (the core piece)

`components/SequenceCanvas.tsx`, about 190 lines, no dependencies. It draws frames from
`/seq/<shot>/{d,m}/0001.webp…` onto a canvas.

```tsx
<SequenceCanvas shot="arrive" mode="once"  eager poster="/img/hero-poster.webp" alt="…" />   // parent calls play()
<SequenceCanvas shot="float-x" mode="loop" fallback="/img/x.webp" alt="…" />                 // 24 fps while visible
<SequenceCanvas shot="pour"   mode="scrub" fit="cover" focusX={0.42} ref={seq} alt="…" />    // parent calls setProgress(0..1)
```

What it does, and why each part is there:

- **Reads `/seq/manifest.json`** for the frame count and aspect of each shot, so the page code never hard-codes them.
- **Picks a size once:** `d` (desktop) if the box is wider than 1100 device pixels, else `m` (mobile).
- **Loads only when near** (IntersectionObserver, margin 150% of the viewport), unless `eager`.
- **Loads coarse to fine:** the resting frame first, then every 8th, 4th, 2nd, then the rest. A scrub works within a
  second on a slow connection and sharpens as frames arrive. `draw()` falls back to the nearest loaded frame.
- **Sizes the canvas to its box** at up to 2x device pixels (ResizeObserver), with `contain` or `cover` fit and a
  horizontal focal point (`focusX`) for cover.
- **Shows a poster** until the first frame is drawn, and a fallback image if the shot is missing from the manifest.
- **Loop mode pauses off screen** (a second IntersectionObserver).
- **`play(seconds)`** runs once with a cubic ease-out and rests on the last frame.

Driving it from scroll (the pour):

```ts
gsap.fromTo(".pour-fill", { scaleX: 0 }, {
  scaleX: 1, ease: "none",
  scrollTrigger: {
    trigger: section, start: "top top", end: "+=150%", pin: true, scrub: 0.25,
    onUpdate: (st) => {
      const p = Math.min(1, st.progress / 0.9);            // finish at 90%, hold the last frame for the rest
      seq.current?.setProgress(p);
      const i = p < 0.2 ? 0 : p < 0.72 ? 1 : 2;            // which step is lit: thresholds read off the footage
      steps.forEach((s, k) => s.classList.toggle("on", k === i));
    },
  },
});
```

### 5.2 Opening curtain

A fixed full-screen panel in the page's background colour. The logo SVG is inlined so its paths can be drawn.

```ts
const tl = gsap.timeline({ defaults: { ease: "ritual" } });
tl.set(paths, { fillOpacity: 0 })
  .fromTo(paths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.8, stagger: 0.01 })   // outline draws
  .to(paths, { fillOpacity: 1, strokeOpacity: 0, duration: 0.35 }, "-=0.3")              // fills in
  .from(".intro-tag span", { yPercent: 110, duration: 0.6, stagger: 0.05 }, 0.35)        // name rises word by word
  .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power3.inOut" }, 1.1)   // curtain lifts
  .add(introDone, 1.2);                                                                  // hero starts under it
```

Details worth keeping:

- **Once per session** (`sessionStorage`); return visits get a 0.3 s fade.
- **Any wheel, touch or key speeds it up** (`tl.timeScale(4)`): nobody is made to wait.
- **CSS fallback:** `animation: intro-lift 0.8s 3s both` lifts the curtain if JavaScript never arrives. The script
  cancels that animation when it takes over, and skips the intro entirely if the page woke up later than 3.4 s.
- **`introDone()`** adds a class to `<html>` and fires an `intro-done` event. The hero listens for it, then steps its
  copy in (0.9 s, 0.09 s stagger) and plays the "arrive" sequence over 1.6 s.
- **Gotcha:** resolve the hero's elements before the curtain runs. A selector string used inside the curtain's
  timeline callback is scoped to the curtain and finds nothing.

### 5.3 Pinned beats (the "why" chapter)

One pinned screen, four lines that take turns, a number that counts up, a sun that climbs the whole time.

```ts
const tl = gsap.timeline({
  defaults: { ease: "power2.out" },
  scrollTrigger: { trigger: el, start: "top top", end: "+=230%", pin: true, scrub: 0.3 },
});
const cross = (i, at) =>
  tl.to(beats[i],     { autoAlpha: 0, y: -40, duration: 0.2, ease: "power2.in" }, at)        // old one leaves…
    .to(beats[i + 1], { autoAlpha: 1, y: 0,   duration: 0.3 }, at + 0.2);                    // …then the new one arrives
cross(0, 1.0); cross(1, 2.3); cross(2, 3.8);                                                  // ~1 unit of hold each
tl.to(n, { v: 34, duration: 0.5, onUpdate: () => count(n.v) }, 2.42);                         // number counts as it appears
tl.fromTo(".heat-sun", { yPercent: 38, scale: 0.8 }, { yPercent: 0, scale: 1, duration: 5.4, ease: "none" }, 0);
tl.to({}, { duration: 0.9 }, 4.6);                                                            // final hold before unpinning
```

The timeline's time units are arbitrary: they are stretched over 230% of a screen height of scroll. Roughly one unit
of stillness per beat is what makes it readable.

### 5.4 Sideways journey that parks (the product chapter)

A pinned section containing a flex row: an intro panel, then one full-width panel per product. Scroll moves the row
left, but in steps: it travels to a product, then **holds still** while you read.

```ts
const REST = 0.25, TRAVEL = 0.7, HOLD = 0.5, TAIL = 0.15;          // in screen heights of scroll
const TOTAL = REST + items.length * (TRAVEL + HOLD) + TAIL;
const stop = (i) => -(intro.offsetWidth + i * window.innerWidth);

const tl = gsap.timeline({
  onUpdate: onMove,
  scrollTrigger: { trigger: el, start: "top top", end: () => "+=" + innerHeight * TOTAL,
                   pin: true, scrub: 0.25, invalidateOnRefresh: true },
});
tl.to({}, { duration: REST });
items.forEach((_, i) => tl.to(track, { x: () => stop(i), duration: TRAVEL, ease: "power2.inOut" })
                          .to({}, { duration: HOLD }));
tl.to({}, { duration: TAIL });
```

`onMove` reads the track's position and derives everything else from it, so nothing can drift out of step:

- **A clock** interpolates between each product's time and writes the digits.
- **A sun** rides an SVG arc: `arc.getPointAtLength(len * fraction)`.
- **A panel's copy reveals once** when the track is 45% of the way to it (adds class `seen`; CSS staggers the children
  by 0.04 s each).

Also in this file: a `fit()` pass that scales a panel's copy block down (`transform: scale`, origin top left) when a
short laptop screen can't fit it, re-run on ScrollTrigger's `refreshInit`.

### 5.5 Count-up and drawn ring

```ts
gsap.timeline({ scrollTrigger: { trigger: ".six-ring", start: "top 72%", once: true } })
  .fromTo(".six-ring circle", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.0, ease: "power2.inOut" }, 0)
  .from(".six-el", { scale: 0, opacity: 0, stagger: 0.09, duration: 0.5, ease: "back.out(1.8)" }, 0.1)
  .to(n, { v: 6, duration: 0.9, snap: { v: 1 }, onUpdate: () => (el.textContent = String(n.v)) }, 0.1);
```

Played once (`once: true`), never scrubbed. The items sit on the ring with CSS: `rotate(var(--a))`, translate out,
rotate back.

### 5.6 Masked headline

```ts
const split = SplitText.create(".climax-title", { type: "chars", mask: "chars" });
gsap.from(split.chars, { yPercent: 115, duration: 0.8, stagger: 0.025, ease: "ritual",
                         scrollTrigger: { trigger: section, start: "top 62%", once: true } });
```

`mask: "chars"` wraps each letter in a clipping box, so letters rise from behind an invisible edge. Used once on the
page, for the closing headline. More than once and it stops being special.

### 5.7 Live 3D fan

`components/StickStage.tsx`: four thin boxes with the label artwork as a texture, in a react-three-fiber canvas.

- **Unlit materials** (`MeshBasicMaterial`, canvas `flat`): the colours match the Blender renders and the artwork
  exactly, and no lighting is computed.
- **One number drives it.** A `progress` ref (0 to 1) is tweened by ScrollTrigger; `useFrame` reads it. Each pack has
  a delayed slice of it (`(raw - (3 - i) * 0.07) / 0.72`), a cubic ease-out, and a small sine overshoot as it lands.
- **Alive at rest:** a slow bob (`sin(t * 0.9 + i) * 0.03`) and a tilt toward the pointer.
- **Camera fits any shape:** `camera.position.z = max(5.4, 3.7 / (2 * tan(fov/2) * aspect))`.
- **Phones don't get it.** They get a rendered still that scales and straightens slightly as it scrolls in. A live 3D
  stage is the part most likely to misbehave in mobile Safari and in-app browsers.

### 5.8 Bubble field

`components/Particles.tsx`: 900 points (420 on phones) with a vertex shader that wraps them upward forever and sways
them sideways, and a fragment shader that draws either a soft dot ("heat" shimmer) or a ring ("fizz" bubble). A
`level` ref (0 to 1) sets speed and opacity; in the closing chapter it follows `sin(progress * π)`, so the fizz
peaks mid-scroll and settles. `dpr` is capped at 1.5, antialiasing is off, `powerPreference: "low-power"`.

### 5.9 Menu jumps

Smooth-scrolling across pinned chapters drags the visitor through the whole film. `scrollToId()` glides for short hops
(1.1 s, cubic in-out) and for anything further than 2.5 screens fades a full-screen cover in (0.2 s), jumps instantly,
and fades it out (0.35 s).

### 5.10 Small things

- **Buttons:** `whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}` (Motion).
- **Selector pill:** one `motion.span` with `layoutId`, spring `stiffness: 500, damping: 35`, slides between options.
- **Sticky buy bar:** springs up from the bottom (`stiffness: 380, damping: 34`) and hides itself when the real buy
  section is on screen.
- **Ticker:** the list is rendered twice inside an inline-flex row and animated `translateX(-50%)` over 48 s, linear.
- **Reveal once:** `.r-reveal { opacity: 0; transform: translateY(22px); transition: opacity .6s, transform .7s }`,
  switched on by adding `seen` to the parent from a `ScrollTrigger.create({ start: "top 80%", once: true })`.

### 5.11 Lenis

```ts
const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
document.fonts.ready.then(() => ScrollTrigger.refresh());   // pins measured after the display font has loaded
```

Skipped entirely for reduced motion.

## 6. The renders

### 6.1 What was rendered

| Shot | Used for | Frames | Frame shape | Transparent | Web size (desktop / phone) |
|---|---|---|---|---|---|
| `arrive` | Hero: four packs dealt into a row | 72 | square | yes | 2048 px, 11.9 MB / 1000 px, 5.0 MB |
| `float-<product>` (x4) | Product turning in place, loops | 48 | portrait 1:2 | yes | 1100 px wide, 3.1 MB / 520 px, 1.3 MB |
| `pour` | Powder into a glass, scrubbed | 120 | square | no | 1800 px, 6.4 MB / 1000 px, 2.5 MB |
| Stills | Shop cards, phone layouts | 1 each | various | yes, with soft shadow | 1200 px and 2400 px WebP |

### 6.2 How the scenes are built

Everything is a Python script (`render/cinema.py`, with the product model in `render/sticks.py`), so a shot is
repeatable and a change is a one-line edit.

- **Motion is written as a function of the frame number**, not keyframed by hand:

  ```py
  def update(f):
      t = (f - 1) / 71
      for i, ob in enumerate(sticks):
          k = ease((t - (3 - i) * 0.05) / 0.80)     # smootherstep, each pack starts 5% later than the last
          ob.location = (end_x[i] * (0.34 + 0.66 * k), …)
  ```

- **Loops close exactly:** every moving value is `sin(2π · frame / 48)`, so frame 48 flows into frame 1.
- **Transparent film** (`film_transparent`, RGBA PNG) for anything that sits on a coloured section. The page supplies
  the background, so one render works on every colour.
- **Stills use a shadow-catcher floor:** transparent image, real soft shadow.
- **Portrait frames for portrait subjects.** The single-product loop is rendered at half width, so the product fills
  about 85% of the frame and stays sharp on a 5K screen.
- **The pour is the one opaque shot** (glass and liquid need a backdrop to refract): a cyclorama in the section's
  background colour, so the frame edge is invisible on the page.
- **Never show what isn't finished.** The hero only ever shows pack fronts, because the back label was placeholder.
- **Suggested quality** (Cycles, GPU): 128 samples for the loops, 160 for the hero, 256 for glass and liquid, at
  2048 px (1400 px for the portrait loops).

### 6.3 Encoding

`render/encode_seq.mjs` turns `render/seq/<shot>/0001.png…` into two WebP sets and writes the manifest:

```js
sharp(png).resize({ width, kernel: "lanczos3" })
  .webp({ quality: key === "d" ? 82 : 78, alphaQuality: 90, effort: 5, smartSubsample: true })
```

```json
{ "arrive": { "frames": 72, "aspect": 1, "alpha": true, "sizes": { "d": 2048, "m": 1000 } } }
```

Individual WebP frames, not a video, because a video can't be scrubbed smoothly backwards, can't be transparent in
Safari without a second encode, and can't load coarse-to-fine.

### 6.4 Gotchas we hit

- **Blender 4.2: smooth-shaded lathe glass rendered black.** Fix: `me.shade_smooth()` then
  `me.set_sharp_from_angle(angle=math.radians(30))`.
- **Particle simulations need every frame stepped in order,** even when rendering a few test frames. The render loop
  walks from frame 1 and only writes the wanted ones.
- **Test cheaply first:** 4 samples at 320 px for three frames checks the motion in seconds before a full run.

## 7. Phones and reduced motion

- **One switch:** `CINEMA = "(min-width: 761px) and (prefers-reduced-motion: no-preference)"`, used through
  `gsap.matchMedia()` so pins are created and destroyed cleanly when the screen changes.
- **Phones get:** stacked full-colour cards, a still in place of each loop, a still in place of the 3D fan, one-time
  reveals. The hero deal and the pour still play, since they are light.
- **Never position by viewport-height arithmetic on phones.** The browser bars change the height as you scroll.
  Use `svh`, and `ScrollTrigger.config({ ignoreMobileResize: true })`.
- **Reduced motion gets:** no curtain, no Lenis, no pins, counters showing their final value, sequences on their last
  frame.
- **Without JavaScript,** a `<noscript>` style forces every hidden-until-revealed element visible.

## 8. Things that only showed up in real Safari

Test in a WebKit browser, not only Chrome. Chrome's phone emulation missed all of these.

- **A page wider than the screen.** An image inside a `display: grid; place-items: center` box made Safari size the
  whole card from the image's file width. Fix: position images absolutely inside a fixed-ratio box, write grid tracks
  as `minmax(0, 1fr)` instead of `1fr`, and put `overflow-x: clip` on both `html` and `body`.
- **Form fields** need `appearance: none` and a font size of 16 px or more, or Safari restyles them and zooms on focus.
- **Hairline outlined text** (`-webkit-text-stroke`) turns muddy at small sizes: use solid text on phones.
- **Blend modes inside a transformed parent** don't blend. Use transparent images instead of `mix-blend-mode`.

## 9. Budgets

- **First screen:** the hero sequence is the only eager download (5 MB on phones, 12 MB on desktop), behind a poster
  that shows at once. Everything else waits until it's near.
- **Canvas resolution:** capped at 2x device pixels for sequences, 1.5x for particles.
- **WebGL contexts:** at most two alive at a time, because they are unmounted when far from the viewport.
- **Fonts:** two families, `display: swap`, and `ScrollTrigger.refresh()` after `document.fonts.ready`.

## 10. Reusing this for Ayu

**Take as they are** (no product knowledge inside):

- `lib/gsap.ts`, `lib/useDesktop.ts`
- `components/SequenceCanvas.tsx`, `components/Near.tsx`, `components/SmoothScroll.tsx`, `components/Particles.tsx`
- `render/encode_seq.mjs` (edit the `SIZES` table for your shot names)
- The CSS for `.seq`, `.intro`, `#jump-cover`, `.r-reveal`

**Take the pattern, replace the content:**

- `Intro.tsx`: swap the inlined logo SVG and the three words.
- `Heat.tsx`: any chapter of three or four short lines. Change the lines, the number and the background.
- `Ritual.tsx`: any set of items shown one at a time. The clock and sun are optional; delete `onMove`'s clock part if
  the items aren't times of day.
- `Pour.tsx`: any "how it works" sequence. Re-read the step thresholds off your own footage.
- `StickStage.tsx`: change the box proportions (`W`, `H`, `D`) and the texture paths. For a product that isn't a flat
  pack, load a model instead of a box, or use a rendered sequence.
- `render/cinema.py`: keep `setup`, `render_seq`, `ease` and the shot structure; replace the product model.

**To swap for the brand:**

- Colour and type tokens at the top of `globals.css` (`--cream`, `--ink`, `--red`, the four product colours,
  `--display`, `--body`).
- The ease, if Ayu wants a different feel. `0.22, 1, 0.36, 1` is calm and confident. For something softer and slower,
  lengthen durations before changing the curve.
- Bubble colours and mode in `Particles` (`heat` is a slow soft shimmer, `fizz` is rising rings).

**Order to build in:**

1. Tokens, fonts, section backgrounds, and the stacked phone layout with real copy. It must read well with no motion.
2. `SequenceCanvas` with one test sequence (low samples) to prove the pipeline end to end.
3. The hero entrance and the curtain.
4. One pinned chapter. Get the travel-and-hold timing right before adding a second.
5. Final renders, then the 3D and particle extras last. They are the most expensive and the least essential.
6. Check at a 5K desktop, a 1280 x 720 laptop, a large phone and a small phone, with reduced motion on, and in Safari.
