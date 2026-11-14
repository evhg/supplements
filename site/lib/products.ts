// Single source of truth for the four sticks, the packs and the claims.
// Claim wording follows docs/PROTOCOL.md: no disease or "focus/cognitive" health claims; nutrient functions only.

export type SkuId = "peach-of-mind" | "to-the-beet" | "zest-life" | "calm-o-mile";

export type Stick = {
  id: SkuId;
  time: string;          // clock time on the day cycle
  moment: string;        // when in the day
  trend: string;         // the one health trend each stick owns
  line: string;          // line name (ink)
  name: string;          // flavour name (red)
  flavour: string;
  panel: string;         // pack panel colour
  deep: string;          // darker tone of the panel for text on it
  water: number;         // ml
  bubble: string;
  pitch: string;
  body: string;
  inside: string[];
  pairings: { pair: string; story: string }[];
  stats: { k: string; v: string }[];
  note: string;
  kids: boolean;
};

export const STICKS: Stick[] = [
  {
    id: "peach-of-mind",
    time: "07:00",
    moment: "Morning, before coffee",
    trend: "Clarity",
    line: "Rise & Brine",
    name: "Peach of Mind",
    flavour: "Peach, holy basil & lemon",
    panel: "#F7BFA0",
    deep: "#9A4A22",
    water: 500,
    bubble: "Clear head",
    pitch: "Your first glass of the day.",
    body:
      "Eight hours without a sip. Thai sea salt and potassium put back what the night took. Holy basil (kaprao) and ginger are an old Thai morning pair, and vitamins B6 and B12 contribute to normal mental function.",
    inside: ["6 electrolytes", "Thai sea salt", "Holy basil", "Ginger root", "B6 + B12 + C"],
    pairings: [
      { pair: "Magnesium + B6", story: "help reduce tiredness and fatigue. Energy, without caffeine." },
      { pair: "Ginger + B6", story: "the traditional pair for a settled morning stomach." },
    ],
    stats: [
      { k: "kcal", v: "~3" },
      { k: "sugar", v: "0 g" },
      { k: "water", v: "500 ml" },
    ],
    note: "On an empty stomach. Kids 4–12: half a stick.",
    kids: true,
  },
  {
    id: "to-the-beet",
    time: "16:30",
    moment: "Before you train",
    trend: "Performance",
    line: "Pump It Up",
    name: "To The Beet",
    flavour: "Watermelon, beet & sea salt",
    panel: "#EBA1BE",
    deep: "#8E2A55",
    water: 600,
    bubble: "Only 11 kcal",
    pitch: "The pump, with no caffeine.",
    body:
      "Real beetroot and 900 mg of sodium: more fluid in the tank and the classic beet-nitrate pump, without the jitters or the 2 am ceiling stare. Potassium and magnesium for the last set.",
    inside: ["6 electrolytes", "Real beetroot", "Real watermelon", "900 mg sodium"],
    pairings: [
      { pair: "Sodium + beet", story: "more blood volume and the beet-nitrate pump. Caffeine-free." },
      { pair: "Potassium + magnesium", story: "for normal muscle function, set after set." },
    ],
    stats: [
      { k: "kcal", v: "11" },
      { k: "caffeine", v: "0" },
      { k: "water", v: "600 ml" },
    ],
    note: "30 minutes before training. Kids 4–12: half a stick.",
    kids: true,
  },
  {
    id: "zest-life",
    time: "18:30",
    moment: "After you train",
    trend: "Glow",
    line: "Glow Up",
    name: "Zest Life",
    flavour: "Pomelo, orange & lime",
    panel: "#F2E28E",
    deep: "#7A6410",
    water: 500,
    bubble: "No loading, no bloat",
    pitch: "Strength and glow, in one glass.",
    body:
      "2.5 g of creatine every day: no loading phase, no bloat, the dose longevity routines use. Collagen comes with vitamin C, which your body needs to form collagen. Thai pomelo makes it taste like a holiday.",
    inside: ["6 electrolytes", "2.5 g creatine", "Collagen peptides", "Vitamin C"],
    pairings: [
      { pair: "Creatine + electrolytes", story: "creatine pulls water into muscle; the salts keep you hydrated while it does." },
      { pair: "Collagen + vitamin C", story: "vitamin C contributes to normal collagen formation." },
    ],
    stats: [
      { k: "creatine", v: "2.5 g" },
      { k: "sugar", v: "0 g" },
      { k: "water", v: "500 ml" },
    ],
    note: "Adults only. Max 1 stick a day.",
    kids: false,
  },
  {
    id: "calm-o-mile",
    time: "20:00",
    moment: "2–3 hours before bed",
    trend: "Sleep",
    line: "Snooze Control",
    name: "Calm O' Mile",
    flavour: "Apple chamomile iced tea",
    panel: "#C8DDCB",
    deep: "#3E6447",
    water: 300,
    bubble: "2–3 hrs before bed",
    pitch: "Wind down, then sleep through.",
    body:
      "Magnesium, GABA, glycine and real chamomile flower, in an apple iced tea that is herbal and caffeine-free. Drink it 2–3 hours before bed, so you sleep through and don't wake up for the bathroom at 3 am.",
    inside: ["6 electrolytes", "Magnesium", "GABA + glycine", "Chamomile flower"],
    pairings: [
      { pair: "GABA + glycine", story: "the Japanese evening pairing." },
      { pair: "Magnesium + chamomile", story: "magnesium for normal muscle function, plus the classic bedtime flower." },
    ],
    stats: [
      { k: "caffeine", v: "0" },
      { k: "sugar", v: "0 g" },
      { k: "water", v: "300 ml" },
    ],
    note: "Herbal, caffeine-free. Kids 4–12: half a stick.",
    kids: true,
  },
];

