# Marketing and conversion copy review: The Daily Ritual

Reviewer seat: marketing manager and conversion copywriter.
Sources: `copy.txt`, `lib/products.ts`, `components/sections/*.tsx`, `docs/PROTOCOL.md`, `docs/BRIEF.md`, the desktop and mobile screenshots, and paleorobbie.com (home, About us, How it works, FAQ, blog index, the Wilder yuzu listing and the Heaps Normal listing). The site did not block me.

## Verdict

The page is written for someone who already buys electrolytes and trains five days a week, and Paleo Robbie's shopper is a label-reading Bangkok parent who has never been told why they would want salt in their water. The copy never says in plain words what the product is, never mentions the one thing every reader shares (they live in a hot, sweaty city), barely mentions taste or Paleo Robbie's own standards, and it makes three or four "real food" and wellbeing claims that this exact audience will check against the ingredient panel and find loose. The fix is a change of angle, not of polish: lead with Bangkok and the household, let Paleo Robbie's name do the trust work, give people permission to drink one stick instead of four, and say honestly what is in the box.

## Step 1: what Paleo Robbie sounds like, and what its shoppers care about

Taken from the live site, so the rebuild can match it.

| What I found on paleorobbie.com | What it means for this page |
|---|---|
| "Our mission? Trust your food again." "We obsess over quality so you don't have to." "Nobody has higher standards." | Trust is the product. The landing page mentions Paleo Robbie once, in the real-food chapter. The name should be in the first screen. |
| "Rule #1: It must taste amazing! Flavor is first, because without that, nothing else matters." | Taste is their first rule. The page has one taste line in 330 lines of copy ("taste like a holiday"). |
| "No weird stuff, period." "If you don't recognize an ingredient, your body probably doesn't either!" The "no thanks" list: no refined sugars, no artificial flavors or sweeteners, no "additives hiding behind INS numbers", no dextrose or maltodextrin. | These shoppers are trained by Paleo Robbie itself to distrust ingredients they don't recognise. A page that lists "GABA + glycine" with no explanation under "Made from food, not a lab" walks straight into that. Use their own phrases: "no weird stuff", "the no-thanks list". |
| On the Wilder electrolyte listing: "You don't have to be a performance athlete to benefit from a high-quality electrolyte boost in Bangkok. Our humid climate makes it that much more difficult to stay hydrated." | Paleo Robbie already sells electrolytes to this audience with the heat-and-humidity argument, and explicitly not the athlete argument. The landing page does the opposite. |
| "The most convenient. Cut out the time consuming supermarket routine (goodbye, Bangkok traffic!)." Same-day delivery for orders up to 6pm, Monday to Saturday, nationwide by express, free delivery over ฿1,500. | Convenience is a pillar. The page never says the box can ride along with the weekly grocery order. |
| Blog titles: "4 Tips to Healthier Children - Living in Bangkok", "5 Sugary Drinks in Thailand to Avoid", "5 Foods to Keep You Hydrated in Bangkok", "How To Get Quality Sleep In Bustling Bangkok", "A Beginner's Guide To Intermittent Fasting", "Going Keto". | Their topics are kids, sugar, Bangkok heat, sleep, fasting and low-carb. Gym content is a handful of old posts out of roughly a hundred (for example "8 Gyms To Try In Bangkok"). |
| House phrases: "has landed" (venison, noodles, fish oil), "Say hello to", "By popular request", "Grab a 4-pack and thank us later", "our tribe". Puns in headlines: "Oh My Cod", "The Lamb-Borghini Of Red Meat", "Soft Cheeses Don't Get Much Feta Than This", "Let's Un-Scramble Egg Labels". Product tags: "No additives", "Feeds 3-4", "Just reheat in oven". | The voice is chatty, first person plural ("we"), food puns, short practical tags. The landing page is second person, moody and dramatic ("You wake up already behind"). It never says "we". |
| Beer listing: "Great beer, without the hangover." | Their favourite benefit shape is "the good thing, without the catch". Useful for no caffeine and no sugar. |

## Findings, ranked

### 1. P0. The first screen does not say what this is, who made it, or why you would want it

