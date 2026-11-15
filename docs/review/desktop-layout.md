# Desktop layout review (5K, 2560×1440 CSS px)

Reviewer: senior visual designer, desktop layout. All 59 `desk-*.jpg` frames read in order, against `site/app/globals.css`.
Measurements are in CSS px at 2560 wide (screenshot px × 1.6). "img px" means the 1600-wide screenshot.

## Verdict

The big Anton headlines and the four pack colours give the page a strong skeleton, but on a 5K screen the product is too small in every chapter, the small type under-scales to 16–18 px, and the two money frames (the opening hero and the packs shop) look unfinished. A dozen visible collisions and bugs (watermark words overlapping each other, the sun arc striking through labels, pastel text vanishing on cream, a broken arc stub, a nav shadow smeared along the top of ~45 frames, a meter that never fills) are what make it read "rough around the edges". None of it needs a redesign: one grid edge, one type ramp, bigger and front-facing sticks, and a real shop section would move this from prototype to finished.

## Chapter scorecard

| Chapter | Frames | One focal point? | Product render | Worst problem |
|---|---|---|---|---|
| Hero, at rest | 00–07 | No: title and sticks fight | Backs of sticks, barcode, placeholder print | Brand name reads "THE AILY RI AL" |
| Hero, end | 11–13 | Yes | Row is 41% of screen width | Ghost title off-centre, no CTA left |
| Fog | 14–21 | Yes when lit | none | 3 of 8 frames are empty black |
| Day (ritual) | 22–29 | No | Stick 192×850 px in a 1123 px box | Watermarks overlap each other and the copy |
| Six | 30–31 | Yes (ring) | none | 16.5 px captions; left edge jumps to 180 px |
| Real food | 32–34 | Marquee | none | Pastel "no" sentence invisible on cream |
| Pour | 35–42 | Yes | Name upside-down, blown-out table | Meter never fills; steps crowd headline |
| For you | 43–44 | No | none | Right 40% of each band empty |
| Climax | 45–53 | Yes at the end | Flat grey cards, not sachets | Two empty frames; weakest render is the closer |
| Packs | 54–57 | No | 240 px wide in the lead card; none in Sampler | Does not look like a shop |
| Footer | 55–57 | No | n/a | Logo is a white blob; right half empty |

## Findings, ranked

### 1. P0 · The opening frame shows the back of the sachets and hides the brand name
**Where:** `desk-00` to `desk-07`.
**What:** At rest the hero shows a stack of sticks seen from behind: barcode, "MADE IN THAILAND", regulatory small print and the placeholders "Ingredients & nutrition: pending OEM spec sheet" and "XX-X-XXXXX-X-XXXX", all legible at 5K. The stack covers the D of DAILY and the TU of RITUAL, so the title reads "THE AILY / RI AL". The radial mask on `.hero-stage:has(.seq-fallback.blend)` also leaves a milky ghost "D" over the letter.
**Why it matters:** This is the frame on screen while Jon sits down. It shows no flavour, no colour, no front of pack, and placeholder text.
**Fix:**
- Start the `assemble` sequence on a frame where the fronts face camera (or hold a 4-front poster until scroll starts). Nothing with a barcode should be visible at progress 0.
- Stop the product covering the name. Put the title on one line at the top and the sticks under it: `.hero-title { flex-direction: row; justify-content: center; align-items: flex-start; gap: .22em; padding-top: 13vh; font-size: 14vw; }` (358 px, spans about 2220 px inside the gutters). Start `.hero-stage` at `y: 9vh`.
- Cheaper alternative if the two-line title stays: `z-index: 3` on `.hero-title`, `z-index: 2` stays on the stage, and `mix-blend-mode: multiply` on the title so the letters print over the white sachets instead of disappearing behind them.
- Remove the mask rule on `.hero-stage:has(.seq-fallback.blend)`; the sequence has alpha, so the mask only produces the ghost D.

