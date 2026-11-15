# Mobile layout review: The Daily Ritual on iPhone 17 Pro Max

Seat: senior mobile product designer. Evidence: all 59 `mob-*.jpg` frames (440×956), `timing-mob.json`, `copy.txt`,
`app/globals.css` (phone block at line 1460 and the later override blocks at 1680, 1812, 1834) and the section components.
Nothing was re-shot. Where I say "at a real viewport height" the numbers are computed from the CSS, not photographed; they
need one confirming pass on a real phone.

## Verdict

On a phone this is a 22-screen scroll film with a shop bolted on at screen 20: the first price appears after about 18,000 px of
thumb travel, half of it through pinned scenes, and both "Shop" buttons drop the shopper on an empty gradient. The layout was
tuned for a 956 px tall viewport that no phone browser ever provides (Safari, LINE and Instagram give roughly 660 to 880 px),
so the day-cycle panels, which hold the actual product information, will clip their last lines on every real device. The
individual frames that are settled look good; the problem is how few of them are settled (I count 21 of 53 scroll frames as
blank, mid-transition or collided) and that the product itself is shown small, from the back, or not at all in most of them.

## What each chapter's first screen gives a thumb-scrolling parent in 3 seconds

| Chapter | First screen (file) | Gets it in 3 s? |
|---|---|---|
| Intro | Cream screen, a 40 px outline "Pa" (`mob-00`); CTA buttons usable at about 4 s | No. Reads as a slow load |
| Hero | Title, a stack of sticks seen from the BACK (white, barcodes), lead, 2 buttons (`mob-02`) | Half. The words land; the product is anonymous white packets |
| Fog | Solid near-black, nothing (`mob-14`) | No. Looks like the page broke |
| The day | Headline + "Keep scrolling. The sun is coming up." (`mob-22`) | Yes, but no product on screen |
| Six | Headline, 5-line paragraph, ring reading "3 electrolytes in every stick" (`mob-30`) | No. The number contradicts the headline |
| Real food | Headline, paragraph, two marquee rows (`mob-32`) | Yes |
| Pour | Three greyed words, no heading, a glass (`mob-34`) | Half. The picture explains it; the heading is missing |
| For you | Headline, GLP-1 band, half-wiped Parents band (`mob-43`) | Yes. Best mobile screen on the page |
| Climax | Empty gradient, two grey slivers (`mob-45`, `mob-46`) | No. And this is where "Shop" lands |
| Packs | Weekly card, image, 4 rows, price, button (`mob-54`) | Yes at 956 px; price and button fall below the fold at real heights |
| Footer | Outline tagline, logo, legal (`mob-57`) | Fine, but no links at all |

---

## Findings, ranked

### P0-1. The layout only works at exactly 956 px tall

**What is wrong.** The shots are 440×956, which is the full glass of the phone. Mobile Safari's small viewport on this device is
roughly 750 px (bars showing), about 870 px collapsed; LINE's and Instagram's in-app browsers sit around 780 to 800 px; an
iPhone 15/16 gives about 660 px and an SE about 550 px. All pinned sections are `height: 100svh`, so they take the SMALL value.

- **Day panels** (`.r-panel`, line 1511): rows are `34svh auto`, padding `13svh … 4svh`, and the copy block measures about
  440 px in `mob-24` and `mob-29` (time chip at y=460, note ends at y=898). Needed height is 0.52 × H + 440, so the panel only
  fits when H is 917 px or more. `.ritual` is `overflow: hidden`. At H = 760 the copy overruns by 45 px: the stat labels
  ("kcal / sugar / water") and the whole note line are cut off. At H = 660 it overruns by 97 px: stats and note gone. The
  note is the line that says "Kids 4–12: half a stick" and "Adults only. Max 1 stick a day."
- **Hero** (`.hero-title` `padding-top: 15svh`, `.hero-stage` 104vw square, centred): at H = 760 the stage spans y=174 to 632,
  the title ends at y=299 and the lead starts at y=578. The sticks cover the middle of "RITUAL" and their feet touch the first
  line of the lead. At 956 they clear both by a few px (`mob-02`), which is why it looks fine in the shots.
- Even at 956 the day panel has only 56 px of spare room, shared with the floating clock.

**Why it matters.** The CEO will open the link in Safari or from a message thread. He will see the dosing line cut off on the
product panels.