- Where: `desk-06-top-0.jpg`, `mob-06-top-0.jpg`. Copy: "The Daily Ritual" / "Four sticks for the four parts of your day. All 6 electrolytes, real food, zero sugar." / "Start your ritual" / "See the day".
- Why it matters: "sticks" of what? The word "drink" is not on the first screen. "All 6 electrolytes" is a feature for people who know there are six; this audience does not. There is no benefit, no Bangkok, and Paleo Robbie appears only as a small nav logo, although its name is the single strongest reason this shopper has to believe anything on the page. The CEO will read this screen first and it sells a name, not a product.
- Fix: use the recommended hero below ("Bangkok is thirsty work." plus a lead that says electrolyte drinks, made by Paleo Robbie, real food, no caffeine, no added sugar).

### 2. P0. The problem chapter has the wrong emotional hook

- Where: `desk-15-why-012.jpg` ("You wake up already behind."), `desk-18-why-055.jpg` ("2%"), `desk-21-why-1.jpg` ("Coffee won't fix that.").
- Why it matters:
  - "You wake up already behind" is hustle-culture guilt. To a parent, "behind" means the school run and the inbox. They cannot tell this is about water until two screens later.
  - "2%" is an unsourced statistic with "you can feel it in your head, your mood", which is the kind of line Paleo Robbie's readers file under bro-science, and it sits close to the cognitive claims the Thai registration rules out. "Most of us live there" cannot be supported.
  - "Coffee won't fix that" picks a fight with something this shopper loves and Paleo Robbie sells (coffee beans, cold brew). The morning stick itself says "before coffee", not "instead of".
  - It is a morning-only problem set in a dark room, used to introduce an all-day range from a warm, sunny brand.
- Fix: replace it with the Bangkok heat sequence in the deck (chapter 2, direction A). The big number becomes 34°, which every reader has felt and which needs no claim.

### 3. P0. Half the range is sold as gym kit to people who do not go to the gym

- Where: `desk-25-ritual-04.jpg` (watermark "Performance", "Before you train", "The pump, with no caffeine.", "the classic beet-nitrate pump", "the 2 am ceiling stare", "for the last set", "set after set"), Glow Up panel ("After you train", "the dose longevity routines use"), `desk-44-you-0_8.jpg` ("Lifters", "Creatine without the bloat.", "no water-balloon week").
- Why it matters: two of four sticks, and so half of the 28-stick hero pack, are defined by a workout. A 45-year-old who walks, plays padel on Sundays and chases two children reads "before you train" and concludes half the box is not for them. "Longevity routines" is wellness-internet. "Beet-nitrate pump" is supplement-forum.
- Fix: keep the line names, change the moments. Pump It Up becomes "before anything sweaty" (gym, padel, golf, a run round Benjakitti, a Saturday on the touchline). Glow Up becomes "the grown-ups' one". "Lifters" becomes "anyone who sweats". Full wording in the deck.

### 4. P0. Real-food and "zero" claims that a label reader will check and find loose

- "Made from food, not a lab." (`desk-32-food-0.jpg`). The box contains creatine, GABA, glycine, magnesium bisglycinate and added B vitamins. None of those comes from a Thai market. Paleo Robbie's shoppers know what creatine is. `PROTOCOL.md` itself has an "honest note" column admitting this.
- The marquee lists "Peach, Lemon, Pomelo, Orange, Lime, Apple" as food ingredients. In `PROTOCOL.md` section 1b the real-food ingredients are Thai sea salt, ginger, holy basil, beetroot, watermelon, collagen and chamomile flower. The fruits are flavours. If the panel says "natural flavour", the marquee is an overclaim.
- "Zero sugar" and "No sugar." across all four (`desk-33-food-0_7.jpg`), while Pump It Up has real beetroot and watermelon powder and 11 kcal. The Pump It Up panel quietly shows no sugar figure. Either confirm it meets the sugar-free threshold or say "no added sugar".
- "No artificial sweeteners" without saying what does sweeten it. `FORMULAS.md` says stevia and/or monk fruit. This audience's first question is "then what's the sweetener?".
- There is no ingredient list anywhere on the page, and the hero render shows the back of the pack with "Ingredients & nutrition: pending OEM spec sheet" legible.
- Why it matters: this is the one audience in Bangkok that turns the pack over. One loose claim costs the trust the whole page is borrowing from Paleo Robbie.
- Fix: headline "Real food first." Body names the real-food ingredients, then says plainly that minerals and a few named extras come next. Marquee carries only real ingredients. Range-wide claim becomes "no added sugar" until the OEM spec confirms zero. Name the sweetener. Add a full ingredient list per stick as soon as the spec exists.

### 5. P0. Several lines lean past "nutrient-function wording only"

