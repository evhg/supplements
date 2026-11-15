# Motion and interaction review: The Daily Ritual

Reviewer seat: motion and interaction designer. Sources: all 118 frames in this folder, `timing-desk.json`, `timing-mob.json`, and the code in `/home/user/supplements/site` (components, sections, `app/globals.css`). I also measured frame-to-frame change inside the two scrubbed image sequences in `public/seq`.

Limits of this review: I could not watch it move. Performance findings are computed from code and asset sizes, not measured on a device. The six desktop intro frames (`desk-00` to `desk-05`) are all the settled hero, so the desktop curtain was never captured; I judged the curtain from `mob-00`, `mob-01` and `Intro.tsx`.

## Verdict

The page has the right ingredients (a scrubbed product render, a day that changes colour, a real pour), but almost every pinned chapter is timed around its transitions instead of its content, so a paused screen is often empty, blurred, half-masked or cropped. Three things break outright rather than merely feel rough: the page-colour handoff erases text (including the price on a pack card on iPhone), the main "Start your ritual" button lands on an empty frame, and reduced-motion users lose the nav. The fixes are mostly retiming and ownership changes in existing GSAP timelines, not new art.

## Timing map (what the code does today)

| Chapter | Pin length | What fills it | Fully crisp share | End of pin |
|---|---|---|---|---|
| Intro curtain | 3.3 s to lifted, 4.3 s to hero settled | logo draw 1.2 s, tag, hold, lift 1.0 s | n/a | n/a |
| Hero `top` | 1.7 vh both devices | 120-frame sequence over the first 85%; title fades by 52% | fronts readable only from about 40% | tagline reaches full opacity at exactly 100%: no hold |
| Fog `why` | 3.4 vh both | 4 text beats, timeline 7.9 units (1 unit = 0.43 vh) | 32% | 0.26 vh hold, good |
| Day `ritual` | 7.49 vh desktop, 2.12 vh iPhone | linear horizontal track, 5 panels | a panel is exactly framed only for an instant | last panel is framed at exactly 100%: no hold |
| Pour | 2.0 vh both | 120-frame sequence, steps, title | title complete only at 30% | 0.3 vh hold, good |
| Climax | 1.8 vh both | sweep, title, 4 3D sticks | fan formed from about 55% | 0.5 vh hold, good |

## Findings, ranked by impact on "this feels polished"

### 1. P0: The page-colour handoff erases text, including a price

`Chapters.tsx` tweens global `--bg` and `--fg` on `<html>` for 1.1 s when a section's top crosses 50% of the viewport. `body { color: var(--fg) }`, so every component that has its own background but inherits its text colour goes blank while the previous chapter is still on screen.

- `mob-57-footer.jpg`: the footer has triggered the flip to `#141414`; the "Boxes of 30" card is still on screen and its price and subtitle are gone (compare `mob-56-packs-1_4.jpg`, where `฿1,290` and "30 sticks of peach, holy basil & lemon" are visible).
- `mob-31-six-0_6.jpg`: the food chapter has flipped the page to black; the electrolyte circles are white discs with invisible labels.
- `desk-34-food-1_4.jpg`: "No artificial colours, flavours or sweeteners." is citrus yellow on cream. This is the line label readers care most about and it is unreadable for the last half-screen of its life.
- Fog to day: "Water with the right salts will." is peach on a peach page for about 0.5 vh after release (from code; no frame sampled).

Why it matters: a disappearing price on the shop card is the kind of thing a CEO sees once and remembers.

Fix:
1. Stop tweening `--fg`. Every block with its own background sets its own text colour: `.pack, .six-el, .band, .r-panel, .pour, .drawer { color: var(--ink) }`; `.fog, .food, .foot { color: var(--cream) }`.
2. Give `.fog`, `.food` and each light section its own static `background`, so a section carries its colour with it as it scrolls. Keep the global tween only for the particle tint and `theme-color`.
3. If the whole-page wash is wanted, scrub it across the seam (`start: "top 85%"`, `end: "top 35%"`, `scrub: true`) instead of a 1.1 s timed flip, so colour is tied to the finger and reverses with it.
4. Remove `data-bg` from the footer; it already paints itself.