**Fix.**
1. Re-shoot the mobile QA set at 440×750, 393×660 and 375×548 before anything else. Treat 956 as the best case, not the spec.
2. Stop sizing by fixed svh rows. Make each pinned phone layout a flex column whose image row absorbs the slack:
   `.hero { display:flex; flex-direction:column; padding: 84px var(--gutter) max(20px, env(safe-area-inset-bottom)); }`
   `.hero-title { position:static; font-size: min(25vw, 14svh); padding-top:0; }`
   `.hero-stage { flex: 1 1 0; min-height: 0; width: 100%; aspect-ratio: auto; margin-top: 0; }`
   `.hero-lead { position: static; }`
3. The day panels stop being pinned on phones (P0-2), which removes their height dependency entirely.

### P0-2. The horizontal day cycle is wrong on a phone. Give phones a vertical stack of four cards

**Decision: vertical stack.** Reasons, from the frames:

- Five of the eight ritual frames are unreadable hand-overs: `mob-23`, `mob-25`, `mob-26`, `mob-27`, `mob-28`. Each panel's
  paragraph runs gutter to gutter, so any horizontal offset clips words on one side ("efore you train", "IT UP", "no bloc",
  "s coming up."). A panel is fully legible only when it is aligned to the pixel, and there is no snap.
- The whole journey is 2.12 screens (`timing-mob.json`): 2,024 px of scroll for 5 panels, about 400 px each. One ordinary iOS
  flick travels 1,500 px or more. A parent will flick once and skip Pump It Up and Glow Up without ever seeing them at rest.
  `scrub: 0.7` adds lag on top, so the panel keeps sliding after the thumb stops.
- Vertical thumb movement producing sideways page movement is the one scroll effect people on phones reliably read as "the
  page is stuck". It also has no affordance for going back one stick.
- These four panels are the product detail pages. They are the densest reading on the site (9 text blocks each) and the only
  place the kids/adults rule appears. They need to hold still.
- A stack has no height dependency, which solves the clipping in P0-1.

**The stack, concretely** (`@media (max-width: 760px)`, and put the GSAP horizontal tween inside
`gsap.matchMedia().add("(min-width: 761px)", …)` in `Ritual.tsx`):

```css
.ritual { height: auto; overflow: visible; }
.ritual-track { display: block; width: auto; transform: none !important; }
.ritual-sky, .ritual-clock { display: none; }
.r-intro { width: auto; padding: 96px var(--gutter) 32px; }
.r-panel { display: block; width: auto; height: auto; padding: 28px var(--gutter) 36px; background: var(--panel); }
.r-visual { width: 100%; height: 150px; aspect-ratio: auto; overflow: visible; }
.r-body { display: none; }            /* or behind a 44 px "Why it works" disclosure */
```

- Each card is a full-bleed colour block in its own panel colour, so the "day changes colour" idea survives with no in-between
  states. Target card height 640 to 680 px so one card is one real screen.
- Card order: time chip + moment (13 px → 14 px), the stick lying on its side (P1-8), line + name, flavour, one-line pitch,
  chips, stats, note at 14 px full opacity, then a full-width 52 px button "Add 30 sticks · ฿1,290" and a text link
  "or try all four: Sampler ฿590".
- Keep the day as navigation instead of as motion: a sticky 44 px rail under the nav with four tappable times
  (07:00 · 16:30 · 18:30 · 20:00), the current one filled. That replaces the 6 px sun and the floating clock.
- If the team insists on sideways, the only acceptable version is a native swipe carousel the user drags themselves
  (`overflow-x: auto; scroll-snap-type: x mandatory;` cards 88vw wide so the next one peeks 36 px, dots underneath), never a
  scroll-jacked one. I still rank it second: the cards are too tall and too wordy for a carousel.

### P0-3. There is no way to buy for 19 screens, and the two shortcuts land on a blank screen

**What is wrong.**
- Page length is 22.4 screens; the packs begin at about screen 19.9. That is roughly 18,000 px of scrolling before the first
  price, and 11 of those screens are pinned scenes (1.7 + 3.4 + 2.12 + 2 + 1.8).
- The nav hides on every downward scroll (`Nav.tsx`, `setHidden(y > prev && y > 400)`), so "Shop" and the bag are gone for the
  whole read. There is no other persistent control.
