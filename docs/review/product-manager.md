# Product manager review: The Daily Ritual landing page

## Verdict

The page is a brand film with a shop bolted on at the end: a Paleo Robbie shopper learns the four names and the day cycle, but never gets a label, a per-day price, a reason to pick this over the Wilder stick next to it, or a way to act while checkout is off. The offer is built backwards for a first purchase (the ฿1,290 four-a-day box is the hero, it costs more per stick than a single box, and half of it is tied to training), and the page cannot decide whether it sells a four-a-day protocol or "pick the stick your day needs". Several claims are printed as fact that PROTOCOL.md marks as unconfirmed or contradicts (kids on the GABA stick, "no sugar" on the beet stick, Glow Up's calories, fruit flavours listed as real food), which is the fastest way to lose a label-reading audience and the CEO in the same meeting.

Sources read: `copy.txt`, `lib/products.ts`, `site/README.md`, `docs/PROTOCOL.md` §1 to §8 and §10, `docs/ANALYSIS.md`, `ForYou.tsx`, `Climax.tsx`, `CartDrawer.tsx`, `lib/cart.tsx`, and the desk and mob screenshots for hero, ritual, six, food, pour, you, climax, packs, footer and bag drawer.

---

## Findings, ranked by impact

### 1. P0: With checkout off, the page captures nothing. The only action is a dead end.

**What is wrong.** `desk-58-bag-drawer.jpg` / `mob-58-bag-drawer.jpg`: the bag ends in a disabled striped button, "Checkout opens at launch", above "Secure checkout by Shopify". `packs-note` promises "Fill your bag now and it'll be waiting", but the bag lives only in `localStorage` (`lib/cart.tsx`, key `ritual-bag-v1`): Paleo Robbie never learns who wanted what, and the shopper's bag is gone on another device. `desk-53-climax-stage-1.jpg` says "Your first glass is tomorrow, 07:00", which is untrue today. There is no launch date, no email field, no LINE button anywhere.

**Why it matters.** Before launch this page has one job: turn Paleo Robbie's existing customers into a counted waiting list, by pack. The MOQ is 30,000 sticks split about 7,500 per formula (PROTOCOL §10.6). Jon's first commercial question is "how many will I sell and in what mix?", and today the page gives him zero data.

**Fix.**
- Replace every buy button while `CHECKOUT_LIVE` is false with one action: **"Tell me when it lands"**. It opens a sheet with two options: "Add us on LINE" (Paleo Robbie's LINE Official Account; LINE is the default channel in Thailand) and an email field. Keep the pack choice as the first step of that sheet ("Which one are you after? Sampler / Weekly Ritual / A box of one stick"), and store the choice with the sign-up so Jon gets demand by pack and by stick.
- Bag drawer footer becomes: "Launching [month]. Leave your LINE or email and we'll hold launch price for you." Remove "Secure checkout by Shopify" until checkout is live.
- Climax sub-line: "Your first glass is tomorrow, 07:00." becomes "Launching [month] at Paleo Robbie. Be first in line." Restore the 07:00 line when checkout opens.
- Packs note: "Checkout opens at launch. Fill your bag now and it'll be waiting." becomes "Not on sale yet. Tell us which pack you want and we'll message you the morning it's in stock."

### 2. P0: Claims the page states as fact that PROTOCOL.md does not support

Each of these can be caught by reading the stick back, which this audience does. Fix all of them before the CEO sees the page.

| # | On the page | PROTOCOL / reality | Exact fix |
|---|---|---|---|
| a | "Kids 4–12: half a stick" on **Calm O' Mile** (panel note, Parents band "Three of the four", hero stick back) | §3: "½ stick (GABA: confirm for children)"; §10.5 is an open OEM question | Until confirmed: family sticks are Rise & Brine and Pump It Up. Parents band tag "Two of the four"; Calm O' Mile note "Herbal, caffeine-free. No melatonin. Adults for now: kids' serving being confirmed." |
| b | "NO SUGAR." range-wide (`desk-33-food-0_7.jpg`), hero "zero sugar"; the Pump It Up panel quietly swaps its sugar stat for "0 caffeine" | Pump It Up is 11 kcal *because* of real beetroot and watermelon powder (§1b), so it carries natural sugars | Range-wide: "**No added sugar.**" Pump It Up stats: "11 kcal / [x] g natural sugars from beet and watermelon / 600 ml". Hero: "no added sugar". |
| c | Glow Up shows no kcal; Pump It Up's bubble says "Only 11 kcal" as the one exception | §3: Glow Up is "~3, or ~13 with collagen". With 2.5 g collagen it is the highest-calorie stick | Show kcal on all four panels. Glow Up: "~13 kcal, from the collagen". Decide whether "Only 11 kcal" still deserves the on-pack bubble. |
| d | Marquee under "MADE FROM FOOD, NOT A LAB" lists PEACH, LEMON, APPLE, ORANGE, LIME; body says every stick "leads with something you could find in a Thai market", including COLLAGEN | §1b real-food table lists only sea salt, ginger, holy basil, beetroot + watermelon powder, collagen, chamomile flower. The fruit names are flavours (the stick back in `desk-06-top-0.jpg` says "peach, holy basil & lemon flavour"). §1b's own honest notes: creatine is "the one non-food active"; B vitamins are fortification | Marquee = real ingredients only: Thai sea salt, holy basil, ginger root, beetroot, watermelon, chamomile flower, marine/bovine collagen. Headline: "**Led by real food. Honest about the rest.**" Body: "Every stick leads with a real ingredient: Thai sea salt, holy basil, beetroot, chamomile flower. The fruit taste comes from natural flavours. The minerals, vitamins and Glow Up's creatine are listed in full below, with amounts." |
| e | "GABA + glycine: the Japanese evening pairing" leads the sleep stick | §2: glycine is capped at 100 mg, "a token amount" (Glyna uses 3 g); inositol likewise | Lead with what is dosed: "120 mg magnesium (bisglycinate) and real chamomile flower, with GABA 100 mg." Drop "Japanese evening pairing". |
| f | "Wind down, then sleep through", "Timed so you sleep through", "so you sleep through" | Drink-mix route: nutrient-function wording only; a sleep outcome is a health claim | "Wind down early." / "Your last glass of the day, early enough that the night stays yours." Keep the 2–3 hours timing: it is an instruction, not a claim. |
| g | "more blood volume and the beet-nitrate pump"; "30 minutes before training" | §4 says all wording must be checked against Thai claim rules; beet dose is unset and capped by the 11 kcal budget; nitrate peaks hours after drinking, not 30 minutes | "Real beetroot, real watermelon and the most sodium of the four (900 mg), for the hour you sweat. No caffeine." Ask the OEM for the beetroot mg before printing "pump" anywhere. |
| h | "Most of us live there." (fog) | Not in PROTOCOL; unsupported | "In Bangkok, that takes less than you'd think." |
| i | "On an empty stomach" (Rise & Brine note and stick back) | Not in PROTOCOL; sits oddly with "the gentle one" for people with a small appetite | "First thing, before coffee." |
| j | "no bloat" (absolute) | §5: "water retention is lower" | "No loading phase, so less water weight." |

Also missing from the page although PROTOCOL has it and this audience wants it: **no L-theanine, no melatonin** (§1; "no melatonin" is the single most reassuring line for a parent looking at a sleep stick), magnesium **bisglycinate**, collagen **2.5 g**, vitamin C 80 mg, and sodium / potassium / magnesium per stick.

### 3. P0: There is no label. A label-reading audience is asked to buy on adjectives.

**What is wrong.** Nowhere on the page is there an ingredients list or a nutrition panel. The only per-stick numbers are kcal, water volume, "900 mg sodium" and "2.5 g creatine". The sweetener is never named, although the page says "zero sugar" and "no artificial sweeteners" (so what makes it sweet?). The collagen source (fish or bovine, per §1b) is not stated, which is an allergen and a diet question. The first frame of the page (`desk-06-top-0.jpg`, `mob-06-top-0.jpg`) shows the stick backs, where the legible text is "Ingredients & nutrition: pending OEM spec sheet" and an FDA number of "XX-X-XXXXX-X-XXXX".

**Why it matters.** The brief describes these shoppers as people who "read labels, distrust ultra-processed food". Paleo Robbie's whole equity is that you don't have to take its word. A page with more animation than information reads as the opposite.

**Fix.** Add a "What's in each stick" block directly under the four-stick chapter: one table, four columns, rows for sodium, potassium, magnesium (bisglycinate), calcium, phosphate, chloride, the extras with mg, kcal, sugars, sweetener, and a full ingredients line per stick. Use the §3 numbers and mark the block "Target formula, being finalised with our maker" until the OEM sheet arrives. Start the hero on the stick fronts, not the backs with placeholder text.

| | Rise & Brine | Pump It Up | Glow Up | Snooze Control |
|---|---|---|---|---|
| Sodium | 500 mg | 900 mg | 400 mg | 150 mg |
| Potassium | 300 mg | 400 mg | 400 mg | 300 mg |
| Magnesium | 75 mg | 50 mg | 75 mg | 120 mg |
| Extras | B6, B12, C, ginger, holy basil | beetroot, watermelon | creatine 2.5 g, collagen 2.5 g, vitamin C 80 mg | GABA 100 mg, glycine 100 mg, chamomile |
| kcal | ~3 | ~11 | ~13 | ~4 |

### 4. P0: The page never decides: four a day, or pick yours?

**What is wrong.** Hero: "One stick for each, every day." Ritual: "Together they make the ritual." Then "WHICH PART OF THE DAY IS YOURS?" and a Sampler "to find the one your day was missing". The first frame says buy four; the last third says buy one.

**Why it matters, with the numbers the page omits.**
- **Cost.** All four every day is ฿179 a day from boxes of 30 (3 × ฿1,290 + ฿1,490 = ฿5,360 a month), or ฿184 a day from the Weekly Ritual. A couple is about ฿10,700 a month. The Wilder stick beside it is one stick, ฿53. The page never states a daily cost, so the shopper does the sum at the bag and leaves.
- **Salt.** Four sticks are 500 + 900 + 400 + 150 = **1,950 mg of sodium a day**, about the whole WHO daily guideline before any food. A health-conscious parent will ask. So will Jon.
- **Training.** Two of the four are "Before you train" and "After you train". The Weekly Ritual holds seven of each, so the hero product assumes training seven days a week. That is the Hyrox buyer the brief says this is not.
- **Volume.** 1.9 litres of flavoured water a day is a lot to ask as a first step (it is also a good line once the shopper is in: "1.9 litres of your day's water, sorted").

**Fix.** Make "start with one, build to four" the stated logic of the range, everywhere:
- Hero sub-line: "Four drink-mix sticks from Paleo Robbie, one for each part of your day. Start with the one your day needs. Six electrolytes, real Thai ingredients, no added sugar, no caffeine. From ฿43 a glass."
- Ritual intro: "Each one does one job: morning, movement, strength and skin, wind-down. Take one, take two, or run the whole day."
- Say which sticks are everyday and which are for active days: Rise & Brine and Snooze Control every day; Glow Up every day (creatine only works taken daily, which "After you train" hides); Pump It Up on days you sweat.
- Add the sodium line to the FAQ (finding 9) instead of hoping nobody adds it up.

### 5. P0: Pack structure and price framing are wrong for a first purchase

**What is wrong** (`desk-54-packs--0_1.jpg`, `mob-54` to `mob-56`, `lib/products.ts`).
- The hero pack is the Weekly Ritual at ฿1,290 for 28 = **฿46 a stick**. A box of 30 is ฿1,290 = **฿43 a stick**. The same 28 sticks bought pro rata from boxes would be about ฿1,251, so the bundle carries a 3% penalty and the page prints "฿46 a stick" under it as if it were a saving.
- The Sampler card (`desk-54`) is two lines of text and an empty box: no image, no per-stick price, no contents list. It is the most likely first purchase and looks like an afterthought.
- "Boxes of 30" is badged "Refill one", which tells a first-time buyer it isn't for them. But a shopper who just read "Light sleepers: Snooze Control" wants exactly one box of that.
- The segmented control shows "Rise & Brine / Pump It Up / Glow Up / Snooze Control" with no flavour, and Glow Up's higher price (฿1,490) only appears after you tap it.
- Neither the Weekly Ritual nor the Sampler says it contains Glow Up (adults only, creatine). A parent buying "the family ritual" finds out on the pack.
- The bag says "Prices in Thai baht, VAT included", while paleorobbie.com lists ex VAT (ANALYSIS §4: Wilder ฿1,490 ex VAT, about ฿1,594 with). Glow Up at "฿1,490" will look like the same price as Wilder on Jon's own shelf when it is 7% cheaper.
- Prices are placeholders but nothing on the page says so. Jon will anchor on whatever number he sees.

**Fix.**
- **Order and default:** 1) **The Sampler, "Start here"**, visually the hero card; 2) Box of 30, "Found your stick?"; 3) The Weekly Ritual, "The full day, for a week". A ฿590 add-on fits a Paleo Robbie grocery basket; a ฿1,290 four-a-day commitment does not, as a first step. It also matches the market: Wilder's 12-pack is ฿695 ex VAT on the same shelf and Simplify's variety pack is ฿590.
- **Sampler copy:** "12 sticks: three of each. Taste all four, keep the ones your day wants. ฿590 (฿49 a stick)." Drop "to find the one your day was missing": three days cannot show you what creatine or collagen do, so sell it as a taste test.
- **Box of 30:** show all four as rows with flavour, price, and price per day: "Rise & Brine · peach, holy basil & lemon · ฿1,290 · ฿43 a day". Badge: "Your daily one". Add "Glow Up ฿1,490 · ฿50 a day" visibly.
- **Weekly Ritual:** price it at or below pro rata (฿1,190 = ฿42.50 a stick) or drop the per-stick line. Add "฿170 a day for all four" and "Includes 7 Glow Up sticks: adults only".
- **Frame per day, against something they already buy:** "฿43 a glass. Less than half a Bangkok latte."
- **For the CEO build:** a small "Indicative pricing" tag on the packs, one VAT basis stated the same way as paleorobbie.com, and a slide (not the page) with the shelf comparison: ours ฿43 vs Wilder ฿53 incl. VAT, minus 19%.
- **After launch:** add reorder. ANALYSIS §3.5 already names the play: "add sticks to your meal plan" and a subscribe price on boxes of 30. Wilder sells ฿40–47 on subscription; without one, the ฿43 advantage disappears for repeat buyers.

