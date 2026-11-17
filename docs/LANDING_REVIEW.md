# Landing page: expert panel review and the rebuild (2026-11-15)

The first landing page worked as a film but "felt rough around the edges" and its copy did not land with the real buyers:
**current paleorobbie.com shoppers, not Hyrox athletes**. Six reviewers each evaluated the live page from 118 screenshots
(5K desktop and iPhone 17 Pro Max), the full copy, the scroll timings and the code. Their reports are in `docs/review/`.
This note is the synthesis: what they agreed on, what was decided, what was built, and what is still open for Jon.

## The panel

| Seat | Report | Verdict in one line |
|---|---|---|
| Product manager | `review/product-manager.md` | A brand film with a shop bolted on: no label, no first step, nothing to do while checkout is off |
| Marketing / copy | `review/marketing.md` | Written for people who already buy electrolytes and train; the shopper is a label-reading Bangkok parent |
| Brand, reading as Jon | `review/brand.md` | The pack is Paleo Robbie; the page was a startup page with the logo in a corner |
| Motion | `review/motion.md` | Timed around transitions, not content: paused screens were often empty, blurred or cropped |
| Desktop layout | `review/desktop-layout.md` | Product too small everywhere, small type at 16–18 px on 5K, a dozen visible collisions |
| Mobile layout | `review/mobile-layout.md` | A 22-screen film with the first price at screen 20; the sideways day cycle is wrong on a phone |

Every reviewer independently flagged the same first-screen problem: the hero opened on the **backs** of the sticks, with
"pending OEM spec sheet" and a dummy barcode readable, covering the product name.

## The seven decisions

1. **Change the reason to care: "Bangkok is thirsty work."** The dark "You wake up already behind / 2% / Coffee won't fix
   that" chapter is gone. It was hustle guilt, an unsourced near-cognitive claim, and a swipe at coffee, which Paleo Robbie
   sells. The new problem chapter is the heat: school run, air con, 34°. True for every shopper, no claim needed, and the same
   argument paleorobbie.com already uses to sell electrolytes ("you don't have to be a performance athlete").
2. **Paleo Robbie's page from the first screen.** "New from Paleo Robbie" lockup, written as "we", warm colours only (no black
   sections), maroon footer with the real logo. No knocks at other products on Paleo Robbie's shelf ("Six, not three" became
   "All six, in every stick").
3. **Open on the product.** A new Blender shot deals four pack **fronts** into a row as the curtain lifts. No back label is
   shown anywhere on the page. The hero is no longer pinned.
4. **Prove it.** A "What's in each stick" table with amounts (target formula), an honest "Real food first. Nothing
   artificial." (was "Made from food, not a lab", untrue of creatine, GABA and mineral salts), a marquee of only the
   ingredients physically in the sticks, the sweetener named, and all benefit wording moved to nutrient-function claims.
5. **Household voice, not gym voice.** "Before anything sweaty", "One for the grown-ups", "Not just for people in Lycra",
   "Drink the ones that fit your day". One name per stick in running copy (the line name).
6. **A shop and a first step.** The Sampler leads as "Start here"; every pack has a product image and a per-stick price; an
   FAQ answers salt, kids, fasting and "do I need all four". While checkout is off every buy button opens a waiting list,
   tagged with the pack, so demand can be counted by pack before the first order with the maker.
7. **Pacing and finish.** Phones get four stacked colour cards instead of a sideways scroll, and a buy bar that stays with
   the reader. Desktop keeps the sideways day but parks on each stick. Sections own their own colours (text can no longer
   vanish). One page edge, one type ramp (nothing under 22 px at 5K), bigger and sharper product renders.

## What changed, chapter by chapter