- "Start your ritual" (hero) and "Shop" (nav) both call `scrollToId("shop")`. `#shop` is the `<section>` whose first child is
  the pinned climax stage, so the shopper lands on `mob-45`: an empty peach gradient with two edge-on slivers, and must scroll
  another 1.8 screens of animation before a product or price appears.
- The jump itself is a 2.2 s Lenis glide through 18,000 px of dark fog, pink, yellow and green.
- The four day panels, the For-you bands and the climax have no buy control. The red bold product names in the bands
  ("Rise & Brine", "Pump It Up, then Glow Up", `mob-43`, `mob-44`) look exactly like links and are not.

**Why it matters.** The grocery shopper's intent peaks at the stick she recognises herself in (GLP-1, parents, sleep). At that
moment the page offers nothing to tap. The CEO will tap "Shop" within ten seconds and get an empty screen.

**Fix.**
1. Put `id="packs"` on `.packs` and point both buttons at it with `lenis.scrollTo(el, { offset: -84, immediate: true })`
   (or a 0.3 s cross-fade). Never glide through the film.
2. Sticky buy bar on phones: `position: fixed; left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom));
   height: 60px; border-radius: 30px; z-index: 60;` paper background at 92% with the nav's blur. Left: "The Daily Ritual" 15 px
   bold over "from ฿590" 13 px. Right: red button "Choose a pack", 44 px tall, 16 px bold. Show it once the hero is passed
   (scrollY > 0.6 × viewport), hide it while `.packs` is on screen and while the drawer is open. When the bag has items it
   becomes "Bag (2) · ฿1,880 → View bag". Add `padding-bottom: 84px` to the page end so it never covers the legal text.
3. An "Add" button in every day card (P0-2) and make each band's product line a real 44 px control that adds that box or
   jumps to it in the Boxes-of-30 card with the right tab pre-selected.
4. In the climax, use the empty 180 px under the sticks (`mob-53`, y=690 to 870) for a red 56 px button
   "Add the Weekly Ritual · ฿1,290" with "or see all packs" under it.
5. Keep the nav pill visible on phones, or at minimum keep the bag icon visible as a 48 px floating button.

### P0-4. The first screen shows the back of the pack, and the product is small

**What is wrong.** `mob-02` to `mob-07`, the screen every visitor sees first and the screenshot the CEO's phone will make if he
shares it: three overlapping white sticks seen from behind, with barcodes and ingredient microtext. No colour, no flavour
name, no fruit. The stack is 145 px wide on a 440 px screen (33%). The fronts appear only after 40% of a 1.7-screen pin
(`mob-09`), and the full row of four only at 70% (`mob-11`), by which point the lead and both buttons have faded out. Before
any of that, the curtain plus entrance take about 4 s until the buttons can be tapped (`Intro.tsx` 2.6 s, hero entrance to
4.2 s).

**Why it matters.** This audience buys food by looking at it. The four coloured fronts with the fruit icons are the single
most persuasive image on the page, and on a phone they are never on screen together with a headline and a button.

**Fix.**
- On phones do not pin the hero. After the curtain, autoplay the `assemble` sequence once (1.4 s) and rest on the row of four
  fronts; that is the hero. This also removes 1.7 screens of scroll.
- Row of four at 88vw wide (about 386 px, each stick about 82 px wide × 350 px tall on this phone), with the title above and
  the lead + buttons below, using the flex column from P0-1.
- Cut the curtain to 1.2 s total on phones (logo fade, no path drawing) or skip it for return visits
  (`sessionStorage`). Buttons tappable by 1.5 s.
- Poster/fallback image for the hero must be the fronts, never frame 0001.

### P0-5. Prices and labels vanish when the page colour changes

**What is wrong.** Cards with their own light background inherit the page's `--fg`, which the chapter system tweens to cream
on dark chapters.
- `mob-56`: as the footer approaches, the Boxes-of-30 card is still on screen, the page turns black, and the card's price
  "฿1,290" and the line "30 sticks of peach, holy basil & lemon" disappear (cream on cream). Only "Add to bag" is left.
- `mob-31`: the six electrolyte discs turn into blank white circles while still on screen. Symbols, names and functions gone.

