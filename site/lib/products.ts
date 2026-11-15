// Single source of truth for the four sticks, the packs, the label table and the FAQ.
//
// Voice (panel review, 2026-11-15): written for Paleo Robbie's own shoppers, households in a hot city, not for gym people.
// One name per stick in running copy: the LINE name (Rise & Brine). The flavour name appears on the product panel only.
// Claims: nutrient-function wording only (Thai drink-mix route). No sleep, focus, energy, pump or strength outcomes.
// Numbers are the target formula in docs/PROTOCOL.md section 3 and are shown as such until the maker's spec sheet arrives.

export type SkuId = "peach-of-mind" | "to-the-beet" | "zest-life" | "calm-o-mile";

export type Stick = {
  id: SkuId;
  time: string;
  moment: string;
  word: string;           // Rise / Pump / Glow / Snooze
  line: string;
  name: string;
  flavour: string;
  panel: string;
  deep: string;
  pitch: string;
  body: string;
  taste: string;
  inside: string[];
  pairs: { pair: string; story: string }[];
  stats: { k: string; v: string }[];
  note: string;
  adultsOnly?: boolean;
  label: { sodium: number; potassium: number; magnesium: number; calcium: number; phosphate: number; kcal: string; extras: string };
};

export const STICKS: Stick[] = [
  {
    id: "peach-of-mind",
    time: "07:00",
    moment: "First thing, before coffee",
    word: "Rise",
    line: "Rise & Brine",
    name: "Peach of Mind",
    flavour: "Peach, holy basil & lemon",
    panel: "#F7BFA0",
    deep: "#7E3A18",
    pitch: "The first glass of the day.",
    body:
      "A night of air con and not a sip of water. Start here: a light peach and lemon water with Thai sea salt, potassium and a little ginger. The holy basil is kaprao, the same leaf as in your pad kaprao. Vitamins B6 and B12 contribute to normal mental function.",
    taste: "Think peach iced tea with a squeeze of lemon and a herby, lightly salty finish.",
    inside: ["All 6 electrolytes", "Thai sea salt", "Holy basil", "Ginger root", "Vitamins B6, B12 and C"],
    pairs: [
      { pair: "Magnesium + B6", story: "Contribute to the reduction of tiredness and fatigue. No caffeine involved." },
      { pair: "Ginger", story: "The old Thai morning root. A gentle start before breakfast." },
    ],
    stats: [
      { k: "sodium", v: "500 mg" },
      { k: "kcal", v: "about 3" },
      { k: "water", v: "500 ml" },
    ],
    note: "Before coffee, not instead of it. Kids 4 to 12: half a stick.",
    label: { sodium: 500, potassium: 300, magnesium: 75, calcium: 50, phosphate: 30, kcal: "about 3", extras: "Holy basil, ginger, vitamins B6, B12 and C" },
  },
  {
    id: "to-the-beet",
    time: "16:30",
    moment: "Before anything sweaty",
    word: "Pump",
    line: "Pump It Up",
    name: "To The Beet",
    flavour: "Watermelon, beet & sea salt",
    panel: "#EBA1BE",
    deep: "#74204A",
    pitch: "The salty one, on purpose.",
    body:
      "Sweat is mostly water and salt, so this stick carries 900 mg of sodium, with real beetroot and real watermelon. There's no caffeine, so an evening game of padel doesn't follow you to bed. Have it before the gym, a run round Benjakitti, a round of golf or a Saturday on the touchline.",
    taste: "Think cold watermelon with a pinch of salt and an earthy bit of beet.",
    inside: ["All 6 electrolytes", "Real beetroot", "Real watermelon", "900 mg sodium", "No caffeine"],
    pairs: [
      { pair: "Sea salt + beetroot", story: "The salt you sweat out, and a real vegetable instead of a stimulant." },
      { pair: "Potassium + magnesium", story: "Contribute to normal muscle function." },
    ],
    stats: [
      { k: "sodium", v: "900 mg" },
      { k: "kcal, from the beet and melon", v: "11" },
      { k: "water", v: "600 ml" },
    ],
    note: "About 30 minutes before you get moving. Kids 4 to 12: half a stick. Watching your salt? Ask your doctor first.",
    label: { sodium: 900, potassium: 400, magnesium: 50, calcium: 50, phosphate: 60, kcal: "11", extras: "Real beetroot and watermelon" },
  },
  {
    id: "zest-life",
    time: "18:30",
    moment: "Early evening, every day",
    word: "Glow",
    line: "Glow Up",
    name: "Zest Life",
    flavour: "Pomelo, orange & lime",
    panel: "#F2E28E",
    deep: "#5F4E0A",
    pitch: "One for the grown-ups.",
    body:
      "2.5 g of creatine, an everyday amount: nothing to load, nothing to cycle. Creatine is one of the most studied ingredients in sport, and it isn't only for people who lift. The collagen comes with vitamin C, because vitamin C contributes to normal collagen formation.",
    taste: "Think fresh pomelo with orange and a sharp squeeze of lime. Like something you'd order by a pool.",
    inside: ["All 6 electrolytes", "2.5 g creatine", "2.5 g collagen", "Vitamin C", "Adults only"],
    pairs: [
      { pair: "Creatine + electrolytes", story: "Creatine draws water into muscle. The electrolytes keep you hydrated while it does." },
      { pair: "Collagen + vitamin C", story: "Vitamin C contributes to normal collagen formation." },
    ],
    stats: [
      { k: "creatine", v: "2.5 g" },
      { k: "kcal, from the collagen", v: "about 13" },
      { k: "water", v: "500 ml" },
    ],
    note: "Adults only. One stick a day, no more.",
    adultsOnly: true,
    label: { sodium: 400, potassium: 400, magnesium: 75, calcium: 50, phosphate: 30, kcal: "about 13", extras: "Creatine 2.5 g, collagen 2.5 g, vitamin C 80 mg" },
  },
  {
    id: "calm-o-mile",
    time: "20:00",
    moment: "Two to three hours before bed",
    word: "Snooze",
    line: "Snooze Control",
    name: "Calm O' Mile",
    flavour: "Apple chamomile iced tea",
    panel: "#C8DDCB",
    deep: "#2F4F38",
    pitch: "The last glass of the day.",
    body:
      "A cold apple and chamomile tea. Herbal, so there's no caffeine, and no melatonin either. It has the most magnesium of the four, with GABA, glycine and real chamomile flower. Have it two to three hours before bed, and the glass is long gone by lights out.",
    taste: "Think cold apple tea with soft, floral chamomile. Hardly salty at all.",
    inside: ["All 6 electrolytes", "Most magnesium", "GABA + glycine", "Chamomile flower", "No caffeine, no melatonin"],
    pairs: [
      { pair: "GABA + glycine", story: "Two amino acids. You know them from GABA rice and bone broth." },
      { pair: "Magnesium + chamomile", story: "Magnesium contributes to normal muscle function. Chamomile is the classic bedtime flower." },
    ],
    stats: [
      { k: "magnesium", v: "120 mg" },
      { k: "kcal", v: "about 4" },
      { k: "water", v: "300 ml" },
    ],
    note: "Herbal and caffeine-free. A kids' serving is being confirmed with our maker.",
    label: { sodium: 150, potassium: 300, magnesium: 120, calcium: 50, phosphate: 30, kcal: "about 4", extras: "GABA 100 mg, glycine 100 mg, chamomile flower" },
  },
];

