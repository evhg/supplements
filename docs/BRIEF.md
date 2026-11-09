# Project brief: Paleo Robbie electrolyte & creatine sticks

_Version 1, 2026-11-08. Built from the kickoff interview; replaces the original prompt._

## 1. Goal

Run a proof of concept for a powdered-stick supplement line, sold as a **Paleo Robbie private label** in **Thailand only**.
The first run uses a Thai OEM's existing base formulas and samples. If it sells, the work feeds a longer-term
plan: build our own brand rather than invest in Wilder (Wilder executes well but its product isn't good enough).

## 2. Decisions made

| Topic | Decision |
|---|---|
| Brand on pack | **Paleo Robbie** private label, styled like the existing PR range (ketchup, BBQ, hot dogs): white label, PR red `#8C000D`, pink panel, black hand-drawn icon, "Nothing processed / Nothing artificial" speech bubble. Logo: `reference/paleo-robbie-logo.svg` |
| Market | Thailand only (Paleo Robbie is a Bangkok online grocery with nationwide delivery) |
| Sales channels | 1) our own landing page with a simple checkout, 2) paleorobbie.com grocery. No other channels |
| Landing page stack | **Shopify**, a minimal store |
| Naming tone | **Cheeky innuendo**: double meanings that pass Meta/Google ad review and suit a family grocery shelf (e.g. *Tight Peach*, *Make Me Grape(fruit)*). Nothing explicit |
| First order | **Electrolytes only**, 2–3 flavours, 30,000 sticks in total. Creatine goes in the second order |
| OEM | Thai factory; it handles the Thai FDA (อย.) registration and Thai label |
| Pricing | **20% below Wilder's Shopify price** for the same pack size |
| Deliverables location | Markdown in this repo under `docs/` |

### Decisions, round 3 (2026-11-08)

- **Brand is Paleo Robbie, and the logo stays on pack.** Product names don't include "Paleo" or "Robbie"; the line name (THIRSTY) and flavour name lead.
- **Launch names fixed for now:** Tight Peach, Pomel-Oh!, Wet Melon.
- **Wilder stays on PR's shelf next to ours.** It acts as the reference point the in-house sticks compare well against (price, flavour, PR's real-food promise).
- **Backdrop:** user chooses from a side-by-side render (cream / PR pink / whitewashed wood).
- **Base formula: complete electrolytes** (all 6: sodium, chloride, potassium, magnesium, calcium, phosphate), not a copy of Wilder's L-theanine. Spec: `FORMULA_THIRSTY.md`.
- **Every stick is zero calorie** (under ~5 kcal per stick): no sugar, fruit powder, juice solids or honey. This rules out banana-water style products.
- **Launch waits for the custom formula.** We don't launch on the OEM's standard base.
- **All renders and image encoding run on Erik's M3 Max** (Kinetic local mac rendering session, `~/supplements-render`).

## 3. OEM quote (as received)

- Unit price **USD 0.25/stick**, based on **30,000 sticks per flavour**; the quote covers one flavour
- Packing: 30 sticks/box, 1,000 boxes, **USD 7.50/box**. That's 30 × USD 0.25, so the box price restates the stick price; it isn't an extra charge (confirm, question 6).
- Cost: about **USD 0.25/stick all-in, USD 7.50/box, USD 7,500 for 30k sticks** (corrected 2026-11-09; earlier versions double-counted the box)
- Flavours available now: Watermelon, Pineapple, Peach, Pomelo, Strawberry

## 3b. Wilder: public facts (wilder.co, checked 2026-11-08)

- Company: Besoda Pte Ltd (Singapore), FDA-registered in Thailand; 450+ retail doors (Supersports, gyms), now also in Singapore
- One product: **WILDER Electrolytes**, 10.9 g sachet: **1,000 mg Na, 600 mg K, 100 mg Mg, 40 mg L-theanine**, zero added sugar, caffeine-free, keto/fasting
- Flavours: **Pineapple, Strawberry, Yuzu, Peach, Watermelon** (Watermelon sold out)
- Positioning: "Performance hydration… made for Asia's heat": Hyrox, running, functional fitness, Wilder Training Club community
- Prices (VAT incl.):

| Offer | Price | ฿/stick |
|---|---|---|
| 30-pack, one-off | ฿1,590 | 53 |
| 30-pack, subscribe (1st order / after) | ฿1,200 / ฿1,400 | 40 / 47 |
| 12 variety pack | ฿695 | 58 |
| Single sachet at retail (Sunshine Market) | ฿60 | 60 |
| Running promo: buy 3 get 1 free | ≈ ฿1,193 per box | ≈ 40 |

- **Our target (−20%)**: 30-pack at **฿1,270 incl. VAT (≈ ฿42/stick)**; subscribe ≈ ฿1,120 (฿37/stick).
  **Paleo Robbie already stocks the full Wilder range** at ฿1,490 ex VAT, so on PR we list at **฿1,190 ex VAT**. See `ANALYSIS.md` §4.
  Cost ≈ USD 7.50/box (≈ ฿250–260 at ~฿33–35/USD) before freight, FDA and fees, so roughly 75–80% gross margin on the one-off price (฿1,187 ex VAT).
  These figures are for the OEM's standard base; the custom complete-electrolyte formula will cost more (pricing research in progress).
