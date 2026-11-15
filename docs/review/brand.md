# Brand review: The Daily Ritual, read as Paleo Robbie's brand manager and as Jon

## Verdict

The pack design and the pun names are Paleo Robbie; the page around them is a polished direct-to-consumer startup page with the Paleo Robbie logo in one corner. It says "real food" but never shows food, an ingredient list, a person, a kitchen, Bangkok or a taste, and its boldest line ("Made from food, not a lab") is not true of sticks that contain creatine, GABA, glycine and phosphate salts. As it stands Jon would see three risks before he sees a product: his first screen shows placeholder label text, several claims would not survive his own standards page or a Thai FDA reading, and the copy takes swipes at coffee and at Wilder, both of which he sells.

## What I compared against

paleorobbie.com was reachable (home, About us, the electrolyte search results and the Wilder peach product page), so this is judged against the live brand, not only the brief.

- **Look:** white pages, deep maroon `#8C000D` logo and top bar, green buttons (`#1F6A01`), teal product badges, GT Walsheim type, and large close-up food photography. The mascot and "Since 2013" sit top-left at about 90 px tall.
- **Voice:** first person plural, short, warm, emoji and exclamation marks. "We obsess over quality so you don't have to." "Fridge goals." "Set your table 👉". "No weird stuff, period." "Goodbye, Bangkok traffic!" A named chef (Chef Prapat). Origin on every product card ("Khao Yai", "Ratchaburi", "Homemade").
- **Trust:** the About page is a list of standards. "Rule #1: It must taste amazing!" Then the "no thanks" list: no refined sugars, no artificial flavours or sweeteners, **no additives hiding behind INS numbers**, no dextrose or maltodextrin, no fruit juice concentrates, and "If you don't recognize an ingredient, your body probably doesn't either!"
- **Wilder on Paleo Robbie's shelf:** ฿1,490 ex VAT per 30, 12-pack ฿695, peach and watermelon among the flavours. Paleo Robbie's own listing calls it "world-class" and "thoughtfully engineered to have just the right balance of sodium, potassium, and magnesium", and sells it with the Bangkok-heat argument ("our humid climate makes it that much more difficult to stay hydrated").

## Findings, ranked

### P0-1. The first screen shows the backs of the packs, with placeholder text, on top of the product name

- **What:** `desk-00` to `desk-06` and `mob-01` to `mob-06` are the same frame. Three sticks lie back-side-up across the wordmark, so the headline reads "THE AILY / RI AL". The legible text on them is "Ingredients & nutrition: pending OEM spec sheet", a food serial of "XX-X-XXXXX-X-XXXX" and a dummy barcode "8 850000 000000". The fronts only turn up at `desk-09` and are readable at `desk-13`, 1.7 screens later.
- **Why it matters:** this is the screen Jon judges the project on. It tells him the product is unfinished and unregistered before it tells him what it is. It also hides the best brand asset the page has, which is the pack front.
- **Fix:**
  - Open on the four fronts fanned out (the `desk-13` or `desk-53` arrangement), wordmark fully readable above or beside them.
  - Never show a back face until the label is final. In the 3D model, replace the back texture with a plain version (name, "Made in Thailand", directions) with no "pending" line, no XX serial and no barcode.
  - The same placeholder backs are visible in the climax (`desk-47`, `desk-48`, `mob-48`). Fix them there too.

### P0-2. "MADE FROM FOOD, NOT A LAB." is not true, and it contradicts Paleo Robbie's own standards page

- **What:** the headline in `desk-32` / `mob-32`, plus a marquee that lists PEACH, LEMON, ORANGE, LIME, APPLE, POMELO and COLLAGEN as if they were ingredients.
  - `docs/FORMULAS.md` lists the base as trisodium citrate, potassium citrate, dipotassium phosphate, calcium lactate, magnesium bisglycinate, citric and malic acid, "natural flavour", stevia and/or monk fruit, natural colour and silica. It says "None of these: fruit powder, juice solids".
  - `docs/PROTOCOL.md` adds creatine monohydrate ("the one non-food active"), GABA and glycine.
  - So peach, lemon, orange, lime, apple and probably pomelo are flavours, not food in the stick. Creatine is left out of the marquee entirely.
  - The page says "no artificial sweeteners" but never says what does sweeten it.