### 6. P0: Nothing on the page says why this beats the Wilder stick beside it

**What is wrong.** The only comparative chapter is "SIX, NOT THREE." It rests on 50 mg of calcium and 30 mg of phosphate (§3), amounts the page wisely does not print, and "muscle function" for calcium at about 6% of a daily value may not survive a claims check. The real advantages are scattered or absent: no L-theanine is not mentioned once; "no caffeine" is there; the lower, time-of-day sodium (150 to 900 mg against a flat 1,000) is never framed as a benefit; the price advantage is invisible; kid-friendliness is in one band.

**Why it matters.** This is the first question in the room: "It sits next to Wilder on my shelf. Why does my customer pick mine, and does this page insult a supplier I keep?"

**Fix.** Add a short "How it compares" block after the label table, without naming anyone:

| | A typical sport electrolyte stick | The Daily Ritual |
|---|---|---|
| Made for | race day and heavy sweat | an ordinary day, morning to bedtime |
| Sodium | around 1,000 mg, every time | 150 to 900 mg, set by the time of day |
| Electrolytes | three or four | all six |
| Extras | stimulants or L-theanine | none. No caffeine, no L-theanine, no melatonin |
| Kids | not designed for them | two family sticks, half a stick for ages 4–12 |
| Leads with | flavour | real Thai ingredients: sea salt, holy basil, beetroot, chamomile |
| Price | about ฿53 a stick | from ฿43 |