**Why it matters.** A shop card with no price is the most "unfinished" frame in the set, and it is the last thing seen before
the footer.

**Fix.** One line: `.pack, .six-el, .drawer { color: var(--ink); }`. Then make the dark hand-over start later: the footer's
trigger should be `start: "top 15%"` on phones so the last pack card has left the screen before the page goes black.

### P0-6. The fog chapter is 4.4 screens long and half of it is a black screen

**What is wrong.** `timing-mob.json`: 3.4 screens of pinned scroll for four short lines. Of the eight frames, `mob-14`,
`mob-17` and `mob-19` are empty near-black, and `mob-16` is an illegible blur ("Eight hours. Not a sip." caught mid-fade).
That is about 3,250 px, four or five full swipes, in which a visitor from LINE sees mostly nothing, with the nav hidden.
In `mob-18` the "2%" and its explanation are 270 px apart, so they do not read as one thought.

**Why it matters.** It is the second thing the visitor sees. A black screen after the first swipe, on a link from a grocer,
reads as a broken page, and this audience has no patience for it.

**Fix (phones).** Un-pin it. Three ordinary blocks on the dark background, each revealing once on enter (opacity + 16 px
rise, 0.5 s, no blur scrub):
1. "You wake up already behind." with "Eight hours. Not a sip." directly under it at 22 px (one screen, 80svh).
2. "2%" with its sentence 24 px below the number, not pinned to the bottom (`.fog-sub { align-self: start; margin: 24px 0 0; }`).
3. "Coffee won't fix that. / Water with the right salts will." with the sunrise (70svh).

Total about 2.3 screens, zero blank frames. If the pin stays, shorten to `end: "+=150%"` and overlap the timeline so the next
line starts arriving when the previous one is at 50% opacity.

### P1-7. The climax opens with three empty frames and ends without a button

`mob-45`, `mob-46`, `mob-47`: gradient plus two grey edge-on slivers for the first 25% of a 1.8-screen pin (about 430 px of
scroll), with the top of "START" poking in clipped at `mob-47`. In `mob-48` to `mob-50` "START YOUR" is scaled past the
screen: the S is cut at the left edge and the R at the right (`.climax-title` at 21vw with the 1.25 start scale).
Fix: on phones `end: "+=90%"`; start the sticks face-on and already 60% in frame at progress 0; cap the title with
`.climax-title { font-size: 19vw; }` and animate scale 1.0 → 0.92, not 1.25 → 0.9; add the button from P0-3.4.

### P1-8. In the day panels the stick is 14% of the screen width

`mob-24`, `mob-29`: the stick is about 60 × 250 px inside a 325 px square with 150 px of empty colour on each side. Its label
reads bottom-to-top, so even the flavour name needs a head tilt, and everything else on it is unreadable. The page already
owns the right picture: the Boxes-of-30 image (`mob-55`) shows the stick lying down with the label reading left to right.
Fix on phones: lay the stick on its side at 92vw wide, about 90 px tall, tilted 8 to 10°. Either use the box image (cropped
16:6) or rotate the float canvas: `.r-visual .seq { width: 325px; height: 325px; margin: -88px auto; transform: rotate(80deg)
scale(1.5); }`. The product becomes 1.5× larger, the name reads upright, and the visual row drops from 325 px to 150 px,
which pays for the Add button.

### P1-9. The packs section is not yet a mobile shop

- **Weekly card is about 730 px tall** (`mob-54`): a 356 px square image in which the four sticks occupy 240 px, then four
  full-width time rows, then price and button. At a real 760 px viewport the picture and the price are never on screen
  together. Fix: `.pack-hero .pack-img img { aspect-ratio: 16 / 10; }` (saves 134 px); `.pack-days { grid-template-columns:
  1fr 1fr; }` (saves 76 px). Target 520 px.
- **The Sampler has no picture** (`mob-55`). It is the likeliest first purchase for this audience and it is a text box. Add
  the trio image at 16:10, or four small sticks in a row, 120 px tall.
- **Buttons**: on phones make the row `price | button` with `.pack-buy .btn { flex: 1; min-height: 52px; }` so every Add
  button is the same width and under the right thumb. Today they are three different widths (235, 142, 129 px).
- **Flavour picker** (`.seg button`): 35 px tall. Make it `min-height: 48px; font-size: 15px;` and show the flavour, not only
  the line name ("Rise & Brine · peach").