- **Why it matters:** these shoppers read labels, and Paleo Robbie has trained them to. The first one who turns the box over finds six mineral salts and three amino compounds under a headline that says "not a lab". That costs Paleo Robbie more than the sticks earn. It also invites the "no additives hiding behind INS numbers" line from the About page to be quoted back at Jon.
- **Fix (copy):**
  - Headline: **"REAL FOOD FIRST. NOTHING ARTIFICIAL."**
  - Body: "Real food is the reason Paleo Robbie exists, so we started at the market: Thai sea salt, holy basil, ginger, beetroot, watermelon, chamomile flower. Then we added the minerals, and in Glow Up the creatine and collagen. Every ingredient is listed below, by name. Sweetened with stevia leaf. Nothing artificial."
  - Marquee: only things physically in the sticks (Thai sea salt, holy basil, ginger root, beetroot, watermelon, chamomile flower, collagen). Move flavours to the flavour line, worded as flavours.
  - Hero subline: change "real food" to "real-food ingredients".
- **Open question to settle before the meeting:** does the final OEM formula pass Paleo Robbie's own "no thanks" list as written (INS-numbered additives, carriers in the flavour)? If yes, say so on the page; it is the strongest claim available. If no, Jon needs to hear it from us first.

### P0-3. Claim wording that could embarrass Paleo Robbie with the Thai FDA or with customers

The brief's rule is nutrient-function wording only. The page follows it in a few sentences and breaks it in headlines, labels and the owned words. Have the OEM's regulatory contact clear the final page as advertising, not only the label.

| Where | Current | Problem | Replace with |
|---|---|---|---|
| Snooze Control headline and body; "For you" band; back label | "Wind down, then sleep through." / "so you sleep through and don't wake up for the bathroom at 3 am" / "Timed so you sleep through." / "finished early enough that 3 am stays quiet" | A sleep outcome promised by a food. Sleep claims are a well-known enforcement target. | "The last glass of the day." / "Small on purpose (300 ml) and early on purpose: two to three hours before bed. Herbal and caffeine-free." |
| Giant outlined words in the day chapter | CLARITY, PERFORMANCE, GLOW, SLEEP (`desk-22` to `desk-29`) | The four words the page "owns" are the four claims it may not make. | MORNING, AFTERNOON, EVENING, NIGHT, or the puns RISE, PUMP, GLOW, SNOOZE |
| Rise & Brine pack badge | "CLEAR HEAD" | A cognitive claim printed on pack. PROTOCOL.md itself says to confirm it. | "FIRST GLASS" or "BEFORE COFFEE" |
| Rise & Brine | "Energy, without caffeine." | "Energy" on a 3 kcal drink. | "Magnesium and vitamin B6 contribute to the reduction of tiredness and fatigue." Stop there. |
| Rise & Brine + GLP-1 band | "the traditional pair for a settled morning stomach" beside "ON GLP-1 ... the gentle one" | Reads as a remedy for a drug's side effect. | "Ginger: the old Thai morning root." See P1-8 for the band. |
| Pump It Up | "The pump, with no caffeine." / "more blood volume and the beet-nitrate pump" / "more fluid in the tank" | A blood-flow claim, in gym slang. | "The afternoon one, with no caffeine." / "Real beetroot, real watermelon and our saltiest stick (900 mg sodium), for the part of the day when you sweat. Potassium and magnesium contribute to normal muscle function." |
| Glow Up | "Strength and glow, in one glass." / "no bloat" / "the dose longevity routines use" / "water-balloon week" | Strength, beauty and longevity claims. 2.5 g is also below the 3 g dose that the usual authorised creatine claim is tied to. | "Creatine and collagen, in one glass." / "2.5 g of creatine monohydrate in a small everyday dose, with no loading phase. Vitamin C contributes to normal collagen formation." |
| Fog chapter | "Lose just 2% ... you can feel it: in your head, your mood, your workout." | An implied cognitive and mood claim, with no source. | Cut the number. See P0-7. |
| Six electrolytes | Ca "muscle function", PO₄ "energy metabolism", K "muscle and nerve function" | At the doses in FORMULAS.md v1.3 (calcium 50 mg, phosphate 30 mg, potassium 300 mg in three sticks) these are small fractions of a day's need. Check a function claim is allowed at that level. | Show the mg per stick and drop the function line where the dose does not carry it. |
| Footer | "Not intended to diagnose, treat or prevent any disease." | American supplement boilerplate. It makes a drink mix sound like a supplement. | "The Daily Ritual is a powdered drink mix. It is food, not medicine." |

### P0-4. Children's servings are stated as fact on a sleep stick and a pre-workout stick