export const stick = (id: SkuId) => STICKS.find((s) => s.id === id)!;

export const ELECTROLYTES = [
  { sym: "Na", name: "Sodium", job: "the main one you sweat out" },
  { sym: "Cl", name: "Chloride", job: "sodium's other half: together they're salt" },
  { sym: "K", name: "Potassium", job: "normal muscle and nerve function" },
  { sym: "Mg", name: "Magnesium", job: "helps reduce tiredness and fatigue" },
  { sym: "Ca", name: "Calcium", job: "normal muscle function" },
  { sym: "PO₄", name: "Phosphate", job: "normal energy metabolism" },
];

// Only things that are physically in the sticks. Fruit names are flavours and stay on the flavour line.
export const REAL_FOOD = ["Thai sea salt", "Holy basil", "Ginger root", "Beetroot", "Watermelon", "Chamomile flower", "Collagen"];

export const BANDS: { who: string; title: string; body: string; tag: string; sku: SkuId; packId: SkuId | "sampler" }[] = [
  {
    who: "The whole house",
    title: "Half a stick for the little ones.",
    body:
      "Rise & Brine and Pump It Up are family sticks. Kids aged 4 to 12 have half a stick in a full glass of water: after football, after swimming, after a school day in a hot uniform. No caffeine, no added sugar, nothing artificial. Glow Up is the grown-ups' one.",
    tag: "Rise & Brine",
    sku: "peach-of-mind",
    packId: "peach-of-mind",
  },
  {
    who: "Anyone who sweats",
    title: "You don't have to be an athlete.",
    body:
      "Bangkok does half the work for you. Have Pump It Up before anything sweaty and Glow Up in the evening. Neither has caffeine. And if you do lift: 2.5 g of creatine a day, no loading week.",
    tag: "Pump It Up",
    sku: "to-the-beet",
    packId: "to-the-beet",
  },
  {
    who: "Light sleepers",
    title: "An early last drink.",
    body:
      "Snooze Control goes down two to three hours before bed. Magnesium, GABA, glycine and chamomile flower in a cold apple tea, small on purpose and early on purpose.",
    tag: "Snooze Control",
    sku: "calm-o-mile",
    packId: "calm-o-mile",
  },
  {
    who: "Eating less",
    title: "Eating less means drinking less.",
    body:
      "About a fifth of your water comes from food. So if you're fasting, eating low-carb, on a GLP-1 or just not a breakfast person, you're drinking less than you think. Rise & Brine is the light one: a little ginger, no sugar, about 3 kcal. On medication? Check with your doctor first.",
    tag: "Rise & Brine",
    sku: "peach-of-mind",
    packId: "sampler",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What's actually in them, and what makes them sweet?",
    a: "All six electrolytes (sodium, chloride, potassium, magnesium, calcium and phosphate), plus the real food on the front of each stick: Thai sea salt, holy basil, ginger, beetroot, watermelon, collagen or chamomile flower, depending on which one. They're lightly sweetened with plant sweeteners, stevia leaf or monk fruit. No sugar is added, there's no caffeine, and there are no artificial colours, flavours or sweeteners. The amounts for each stick are in the table above, and the full ingredient list will be on every box.",
  },
  {
    q: "Can my kids drink them?",
    a: "Rise & Brine and Pump It Up, yes: half a stick in a full glass of water for children aged 4 to 12. Neither has caffeine. A kids' serving for Snooze Control is still being confirmed with our maker, so that one is for grown-ups for now. Glow Up contains creatine and is for adults only. None of them is for under-4s, and if your child has a medical condition, ask your doctor first.",
  },
  {
    q: "I don't go to the gym. Is this for me? Do I need all four?",
    a: "Yes, and no. You sweat in Bangkok whether you train or not. Most people start with the two ends of the day: Rise & Brine in the morning and Snooze Control in the evening. Add Pump It Up on days you'll be out in the heat, and Glow Up if you'd like a simple daily creatine and collagen. The Sampler lets you try all four first.",
  },
  {
    q: "Isn't that a lot of salt?",
    a: "It's meant to be salty, because salt is what you sweat out. A stick has between 150 mg of sodium (Snooze Control) and 900 mg (Pump It Up). All four in one day comes to 1,950 mg, which is about what the World Health Organization suggests as a daily limit for an adult, before food. So on a quiet day in the air con, you don't need all four. If you've been told to watch your salt or your blood pressure, or you have a heart or kidney condition, ask your doctor first.",
  },
  {
    q: "Will Rise & Brine break my fast?",
    a: "It has about 3 kcal and no sugar. Most people who fast are comfortable with that. If you're strict, have it with your first meal.",
  },
  {
    q: "When can I buy it, and can it come with my Paleo Robbie order?",
    a: "The first batch is on its way. The Daily Ritual is coming to the Paleo Robbie grocery, so a box can ride along with your usual order, and you'll be able to order here too. Leave your email below and we'll tell you the day it lands.",
  },
];