### 2. P0 · The watermark words overlap each other and run through the copy
**Where:** `desk-23` to `desk-29`; worst in `desk-26` ("ORMANCGELO") and `desk-27` ("CGLOW").
**What:** `.r-watermark` is `font-size: 26vw` (666 px), `white-space: nowrap`, `left: 0`, and animates `xPercent` 25 to -25. "PERFORMANCE" at 666 px is about 3000 px wide, wider than its 2560 px panel, and `.r-panel` does not clip, so it spills into the next panel and overprints "GLOW". The outlines also pass straight through body copy, chips, the pair rules and the stats (`desk-24`, `desk-27`, `desk-29`: the P of SLEEP cuts "0 caffeine").
**Why it matters:** Reads as a rendering glitch, in the chapter that carries the whole product story.
**Fix:**
- `.r-panel { overflow: hidden; }` (or `clip-path: inset(0)`).
- `.r-watermark { font-size: 17vw; }` (435 px: PERFORMANCE fits in about 2000 px), `-webkit-text-stroke: 1.5px color-mix(in srgb, var(--deep) 22%, transparent)`.
- Keep it out of the text: confine it to the stick half with `left: 0; width: 50%; overflow: hidden`, or drop the parallax to `xPercent: 6 → -6` and give `.r-copy` a solid backing (`background: var(--panel); box-shadow: 0 0 0 2vw var(--panel)`).

### 3. P0 · The product is too small in every chapter, and soft on a real 5K panel
**Where:** `desk-12`, `desk-13` (hero row), `desk-23` to `desk-29` (day), `desk-54` (packs).
**What:**
- Day panels: `.r-visual` is 1123 px square (`min(78svh, 46vw)`), but the stick inside the frame is only about 192×850 px, 17% of the box width. The stick is a thin strip floating in a colour field.
- Hero end row: four sticks span 1040 px, 41% of the screen, leaving 750 px empty on each side.
- Lead pack card: the four sticks are about 240 px wide on a 2560 px screen.
- Source resolution: `float-*` frames are 1100 px and `assemble` 1800 px (`public/seq/manifest.json`). On a DPR 2 display the 1123 px box needs 2246 px, so everything is upscaled about 2×; pack text such as "TEAR HERE" and "6 ELECTROLYTES + HOLY BASIL" is already soft in the DPR 1 screenshots.
**Why it matters:** The pack design is the best asset on the page and the buyers are label readers. They cannot read the label.
**Fix:**
- Re-render the float sequences in a portrait frame with the stick filling 80% of the height, and ship a 2200 px-tall desktop size. Then `.r-visual { height: 82svh; aspect-ratio: 1 / 2; }` gives a stick about 290×1050 px.
- Until re-rendered: `.r-visual .seq { transform: scale(1.3); }` (stick about 250×1105 px) and tilt it `rotate(-8deg)` so it reads as an object, not a ruler.
- Hero end state: change the scroll tween on `.hero-stage` from `scale: 0.68` to `0.8` and `y: "7vh"` (row about 1225 px wide, sticks about 1000 px tall).
- Export `assemble` at 2600 px for desktop.

### 4. P0 · The packs section does not look like a shop
**Where:** `desk-54` to `desk-57`.
**What:**
- No section heading. Cards appear directly under the climax; nothing says "choose your pack".
- The Sampler card has no image: 400 px of empty pink between the copy and the price.
- The lead card's image is tiny and sits in a visibly lighter square (the multiply blend does not match the peach), with dead space above and below it.
- "Boxes of 30" shows one loose stick, cropped by the tile's corner, on a yellow-cream backdrop that matches nothing else. No box anywhere, in a section that sells boxes.
- The ฿ sign falls back to another font inside the Anton price (`.price`), so it is visibly lighter and thinner than the digits, in all three prices and in the drawer total.
- "฿46 a stick", the value argument, is the smallest text on the card (`.price small`, 16.7 px at 70% opacity).
- The cards start at x = 180 px while the title above and the footer below start at 102 px (finding 6).
**Why it matters:** This is the frame where the CEO judges whether it can take money. It currently looks like three placeholder tiles.
**Fix:**
- Add a head row: `<h2>Pick your ritual</h2>` at `font-size: 6.4vw` (164 px) on the left, the "Checkout opens at launch" note at 26 px on the right, `margin-bottom: 6vh`.
- Lead card: `.pack-hero { grid-template-columns: 1.15fr 1fr; }`, image fills the left column edge to edge (`.pack-img img { aspect-ratio: 4 / 5; object-fit: contain; }`), sticks at least 700 px wide. Render with a transparent background so there is no square.
- Every card gets a product image of the same height (`aspect-ratio: 16 / 10`, same backdrop): Sampler = 12 sticks fanned, Box of 30 = a box with one stick leaning on it.
- `.price::first-letter`, or wrap the sign: `.price .cur { font-family: var(--body); font-weight: 800; font-size: .62em; vertical-align: .32em; margin-right: .08em; }`.
- `.price small { font-size: 22px; opacity: 1; font-weight: 700; }` and show it as a pill beside the price.
- Same price row on all three cards: price left, button right, button `min-height: 72px`, `font-size: 22px`. Keep red only for the lead card.