- **Per-stick price** appears only on the Weekly card. Show it on all three, 14 px.
- **Order**: on a phone consider Sampler first (฿590, lowest commitment), then Weekly, then Boxes.
- **After "Add"** the full-height drawer opens every time, which interrupts someone adding two things. On phones use a 3 s
  toast above the buy bar: "Added · View bag".
- 150 px of empty space under the note before the footer (`.packs-note { padding-bottom: 16vh; }` → `48px`).

### P1-10. The bag drawer

`mob-58`: the drawer is 380 px wide on a 440 px screen (`clamp(380px, 26vw, 720px)`), leaving a 60 px strip of blurred page
with half a logo in it. Fix: `@media (max-width: 760px) { .drawer { width: 100vw; } }`, or better a bottom sheet
(`top: auto; max-height: 86svh; border-radius: 24px 24px 0 0;`), which also puts the close control near the thumb.
- Close "×" is a 40 px glyph, about 24 px wide: give `.x` `width: 48px; height: 48px;`.
- Quantity buttons are 30 × 30 with 10 px between them: make them 44 × 44.
- "28 sticks" shares a line with the stepper; put the stepper on its own row.
- The only button is disabled ("Checkout opens at launch"), so the sheet is a dead end. Add one live action: "Tell me when it
  opens" (LINE or email) and a "Keep browsing" text button. Remove "Secure checkout by Shopify" while checkout is off.
- 560 px of empty paper between the line and the total: when there is one line, show the other two packs as one-tap add-ons.

### P1-11. The nav leaves a smudge on every screen, and "Shop" is a 36 px target

From `mob-08` to `mob-57` there is a grey blurred band across the top 15 px of nearly every frame: the hidden nav's
`box-shadow: 0 10px 40px -20px` still reaches into view because the pill is only moved up by 120% of its height. Fix:
`animate={{ y: hidden ? "-180%" : "0%", opacity: hidden ? 0 : 1 }}`.
"Shop" (`.btn-small`) is 36 px tall and the logo link 30 px: `.nav .btn-small { min-height: 44px; padding: 0 18px;
font-size: 15px; }`, `.nav-logo { display: grid; place-items: center; min-height: 44px; }`.

### P1-12. Six electrolytes: the ring says "3", and its text is 9 to 10 px

- `mob-30`, the first moment the whole ring is on screen, reads "3 electrolytes in every stick" under a headline that says
  six, with all six discs already drawn. The scrubbed count only reaches 6 when the ring's centre hits 55% of the screen.
  On phones do not scrub it: play 0 → 6 in 0.6 s when the ring is 40% visible, and never rest on any other number.
- Disc text at 92vw: element name 10 px (`.six-el span`), function 9 px at 70% opacity (`.six-el small`). The functions
  ("holds water where you need it") are the actual content and are unreadable. Fix on phones: drop the ring's small text and
  put a 2 × 3 grid of rows under it, each `Na  Sodium · holds water where you need it`, symbol 28 px, text 15 px, row 52 px.
  Or drop the ring to 64vw and let the list carry the meaning.
- 306 px of empty page between the ring and the next heading (`mob-31`): `.six { padding-bottom: 6vh; }`,
  `.food { padding-top: 10vh; }`.

### P1-13. Clock and sun on the day cycle (only if the horizontal version survives)

- The floating clock (`.ritual-clock`, 44 px, bottom right) is crossed by incoming copy on every hand-over: `mob-23` shows
  "~3 · 0 g · 500 ml" sliding under "06:44"; in `mob-25` the note "…Kids 4–12: half a s" runs into "12:42". At rest it
  repeats the time chip 430 px above it.
- Cascade bug: the phone rule `.ritual-sky { width: 86vw; top: 74px; }` (line 1498) is overridden by the later un-scoped
  `.ritual-sky { width: min(46vw, 1200px); top: clamp(64px, 7vh, 160px); }` (line 1668). The arc is therefore 202 px wide,
  not 378 px, and the "sun" is a 6 px red dot (`mob-22`). `.hero-after` and `.climax-title` were patched again in the block at
  1680; `.ritual-sky` was missed.