- **What:** "Kids 4–12: half a stick" appears on Rise & Brine, Pump It Up and Snooze Control, on the pack backs, and as its own band ("Half a stick for the little ones").
  - PROTOCOL.md still lists as open "whether GABA is acceptable for children" and "what a children's serving on pack triggers (labelling, advertising)".
  - Half a Pump It Up stick is 450 mg of sodium for a four-year-old, sold under the words "pre-workout" and "pump".
- **Why it matters:** a parent brand cannot be the company that recommended a GABA night drink and a pre-workout to four-year-olds on an unconfirmed basis. This is the claim most likely to become a screenshot.
- **Fix:**
  - Until the OEM confirms in writing, remove every children's serving from Pump It Up and Snooze Control, on the page and on the pack art.
  - Keep one family line, on Rise & Brine only if confirmed: "Kids 4–12: half a stick in a full glass."
  - Rewrite the band: **"FAMILIES. One box, the whole table."** "No caffeine, no sugar, nothing artificial in any of the four. Glow Up contains creatine and is for adults only."

### P0-5. The page says "real food" but never proves it

- **What:** there is not one photograph on the page. Everything is a 3D render on flat colour. There is no ingredient list, no nutrition panel, no named maker, no origin for any ingredient, and no taste description beyond "taste like a holiday".
  - Real food first appears in words at about screen 14 of 27 on desktop (after hero 1.7, fog 3.4, day 7.5 and six), and it appears on the blackest screen of the page (`desk-32`, `desk-33`).
  - The only liquid shown is a render of an opaque purple-red drink (`desk-42`) that looks like syrup.
- **Why it matters:** Paleo Robbie's proof is always the same three things: a photo of the food, where it came from, and "we tried it". Rule #1 on the About page is taste. This page has none of the three, so the promise is only asserted.
- **Fix:** replace the dark marquee chapter with a light chapter called **"What's in it. All of it."**
  - One real photograph: four glasses with ice on a kitchen counter, each beside its real ingredients (holy basil and ginger, beetroot and watermelon, pomelo, chamomile flowers), sticks in shot.
  - Four columns with the full ingredient list of each stick in plain names, and the per-stick mg of all six electrolytes.
  - A row in Paleo Robbie's own format: "Our no-thanks list still applies: no sugar, no caffeine, no artificial colours, flavours or sweeteners. Sweetened with stevia leaf."
  - A taste line per stick, written as food: "Peach of Mind: ripe peach first, basil at the back, a squeeze of lemon. Barely salty."
  - "Made in Thailand by [maker], registered with the Thai FDA as a drink mix, no. [number]." Leave the bracket visibly marked as pending in the CEO preview, in one place only.

### P0-6. Paleo Robbie is a corner logo; the page reads as another company's shop

- **What:** counted across the page, the brand appears as:
  - a nav logo about 36 px tall with "Since 2013" unreadable (`desk-06`);
  - a logo-draw in the intro that is about 40 px wide on a phone (`mob-00`) and not captured at all on desktop;
  - the small mascot printed sideways on each stick;
  - one sentence at mid-page ("Real food is the reason Paleo Robbie exists");
  - "paleorobbie.com" as unlinked text under the packs;
  - a footer logo.
  - The hero never says "by Paleo Robbie" or what the product is. "Four sticks" does not tell a grocery shopper it is a drink.
  - There is no "we", no Bangkok, no Thai language (paleorobbie.com has a ไทย switch), no link back to the grocery, and the bag says "Secure checkout by Shopify", a different basket from the customer's Paleo Robbie account.
- **Why it matters:** these buyers trust Paleo Robbie, not "The Daily Ritual". The trust transfer is the whole commercial case for a private label, and the page barely uses it.
- **Fix:**
  - Hero lockup above the wordmark: the full-colour logo at 64 px or more, with **"New from Paleo Robbie"**.
  - Hero subline: "Four electrolyte drink mixes, one for each part of your day. Real-food ingredients, zero sugar, nothing artificial. Made in Thailand."
  - Write the page in "we": "We wanted an electrolyte mix we'd give our own families, so we made four."
  - Add one short signed note near the packs: "Rule #1 at Paleo Robbie: it must taste amazing. These took us [n] rounds. Jon and the team."
  - Under the packs: "Or add a box to your next Paleo Robbie delivery" as a real link, next to the bag button.
  - Footer: Robbie Market Co. Ltd., the customer service line and LINE account from paleorobbie.com, a link to About us.

### P0-7. The page knocks coffee and Wilder, both on Paleo Robbie's shelf, and opens with a dark problem chapter that is not this brand