| Current line | Problem | Replacement |
|---|---|---|
| "Wind down, then sleep through." / "so you sleep through and don't wake up for the bathroom at 3 am" / "Timed so you sleep through." | States a sleep effect | "The last glass of the day." / "Have it two to three hours before bed and the glass is long gone by lights out, so the bathroom doesn't wake you at 3 am." (the benefit is the timing, not the ingredients) |
| "Energy, without caffeine." | Energy claim | "No caffeine involved." |
| "more blood volume and the beet-nitrate pump" | Physiological effect claim | "The salt you sweat out, and a real vegetable instead of a stimulant." |
| "Lose just 2% of your body's water and you can feel it: in your head, your mood" | Cognitive and mood effect | Cut (new problem chapter needs no claim) |
| Giant "Clarity" watermark | Reads as a cognitive promise | "Rise" (see deck) |
| "the traditional pair for a settled morning stomach" | Digestive effect | "A gentle start on an empty stomach." |

The safe wordings from the brief are kept verbatim in the deck: B6 and B12 contribute to normal mental function; magnesium and B6 help reduce tiredness and fatigue; potassium and magnesium for normal muscle function; vitamin C contributes to normal collagen formation.

### 6. P1. "All four, every day" is a big ask, and nobody is told they can pick

- Where: "One stick for each, every day." (`desk-13-top-1.jpg`), "Together they make the ritual." (`desk-22-ritual-0.jpg`), the Weekly Ritual as lead pack (`desk-54-packs--0_1.jpg`).
- Why it matters: four a day is ฿184 a day at the placeholder price, about ฿5,500 a month for one person. It is also 1,950 mg of sodium a day by the `PROTOCOL.md` table (500 + 900 + 400 + 150), which is the World Health Organization's whole suggested daily limit for an adult before food. A label reader aged 30 to 55 will add that up. Selling the full set as the only correct way to use the product loses the parent who would happily buy a morning box.
- Fix: say "Drink the ones that fit your day" in the hero and the day intro. Tell non-training shoppers to start with the two ends of the day. Put the salt answer in the FAQ in plain numbers. Lead the packs with the Sampler until people know their stick.

### 7. P1. The three things this shopper buys on are almost absent: taste, Paleo Robbie's standards, and delivery with the groceries

- Taste: Paleo Robbie's rule one. Add one "Tastes like" line per stick (drafts in the deck, to confirm after the taste trial).
- Standards: add a short "Same rules as everything else we sell" block that ties the sticks to the no-thanks list. Needs Jon's sign-off, since it speaks for the company.
- Delivery: "Sold only here and at paleorobbie.com" is written as a restriction. It is a benefit: "Add a box to your next Paleo Robbie order."

### 8. P1. "Which part of the day is yours?" opens on GLP-1 and misses Paleo Robbie's own base

- Where: `desk-43-you-0.jpg`. Order is On GLP-1, Parents, Lifters, Light sleepers.
- Why it matters: the first persona on a family grocer's page is a prescription-drug user, labelled with an abbreviation many readers will not know, and naming a drug class beside a food product invites a medical reading. Parents come second. The people who already believe in salt, Paleo Robbie's low-carb, keto and fasting customers (they have blog series on both), are not mentioned at all. And the parents band says kids can have it without saying why they would: after sport, instead of a sugary sports drink.
- Fix: new order: the whole house, anyone who sweats, light sleepers, eating less (fasting, low-carb, GLP-1, not a breakfast person). New headline that un-gyms the range. Wording in the deck.

### 9. P1. The buying moment under-sells and promises things the page cannot do yet

- "Your first glass is tomorrow, 07:00." (`desk-53-climax-stage-1.jpg`) while checkout is switched off.
- "Checkout opens at launch. Fill your bag now and it'll be waiting." A bag in one browser is not a waiting list. No email, no LINE, so every interested visitor before launch is lost. Paleo Robbie already runs "Notify me" and a LINE list.
- The Weekly Ritual is ฿46 a stick and a single box is ฿43 a stick (฿1,290 for 30), so the featured bundle costs more per stick than buying singles. Placeholder prices, but the CEO will do that sum.
- "Refill one" does not say what it is. "Add sampler" drops the article the other buttons have.
- Nothing at the price about delivery, VAT, or whether this is a subscription.
- Fix: launch-notify line and form, pack copy and notes in the deck. One line outside my lane: for existing customers the strongest button is "Add to my Paleo Robbie order", linking to the grocery listing, because their address, wallet credit and free-delivery threshold already live there.