### 2. P0: The day cycle is too short on iPhone and too long on desktop, with no rest stops on either

The pin length is `track width × 1.15`, so it scales with screen width, not with content.

- iPhone: 2,024 px for 5 panels, about 506 px (0.53 vh) per stick. A normal thumb flick travels 700 to 1,200 px, so one flick skips one or two sticks. The text column has an 18 px gutter, so copy is uncropped only within about ±21 px of scroll around each centre: roughly 9% of the chapter. `mob-26-ritual-055.jpg` is 5% past centre and every line has lost its first word ("efore you train", "IT UP", "THE BEET").
- Desktop: 10,787 px (7.49 vh), about 2.04 vh per stick, 27% of the whole page. About 33 wheel notches per stick.
- Both: the track moves linearly, so no panel ever rests. Panels are centred at exactly 18%, 45%, 73% and 100% on desktop. In the 8 sampled desktop frames, 5 show a cropped stick or cropped copy (`desk-23`, `-24`, `-25`, `-26`, `-28`).
- Both: Calm O' Mile is framed at exactly 100%, the moment the pin releases (`desk-29`, `mob-29`). The sleep stick never holds still.

Fix: define the pin in viewport heights and give each panel a plateau.

| | Now | Should be | Per stick |
|---|---|---|---|
| Desktop | 7.49 vh | 5.2 vh | 0.7 vh travel + 0.5 vh dead-still hold |
| iPhone | 2.12 vh | 4.4 vh | 0.55 vh travel + 0.45 vh hold (430 px parked, versus 42 px now) |

Build it as a timeline instead of one linear tween: 0.25 vh rest on the intro headline, then per panel `to(track, { x, duration: travel, ease: "power2.inOut" })` followed by an empty `to({}, { duration: hold })`, then a 0.15 vh tail. `end: () => "+=" + innerHeight * total`. On touch add `snap: { snapTo: "labelsDirectional", duration: { min: 0.2, max: 0.5 }, delay: 0.05 }` with a label at each hold, and remove it if it fights iOS momentum; the plateaus alone make the parking zone 10 times larger.

Lower-risk phone alternative: at 760 px and below, drop the horizontal pin and use four stacked `position: sticky` full-height cards (4 vh total). Vertical thumb movement producing sideways motion with cropping text is the riskiest pattern on the page.

### 3. P0: Pinned chapters start empty, and scrubbed masked headlines look broken when paused

Each pinned section is 100svh tall and has nothing on it at progress 0, so the reader scrolls a full screen of nothing before the pin even starts.

- Fog: `desk-14-why-0.jpg`, `mob-14` are blank. About 1.15 vh of dark empty screen between the hero and the first readable word.
- Climax: `desk-45`, `desk-46`, `mob-45`, `mob-46` show an empty gradient with stick slivers at the edges and mirrored "O' MILE" text in a corner. The headline is not complete until 48% of the pin. About 1.3 vh of near-empty screen.
- Pour: `desk-35`, `mob-34` have no headline at all. "Just add water." is a masked reveal scrubbed over the first 30% of the pin, so `desk-36` and `mob-36` show letters cut in half horizontally, and `desk-37` reads "WATFR". Same for `desk-47`/`desk-48` ("STAR", "RITUA" with the bottoms sliced off).
- Six on iPhone: `mob-30-six-0.jpg` shows the section perfectly framed, ring complete, all six electrolytes placed, and the big red number reads "3 electrolytes in every stick" under the headline "Six, not three". The count is on a different trigger from the ring and finishes 190 px later.

About 3.8 vh of the 27.4 vh desktop page is dead scroll, and 5 of the 40 pinned sample frames per device are effectively blank.