Demote "Six, not three" from a full chapter to one row of this table plus the six-circle graphic as its illustration.

### 7. P1: The chapter order hides the product and the price

Scroll budget from `timing-desk.json`: the page is 27.4 screen-heights; 16.4 of them are pinned set pieces (hero 1.7, fog 3.4, day 7.5, pour 2.0, climax 1.8). The first price appears about 25 screen-heights in (about 20 of 22.4 on mobile).

| Chapter | Buyer's question it answers | Where the buyer drops | Fix |
|---|---|---|---|
| Intro curtain 5.5 s + hero | "What is this?" Partly: "sticks" is never explained as a drink mix until chapter 6; "from Paleo Robbie" is only a logo; no price | Returning visitors wait 5.5 s every time; first frame is barcodes | Curtain once per visitor, under 2 s. Hero says drink mix, Paleo Robbie, "from ฿43 a glass". CTAs: "Find your stick" (to the day) and "Tell me at launch" |
| Fog, 3.4 screens | "Why would I need it?" A generic dehydration argument that sells the whole category, Wilder included, and only the morning stick | Longest wait before any product | Cut to about 1.2 screens and three lines ending on "Water with the right salts will", or fold it into the Rise & Brine panel |
| The day, 7.5 screens desktop | "Which stick does what?" The best chapter, but no price, no buy or save action, no who-it's-for line on any panel | Peak interest in one stick, nothing to do with it | On each panel add one line "For: ..." , the price per day, and a button "Add a box · ฿1,290" / "Tell me at launch". Cut to about 5 screens |
| Six electrolytes | "Is it different?" Weakly (finding 6) | | Merge into the comparison block |
| Real food | "Can I trust what's in it?" With a marquee, not a label (findings 2d, 3) | Label readers | Replace the marquee-only chapter with real-ingredient cards plus the label table |
| Just add water, 2 screens | "How do I use it?" Nobody was wondering | | One screen. Add what is actually unknown: how it tastes, how salty, cold or room temperature, shaker or glass |
| For you | "Which is mine?" Arrives after the shopper has already read all four | Tags like "Rise & Brine" are plain text, not links (`ForYou.tsx`) | Move it up as a picker before or inside the day chapter; each band ends in a button that selects that stick in the packs |
| Climax, 1.8 screens | none | A pinned animation between the decision and the shelf | Halve it |
| Packs | "What do I buy and what does it cost?" | Findings 1 and 5 | |
| Missing | FAQ; who makes it and where; Thai FDA status; delivery ("arrives with your Paleo Robbie order"); reorder; taste; Thai language | | Add an FAQ and a "Made by Paleo Robbie" strip between packs and footer |