// Prices in THB. INDICATIVE until pricing is signed off.
export type PackId = "sampler" | "weekly" | SkuId;
export type Pack = {
  id: PackId;
  title: string;
  sub: string;
  body?: string;
  sticks: number;
  price: number;
  badge?: string;
  image: string;
  color: string;
};

export const PACKS: Pack[] = [
  {
    id: "sampler",
    title: "The Sampler",
    sub: "12 sticks. Three of each.",
    body: "Not sure which part of your day needs one? Try all four for three days and see which you reach for.",
    sticks: 12,
    price: 590,
    badge: "Start here",
    image: "/img/pack-sampler",
    color: "#F7BFA0",
  },
  {
    id: "weekly",
    title: "The Weekly Ritual",
    sub: "28 sticks. Seven of each.",
    body: "One full week for one person. Or share it round the house.",
    sticks: 28,
    price: 1150,
    badge: "All four, for a week",
    image: "/img/pack-weekly",
    color: "#C8DDCB",
  },
  ...STICKS.map<Pack>((s) => ({
    id: s.id,
    title: s.line,
    sub: `30 sticks of ${s.flavour.toLowerCase()}.`,
    sticks: 30,
    price: s.id === "zest-life" ? 1490 : 1290,
    image: `/img/lay-${s.id}`,
    color: s.panel,
  })),
];

export const pack = (id: PackId) => PACKS.find((p) => p.id === id)!;
export const perStick = (p: Pack) => Math.round(p.price / p.sticks);
export const baht = (n: number) => "฿" + n.toLocaleString("en-US");
export const CHECKOUT_LIVE = process.env.NEXT_PUBLIC_CHECKOUT_LIVE === "true";
// A thin "preview" ribbon for stakeholder reviews. On unless switched off, and always off once checkout is live.
export const PREVIEW = !CHECKOUT_LIVE && process.env.NEXT_PUBLIC_PREVIEW_RIBBON !== "false";