### 10. P1. Insider words and unexplained ingredients

- "Each one owns one thing" is our positioning language, not the shopper's.
- "Electrolytes" is never defined. One sentence fixes it.
- "GABA + glycine: the Japanese evening pairing." Explains nothing. Better: GABA as in GABA rice (sold in every Thai supermarket), glycine as in bone broth (which Paleo Robbie sells).
- "Holy basil (kaprao)" is a good local touch. Make it land: it is the leaf in pad kaprao.

### 11. P2. "Ritual" is doing too much work

"Start your ritual", "Together they make the ritual", "That's the whole ritual", "Your ritual" (bag). As a product name it is fine. As a repeated noun it tips into wellness-brand voice. Keep it in the name and in the one call to action; use plain words elsewhere ("That's all there is to it", "Your bag").

### 12. P2. "Six, not three" takes a swipe at the product on the next shelf

"Plenty of hydration mixes stop at sodium, potassium and magnesium" describes Wilder, which Paleo Robbie stocks and praises on its own site. Keep the headline, make the body neutral: "Most mixes carry three."

### 13. P2. Small labels and metadata

- "ON GLP-1", "PARENTS", "LIFTERS", "LIGHT SLEEPERS" and the electrolyte names are set in capitals. Sentence case everywhere in the deck.
- The meta description repeats the hero and has no "drink", no "Bangkok", no "Paleo Robbie". New title and description below.
- Footer: "Thai FDA registration number to follow" is fine for now but should not be on screen at launch.

### Outside my lane, one line each

- The hero opens on the backs of the sticks: a barcode sits over the D of "Daily" and placeholder text ("pending OEM spec sheet", "XX-X-XXXXX-X-XXXX") is readable (`desk-06-top-0.jpg`).
- The Sampler card is two-thirds empty (`desk-54-packs--0_1.jpg`).
- `PROTOCOL.md` section 3 marks GABA for children as "confirm", but the page already tells parents Snooze Control is fine for ages 4 to 12. Confirm before launch or pull the line.
- Collagen source (fish or bovine) is undecided in `PROTOCOL.md`; this audience includes pescatarians and people with fish allergies, so the page must say which.
- A two-stick "morning and evening" pack is the natural entry point for non-training parents and does not exist.

---

## Step 3: the replacement copy deck

House rules used: plain words, short sentences, "we" for Paleo Robbie, sentence case, no em dashes, numbers written the way a shopper says them. Items marked [confirm] depend on the OEM spec, the taste trial or an operations fact I could not verify.

### 0. Intro curtain

- The Daily Ritual
- New line under it: From Paleo Robbie

### Navigation

- The four
- What's inside
- Real food
- Who it's for
- Button: Shop
- Bag button label: Bag

### 1. Hero

Title on stage (unchanged, it is the product name): The Daily / Ritual

**Direction A: the hot city (recommended)**

- Small line above the headline: New from Paleo Robbie
- Headline: Bangkok is thirsty work.
- Lead: Four electrolyte drinks, one for each part of your day. Made by Paleo Robbie from real food, with no caffeine, no added sugar and no weird stuff.
- Button 1 (before launch): Tell me when it lands
- Button 1 (after launch): Choose your sticks
- Button 2: Meet the four
- After the sticks line up, headline: Rise. Pump. Glow. Snooze.
- After the sticks line up, line: Morning, before you sweat, after, and bedtime. Drink the ones that fit your day.
- Scroll cue: Scroll

**Direction B: the label reader**

- Small line above the headline: New from Paleo Robbie
- Headline: Electrolytes, the Paleo Robbie way.
- Lead: Four drink sticks for the four parts of your day. Real food first, all six electrolytes, and nothing from our no-thanks list. [confirm against the list]
- Buttons and after-line as in A.

**Recommendation: A.** "Bangkok is thirsty work." names the place and the feeling in four words, is true for every person on Paleo Robbie's list whether or not they exercise, needs no science and no claim, and is the same argument Paleo Robbie already uses to sell Wilder to this audience ("our humid climate makes it that much more difficult to stay hydrated"). B is safe and on-brand but opens with a category word, "electrolytes", that most of these shoppers do not yet know they want, and it only works on people who already know the no-thanks list. A's lead carries B's best asset anyway: "Made by Paleo Robbie from real food".

### 2. The problem (replaces the fog)

The chapter has six slots: line one, line two (two short lines), the big number, the line under it, line three, the turn. Both directions fit them.