### 8. P1: "For you" picks the wrong people in the wrong order

**What is wrong** (`desk-43-you-0.jpg`, `desk-44-you-0_8.jpg`). The four bands are On GLP-1, Parents, Lifters, Light sleepers. The headline asks "Which part of the day is yours?" and then sorts by persona, not by part of the day. The first persona a Paleo Robbie parent meets is a prescription-drug user. "Lifters" is the gym audience the brief excludes. The largest group on Paleo Robbie, the adult who does not train daily and wants to feel less flat in Bangkok heat, has no band. Nor does the woman of 40 to 55 for whom creatine plus collagen is the most relevant stick on the page.

**Fix.** Headline: "Which one is yours?" Bands, in this order:
1. **Parents.** "Two family sticks, half each." (three once GABA is confirmed for children.) Body adds the practical answer: "Split a stick between two kids, or share yours."
2. **Busy, hot, a bit flat by 3 pm.** "Start with the morning one." Rise & Brine.
3. **Staying strong after 40.** "Creatine and collagen, every day, training or not." Glow Up. Replaces "Lifters"; drop "water-balloon week" and "the pump".
4. **Light sleepers.** "Your last glass, early." Snooze Control.
5. **Eating lighter, or on a GLP-1.** Keep, but last and with the doctor line (finding 10).