Fix:
- Headlines are never scrubbed. Reveal them once, time-based, as the section approaches: `scrollTrigger: { trigger, start: "top 70%" }`, duration 0.9 s, stagger 0.05, ease `ritual`. They are complete when the pin locks.
- Fog: line 1 is at full opacity when the pin starts.
- Climax: drive stick progress from `start: "top 65%"` (approach) to the pin end, so two sticks are already crossing the screen as the stage arrives.
- Six count: one trigger with the ring (`start: "top 85%"`, `end: "top 45%"` on `.six-ring`), or simply count 0 to 6 in 1.0 s when the ring enters at 70%.

### 4. P0: The fog chapter is blur and darkness for two thirds of its length

From the timeline: each line takes 0.82 units to arrive, holds crisp for 0.28 units, then takes 0.5 to blur out, with gaps between beats.

| Beat | Fully crisp window | Desktop | iPhone |
|---|---|---|---|
| "You wake up already behind." | 0.28 units | 174 px | 115 px |
| "Eight hours. Not a sip." | 0.28 units | 174 px | 115 px |
| "2%" plus its 26-word sentence | 0.7 units | 434 px | 288 px |
| "Coffee won't fix that…" | 1.3 units | 806 px | 534 px |

Crisp total is 32% of 3.4 vh. `desk-17` (40%) and `desk-19` (70%) are empty dark frames; `desk-16` and `mob-16` are half-blurred. The 26-word claim gets less than one phone flick.

Performance risk on top: `.fog-big` is 34vw (about 870 px tall glyphs at 5K) animated with `filter: blur(30px)` on every scrub tick. That is the most expensive paint on the page.

Fix: 3.0 vh pin, timeline of 6.6 units: four beats of 0.3 in, 1.2 hold, 0.3 out, where each beat's out overlaps the next beat's in (no blank frames), plus the existing 0.6 tail. Crisp share becomes about 73%, each beat holds 0.55 vh (785 px desktop, 521 px iPhone). Cap blur at 8 px on desktop and remove it on phone (opacity plus 12 px rise). For the 2%, crossfade a pre-blurred copy with the sharp one instead of animating the filter.

### 5. P0: The first five seconds: curtain, hero rest frame and slow connections

Curtain (`Intro.tsx`, 11 logo paths): draw ends 1.22 s, tag ends 1.68 s, curtain lifts 2.28 to 3.28 s, hero settles at 4.3 s. It cannot be skipped, replays on every visit, and does not lock scroll (a reader who scrolls during it arrives mid-hero with the stage still at opacity 0).

Slow hotel wifi on a phone: the curtain is in the server HTML and only JavaScript can lift it. About 300 KB gzipped of JS must arrive before the timeline starts (546 KB gz in total; the 244 KB three.js chunk is fetched straight after for a particle field that is invisible on cream). At 1 Mbps that is roughly 4 s of a static logo, then the logo blinks out and redraws itself, then 3.3 s of curtain. First product pixel at about 6.5 s, first tappable button at about 7.5 s. If the first sequence frame has not arrived, the fallback is a different picture (`trio-2400.webp`), which is removed instantly when the canvas goes live.

Hero rest frame (`desk-06-top-0.jpg`): the sticks show their backs (barcode, "MADE IN THAILAND") and cover the "D" and "TU" of the title, so the brand reads "THE AILY RI AL". Measured frame change in `public/seq/assemble` is almost nil for frames 1 to 30, so the first 21% of the pin is a slow drift of back labels; fronts appear at about 40% (`desk-09`, `desk-10`).

Hero end: "Rise. Pump. Glow. Snooze." fades in from 74% and reaches full opacity at exactly 100% (`desk-12` is grey, `desk-13` is the release frame). On iPhone it sits on top of the ghost title, which is also clipped at the left edge (`mob-12`, `mob-13`), and the bottom 27% of the screen is empty.

