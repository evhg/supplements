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

## 3. OEM quote (as received)

- Unit price **USD 0.25/stick**, based on **30,000 sticks per flavour**; the quote covers one flavour
- Packing: 30 sticks/box, 1,000 boxes, **USD 7.50/box** (= USD 0.25/stick for packaging)
- Landed cost before freight/FDA: about **USD 0.50/stick, USD 15/box**, USD 15,000 for 30k sticks
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

- **Our target (−20%)**: 30-pack at **≈ ฿1,272 → list at ฿1,290 (฿43/stick)**; subscribe ≈ ฿1,120 (฿37/stick).
  Cost ≈ USD 15/box (≈ ฿500 at ~฿33–35/USD) before freight, FDA and fees, so roughly 55–60% gross margin on the one-off price.
- ⚠️ **The OEM's flavours (Watermelon, Pineapple, Peach, Pomelo, Strawberry) are four of Wilder's five.** The OEM may be
  Wilder's own manufacturer. If its base formula is Wilder's, we would inherit the "not good enough product".
  Ask the OEM directly (question 7) and compare the sample spec against Wilder's.

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

1. Full spec sheet per stick: Na, K, Mg, Ca, Cl, sugar/sweetener, calories, vitamins, stick weight (g).
2. Does **USD 0.25** still apply if 30k sticks are split across 2–3 flavours? If not, what is the price per stick at 10k/15k per flavour?
3. Can they make custom formulas (e.g. + magnesium glycinate for sleep, + caffeine/L-theanine for focus, + creatine), and what are the MOQ and price?
4. Thai FDA: timeline and cost to register, which product category (dietary supplement vs. beverage powder), and **will the FDA accept the innuendo product names?** The FDA reviews product names, so this needs checking before we design labels.
5. Lead time from artwork sign-off to delivery, and shelf life.
6. Is the 7.50 USD box price for printed custom boxes, and is the stick film printed per SKU or with a generic print plus a sticker?
7. Do they manufacture for WILDER (or other Thai brands) with the same base? If yes, what formula changes can we make so ours is clearly different and better?

## 6. Blocker: Blender on Erik's Mac

This session runs in the cloud and can't reach the Mac directly. Remote Control lists two folders on
`Macbook-M3-Max---Erik` (`kinetiq-render`, `sleep-lab-home`), but the Mac doesn't offer them to cloud sessions. To fix:

- Update the Claude desktop app on the Mac.
- Make sure the render folder is not inside a hidden folder under `~` (e.g. `~/.something/`) or under `~/Library`.
- Check it's enabled in Claude desktop → Settings → Claude Code → Remote Control.

Once it shows up as available, I'll connect and render. Until then I can prepare the label art and the Blender scene script here.

## 7. Risks to keep in view

- **Thai FDA and ads.** Supplement ads in Thailand need FDA approval, and health claims are tightly limited. The
  cheeky names have to pass both the product-name review and the ad review.
- **Brand fit.** Innuendo names on a "real food", family-oriented Paleo Robbie label could clash with how PR sells.
  Test the names with Robbie early.
- **Unit economics.** At 30k sticks over 2–3 flavours, the per-stick price may be above USD 0.25 (question 2).
  Margin depends on Wilder's price after the −20%.