### 9. P1: No FAQ, so every real objection goes unanswered

Add one before the footer. Draft questions and the answers the page should be able to give:
- **Do I need all four?** No. Most people start with one or two. All four is for days you train and sweat.
- **Isn't that a lot of salt?** Per stick: 500 / 900 / 400 / 150 mg. If you eat a salty diet, have high blood pressure or were told to limit sodium, stick to Rise & Brine or Snooze Control and ask your doctor.
- **Can my kids have it?** Which sticks, from what age, how much, how many a day. (Today the page does not say whether a child may have half of each family stick in one day; that would be about 775 mg of sodium and about 120 mg of supplemental magnesium. Get the OEM or a dietitian to set a daily maximum before this goes public.)
- **What about teenagers?** The page says "kids 4–12" and "adults only" and nothing for 13 to 17.
- **What sweetens it?** Name it.
- **Where does the collagen come from?** Fish or bovine; allergen line.
- **I train in the morning. Which do I take?** Today the clock (16:30, 18:30) assumes evening training. Suggested rule: on a morning-training day, Pump It Up replaces Rise & Brine.
- **Pregnant, breastfeeding, on medication?** Ask your doctor first; say so next to the sticks, not only in the footer (holy basil and GABA are the ones a doctor will ask about).
- **Does it break a fast? Is it keto / paleo?** ~3 kcal sticks; state it.
- **How is it different from the other electrolyte sticks you sell?** Point to the comparison table.
- **Who makes it, and is it registered?** Maker, city, GMP/HACCP, Thai FDA number when issued.
- **How do I get it?** With your Paleo Robbie delivery, or shipped on its own.