### 5. P0 · The closing 3D sticks are the weakest render on the page
**Where:** `desk-45` to `desk-53`.
**What:** The hero shows pillow sachets with crimped ends and clean white. The climax (`.climax-3d`, `StickStage`) shows flat rectangular cards with hard edges, a grey-beige "white" and desaturated panels (peach reads as tan, citrus as khaki). Edge-on they are grey slabs (`desk-45`, `desk-46`, `desk-49`). `desk-45` and `desk-46` are an almost empty gradient with slivers of stick in three corners. In `desk-47` to `desk-49` the sticks show their placeholder backs again and pass in front of the title.
**Why it matters:** The last product image before the shop looks cheaper than the first.
**Fix:**
- Use the same sachet mesh and materials as the Blender renders, or replace the live 3D with a rendered `fan` sequence like `assemble`.
- If the live stage stays: unlit or emissive label material so white is `#fbfaf7`, `toneMapping = NoToneMapping`, `outputColorSpace = SRGBColorSpace`, rounded-box geometry with a 2 mm bevel.
- Start the sticks inside the frame, fronts to camera, at progress 0. Never show the back.
- Final fan: scale so it spans 1500 px (58vw); `.climax-sub` at 46 px sits 48 px under it, not touching the stick tails as it does in `desk-52` and `desk-53`.
- Replace the four-colour sweep (`.climax-sweep`) with a flat `--cream` and let the four sticks carry the colour; the rainbow gradient is the most generic thing on the page.

### 6. P0 · Pastel text disappears when the page turns cream
**Where:** `desk-34` (and the transition after `desk-33`).
**What:** `.zeros` spans are coloured `--peach`, `--beet`, `--citrus` for a black background. The background tween to the pour chapter's `#EFE6DC` starts while the sentence is still on screen. Citrus on that cream is 1.06:1, peach 1.32:1, beet 1.64:1. "ARTIFICIAL COLOURS, FLAVOURS OR SWEETENERS." is a yellow smudge.
**Fix:** Keep the food section dark until the sentence has left: `.food { padding-bottom: 40vh; }` and trigger the pour background at `top 20%` instead of on entry. Also set a colour on spans 4 and up (they have none, so they inherit and look "off" in `desk-33`), and align the block to the grid (finding 6): `.zeros { margin: 12vh 0 0 var(--edge); max-width: 20ch; }`. It currently starts at x = 715 px, which matches no other edge.