| Before | After |
|---|---|
| 4 s curtain every visit | 1.9 s, once per session, any input skips it, lifts without JavaScript |
| Hero: pinned, pack backs, "The Daily Ritual" hidden behind sticks | Not pinned. "New from Paleo Robbie · The Daily Ritual", "Bangkok is thirsty work.", four fronts dealt in |
| Fog: 3.4 dark screens, two thirds blur | Heat: 2.3 warm screens, four beats that each hold; plain blocks on phones |
| Day: 7.5 screens desktop / 2.1 on phone, never at rest | 5.2 screens desktop with a hold on each stick; four stacked cards on phones |
| "Six, not three" ring | "All six, in every stick" ring + the label table |
| "Made from food, not a lab" on black | "Real food first. Nothing artificial." on cream, real ingredients only, the no-thanks list |
| Pour: label upside-down, blown-out table, dead meter | Re-rendered: name upright, stick leaves, lighter drink; steps timed to the footage |
| For you: On GLP-1 / Parents / Lifters / Light sleepers | The whole house / Anyone who sweats / Light sleepers / Eating less, each with its stick and a button |
| Climax: pinned rainbow gradient, flat grey 3D sticks | Not pinned, cream, true-colour sticks dealt into a fan, fizz behind |
| Packs: Weekly first, two cards without images, dead-end bag | "Pick your pack": Sampler first, images on all three, waiting list |
| (none) | FAQ: "Good questions." |
| Black footer, logo a white blob | Maroon footer, real logo, links, plain legal line |

Page length: 27.4 screens → about 22 on desktop; first price is now reachable from a button on every screen.

## Still open (for Jon and the maker)

These are shown on the page under a "Preview. Formula and prices to be confirmed." ribbon. Each needs a decision or a
confirmation before a customer sees the page.

1. **Who each stick is for.** Rise & Brine and Pump It Up are family sticks (kids 4 to 12: half a stick). Glow Up
   (creatine) and Snooze Control (GABA) say "Recommended for adults" everywhere, not "adults only". If the maker
   confirms a kids' serving for Snooze Control, it can become the third family stick.
2. **Sweetener.** The page says "stevia leaf or monk fruit". Confirm which.
3. **Glow Up calories.** With 2.5 g collagen it is about 13 kcal, so it is the highest-calorie stick, while the pack
   bubble on Pump It Up says "Only 11 kcal".
4. **Pack art.** "Clear head" (Rise & Brine) and "No loading, no bloat" (Glow Up) bubbles, and "Kids 4–12: half a stick"
   on the Snooze Control back label, need the same claims check as the page.
5. **Collagen source** (fish or bovine): an allergen and diet question; must be stated.
6. **Prices** are indicative, and are now whole baht per stick that fall as the pack grows: Sampler ฿600 (12 sticks,
   ฿50 a stick), Weekly Ritual ฿1,260 (28, ฿45, "Save 10%"), box of 30 ฿1,290 (฿43, "Save 14%"), Glow Up box ฿1,470
   (฿49). Against the last round the Sampler is up ฿10, the Weekly up ฿110 and the Glow Up box down ฿20. There is no
   multi-box tier yet; a "two boxes or more" step (say ฿40 a stick) would make the ladder steeper.
7. **Where waiting-list sign-ups go.** They are logged by the site now; set `NOTIFY_WEBHOOK_URL` to send each one to a
   sheet, Slack or LINE. A LINE add-friend button can be added once the official account ID is confirmed.
8. **Buying route.** For existing customers the strongest button is "add to my Paleo Robbie order". The page promises the
   range is coming to the grocery; confirm, and decide whether this page keeps its own checkout at all.
9. **Wilder.** The page no longer compares. One line for the room: Wilder is the hard-training stick; The Daily Ritual is
   the everyday household one, morning to night.
10. **Domain.** It lives at dailyritual.cathnivore.com; it needs a paleorobbie.com address before customers see it.
11. **Photography.** The brand reviewer's "one screen that makes Jon say yes" includes a real photo of four iced glasses
    with their ingredients. Everything on the page is a render; a shoot is the next step once samples exist.
12. **All claim wording** to be cleared by the maker's regulatory contact as advertising, not only as label text.
13. **Three ingredient statements added on 2026-11-17 need the maker's spec sheet behind them:** "natural, unprocessed
    sodium from Thai sea salt" (true only if all the sodium comes from unrefined sea salt, not sodium citrate),
    "micronized creatine" (the spec says creatine monohydrate; ask for the micronized grade), and "magnesium
    bisglycinate: easy to absorb and gentle on your stomach" (the form is in `PROTOCOL.md`; the absorption and stomach
    wording needs the same claims check as the rest).
14. **GLP-1 question in the FAQ** names Mounjaro, Ozempic, Wegovy, Rybelsus and Saxenda for search. It says the sticks
    are a food and not a treatment, and sends the reader to their doctor. Naming prescription medicines in food
    advertising should be cleared with the regulatory contact before launch.