### 10. P1: GLP-1, adults-only and medical cautions are present but not safe enough

- **GLP-1.** The band says, in effect, "on this medication? this stick is for you"; the footer says "if you are on medication, ask your doctor first". The two contradict each other, and naming a drug class as a band title in an ad for a drink mix is exactly the kind of line a Thai FDA reviewer reads as a medical claim. Fix: band title "EATING LIGHTER"; body "On a GLP-1, or just eating less? Food brings about a fifth of your daily water, so a smaller appetite means less of it. Rise & Brine is the light one: ginger, no added sugar, about 3 kcal. On medication? Check with your doctor first." Get the wording cleared with the OEM's regulatory contact.
- **Adults only.** "Adults only. Max 1 stick a day." is the smallest text on the Glow Up panel, under the stats (`desk-27-ritual-07.jpg`, `mob-27-ritual-07.jpg`). Make it a visible chip beside "2.5 g creatine", repeat it on the Weekly Ritual and Sampler cards, and on the Glow Up row of the box selector.
- **Blood pressure and kidneys.** A 900 mg sodium stick is sold to adults of 30 to 55 with one generic footer line. Add "Watching your salt or blood pressure? Ask your doctor first" to the Pump It Up panel.
- **Daily maximum.** Only Glow Up has one. State one for the range (suggest "one of each a day").

### 11. P1: Two of the four sticks are positioned for a buyer who isn't here

Pump It Up is "The pump, with no caffeine... the classic beet-nitrate pump... for the last set". Glow Up is "After you train", "no loading phase", "Lifters". For a household food shopper these are vocabulary from another aisle, and they make half the range feel irrelevant.

- **Pump It Up:** moment "Before you move"; pitch "The one for the hour you sweat."; body "Gym, padel, a run round the park, eighteen holes in April. Real beetroot, real watermelon and the most sodium of the four, so you start topped up. No caffeine, so it won't follow you to bed." Keep the name; lose "the pump" as a benefit.
- **Glow Up:** moment "Afternoon, every day"; pitch "Strength and skin, in one glass."; body "2.5 g of creatine a day, the steady dose with no loading phase, plus 2.5 g of collagen and the vitamin C your body needs to form it. Daily is the point: it works by adding up." This also fixes the split where the collagen buyer is told it is a post-workout stick and the gym buyer is told it is called Glow Up.

### 12. P1: Five labels per stick

Each stick has a line name, a flavour name, a flavour description, an "owns" word and a chant word: Rise & Brine / Peach of Mind / peach, holy basil & lemon / Clarity / Rise. The copy then mixes them: the Lifters band says "2.5 g a day in **Glow Up**... **To The Beet** before training" under the tag "**Pump It Up**, then Glow Up"; the sleep band says "**Calm O' Mile** goes down" under the tag "**Snooze Control**". The pack selector uses line names; the pack art shouts flavour names.