### 7. P0 · The sun arc is broken and collides with text
**Where:** `desk-22` to `desk-29`.
**What:**
- A solid stub is always drawn on the right end of the arc (img x 1065–1160) while the middle is dotted. Cause: `.ritual-arc` has `vector-effect: non-scaling-stroke`, which makes dash lengths screen px, but DrawSVG computes them in user units. The SVG is drawn at 1178 px for a 1000-unit viewBox, so the last 15% of the path repeats the dash.
- The arc strikes through the "07:00 Morning, before coffee" label (`desk-24`), ends on the "16:30" chip (`desk-25`), and in `desk-29` the sun sits on the end of "SNOOZE CONTROL" while the arc's left end lands on the top of the stick.
- In `desk-22` the sun dot sits on top of the headline (on the I of STICK).
**Fix:**
- Remove `vector-effect` from `.ritual-arc` and set `stroke-width: 1.7` (keep it on `.ritual-arc-ghost`).
- Move the arc out of the copy's path and group it with the clock as one instrument, top right: `.ritual-sky { left: auto; right: var(--gutter); transform: none; top: 5vh; width: 22vw; }` (563×124 px) and `.ritual-clock { top: calc(5vh + 3.6vw); right: calc(var(--gutter) + 11vw); transform: translateX(50%); font-size: 3.2vw; }`.
- `.r-panel { padding-top: 18vh; }` so no copy starts above 259 px.

### 8. P0 · The Paleo Robbie logo in the footer is a white blob
**Where:** `desk-55` to `desk-57`.
**What:** `.foot-logo { filter: brightness(0) invert(.93); }` flattens the mark, so the face in the roundel becomes a solid white disc.
**Why it matters:** It is the CEO's logo and it is the last thing on the page.
**Fix:** Ship a real reversed logo (`logo-reversed.svg`: cream wordmark, mark with its detail kept) and delete the filter. Height `72px`.

### 9. P1 · Small type under-scales at 2560: a whole tier sits at 16–18 px
**Where:** every chapter; clearest in `desk-24`, `desk-30`, `desk-43`, `desk-54`, `desk-58`.
**What:** The small tier uses `0.3vw + 10px`. At 1440 wide that is 14.3 px (1.0% of width); at 2560 it is 17.7 px (0.69%). Relative to the layout the labels are 30% smaller on the big screen than on a laptop. Measured at 2560:

| Selector | Now | Should be |
|---|---|---|
| `.nav-links` | 17.7 px | 22 px |
| `.r-chips li`, `.r-pairs dd`, `.r-note` | 17.7 px | 22 px |
| `.r-pairs dt`, `.r-stats span`, `.r-time` | 18–20 px | 24 px |
| `.r-body` | 22.5 px | 26 px |
| `.six-el small` | 16.5 px at 70% opacity | 22 px, opacity 1 |
| `.band-copy p`, `.pour-step span` | 22.8 px | 26 px |
| `.band-stick` | 20 px | 26 px |
| `.pack-badge`, `.seg button`, `.price small` | 16.7 px | 22 px |
| `.pack-copy`, `.pack-days li` | 19–21.5 px | 24 px |
| `.foot-row` | 17.7 px at 75% opacity | 20 px, opacity .85 |
| `.hero-scroll`, `.bag-count`, `.drawer-note` | fixed 12–13 px | 16–18 px |

**Why it matters:** In a boardroom, viewed from three metres, anything under about 22 px on this canvas is not read. That tier holds the claims this audience checks: "help reduce tiredness and fatigue", "Kids 4–12: half a stick", "holds water where you need it".
**Fix:** Two tokens, used everywhere:
```css
:root {
  --t-small: clamp(13px, 0.55vw + 8px, 22px);   /* 15.9 at 1440, 22 at 2560 */
  --t-body:  clamp(16px, 0.60vw + 10.5px, 26px); /* 19.1 at 1440, 25.9 at 2560 */
}
```
Line lengths are fine (`.r-body` 46ch, `.band-copy p` 52ch); keep them.

### 10. P1 · Two different left edges: 102 px and 180 px
**Where:** compare `desk-22`, `desk-38`, `desk-43`, `desk-57` (x = 102 px) with `desk-30`, `desk-32`, `desk-54` (x = 180 px).
**What:** `--gutter` is `4vw` = 102 px. `--wrap` is `min(100vw - 2*gutter, 2200px)` = 2200 px, which leaves a 180 px margin. Hero lead, day intro, pour, bands, nav and footer use the gutter; six, food head and packs use the wrap. Headlines jump 78 px sideways between chapters, and the packs cards sit inset from both the nav above and the footer below.
**Fix:** One edge. `--gutter: clamp(16px, 5vw, 128px); --wrap: calc(100vw - 2 * var(--gutter));` Everything lands on 128 px at 2560.