Probable bug (inferred, please verify): the entrance tween and the scroll timeline both own `.hero-stage` scale. The entrance ends at 1.0, the scroll timeline starts at 0.92, so the first scroll tick snaps the sticks 8% smaller. The stack shrinks about 11% between `mob-06` and `mob-07`, where the timeline alone would give 2%.

Fix:
- Curtain: 1.9 s on the first visit of a session (draw 0.8 s, stagger 0.01; tag in parallel from 0.35 s; lift 0.8 s `power3.inOut` starting at 1.1 s; hero title starts at 1.25 s). Any wheel, touch, key or click sets `tl.timeScale(4)`. With `sessionStorage` set, skip to a 0.3 s fade. Add a CSS-only fallback so it lifts without JS: `.intro { animation: lift .8s 2.5s both }`.
- Make the assemble the entrance: autoplay frames 1 to 60 in 1.4 s (`power2.out`) as the curtain lifts, so the rest state shows four fronts. Scroll then scrubs frames 60 to 120 over 1.0 vh, tagline complete by 85%, 0.25 vh hold. Pin `+=125%` instead of `+=170%`.
- Entrance animates an inner wrapper (`.hero-stage .seq`); scroll owns `.hero-stage`.
- On phone, fade the ghost title to 0, not 0.07.
- Loading: ship a 50 KB poster of the fronts as an `<img fetchpriority="high">`; load only the 15-frame coarse pass before `intro-done`; load pour and float frames when within two viewports; import three.js after the hero is interactive.

### 6. P0: "Start your ritual" and "Shop" land on an empty frame after a 2.2 s strobe

`scrollToId("shop")` targets the climax section top, which is the empty gradient in `desk-45-climax-stage-0.jpg`. The reader must scroll another 1.8 vh to see a price. On the way, 2.2 s of quartic-eased scrolling drags through four pins: the 9,380 px track whips sideways and the page colour flips six times.

Fix: point both buttons at the packs (`id="packs"`, offset −96 px). For any jump longer than 3 viewports, cut instead of travel: fade a cream cover in 0.2 s, `lenis.scrollTo(target, { immediate: true })`, fade out 0.35 s. Short jumps: 1.1 s, `power3.inOut`.

### 7. P0: Reduced motion makes it worse, not calmer

- `Intro.tsx` returns early under `prefers-reduced-motion` and never adds `intro-done`, so `.nav` stays at `opacity: 0` for good. No visible Shop button and no bag. iOS "Reduce Motion" users are affected.
- The hero entrance tweens still run with 2.5 to 3.1 s delays, so with no curtain the page is a blank cream screen for 2.6 s.
- Every pin, scrubbed blur, the horizontal track, both WebGL canvases and all Motion springs still run. The CSS block only shortens CSS animations.

Fix: add `intro-done` in the reduce branch. Wrap all GSAP in `gsap.matchMedia()`: under reduce, no pins, no horizontal track (stack the four panels), no blur, no delays, opacity-only reveals of 0.2 s, sequences shown as their last frame, particles and the 3D stage not mounted (use `trio-1200.webp`), `<MotionConfig reducedMotion="user">`.

### 8. P1: Two layers of smoothing put the animation about 1.3 s behind the wheel

Lenis `lerp: 0.085` settles in about 0.55 s; every scrub then adds 0.5 to 0.8 s. Text and track trail the hand, and the lag is worst in the fog, where blur makes it obvious.

Fix: desktop Lenis `lerp: 0.1`, `wheelMultiplier: 1`; scrub `true` on the horizontal track, 0.2 on hero, pour and climax, 0.3 on fog. On touch (Lenis does not smooth touch) scrub 0.4 throughout. Call `ScrollTrigger.refresh()` on `document.fonts.ready`.

### 9. P1: Pour: the labels and the footage disagree, and the meter is dead