- Fix if kept: move the clock to the top right at 28 px on the arc's baseline (`top: 70px; bottom: auto;`), restore 86vw,
  sun radius 28 in the viewBox.

### P1-14. Hero middle and end frames

- `mob-12`, `mob-13`: "RISE. PUMP. GLOW. SNOOZE." (34 px, `top: 13svh`) is printed directly over the ghosted "HE DAILY", which
  is also cut off at the left edge. It reads as two headlines colliding. Fade the title to 0 on phones (`opacity: 0`, not
  0.07) or place the line under the sticks.
- Same frames: the bottom 266 px (28% of the screen) is empty, and from 59% to 100% of the pin there is no button on screen.
- `mob-08`: the title is half faded and sliding off the left edge while nothing else has changed; it looks like a glitch,
  not a move. All of this goes away with the un-pinned phone hero in P0-4.

### P1-15. Pour: the chapter starts without its heading

- `mob-33` and `mob-34`: "TEAR. POUR. SHAKE." at 25% opacity with no heading above; in `mob-33` they float alone on black
  under 300 px of nothing. `mob-35`, `mob-36`: "JUST ADD WATER" rises from behind a mask whose edge sits on the step labels,
  so "JUST" appears sliced and touching "01 TEAR." Show the heading at rest from the first frame on phones and give it
  air: `.pour-steps { margin-top: 20px; }` (now about 10 px).
- 82 px hole between the steps and the picture in 7 of 8 frames, reserved for the closing line that only shows at 100%
  (`mob-42`). Put that line under the picture, or as a caption inside the stage's bottom edge.
- The stick's label is upside down in every frame from `mob-37` on, and the stick is cropped by the card's right edge.
  Mirror the shot so the name reads upright.
- The stage itself is the right size (404 × 620 px) and survives short viewports because it flexes. Keep that pattern.

### P1-16. Footer

`mob-57`: tagline, logo, legal. No links of any kind: paleorobbie.com is plain text here and in the packs note, there is no
LINE or contact, no delivery or returns line, no Instagram, no Thai/English switch. For a private label sold by a grocer the
footer is where trust questions get answered. Add a row of 48 px links (Shop on paleorobbie.com · LINE · Delivery ·
Contact), make every "paleorobbie.com" a link, and raise the legal text to 14 px at 85% opacity (now 13 px at 75%).

### P2-17. Empty bands between chapters (phone)

| Where | Empty | Change |
|---|---|---|
| Six → Real food (`mob-31`) | 306 px | 12vh + 20vh → 6vh + 10vh |
| Real food lead → marquee → zeros (`mob-32`) | 140 px + 150 px | `.food-head { margin-bottom: 5vh; }`, `.zeros { margin-top: 6vh; }` |
| Zeros → pour (`mob-33`) | 300 px | `.food { padding-bottom: 8vh; }` |
| Top of For you (`mob-43`) | 191 px | `.you { padding-top: 10vh; }` |
| Bands → climax (`mob-44`) | 115 px, then blank gradient | `.you { padding-bottom: 4vh; }` |
| Packs note → footer (`mob-56`) | 150 px + 115 px | 48 px + 8vh |

### P2-18. Smaller alignment and state issues

- Stats row has uneven columns: "0 / caffeine" is wider than its number, so the three stats sit at irregular gaps
  (`mob-29` against `mob-24`). `.r-stats { display: grid; grid-template-columns: repeat(3, 1fr); }`.
- The "NO SUGAR…" block starts at x=28 while everything else starts at x=18 (`mob-33`): `max-width: 16ch` plus `margin: auto`
  centres it. `.zeros { margin-left: var(--gutter); margin-right: var(--gutter); }`.
- The band colour wipe leaves the band nearest the thumb half-coloured with text across the seam (`mob-43`). On phones set
  the wipe to finish by `top 80%`, or colour the bands statically.
- `mob-01`: for a moment the hero shows "THE DAILY / RITUA" half risen with the lead at 20% opacity. Fine as motion, but it is
  the frame a slow phone will hold longest.

---

## Text sizes found under the thresholds (at 440 px wide)

Body under 14 px, or informational text that functions as body:

| Text | Selector | Size |
|---|---|---|
| Usage note ("Kids 4–12: half a stick", "Adults only…") | `.r-note` | 12.5 px at 80% opacity |
| Legal paragraph and © line | `.foot-row` | 13 px at 75% |
| "Secure checkout by Shopify…" | `.drawer-note` | 13 px at 60% |
| "฿46 a stick" | `.price small` | 13 px at 70% |
| "28 sticks" in the bag | `.drawer-lines small` | about 13 px at 60% |
| Stick body copy (borderline) | `.r-body` | 14.5 px, 4 lines of about 62 characters |

Labels under 12 px:

| Text | Selector | Size |
|---|---|---|
| Electrolyte function ("muscle and nerve function") | `.six-el small` | 9 px at 70% |
| Electrolyte name ("POTASSIUM") | `.six-el span` | 10 px |

At the floor, should go up one step: `.r-stats span` 12 px, `.pack-badge` 12 px, `.r-chips li` 12.5 px, `.r-time` 13 px,
`.seg button` 13 px, `.btn-small` 13 px. Recommended phone minimums: 15 px body, 14 px for anything about dosage or safety,
13 px labels.

Reading load: the day panel carries 9 text blocks in 440 px (time, line, name, flavour, pitch, 4-line body, 4 to 5 chips,
3 stats, note). The chips repeat the body almost word for word. Drop one of the two on phones. Everything else is comfortable
(40 to 55 characters a line).

## Tap targets under 44 px

| Control | Now | Make it |
|---|---|---|
| Nav "Shop" | 66 × 36 | min-height 44 |
| Nav logo (back to top) | 62 × 30 | 44 high hit area |
| Drawer close "×" | about 24 × 40 | 48 × 48 |
| Quantity − / + | 30 × 30, 10 px apart | 44 × 44 |
| Flavour picker buttons | 174 × 35 | min-height 48 |
| Red product names in the bands | not tappable, look like links | real 44 px controls |

Fine as they are: hero buttons (52 px), all Add buttons (52 to 61 px), bag icon (44 px).

## Every frame that looks unfinished, empty, cramped or mid-transition

- Empty or near-empty: `mob-00`, `mob-14`, `mob-17`, `mob-19`, `mob-45`, `mob-46`.
- Mid-transition or sliced: `mob-01`, `mob-08`, `mob-16`, `mob-23`, `mob-25`, `mob-26`, `mob-27`, `mob-28`, `mob-33`,
  `mob-35`, `mob-36`, `mob-47`, `mob-48`.
- Collision or wrong state: `mob-12`, `mob-13` (two headlines), `mob-30` ("3 electrolytes"), `mob-31` (blank discs),
  `mob-56` (price missing), `mob-58` (60 px sliver).
- Cramped: `mob-24`, `mob-29` (the settled day panels, 56 px from overflowing at the best-case height).

## Outside my lane, one line each

- The sticks' labels and several headings carry gym language ("Pump It Up", "the classic beet-nitrate pump", "Lifters") on a
  page for grocery-shopping parents; the For-you bands are the only place the page speaks to them directly.
- The Weekly Ritual (28 sticks) and a box of 30 are both ฿1,290, which makes the bundle look like the worse deal; placeholders,
  but it will be noticed.
- The poured drink ends dark wine-red with a white rectangle artefact at the base of the glass (`mob-39` to `mob-42`).
- The phone downloads about 14.5 MB in 528 image-sequence frames at page load (7 MB for the hero alone), plus a full-screen
  particle canvas and a Three.js scene; test on mobile data inside LINE's and Instagram's in-app browsers, which kill heavy pages.

---

## The three changes that would make this 10x better (from this seat)

1. **Make the phone version a shop that tells a story, not a film that ends in a shop.** Sticky buy bar from the second
   screen, an Add button on each of the four stick cards and each audience band, and "Shop" landing on the packs. First price
   within 2 screens instead of 19.
2. **Un-pin the phone.** Hero rests on the four fronts; the fog becomes three plain screens; the day becomes four stacked,
   full-colour cards with the stick lying across them at 92vw. That takes the page from about 22 screens to about 12, removes
   every blank and half-way frame listed above, and makes the layout independent of viewport height.
3. **Design and QA at the heights phones really give** (440×750, 393×660, 375×548, inside Safari, LINE and Instagram), with
   three hard rules: nothing important is positioned by svh arithmetic, cards on their own background never inherit the page
   text colour, and nothing tappable is under 44 px or readable under 14 px.