- ⚠️ **The OEM's flavours (Watermelon, Pineapple, Peach, Pomelo, Strawberry) are four of Wilder's five.** The OEM may be
  Wilder's own manufacturer. If its base formula is Wilder's, we would inherit the "not good enough product".
  Ask the OEM directly (question 7) and compare the sample spec against Wilder's.

## 3c. Where the work is

- `ANALYSIS.md`: competitor table (Royal-D, Wilder, tenplus, HYDRTE), segment map, Paleo Robbie category fit
- `PRODUCT_RANGE.md`: lines, flavours, names, launch split, pricing
- `research/wilder-handoff.md`: research from the Wilder chat (§§1–5; the confidential data-room section is deliberately left out)

## 4. Workstreams, in order

1. **Wilder recap.** *Waiting on you:* paste the key points from the Wilder chat (segments, product gaps, new-product ideas).
   I'll also pull Wilder's current Shopify range and prices so we can set the −20% price.
2. **Competitor brand and segment analysis.** Paleo Robbie's own private-label range (reference), **tenplus**
   ("Hypotonic Hydration": Tropical Citrus, Mango, Sea Salt Lemonade, Pineapple), **HYDRTE** ("Electrolyte Complex",
   Bali: 350 mg Na, 250 mg K, 710 mg Cl, 100 mg Mg, 50 mg Ca, 50 mg phosphate, zero sugar, 12- and 30-stick boxes,
   Blood Orange / Strawberry Kiwi / Citrus), plus **Wilder** and whatever is on Thai shelves (LMNT and others).
   Output: positioning map, formula/price-per-stick table, pack and design comparison, segments nobody owns.
3. **Product range.** Full range (electrolyte functional variants, value-added creatine, later SKUs) with versions,
   flavours and names, mapped to segments. Mark which items the OEM's current flavours cover and which need new formulas.
4. **paleorobbie.com category fit.** Audit the grocery categories, choose where the sticks are listed, and propose a
   category we can own (e.g. "Hydration & Performance").
5. **3D renders.** Blender stick renders (2–3 launch SKUs, sticks and the 30-box) on Erik's M3 Max, same pipeline as
   Kinetiq. *Blocked:* see §6.
6. **Landing page.** Minimal Shopify store, Thai and English, Thai payment methods (PromptPay, cards).

## 5. Questions for the OEM

The samples' contents are unknown, so these decide which functional claims and names we can use:

1. Full spec sheet per stick: Na, K, Mg, Ca, Cl, sugar/sweetener, calories (must be 0 kcal on the label), vitamins, stick weight (g).
2. Does **USD 0.25** still apply if 30k sticks are split across 2–3 flavours? If not, what is the price per stick at 10k/15k per flavour?
3. Can they make our **custom Thirsty formula** (`FORMULA_THIRSTY.md`: all 6 electrolytes, magnesium bisglycinate, natural sweetener) in 3 flavours? MOQ, price per stick, lead time, and its own FDA registration? Later: + creatine (Swole Mate), + magnesium glycinate and glycine (Pillow Talk).
4. Thai FDA: timeline and cost to register, which product category (dietary supplement vs. beverage powder), and **will the FDA accept the innuendo product names?** The FDA reviews product names, so this needs checking before we design labels.
5. Lead time from artwork sign-off to delivery, and shelf life.
6. Confirm USD 7.50/box is the all-in price (30 × 0.25, printed box included), not an extra charge. Is the stick film printed per flavour, or generic with a sticker?
7. Do they manufacture for WILDER (or other Thai brands) with the same base? If yes, what formula changes can we make so ours is clearly different and better?
8. Sweetener, flavourings and colours in the base: does it meet Paleo Robbie's "nothing artificial" promise (no sucralose/acesulfame/artificial flavours)?

## 6. Blocker: Blender on Erik's Mac

This session runs in the cloud and can't reach the Mac directly. Remote Control lists two folders on
`Macbook-M3-Max---Erik` (`kinetiq-render`, `sleep-lab-home`), but the Mac doesn't offer them to cloud sessions. To fix:

- Update the Claude desktop app on the Mac.
- Make sure the render folder is not inside a hidden folder under `~` (e.g. `~/.something/`) or under `~/Library`.
- Check it's enabled in Claude desktop → Settings → Claude Code → Remote Control.

Once it shows up as available, I'll connect and render. Until then I can prepare the label art and the Blender scene script here.

## 7. Risks to keep in view

- **Registration category (found 2026-11-09).** A zero-sugar formula can't be a Thai "electrolyte drink" (MOPH No. 195 makes sugar mandatory). Wilder is registered as a "Multi Mineral Beverage". The OEM must confirm our category, and the stick's "ELECTROLYTE DRINK MIX" wording may have to change. See `SOURCING.md` §5.

- **Thai FDA and ads.** Supplement ads in Thailand need FDA approval, and health claims are tightly limited. The
  cheeky names have to pass both the product-name review and the ad review.
- **Brand fit.** Innuendo names on a "real food", family-oriented Paleo Robbie label could clash with how PR sells.
  Test the names with Robbie early.
- **Unit economics.** At 30k sticks over 2–3 flavours, the per-stick price may be above USD 0.25 (question 2).
  Margin depends on Wilder's price after the −20%.