### 11. P1 · A grey shadow is smeared along the top of about 45 frames
**Where:** `desk-08` to `desk-57`, most visible on light backgrounds (`desk-30`, `desk-43`, `desk-54` to `desk-57`).
**What:** `Nav.tsx` hides the bar with `y: "-120%"`. The bar's `box-shadow: 0 10px 40px -20px` still reaches about 25 px into the viewport.
**Fix:** Animate to `y: "-200%"`, or add `opacity: 0` / `box-shadow: none` when hidden. One line.

### 12. P1 · The nav bar is a 2356 px pill with tiny contents
**Where:** `desk-00` to `desk-07`.
**What:** Logo about 56 px high, links 17.7 px, "Shop" button 16.4 px, inside a bar that spans the whole screen. Three small islands in a very long capsule.
**Fix:** `.nav { left: 50%; right: auto; transform: translateX(-50%); width: min(100vw - 2*var(--gutter), 1480px); padding: 12px 12px 12px 28px; }`, `.nav-logo img { height: 64px; }`, `.nav-links { font-size: 22px; gap: 48px; }`, `.btn-small { font-size: 20px; }`. Add a "Packs" link; the page's goal is the one thing the nav does not name. Note: the framer `y` transform will need to move to a wrapper if `translateX` is used.

### 13. P1 · Day panels: half the screen is empty half the time, and the copy block jumps
**Where:** `desk-24`, `desk-26`, `desk-28` (copy on the left, 40% of the screen blank); `desk-23` vs `desk-25` vs `desk-27` (block heights).
**What:**
- Each `.r-panel` is 100vw with two equal columns, so once the stick scrolls off, the copy sits alone with a blank field to its right until the next stick arrives.
- "PEACH OF MIND" and "CALM O' MILE" wrap to two lines inside `.r-copy { max-width: 820px }`; "TO THE BEET" and "ZEST LIFE" do not. With `align-items: center` the time label starts at y = 280 px on panels 1 and 4 and at 350–370 px on panels 2 and 3.
- `.r-line` and `.r-name` touch (line-height 0.88, no gap): "PUMP IT UP" sits on "TO THE BEET".
- Labels in `--deep` on the panel (`.r-time`, `.r-flavour`, `.r-stats span`) are 3.8:1 on peach and 4.0:1 on pink at 18–20 px. Below AA for that size.
**Fix:**
- `.r-panel { width: 86vw; grid-template-columns: .8fr 1fr; gap: 2vw; align-items: start; padding-top: 18vh; }` so a stick is always in frame.
- `.r-copy { max-width: min(42vw, 1080px); }` All four names fit on one line at 164 px (PEACH OF MIND is about 930 px wide).
- `.r-name { margin-top: .06em; }`
- Darken the four `deep` values in `lib/products.ts` by about 15% (target 5.5:1), or use `--ink` for `.r-stats span` and `.r-time`.
- Stats: make the units consistent ("0 g" beside a bare "0"), and set `.r-stats { gap: 64px; }` with labels at 24 px.

### 14. P1 · Pour: the product name is upside-down and the render has artifacts
**Where:** `desk-35` to `desk-42`.
**What:**
- The stick is held with "TO THE BEET" inverted for the whole chapter, then hangs in the air doing nothing through "SHAKE" (`desk-40` to `desk-42` are the same picture).
- The tabletop is blown out to pure white, so the bottom third of `.pour-stage` is a white box on a cream page. The glass shows rectangular softbox reflections floating in the drink (`desk-39` to `desk-42`).
- The glass is 205 img px wide in a 845 img px card: small, and low in the frame.
- `.pour-meter` never fills. `Pour.tsx` line 36 animates `scaleY` but the CSS starts from `transform: scaleX(0)`. The grey rule under the steps looks like a stray divider in all eight frames.
- The steps sit 36 px under a 192 px headline (`.pour-steps { margin-top: 1.4em }` of body size). Inactive steps are at 25% opacity, which reads as disabled.
- `desk-35`: at progress 0 there is no headline, only three ghost-grey steps beside the card.
**Fix:**
- Re-render: stick right way up, entering from the top left; table at 85% grey so the card edge holds; round softboxes; camera 25% closer so the glass is about 450 px wide; end on a stirred, evenly coloured glass.
- `scaleX: 1` in the tween.
- `.pour-steps { margin-top: 5vh; gap: 20px; }`, `.pour-step { opacity: .45; }`, drop `transform: scale(1.04)` on `.on` (it shifts the text sideways; compare `desk-37` and `desk-40`).
- Show `.pour-title` from progress 0.