- **What:**
  - "Coffee won't fix that." is the payoff of the fog chapter (`desk-20`). Paleo Robbie has a Coffee & beverages aisle with beans and cold brew.
  - "SIX, NOT THREE. Plenty of hydration mixes stop at sodium, potassium and magnesium" (`desk-30`), with "three" struck through in red. That is Wilder's exact formula, and Paleo Robbie's own listing praises that balance as world-class.
  - The fog chapter is 3.4 screens of near-black blur with one sentence at a time. `desk-14` is an empty dark screen, and `desk-17` and `desk-19` are unreadable frames. It is the second thing a visitor sees.
- **Why it matters:** Jon cannot publish a page that contradicts his own product copy and runs down two categories he sells. The fear-first, dark, cinematic opening is the tone of tech wellness. Paleo Robbie has never sold by telling customers they are failing.
- **Fix:**
  - Cut the fog chapter to one light screen (about 1.2 screens of scroll, dawn peach instead of black) with a local, friendly problem: **"Bangkok takes it out of you."** "Eight hours without a sip, then the heat, the commute and the school run. Start with a glass that puts it back. Before the coffee, not instead of it."
  - Six chapter headline: **"ALL SIX, IN EVERY STICK."** Body: "Sodium, chloride, potassium, magnesium, calcium and phosphate: the six you lose in sweat and overnight. Here is how much of each is in every stick." Then the table. Remove the struck-through "THREE" and "plenty of hydration mixes stop at".
  - Give Jon one sentence for the shelf, not for this page: "Wilder is the one for hard training days. The Daily Ritual is the everyday one, morning to night, for the whole household."

### P1-8. The body copy is gym and biohacker voice under Paleo Robbie names