**Direction A: an ordinary Bangkok day (recommended)**

- Line one: You live somewhere very warm.
- Line two: You sweat on the school run. / Then sit in air con all day.
- Big number: 34° (counts up from 0; screen-reader label "34 degrees")
- Line under the number: An ordinary Bangkok afternoon. You lose water and salt all day here, whether or not you go near a gym.
- Line three: Water puts back the water.
- The turn: These put back the rest.

**Direction B: the day that runs you**

- Line one: Up at six.
- Line two: School run. Inbox. / Somehow it's three o'clock.
- Big number: 3 pm
- Line under the number: The hour most of us reach for another coffee or something sweet. Try a tall glass of water first.
- Line three: Not just any glass.
- The turn: One made for that hour of the day.

**Recommendation: A.** It is about a place and the weather, so it is concrete, a little funny, and makes no promise the registration forbids. It also fixes the gym problem before the sticks appear: "whether or not you go near a gym" tells the parent that the next four panels are for them. B is more emotional and maps neatly onto the four times of day, but every line is about tiredness, which pulls the page towards an energy claim it cannot make. Design note for the rebuild: with A the scene should feel like heat haze and bright light, not night and fog. 34°C is a typical Bangkok afternoon high; check the figure against the month of launch.

### 3. The day: introduction panel

- Clock: runs as now
- Headline: One stick for each part of your day.
- Body: Each is made for its hour: the most salt before you sweat, the most magnesium before bed. All four carry all six electrolytes. Drink one, two or the full set.
- Hint: Keep scrolling. The sun is coming up.

Watermark words behind the four panels: Rise, Pump, Glow, Snooze (replacing Clarity, Performance, Glow, Sleep).

### 3a. Rise & Brine · Peach of Mind

- Time chip: 07:00
- Moment: First thing, before coffee
- Line name: Rise & Brine
- Flavour name: Peach of Mind
- Flavour: Peach, holy basil & lemon
- Pitch: The first glass of the day.
- Body: A night of air con and not a sip of water. Start here: a light peach and lemon water with Thai sea salt, potassium and a little ginger. The holy basil is kaprao, the same leaf as in your pad kaprao. Vitamins B6 and B12 contribute to normal mental function.
- Tastes like: peach iced tea with a squeeze of lemon and a herby, lightly salty finish. [confirm after taste trial]
- Chips: All 6 electrolytes / Thai sea salt / Holy basil / Ginger root / Vitamins B6, B12 and C
- Pair one: Magnesium + B6. Help reduce tiredness and fatigue. No caffeine involved.
- Pair two: Ginger + B6. A gentle start on an empty stomach.
- Stats: about 3 kcal / 0 g sugar / 500 ml water
- Note: Before coffee, not instead of it. Kids 4 to 12: half a stick.

### 3b. Pump It Up · To The Beet

- Time chip: 16:30
- Moment: Before anything sweaty
- Line name: Pump It Up
- Flavour name: To The Beet
- Flavour: Watermelon, beet & sea salt
- Pitch: The salty one, on purpose.
- Body: Sweat is mostly water and salt, so this stick carries 900 mg of sodium, with real beetroot and real watermelon. There is no caffeine, so an evening game of padel doesn't follow you to bed. Have it before the gym, a run round Benjakitti, a round of golf or a Saturday on the touchline.
- Tastes like: cold watermelon with a pinch of salt and an earthy bit of beet. [confirm after taste trial]
- Chips: All 6 electrolytes / Real beetroot / Real watermelon / 900 mg sodium / No caffeine
- Pair one: Sea salt + beetroot. The salt you sweat out, and a real vegetable instead of a stimulant.
- Pair two: Potassium + magnesium. For normal muscle function.
- Stats: 11 kcal / 0 caffeine / 600 ml water
- Small line under the stats: The 11 kcal are the beetroot and the watermelon.
- Note: About 30 minutes before you get moving. Kids 4 to 12: half a stick.

### 3c. Glow Up · Zest Life