- "Shake." lights at 62% but the powder keeps pouring until 81% (`desk-40-pour-07.jpg` shows "Shake" lit mid-pour). No shaking or stirring exists in the footage; frames 98 to 120 are identical.
- The progress line never fills in any frame: `Pour.tsx` tweens `scaleY` on an element whose CSS is `scaleX(0)`.
- On iPhone the stick is cropped by the stage edge (`mob-36`, `mob-38`, `mob-42`).
- The stage looks veiled at 0% (`desk-34`, `desk-35`, `mob-34`). The sequence frame itself is fine; I could not find the cause in code.

Fix: thresholds Tear 0 to 0.20, Pour 0.20 to 0.80, Shake 0.80 to 1.0; map progress 0 to 0.85 onto frames 1 to 100; render 20 frames of a swirl for Shake, or rename step 3 "Done."; `scaleX: 1`; pin `+=160%`; on phone set the cover focal point 12% left.

### 10. P1: The climax repeats the hero's picture with weaker sticks, and its fizz is invisible

- It ends on four sticks under a big headline, the same composition as hero 85%, but the real-time sticks are flat grey boxes with no crimped ends and washed label colours (`desk-51` against `desk-13`).
- `scene.burst` drives the particle "fizz", but `.climax-sweep` is an opaque layer above the particle canvas. No bubbles appear in any climax frame.
- Everything happens in the first half (sweep, letters, title zoom, four sticks); nothing but one line in the second.
- iPhone: "START YOUR" is cropped at both screen edges from 25% to 55% (`mob-48`, `mob-49`, `mob-50`) because the title starts at scale 1.25.
- Desktop: "Your first glass is tomorrow" is printed over the stick ends (`desk-53`); the sweep ends sage on the left, leaving a seam on release (`desk-54`).

Fix: pin `+=140%`. Title time-based on approach; sticks 0 to 60% with a 4% overshoot settle; subline at 65%; hold to 100%. Phone title scale 1.05 to 0.9. Move the particles above the sweep for this section or drop the burst. End the gradient `#c8ddcb 62%, #fbf6ee 80%, #fbf6ee 100%`. Move the subline to `bottom: 4vh` or raise the fan 0.25 units. Better: render the fan in Blender as a third sequence so the finale matches the opening.

### 11. P1: Day-cycle details that read as bugs

- Sun arc: `vector-effect: non-scaling-stroke` breaks DrawSVG's length maths. Desktop shows a second solid fragment at the right end from 12% on and the line tip lags the sun (`desk-23` to `desk-28`). On iPhone the arc is fully drawn by 25% (`mob-24`).
- A later CSS rule (`.ritual-sky { width: min(46vw, 1200px) }`) overrides the phone rule, so on iPhone the arc is 202 px wide and the sun is a 6 px dot.
- The clock overlaps stats and notes on iPhone (`mob-23`, `mob-25`, `mob-28`) and reads the wrong time most of the way (09:23 beside "07:00 Morning" in `desk-24`).
- Watermarks collide: "CGLOW" in `desk-27`, "ORMANCE" over "GLO" in `desk-26`; outlines run through 13 px captions and stat numbers (`desk-24`).
- The arc line crosses the "Morning, before coffee" label (`desk-24`).

Fix: remove `non-scaling-stroke` from `.ritual-arc`; on phone replace the arc with a four-segment rail (07:00, 16:30, 18:30, 20:00) that fills and can be tapped; with plateaus the clock holds on each stick's time and runs only during travel; `overflow: clip` on `.r-panel`, parallax ±8%, watermark opacity 25%; move the phone clock to the top right.

### 12. P1: Performance risks on the two demo devices