### 15. P1 · For you: four text rows, no product, right side empty
**Where:** `desk-43`, `desk-44`.
**What:** `.band` is `1fr 2fr 1fr`. The copy fills about half of the middle column, so each band has a 700 px gap before a 20 px red label hard against the right edge. `.band-stick` in red is 2.4:1 on pink, 3.0:1 on peach, 3.4:1 on sage, 3.7:1 on citrus. The headline block leaves the right 60% of `desk-43` empty.
**Fix:**
- `.band { grid-template-columns: 22vw 1fr auto; align-items: center; min-height: 26vh; }`.
- Replace the red label with the product: a 34vh-tall stick render (two for Lifters, three for Parents) rotated -12deg and overlapping the band's top edge, plus the name as an ink pill (`background: var(--ink); color: var(--paper); font-size: 22px; padding: .5em 1em; border-radius: 999px`).
- `.band-copy h3 { font-size: 56px; }`, `.band-copy p { font-size: 26px; }`.

### 16. P1 · Hero end state: off-centre ghost title, no call to action
**Where:** `desk-10` to `desk-13`.
**What:** The title lines fade to 7% and slide in opposite directions (`xPercent: -18` and `+18`), so the ghost sits about 180 px left of centre behind a centred row. It reads as a misregistered leftover and the new "RISE. PUMP. GLOW. SNOOZE." line sits on top of it. `.hero-lead` and both buttons fade out at 55%, so the finished hero has no button.
**Fix:** Fade the title to `opacity: 0`. Keep one red `.btn-big` under the row at the end ("Start your ritual", 26 px, centred, `bottom: 6vh`). Use red for the primary button from the first frame; it is black in the hero and red in the shop.

### 17. P1 · Fog: three of eight frames are empty, and the payoff loses contrast
**Where:** `desk-14`, `desk-17`, `desk-19` (empty); `desk-20`, `desk-21`.
**What:** 3.4 screens of scroll, of which a third shows blurred black with nothing or a barely visible word. "Eight hours. Not a sip." appears much smaller than the line before it (`desk-16`). "Coffee won't fix that." (Outfit 800, 159 px) sits directly on "WATER WITH THE RIGHT SALTS WILL." (Anton, 205 px) with no gap: two display faces at nearly one size, stacked. In `desk-21` the peach line stands over the peach sun (`.fog-sun`), and the contrast of "SALTS WILL." drops as the sun rises.
**Fix:** Overlap the line fades so no frame is empty, and cut the chapter to about 2.4 screens. `.fog-end { gap: .6em; }`, coffee line at `font-size: 3.4vw` (87 px) as a lead-in. Make `.fog-turn` `color: var(--cream)` and cap `.fog-sun` at `opacity: .55`, or keep the sun's top edge below the text.

### 18. P1 · Footer is a stub
**Where:** `desk-55` to `desk-57`.
**What:** The outlined line (`.foot-big`, 1.5 px stroke at 215 px) is a hairline at 5K and stops 166 px short of the right gutter, so it is neither justified nor deliberately short. Below it: a logo and three lines of legal text in the left third. No links, no paleorobbie.com, no contact, no delivery line. The right two thirds are black.
**Fix:** `.foot-big { font-size: 8.8vw; -webkit-text-stroke: 2.5px var(--cream); }` so it spans gutter to gutter on the 128 px edge from finding 10. `.foot-row { grid-template-columns: auto 1fr auto auto; }` with two link columns at 22 px (Shop: Weekly Ritual, Sampler, Boxes of 30; Paleo Robbie: paleorobbie.com, delivery, contact).