**Fix.** One name per stick in all running copy, buttons, bands and the bag: the line name (it matches "Rise. Pump. Glow. Snooze."). The flavour name appears once, on the product panel and the pack, as the flavour: "Rise & Brine · Peach of Mind (peach, holy basil & lemon)". Jon will ask "what do I call it on the shelf tag?"; have that answer.

### 13. P2: Trust and provenance

- The page lives on `dailyritual.cathnivore.com`. Before any customer sees it, it needs a paleorobbie.com address; for the CEO, say so up front.
- "Sold only here and at paleorobbie.com" plus a separate Shopify checkout raises Jon's question: why a second store, second account and second delivery for my own customers? Make "add to your next Paleo Robbie delivery" the primary route and the standalone checkout the secondary one.
- Footer: "Thai FDA registration number to follow." Fine for the internal review; add a "Prototype: formulas and prices not final" ribbon for the meeting so placeholders read as honest rather than unfinished.
- No word about taste anywhere, and no proof of any kind (no review, no founder line, no maker). One sentence from Paleo Robbie in the first person would do more than the climax: "We sell the best electrolyte sticks we could find. We still wanted one for breakfast, one our kids could share and one for bedtime, so we made them."
- English only. Affluent Thai shoppers are in the brief; the stick back already carries Thai.

### Outside my lane, one line each

- The hero's first frame is the back of the sticks: a barcode, "pending OEM spec sheet" and a placeholder FDA number are the first legible words on the site (`desk-06-top-0.jpg`).
- Mobile ritual panels clip text at both edges mid-transition (`mob-26-ritual-055.jpg`, `mob-27-ritual-07.jpg`); the Parents band renders half-pink on mobile during its wipe (`mob-43-you-0.jpg`) and reads as a bug.
- Blank stretches of a full screen after the six circles (`desk-31-six-0_6.jpg`) and after the bands (`mob-46-you-1_6.jpg`).
- "CLARITY" as a giant outline word and the on-pack "Clear head" bubble are focus claims by another name; PROTOCOL §1d says to confirm the wording with the OEM.

---

## What Jon will ask that the page cannot answer today

1. **Is the formula final?** No: the stick back says "pending OEM spec sheet", and beet dose, GABA limit, kids' serving and fortification limits are open in PROTOCOL §10.
2. **What does a stick cost me and what do I make?** PROTOCOL §7 estimates USD 0.27–0.31 landed against ฿43–50 retail, unconfirmed by quote; the 28-stick mixed box needs its own packing cost.
3. **Why does my customer buy this instead of Wilder, and what happens to my Wilder sales?** No comparison on the page; "Six, not three" is a swipe at a supplier.
4. **How many will sell, in what mix, against a 30,000-stick MOQ?** No waiting list, no demand signal.
5. **Who would pay ฿5,400 a month for four a day?** The page never states the daily cost or says that one or two a day is the expected habit.
6. **Are these claims legal?** "Pump", "sleep through", "On GLP-1", "Clear head", calcium "muscle function", children's servings: none marked as cleared.
7. **Is nearly 2 g of sodium a day something I want my name on, for families?** Not addressed.
8. **What sweetens it, where is the collagen from, is "made from food, not a lab" true with creatine, GABA and B vitamins in it?** Not addressed.
9. **Why a separate site and checkout? Who fulfils? Does it ride on my delivery slots and accounts?** Not addressed.
10. **Has anyone tasted it?** No.
11. **When does it launch?** No date.
12. **What is the repeat engine?** No subscription, no meal-plan add-on, no reorder.

---

## The three changes that would make this 10x better

1. **Turn the page into a demand test.** While checkout is off, every button becomes "Tell me when it lands" with LINE and email, tagged with the pack and stick chosen. Jon walks out of the room with a way to size the first order instead of a film.
2. **Decide the range logic and price it that way: start with one, build to four.** Sampler first at ฿590, your one stick at ฿43 a day second, the full day third at a real bundle price; daily cost and sodium stated plainly; everyday sticks separated from active-day sticks.
3. **Replace adjectives with a label.** One table of what is in each stick with amounts, an honest "led by real food, honest about the rest" section, a seven-row comparison against a typical sport stick, and a twelve-question FAQ; and take every unconfirmed claim in finding 2 off the page until the OEM confirms it.