- Every sequence starts downloading every frame at mount: 528 requests, 29.6 MB on desktop, 13.4 MB on a phone. The hero alone is 15.8 MB / 6.9 MB. Until fine passes arrive, the hero scrub has 15 distinct poses (one change per 140 px on a phone).
- There are 8 canvases, not 3: two WebGL contexts and six 2D. The climax 3D stage is mounted at load and renders every frame for the whole visit at dpr 2 with antialiasing (5120×2880 at 5K) while off screen. The particle field renders full screen at dpr 1.75 and is visible only as specks in the fog.
- `.ritual-track` has `will-change: transform` on an 11,940 px wide element: a 23,880×2,880 px layer at 5K.
- Sequence canvases are backed at twice the source resolution (hero 3,398 px from 1,800 px frames), so every tick fills 11.5 MP and the label microtype is still soft at 5K.
- The bag scrim uses `backdrop-filter: blur(4px)` over two live WebGL canvases.

Fix: hero 60 frames (7.9 MB / 3.5 MB), phone at 720 px (about 1.5 MB); pour as an all-intra video (under 1 MB); phone float loops become one still with a CSS bob (`translateY ±6px`, `rotate ±1.5deg`, 5 s), saving 4.3 MB and four canvases; `frameloop="demand"` and mount the 3D stage within 1.5 viewports; pause particles under opaque sections and when the bag is open; cap canvas backing at source size; `will-change` per panel; scrim without blur at `rgba(20,20,20,.55)`.

### 13. P1: Hover, tap and bag feedback

- The hidden nav leaves its shadow as a grey smear across the top of every scrolled frame (`desk-08` onward, `mob-08` onward). Fix: `y: "-180%"` or fade the shadow.
- `Magnetic` runs on touch: the primary button slides up to 49 px toward the finger. Gate to `(hover: hover) and (pointer: fine)`; strength 0.2.
- Quantity buttons are 30×30 px; the close "×" is smaller than 44 px. Make all three 44 px.
- No pressed state on the stick selector, quantity or close buttons. Add `:active { transform: scale(.96) }` and a 120 ms background change.
- Every add opens the drawer over 86% of the phone screen (`mob-58`). Keep it for the first add; afterwards change the button to "Added ✓" for 1.2 s and bump the bag count.
- The disabled "Checkout opens at launch" button has animated stripes, pulling the eye to the one thing that does not work. Remove the animation.
- Stick selector: images are not preloaded (0.25 s exit then an empty slot on slow wifi) and the card colour snaps. Preload four images; `transition: background-color .35s`.

### 14. P2: Polish

- For-you bands: the colour wipe is scrubbed under static text and reads as a loading bar when paused (`desk-43`, `mob-43`). Play it once in 0.6 s per band at `top 80%`.
- Marquee skew clamps at 14°. Use 6° and `gsap.quickTo`.
- Six to food: 0.35 vh empty band (`desk-31`), 300 px on phone (`mob-31`); food to pour: 300 px of black on phone (`mob-33`). Halve those paddings.
- The phone hero has no scroll cue (it is hidden at 760 px). Add a small chevron under the buttons.
- `desk-44`: a 5 px unfilled sliver on the right edge of the sage band.

## Severe, outside my lane

- The hero rest frame shows readable placeholder text on the back labels at 5K: "Ingredients & nutrition: pending OEM spec sheet" and "XX-X-XXXXX-X-XXXX" (`desk-06`, `desk-07`).
- The finished drink in `desk-42` is an opaque dark maroon with odd refraction blocks; it does not look like something you want to drink.

## The three changes that would make this 10x better

1. **Score every pin as beats with holds.** Each chapter arrives already populated, spends at least 70% of its length fully readable, parks each idea for about half a screen, and ends on a hold. Target lengths: hero 1.25 vh, fog 3.0 vh, day 5.2 vh desktop and 4.4 vh iPhone with plateaus, pour 1.6 vh, climax 1.4 vh.
2. **Make the first three seconds the product.** A 1.9 s curtain once per session that any input skips, the assemble sequence played as the entrance so the rest frame is four readable fronts, a poster that shows without JavaScript, and both buy buttons landing on the packs.
3. **One colour system and one smoothing layer.** Sections own their background and text colour so nothing can vanish; handoffs are scrubbed, not timed; and the scroll goes through Lenis or a scrub delay, not both, so the page moves with the hand.