### 19. P2 · Six: captions too small, big gap after
**Where:** `desk-30`, `desk-31`.
**What:** The ring is the best-composed frame on the page. But `.six-el small` is 16.5 px at 70% opacity, and `desk-31` is 60% empty cream (18vh bottom padding plus 20vh top of `.food`).
**Fix:** `.six-pos { width: calc(var(--S) * .27); }`, `.six-el small { font-size: calc(var(--S) * .02); opacity: 1; }`, `.six-el span { font-size: calc(var(--S) * .022); }`. `.six { padding: 18vh 0 10vh; }`.

### 20. P2 · Real food head leaves the right half empty
**Where:** `desk-32`.
**What:** Headline and lead occupy the left 55%; the right is black down to the marquee.
**Fix:** Two columns: headline left, lead right and bottom-aligned (`.food-head { display: grid; grid-template-columns: 1.2fr 1fr; align-items: end; gap: 4vw; }`), or five ingredient cut-outs on the right.

### 21. P2 · The clock jitters
**Where:** compare `desk-25` (14:36), `desk-26` (17:12), `desk-29` (20:00).
**What:** Anton has no tabular figures, so `font-variant-numeric: tabular-nums` does nothing. The left edge moves as digits change.
**Fix:** Wrap each digit in `<i style="display:inline-block;width:.52em;text-align:center">`.

### 22. P2 · Bag drawer uses fixed pixel sizes
**Where:** `desk-58`.
**What:** Title sits 16 px from the top edge. Thumbnail is 76 px. The quantity pill overlaps the "28 sticks" line. `.drawer-note` is 13 px. The middle 60% is empty.
**Fix:** `.drawer { padding-top: 48px; width: clamp(380px, 30vw, 760px); }`, `.drawer-lines li { grid-template-columns: 140px 1fr auto; }`, image 140 px, `.qty { display: flex; width: max-content; margin-top: 12px; }`, `.qty button { width: 44px; height: 44px; }`, `.drawer-note { font-size: 18px; }`. Fill the empty space with "Add the Sampler" as a cross-sell row.

### 23. P2 · Small leftovers
- `desk-54`: a hard horizontal seam at y = 144 px where the climax gradient stops against flat cream. Fade the bottom 20vh of `.climax-sweep` with a mask.
- `desk-00`: `.hero-scroll` is 12 px with 0.3em tracking. Set 16 px or remove it.
- `.pack`, `.pour-stage`, `.seg`, `.drawer-lines img` use fixed radii (28, 16, 14, 12 px) beside `--radius` (40 px at 2560). Derive all from `--radius`.

## Outside my lane (one line each)

- The pack back art carries placeholder text ("pending OEM spec sheet", "XX-X-XXXXX-X-XXXX") that is readable on screen in `desk-00` to `desk-09` and `desk-47` to `desk-49`.
- The Rise & Brine front label carries a "CLEAR HEAD" bubble; check it against the no-cognitive-claims rule.
- The Weekly Ritual (28 sticks) and a Box of 30 show the same ฿1,290.
- `desk-00` to `desk-05` ("intro") are identical to the hero at rest, so the opening curtain could not be judged on desktop.
- `desk-55`, `desk-56` and `desk-57` are the same frame; the bottom of the footer was not captured.

## The three changes that would make this 10x better

1. **Make the product big, front-facing and sharp everywhere.** Fronts in the first frame, sticks at 1000 px tall or more in the day panels and the hero row, one sachet model for hero and climax, 2× assets for 5K, and a real product image in every pack card.
2. **One grid and one type ramp.** A single 128 px edge for every chapter, and two text tokens that land on 22 px and 26 px at 2560, so nothing on the page is smaller than 22 px.
3. **Clear the collisions and build the shop.** Clip and shrink the watermarks, move the arc and clock into one top-right instrument, fix the pastel-on-cream sentence, the arc stub, the nav shadow and the meter, then give the packs a heading, three equal image slots and a proper price row.