- **What:** the names are right (Peach of Mind, To The Beet, Calm O' Mile, Rise & Brine). The sentences underneath are not: "the pump", "the last set", "set after set", "more fluid in the tank", "LIFTERS", "no loading phase", "the dose longevity routines use", "GABA + glycine, the Japanese evening pairing", "PERFORMANCE". Two of the four sticks are defined by a workout at 16:30 and 18:30. The first audience band is "ON GLP-1".
- **Why it matters:** the brief says the audience is the household shopper, not the gym. A parent of two reads the day chapter and finds that half the range is for someone else. Leading the "For you" section with a prescription weight-loss drug is the least Paleo Robbie thing on the page.
- **Fix:**
  - Day labels: "07:00 Morning, before coffee" (keep), "Afternoon, before you move", "Evening, after you move", "Two to three hours before bed" (keep).
  - "For you" bands, in this order:
    1. **FAMILIES**, as in P0-4.
    2. **HOT-CITY PEOPLE.** "Bangkok is a sweaty place to live. If you walk, commute, golf, play padel or stand at the side of a football pitch, To The Beet is the salty one."
    3. **IF YOU TRAIN.** "To The Beet before, Glow Up after: 2.5 g of creatine a day with no loading phase."
    4. **EVENING PEOPLE.** "Calm O' Mile is a small, herbal, caffeine-free glass, two to three hours before bed."
    5. **SMALLER APPETITE?** "When you eat less you drink less, because food brings about a fifth of your water. Rise & Brine is the light one: about 3 kcal, no sugar." Do not name GLP-1 on the public page. Use it in targeted posts if Jon wants it at all.

### P1-9. Visual identity: the page takes the pack's palette but none of Paleo Robbie's

- **What:**
  - The display red is crimson `#d92b3a`. Paleo Robbie's red is maroon `#8C000D`, which the page defines (`--deep`) and uses only inside the logo. Buttons are black; Paleo Robbie's are green.
  - There is no photography, against a brand that is mostly photography.
  - Two black chapters (fog, real food) and a black footer, against a brand that is white and warm.
  - The climax is a pink-yellow-green gradient with sticks tumbling edge-on. `desk-45`, `desk-47` and `mob-45` show almost nothing but gradient and thin slivers, and look broken.
  - The footer logo is a solid white blob: the mascot's face has been filled in (`desk-57`, `mob-57`).
- **Why it matters:** the pack language (cream, ink, red, four pastels, cut-paper fruit, speech-bubble badge) is strong and can carry the page. The dark chapters and the gradient are from a different brand, and a defaced mascot is a basic logo error to show a founder.
- **Fix:**
  - Keep cream, ink and the four pastels. Use maroon for the brand lockup, links and small labels, and keep crimson for the wordmark and flavour names only, as on the pack.
  - No black sections. The footer can be maroon, as on paleorobbie.com's top bar.
  - Use the pack's devices on the page: the zigzag tear edge as section dividers, the speech-bubble badge for callouts, the cut-paper fruit icons beside each stick.
  - Climax: flat cream or one pastel behind the fan of four fronts. Remove the frames where the sticks are edge-on or back-on.
  - Footer logo: use the proper white-on-dark version with the face intact, 48 px or taller.

### P1-10. Numbers are presented as final while the label says they are pending

- **What:** the page states "~3 kcal", "11 kcal", "900 mg sodium", "2.5 g creatine", "6 electrolytes" as facts. The pack backs in the same build say "Ingredients & nutrition: pending OEM spec sheet", and the footer says "Thai FDA registration number to follow". Prices are placeholders but look final, with a working "Add to bag".
- **Why it matters:** Jon will ask which numbers are real. A page that looks live for a product that is not registered is also a risk if the link travels.
- **Fix:** for the CEO presentation add a thin maroon ribbon at the top: "Preview. Formula and prices to be confirmed. Not yet on sale." Remove it at launch. Take "pending" text off every pack render (P0-1).

### P2-11. Smaller things

- **Six electrolytes as a headline claim:** two of the six are present in very small amounts in FORMULAS.md v1.3. Showing the mg (P0-5) is the honest answer; hiding them invites the "sprinkled in for the label" criticism.
- **Pricing as shown:** the Weekly Ritual is ฿46 a stick and a box of 30 is ฿43, so the bundle costs more per stick than buying singles. A full ritual is about ฿5,160 a month per person. Paleo Robbie lists prices ex VAT; the bag says VAT included. Wilder is ฿1,490 ex VAT.
- **Thai:** one Thai line on the pack, none on the page. At least a ไทย switch stub and a Thai product descriptor in the hero.
- **Outside my lane, one line each:**
  - the Sampler card has no image (`desk-54`);
  - on mobile the Parents band's pink fill stops at half width (`mob-43`);
  - on mobile the six-electrolyte circles are still on screen over the black chapter (`mob-31`);
  - the day chapter takes 7.5 screens of scroll on desktop, so a 60-second reader never reaches the packs.

## The CEO read

**What Jon concludes in 60 seconds of scrolling.** On desktop the first 12.6 screens are hero, fog and the day, so in a minute he sees: pack backs with "pending OEM spec sheet", a dark sequence telling him he wakes up behind and coffee won't help, then four colourful sticks with good names and gym copy. He does not reach real food, the packs or the price. His conclusion: "This is a slick agency demo for a new sports-drink startup. My logo is on it. My food, my standards and my customers are not."

**His three objections.**
1. "It doesn't look or sound like us. No food, no 'we', no Bangkok, black screens, and my mascot is a white blob in the footer."
2. "'Made from food, not a lab', with creatine, GABA and phosphate in it, a sleep promise, and half-sticks for four-year-olds. My customers read labels and the FDA reads adverts. Who signed this off?"
3. "You're telling people coffee won't fix it and three electrolytes aren't enough. I sell coffee, and I told my customers Wilder is world-class. Why does this exist next to Wilder, and at what price?"

**The one screen that would make him say yes.** A light screen headed **"Our no-thanks list, in a stick."** with:
- a real photograph of four iced glasses on a kitchen counter beside their ingredients and the four packs;
- the full ingredient list of each stick in plain names, with mg of each electrolyte;
- Paleo Robbie's own no-thanks ticks (no sugar, no caffeine, nothing artificial, sweetened with stevia leaf);
- a taste line per stick;
- "Made in Thailand, registered as a drink mix";
- signed "Rule #1: it must taste amazing. Jon and the Paleo Robbie team";
- one button, "Add to your next delivery".

It uses equity he already owns and answers all three objections at once.

## The three changes that would make this 10x better

1. **Prove the real-food promise instead of asserting it.** Replace "Made from food, not a lab" and the black marquee with the "What's in it. All of it." chapter: one real photograph, full ingredient lists, per-stick mg, taste notes, the maker and the no-thanks list. Move it to directly after the hero.
2. **Make it Paleo Robbie's page from the first screen.** Pack fronts and a "New from Paleo Robbie" lockup in the hero, "we" throughout, Bangkok heat as the problem instead of the dark fog chapter, maroon and cream with no black sections, a signed note, and a link into the Paleo Robbie basket.
3. **Rewrite every benefit as food and routine, not outcome.** Remove sleep, pump, strength, glow, clarity, energy and longevity promises, the children's servings that are not yet confirmed, the GLP-1 label, and the lines against coffee and three-electrolyte mixes. Keep the puns, the times of day and the plain nutrient-function sentences.