export const ELECTROLYTES = [
  { sym: "Na", name: "Sodium", job: "holds water where you need it" },
  { sym: "Cl", name: "Chloride", job: "keeps fluids in balance" },
  { sym: "K", name: "Potassium", job: "muscle and nerve function" },
  { sym: "Mg", name: "Magnesium", job: "less tiredness and fatigue" },
  { sym: "Ca", name: "Calcium", job: "muscle function" },
  { sym: "PO₄", name: "Phosphate", job: "energy metabolism" },
];

export const REAL_FOOD = [
  "Thai sea salt", "Holy basil", "Ginger root", "Peach", "Lemon", "Real beetroot", "Watermelon",
  "Pomelo", "Orange", "Lime", "Collagen", "Chamomile flower", "Apple",
];

// Prices in THB. PLACEHOLDERS until pricing is signed off (docs/PROTOCOL.md §7: ฿1,290 / 30, Glow Up ฿1,490 / 30).
export type Pack = {
  id: "weekly" | "sampler" | SkuId;
  title: string;
  sub: string;
  sticks: number;
  price: number;
  compareAt?: number;
  badge?: string;
  image: string;
};

export const PACKS: Pack[] = [
  {
    id: "weekly",
    title: "The Weekly Ritual",
    sub: "28 sticks: all four, every day for a week",
    sticks: 28,
    price: 1290,
    badge: "The full day",
    image: "/img/trio-1200.webp",
  },
  {
    id: "sampler",
    title: "The Sampler",
    sub: "12 sticks: three of each",
    sticks: 12,
    price: 590,
    badge: "Try them all",
    image: "/img/trio-1200.webp",
  },
  ...STICKS.map<Pack>((s) => ({
    id: s.id,
    title: `${s.line}: ${s.name}`,
    sub: `30 sticks of ${s.flavour.toLowerCase()}`,
    sticks: 30,
    price: s.id === "zest-life" ? 1490 : 1290,
    image: `/img/hero-${s.id}-1200.webp`,
  })),
];

export const baht = (n: number) => "฿" + n.toLocaleString("en-US");
export const CHECKOUT_LIVE = process.env.NEXT_PUBLIC_CHECKOUT_LIVE === "true";