- Time chip: 18:30
- Moment: Early evening, after you've moved
- Line name: Glow Up
- Flavour name: Zest Life
- Flavour: Pomelo, orange & lime
- Pitch: One for the grown-ups.
- Body: 2.5 g of creatine, which is an everyday amount: nothing to load, nothing to cycle, no bloat. Creatine is one of the most studied ingredients in sport, and it isn't only for people who lift. The collagen comes with vitamin C, because vitamin C contributes to normal collagen formation.
- Tastes like: fresh pomelo with orange and a sharp squeeze of lime. Like something you'd order by a pool. [confirm after taste trial]
- Chips: All 6 electrolytes / 2.5 g creatine / Collagen peptides / Vitamin C
- Pair one: Creatine + electrolytes. Creatine draws water into muscle. The electrolytes keep you hydrated while it does.
- Pair two: Collagen + vitamin C. Vitamin C contributes to normal collagen formation.
- Stats: 2.5 g creatine / 0 g sugar / 500 ml water
- Note: Adults only. One stick a day, no more. Collagen from [fish or bovine: confirm and state].

### 3d. Snooze Control · Calm O' Mile

- Time chip: 20:00
- Moment: Two to three hours before bed
- Line name: Snooze Control
- Flavour name: Calm O' Mile
- Flavour: Apple chamomile iced tea
- Pitch: The last glass of the day.
- Body: A cold apple and chamomile tea. Herbal, so there's no caffeine. It has the most magnesium of the four, with GABA, glycine and real chamomile flower. Have it two to three hours before bed and the glass is long gone by lights out, so the bathroom doesn't wake you at 3 am.
- Tastes like: cold apple tea with soft, floral chamomile. Hardly salty at all. [confirm after taste trial]
- Chips: All 6 electrolytes / Most magnesium / GABA + glycine / Chamomile flower / No caffeine
- Pair one: GABA + glycine. Two amino acids. You know them from GABA rice and bone broth.
- Pair two: Magnesium + chamomile. Magnesium for normal muscle function, plus the classic bedtime flower.
- Stats: 0 caffeine / 0 g sugar / 300 ml water
- Note: Herbal and caffeine-free. Kids 4 to 12: half a stick. [confirm GABA for children, or drop the kids line here]

### 4. Six electrolytes

- Headline: Six, not three.
- Body: Electrolytes are the minerals your body uses to hold on to water. You lose them when you sweat, which in Bangkok is most of the time. Most mixes carry three. Every Daily Ritual stick carries all six, in amounts set for its hour: the most sodium before you sweat, the most magnesium before bed.
- Centre of the ring: 6 / electrolytes in every stick
- Sodium: the main one you sweat out
- Chloride: sodium's other half. Together they're salt
- Potassium: normal muscle and nerve function
- Magnesium: helps reduce tiredness and fatigue
- Calcium: normal muscle function
- Phosphate: normal energy metabolism

### 5. Real food

- Headline: Real food first.
- Body: Real food is why Paleo Robbie exists, so that's where every stick starts: Thai sea salt, holy basil, ginger, beetroot, watermelon, chamomile flower. Then the six minerals, and a few extras we name in full. You read the label on everything else you buy from us. Read this one.
- Marquee (real ingredients only): Thai sea salt / Holy basil / Ginger root / Beetroot / Watermelon / Collagen / Chamomile flower
- If a second marquee row is wanted, label it honestly as flavours: Tastes of peach / lemon / pomelo / orange / lime / apple
- The statement: No added sugar. No caffeine. No artificial colours, flavours or sweeteners.
- Small line under the statement: A little stevia leaf does the sweetening. [confirm with OEM spec]
- New link or expandable row: Every ingredient, in full (one list per stick, from the OEM spec sheet)

New short block to add here or just before the packs (needs Jon's sign-off):

- Headline: Same rules as everything else we sell.
- Body: Our team tasted every one, read the label twice and ran it past our no-thanks list. No refined sugar, no artificial anything, nothing hiding behind a number. If it's weird, it isn't going in. [confirm against the list]

### 6. Just add water

- Headline: Just add water.
- Step 1: Tear. Along the notch.
- Step 2: Pour. Into cold water. Each stick tells you how much.
- Step 3: Shake. Or stir. Twenty seconds.
- Closing line: That's all there is to it. Quicker than making a coffee.
- Extra line: Keep a few in your bag, your desk drawer and the kids' sports kit.

### 7. Who it's for

- Headline: Not just for people in Lycra.

Band 1

- Label: The whole house
- Headline: Half a stick for the little ones.
- Body: Three of the four are family sticks. Kids aged 4 to 12 have half a stick in a full glass of water: after football, after swimming, after a school day in a hot uniform. No caffeine, no added sugar, nothing artificial. Glow Up is the grown-ups' one.
- Tag: Rise & Brine, Pump It Up, Snooze Control

Band 2

- Label: Anyone who sweats
- Headline: You don't have to be an athlete.
- Body: Bangkok does half the work for you. Have Pump It Up before anything sweaty and Glow Up after. Neither has caffeine. And if you do lift: 2.5 g of creatine a day, no loading week.
- Tag: Pump It Up, then Glow Up

Band 3

- Label: Light sleepers
- Headline: An early last drink.
- Body: Snooze Control goes down two to three hours before bed. Magnesium, GABA, glycine and chamomile flower in a cold apple tea, finished early enough that 3 am stays quiet.
- Tag: Snooze Control

Band 4

- Label: Eating less
- Headline: Eating less means drinking less.
- Body: About a fifth of your water comes from food. So if you're fasting, eating low-carb, on a GLP-1 or just not a breakfast person, you're drinking less than you think. Rise & Brine is the gentle one: a little ginger, no sugar, about 3 kcal.
- Tag: Rise & Brine

### 8. Climax

- Headline: Start your ritual
- Line under it (before launch): The first batch is nearly here.
- Line under it (after launch): Order today and your first glass could be tomorrow, 07:00. [confirm delivery promise]

### 9. Packs

Card 1 (recommend this card leads until launch reviews exist)

- Badge: Start here
- Title: The Sampler
- Sub: 12 sticks. Three of each.
- Body: Not sure which part of your day needs one? Try all four for three days and see which you reach for.
- Price: ฿590
- Button: Add the Sampler

Card 2

- Badge: All four, for a week
- Title: The Weekly Ritual
- Sub: 28 sticks. Seven of each.
- List: 07:00 Rise & Brine / 16:30 Pump It Up / 18:30 Glow Up / 20:00 Snooze Control
- Body: One full week for one person. Or share it round the house.
- Price: ฿1,290
- Per stick: ฿46 a stick [make this lower than the single-box price, or drop the line]
- Button: Add the Weekly Ritual

Card 3

- Badge: Found your favourite?
- Title: Boxes of 30
- Tabs: Rise & Brine / Pump It Up / Glow Up / Snooze Control
- Sub (changes with tab): 30 sticks of peach, holy basil & lemon. A month of mornings.
  - Pump It Up: 30 sticks of watermelon, beet & sea salt. A month of sweaty afternoons.
  - Glow Up: 30 sticks of pomelo, orange & lime. A month, one a day.
  - Snooze Control: 30 sticks of apple chamomile iced tea. A month of evenings.
- Price: ฿1,290 (Glow Up ฿1,490)
- Button: Add to bag

Note under the cards (after launch): Prices include VAT. No subscription: buy a box when you run out. Delivered across Bangkok and nationwide. Also in the Paleo Robbie grocery, so a box can ride along with your next order.

Optional price line, once prices are final: Less than a fresh coconut a glass. [check the sum]

### 10. Launch-notify line (checkout switched off)

- Note under the cards: Not on sale just yet. Leave your email and we'll tell you the day the first batch lands. It's coming to the Paleo Robbie grocery too, so a box can ride along with your next order.
- Field placeholder: Your email
- Button: Tell me when it lands
- After sending: You're on the list. We'll be in touch the day it lands.
- Second line: Or add us on LINE: @paleorobbie
- Disabled checkout button in the bag: Tell me when it lands (opens the same form)

### 11. Bag drawer

- Title: Your bag
- Empty: Nothing in here yet. Mornings start with Rise & Brine.
- Quantity buttons (screen-reader labels): One fewer / One more
- Total: Total
- Button (after launch): Checkout
- Button (busy): Opening checkout…
- Note (before launch): Prices in Thai baht, VAT included.
- Note (after launch): Secure checkout. Prices in Thai baht, VAT included.

### 12. Footer

- Big line: Rise. Pump. Glow. Snooze.
- Legal: The Daily Ritual is a powdered drink mix with electrolytes, made in Thailand for Paleo Robbie. It is a food, not a medicine, and is not intended to diagnose, treat, cure or prevent any disease. Glow Up contains creatine: adults only, one stick a day. If you are pregnant, breastfeeding, on medication, watching your salt or under a doctor's care, ask your doctor first. Not for children under 4. [confirm]
- Copyright: © 2026 Paleo Robbie, Bangkok. Thai FDA registration no. [number]

### SEO

- Title (54 characters): The Daily Ritual: electrolyte drink mix | Paleo Robbie
- Meta description (159 characters): Four electrolyte drink sticks for a Bangkok day, made by Paleo Robbie. All six electrolytes, real food first, no caffeine, no added sugar. Nationwide delivery.
- Social share title: Bangkok is thirsty work.
- Social share description: Four electrolyte drinks for the four parts of your day, from Paleo Robbie. Real food first. No caffeine, no added sugar, no weird stuff.

### FAQ (new section, between "Who it's for" and the packs)

Headline: Good questions.

1. What's actually in them, and what makes them sweet?
   All six electrolytes (sodium, chloride, potassium, magnesium, calcium and phosphate), plus the real food on the front of each stick: Thai sea salt, holy basil, ginger, beetroot, watermelon, collagen or chamomile flower, depending on which one. They're lightly sweetened with stevia leaf. [confirm] No sugar is added, there's no caffeine, and there are no artificial colours, flavours or sweeteners. The full list for each stick is on its box and on this page.

2. Can my kids drink them?
   Three of the four, yes. Rise & Brine, Pump It Up and Snooze Control are fine for children aged 4 to 12 at half a stick in a full glass of water. None of them has caffeine. Glow Up contains creatine, so that one is for adults only. They're not for under-4s, and if your child has a medical condition, ask your doctor first. [confirm Snooze Control for children]

3. I don't go to the gym. Is this for me? Do I need all four?
   Yes, and no. You sweat in Bangkok whether you train or not. Most people start with the two ends of the day: Rise & Brine in the morning and Snooze Control in the evening. Add Pump It Up on days you'll be out in the heat, and Glow Up if you'd like a simple daily creatine and collagen. The Sampler lets you try all four first.

4. Isn't that a lot of salt?
   It's meant to be salty, because salt is what you sweat out. A stick has between 150 mg of sodium (Snooze Control) and 900 mg (Pump It Up). All four in one day comes to 1,950 mg, which is about what the World Health Organization suggests as a daily limit for an adult, before food. So on a quiet day in the air con, you don't need all four. If you've been told to watch your salt or your blood pressure, or you have a heart or kidney condition, ask your doctor first.

5. Can I add them to my usual Paleo Robbie order?
   Yes. The Daily Ritual is in the Paleo Robbie grocery, so a box can ride along with your steaks and your eggs, Monday to Saturday in Bangkok and by express everywhere else in Thailand. Or order here and we'll send it straight to you. [confirm how orders from this page are delivered]

Three spares, if there is room:

- How do they taste? Like lightly flavoured water with a pinch of salt, not like a sports drink. Snooze Control is the least salty and Pump It Up the most. Rule one at Paleo Robbie is that it has to taste great, and these went past the same tasting table as everything else we sell. [confirm]
- Will Rise & Brine break my fast? It has about 3 kcal and no sugar. Most people who fast are comfortable with that. If you're strict, have it with your first meal.
- How is this different from the Wilder sachets you sell? Wilder is one mix with three electrolytes and L-theanine. We like it and we still stock it. The Daily Ritual is four different sticks for four times of day, with all six electrolytes, no L-theanine and real food first. Pick whichever suits you.

### Facts to confirm before any of this goes live

1. Sweetener (stevia, monk fruit or both) and whether natural-flavour carriers pass the no-thanks list (no maltodextrin or dextrose).
2. Sugar per stick for Pump It Up: "0 g" or "no added sugar".
3. Whether peach, lemon, pomelo, orange, lime and apple are real fruit powders or natural flavours.
4. Collagen source.
5. GABA for children aged 4 to 12, and the lower age limit.
6. Taste descriptions, after the taste trial.
7. How orders placed on this page are delivered, and whether the box is listed in the Paleo Robbie grocery at launch.
8. "Clear head" on the Rise & Brine pack with the OEM.
9. All claim wording with the OEM or regulatory adviser, as `PROTOCOL.md` already requires.

## The three changes that would make this 10x better

1. **Change the reason to care from "you are behind" to "you live in Bangkok".** New hero line, new problem chapter. One idea, true for every reader, already proven on Paleo Robbie's own Wilder listing, and it removes the gym filter from the whole page.
2. **Let Paleo Robbie vouch for it, honestly.** Put the name in the first screen, say "real food first" instead of "not a lab", name the sweetener, show every ingredient, use "no added sugar" until proven otherwise, and answer the salt question in numbers. This audience forgives an honest label and never forgives a loose one.
3. **Make the first purchase small and the first step possible today.** Tell people to drink the ones that fit their day, lead with the Sampler, replace "Fill your bag now and it'll be waiting" with an email and LINE capture, and tell existing customers the box can ride along with their groceries.
